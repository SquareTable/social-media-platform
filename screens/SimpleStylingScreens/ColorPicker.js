import React, {useState, useEffect, createRef} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
} from '../screenStylings/styling.js'
import Icon from 'react-native-vector-icons/Entypo';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import { Formik } from 'formik';

import KeyboardAvoidingWrapper_NoScrollview from '../../components/KeyboardAvoidingWrapper_NoScrollview.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ColorPicker from 'react-native-wheel-color-picker'

const Simple_ColorPickerScreen = ({navigation, route}) => {
    const {name, type, dark, primary, tertiary, borderColor, background, secondary, darkLight, brand, green, red, darkest, greyish, bronzeRarity, darkestBlue, StatusBarColor, navFocusedColor, navNonFocusedColor, orange, yellow, purple, slightlyLighterGrey, midWhite, slightlyLighterPrimary, descTextColor, errorColor} = route.params;
    let ColorPickerRef = createRef()
    const [reRender, setReRender] = useState(0)
    const StatusBarHeight = Constants.statusBarHeight

    return (
        <>
            <StatusBar style={StatusBarColor}/>
            <ChatScreen_Title style={{backgroundColor: primary, borderWidth: 0}}>
                <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                    <Octicons name={"x"} size={40} color={tertiary} />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: tertiary, fontSize: 18}}>Edit {type == 'primary' ? 'Background' : type == 'tertiary' ? 'Text and Image Tint' : type == 'secondary' ? 'Secondary' : type == 'darkLight' ? 'Dark Light' : type == 'brand' ? 'Brand' : type == 'green' ? 'Green' : type == 'red' ? 'Red' : type == 'orange' ? 'Orange' : type == 'yellow' ? 'yellow' : type == 'purple' ? 'Purple' : type == 'greyish' ? 'Greyish' : type == 'bronzeRarity' ? 'Bronze Badge' : type == 'darkestBlue' ? 'Darkest Blue' : type == 'navFocusedColor' ? 'Nav Focused Color' : type == 'navNonFocusedColor' ? 'Nav Non Focused Color' : type == 'borderColor' ? 'Border' : type == 'slightlyLighterGrey' ? 'Slightly Lighter Grey' : type == 'midWhite' ? 'Mid White' : type == 'slightlyLighterPrimary' ? 'Slightly Lighter Primary' : type == 'descTextColor' ? 'Description Text' : type == 'statusBarColor' ? 'Status Bar' : type == 'errorColor' ? 'Error Colour' : 'ERROR OCCURED'} Color</TestText>
                    <TouchableOpacity onPress={() => {navigation.navigate('EditSimpleStyle', {name: name, type: null, dark: dark, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterPrimary, descTextColor: descTextColor})}} style={{position: 'absolute', right: 10, top: StatusBarHeight + 2}}>
                        <Octicons name={"check"} size={40} color={tertiary} />
                    </TouchableOpacity>
            </ChatScreen_Title>
            <View style={{backgroundColor: primary, height: '100%', alignItems: 'center', alignSelf: 'center', width: '100%'}}>
                {type != 'statusBarColor' ?
                    <View style={{height: '85%', width: '80%'}}>
                        <ColorPicker
                                ref={ColorPickerRef}
                                color={eval(type)}
                                swatchesOnly={false}
                                onColorChange={(color) => {console.log(color)}}
                                onColorChangeComplete={(color) => {type == 'primary' ? navigation.setParams({primary: color}) : type == 'tertiary' ? navigation.setParams({tertiary: color}) : type == 'secondary' ? navigation.setParams({secondary: color}) : type == 'darkLight' ? navigation.setParams({darkLight: color}) : type == 'brand' ? navigation.setParams({brand: color}) : type == 'green' ? navigation.setParams({green: color}) : type == 'red' ? navigation.setParams({red: color}) : type == 'orange' ? navigation.setParams({orange: color}) : type == 'yellow' ? navigation.setParams({yellow: color}) : type == 'purple' ? navigation.setParams({purple: color}) : type == 'greyish' ? navigation.setParams({greyish: color}) : type == 'bronzeRarity' ? navigation.setParams({bronzeRarity: color}) : type == 'darkestBlue' ? navigation.setParams({darkestBlue: color}) : type == 'navFocusedColor' ? navigation.setParams({navFocusedColor: color}) : type == 'navNonFocusedColor' ? navigation.setParams({navNonFocusedColor: color}) : type == 'borderColor' ? navigation.setParams({borderColor: color}) : type == 'slightlyLighterGrey' ? navigation.setParams({slightlyLighterGrey: color}) : type == 'midWhite' ? navigation.setParams({midWhite: color}) : type == 'slightlyLighterPrimary' ? navigation.setParams({slightlyLighterPrimary: color}) : type == 'descTextColor' ? navigation.setParams({descTextColor: color}) : type == 'errorColor' ? navigation.setParams({errorColor: color}) : null}}
                                thumbSize={40}
                                sliderSize={40}
                                noSnap={true}
                                row={false}
                                swatchesLast={true}
                                swatches={true}
                                discrete={false}
                        />
                        <TouchableOpacity onPress={() => {alert('Coming soon. This button might be removed in future releases though and might never be in the release of SocialSquare. If you want to revert your color changes, please press the x button at the top of the screen.')}} style={{borderColor: borderColor, borderWidth: 3, padding: 10, marginTop: 20}}>
                            <Text style={{color: 'red', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Revert</Text>
                        </TouchableOpacity>
                    </View>
                :
                    <>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => {StatusBarColor != 'light' ? navigation.setParams({StatusBarColor: 'light'}) : null}} style={{borderColor: borderColor, borderWidth: 5, borderRadius: 10, padding: 30, marginHorizontal: 5, paddingVertical: 70, flexDirection: 'column', alignItems: 'center'}}>
                                <Text style={{color: tertiary, fontSize: 30, fontWeight: 'bold'}}>Light</Text>
                                <View style={{marginTop: 20, backgroundColor: borderColor, minHeight: 30, height: 30, maxHeight: 30, minWidth: 30, width: 30, maxWidth: 30, borderRadius: 30/2, borderColor: StatusBarColor == 'light' ? brand : tertiary, borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
                                    {StatusBarColor == 'light' && (
                                        <View style={{backgroundColor: tertiary, minHeight: 15, height: 15, maxHeight: 15, minWidth: 15, width: 15, maxWidth: 15, borderRadius: 15/2}}/>
                                    )}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {StatusBarColor != 'dark' ? navigation.setParams({StatusBarColor: 'dark'}) : null}} style={{borderColor: borderColor, borderWidth: 5, borderRadius: 10, padding: 30, marginHorizontal: 5, paddingVertical: 70, flexDirection: 'column', alignItems: 'center'}}>
                                <Text style={{color: tertiary, fontSize: 30, fontWeight: 'bold'}}>Dark</Text>
                                <View style={{marginTop: 20, backgroundColor: borderColor, minHeight: 30, height: 30, maxHeight: 30, minWidth: 30, width: 30, maxWidth: 30, borderRadius: 30/2, borderColor: StatusBarColor == 'dark' ? brand : tertiary, borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
                                    {StatusBarColor == 'dark' && (
                                        <View style={{backgroundColor: tertiary, minHeight: 15, height: 15, maxHeight: 15, minWidth: 15, width: 15, maxWidth: 15, borderRadius: 15/2}}/>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                    </>
                }
            </View>
        </>
    );
}

export default Simple_ColorPickerScreen;