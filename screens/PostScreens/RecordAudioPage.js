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
    ViewHider,
    ChatScreenInformation_Title,
    ChatScreenNavigator_Row_Styling,
    ChatScreenNavigator_Title,
    ChatScreen_Title,
    Chat_Info_Icon_Styling,
    Navigator_BackButton,
    TestText
} from '../screenStylings/styling.js';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../../components/CredentialsContext';
import { ImageBackground, ScrollView, Image, TouchableOpacity, Text, View, SafeAreaView } from 'react-native';
import AppStyling from '../AppStylingScreen.js';
import * as Haptics from 'expo-haptics';



const RecordAudioPage = ({navigation}) => {
     //context

        /* Start of audio recording code */
        const [timeSpentRecording, setTimeSpentRecording] = useState(null);
        console.log(timeSpentRecording);

        const onChangeRecordingStatus = (status) => {
            var recordingDuration = status.durationMillis % 1000;
            recordingDuration = status.durationMillis - recordingDuration;
            recordingDuration = recordingDuration / 1000;
            console.log("Recording has gone on for " + recordingDuration);
            setTimeSpentRecording(recordingDuration);
        }

        const [recording, setRecording] = React.useState();
        const [recordingStatus, setRecordingStatus] = useState(false);

        async function startRecording() {
            try {
              console.log('Requesting permissions..');
              await Audio.requestPermissionsAsync();
              await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
              }); 
              console.log('Starting recording..');
              const { recording, status } = await Audio.Recording.createAsync(
                 Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
              );
              setRecording(recording);
              setRecordingStatus(true);
              recording.setOnRecordingStatusUpdate((status) => {onChangeRecordingStatus(status)});
              console.log('Recording started');
            } catch (err) {
              console.error('Failed to start recording', err);
            }
        }

          var [recording_uri, setRecording_uri] = useState('');
        
          async function stopRecording() {
            console.log('Stopping recording..');
            setRecording(undefined);
            await recording.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: true,
            }); 
            var recording_uri = recording.getURI(); 
            console.log('Recording stopped and stored at', recording_uri);
            setRecordingStatus(false);
            setRecording_uri(recording_uri);
          }
    
        /* End of audio recording code */

        /* Start of audio play and pause code */
        
        async function playAudio(recording_uri) {  
            const sound = new Audio.Sound();
            try {
                console.log("Loading sound")
                recordingStatus == true? stopRecording() : null
                await sound.loadAsync(
                    { uri: recording_uri },
                    { shouldPlay: true },
                );
                await sound.setVolumeAsync(1);
                console.log('Loaded Sound');
                console.log("Playing sound");
                sound.setOnPlaybackStatusUpdate(async (status) => {
                    if (status.didJustFinish === true) {
                      // audio has finished!
                      await sound.unloadAsync()
                    }
                  })
                await sound.playAsync();
                
            } catch (error) {
                console.log("Error when playing sound:", error);
                alert("An error has occured. " + error)
            }
        }

        /* End of audio play and pause code */

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
            stopRecording();
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

    const sendAudioSnippet = () => {
        recordingStatus == true? stopRecording() : null
        recording_uri? navigation.navigate("SendAudioPage") : alert("Create a recording first");
    }

    const {colors, dark} = useTheme();

    const changeRecordingStatus = () => {
        if (recordingStatus == true) {
            setRecordingStatus(false)
            stopRecording();
            setTimeSpentRecording(0)
        } else {
            setRecordingStatus(true)
            startRecording();
        }
    }


    return(
        <>    
            <StatusBar style={colors.StatusBarColor}/>
                <BackgroundDarkColor style={{backgroundColor: colors.primary}}>
                    <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                        <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                            <Image
                            source={require('../../assets/app_icons/back_arrow.png')}
                            style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                            resizeMode="contain"
                            resizeMethod="resize"
                            />
                        </Navigator_BackButton>
                        <TestText style={{textAlign: 'center', color: colors.tertiary}}>Record Audio</TestText>
                    </ChatScreen_Title>
                        <View>
                            <View style={{alignItems: 'center'}}>
                                <TouchableOpacity onPress={changeRecordingStatus}>
                                    <Image style={{width: 100, height: 100}} source={recordingStatus == false? 
                                        dark? require('../../assets/record_button.png') : require('../../assets/lightmode_recordbutton.png') 
                                        : dark? require('../../assets/recording_icon.png') : require('../../assets/lightmode_recordingicon.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TestText style={{color: colors.tertiary}}>{timeSpentRecording || null}</TestText>
                            <StyledButton onPress={() => recording_uri? playAudio(recording_uri) : alert("Create a recording first")}>
                                <ButtonText>Play Audio Snippet</ButtonText>
                            </StyledButton>
                            <StyledButton onPress={sendAudioSnippet}>
                                <ButtonText>Send Audio Snippet</ButtonText>
                            </StyledButton>
                        </View>
                </BackgroundDarkColor>
        </>
    );
}

export default RecordAudioPage;
