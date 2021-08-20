import React, {useContext, useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';

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
     //context

        /* Start of audio recording code */

        const [recording, setRecording] = React.useState();

        async function startRecording() {
            try {
              console.log('Requesting permissions..');
              await Audio.requestPermissionsAsync();
              await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
              }); 
              console.log('Starting recording..');
              const { recording } = await Audio.Recording.createAsync(
                 Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
              );
              setRecording(recording);
              console.log('Recording started');
            } catch (err) {
              console.error('Failed to start recording', err);
            }
          }
        
          async function stopRecording() {
            console.log('Stopping recording..');
            setRecording(undefined);
            await recording.stopAndUnloadAsync();
            var recording_uri = recording.getURI(); 
            console.log('Recording stopped and stored at', recording_uri);
            var newLoadedSoundAsync = recording.createNewLoadedSoundAsync();
            return newLoadedSoundAsync;
          }
    
        /* End of audio recording code */

        /* Start of audio play and pause code */
        
        async function playAudio(newLoadedSoundAsync) {  

            const sound = new Audio.Sound();
            try {
                await sound.loadAsync(newLoadedSoundAsync);
                await sound.playAsync();
                // Your sound is playing!

                // Don't forget to unload the sound from memory
                // when you are done using the Sound object
                await sound.unloadAsync();
            } catch (error) {
                console.log("Error when playing sound:", error);
                alert("An error has occured. " + error)
            }
        }

        /* End of audio play and pause code */

     if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }

    const [ProfileOptionsViewState, setProfileOptionsViewState] = useState(true)
    const [NotRecording_RecordIconState, setNotRecording_RecordIconState] = useState(false)
    const [Recording_RecordIconState, setRecording_RecordIconState] = useState(false)

    const changeProfilesOptionsView = () => {
        if (ProfileOptionsViewState == true) {
            setProfileOptionsViewState(false);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setNotRecording_RecordIconState(false);
            setRecording_RecordIconState(true);
        }else{
            console.log("Closed Confirm")
            setProfileOptionsViewState(true)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setNotRecording_RecordIconState(false);
            setRecording_RecordIconState(false);
        }
    }

    const changeRecordingState = () => {
        if (NotRecording_RecordIconState == true) {
            setNotRecording_RecordIconState(false);
            setRecording_RecordIconState(true);
            stopRecording();
        } else if (NotRecording_RecordIconState == false) {
            setNotRecording_RecordIconState(true);
            setRecording_RecordIconState(false);
            startRecording();
        } else {
            console.log("Some sort of error occured with changing recording state");
        }
    }


    return(
        <>    
            <StatusBar style="dark"/>
                <BackgroundDarkColor>
                    <RecordAudio_AudioUploadPage viewHidden={ProfileOptionsViewState}>
                        <StyledButton continueButton={true} onPress={changeProfilesOptionsView}>
                            <ButtonText continueButton={true}>
                                Go Back
                            </ButtonText>
                        </StyledButton>
                        <FlexRow style={{marginTop: 35}}>
                            <View style={{width: '20%'}}>
                                <RecordButton_RecordScreen_AudioUploadPage onPress={changeRecordingState}>
                                    <RecordButtonChanger_RecordScreen_AudioUploadPage viewHidden={NotRecording_RecordIconState}>
                                        <Image
                                            style={{width: 70, height: 70}}
                                            source={require("../../assets/record_button.png")}
                                            resizeMode="contain"
                                            resizeMethod="resize"
                                        />
                                    </RecordButtonChanger_RecordScreen_AudioUploadPage>
                                    <RecordButtonChanger_RecordScreen_AudioUploadPage viewHidden={Recording_RecordIconState}>
                                        <Image
                                            style={{width: 70, height: 70}}
                                            source={require("../../assets/recording_icon.png")}
                                            resizeMode="contain"
                                            resizeMethod="resize"
                                        />
                                    </RecordButtonChanger_RecordScreen_AudioUploadPage>
                                </RecordButton_RecordScreen_AudioUploadPage>
                            </View>
                            <AudioWaveBox_RecordScreen_AudioUploadPage>
                                <ViewHider viewHidden={Recording_RecordIconState}>
                                    <Text style={{fontSize: 20, fontWeight: 'bold', ...styling.textColor, textAlign: 'center'}}>Recording functionality coming soon :) (:</Text>
                                </ViewHider>
                            </AudioWaveBox_RecordScreen_AudioUploadPage>
                        </FlexRow>
                        <StyledButton continueButton={true} onPress={playAudio}>
                            <ButtonText continueButton={true}>
                                Play audio snippet
                            </ButtonText>
                        </StyledButton>
                        <StyledButton continueButton={true} onPress={() => {alert("Coming soon")}}>
                            <ButtonText continueButton={true}>
                                Send audio snippet
                            </ButtonText>
                        </StyledButton>
                    </RecordAudio_AudioUploadPage>
                    <WelcomeContainer audioPostScreen={true}>
                        <PageTitle>Audio Post Screen</PageTitle>
                        <View>
                            <AudioUploadScreenUploadButtons>
                                <FlexRow>
                                    <LeftButton_AudioUploadScreen>
                                        <TouchableOpacity onPress={changeProfilesOptionsView}>
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
