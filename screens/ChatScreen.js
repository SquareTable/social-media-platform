import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, Platform} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import {
  ChatScreen_Title, 
  TestText,
  darkModeOn,
  darkModeStyling,
  lightModeStyling,
  Chat_Info_Icon_Styling,
  Navigator_BackButton
} from '../screens/screenStylings/styling.js'

const ChatScreen = ({navigation}) => {

    const [messages, setMessages] = useState([]);

    if (darkModeOn === true) {
      var styling = darkModeStyling;
  } else {
      var styling = lightModeStyling;
  }

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'This is the chat screen. Right now chats do not save to the backend server. That will be fixed very soon, and this will be similar to Instagrams DMs. We know that this screen is pretty buggy, and all of these bugs will be fixed soon',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
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

    return(
      <View style={Styles.giftedChatStyling}>
        <ChatScreen_Title>
          <Navigator_BackButton onPress={() => {navigation.goBack()}}>
            <Image
              source={require('../assets/app_icons/back_arrow.png')}
              style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, ...styling.tintColor}}
              resizeMode="contain"
              resizeMethod="resize"
            />
          </Navigator_BackButton>
          <TestText style={{textAlign: 'center'}}>Username goes here</TestText>
          <Chat_Info_Icon_Styling onPress={() => {navigation.navigate("ChatInformationScreen")}}>
            <Image
              source={require('../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/269-info.png')}
              style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, ...styling.tintColor}}
              resizeMode="contain"
              resizeMethod="resize"
            />
          </Chat_Info_Icon_Styling>
        </ChatScreen_Title>
          <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name: 'Username goes here'
        }}
      />
    </View>
    );
};

export default ChatScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E3440' /* Dark mode from Nord Theme */
    },
    giftedChatStyling: {
      backgroundColor: '#2E3440',
      flex: 1, 
      ...Platform.select({
        ios: {
          marginBottom: 0
        },
        android: {
          marginBottom: 0
        },
        default: {
          // other platforms, web for example
          marginBottom: 72,
        }
      })
    }
});