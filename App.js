import 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, SafeAreaView, Platform, Image, Animated, Vibration} from 'react-native';
import styled from "styled-components";
import LoginScreen from './screens/LoginScreen.js';
import { Start_Stack } from './navigation/Start_Stack.js';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { CredentialsContext } from './components/CredentialsContext';
import { AdIDContext } from './components/AdIDContext.js';
import { AppStylingContext } from './components/AppStylingContext.js';
import { RefreshAppStylingContext } from './components/RefreshAppStylingContext.js';
import { SimpleStylingVersion } from './components/StylingVersionsFile.js';
import SocialSquareLogo_B64_png from './assets/SocialSquareLogo_Base64_png.js';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { 
  Avatar 
} from './screens/screenStylings/styling.js';

const Stack = createStackNavigator();


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const App = () => {
  const StatusBarHeight = Constants.statusBarHeight;
  const [AppStylingContextState, setAppStylingContextState] = useState(null)
  const [AdID, setAdID] = useState('');
  const [refreshAppStyling, setRefreshAppStyling] = useState(false);
  const [AsyncStorageSimpleStylingData, setAsyncStorageSimpleStylingData] = useState()
  const [currentSimpleStylingData, setCurrentSimpleStylingData] = useState()
  const testID = Platform.OS == "ios" ? 'ca-app-pub-3940256099942544/2934735716' : 'ca-app-pub-3940256099942544/6300978111';
  const productionID = Platform.OS == 'ios' ? 'ca-app-pub-6980968247752885/8710919560' : 'ca-app-pub-6980968247752885/3057291726';
  // Is a real device and running in production.
  const adUnitID = Constants.isDevice && !__DEV__ ? productionID : testID;
  const previousStylingState = useRef(null)
  const AsyncSimpleStyling_ParsedRef = useRef(null)

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
      errorColor: '#FF0000' //red
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
      errorColor: '#FF0000' //red
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
      errorColor: '#FF0000' //red
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
      errorColor: '#FF0000' //red
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

  const NotificationBox = () => {
    let GoDownByY = new Animated.Value(StatusBarHeight - 40);
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
          Animated.timing(GoDownByY, {
            toValue: StatusBarHeight - 40,
            duration: 100,
            useNativeDriver: true
          }).start();
        }
      }
    }
    return(
      <PanGestureHandler onGestureEvent={onPanGestureEvent} onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', height: 60, width: '90%', position: 'absolute', zIndex: 1000, top: 40, marginHorizontal: '5%', flexDirection: 'row', borderColor: 'black', borderRadius: 15, borderWidth: 1, transform: [{translateY: GoDownByY.interpolate({inputRange: [0, 10], outputRange: [0, 10]})}]}}>
          <TouchableOpacity onPress={NotificationPressed} style={{flexDirection: 'row'}}>
            <View style={{width: '20%', minWidth: '20%', maxWidth: '20%', justifyContent: 'center', alignItems: 'center'}}>
              <Avatar style={{width: 40, height: 40}} resizeMode="cover" source={{uri: SocialSquareLogo_B64_png}}/>
            </View>
            <View style={{width: '80%', minWidth: '80%', maxWidth: '80%'}}>
              <Text numberOfLines={1} style={{color: 'white', fontSize: 16, fontWeight: 'bold', marginRight: 15}}>SebTheMan</Text>
              <Text numberOfLines={2} style={{color: 'white', fontSize: 14, marginTop: 2, marginRight: 15}}>Ayo guys are we still going to go to the mall today?</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    )
  }

  if (isReady == false) {
    async function cacheResourcesAsync() {
      AsyncStorage.getItem('socialSquareCredentials').then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
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
      ];
  
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
              {AppStylingContextState != 'Default' && AppStylingContextState != 'Light' && AppStylingContextState != 'Dark' && AppStylingContextState != 'PureDark' && AppStylingContextState != 'PureLight' ? previousStylingState.current != AppStylingContextState ? setCurrentSimpleStylingDataToStyle(AppStylingContextState) : null : null}
              <AppearanceProvider>
                <NavigationContainer theme={AppStylingContextState == 'Default' ? scheme === 'dark' ? AppDarkTheme : AppLightTheme : AppStylingContextState == 'Dark' ? AppDarkTheme : AppStylingContextState == 'Light' ? AppLightTheme : AppStylingContextState == 'PureDark' ? AppPureDarkTheme : AppStylingContextState == 'PureLight' ? AppPureLightTheme : currentSimpleStylingData} onStateChange={() => {console.log('Screen changed')}}>
                  <NotificationBox/>
                  <Start_Stack/>
                </NavigationContainer>
              </AppearanceProvider>
            </RefreshAppStylingContext.Provider>
          </AppStylingContext.Provider>
        </AdIDContext.Provider>
      </CredentialsContext.Provider>

    );
  }
};

export default App;

