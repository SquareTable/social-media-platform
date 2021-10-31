import React, { useState, useCallback, useEffect, useLayoutEffect, useContext } from 'react'
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, Platform} from 'react-native';
import { GiftedChat, InputToolbar, Bubble, Send, Composer } from 'react-native-gifted-chat';
import * as ImagePicker from 'expo-image-picker';
import {ImageView} from 'react-native-image-modal'
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
import Icon from 'react-native-vector-icons/Ionicons';
import { CredentialsContext } from '../components/CredentialsContext.js';
import { Video,Audio } from 'expo-av';

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
          _id: 2,
          text: 'Cool! I believe that Seb and Kovid can make an awesome social media app cause they are epic and cool and super duper sexy!',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: user_profile_pic,
          },
        },
        {
          _id: 1,
          text: 'Heyyyy this is the chat screen! Right now chats do not save to the server and there are also a few problems with this screen, but everything will be getting fixed shortly :)',
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

    function renderSend(props) {
      return (
        <Send 
          {...props}
          containerStyle={{borderWidth: 0}}
          />
      );
    }

    function renderInputToolbar (props) {
      //Add the extra styles via containerStyle
     return (
        <InputToolbar {...props} 
          containerStyle={{
            borderWidth: 3, 
            borderColor: colors.borderColor, 
            backgroundColor: colors.primary, 
            color: colors.tertiary, 
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            borderTopColor: colors.borderColor,
            borderTopWidth: 3,
            marginHorizontal: 5,
          }}
          textInputStyle={{ color: colors.tertiary, paddingTop: 9 }} 
          placeholderTextColor={colors.tertiary}
        />
     );
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
    const {colors, dark} = useTheme();
    const Styles = StyleSheet.create({
      giftedChatStyling: {
        backgroundColor: colors.primary,
        flex: 1, 
        ...Platform.select({
          ios: {
            marginBottom: 5
          },
          android: {
            marginBottom: 5
          },
          default: {
            // other platforms, web for example
            marginBottom: 72,
          }
        })
      }
  });
  const bottomTabBarHeight = useBottomTabBarHeight();
  function renderComposer(props) {
    return (
      //!props.text.trim()?
        <View style={{flexDirection: 'row', marginRight: 5}}>
          <Composer 
            {...props} 
            textInputProps={{
              //returnKeyType: 'default',
              multiline: true,
              /*onSubmitEditing: event => {
                props.onSend({ text: event.nativeEvent.text.trim() }, true);
              },*/
            }}
          />
          <Send 
            {...props}
            containerStyle={{borderWidth: 0}}
          />
          <TouchableOpacity style={{minHeight: 40, height: 40, maxHeight: 40, minWidth: 40, width: 40, maxWidth: 40}} onPress={pickImage}>
            <Icon name='camera' size={40} color={colors.tertiary}/>
          </TouchableOpacity>
          <TouchableOpacity style={{minHeight: 40, height: 40, maxHeight: 40, minWidth: 40, width: 40, maxWidth: 40}} onPress={() => {alert('Coming soon!')}}>
            <Icon name='mic-outline' size={40} color={colors.tertiary}/>
          </TouchableOpacity>
        </View>
        /*:
        <Composer 
            {...props} 
            textInputProps={{
              returnKeyType: 'send',
              multiline: true,
              onSubmitEditing: event => {
                props.onSend({ text: event.nativeEvent.text.trim() }, true);
              },
            }}
        />*/
    );
    
  }
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      onSend({image: result.uri, timestamp: new Date(), user: { _id: 1, name: 'React Native', avatar: user_profile_pic},})
    }
  };

  const goToProfileScreen = (name, userToNavigateTo, profilePictureUrl, displayName) => {
    name? 
    name === userToNavigateTo? navigation.navigate("Welcome", {backButtonHidden: false}) : navigation.navigate("VisitingProfileScreen", {name: userToNavigateTo, photoUrl: profilePictureUrl, displayName: displayName}) 
    : alert("An error occured");
  }
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  if (storedCredentials) {var {name} = storedCredentials}

  const renderMessageVideo = (props) => {
    const { currentMessage } = props;
     return (
       <View style={{ padding: 20 }}>
          <Video
           resizeMode="contain"
           useNativeControls
           shouldPlay={false}
           source={{ uri: currentMessage.video }}
           style={styles.video}
         />
       </View>
     );
  };
  
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
        renderComposer={renderComposer}
        bottomOffset={70}
        onPressAvatar={() => {goToProfileScreen(name, username, user_profile_pic, displayName)}}
        renderMessageVideo={renderMessageVideo}
        listViewProps={{keyboardDismissMode: 'on-drag'}}
        user={{
          _id: 1,
          name: 'Username goes here'
        }}
        style={{
          backgroundColor: colors.primary,
          flex: 1, 
          ...Platform.select({
            ios: {
              marginBottom: 5
            },
            android: {
              marginBottom: 5
            },
            default: {
              // other platforms, web for example
              marginBottom: 72,
            }
          })
        }}
      />
      <View style={{backgroundColor: colors.primary, height: 75, minHeight: 75, maxHeight: 75, position: 'absolute', left: 0, right: 0, bottom: -75}}/>
    </View>
    );
};

export default ChatScreen;