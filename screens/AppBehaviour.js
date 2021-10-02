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


const AppBehaviour = ({navigation}) => {
    const {colors} = useTheme();
    const [PlayAudioInSilentMode_useState, setPlayAudioInSilentMode_useState] = useState(undefined);
    useEffect(() => {
        async function setUp() {
            const value = await AsyncStorage.getItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage')
            console.log('Value of PlayAudioInSilentMode_AppBehaviour_AsyncStorage key is: ' + value)
            if (value == null) {
                setPlayAudioInSilentMode_useState(false)
                AsyncStorage.setItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage', 'false')
            } else if (value == 'true') {
                setPlayAudioInSilentMode_useState(true)
                AsyncStorage.setItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage', 'true')
            } else if (value == 'false') {
                setPlayAudioInSilentMode_useState(false)
                AsyncStorage.setItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured in setUp() function in AppBehaviour.js')
            }
        }
        setUp()
    })
   
    const setContextAndAsyncStorage = (type) => {
        if (type == 'PlayAudioInSilentMode') {
            if (PlayAudioInSilentMode_useState == true) {
                setPlayAudioInSilentMode_useState(false)
                AsyncStorage.setItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage', 'false')
            } else {
                setPlayAudioInSilentMode_useState(true)
                AsyncStorage.setItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage', 'true')
            }
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
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>App Behaviour</TestText>
            </ChatScreen_Title>
            <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 10, marginVertical: 20, justifyContent: 'flex-start', minHeight: 30, height: 30, maxHeight: 30}}>
                <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold'}}>Play audio on silent mode</Text>
                <SwitchToggle
                    switchOn={PlayAudioInSilentMode_useState}
                    onPress={() => {setContextAndAsyncStorage('PlayAudioInSilentMode')}}
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
            <TouchableOpacity onPress={() => {navigation.navigate('AppBehaviour_HomeScreen')}} style={{flex: 2, flexDirection: 'row', marginTop: 60, justifyContent: 'flex-start', minHeight: 30, height: 30, maxHeight: 30, borderColor: colors.borderColor, borderWidth: 3}}>
                <Text style={{color: colors.tertiary, marginHorizontal: 10, fontSize: 18, fontWeight: 'bold'}}>Home Screen options</Text>
                <Icon 
                    name="right"
                    size={20}
                    color={colors.tertiary}
                    style={{position: 'absolute', right: 10}}
                />
            </TouchableOpacity>
            <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 80, marginBottom: 10}}>More options coming soon :)</Text>
        </View>
    );
}

export default AppBehaviour;
