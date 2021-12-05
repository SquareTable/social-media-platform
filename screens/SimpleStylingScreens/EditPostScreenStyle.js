import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
    ProfileOptionsView,
    WelcomeContainer,
    PageTitle,
    SubTitle,
    PostCollectionView,
    PostTypeSelector,
    PostIcons,
    PostHorizontalView,
    PostMsgBox,
    StyledButton,
    ButtonText
} from '../screenStylings/styling.js'
import Icon from 'react-native-vector-icons/Entypo';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import {Octicons} from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const EditPostScreenStyle = ({navigation, route}) => {
    const {name, indexNum, type, dark, stylingType, stylingVersion, primary, tertiary, borderColor, background, secondary, darkLight, brand, green, red, darkest, greyish, bronzeRarity, darkestBlue, StatusBarColor, navFocusedColor, navNonFocusedColor, orange, yellow, purple, slightlyLighterGrey, midWhite, slightlyLighterPrimary, descTextColor, errorColor, home, find, post, chat, profile} = route.params;

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
            <ChatScreen_Title style={{backgroundColor: primary, borderWidth: 0}}>
                <Navigator_BackButton onPress={() => {navigation.navigate('EditPostGroupScreens', {name: name, indexNum: indexNum, type: type, dark: dark, stylingType: stylingType, stylingVersion: stylingVersion, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterPrimary, descTextColor: descTextColor, errorColor: errorColor, home: home, find: find, post: post, chat: chat, profile: profile})}}>
                    <Image
                    source={require('../../assets/app_icons/back_arrow.png')}
                    style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: tertiary}}
                    resizeMode="contain"
                    resizeMethod="resize"
                    />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: tertiary}}>Edit {name}</TestText>
            </ChatScreen_Title>
            <View style={{backgroundColor: primary}}>
                <ScrollView contentContainerStyle={{alignItems: 'center', backgroundColor: primary}}>
                    <Text style={{backgroundColor: primary, color: tertiary}}>Styling Version V{stylingVersion || 'ERROR OCCURED'}</Text>
                    <Text style={{color: tertiary, fontSize: 18, textAlign: 'center', marginHorizontal: 10, marginTop: 10}}>Choose what part of the post screen you want to edit</Text>
                    <StatusBar style={post.postScreenColors.statusBarColor}/>
                    <TouchableOpacity style={{marginBottom: 200}}>
                        <WelcomeContainer style={{backgroundColor: post.postScreenColors.backgroundColor, borderColor: borderColor, borderWidth: 10}} postScreen={true}>
                            <TouchableOpacity onPress={() => {navigation.navigate('Simple_ColorPickerScreen', {name: name, type: 'PostScreenTitleColor', dark: dark, primary: primary, tertiary: tertiary, borderColor: borderColor, secondary: secondary, background: background, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterPrimary, descTextColor: descTextColor, errorColor: errorColor, home: home, find: find, post: post, chat: chat, profile: profile, placeToNavigateBackTo: 'EditPostScreenStyle'})}}>
                                <PageTitle style={{color: post.postScreenColors.titleTextColor}}>Post Screen</PageTitle>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {navigation.navigate('Simple_ColorPickerScreen', {name: name, type: 'PostScreenSelectFormatMessageColor', dark: dark, primary: primary, tertiary: tertiary, borderColor: borderColor, secondary: secondary, background: background, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterPrimary, descTextColor: descTextColor, errorColor: errorColor, home: home, find: find, post: post, chat: chat, profile: profile, placeToNavigateBackTo: 'EditPostScreenStyle'})}}>
                                <SubTitle style={{color: post.postScreenColors.selectAFormatTextColor}}>Select a format</SubTitle>
                            </TouchableOpacity>
                            <PostCollectionView>
                                <PostTypeSelector style={{borderColor: post.postScreenColors.multimediaImageBorderColor}}>
                                    <PostIcons style={{tintColor: post.postScreenColors.multimediaImageTintColor}} source={require('../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/016-camera.png')}/>
                                </PostTypeSelector>
                                <PostHorizontalView>
                                    <PostTypeSelector style={{borderColor: post.postScreenColors.threadImageBorderColor}} sideIcons={true}>
                                        <PostIcons style={{tintColor: post.postScreenColors.threadImageTintColor}} source={require('../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/007-pencil2.png')}/>
                                    </PostTypeSelector>
                                    <PostTypeSelector style={{borderColor: post.postScreenColors.pollImageBorderColor}} sideIcons={true}>
                                        <PostIcons style={{tintColor: post.postScreenColors.pollImageTintColor}} source={require('../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/157-stats-bars.png')}/>
                                    </PostTypeSelector>
                                </PostHorizontalView>
                                <PostTypeSelector style={{borderColor: post.postScreenColors.audioImageBorderColor}}>
                                    <PostIcons style={{tintColor: post.postScreenColors.audioImageTintColor}} source={require('../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/018-music.png')}/>
                                </PostTypeSelector>
                                <PostMsgBox style={{color: post.postScreenColors.errorMessage}} viewHidden={false}> Select a format </PostMsgBox>
                            </PostCollectionView>
                            <StyledButton /*continueButton={true}*/ style={{backgroundColor: post.postScreenColors.continueButtonBackgroundColor}}>
                                <ButtonText style={{color: post.postScreenColors.continuteButtonTextColor}} /*continueButton={true}*/>
                                    Continue
                                </ButtonText>
                            </StyledButton>
                        </WelcomeContainer>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    );
}

export default EditPostScreenStyle;