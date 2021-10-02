import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, Platform} from 'react-native';
import { GiftedChat, InputToolbar, Bubble } from 'react-native-gifted-chat'
import {
  ChatScreen_Title, 
  TestText,
  darkModeOn,
  darkModeStyling,
  lightModeStyling,
  Chat_Info_Icon_Styling,
  Navigator_BackButton,
  Colors
} from '../screens/screenStylings/styling.js';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {useTheme} from "@react-navigation/native";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const ChatScreen = ({navigation, route}) => {
    const {username, user_profile_pic, displayName} = route.params;

    const [messages, setMessages] = useState([]);
    const insets = useSafeAreaInsets();

    if (darkModeOn === true) {
      var styling = darkModeStyling;
  } else {
      var styling = lightModeStyling;
  }

  const {primary, tertiary, darkest, darkestBlue} = Colors;
    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'This is the chat screen. Right now chats do not save to the backend server. That will be fixed very soon, and this will be similar to Instagrams DMs. We know that this screen is pretty buggy, and all of these bugs will be fixed soon',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: user_profile_pic,
          },
        },
      ])
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      const {
        _id,
        createdAt,
        text,
        user
      }=messages[0]
      /* Send these variables to the server for chat storing
      _id
      createdAt
      text
      user
      */
    }, [])

    function renderInputToolbar (props) {
      //Add the extra styles via containerStyle
     return <InputToolbar {...props} containerStyle={{borderTopWidth: 1, borderTopColor: colors.borderColor, backgroundColor: colors.primary, color: colors.tertiary}} textInputStyle={{ color: colors.tertiary }} placeholderTextColor={colors.tertiary}/>
    }

    function renderBubble(props) {
      return <Bubble 
                {...props} 
                textStyle={{
                  left: {
                    color: colors.tertiary
                  },
                  right: {
                    color: colors.tertiary,
                  },
                }}
                wrapperStyle={{
                  left: {
                    borderColor: colors.darkest,
                    borderWidth: 5,
                    backgroundColor: colors.primary,
                  },
                  right: {
                    borderColor: colors.darkest,
                    borderWidth: 5,
                    backgroundColor: colors.brand
                  }
                }}
              />;
    }
    const {colors} = useTheme();
    const Styles = StyleSheet.create({
      giftedChatStyling: {
        backgroundColor: colors.primary,
        flex: 1, 
        ...Platform.select({
          ios: {
            marginBottom: 75
          },
          android: {
            marginBottom: 75
          },
          default: {
            // other platforms, web for example
            marginBottom: 72,
          }
        })
      }
  });
  const bottomTabBarHeight = useBottomTabBarHeight();
    return(
      <View style={Styles.giftedChatStyling}>
        <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
          <Navigator_BackButton onPress={() => {navigation.goBack()}}>
            <Image
              source={require('../assets/app_icons/back_arrow.png')}
              style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
              resizeMode="contain"
              resizeMethod="resize"
            />
          </Navigator_BackButton>
          <TestText style={{textAlign: 'center', color: colors.tertiary}}>{username || "Couldn't get name"}</TestText>
          <Chat_Info_Icon_Styling onPress={() => {navigation.navigate("ChatInformationScreen", {username: username, user_profile_pic: user_profile_pic, displayName: displayName})}}>
            <Image
              source={require('../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/269-info.png')}
              style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
              resizeMode="contain"
              resizeMethod="resize"
            />
          </Chat_Info_Icon_Styling>
        </ChatScreen_Title>
          <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        renderInputToolbar={renderInputToolbar} 
        renderBubble={renderBubble}
        bottomOffset={75}
        user={{
          _id: 1,
          name: 'Username goes here'
        }}
      />
      <View style={{backgroundColor: colors.primary, height: 75, minHeight: 75, maxHeight: 75, position: 'absolute', left: 0, right: 0, bottom: -75}}/>
    </View>
    );
};

export default ChatScreen;