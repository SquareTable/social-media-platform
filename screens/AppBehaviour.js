import React, {useState, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import {useTheme} from '@react-navigation/native';

import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
} from '../screens/screenStylings/styling.js';
import {View, ActivityIndicator, ImageBackground, StyleSheet, useColorScheme, SafeAreaView, Image, Text} from 'react-native';
import SwitchToggle from "react-native-switch-toggle";
import { AppBehaviourContext } from '../components/AppBehaviourContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AppBehaviour = ({navigation}) => {
    const {colors} = useTheme();
    const {AppBehaviour_Context, setAppBehaviour_Context} = useContext(AppBehaviourContext);
    const {PlayAudioInSilentMode} = AppBehaviour_Context
    const [PlayAudioInSilentMode_useState, setPlayAudioInSilentMode_useState] = useState(PlayAudioInSilentMode);
    const setContextAndAsyncStorage = (type) => {
        if (type == 'PlayAudioInSilentMode') {
            if (PlayAudioInSilentMode_useState == true) {
                setPlayAudioInSilentMode_useState(false);
            } else {
                setPlayAudioInSilentMode_useState(true);
            }
        }
        const list = {PlayAudioOnSilentMode: PlayAudioInSilentMode_useState};
        
        setAppBehaviour_Context(list);
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
            <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 10, justifyContent: 'flex-start'}}>
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
            <Text style={{color: colors.tertiary, fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Coming soon :)</Text>
            <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Not working at the moment</Text>
        </View>
    );
}

export default AppBehaviour;
