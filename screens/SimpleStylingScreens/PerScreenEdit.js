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

const PerScreenEdit = ({navigation, route}) => {
    const {name, indexNum, type, dark, stylingType, stylingVersion, primary, tertiary, borderColor, background, secondary, darkLight, brand, green, red, darkest, greyish, bronzeRarity, darkestBlue, StatusBarColor, navFocusedColor, navNonFocusedColor, orange, yellow, purple, slightlyLighterGrey, midWhite, slightlyLighterPrimary, descTextColor, errorColor, home, find, post, chat, profile} = route.params;
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
            <StatusBar style={StatusBarColor}/>
            <ProfileOptionsView style={{backgroundColor: primary, height: '80%', paddingBottom: 20}} viewHidden={InfoPageIsHidden}>
                <Text style={{color: tertiary, fontSize: 20, fontWeight: 'bold', marginTop: 10}}>Styling Information</Text>
                <View style={{width: '100%', backgroundColor: borderColor, minHeight: 1, maxHeight: 1}}/>
                <ScrollView>
                    <ColourInformationText titleText="Home" text="This is the group of screens that you can access by pressing the home button in the tab navigator at the bottom of your screen."/>
                    <ColourInformationText titleText="Find" text="This is the group of screens that you can access by pressing the find button in the tab navigator at the bottom of your screen. This includes the find screen and the visiting profile screen"/>
                    <ColourInformationText titleText="Post" text="This is the group of screens that you can access by pressing the post button in the tab navigator at the bottom of your screen. This includes the post screen, and audio, multimedia, poll, and thread post screens"/>
                    <ColourInformationText titleText="Chat" text="This is the group of screens that you can access by pressing the chat button in the tab navigator at the bottom of your screen."/>
                    <ColourInformationText titleText="Profile" text="This is the group of screens that you can access by pressing the profile button in the tab navigator at the bottom of your screen. This includes the profile screen and all settings screens"/>
                </ScrollView>
                <View style={{width: '100%', backgroundColor: borderColor, minHeight: 1, maxHeight: 1}}/>
            </ProfileOptionsView>
            <ChatScreen_Title style={{backgroundColor: primary, borderWidth: 0}}>
                <Navigator_BackButton onPress={() => {navigation.navigate('EditSimpleStyle', {name: name, indexNum: indexNum, type: type, dark: dark, stylingType: stylingType, stylingVersion: stylingVersion, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterPrimary, descTextColor: descTextColor, errorColor: errorColor, home: home, find: find, post: post, chat: chat, profile: profile})}}>
                    <Image
                    source={require('../../assets/app_icons/back_arrow.png')}
                    style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: tertiary}}
                    resizeMode="contain"
                    resizeMethod="resize"
                    />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: tertiary}}>Edit {name}</TestText>
                {
                    InfoPageIsHidden == true ?
                        <TouchableOpacity onPress={() => {setInfoPageIsHidden(false)}} style={{position: 'absolute', right: 10, top: StatusBarHeight + 2}}>
                            <Icon name="info-with-circle" size={40} color={tertiary}/>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity onPress={() => {setInfoPageIsHidden(true)}} style={{position: 'absolute', right: 17, top: StatusBarHeight}}>
                            <Octicons name={'x'} size={40} color={tertiary}/>
                        </TouchableOpacity>
                }
            </ChatScreen_Title>
            <View style={{backgroundColor: primary}}>
                {InfoPageIsHidden == true ?
                    <ScrollView style={{height: '100%'}} contentContainerStyle={{alignItems: 'center', backgroundColor: primary}}>
                        <Text style={{backgroundColor: primary, color: tertiary}}>Styling Version V{stylingVersion || 'ERROR OCCURED'}</Text>

                        <TouchableOpacity style={{justifyContent: 'center', borderColor: borderColor, borderWidth: 3, marginVertical: 10, borderRadius: 50, padding: 20, width: '90%'}} onPress={() => {
                            //navigation.navigate('Simple_ColorPickerScreen', {name: name, indexNum: indexNum, type: type, dark: dark, stylingType: stylingType, stylingVersion: stylingVersion, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterGrey, descTextColor: descTextColor, errorColor: errorColor, home: home, find: find, post: post, chat: chat, profile: profile});
                        }}>
                            <Text style={{fontSize: 20, color: tertiary, fontWeight: 'bold', textAlign: 'center'}}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{justifyContent: 'center', borderColor: borderColor, borderWidth: 3, marginVertical: 10, borderRadius: 50, padding: 20, width: '90%'}} onPress={() => {
                            //navigation.navigate('Simple_ColorPickerScreen', {name: name, indexNum: indexNum, type: type, dark: dark, stylingType: stylingType, stylingVersion: stylingVersion, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterGrey, descTextColor: descTextColor, errorColor: errorColor, home: home, find: find, post: post, chat: chat, profile: profile});
                        }}>
                            <Text style={{fontSize: 20, color: tertiary, fontWeight: 'bold', textAlign: 'center'}}>Find</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{justifyContent: 'center', borderColor: borderColor, borderWidth: 3, marginVertical: 10, borderRadius: 50, padding: 20, width: '90%'}} onPress={() => {
                            navigation.navigate('EditPostGroupScreens', {name: name, indexNum: indexNum, type: type, dark: dark, stylingType: stylingType, stylingVersion: stylingVersion, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterGrey, descTextColor: descTextColor, errorColor: errorColor, home: home, find: find, post: post, chat: chat, profile: profile});
                        }}>
                            <Text style={{fontSize: 20, color: tertiary, fontWeight: 'bold', textAlign: 'center'}}>Post</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{justifyContent: 'center', borderColor: borderColor, borderWidth: 3, marginVertical: 10, borderRadius: 50, padding: 20, width: '90%'}} onPress={() => {
                            //navigation.navigate('Simple_ColorPickerScreen', {name: name, indexNum: indexNum, type: type, dark: dark, stylingType: stylingType, stylingVersion: stylingVersion, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterGrey, descTextColor: descTextColor, errorColor: errorColor, home: home, find: find, post: post, chat: chat, profile: profile});
                        }}>
                            <Text style={{fontSize: 20, color: tertiary, fontWeight: 'bold', textAlign: 'center'}}>Chat</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{justifyContent: 'center', borderColor: borderColor, borderWidth: 3, marginVertical: 10, borderRadius: 50, padding: 20, width: '90%'}} onPress={() => {
                            //navigation.navigate('Simple_ColorPickerScreen', {name: name, indexNum: indexNum, type: type, dark: dark, stylingType: stylingType, stylingVersion: stylingVersion, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterGrey, descTextColor: descTextColor, errorColor: errorColor, home: home, find: find, post: post, chat: chat, profile: profile});
                        }}>
                            <Text style={{fontSize: 20, color: tertiary, fontWeight: 'bold', textAlign: 'center'}}>Profile</Text>
                        </TouchableOpacity>

                    </ScrollView>
                :
                        <View style={{height: '100%', backgroundColor: primary}}/>
                }
            </View>
        </>
    );
}

export default PerScreenEdit;