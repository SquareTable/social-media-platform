import React, {useState, useContext, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
} from './screenStylings/styling.js';
import {View, Image, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import SwitchToggle from "react-native-switch-toggle";
import AsyncStorage from '@react-native-async-storage/async-storage';


const AppStyling = ({navigation}) => {
    const {colors} = useTheme();
    return(
        <SafeAreaView style={{justifyContent: 'center', alignContent: 'center', flex: 1}}>
            <Text style={{color: colors.tertiary, fontSize: 40, fontWeight: 'bold', textAlign: 'center'}}>Coming soon :0</Text>
        </SafeAreaView>
    );
}

export default AppStyling;
