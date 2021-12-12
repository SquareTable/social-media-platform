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
    const {name, type, dark, primary, tertiary, borderColor, background, secondary, darkLight, brand, green, red, darkest, greyish, bronzeRarity, darkestBlue, StatusBarColor, navFocusedColor, navNonFocusedColor, orange, yellow, purple, slightlyLighterGrey, midWhite, slightlyLighterPrimary, descTextColor, errorColor, home, find, post, chat, profile, bottomNavigationBar, postViews, placeToNavigateBackTo} = route.params;
    let ColorPickerRef = createRef()
    const [reRender, setReRender] = useState(0)
    const [typeOnNavigate, setTypeOnNavigate] = useState(null)
    const StatusBarHeight = Constants.statusBarHeight

    useEffect(() => {
        if (type == 'multimediaImageBorderColor' || type == 'multimediaImageActivatedBorderColor' || type == 'multimediaImageTintColor') {
            setTypeOnNavigate('multimedia')
        } else if (type == 'threadImageBorderColor' || type == 'threadImageActivatedBorderColor' || type == 'threadImageTintColor') {
            setTypeOnNavigate('thread')
        } else if (type == 'pollImageBorderColor' || type == 'pollImageActivatedBorderColor' || type == 'pollImageTintColor') {
            setTypeOnNavigate('poll')
        } else if (type == 'audioImageBorderColor' || type == 'audioImageActivatedBorderColor' || type == 'audioImageTintColor') {
            setTypeOnNavigate('audio')
        }
    }, [])

    const setNavigationRouteToColor = (type, color) => {
        if (type == 'PostScreenTitleColor') {
            let temp = post;
            temp.postScreenColors.titleTextColor = color;
            navigation.setParams({post: temp})
        } else if (type == 'PostScreenSelectFormatMessageColor') {
            let temp = post;
            temp.postScreenColors.selectAFormatTextColor = color;
            navigation.setParams({post: temp})
        } else if (type == 'PostScreenSelectAFormatTextErrorColor') {
            let temp = post;
            temp.postScreenColors.errorMessage = color;
            navigation.setParams({post: temp})
        } else if (type == 'PostScreenBackgroundColor') {
            let temp = post;
            temp.postScreenColors.backgroundColor = color;
            navigation.setParams({post: temp})
        } else if (type == 'PostScreenStatusBarColor') {
            let temp = post;
            temp.postScreenColors.statusBarColor = color;
            navigation.setParams({post: temp})
        } else if (type == 'statusBarColor') {
            navigation.setParams({statusBarColor: color});
        } else if (type == 'multimediaImageActivatedBorderColor') {
            let temp = post;
            temp.postScreenColors.multimediaImageActivatedBorderColor = color;
            navigation.setParams({post: temp});
        } else if (type == 'audioImageActivatedBorderColor') {
            let temp = post;
            temp.postScreenColors.audioImageActivatedBorderColor = color;
            navigation.setParams({post: temp})
        } else if (type == 'threadImageActivatedBorderColor') {
            let temp = post;
            temp.postScreenColors.threadImageActivatedBorderColor = color;
            navigation.setParams({post: temp})
        } else if (type == 'pollImageActivatedBorderColor') {
            let temp = post;
            temp.postScreenColors.pollImageActivatedBorderColor = color;
            navigation.setParams({post: temp});
        } else if (type == 'multimediaImageBorderColor') {
            let temp = post;
            temp.postScreenColors.multimediaImageBorderColor = color;
            navigation.setParams({post: temp});
        } else if (type == 'audioImageBorderColor') {
            let temp = post;
            temp.postScreenColors.audioImageBorderColor = color;
            navigation.setParams({post: temp});
        } else if (type == 'pollImageBorderColor') {
            let temp = post;
            temp.postScreenColors.pollImageBorderColor = color;
            navigation.setParams({post: temp});
        } else if (type == 'threadImageBorderColor') {
            let temp = post;
            temp.postScreenColors.threadImageBorderColor = color;
            navigation.setParams({post: temp});
        } else if (type == 'multimediaImageTintColor') {
            let temp = post;
            temp.postScreenColors.multimediaImageTintColor = color;
            navigation.setParams({post: temp});
        } else if (type == 'threadImageTintColor') {
            let temp = post;
            temp.postScreenColors.threadImageTintColor = color;
            navigation.setParams({post: temp});
        } else if (type == 'pollImageTintColor') {
            let temp = post;
            temp.postScreenColors.pollImageTintColor = color;
            navigation.setParams({post: temp});
        } else if (type == 'audioImageTintColor') {
            let temp = post;
            temp.postScreenColors.audioImageTintColor = color;
            navigation.setParams({post: temp});
        } else if (type == 'PostScreenContinueButtonBackgroundColor') {
            let temp = post;
            temp.postScreenColors.continueButtonBackgroundColor = color;
            navigation.setParams({post: temp})
        } else if (type == 'PostScreenContinueButtonTextColor') {
            let temp = post;
            temp.postScreenColors.continueButtonTextColor = color;
            navigation.setParams({post: temp})
        }
    }

    function isStatusBarDarkOrLight() {
        if (type == 'statusBarColor') {
            if (statusBarColor == 'light') {
                return 'light';
            } else {
                return 'dark';
            }
        } else if (type == 'PostScreenStatusBarColor') {
            if (post.postScreenColors.statusBarColor == 'light') {
                return 'light';
            } else {
                return 'dark';
            }
        }
    }

    return (
        <>
            <StatusBar style={StatusBarColor}/>
            <ChatScreen_Title style={{backgroundColor: primary, borderWidth: 0}}>
                <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                    <Octicons name={"x"} size={40} color={tertiary} />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: tertiary, fontSize: 14, marginVertical: 4}}>Edit {type == 'primary' ? 'Background' : type == 'tertiary' ? 'Text and Image Tint' : type == 'secondary' ? 'Secondary' : type == 'darkLight' ? 'Dark Light' : type == 'brand' ? 'Brand' : type == 'green' ? 'Green' : type == 'red' ? 'Red' : type == 'orange' ? 'Orange' : type == 'yellow' ? 'yellow' : type == 'purple' ? 'Purple' : type == 'greyish' ? 'Greyish' : type == 'bronzeRarity' ? 'Bronze Badge' : type == 'darkestBlue' ? 'Darkest Blue' : type == 'navFocusedColor' ? 'Nav Focused Color' : type == 'navNonFocusedColor' ? 'Nav Non Focused Color' : type == 'borderColor' ? 'Border' : type == 'slightlyLighterGrey' ? 'Slightly Lighter Grey' : type == 'midWhite' ? 'Mid White' : type == 'slightlyLighterPrimary' ? 'Slightly Lighter Primary' : type == 'descTextColor' ? 'Description Text' : type == 'statusBarColor' ? 'Status Bar' : type == 'errorColor' ? 'Error Colour' : type == 'PostScreenTitleColor' ? 'Post Screen Title' : type == 'PostScreenSelectFormatMessageColor' ? 'Select A Format Msg' : type == 'PostScreenSelectAFormatTextErrorColor' ? 'Post Screen Error' : type == 'PostScreenBackgroundColor' ? 'Post Screen Background' : type == 'PostScreenStatusBarColor' ? 'Post Screen Status Bar' : type == 'multimediaImageTintColor' ? 'Multimedia Image Tint' : type == 'multimediaImageBorderColor' ? 'Multimedia Image Border' : type == 'multimediaImageActivatedBorderColor' ? 'Multimedia Image Activated Border' : type == 'threadImageTintColor' ? 'Thread Image Tint' : type == 'threadImageBorderColor' ? 'Thread Image Border' : type == 'threadImageActivatedBorderColor' ? 'Thread Image Activated Border' : type == 'pollImageBorderColor' ? 'Poll Image Border' : type == 'pollImageActivatedBorderColor' ? 'Poll Image Activated Border' : type == 'pollImageTintColor' ? 'Poll Image Tint' : type == 'audioImageTintColor' ? 'Audio Image Tint' : type == 'audioImageBorderColor' ? 'Audio Image Border' : type == 'audioImageActivatedBorderColor' ? 'Audio Image Activated Border' : type == 'PostScreenContinueButtonBackgroundColor' ? 'Continue Button Background' : type == 'PostScreenContinueButtonTextColor' ? 'Continue Button Text' : 'ERROR OCCURED'} Color</TestText>
                <TouchableOpacity onPress={() => {navigation.navigate(placeToNavigateBackTo, {name: name, type: typeOnNavigate == null ? null : typeOnNavigate, dark: dark, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterPrimary, descTextColor: descTextColor, errorColor: errorColor, home: home, find: find, post: post, chat: chat, profile: profile, bottomNavigationBar: bottomNavigationBar, postViews: postViews})}} style={{position: 'absolute', right: 10, top: StatusBarHeight + 2}}>
                    <Octicons name={"check"} size={40} color={tertiary} />
                </TouchableOpacity>
            </ChatScreen_Title>
            <View style={{backgroundColor: primary, height: '100%', alignItems: 'center', alignSelf: 'center', width: '100%'}}>
                {type == 'statusBarColor' || type == 'PostScreenStatusBarColor' ?
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {setNavigationRouteToColor(type, 'light')}} style={{borderColor: borderColor, borderWidth: 5, borderRadius: 10, padding: 30, marginHorizontal: 5, paddingVertical: 70, flexDirection: 'column', alignItems: 'center'}}>
                            <Text style={{color: tertiary, fontSize: 30, fontWeight: 'bold'}}>Light</Text>
                            <View style={{marginTop: 20, backgroundColor: borderColor, minHeight: 30, height: 30, maxHeight: 30, minWidth: 30, width: 30, maxWidth: 30, borderRadius: 30/2, borderColor: isStatusBarDarkOrLight() == 'light' ? brand : tertiary, borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
                                {isStatusBarDarkOrLight() == 'light' && (
                                    <View style={{backgroundColor: tertiary, minHeight: 15, height: 15, maxHeight: 15, minWidth: 15, width: 15, maxWidth: 15, borderRadius: 15/2}}/>
                                )}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setNavigationRouteToColor(type, 'dark')}} style={{borderColor: borderColor, borderWidth: 5, borderRadius: 10, padding: 30, marginHorizontal: 5, paddingVertical: 70, flexDirection: 'column', alignItems: 'center'}}>
                            <Text style={{color: tertiary, fontSize: 30, fontWeight: 'bold'}}>Dark</Text>
                            <View style={{marginTop: 20, backgroundColor: borderColor, minHeight: 30, height: 30, maxHeight: 30, minWidth: 30, width: 30, maxWidth: 30, borderRadius: 30/2, borderColor: isStatusBarDarkOrLight() == 'dark' ? brand : tertiary, borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
                                {isStatusBarDarkOrLight() == 'dark' && (
                                    <View style={{backgroundColor: tertiary, minHeight: 15, height: 15, maxHeight: 15, minWidth: 15, width: 15, maxWidth: 15, borderRadius: 15/2}}/>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                :
                    <>
                        <View style={{height: '85%', width: '80%'}}>
                        <ColorPicker
                                ref={ColorPickerRef}
                                color={type == 'PostScreenTitleColor' ? post.postScreenColors.titleTextColor : type == 'PostScreenSelectFormatMessageColor' ? post.postScreenColors.selectAFormatTextColor : type == 'PostScreenSelectAFormatTextErrorColor' ? post.postScreenColors.errorMessage : type == 'PostScreenBackgroundColor' ? post.postScreenColors.backgroundColor : type == 'multimediaImageTintColor' ? post.postScreenColors.multimediaImageTintColor : type == 'multimediaImageActivatedBorderColor' ? post.postScreenColors.multimediaImageActivatedBorderColor : type == 'multimediaImageBorderColor' ? post.postScreenColors.multimediaImageBorderColor : type == 'threadImageTintColor' ? post.postScreenColors.threadImageTintColor : type == 'threadImageBorderColor' ? post.postScreenColors.threadImageBorderColor : type == 'threadImageActivatedBorderColor' ? post.postScreenColors.threadImageActivatedBorderColor : type == 'audioImageTintColor' ? post.postScreenColors.audioImageTintColor : type == 'audioImageActivatedBorderColor' ? post.postScreenColors.audioImageActivatedBorderColor : type == 'audioImageBorderColor' ? post.postScreenColors.audioImageBorderColor : type == 'pollImageTintColor' ? post.postScreenColors.pollImageTintColor : type == 'pollImageActivatedBorderColor' ? post.postScreenColors.pollImageActivatedBorderColor : type == 'pollImageBorderColor' ? post.postScreenColors.pollImageBorderColor : type == 'PostScreenContinueButtonBackgroundColor' ? post.postScreenColors.continueButtonBackgroundColor : type == 'PostScreenContinueButtonTextColor' ? post.postScreenColors.continueButtonTextColor : eval(type)}
                                swatchesOnly={false}
                                onColorChange={(color) => {console.log(color)}}
                                onColorChangeComplete={(color) => {type == 'primary' ? navigation.setParams({primary: color}) : type == 'tertiary' ? navigation.setParams({tertiary: color}) : type == 'secondary' ? navigation.setParams({secondary: color}) : type == 'darkLight' ? navigation.setParams({darkLight: color}) : type == 'brand' ? navigation.setParams({brand: color}) : type == 'green' ? navigation.setParams({green: color}) : type == 'red' ? navigation.setParams({red: color}) : type == 'orange' ? navigation.setParams({orange: color}) : type == 'yellow' ? navigation.setParams({yellow: color}) : type == 'purple' ? navigation.setParams({purple: color}) : type == 'greyish' ? navigation.setParams({greyish: color}) : type == 'bronzeRarity' ? navigation.setParams({bronzeRarity: color}) : type == 'darkestBlue' ? navigation.setParams({darkestBlue: color}) : type == 'navFocusedColor' ? navigation.setParams({navFocusedColor: color}) : type == 'navNonFocusedColor' ? navigation.setParams({navNonFocusedColor: color}) : type == 'borderColor' ? navigation.setParams({borderColor: color}) : type == 'slightlyLighterGrey' ? navigation.setParams({slightlyLighterGrey: color}) : type == 'midWhite' ? navigation.setParams({midWhite: color}) : type == 'slightlyLighterPrimary' ? navigation.setParams({slightlyLighterPrimary: color}) : type == 'descTextColor' ? navigation.setParams({descTextColor: color}) : type == 'errorColor' ? navigation.setParams({errorColor: color}) : setNavigationRouteToColor(type, color)}}
                                thumbSize={40}
                                sliderSize={40}
                                noSnap={true}
                                row={false}
                                swatchesLast={true}
                                swatches={true}
                                discrete={false}
                        />
                    </View>
                    </>
                }
            </View>
        </>
    );
}

export default Simple_ColorPickerScreen;