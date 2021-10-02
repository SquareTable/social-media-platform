import React, {useState, useContext, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
} from '../screens/screenStylings/styling.js';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import SwitchToggle from "react-native-switch-toggle";
import AsyncStorage from '@react-native-async-storage/async-storage';


const AppBehaviour_HomeScreen = ({navigation}) => {
    const {colors} = useTheme();
    const [showPhotosAndVideos, setShowPhotosAndVideos] = useState(undefined);
    const [showAudio, setShowAudio] = useState(undefined);
    const [showThreads, setShowThreads] = useState(undefined);
    const [showPolls, setShowPolls] = useState(undefined);
    useEffect(() => {
        async function setUp() {
            const showPhotosAndVideosValue = await AsyncStorage.getItem('ShowPhotosAndVideos_AppBehaviour_AsyncStorage')
            console.log('ShowPhotosAndVideos_AppBehaviour_AsyncStorage key is: ' + showPhotosAndVideosValue)
            if (showPhotosAndVideosValue == null) {
                setShowPhotosAndVideos(true)
                AsyncStorage.setItem('ShowPhotosAndVideos_AppBehaviour_AsyncStorage', 'true')
            } else if (showPhotosAndVideosValue == 'true') {
                setShowPhotosAndVideos(true)
                AsyncStorage.setItem('ShowPhotosAndVideos_AppBehaviour_AsyncStorage', 'true')
            } else if (showPhotosAndVideosValue == 'false') {
                setShowPhotosAndVideos(false)
                AsyncStorage.setItem('ShowPhotosAndVideos_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured while getting ShowPhotosAndVideos value in setUp() function in AppBehaviour_HomeScreen.js')
            }

            const showAudioValue = await AsyncStorage.getItem('ShowAudio_AppBehaviour_AsyncStorage')
            console.log('ShowAudio_AppBehaviour_AsyncStorage key is: ' + showAudioValue)
            if (showAudioValue == null) {
                setShowAudio(true)
                AsyncStorage.setItem('ShowAudio_AppBehaviour_AsyncStorage', 'true')
            } else if (showAudioValue == 'true') {
                setShowAudio(true)
                AsyncStorage.setItem('ShowAudio_AppBehaviour_AsyncStorage', 'true')
            } else if (showAudioValue == 'false') {
                setShowAudio(false)
                AsyncStorage.setItem('ShowAudio_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured while getting ShowAudio value in setUp() function in AppBehaviour_HomeScreen.js')
            }

            const showPollsValue = await AsyncStorage.getItem('ShowPolls_AppBehaviour_AsyncStorage')
            console.log('ShowPolls_AppBehaviour_AsyncStorage key is: ' + showPollsValue)
            if (showPollsValue == null) {
                setShowPolls(true)
                AsyncStorage.setItem('ShowPolls_AppBehaviour_AsyncStorage', 'true')
            } else if (showPollsValue == 'true') {
                setShowPolls(true)
                AsyncStorage.setItem('ShowPolls_AppBehaviour_AsyncStorage', 'true')
            } else if (showPollsValue == 'false') {
                setShowPolls(false)
                AsyncStorage.setItem('ShowPolls_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured while getting ShowPolls value in setUp() function in AppBehaviour_HomeScreen.js')
            }

            const showThreadsValue = await AsyncStorage.getItem('ShowThreads_AppBehaviour_AsyncStorage')
            console.log('ShowThreads_AppBehaviour_AsyncStorage key is: ' + showThreadsValue)
            if (showThreadsValue == null) {
                setShowThreads(true)
                AsyncStorage.setItem('ShowThreads_AppBehaviour_AsyncStorage', 'true')
            } else if (showThreadsValue == 'true') {
                setShowThreads(true)
                AsyncStorage.setItem('ShowThreads_AppBehaviour_AsyncStorage', 'true')
            } else if (showThreadsValue == 'false') {
                setShowThreads(false)
                AsyncStorage.setItem('ShowThreads_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured while getting ShowThreads value in setUp() function in AppBehaviour_HomeScreen.js')
            }
        }
        setUp()
    })
   
    const setContextAndAsyncStorage = (type) => {
        if (type == 'ShowPhotosAndVideos') {
            if (showPhotosAndVideos == true) {
                setShowPhotosAndVideos(false)
                AsyncStorage.setItem('ShowPhotosAndVideos_AppBehaviour_AsyncStorage', 'false')
            } else {
                setShowPhotosAndVideos(true)
                AsyncStorage.setItem('ShowPhotosAndVideos_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else if (type == 'ShowAudio') {
            if (showAudio == true) {
                setShowAudio(false)
                AsyncStorage.setItem('ShowAudio_AppBehaviour_AsyncStorage', 'false')
            } else {
                setShowAudio(true)
                AsyncStorage.setItem('ShowAudio_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else if (type == 'ShowPolls') {
            if (showPolls == true) {
                setShowPolls(false)
                AsyncStorage.setItem('ShowPolls_AppBehaviour_AsyncStorage', 'false')
            } else {
                setShowPolls(true)
                AsyncStorage.setItem('ShowPolls_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else if (type == 'ShowThreads') {
            if (showThreads == true) {
                setShowThreads(false)
                AsyncStorage.setItem('ShowThreads_AppBehaviour_AsyncStorage', 'false')
            } else {
                setShowThreads(true)
                AsyncStorage.setItem('ShowThreads_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else {
            console.error('Wrong value entered')
        }
    }
    return(
        <View style={{backgroundColor: colors.primary, height: '100%'}}>
            <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                    <Image
                    source={require('../assets/app_icons/back_arrow.png')}
                    style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                    resizeMode="contain"
                    resizeMethod="resize"
                    />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>Home Screen Behaviour</TestText>
            </ChatScreen_Title>
            <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', marginLeft: 10, marginTop: 20}}>Show Posts</Text>
            <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 30, marginVertical: 20, justifyContent: 'flex-start', minHeight: 30, height: 30, maxHeight: 30}}>
                <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold'}}>Photos/Videos</Text>
                <SwitchToggle
                    switchOn={showPhotosAndVideos}
                    onPress={() => {setContextAndAsyncStorage('ShowPhotosAndVideos')}}
                    circleColorOff={colors.tertiary}
                    circleColorOn={colors.tertiary}
                    backgroundColorOn={colors.darkestBlue}
                    backgroundColorOff={colors.borderColor}
                    containerStyle={{
                        width: 50,
                        height: 28,
                        borderRadius: 25,
                        padding: 5,
                    }}
                    circleStyle={{
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                    }}
                />
            </View>
            <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 30, marginVertical: 20, justifyContent: 'flex-start', minHeight: 30, height: 30, maxHeight: 30}}>
                <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold'}}>Audio</Text>
                <SwitchToggle
                    switchOn={showAudio}
                    onPress={() => {setContextAndAsyncStorage('ShowAudio')}}
                    circleColorOff={colors.tertiary}
                    circleColorOn={colors.tertiary}
                    backgroundColorOn={colors.darkestBlue}
                    backgroundColorOff={colors.borderColor}
                    containerStyle={{
                        width: 50,
                        height: 28,
                        borderRadius: 25,
                        padding: 5,
                    }}
                    circleStyle={{
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                    }}
                />
            </View>
            <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 30, marginVertical: 20, justifyContent: 'flex-start', minHeight: 30, height: 30, maxHeight: 30}}>
                <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold'}}>Threads</Text>
                <SwitchToggle
                    switchOn={showThreads}
                    onPress={() => {setContextAndAsyncStorage('ShowThreads')}}
                    circleColorOff={colors.tertiary}
                    circleColorOn={colors.tertiary}
                    backgroundColorOn={colors.darkestBlue}
                    backgroundColorOff={colors.borderColor}
                    containerStyle={{
                        width: 50,
                        height: 28,
                        borderRadius: 25,
                        padding: 5,
                    }}
                    circleStyle={{
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                    }}
                />
            </View>
            <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 30, marginVertical: 20, justifyContent: 'flex-start', minHeight: 30, height: 30, maxHeight: 30}}>
                <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold'}}>Polls</Text>
                <SwitchToggle
                    switchOn={showPolls}
                    onPress={() => {setContextAndAsyncStorage('ShowPolls')}}
                    circleColorOff={colors.tertiary}
                    circleColorOn={colors.tertiary}
                    backgroundColorOn={colors.darkestBlue}
                    backgroundColorOff={colors.borderColor}
                    containerStyle={{
                        width: 50,
                        height: 28,
                        borderRadius: 25,
                        padding: 5,
                    }}
                    circleStyle={{
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                    }}
                />
            </View>
        </View>
    );
}

export default AppBehaviour_HomeScreen;
