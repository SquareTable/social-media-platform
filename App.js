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
import AppLoading from 'expo-app-loading';
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
import { 
  Avatar 
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
import { navigationRef } from './components/ReactNavigationRef.js';
import * as AppNavigation from './components/ReactNavigationRef.js';
const Stack = createStackNavigator();


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
  const productionID = Platform.OS == 'ios' ? 'ca-app-pub-6980968247752885/8710919560' : 'ca-app-pub-6980968247752885/3057291726';
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

  useEffect(() => {
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
  }, []);

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
  };
  //End of check app state code

  const [storedCredentials, setStoredCredentials] = useState('');
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

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log(notification)
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

  useEffect(() => {
    if (notification != false) {
      Vibration.vibrate()
      Animated.sequence([
        Animated.timing(GoDownByY, {
          toValue: StatusBarHeight - 40,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.delay(5000),
        Animated.timing(GoDownByY, {
          toValue: StatusBarHeight - 200,
          duration: 300,
          useNativeDriver: true
        }),
      ]).start();
    }
  }, [notification])

  const [isReady, setIsReady] = useState(false);
  const scheme = useColorScheme();
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
      errorColor: '#FF0000', //red
      searchScreenType: 'Regular',
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
      errorColor: '#FF0000', //red
      searchScreenType: 'Regular',
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
      errorColor: '#FF0000', //red
      searchScreenType: 'Regular',
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
      errorColor: '#FF0000', //red
      searchScreenType: 'Regular',
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
            setCurrentSimpleStylingData(simpleStylingData[i])
            console.log(simpleStylingData[i])
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
  
  let GoDownByY = useRef(new Animated.Value(StatusBarHeight - 200)).current;
  let DisconnectedFromInternetBoxY = useRef(new Animated.Value(0)).current;
  let AccountSwitcherY = useRef(new Animated.Value(500)).current;
  let AccountSwitchedBoxY = useRef(new Animated.Value(0)).current;

  const NotificationBox = () => {
    const onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationY: GoDownByY,
          },
        },
      ],
      { useNativeDriver: true }
    );
    const NotificationPressed = () => {
      Animated.timing(GoDownByY, {
        toValue: -100,
        duration: 250,
        useNativeDriver: true
      }).start();
    }
    const onHandlerStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        if (event.nativeEvent.absoluteY < StatusBarHeight) {
          Animated.timing(GoDownByY, {
            toValue: -100,
            duration: 100,
            useNativeDriver: true
          }).start();
        } else {
          Animated.sequence([
            Animated.timing(GoDownByY, {
              toValue: StatusBarHeight - 40,
              duration: 100,
              useNativeDriver: true
            }),
            Animated.delay(3000),
            Animated.timing(GoDownByY, {
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
        <Animated.View style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', height: 60, width: '90%', position: 'absolute', zIndex: 1000, top: 40, marginHorizontal: '5%', flexDirection: 'row', borderColor: 'black', borderRadius: 15, borderWidth: 1, transform: [{translateY: GoDownByY.interpolate({inputRange: [0, 10], outputRange: [0, 10]})}]}}>
          <TouchableOpacity onPress={NotificationPressed} style={{flexDirection: 'row'}}>
            <View style={{width: '20%', minWidth: '20%', maxWidth: '20%', justifyContent: 'center', alignItems: 'center'}}>
              <Avatar style={{width: 40, height: 40}} resizeMode="cover" source={{uri: notification != false ? notification.request.content.data.profilePicture ? notification.request.content.data.profilePicture : SocialSquareLogo_B64_png : SocialSquareLogo_B64_png}}/>
            </View>
            <View style={{width: '80%', minWidth: '80%', maxWidth: '80%'}}>
              <Text numberOfLines={1} style={{color: 'white', fontSize: 16, fontWeight: 'bold', marginRight: 15}}>{notification != false ? notification.request.content.title : 'No Notification Data'}</Text>
              <Text numberOfLines={2} style={{color: 'white', fontSize: 14, marginTop: 2, marginRight: 15}}>{notification != false ? notification.request.content.body : 'No Notification Data'}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    )
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
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>No internet connection</Text>
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
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 16, position: 'absolute', left: 71}}>{storedCredentials.name}</Text>
              </View>
              <View style={{width: '100%', backgroundColor: 'white', height: 3, borderColor: 'white', borderWidth: 1, borderRadius: 20, width: '96%', alignSelf: 'center'}}/>
              <FlatList
                data={allCredentialsStoredList}
                inverted={true}
                renderItem={({item}) => (
                  <>
                    {item.secondId != storedCredentials.secondId ?
                      <TouchableOpacity onPress={() => {goToAccount(item)}} style={{flexDirection: 'row', justifyContent: 'flex-start', height: 60, alignItems: 'flex-start'}}>
                        <Avatar style={{width: 40, height: 40, marginLeft: 15}} resizeMode="cover" source={{uri: item.profilePictureUri}}/>
                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 16, position: 'absolute', left: 71}}>{item.name}</Text>
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
                <Text style={{color: colors.tertiary, fontSize: 16, marginTop: 20, marginLeft: 15, fontWeight: 'bold'}}>{'Switched to ' + storedCredentials.name}</Text>
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

  if (isReady == false) {
    async function cacheResourcesAsync() {
      AsyncStorage.getItem('socialSquareCredentials').then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
        async function refreshProfilePictureContext(credentials) {
          const getProfilePicture = () => {
            const url = `https://nameless-dawn-41038.herokuapp.com/user/getProfilePic/${credentials.name}`;
    
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
                    axios.get(`https://nameless-dawn-41038.herokuapp.com/getImage/${data}`)
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
  
      const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
      }); 
      return Promise.all(cacheImages);
    }
    async function toDoOnFinish() {
      setIsReady(true);
    }
    return (
      <AppLoading
        startAsync={cacheResourcesAsync}
        onFinish={toDoOnFinish}
        onError={console.warn}
      />
    ); } else {
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
                          {AppStylingContextState != 'Default' && AppStylingContextState != 'Light' && AppStylingContextState != 'Dark' && AppStylingContextState != 'PureDark' && AppStylingContextState != 'PureLight' ? previousStylingState.current != AppStylingContextState ? setCurrentSimpleStylingDataToStyle(AppStylingContextState) : null : null}
                          <AppearanceProvider>
                            <NavigationContainer ref={navigationRef} theme={AppStylingContextState == 'Default' ? scheme === 'dark' ? AppDarkTheme : AppLightTheme : AppStylingContextState == 'Dark' ? AppDarkTheme : AppStylingContextState == 'Light' ? AppLightTheme : AppStylingContextState == 'PureDark' ? AppPureDarkTheme : AppStylingContextState == 'PureLight' ? AppPureLightTheme : currentSimpleStylingData} onStateChange={() => {console.log('Screen changed')}}>
                              {lockSocialSquare == false ?
                                showPlaceholderScreen == true && (appStateVisible == 'background' || appStateVisible == 'inactive') &&
                                    <Image source={require('./assets/Splash_Screen.png')} resizeMode="contain" style={{width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 100, backgroundColor: '#3B4252', borderWidth: 0}}/>
                                :
                                  showSocialSquareLockedWarning == false ?
                                    previousAppStateVisible == 'inactive' || previousAppStateVisible == 'background' ?
                                      biometricsCanBeUsed == false ? null :
                                        openApp == false ?
                                            <Image source={require('./assets/Splash_Screen.png')} resizeMode="contain" style={{width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 100, backgroundColor: '#3B4252', borderWidth: 0}}/>
                                        : null
                                    : appStateVisible == 'inactive' || appStateVisible == 'background' ?
                                          <Image source={require('./assets/Splash_Screen.png')} resizeMode="contain" style={{width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 100, backgroundColor: '#3B4252', borderWidth: 0}}/>
                                      : openApp == false ? biometricsCanBeUsed == false ? null :
                                          <Image source={require('./assets/Splash_Screen.png')} resizeMode="contain" style={{width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 100, backgroundColor: '#3B4252', borderWidth: 0}}/>
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
                              <NotificationBox/>
                              <Animated.View style={{position: 'absolute', height: '100%', width: '100%', top: 0, right: 0, zIndex: DismissAccountSwitcherBoxActivated.interpolate({inputRange: [0, 1], outputRange: [-10, 997]})}}>
                                <TouchableOpacity style={{height: '100%', width: '100%'}} onPress={() => {
                                    console.log('Account Switcher Dismiss Box pressed')
                                    Animated.timing(DismissAccountSwitcherBoxActivated, { toValue: 0, duration: 1, useNativeDriver: true }).start();
                                    Animated.timing(AccountSwitcherY, {toValue: 250, duration: 100, useNativeDriver: true}).start()
                                  }}
                                />
                              </Animated.View>
                              <DisconnectedFromInternetBox/>
                              <AccountSwitcher/>
                              <AccountSwitchedBox/>
                              <Start_Stack/>
                            </NavigationContainer>
                          </AppearanceProvider>
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

export default App;

