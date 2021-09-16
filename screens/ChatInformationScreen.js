import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Touchable, Alert} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import styled from "styled-components";
import Images from "../posts/images.js";
import Post from "../posts/post.js";
import SwitchToggle from "react-native-switch-toggle";
import {useTheme} from "@react-navigation/native";
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
    Colors
} from '../screens/screenStylings/styling.js';
import MemberRow from '../components/MemberRow_ChatInformationScreen.js';
import Content from '../components/Content_ChatInformationScreen.js';
import { CredentialsContext } from '../components/CredentialsContext.js';
import devModeOn from '../components/devModeOn.js';


const ChatInformationScreen = ({navigation, route}) => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {name} = storedCredentials;
    const {primary, secondary,tertiary, darkLight, brand, green, red, darkest, greyish, bronzeRarity, darkestBlue} = Colors;
    const [muteMessagesState, setMuteMessagesState] = useState(false);
    const changeMuteMessagesState = () => {
        if (muteMessagesState == true) {
            setMuteMessagesState(false);
            alert("Coming soon")
        } else {
            setMuteMessagesState(true);
            alert("Coming soon")
        }
    }
    const { colors } = useTheme();
    const { username, user_profile_pic, displayName } = route.params;
    const goToProfileScreen = (name, userToNavigateTo, profilePictureUrl, displayName) => {
        const devMode = () => {
            Alert.alert(
                "Dev mode is on because the username bug has not been fixed.",
                "What screen do you want to go too?",
                [
                    {
                        text: "Cancel"
                    },
                    {
                        text: "Profile Screen", onPress: () => navigation.navigate("Welcome", {backButtonHidden: false}) 
                    },
                    { 
                        text: "Visiting Profile Screen",
                        onPress: () => navigation.navigate("VisitingProfileScreen", {name: userToNavigateTo, photoUrl: profilePictureUrl, displayName: displayName}),
                        style: 'cancel',
                    }
                ]
            );
        }
        name? 
        name === userToNavigateTo? navigation.navigate("Welcome", {backButtonHidden: false}) : navigation.navigate("VistingProfileScreen", {name: userToNavigateTo, photoUrl: profilePictureUrl, displayName: displayName}) 
        : devModeOn? devMode() : alert("An error occured");
    }
    return(
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
                <TestText style={{color: colors.tertiary}}>Details</TestText>
            </ChatScreenInformation_Title>
            <ScrollView style={{paddingHorizontal: 10}}>
                <SubTitle style={{color: colors.tertiary}}>Notifications</SubTitle>
                <FlexRow_NOJustifyContent>
                    <View style={{marginLeft: 20}}>
                        <SubTitle BoldOff={true} ChatInformationScreen={true} style={{color: colors.tertiary}}>Mute messages</SubTitle>
                    </View>
                    <View style={{position: 'absolute', right: 10}}>
                        <SwitchToggle
                            switchOn={muteMessagesState}
                            onPress={changeMuteMessagesState}
                            circleColorOff={colors.tertiary}
                            circleColorOn={tertiary}
                            backgroundColorOn={darkestBlue}
                            backgroundColorOff={colors.borderColor}
                            containerStyle={{
                                width: 50,
                                height: 28,
                                borderRadius: 25,
                                padding: 5,
                            }}
                            circleStyle={{
                                width: 20,
                                height: 20,
                                borderRadius: 20,
                            }}
                        />
                    </View>
                </FlexRow_NOJustifyContent>
                <FlexRow_NOJustifyContent>
                    <SubTitle style={{color: colors.tertiary}}>Content</SubTitle>
                    <TouchableOpacity style={{position: 'absolute', right: 10}} onPress={() => {alert("Coming soon")}}>
                        <SubTitle style={{color: darkestBlue}}>See All</SubTitle>
                    </TouchableOpacity>
                </FlexRow_NOJustifyContent>
                <Content source_for_image={require('../assets/app_icons/profile_pic.jpg')}/>
                <SubTitle style={{color: colors.tertiary}}>Members</SubTitle>
                <FlexRow_NOJustifyContent style={{marginBottom: 15}}>
                    <TouchableOpacity onPress={() => {goToProfileScreen(name, username, user_profile_pic, displayName)}}>
                        <Image
                            source={user_profile_pic || require('../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/266-question.png')}
                            style={{minHeight: 50, minWidth: 50, width: 50, height: 50, maxWidth: 50, maxHeight: 50, borderRadius: 70/2}}
                            resizeMode="cover"
                            resizeMethod="resize"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {goToProfileScreen(name, username, user_profile_pic, displayName)}}>
                        <TestText style={{marginLeft: 15, marginTop: 13, color: colors.tertiary}}>{username? username : "Couldn't get name"}</TestText>
                    </TouchableOpacity>
            </FlexRow_NOJustifyContent>
                <StyledButton onPress={() => {alert("Coming soon")}}>
                    <ButtonText style={{fontSize: 25, fontWeight: 'bold'}}>Report</ButtonText>
                </StyledButton>
                <StyledButton onPress={() => {alert("Coming soon")}}>
                    <ButtonText style={{fontSize: 25, color: red, fontWeight: 'bold'}}>Block</ButtonText>
                </StyledButton>
            </ScrollView>
        </BackgroundDarkColor>
    );
};

export default ChatInformationScreen;