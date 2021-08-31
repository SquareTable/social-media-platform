import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import styled from "styled-components";
import Images from "../posts/images.js";
import Post from "../posts/post.js";
import SwitchToggle from "react-native-switch-toggle";
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


const ChatInformationScreen = ({navigation}) => {
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }
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
    return(
        <BackgroundDarkColor>
            <ChatScreenInformation_Title>
                <Navigator_BackButton onPressIn={() => {navigation.goBack()}}>
                    <Image
                        source={require('../assets/app_icons/back_arrow.png')}
                        style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, ...styling.tintColor}}
                        resizeMode="contain"
                        resizeMethod="resize"
                    />
                </Navigator_BackButton>
                <TestText>Details</TestText>
            </ChatScreenInformation_Title>
            <ScrollView style={{paddingHorizontal: 10}}>
                <SubTitle>Notifications</SubTitle>
                <FlexRow_NOJustifyContent>
                    <View style={{marginLeft: 20}}>
                        <SubTitle BoldOff={true} ChatInformationScreen={true}>Mute messages</SubTitle>
                    </View>
                    <View style={{position: 'absolute', right: 10}}>
                        <SwitchToggle
                            switchOn={muteMessagesState}
                            onPress={changeMuteMessagesState}
                            circleColorOff={tertiary}
                            circleColorOn={tertiary}
                            backgroundColorOn={darkestBlue}
                            backgroundColorOff={darkest}
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
                    <SubTitle>Content</SubTitle>
                    <TouchableOpacity style={{position: 'absolute', right: 10}} onPress={() => {alert("Coming soon")}}>
                        <SubTitle style={{color: darkestBlue}}>See All</SubTitle>
                    </TouchableOpacity>
                </FlexRow_NOJustifyContent>
                <Content source_for_image={require('../assets/app_icons/profile_pic.jpg')}/>
                <SubTitle>Members</SubTitle>
                <MemberRow user_profile_pic={Images.posts.background}/>
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