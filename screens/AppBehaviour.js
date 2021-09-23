import React, {useState, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import {useTheme} from '@react-navigation/native';

import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
} from '../screens/screenStylings/styling.js';
import {View, ActivityIndicator, ImageBackground, StyleSheet, useColorScheme, SafeAreaView, Image, Text} from 'react-native';


const AppBehaviour = ({navigation}) => {
    const {colors} = useTheme();
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
            <Text style={{color: colors.tertiary, fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Coming soon :)</Text>
        </View>
    );
}

export default AppBehaviour;
