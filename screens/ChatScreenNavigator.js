import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, Platform, FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Images from "../posts/images.js";
import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar,
    StyledContainer,
    ProfileHorizontalView,
    ProfileHorizontalViewItem,
    ProfIcons,
    ProfInfoAreaImage,
    ProfileBadgesView,
    ProfileBadgeIcons,
    ProfilePostsSelectionView,
    ProfilePostsSelectionBtns,
    ProfileGridPosts,
    ProfileFeaturedPosts,
    ProfileTopBtns,
    TopButtonIcons,
    BackgroundDarkColor,
    darkModeOn,
    darkModeStyling,
    lightModeStyling,
    ProfileOptionsView,
    ProfileOptionsViewButtons,
    ProfileOptionsViewButtonsText,
    ProfileOptionsViewText,
    ProfileOptionsViewSubtitleText,
    ReportProfileOptionsView,
    ReportProfileOptionsViewButtons,
    ReportProfileOptionsViewButtonsText,
    ReportProfileOptionsViewSubtitleText,
    ReportProfileOptionsViewText,
    BackgroundDarkColor_SafeAreaView,
    ChatScreenNavigator_Title,
    TestText,
    FlexRow,
    FlexRow_NOJustifyContent,
    ViewHider,
    ChatScreenNavigator_Row_Styling
} from '../screens/screenStylings/styling.js';
import AppStyling from './AppStylingScreen.js';
import { useNavigation, useTheme } from '@react-navigation/native';

export const ChatScreenNavigator_Row = (props) => {
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }
    const { username, user_profile_pic } = props;
    const navigation = useNavigation();
    const navigateToChatScreen = () => {
        navigation.navigate('Chat')
    }
    const {colors} = useTheme();
    return(
        <ChatScreenNavigator_Row_Styling style={{backgroundColor: colors.primary, borderWidth: 0}} onPress={navigateToChatScreen}>
            <Image
                source={user_profile_pic || require('../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/266-question.png')}
                style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, marginLeft: 10, marginTop: 10}}
                resizeMode="contain"
                resizeMethod="resize"
            />
            <TestText style={{marginLeft: 15, marginTop: 15, color: colors.tertiary}}>{username || "Couldn't get name"}</TestText>
            <TouchableOpacity style={{position: 'absolute', right: 10, marginTop: 10}}onPress={() => {alert("Coming soon")}}>
                <Image
                    source={require('../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/016-camera.png')}
                    style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, tintColor: colors.tertiary}}
                    resizeMode="contain"
                    resizeMethod="resize"
                />
            </TouchableOpacity>
        </ChatScreenNavigator_Row_Styling>
    );
};


const ChatScreenNavigator = ({navigation}) => {
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }
    const [directMessages, setDirectMessages] = useState([
        { username: "sebthemancreator", user_profile_pic: Images.posts.profile_picture, key: '1' },
        { username: "sebthemancreator", user_profile_pic: Images.posts.profile_picture, key: '2' },
        { username: "sebthemancreator", user_profile_pic: Images.posts.profile_picture, key: '3' },
        { username: "sebthemancreator", user_profile_pic: Images.posts.profile_picture, key: '4' },
        { username: ":TCR:Itsblip", user_profile_pic: Images.posts.clock, key: '5' },
    ]);
    const {colors} = useTheme();

    return(
        <BackgroundDarkColor_SafeAreaView style={{backgroundColor: colors.primary}}>
            <ChatScreenNavigator_Title style={{borderWidth: 0}}>
                <FlexRow_NOJustifyContent>
                    <SubTitle marginLeft={'10px'} style={{color: colors.tertiary}}>SocialSquare DMs</SubTitle>
                    <TouchableOpacity style={{position: 'absolute', right: 10}}onPress={() => {alert("Coming soon")}}>
                        <Image
                            source={require('../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/074-compass.png')}
                            style={{minHeight: 30, minWidth: 30, width: 30, height: 30, maxWidth: 30, maxHeight: 30, tintColor: colors.tertiary}}
                            resizeMode="contain"
                            resizeMethod="resize"
                        />
                    </TouchableOpacity>
                </FlexRow_NOJustifyContent>
            </ChatScreenNavigator_Title>
            <FlatList 
                data={directMessages} 
                renderItem={({ item }) => ( 
                    <ChatScreenNavigator_Row username={item.username} user_profile_pic={item.user_profile_pic}/>
                )}
            />
        </BackgroundDarkColor_SafeAreaView>
    );
};



export default ChatScreenNavigator;