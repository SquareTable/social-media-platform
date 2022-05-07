import Constants from 'expo-constants';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, SafeAreaView, Platform, Image, Animated, Vibration, AppState, Dimensions, FlatList, TouchableWithoutFeedback} from 'react-native';
import styled from "styled-components";
import LoginScreen from './screens/LoginScreen.js';
import { Start_Stack } from './navigation/Start_Stack.js';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Asset } from 'expo-asset';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { DefaultTheme, DarkTheme, useRoute } from '@react-navigation/native';
import { CredentialsContext } from './components/CredentialsContext';
import { AdIDContext } from './components/AdIDContext.js';
import { AppStylingContext } from './components/AppStylingContext.js';
import { RefreshAppStylingContext } from './components/RefreshAppStylingContext.js';
import { SimpleStylingVersion } from './components/StylingVersionsFile.js';
import SocialSquareLogo_B64_png from './assets/SocialSquareLogo_Base64_png.js';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';
import { io } from 'socket.io-client';
import { 
  Avatar,
  ButtonText

} from './screens/screenStylings/styling.js';
import { ProfilePictureURIContext } from './components/ProfilePictureURIContext.js';
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import { LockSocialSquareContext } from './components/LockSocialSquareContext.js';
import { ShowPlaceholderSceeenContext } from './components/ShowPlaceholderScreenContext.js';
import * as LocalAuthentication from 'expo-local-authentication';
import { OpenAppContext } from './components/OpenAppContext.js';
import { ShowAccountSwitcherContext } from './components/ShowAccountSwitcherContext.js';
import { AllCredentialsStoredContext } from './components/AllCredentialsStoredContext.js';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { navigationRef } from './components/ReactNavigationRef.js';
import * as AppNavigation from './components/ReactNavigationRef.js';
import { ServerUrlContext } from './components/ServerUrlContext.js';
import { BadgeEarntNotificationContext } from './components/BadgeEarntNotificationContext.js';
import { OnlineContext } from './components/conversationOnlineHandler.js';
import { SocketContext } from './components/socketHandler.js';
import { ReconnectPromptContext } from './components/reconnectPrompt.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Sentry from 'sentry-expo';
import {SENTRY_DSN, IOSADID, ANDROIDADID} from '@dotenv';
import * as SplashScreen from 'expo-splash-screen';

const routingInstrumentation = new Sentry.Native.ReactNavigationInstrumentation();

Sentry.init({
  dsn: SENTRY_DSN,
  enableInExpoDevelopment: true,
  debug: true, 
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  /*integrations: [
    new Sentry.Native.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      // ...
    }),
  ],*/
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const StatusBarHeight = Constants.statusBarHeight;
  const [AppStylingContextState, setAppStylingContextState] = useState(null)
  const [AdID, setAdID] = useState('');
  const [showPlaceholderScreen, setShowPlaceholderScreen] = useState(null)
  const [lockSocialSquare, setLockSocialSquare] = useState(null)
  const [refreshAppStyling, setRefreshAppStyling] = useState(false);
  const [profilePictureUri, setProfilePictureUri] = useState(SocialSquareLogo_B64_png)
  const [AsyncStorageSimpleStylingData, setAsyncStorageSimpleStylingData] = useState()
  const [currentSimpleStylingData, setCurrentSimpleStylingData] = useState()
  const testID = Platform.OS == "ios" ? 'ca-app-pub-3940256099942544/2934735716' : 'ca-app-pub-3940256099942544/6300978111';
  const productionID = Platform.OS == 'ios' ? IOSADID : ANDROIDADID;
  // Is a real device and running in production.
  const adUnitID = Device.isDevice && !__DEV__ ? productionID : testID;
  const previousStylingState = useRef(null)
  const AsyncSimpleStyling_ParsedRef = useRef(null)
  // Check App State code
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current)
  const [previousAppStateVisible, setPreviousAppStateVisible] = useState('justStarted')
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [openApp, setOpenApp] = useState(false);
  const [biometricsEnrolled, setBiometricsEnrolled] = useState(false)
  const [AppOwnershipValue, setAppOwnershipValue] = useState(undefined)
  const [biometricsCanBeUsed, setBiometricsCanBeUsed] = useState(false)
  const [showSocialSquareLockedWarning, setShowSocialSquareLockedWarning] = useState(false)
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false)
  const appHeight = Dimensions.get('window').height;
  const [allCredentialsStoredList, setAllCredentialsStoredList] = useState([])
  const [AccountSwitcherHeight, setAccountSwitcherHeight] = useState(0)
  const DismissAccountSwitcherBoxActivated = useRef(new Animated.Value(0)).current;
  const [serverUrl, setServerUrl] = useState('http://it-solutions.homedns.org:9443')
  const [badgeEarntNotification, setBadgeEarntNotification] = useState('')
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState('');
  const [reconnectPrompt, setReconnectPrompt] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState('');
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [checkingConnectionPopUp, setCheckingConnectionPopUp] = useState(false)
  const socketRefForEventListeners = useRef(socket)
  const onlineUsersRef = useRef(onlineUsers)
  const [timeOutId, setTimeOutId] = useState(null)
  const [limitReconnect, setLimitReconnect] = useState(false)
  const [popUpForCoversations, setPopUpForCoversations] = useState(null)
  const [isReady, setIsReady] = useState(false);
  const scheme = useColorScheme();
  let DisconnectedFromInternetBoxY = useRef(new Animated.Value(0)).current;
  let AccountSwitcherY = useRef(new Animated.Value(500)).current;
  let AccountSwitchedBoxY = useRef(new Animated.Value(0)).current;
  let BadgeEarntBoxY = useRef(new Animated.Value(StatusBarHeight - 200)).current;
  const popUpTimeoutLength = useRef(new Animated.Value(Dimensions.get('window').width * 0.9)).current;

  //Encryption Stuff
    
  async function saveDeviceUUID(key, value) {
    await SecureStore.setItemAsync(key, value);
}
  
async function getDeviceUUID(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result;
    } else {
        return null
    }
}

const checkAndCreateDeviceUUID = (callback) => {
    async function forAsync() {
        const checkingDeviceUUID = await getDeviceUUID("device-uuid")
        if (checkingDeviceUUID == null) {
            let uuid = uuidv4();
            saveDeviceUUID("device-uuid", JSON.stringify(uuid))
            console.log(`device uuid ${uuid}`)
            return callback(uuid);
        } else {
            console.log(`found device uuid ${checkingDeviceUUID}`)
            return callback(checkingDeviceUUID);
        }
    }
    forAsync()
}

useEffect(() => {

  return () => {
      if (typeof notificationListener.current == "undefined" || notificationListener.current == undefined) {
        //Undefined
      } else {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }

      if (typeof responseListener.current == "undefined" || responseListener.current == undefined) {
        //Undefined
      } else {
        Notifications.removeNotificationSubscription(responseListener.current)
      }
  }
}, []);

useEffect(() => {
  if (storedCredentials == '' || storedCredentials == null) {
      //no credentials
  } else {
      if (socket == '') {
          const forAsync = async () => {
              checkAndCreateDeviceUUID(function(uuidOfDevice) {
                  if (uuidOfDevice == "" || uuidOfDevice == null || uuidOfDevice == undefined || typeof uuidOfDevice == "undefined") {
                      console.log(`Error with uuid (${uuidOfDevice}) of device.`)
                  } else {
                      const uuidWithOutDouble = uuidOfDevice.replace(/(^"|"$)/g, '')
                      console.log(`UUID sent with socket ${uuidOfDevice}`)
                      setSocket(io((serverUrl + "/"), { query: { idSentOnConnect: storedCredentials._id, uuidOfDevice: uuidWithOutDouble }}))
                  }
              })
          }
          forAsync()
      }
      AsyncStorage.getItem('deviceNotificationKey').then((result) => {
          if (result !== null) {
              setExpoPushToken(result);
              console.log('deviceNotificationKey: ' + result);

              // This listener is fired whenever a notification is received while the app is foregrounded
              notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
                console.log(notification)
              });

              // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
              responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response);
              });
          } else {
              registerForPushNotificationsAsync().then(token => {
                  const url = serverUrl + "/user/sendnotificationkey";
                  axios.post(url, {idSent: storedCredentials._id, keySent: token}).then((response) => {
                      const result = response.data;
                      const {message, status, data} = result;

                      if (status !== 'SUCCESS') {
                          console.log(`${status}: ${message}`)
                      } else {
                          setExpoPushToken(token)
                          AsyncStorage.setItem('deviceNotificationKey', token)
                          .then(() => {
                              setExpoPushToken(token);
                              console.log('deviceNotificationKey: ' + token);
                              // This listener is fired whenever a notification is received while the app is foregrounded
                              notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                                setNotification(notification);
                                console.log(notification)
                              });

                              // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
                              responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                                console.log(response);
                              });
                          })
                          .catch((error) => {
                              console.log(error);
                              console.log('Error Setting Notification Key');
                          })
                      }
                  }).catch(error => {
                      console.log(`Error while sending push notif key ${error}`);
                  })
              });
          }
      }).catch((error) => console.log(error));
  }
}, [storedCredentials])

useEffect(() => {
  if (notification !== false) {
      popUpTimeoutLength.stopAnimation()
      if (timeOutId !== null) {
          clearTimeout(timeOutId)
          setTimeOutId(null)
      }
      popUpTimeoutLength.setValue(Dimensions.get('window').width * 0.9)
      Animated.timing(popUpTimeoutLength, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: false
      }).start()
      var tempTimeOutId = setTimeout(() => {
          setNotification(false)
      },4000)
      setTimeOutId(tempTimeOutId)
  }
}, [notification])

useEffect(() => {
  if (socket == '') {
      if (storedCredentials == '' || storedCredentials == null) {
          //no credentials
      } else {
          const forAsync = async () => {
              checkAndCreateDeviceUUID(function(uuidOfDevice) {
                  if (uuidOfDevice == "" || uuidOfDevice == null || uuidOfDevice == undefined || typeof uuidOfDevice == "undefined") {
                      console.log(`Error with uuid (${uuidOfDevice}) of device.`)
                  } else {
                      const uuidWithOutDouble = uuidOfDevice.replace(/(^"|"$)/g, '')
                      console.log(`UUID sent with socket ${uuidOfDevice}`)
                      setSocket(io((serverUrl + "/"), { query: { idSentOnConnect: storedCredentials._id, uuidOfDevice: uuidWithOutDouble }}))
                  }
              })
          }
          forAsync()
      }
  } else {
      socketRefForEventListeners.current = socket

      console.log("Change in socket")
      socket.on("client-connected", () => {
          setReconnectPrompt(false)
          setLimitReconnect(false)
          setCheckingConnectionPopUp(false)
          console.log("Connected to socket")
      });

      socket.on("fully-set-online", () => {
          console.log("Fully set online")
      })
      
      socket.on("fully-set-offline", () => {
          console.log("Fully set offline")
      })

      socket.on("error-setting-online-status", () => {
          console.log("Error setting online status")
      })

      socket.on("error-setting-offline-status", () => {
          console.log("Error setting offline status")
      })

      socket.on("sent-to-users-out-of-convo", () => {
          console.log("Sent to users out of convo")
      })

      socket.on('timed-out-from-app-state', () => {
          //setReconnectPrompt(true) Already does in disconnect
      })

      socket.on("disconnect", (reason) => {
          setLimitReconnect(false)
          setReconnectPrompt(true)
          console.log(`Disconnected ${reason}`)
      });
  }
}, [socket])

var socketAutoReconnectInterval = null

useEffect(() => {
  if (reconnectPrompt != false) {
    console.log('Reconnect prompt is true')
    Animated.timing(DisconnectedFromInternetBoxY, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true
    }).start();
    if (AppState.currentState == 'active' || AppState.currentState == 'unknown') {
      tryReconnect()
    }
    socketAutoReconnectInterval = setInterval(tryReconnect, 5000)
  } else {
    console.log('Reconnect prompt is false')
    clearInterval(socketAutoReconnectInterval)
    Animated.timing(DisconnectedFromInternetBoxY, {
      toValue: 250,
      duration: 100,
      useNativeDriver: true
    }).start();
  }
}, [reconnectPrompt, limitReconnect])

useEffect(() => {
  if (socket !== '') {
      //can change when following is implemented
      socket.on("user-in-conversation-online", (userThatCameOnlinePubId) => {
          console.log(`${storedCredentials.secondId}: ${userThatCameOnlinePubId} came online.`)
          //console.log(`onlineUsers: ${onlineUsers}, user that came online ${userThatCameOnlinePubId}`)
          try {
              var upToDateOU;
              setOnlineUsers(currentState => { // Do not change the state by getting the updated state
                  upToDateOU = currentState;
                  return currentState;
              })
              if (upToDateOU.includes(userThatCameOnlinePubId)) {
                  console.log("usersPubId already found in upToDateOU")
              } else {
                  setOnlineUsers((prev) => [...prev, userThatCameOnlinePubId])
              }
          } catch (err) {
              console.log(`Error with setting convo user online: ${err}`)
          }
      })

      socket.on("user-in-conversation-offline", (userThatWentOfflinePubId) => {
          console.log("A user went offline")
          console.log(`${storedCredentials.secondId}: ${userThatWentOfflinePubId} went offline.`)
          try {
              var upToDateOU;
              setOnlineUsers(currentState => { // Do not change the state by getting the updated state
                  upToDateOU = currentState;
                  return currentState;
              })
              var indexIfFound = upToDateOU.findIndex(x => x == userThatWentOfflinePubId)
              if (indexIfFound !== -1) {
                  toChange = upToDateOU.slice()
                  toChange.splice(indexIfFound, 1)
                  console.log("toChange upToDateOU spliced:")
                  console.log(toChange)
                  setOnlineUsers(toChange)
              } else {
                  console.log("User to set offline already not in online users.")
              }
          } catch (err) {
              console.log(`Error with setting convo user online: ${err}`)
          }
      })
  } else {
      if (storedCredentials == '' || storedCredentials == null) {
          //No credentials
      } else {
          setCheckingConnectionPopUp(true)
      }
  }
}, [socket])


  useEffect(() => {
      AppState.addEventListener("change", _handleAppStateChange);

      return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
      };
  }, []);

  useEffect(() => {
    if (showAccountSwitcher == true) {
      Animated.timing(DismissAccountSwitcherBoxActivated, { toValue: 1, duration: 1, useNativeDriver: true }).start();
      Animated.timing(AccountSwitcherY, {
        toValue: -AccountSwitcherHeight + 60,
        duration: 100,
        useNativeDriver: true,
        }).start();
        setShowAccountSwitcher(false)
    }
  }, [showAccountSwitcher])

  /*useEffect(() => {  --- No longer needed as disconnected warning shows up when socket is disconnected ---
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if (state.isConnected == false) {
        Animated.timing(DisconnectedFromInternetBoxY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(DisconnectedFromInternetBoxY, {
          toValue: 250,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    });

    return unsubscribe;
  }, []);*/

  const _handleAppStateChange = (nextAppState) => {
      if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
      ) {
      console.log("App has come to the foreground!");
      } else {
        console.log('App is not in the foreground')
        setOpenApp(false)
      }
      setPreviousAppStateVisible(appState.current)
      appState.current = nextAppState;
      setAppStateVisible(appState.current)
      console.log("AppState", appState.current);

      if (appState == 'active') {
        if (socketRefForEventListeners.current !== '') {
            try {
                socketRefForEventListeners.current.emit('app-state-active')
                console.log(`Emitted app state change active`)
            } catch (err) {
                console.log(err)
            }
        }
    } else {
        console.log("This")
        console.log(`socket: ${socketRefForEventListeners}`)
        if (socketRefForEventListeners.current !== '') {
            console.log("This Two")
            try {
                console.log("This Three")
                socketRefForEventListeners.current.emit('app-state-not-active')
                console.log(`Emitted app state not active.`)
            } catch (err) {
                console.log(`Emitting app state change socket err: ${err}`)
            }
        }
    }
  };
  //End of check app state code

  function tryReconnect() {
    if (AppState.currentState == 'active' || AppState.currentState == 'unknown') {
      console.log('Trying to reconnect to socket')
      if (socket.disconnected == false) {
        clearInterval(socketAutoReconnectInterval)
        console.log('Clearing auto reconnect to socket interval')
        console.log('Socket is already connected and SocialSquare is trying to reconnect to the socket')
      } else {
        console.log('Socket is disconnected and SocialSquare is connecting back to socket')
        if (limitReconnect == false) {
            setLimitReconnect(true)
            try {
                if (socket.disconnected == true) {
                    socket.connect()
                }
            } catch (err) {
                setLimitReconnect(false)
                console.log(err)
            }
        }
      }
    }
  }

  console.log(scheme + " from App.js");
  const AppDarkTheme = {
    dark: true,
    colors: {
      primary: '#3b4252',
      background: '#3b4252',
      secondary: '#88c0d0',
      tertiary: '#eceff4',
      darkLight: '#4c566a',
      brand: '#88c0d0',
      green: '#A3BE8C',
      red: '#BF616A',
      darkest: '#2e3440',
      greyish: '#D8DEE9',
      bronzeRarity: '#b08d57',
      darkestBlue: '#5E81AC',
      StatusBarColor: 'light',
      navFocusedColor: '#88C0D0',
      navNonFocusedColor: '#ECEFF4',
      borderColor: '#2E3440',
      orange: '#D08770',
      yellow: '#EBCB8B',
      purple: '#B48EAD',
      slightlyLighterGrey: '#434C5E',
      midWhite: '#E5E9F0',
      slightlyLighterPrimary: '#424a5c',
      descTextColor: '#abafb8',
      errorColor: '#FF0000', //red,
      darkerPrimary: '#252f42'
    },
  };
  const AppLightTheme = {
    dark: false,
    colors: {
      primary: '#eceff4',
      background: '#eceff4',
      secondary: '#88c0d0',
      tertiary: '#3b4252',
      darkLight: '#4c566a',
      brand: '#81A1C1',
      green: '#A3BE8C',
      red: '#BF616A',
      darkest: '#2e3440',
      greyish: '#D8DEE9',
      bronzeRarity: '#b08d57',
      darkestBlue: '#5E81AC',
      StatusBarColor: 'dark',
      navFocusedColor: '#5E81AC',
      navNonFocusedColor: '#2E3440',
      borderColor: '#D8DEE9',
      orange: '#D08770',
      yellow: '#EBCB8B',
      purple: '#B48EAD',
      slightlyLighterGrey: '#434C5E',
      midWhite: '#E5E9F0',
      slightlyLighterPrimary: '#424a5c',
      descTextColor: '#abafb8',
      errorColor: '#FF0000', //red,
      darkerPrimary: '#DFE2E7'
    }
  };
  const AppPureDarkTheme = {
    dark: true,
    colors: {
      primary: 'black',
      background: 'black',
      secondary: '#88c0d0',
      tertiary: 'white',
      darkLight: '#4c566a',
      brand: '#81A1C1',
      green: '#A3BE8C',
      red: '#BF616A',
      darkest: '#2e3440',
      greyish: '#D8DEE9',
      bronzeRarity: '#b08d57',
      darkestBlue: '#5E81AC',
      StatusBarColor: 'light',
      navFocusedColor: '#81A1C1',
      navNonFocusedColor: 'white',
      borderColor: '#D8DEE9',
      orange: '#D08770',
      yellow: '#EBCB8B',
      purple: '#B48EAD',
      slightlyLighterGrey: '#434C5E',
      midWhite: '#E5E9F0',
      slightlyLighterPrimary: '#424a5c',
      descTextColor: '#abafb8',
      errorColor: '#FF0000', //red,
      darkerPrimary: '4D4D4D'
    }
  };
  const AppPureLightTheme = {
    dark: false,
    colors: {
      primary: 'white',
      background: 'white',
      secondary: '#88c0d0',
      tertiary: 'black',
      darkLight: '#4c566a',
      brand: '#81A1C1',
      green: '#A3BE8C',
      red: '#BF616A',
      darkest: '#2e3440',
      greyish: '#D8DEE9',
      bronzeRarity: '#b08d57',
      darkestBlue: '#5E81AC',
      StatusBarColor: 'dark',
      navFocusedColor: '#5E81AC',
      navNonFocusedColor: '#2E3440',
      borderColor: '#D8DEE9',
      orange: '#D08770',
      yellow: '#EBCB8B',
      purple: '#B48EAD',
      slightlyLighterGrey: '#434C5E',
      midWhite: '#E5E9F0',
      slightlyLighterPrimary: '#424a5c',
      descTextColor: '#abafb8',
      errorColor: '#FF0000', //red,
      darkerPrimary: 'D9D9D9'
    }
  };

  useEffect(() => {
    async function getAsyncSimpleStyling() {
      let AsyncSimpleStyling = await AsyncStorage.getItem('simpleStylingData')
      let AsyncSimpleStyling_Parsed = JSON.parse(AsyncSimpleStyling)
      if (AsyncSimpleStyling_Parsed != AsyncSimpleStyling_ParsedRef.current) {
        setAsyncStorageSimpleStylingData(AsyncSimpleStyling_Parsed)
        AsyncSimpleStyling_ParsedRef.current = AsyncSimpleStyling_Parsed
        console.log('Setting Async Storage Data in App.js')
      }
      console.log('AsyncSimpleStyling is: ' + AsyncSimpleStyling_Parsed)
    }
    getAsyncSimpleStyling()
  }, [])

  useEffect(() => {
    async function firstTime_getAsyncSimpleStyling() {
      let AsyncSimpleStyling = await AsyncStorage.getItem('simpleStylingData')
      let AsyncSimpleStyling_Parsed = JSON.parse(AsyncSimpleStyling)
      setAsyncStorageSimpleStylingData(AsyncSimpleStyling_Parsed)
      AsyncSimpleStyling_ParsedRef.current = AsyncSimpleStyling_Parsed
    }
    firstTime_getAsyncSimpleStyling()
  }, [])
 

  const setCurrentSimpleStylingDataToStyle = (SimpleAppStyleIndexNum) => {
    const simpleStylingData = AsyncStorageSimpleStylingData;
    console.log(simpleStylingData);
    try {
      for (let i = 0; i < simpleStylingData.length; i++) {
        if (simpleStylingData[i].indexNum == parseInt(SimpleAppStyleIndexNum)) {
            let dataToUse = simpleStylingData[i]
            const hexToRgb = hex =>
              hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
                        ,(m, r, g, b) => '#' + r + r + g + g + b + b)
                .substring(1).match(/.{2}/g)
                .map(x => parseInt(x, 16))
            const darkerPrimaryBeforeDarken = hexToRgb(dataToUse.colors.primary)
            const shadeFactor = 0.3 //Will darken RGB by 30%
            const darkR = darkerPrimaryBeforeDarken[0] * (1 - shadeFactor)
            const darkG = darkerPrimaryBeforeDarken[1] * (1 - shadeFactor)
            const darkB = darkerPrimaryBeforeDarken[2] * (1 - shadeFactor)
            function RGBToHex(r,g,b) {
              r = r.toString(16);
              g = g.toString(16);
              b = b.toString(16);
            
              if (r.length == 1)
                r = "0" + r;
              if (g.length == 1)
                g = "0" + g;
              if (b.length == 1)
                b = "0" + b;
            
              return "#" + r + g + b;
            }
            dataToUse.colors.darkerPrimary = RGBToHex(Math.round(darkR), Math.round(darkG), Math.round(darkB))
            setCurrentSimpleStylingData(dataToUse)
            console.log(dataToUse)
            previousStylingState.current = SimpleAppStyleIndexNum
        }
      }
    } catch (e) {
      console.warn(e);
    }
  }

  console.log('App Styling Context State is: ' + AppStylingContextState)
  console.log('App is currently using this style: ' + currentSimpleStylingData)

  if (refreshAppStyling == true) {
    console.warn('Refreshing app styling')
    async function getAsyncSimpleStyling() {
      let AsyncSimpleStyling = await AsyncStorage.getItem('simpleStylingData')
      let AsyncSimpleStyling_Parsed = JSON.parse(AsyncSimpleStyling)
      setAsyncStorageSimpleStylingData(AsyncSimpleStyling_Parsed)
      AsyncSimpleStyling_ParsedRef.current = AsyncSimpleStyling_Parsed
    }
    setRefreshAppStyling(false)
    getAsyncSimpleStyling()
    setCurrentSimpleStylingDataToStyle(AppStylingContextState)
  }

  var appTheme = AppStylingContextState == 'Default' ? scheme === 'dark' ? AppDarkTheme : AppLightTheme : AppStylingContextState == 'Dark' ? AppDarkTheme : AppStylingContextState == 'Light' ? AppLightTheme : AppStylingContextState == 'PureDark' ? AppPureDarkTheme : AppStylingContextState == 'PureLight' ? AppPureLightTheme : currentSimpleStylingData;

  const NotificationBox = () => {
    if (notification !== false && notification?.request?.content?.title && notification?.request?.content?.body) {
      return (
        <View style={{position: 'absolute', opacity: 0.9, backgroundColor: appTheme.colors.darkerPrimary, top: Dimensions.get('window').height * 0.05, zIndex: 110, width: Dimensions.get('window').width * 0.9, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
            <Animated.View style={{width: popUpTimeoutLength, backgroundColor: appTheme.colors.brand, height: 3 }}>
            </Animated.View>
            <View style={{flexDirection: 'row', alignItems: 'center', width: Dimensions.get('window').width * 0.9, paddingVertical: 10}}>
                <TouchableOpacity style={{width: '85%', flexDirection: 'row'}}>
                    <View style={{marginLeft: 10, marginRight: 5, width: '20%', aspectRatio: 1/1, justifyContent: 'center', alignContent: 'center'}}>
                        <Image style={{width: '100%', height: '100%', borderRadius: 500, borderWidth: 2, borderColor: appTheme.colors.secondary}} source={{uri: SocialSquareLogo_B64_png}}/>
                    </View>
                    <View style={{width: '72%'}}>
                        {notification.request.content.title !== "" && (
                            <Text numberOfLines={1} ellipsizeMode='tail' style={{color: appTheme.colors.tertiary, textAlignVertical: 'center', flex: 1, textAlign: 'left', fontSize: 14, lineHeight: 20}}>{notification.request.content.title}</Text>
                        )}
                        {notification.request.content.body !== "" && (
                            <Text numberOfLines={2} ellipsizeMode='tail' style={{color: appTheme.colors.tertiary, textAlignVertical: 'center', flex: 1, textAlign: 'left', fontSize: 18, lineHeight: 20}}>{notification.request.content.body}</Text>
                        )}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '8%', aspectRatio: 1/1, marginRight: 10, marginLeft: 5, justifyContent: 'center', alignContent: 'center'}} onPress={() => {
                    console.log("Closing Pop Up")
                    setNotification(false)
                }}>
                    <Image style={{width: '100%', height: '100%', tintColor: appTheme.colors.tertiary}} source={require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/270-cancel-circle.png')}/>
                </TouchableOpacity>
            </View>
            <Animated.View style={{width: popUpTimeoutLength, backgroundColor: appTheme.colors.brand, height: 3 }}>
            </Animated.View>            
        </View>
      )
    } else {
      return null
    }
  }

  const DisconnectedFromInternetBox = () => {
    const onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationY: DisconnectedFromInternetBoxY,
          },
        },
      ],
      { useNativeDriver: true }
    );
    const onHandlerStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        if (event.nativeEvent.absoluteY > appHeight - 140) {
          Animated.timing(DisconnectedFromInternetBoxY, {
            toValue: 250,
            duration: 200,
            useNativeDriver: true
          }).start();
        } else {
          Animated.timing(DisconnectedFromInternetBoxY, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
          }).start();
        }
      }
    }
    const onBoxPress = () => {
      Animated.timing(DisconnectedFromInternetBoxY, {
        toValue: 250,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
    return(
      <PanGestureHandler onGestureEvent={onPanGestureEvent} onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={{backgroundColor: 'rgba(255, 0, 0, 0.7)', height: 60, width: '90%', position: 'absolute', zIndex: 999, top: appHeight - 140, marginHorizontal: '5%', flexDirection: 'row', borderColor: 'black', borderRadius: 15, borderWidth: 1, transform: [{translateY: DisconnectedFromInternetBoxY}], justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={onBoxPress}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Lost connection</Text>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    )
  }

  const AccountSwitcher = () => {
    const onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationY: AccountSwitcherY,
          },
        },
      ],
      { useNativeDriver: true }
    );
    const onHandlerStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        if (event.nativeEvent.absoluteY > appHeight - 80 - AccountSwitcherHeight) {
          Animated.timing(DismissAccountSwitcherBoxActivated, { toValue: 0, duration: 1, useNativeDriver: true }).start();
          Animated.timing(AccountSwitcherY, {
            toValue: 250,
            duration: 200,
            useNativeDriver: true
          }).start();
        } else {
          Animated.timing(AccountSwitcherY, {
            toValue: 60 - AccountSwitcherHeight,
            duration: 100,
            useNativeDriver: true
          }).start();
        }
      }
    }
    const onBoxPress = () => {
      Animated.timing(AccountSwitcherY, {
        toValue: 250,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
    const AddNewAccount = () => {
      AppNavigation.navigate('ModalLoginScreen', {modal: true});
      Animated.timing(DismissAccountSwitcherBoxActivated, { toValue: 0, duration: 1, useNativeDriver: true }).start();
      Animated.timing(AccountSwitcherY, {
        toValue: 250,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
    const goToAccount = (account) => {
      setProfilePictureUri(account.profilePictureUri);
      setStoredCredentials(account);
      AsyncStorage.setItem('socialSquareCredentials', JSON.stringify(account));
      Animated.timing(DismissAccountSwitcherBoxActivated, { toValue: 0, duration: 1, useNativeDriver: true }).start();
      Animated.timing(AccountSwitcherY, {
        toValue: 250,
        duration: 200,
        useNativeDriver: true
      }).start();
      AppNavigation.reset('Tabs', 0);
    }
    return(
      <PanGestureHandler onGestureEvent={onPanGestureEvent} onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', height: 'auto', width: '90%', position: 'absolute', zIndex: 1000, top: appHeight - 140, marginHorizontal: '5%', flexDirection: 'column', borderColor: 'black', borderRadius: 15, borderWidth: 1, transform: [{translateY: AccountSwitcherY}], alignSelf: 'center', maxHeight: appHeight / 2}} onLayout={e => setAccountSwitcherHeight(e.nativeEvent.layout.height)}>
          {storedCredentials ?
            <>
              <View style={{flexDirection: 'row', justifyContent: 'flex-start', height: 60, alignItems: 'flex-start'}}>
                <Avatar style={{width: 40, height: 40, marginLeft: 15}} resizeMode="cover" source={{uri: profilePictureUri}}/>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 16, position: 'absolute', left: 71}}>{storedCredentials.displayName || storedCredentials.name}</Text>
              </View>
              <View style={{width: '100%', backgroundColor: 'white', height: 3, borderColor: 'white', borderWidth: 1, borderRadius: 20, width: '96%', alignSelf: 'center'}}/>
              <FlatList
                data={allCredentialsStoredList}
                renderItem={({item}) => (
                  <>
                    {item.secondId != storedCredentials.secondId ?
                      <TouchableOpacity onPress={() => {goToAccount(item)}} style={{flexDirection: 'row', justifyContent: 'flex-start', height: 60, alignItems: 'flex-start'}}>
                        <Avatar style={{width: 40, height: 40, marginLeft: 15}} resizeMode="cover" source={{uri: item.profilePictureUri}}/>
                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 16, position: 'absolute', left: 71}}>{item.displayName || item.name}</Text>
                      </TouchableOpacity>
                    : null}
                  </>
                )}
                keyExtractor={(item, index) => 'key'+index}
              />
              <TouchableOpacity onPress={AddNewAccount} style={{flexDirection: 'row', justifyContent: 'flex-start', height: 60}}>
                <EvilIcons name="plus" size={60} color="white" style={{marginLeft: 6, marginTop: 4}}/>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 5, marginTop: 16}}>Add New Account</Text>
              </TouchableOpacity>
            </>
          :
            <TouchableOpacity onPress={AddNewAccount} style={{flexDirection: 'row', justifyContent: 'flex-start', height: 60}}>
              <EvilIcons name="plus" size={60} color="white" style={{marginLeft: 6, marginTop: 4}}/>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 5, marginTop: 16}}>Add New Account</Text>
            </TouchableOpacity>
          }
        </Animated.View>
      </PanGestureHandler>
    )
  }

  const AccountSwitchedBox = () => {
    const {colors} = useTheme()
    const onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationY: AccountSwitchedBoxY,
          },
        },
      ],
      { useNativeDriver: true }
    );
    const onHandlerStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        if (event.nativeEvent.absoluteY > appHeight - 140) {
          Animated.timing(AccountSwitchedBoxY, {
            toValue: 250,
            duration: 200,
            useNativeDriver: true
          }).start();
        } else {
          Animated.timing(AccountSwitchedBoxY, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
          }).start();
        }
      }
    }
    const onBoxPress = () => {
      Animated.timing(AccountSwitchedBoxY, {
        toValue: 250,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
    return(
      <>
        {storedCredentials ?
          <PanGestureHandler onGestureEvent={onPanGestureEvent} onHandlerStateChange={onHandlerStateChange}>
            <Animated.View style={{backgroundColor: (colors.primary + 'CC'), height: 60, width: '90%', position: 'absolute', zIndex: 999, top: appHeight - 140, marginHorizontal: '5%', flexDirection: 'row', borderColor: 'black', borderRadius: 15, borderWidth: 1, transform: [{translateY: AccountSwitchedBoxY}], justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={onBoxPress} style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Avatar style={{width: 40, height: 40, marginLeft: 15}} source={{uri: profilePictureUri}}/>
                <Text style={{color: colors.tertiary, fontSize: 16, marginTop: 20, marginLeft: 15, fontWeight: 'bold'}}>{'Switched to ' + (storedCredentials.displayName || storedCredentials.name)}</Text>
              </TouchableOpacity>
            </Animated.View>
          </PanGestureHandler>
        : null}
      </>
    )
  }

  useEffect(() => {
    try {
      if (allCredentialsStoredList) {
        if (allCredentialsStoredList.length == 0 || allCredentialsStoredList.length == 1) {
          Animated.timing(AccountSwitchedBoxY, {
            toValue: 250,
            duration: 1,
            useNativeDriver: true
          }).start();
        }
      }
      if (storedCredentials && allCredentialsStoredList) {
        if (allCredentialsStoredList.length > 1) {
          Animated.sequence([
            Animated.timing(AccountSwitchedBoxY, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true
            }),
            Animated.delay(3000),
            Animated.timing(AccountSwitchedBoxY, {
              toValue: 250,
              duration: 100,
              useNativeDriver: true
            })
          ]).start();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [storedCredentials])

  const handleAppAuth = () => {  
    const authenticate = async () => {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to unlock SocialSquare',
        disableDeviceFallback: false,
        fallbackLabel: "Unlock with password"
      });
      checkIfAuthenticationWasASuccess(biometricAuth)
    }
    const checkIfAuthenticationWasASuccess = (authenticationObject) => {
      if (authenticationObject.success == false) {
        setOpenApp(false)
        setShowSocialSquareLockedWarning(true)
      } else {
        setOpenApp(true)
        setShowSocialSquareLockedWarning(false)
      }
    }
    authenticate()
  }

  //If app goes into the background and then comes back into the foreground, if SocialSquare automatic locking is enabled, this will start biometric authentication
  useEffect(() => {
    if ((previousAppStateVisible == 'background' || previousAppStateVisible == 'inactive' || previousAppStateVisible == 'justStarted') && openApp == false && lockSocialSquare == true && LocalAuthentication.SecurityLevel != 0 && AppOwnershipValue != 'expo' && appStateVisible == 'active' && showSocialSquareLockedWarning == false) {
      handleAppAuth()
    } else {
      console.log('Biometrics are not available')
    }
  }, [appStateVisible])
  //If app gets quit and then reopened again and SocialSquare automatic locking is enabled, this will start biometric authentication
  useEffect(() => {
    async function checkToSeeIfAppShouldAthenticateOnLaunch() {
      if (await AsyncStorage.getItem('LockSocialSquare') == 'true' && appStateVisible == 'active' && LocalAuthentication.SecurityLevel != 0 && Constants.appOwnership != 'expo') {
        handleAppAuth()
      } else if (appStateVisible == 'active' && await AsyncStorage.getItem('LockSocialSquare') == 'true') {
        setOpenApp(true)
        alert('Error happened with biometric/password automatic locking')
      } else if (appStateVisible == 'active') {
        setOpenApp(true)
      }
    }
    checkToSeeIfAppShouldAthenticateOnLaunch()
  }, [])

  const BadgeEarntBox = () => {
    const onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationY: BadgeEarntBoxY,
          },
        },
      ],
      { useNativeDriver: true }
    );
    const BoxPressed = () => {
      Animated.timing(BadgeEarntBoxY, {
        toValue: -100,
        duration: 250,
        useNativeDriver: true
      }).start();
    }
    const onHandlerStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        if (event.nativeEvent.absoluteY < StatusBarHeight) {
          Animated.timing(BadgeEarntBoxY, {
            toValue: -100,
            duration: 100,
            useNativeDriver: true
          }).start();
        } else {
          Animated.sequence([
            Animated.timing(BadgeEarntBoxY, {
              toValue: StatusBarHeight - 40,
              duration: 100,
              useNativeDriver: true
            }),
            Animated.delay(3000),
            Animated.timing(BadgeEarntBoxY, {
              toValue: -100,
              duration: 100,
              useNativeDriver: true
            })
          ]).start();
        }
      }
    }
    return(
      <PanGestureHandler onGestureEvent={onPanGestureEvent} onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', height: 60, width: '90%', position: 'absolute', zIndex: 1000, top: 40, marginHorizontal: '5%', flexDirection: 'row', borderColor: 'black', borderRadius: 15, borderWidth: 1, transform: [{translateY: BadgeEarntBoxY.interpolate({inputRange: [0, 10], outputRange: [0, 10]})}]}}>
          <TouchableOpacity onPress={BoxPressed}>
            {badgeEarntNotification != 'Badge already earnt.' ?
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '20%', minWidth: '20%', maxWidth: '20%', justifyContent: 'center', alignItems: 'center'}}>
                  {getBadgeEarntNotificationIcon(badgeEarntNotification)}
                </View>
                <View style={{width: '80%', minWidth: '80%', maxWidth: '80%'}}>
                  <Text numberOfLines={1} style={{color: 'white', fontSize: 16, fontWeight: 'bold', marginRight: 15}}>Badge Earnt!</Text>
                  <Text numberOfLines={2} style={{color: 'white', fontSize: 14, marginTop: 2, marginRight: 15}}>{getBadgeEarntNotificationDescription(badgeEarntNotification)}</Text>
                </View>
              </View>
            :
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '20%', minWidth: '20%', maxWidth: '20%', justifyContent: 'center', alignItems: 'center'}}>
                  {getBadgeEarntNotificationIcon(badgeEarntNotification)}
                </View>
                <View style={{width: '80%', minWidth: '80%', maxWidth: '80%'}}>
                  <Text numberOfLines={1} style={{color: 'white', fontSize: 16, fontWeight: 'bold', marginRight: 15}}>Badge has already been earnt!</Text>
                  <Text numberOfLines={2} style={{color: 'white', fontSize: 14, marginTop: 2, marginRight: 15}}>This badge has already been earnt.</Text>
                </View>
              </View>
            }
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    )
  }

  useEffect(() => {
    if (badgeEarntNotification != '') {
      Vibration.vibrate(500)
      Animated.sequence([
        Animated.timing(BadgeEarntBoxY, {
          toValue: StatusBarHeight - 40,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.delay(3000),
        Animated.timing(BadgeEarntBoxY, {
          toValue: -100,
          duration: 100,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [badgeEarntNotification])

  const getBadgeEarntNotificationIcon = (badge) => {
    if (badge == 'HomeScreenLogoEasterEgg') {
      return (
        <MaterialCommunityIcons name="egg-easter" size={65} color={'white'} style={{marginTop: -3}}/>
      )
    } else {
      return <AntDesign name="exclamation" size={65} color={'white'} style={{marginTop: -3}}/>
    }
  }

  const getBadgeEarntNotificationDescription = (badge) => {
    if (badge == 'HomeScreenLogoEasterEgg') {
      return (
        'Congratulations! You have found the Home Screen Easter Egg!'
      )
    }
  }

  useEffect(() => {
    async function cacheResourcesAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        AsyncStorage.getItem('socialSquareCredentials').then((result) => {
          if (result !== null) {
            setStoredCredentials(JSON.parse(result));
          } else {
            setStoredCredentials(null);
          }
          async function refreshProfilePictureContext(credentials) {
            const getProfilePicture = () => {
              const url = `${serverUrl}/user/getProfilePic/${credentials.name}`;
      
              axios.get(url).then((response) => {
                  const result = response.data;
                  const {message, status, data} = result;
      
                  if (status !== 'SUCCESS') {
                      console.log('GETTING PROFILE PICTURE FOR ProfilePictureUriContext WAS NOT A SUCCESS')
                      console.log(status)
                      console.log(message)
                  } else {
                      console.log(status)
                      console.log(message)
                      axios.get(`${serverUrl}/getImage/${data}`)
                      .then((response) => {
                          const result = response.data;
                          const {message, status, data} = result;
                          console.log(status)
                          console.log(message)
                          console.log(data)
                          //set image
                          if (message == 'No profile image.' && status == 'FAILED') {
                              console.log('Setting logo to SocialSquare logo')
                              setProfilePictureUri(SocialSquareLogo_B64_png)
                          } else if (data) {
                                //convert back to image
                                console.log('Setting logo in tab bar to profile logo')
                                var base64Icon = `data:image/jpg;base64,${data}`
                                setProfilePictureUri(base64Icon)
                          } else {
                              console.log('Setting logo to SocialSquare logo')
                              setProfilePictureUri(SocialSquareLogo_B64_png)
                          }
                      })
                      .catch(function (error) {
                          console.log("Image not recieved")
                          console.log(error);
                      });
                  }
                  //setSubmitting(false);
      
              }).catch(error => {
                  console.log(error);
                  //setSubmitting(false);
                  handleMessage("An error occured. Try checking your network connection and retry.");
              })
            }
            let credentialsListObject = await AsyncStorage.getItem('socialSquare_AllCredentialsList');
            if (credentialsListObject == null && credentials) {
              setStoredCredentials(null);
              setAllCredentialsStoredList(null);
            } else {
              let parsedCredentialsListObject = JSON.parse(credentialsListObject);
              setAllCredentialsStoredList(parsedCredentialsListObject);
              if (credentials && parsedCredentialsListObject[credentials.indexLength].profilePictureUri != null && parsedCredentialsListObject[credentials.indexLength].profilePictureUri != undefined) {
                console.log('Setting ProfilePictureUri context to profile picture in Async Storage')
                setProfilePictureUri(parsedCredentialsListObject[credentials.indexLength].profilePictureUri)
              } else {
                NetInfo.fetch().then(state => {
                  console.log("Connection type", state.type);
                  console.log("Is connected?", state.isConnected);
                  if (state.isConnected == true) {
                    if (credentials) {
                      console.log('There is no profile picture in AsyncStorage. Loading profile picture for ProfilePictureUri Context using internet connection')
                      getProfilePicture()
                    } else {
                      console.log('There is no stored credentials and no profile picture in Async Storage. Setting ProfilePictureUri to SocialSquareB64Logo')
                      setProfilePictureUri(SocialSquareLogo_B64_png)
                    }
                  } else {
                    console.log('There is no internet connection and no saved profile picture in Async Storage. Setting ProfilePictureUri to SocialSquareB64Logo')
                    setProfilePictureUri(SocialSquareLogo_B64_png)
                  }
                });
              }
            }
          }
          console.log('Getting profile picture for ProfilePictureUriContext')
          refreshProfilePictureContext(JSON.parse(result))
        }).catch((error) => console.log(error));
        await AsyncStorage.getItem('AppStylingContextState').then((result) => {
          if (result == null) {
            setAppStylingContextState('Default')
            AsyncStorage.setItem('AppStylingContextState', 'Default')
          } else if (result == 'Default') {
            setAppStylingContextState('Default')
          } else if (result == 'Dark') {
            setAppStylingContextState('Dark')
          } else if (result == 'Light') {
            setAppStylingContextState('Light')
          } else {
            setAppStylingContextState(result)
          }
        }).catch((error) => {console.log(error)})
        setAdID(adUnitID);
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
          require('./assets/img/Toga.jpg'),
          require('./assets/app_icons/cannot_get_post_lightmode.png'),
          require('./assets/app_icons/cannot_get_post_darkmode.png'),
          require('./post_media/code.png'),
          require('./assets/app_icons/back_arrow.png'),
          require('./post_media/code.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/269-info.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/266-question.png'),
          require('./assets/lightmode_recordbutton.png'),
          require('./assets/lightmode_recordingicon.png'),
          require('./assets/apple_photo.png'),
          require('./assets/sad_pepe.jpg'),
          require('./post_media/seb_and_azaria_1.jpeg'),
          require('./post_media/seb_and_azaria_2.jpeg'),
          require('./post_media/seb_and_azaria_3.jpeg'),
          require('./assets/appstyling_fusion.png'),
          require('./assets/appstyling_darkmode.png'),
          require('./assets/appstyling_lightmode.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/035-file-text.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/093-drawer.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/015-images.png'),
          require('./assets/Splash_Screen.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/348-filter.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/015-images.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/115-users.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/219-heart.png'),
          require('./assets/NewLogo.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/084-calendar.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/020-film.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/277-exit.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/207-eye.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/265-notification.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/113-bubbles4.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png'),
          require('./assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/387-share2.png'),
          require('./assets/img/ThreeDots.png'),

        ];

        const LockSocialSquareValue = await AsyncStorage.getItem('LockSocialSquare')
        const ShowPlaceholderScreenValue = await AsyncStorage.getItem('ShowPlaceholderScreen')

        if (LockSocialSquareValue != 'true') {
          setOpenApp(true)
        }

        if (LockSocialSquareValue == null) {
          setLockSocialSquare(false)
          AsyncStorage.setItem('LockSocialSquare', 'false')
        } else if (LockSocialSquareValue == 'true') {
          setLockSocialSquare(true)
        } else if (LockSocialSquareValue == 'false') {
          setLockSocialSquare(false)
        } else {
          console.error('LockSocialSquareValue is not what it is supposed to be: ' + LockSocialSquareValue)
        }

        if (ShowPlaceholderScreenValue == null) {
          setShowPlaceholderScreen(false)
          AsyncStorage.setItem('ShowPlaceholderScreen', 'false')
        } else if (ShowPlaceholderScreenValue == 'true') {
          setShowPlaceholderScreen(true)
        } else if (ShowPlaceholderScreenValue == 'false') {
          setShowPlaceholderScreen(false)
        }

        const compatibleWithBiometrics = await LocalAuthentication.hasHardwareAsync();
        const enrolledForBiometrics = await LocalAuthentication.isEnrolledAsync()
        const AppEnvironment = Constants.appOwnership
        setBiometricSupported(compatibleWithBiometrics);
        setBiometricsEnrolled(enrolledForBiometrics)
        setAppOwnershipValue(AppEnvironment)
        if (LocalAuthentication.SecurityLevel == 0 || AppEnvironment == 'expo') {
          setBiometricsCanBeUsed(false)
          setLockSocialSquare(false)
          AsyncStorage.setItem('LockSocialSquare', 'false')
          if (LockSocialSquareValue == 'true') {
            alert('Biometric locking has been turned off because SocialSquare cannot access biometric scanning. Please check that SocialSquare has biometric permissions and that your device has biometric profiles.')
          }
        } else {
          setBiometricsCanBeUsed(true)
        }

        await AsyncStorage.getItem('SocialSquareServerUrl').then(value => {
          if (value == null) {
            setServerUrl('http://it-solutions.homedns.org:9443')
            AsyncStorage.setItem('SocialSquareServerUrl', 'http://it-solutions.homedns.org:9443')
          } else {
            setServerUrl(value)
          }
        })
    
        const cacheImages = images.map(image => {
          return Asset.fromModule(image).downloadAsync();
        }); 
        return Promise.all(cacheImages);
      } catch (error) {
        console.error(error);
      } finally {
        setIsReady(true);
      }
    }
    cacheResourcesAsync();
  }, []);

  if (isReady == false) {
    return null
  } else {
    return (
      <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
        <AdIDContext.Provider value={{AdID, setAdID}}>
          <AppStylingContext.Provider value={{AppStylingContextState, setAppStylingContextState}}>
            <RefreshAppStylingContext.Provider value={{refreshAppStyling, setRefreshAppStyling}}>
              <ProfilePictureURIContext.Provider value={{profilePictureUri, setProfilePictureUri}}>
                <ShowPlaceholderSceeenContext.Provider value={{showPlaceholderScreen, setShowPlaceholderScreen}}>
                  <LockSocialSquareContext.Provider value={{lockSocialSquare, setLockSocialSquare}}>
                    <OpenAppContext.Provider value={{openApp, setOpenApp}}>
                      <ShowAccountSwitcherContext.Provider value={{showAccountSwitcher, setShowAccountSwitcher}}>
                        <AllCredentialsStoredContext.Provider value={{allCredentialsStoredList, setAllCredentialsStoredList}}>
                          <ServerUrlContext.Provider value={{serverUrl, setServerUrl}}>
                            <BadgeEarntNotificationContext.Provider value={{badgeEarntNotification, setBadgeEarntNotification}}>
                              <OnlineContext.Provider value={{onlineUsers, setOnlineUsers}}>
                                <SocketContext.Provider value={{socket, setSocket}}>
                                  <ReconnectPromptContext.Provider value={{reconnectPrompt, setReconnectPrompt}}>
                                    {AppStylingContextState != 'Default' && AppStylingContextState != 'Light' && AppStylingContextState != 'Dark' && AppStylingContextState != 'PureDark' && AppStylingContextState != 'PureLight' ? previousStylingState.current != AppStylingContextState ? setCurrentSimpleStylingDataToStyle(AppStylingContextState) : null : null}
                                    <AppearanceProvider>
                                      <NavigationContainer ref={navigationRef} theme={appTheme} onStateChange={() => {console.log('Screen changed')}} onReady={() => {
                                        // Register the navigation container with the instrumentation
                                        routingInstrumentation.registerNavigationContainer(navigationRef);
                                        setTimeout(() => {
                                          // DOCS SAY TO USE ONLAYOUT ON A VIEW TO MAKE SURE THAT AS SOON AS CONTENT LOADS THE SPLASH SCREEN WILL HIDE
                                          // BUT BECAUSE WE DO NOT HAVE A PARENT VIEW LOADING I CANNOT SEE HOW THAT WOULD BE POSSIBLE
                                          // PR TO FIX THIS WOULD BE GREATLY APPRECIATED :)
                                          SplashScreen.hideAsync(); // Use setTimeout to prevent showing nothing while content loads
                                        }, 500);
                                      }}>
                                        {lockSocialSquare == false ?
                                          showPlaceholderScreen == true && (appStateVisible == 'background' || appStateVisible == 'inactive') &&
                                              <Image source={require('./assets/Splash_Screen.png')} resizeMode="cover" style={{width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 100, backgroundColor: '#3B4252', borderWidth: 0}}/>
                                          :
                                            showSocialSquareLockedWarning == false ?
                                              previousAppStateVisible == 'inactive' || previousAppStateVisible == 'background' ?
                                                biometricsCanBeUsed == false ? null :
                                                  openApp == false ?
                                                      <Image source={require('./assets/Splash_Screen.png')} resizeMode="cover" style={{width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 100, backgroundColor: '#3B4252', borderWidth: 0}}/>
                                                  : null
                                              : appStateVisible == 'inactive' || appStateVisible == 'background' ?
                                                    <Image source={require('./assets/Splash_Screen.png')} resizeMode="cover" style={{width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 100, backgroundColor: '#3B4252', borderWidth: 0}}/>
                                                : openApp == false ? biometricsCanBeUsed == false ? null :
                                                    <Image source={require('./assets/Splash_Screen.png')} resizeMode="cover" style={{width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 100, backgroundColor: '#3B4252', borderWidth: 0}}/>
                                                : null
                                            :
                                              <View style={{position: 'absolute', height: '100%', width: '100%', top: 0, right: 0, backgroundColor: '#3B4252', zIndex: 1000}}>
                                                <Image style={{width: 200, height: 200, position: 'absolute', top: StatusBarHeight, right: '25%', zIndex: 1001}} source={require('./assets/img/LogoWithBorder.png')}/>
                                                <Text style={{color: '#eceff4', fontSize: 30, position: 'absolute', right: '10%', textAlign: 'center', fontWeight: 'bold', top: StatusBarHeight + 230, zIndex: 1001, width: '80%'}}>SocialSquare is currently locked</Text>
                                                <TouchableOpacity onPress={handleAppAuth} style={{position: 'absolute', top: 400, right: '25%', zIndex: 1001, width: '50%'}}>
                                                  <Text style={{color: '#88c0d0', fontSize: 24, fontWeight: 'bold', textDecorationLine: 'underline', textDecorationColor: '#88c0d0', textAlign: 'center'}}>Unlock now</Text>
                                                </TouchableOpacity>
                                              </View>
                                        }
                                        <BadgeEarntBox/>
                                        <NotificationBox/>
                                        <Animated.View style={{position: 'absolute', height: '100%', width: '100%', top: 0, right: 0, zIndex: DismissAccountSwitcherBoxActivated.interpolate({inputRange: [0, 1], outputRange: [-10, 997]})}}>
                                          <TouchableOpacity style={{height: '100%', width: '100%'}} onPress={() => {
                                              console.log('Account Switcher Dismiss Box pressed')
                                              Animated.timing(DismissAccountSwitcherBoxActivated, { toValue: 0, duration: 1, useNativeDriver: true }).start();
                                              Animated.timing(AccountSwitcherY, {toValue: 250, duration: 100, useNativeDriver: true}).start()
                                            }}
                                          />
                                        </Animated.View>
                                        {checkingConnectionPopUp !== false && (
                                            <View style={{zIndex: 10, position: 'absolute', height: Dimensions.get('window').height, width: Dimensions.get('window').width}}>
                                                <View style={{width: Dimensions.get('window').width * 0.8, top: Dimensions.get('window').height * 0.5, marginTop: Dimensions.get('window').height * -0.1, backgroundColor: appTheme.colors.primary, alignSelf: 'center', justifyContent: 'center', borderRadius: 30, borderWidth: 3, borderColor: appTheme.colors.tertiary}}>
                                                    <ButtonText style={{marginTop: 25, textAlign: 'center', color: appTheme.colors.tertiary, fontWeight: 'bold'}}> Checking Connection </ButtonText>
                                                    <View style={{width: Dimensions.get('window').width * 0.6, marginLeft: Dimensions.get('window').width * 0.1}}>
                                                        <ActivityIndicator size={30} color={appTheme.colors.brand} style={{marginBottom: 25}}/>
                                                    </View>
                                                </View>
                                            </View>
                                        )}
                                        {/*reconnectPrompt !== false && (
                                            <View style={{zIndex: 10, position: 'absolute', height: Dimensions.get('window').height, width: Dimensions.get('window').width}}>
                                                <View style={{width: Dimensions.get('window').width * 0.8, top: Dimensions.get('window').height * 0.5, marginTop: Dimensions.get('window').height * -0.2, backgroundColor: appTheme.colors.primary, alignSelf: 'center', justifyContent: 'center', borderRadius: 30, borderWidth: 3, borderColor: appTheme.colors.tertiary}}>
                                                    <ButtonText style={{marginTop: 25, textAlign: 'center', color: appTheme.colors.tertiary, fontWeight: 'bold'}}> You got disconnected{"\n"}   from inactivity :( </ButtonText>
                                                    <View style={{width: Dimensions.get('window').width * 0.6, aspectRatio: 1/1, marginLeft: Dimensions.get('window').width * 0.1}}>
                                                        <Image style={{width: '100%', height: '100%'}} source={require('./assets/img/DidulaUpsideDown.jpg')}/>
                                                    </View>
                                                    <TouchableOpacity style={{marginVertical: '2%', backgroundColor: appTheme.colors.brand, marginBottom: 25, width: '80%', paddingVertical: 20, alignContent: 'center', justifyContent: 'center', alignSelf: 'center', borderRadius: 30}} onPress={() => {
                                                        tryReconnect()
                                                    }}>
                                                        <ButtonText style={{textAlign: 'center'}}> Reconnect </ButtonText>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                          )*/}
                                        <DisconnectedFromInternetBox/>
                                        <AccountSwitcher/>
                                        <AccountSwitchedBox/>
                                        <Start_Stack />
                                      </NavigationContainer>
                                    </AppearanceProvider>
                                  </ReconnectPromptContext.Provider>
                                </SocketContext.Provider>
                              </OnlineContext.Provider>
                            </BadgeEarntNotificationContext.Provider>
                          </ServerUrlContext.Provider>
                        </AllCredentialsStoredContext.Provider>
                      </ShowAccountSwitcherContext.Provider>
                    </OpenAppContext.Provider>
                  </LockSocialSquareContext.Provider>
                </ShowPlaceholderSceeenContext.Provider>
              </ProfilePictureURIContext.Provider>
            </RefreshAppStylingContext.Provider>
          </AppStylingContext.Provider>
        </AdIDContext.Provider>
      </CredentialsContext.Provider>

    );
  }
};

export default Sentry.Native.wrap(App);

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
        }
      }
    );
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    console.log('Must use physical device for Push Notifications');
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

