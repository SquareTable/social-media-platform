import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, Platform} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

const ChatScreen = ({navigation}) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'This is the chat screen. Right now chats do not save to the backend server, and also you can only chat with 1 person. That will be fixed very soon, and this will be similar to Instagrams DMs. Also yes we know that this is a bit buggy on both web browsers and mobile devices. These bugs will be getting fixed very soon.',
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

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity>
                    <Image
                        source={require('../assets/app_icons/blank_profile_pic.png')}
                        resizeMode = 'contain'
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 40/2,
                            marginLeft: 20
                        }}
                        />
                </TouchableOpacity>
            )
        })
    }, [])
    return(
      <View style={Styles.giftedChatStyling}>
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

const ChatScreenCode = () => {
    return(
        <Stack.Navigator>

        </Stack.Navigator>
    );
};

export default ChatScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E3440' /* Dark mode from Nord Theme */
    },
    giftedChatStyling: {
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