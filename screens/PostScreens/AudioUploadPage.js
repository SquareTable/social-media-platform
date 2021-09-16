import React, {useContext, useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import { useTheme } from '@react-navigation/native';

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
    HorizontalLineAcrossScreen,
    RecordAudio_AudioUploadPage,
    RecordButton_RecordScreen_AudioUploadPage,
    RecordButtonChanger_RecordScreen_AudioUploadPage,
    AudioWaveBox_RecordScreen_AudioUploadPage,
    ViewHider
} from '../screenStylings/styling.js';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../../components/CredentialsContext';
import { ImageBackground, ScrollView, Image, TouchableOpacity, Text, View } from 'react-native';
import AppStyling from '../AppStylingScreen.js';
import * as Haptics from 'expo-haptics';



const AudioUploadPage = ({navigation}) => {
    const {colors, dark} = useTheme();
    const uploadAudioSnippetFromFile = () => {
        alert("Coming soon")
    }
    return(
        <>    
            <StatusBar style={colors.StatusBarColor}/>
                <BackgroundDarkColor style={{backgroundColor: colors.primary}}>
                    <WelcomeContainer audioPostScreen={true} style={{backgroundColor: colors.primary}}>
                        <PageTitle>Audio Post Screen</PageTitle>
                        <View>
                            <AudioUploadScreenUploadButtons>
                                <FlexRow>
                                    <LeftButton_AudioUploadScreen>
                                        <TouchableOpacity onPress={() => {navigation.navigate("RecordAudioPage")}}>
                                            <Image
                                                style={{width: 125, height: 125}}
                                                source={dark ? require("../../assets/record_button.png") : require('../../assets/lightmode_recordbutton.png')}
                                                resizeMode="contain"
                                                resizeMethod="resize"
                                            />
                                            <Text style={{textAlign: 'center', color: colors.tertiary, fontWeight: 'bold', fontSize: 14}}>Record audio</Text>
                                        </TouchableOpacity>
                                    </LeftButton_AudioUploadScreen>
                                    <RightButton_AudioUploadScreen>
                                        <TouchableOpacity onPress={uploadAudioSnippetFromFile}>
                                            <Image
                                                style={{width: 125, height: 125, tintColor: colors.tertiary}}
                                                source={require("../../assets/app_icons/upload_arrow.png")}
                                                resizeMode="contain"
                                                resizeMethod="resize"
                                            />
                                            <Text style={{textAlign: 'center', color: colors.tertiary, fontWeight: 'bold', fontSize: 14}}>Upload audio file</Text>
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
