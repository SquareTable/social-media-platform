import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import styled from "styled-components";
import Images from "../posts/images.js";
import Post from "../posts/post.js";
import SwitchToggle from "react-native-switch-toggle";
import {useTheme} from "@react-navigation/native";
import SearchBar from "react-native-dynamic-search-bar";
import {
    darkModeStyling, 
    darkModeOn, 
    lightModeStyling, 
    TestText,
    ChatScreenInformation_Title,
    BackgroundDarkColor,
    Navigator_BackButton,
    SubTitle,
    FlexRow,
    StyledButton,
    ButtonText,
    FlexRow_NOJustifyContent,
    Colors,
    SettingsItemImage,
    SettingsItemText,
    SettingsPageItemTouchableOpacity
} from '../screens/screenStylings/styling.js';
import MemberRow from '../components/MemberRow_ChatInformationScreen.js';
import Content from '../components/Content_ChatInformationScreen.js';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreateChatScreen = ({navigation, route}) => {
    const { colors, dark } = useTheme();
    const BetaButtonOnPress = () => {
        const BetaChatScreen = JSON.stringify([{username: 'Beta Chat Screen', user_profile_pic: Images.posts.sad_pepe, displayName: 'testing'}]);
        async function ChangeBetaChatScreenStatus() {
            var ChatList = await AsyncStorage.getItem('SocialSquareDMsList');
            if (ChatList == null) {
                alert("Turned on Beta Chat Screen");
                await AsyncStorage.setItem('SocialSquareDMsList', BetaChatScreen);
            } else {
                alert("Turned off Beta Chat Screen");
                await AsyncStorage.removeItem('SocialSquareDMsList');
            }
        }
        ChangeBetaChatScreenStatus();
    }
    
    return(
        <KeyboardAvoidingWrapper style={{backgroundColor: colors.primary}}>
            <BackgroundDarkColor style={{backgroundColor: colors.primary}}>
                <ChatScreenInformation_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                    <Navigator_BackButton onPressIn={() => {navigation.goBack()}}>
                        <Image
                            source={require('../assets/app_icons/back_arrow.png')}
                            style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                            resizeMode="contain"
                            resizeMethod="resize"
                        />
                    </Navigator_BackButton>
                    <TestText style={{color: colors.tertiary}}>Create a chat</TestText>
                </ChatScreenInformation_Title>
                <SearchBar
                    darkMode={dark? true : false}
                    style={{marginVertical: 10}}
                    placeholder="Search here"
                    onChangeText={(text) => {console.log(text)}}
                    onSearchPress={() => console.log("Search Icon is pressed")}
                    onClearPress={() => console.log("Clear")}
                    onPress={() => console.log("onPress")}
                />
                <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={BetaButtonOnPress}>
                    <SettingsItemImage source={Images.posts.sad_pepe} style={{borderRadius: 1000/2}}/>
                    <SettingsItemText style={{color: colors.tertiary}}>Toggle Beta Chat Screen</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
                <TestText>Search functionality coming soon :)</TestText>
            </BackgroundDarkColor>
        </KeyboardAvoidingWrapper>
    );
};

export default CreateChatScreen;