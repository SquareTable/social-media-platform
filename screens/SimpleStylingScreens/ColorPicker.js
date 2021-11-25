import React, {useState, useEffect, createRef} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
} from '../screenStylings/styling.js'
import Icon from 'react-native-vector-icons/Entypo';
import Constants from 'expo-constants';

import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import { Formik } from 'formik';

import KeyboardAvoidingWrapper_NoScrollview from '../../components/KeyboardAvoidingWrapper_NoScrollview.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ColorPicker from 'react-native-wheel-color-picker'

const Simple_ColorPickerScreen = ({navigation, route}) => {
    const {name, type, dark, primary, tertiary, borderColor, background, secondary, darkLight, brand, green, red, darkest, greyish, bronzeRarity, darkestBlue, StatusBarColor, navFocusedColor, navNonFocusedColor, orange, yellow, purple, slightlyLighterGrey, midWhite, slightlyLighterPrimary, descTextColor} = route.params;
    let ColorPickerRef = createRef()
    const [reRender, setReRender] = useState(0)
    const StatusBarHeight = Constants.statusBarHeight

    return (
        <>
            <ChatScreen_Title style={{backgroundColor: primary, borderWidth: 0}}>
                <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                    <Octicons name={"x"} size={40} color={tertiary} />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: tertiary, fontSize: 18}}>Edit {type == 'primary' ? 'Background' : type == 'tertiary' ? 'Text and Image Tint' : 'Border'} Color</TestText>
                    <TouchableOpacity onPress={() => {navigation.navigate('EditSimpleStyle', {name: name, type: null, dark: dark, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterPrimary, descTextColor: descTextColor})}} style={{position: 'absolute', right: 10, top: StatusBarHeight + 2}}>
                        <Octicons name={"check"} size={40} color={tertiary} />
                    </TouchableOpacity>
            </ChatScreen_Title>
            <View style={{backgroundColor: primary, height: '100%', alignItems: 'center', alignSelf: 'center', width: '100%'}}>
                <View style={{height: '100%', width: '80%'}}>
                    <ColorPicker
                            ref={ColorPickerRef}
                            color={type == 'primary' ? primary : type == 'tertiary' ? tertiary : borderColor}
                            swatchesOnly={false}
                            onColorChange={(color) => {console.log(color)}}
                            onColorChangeComplete={(color) => {type == 'primary' ? navigation.setParams({primary: color}) : type == 'tertiary' ? navigation.setParams({tertiary: color}) : navigation.setParams({borderColor: color})}}
                            thumbSize={40}
                            sliderSize={40}
                            noSnap={true}
                            row={false}
                            swatchesLast={true}
                            swatches={true}
                            discrete={false}
                    />
                    <TouchableOpacity onPress={() => {alert('Coming soon')}} style={{borderColor: borderColor, borderWidth: 3, padding: 10, marginTop: 20}}>
                        <Text style={{color: 'red', fontSize: 20, fontWeight: 'bold'}}>Revert</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

export default Simple_ColorPickerScreen;