import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
    ProfileOptionsView,
    PostIcons
} from '../screenStylings/styling.js'
import Icon from 'react-native-vector-icons/Entypo';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import {Octicons} from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const EditPostScreenIconColors = ({navigation, route}) => {
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
                <Navigator_BackButton onPress={() => {navigation.navigate('EditPostScreenStyle', {name: name, indexNum: indexNum, type: null, dark: dark, stylingType: stylingType, stylingVersion: stylingVersion, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterPrimary, descTextColor: descTextColor, errorColor: errorColor, home: home, find: find, post: post, chat: chat, profile: profile, bottomNavigationBar: bottomNavigationBar, postViews: postViews})}}>
                    <Image
                    source={require('../../assets/app_icons/back_arrow.png')}
                    style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: tertiary}}
                    resizeMode="contain"
                    resizeMethod="resize"
                    />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: tertiary, fontSize: 15, marginTop: 3}}>Edit Post Screen Buttons</TestText>
            </ChatScreen_Title>
            <View style={{backgroundColor: primary}}>
                <Text style={{fontSize: 16, color: tertiary, textAlign: 'center', fontWeight: 'bold', marginTop: 10, marginBottom: 10}}>Editing {type == 'multimedia' ? 'Post Screen Multimedia Post Button' : type == 'thread' ? 'Post Screen Thread Post Button' : type == 'audio' ? 'Post Screen Audio Post Button' : 'poll' ? 'Post Screen Poll Post Button' : 'ERROR OCCURED'}</Text>
                <Text style={{fontSize: 18, color: tertiary, textAlign: 'center', marginBottom: 20}}>Press on what part you want to edit</Text>
                {InfoPageIsHidden == true ?
                    <View style={{flexDirection: 'column', alignItems: 'center', height: '100%'}}>
                        <Text style={{backgroundColor: primary, color: tertiary}}>Styling Version V{stylingVersion || 'ERROR OCCURED'}</Text>
                         <TouchableOpacity style={{marginTop: 30, marginBottom: 10, alignItems: 'center'}} onPress={() => {
                            navigation.navigate('Simple_ColorPickerScreen', {name: name, indexNum: indexNum, type: (type + 'ImageTintColor'), dark: dark, stylingType: stylingType, stylingVersion: stylingVersion, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterGrey, descTextColor: descTextColor, errorColor: errorColor, home: home, find: find, post: post, chat: chat, profile: profile, bottomNavigationBar: bottomNavigationBar, postViews: postViews, placeToNavigateBackTo: 'EditPostScreenIconColors'});
                        }}>
                            <PostIcons style={{tintColor: type == 'multimedia' ? post.postScreenColors.multimediaImageTintColor : type == 'thread' ? post.postScreenColors.threadImageTintColor : type == 'poll' ? post.postScreenColors.pollImageTintColor : type == 'audio' ? post.postScreenColors.audioImageTintColor : errorColor}} source={type == 'multimedia' ? require('../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/016-camera.png') : type == 'poll' ? require('../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/157-stats-bars.png') : type == 'thread' ? require('../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/007-pencil2.png') : type == 'audio' ? require('../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/018-music.png') : require('../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/265-notification.png')}/>
                            <Text style={{color: tertiary, fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>Image Tint Color</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems: 'center', marginVertical: 20}} onPress={() => {
                            navigation.navigate('Simple_ColorPickerScreen', {name: name, indexNum: indexNum, type: (type + 'ImageBorderColor'), dark: dark, stylingType: stylingType, stylingVersion: stylingVersion, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterGrey, descTextColor: descTextColor, errorColor: errorColor, home: home, find: find, post: post, chat: chat, profile: profile, bottomNavigationBar: bottomNavigationBar, postViews: postViews, placeToNavigateBackTo: 'EditPostScreenIconColors'});
                        }}>
                            <View style={{width: 50, height: 50, borderWidth: 5, borderRadius: 100, borderColor: type == 'multimedia' ? post.postScreenColors.multimediaImageBorderColor : type == 'thread' ? post.postScreenColors.threadImageBorderColor : type == 'poll' ? post.postScreenColors.pollImageBorderColor : type == 'audio' ? post.postScreenColors.audioImageBorderColor : errorColor}}/>
                            <Text style={{color: tertiary, fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>Non-Activated Image Border Color</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{alignItems: 'center', marginTop: 20}} onPress={() => {
                            navigation.navigate('Simple_ColorPickerScreen', {name: name, indexNum: indexNum, type: (type + 'ImageActivatedBorderColor'), dark: dark, stylingType: stylingType, stylingVersion: stylingVersion, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterGrey, descTextColor: descTextColor, errorColor: errorColor, home: home, find: find, post: post, chat: chat, profile: profile, bottomNavigationBar: bottomNavigationBar, postViews: postViews, placeToNavigateBackTo: 'EditPostScreenIconColors'});
                        }}>
                            <View style={{width: 50, height: 50, borderWidth: 5, borderRadius: 100, borderColor: type == 'multimedia' ? post.postScreenColors.multimediaImageActivatedBorderColor : type == 'thread' ? post.postScreenColors.threadImageActivatedBorderColor : type == 'poll' ? post.postScreenColors.pollImageActivatedBorderColor : type == 'audio' ? post.postScreenColors.audioImageActivatedBorderColor : errorColor}}/>
                            <Text style={{color: tertiary, fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>Activated Image Border Color</Text>
                        </TouchableOpacity>
                    </View>
                :
                        <View style={{height: '100%', backgroundColor: primary}}/>
                }
            </View>
        </>
    );
}

export default EditPostScreenIconColors;