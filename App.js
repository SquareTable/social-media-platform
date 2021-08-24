import 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import styled from "styled-components";
import LoginScreen from './screens/LoginScreen.js';
import { Start_Stack } from './navigation/Start_Stack.js';
import * as Notifications from "expo-notifications";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const clearAsyncStorageOnLogin = false;
  if (clearAsyncStorageOnLogin === true) {
    AsyncStorage.clear();
  }
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('development_version', value)
    } catch (e) {
      alert(e)
    }
  };
  const welcome_message = () => {
    alert("Welcome to SocialSquare, it looks like you have just downloaded this app for the first time! Nice! You are right now on development version " + development_version);
  };
  var development_version = '0.1.04';
  const getData = async () => {
    try {
      var development_version_localstorage_value = await AsyncStorage.getItem('development_version')
      if(development_version_localstorage_value !== null) {
        if (development_version !== development_version_localstorage_value) {
          console.log(development_version_localstorage_value);
          var releaseNotes = "Added a Chat Screen";
          var alert_on_update = "SocialSquare has been updated to the latest version (dev version " + development_version + "). Changes in this update are: " + releaseNotes;
          alert(alert_on_update);
        } else {
          console.log("Not updated");
        }
      } else {
        welcome_message();
      }
    } catch(e) {
      alert(e)
    }
  }
  getData();
  storeData(development_version);

  const [isReady, setIsReady] = useState(false);

  if (isReady == false) {
    async function cacheResourcesAsync() {
      const images = [
        require('./assets/img/Logo.png'),
        require('./assets/app_icons/test3.png'),
        require('./assets/app_icons/3dots.png'),
        require('./assets/app_icons/settings.png'),
        require('./assets/app_icons/message_bubbles.png'),
        require('./assets/app_icons/heart.png'),
        require('./assets/app_icons/find.png'),
        require('./assets/app_icons/home.png'),
        require('./assets/app_icons/bookmark.png'),
        require('./assets/app_icons/chat.png'),
        require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/016-camera.png'),
        require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/007-pencil2.png'),
        require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/157-stats-bars.png'),
        require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/018-music.png'),
        require("./assets/record_button.png"),
        require("./assets/recording_icon.png"),
        require("./assets/app_icons/upload_arrow.png"),
        require('./post_media/clock.gif'),
        require('./assets/app_icons/profile_pic.jpg'),
        require('./post_media/social_studies_images/image_1.png'),
        require('./post_media/social_studies_images/image_2.png'),
        require('./post_media/social_studies_images/image_3.png'),
        require('./post_media/social_studies_images/image_4.png'),
        require('./post_media/social_studies_images/image_5.png'),
        require('./assets/img/TempProfIcons.jpg'),
        require('./assets/img/BgImage1.png'),
        require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/114-user.png'),
      ];
  
      const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
      }); 
      return Promise.all(cacheImages);
    }
    return (
      <AppLoading
        startAsync={cacheResourcesAsync}
        onFinish={() => {setIsReady(true)}}
        onError={console.warn}
      />
    ); } else {

    return (
      <NavigationContainer>
        <Start_Stack/>
      </NavigationContainer>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  body_style: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  test_container: {
    backgroundColor: '#192717',
    color: "white",
    fontWeight: "bold",
  },
});
