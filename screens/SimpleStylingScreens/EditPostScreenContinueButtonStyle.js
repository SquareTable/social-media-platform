import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
    ProfileOptionsView
} from '../screenStylings/styling.js'
import Icon from 'react-native-vector-icons/Entypo';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import {Octicons} from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const EditPostScreenContinueButtonStyle = ({navigation, route}) => {
    const {name, indexNum, type, dark, stylingType, stylingVersion, primary, tertiary, borderColor, background, secondary, darkLight, brand, green, red, darkest, greyish, bronzeRarity, darkestBlue, StatusBarColor, navFocusedColor, navNonFocusedColor, orange, yellow, purple, slightlyLighterGrey, midWhite, slightlyLighterPrimary, descTextColor, errorColor, home, find, post, chat, profile, bottomNavigationBar, postViews} = route.params;
    const StatusBarHeight = Constants.statusBarHeight;
    const [InfoPageIsHidden, setInfoPageIsHidden] = useState(true)

    const ColourInformationText = ({titleText, text}) => {
        return(
            <View style={{borderColor: borderColor, borderWidth: 3, marginVertical: 10, borderRadius: 10}}>
                <Text style={{color: tertiary, fontSize: 22, marginVertical: 5, textAlign: 'center', fontWeight: 'bold'}}>{`\u2022 ${titleText}`}</Text>
                <Text style={{color: tertiary, fontSize: 18, marginVertical: 5, textAlign: 'center'}}>{text}</Text>
            </View>
        );
    }
    return (
        <>
            <ChatScreen_Title style={{backgroundColor: primary, borderWidth: 0}}>
                <Navigator_BackButton onPress={() => {navigation.navigate('EditPostScreenStyle', {name: name, indexNum: indexNum, type: type, dark: dark, stylingType: stylingType, stylingVersion: stylingVersion, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterPrimary, descTextColor: descTextColor, errorColor: errorColor, home: home, find: find, post: post, chat: chat, profile: profile, bottomNavigationBar: bottomNavigationBar, postViews: postViews})}}>
                    <Image
                    source={require('../../assets/app_icons/back_arrow.png')}
                    style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: tertiary}}
                    resizeMode="contain"
                    resizeMethod="resize"
                    />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: tertiary, fontSize: 15, marginTop: 5}}>Editing Post Screen Continue Button</TestText>
            </ChatScreen_Title>
            <View style={{backgroundColor: primary}}>
                {InfoPageIsHidden == true ?
                    <View style={{flexDirection: 'column', alignItems: 'center', height: '100%'}}>
                        <Text style={{backgroundColor: primary, color: tertiary}}>Styling Version V{stylingVersion || 'ERROR OCCURED'}</Text>
                         <TouchableOpacity style={{justifyContent: 'center', borderColor: borderColor, borderWidth: 3, marginVertical: 10, borderRadius: 50, padding: 20, width: '90%'}} onPress={() => {
                            navigation.navigate('Simple_ColorPickerScreen', {name: name, indexNum: indexNum, type: 'PostScreenContinueButtonBackgroundColor', dark: dark, stylingType: stylingType, stylingVersion: stylingVersion, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterGrey, descTextColor: descTextColor, errorColor: errorColor, home: home, find: find, post: post, chat: chat, profile: profile, bottomNavigationBar: bottomNavigationBar, postViews: postViews, placeToNavigateBackTo: 'EditPostScreenContinueButtonStyle'});
                        }}>
                            <Text style={{fontSize: 20, color: tertiary, fontWeight: 'bold', textAlign: 'center'}}>Background Colour</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{justifyContent: 'center', borderColor: borderColor, borderWidth: 3, marginVertical: 10, borderRadius: 50, padding: 20, width: '90%'}} onPress={() => {
                            navigation.navigate('Simple_ColorPickerScreen', {name: name, indexNum: indexNum, type: 'PostScreenContinueButtonTextColor', dark: dark, stylingType: stylingType, stylingVersion: stylingVersion, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterGrey, descTextColor: descTextColor, errorColor: errorColor, home: home, find: find, post: post, chat: chat, profile: profile, bottomNavigationBar: bottomNavigationBar, postViews: postViews, placeToNavigateBackTo: 'EditPostScreenContinueButtonStyle'});
                        }}>
                            <Text style={{fontSize: 20, color: tertiary, fontWeight: 'bold', textAlign: 'center'}}>Text Colour</Text>
                        </TouchableOpacity>
                    </View>
                :
                        <View style={{height: '100%', backgroundColor: primary}}/>
                }
            </View>
        </>
    );
}

export default EditPostScreenContinueButtonStyle;