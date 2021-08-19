import React, {useContext, useState} from 'react';
import { StatusBar } from 'expo-status-bar';

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
    PostTypeSelector,
    PostHorizontalView,
    PostIcons,
    PostCollectionView,
    PostMsgBox,
    BackgroundDarkColor,
    FlexRow,
    LeftButton_AudioUploadScreen,
    RightButton_AudioUploadScreen,
    darkModeOn,
    darkModeStyling,
    lightModeStyling,
    AudioUploadScreenUploadButtons,
    HorizontalLineAcrossScreen
} from '../screenStylings/styling.js';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../../components/CredentialsContext';
import { ImageBackground, ScrollView, Image, TouchableOpacity, Text, View } from 'react-native';
import AppStyling from '../AppStylingScreen.js';


const AudioUploadPage = ({navigation}) => {
     //context


     if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }

    return(
        <>    
            <StatusBar style="dark"/>
                <BackgroundDarkColor>
                    <WelcomeContainer audioPostScreen={true}>
                        <PageTitle>Audio Post Screen</PageTitle>
                        <View>
                            <AudioUploadScreenUploadButtons>
                                <FlexRow>
                                    <LeftButton_AudioUploadScreen>
                                        <TouchableOpacity onPress={() => {alert("Coming soon")}}>
                                            <Image
                                                style={{width: 125, height: 125}}
                                                source={require("../../assets/record_button.png")}
                                                resizeMode="contain"
                                                resizeMethod="resize"
                                            />
                                            <Text style={{textAlign: 'center', ...styling.textColor, fontWeight: 'bold', fontSize: 14}}>Record audio</Text>
                                        </TouchableOpacity>
                                    </LeftButton_AudioUploadScreen>
                                    <RightButton_AudioUploadScreen>
                                        <TouchableOpacity onPress={() => {alert("Coming soon")}}>
                                            <Image
                                                style={{width: 125, height: 125, ...styling.tintColor}}
                                                source={require("../../assets/app_icons/upload_arrow.png")}
                                                resizeMode="contain"
                                                resizeMethod="resize"
                                            />
                                            <Text style={{textAlign: 'center', ...styling.textColor, fontWeight: 'bold', fontSize: 14}}>Upload audio file</Text>
                                        </TouchableOpacity>
                                    </RightButton_AudioUploadScreen>
                                </FlexRow>
                            </AudioUploadScreenUploadButtons>
                        </View>
                    </WelcomeContainer>
                </BackgroundDarkColor>
        </>
    );
}

export default AudioUploadPage;
