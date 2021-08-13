import 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import Tabs from './navigation/tabs.js';
import styled from "styled-components";
import LoginScreen from './screens/LoginScreen.js';
import { RootStack, Start_Stack } from './navigation/StackNavigator.js';
import * as Notifications from "expo-notifications";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  var development_version = '0.0.02';
  const getData = async () => {
    try {
      var development_version_localstorage_value = await AsyncStorage.getItem('development_version')
      if(development_version_localstorage_value !== null) {
        if (development_version !== development_version_localstorage_value) {
          console.log(development_version_localstorage_value);
          var releaseNotes = "There are now haptic touches when you navigate using the bottom tab navigator!"
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

  return(
    <NavigationContainer>
      <Start_Stack/>
    </NavigationContainer>
  );
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
