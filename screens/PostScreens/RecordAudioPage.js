import React, {useContext, useState, useEffect, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

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
import { ImageBackground, ScrollView, Image, TouchableOpacity, Text, View, SafeAreaView, Alert, Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
import { convertCompilerOptionsFromJson } from 'typescript';



const RecordAudioPage = ({navigation}) => {
     //context

        /* Start of audio recording code */
        const [timeSpentRecording, setTimeSpentRecording] = useState(null);
        const [secondsDisplay, setSecondsDisplay] = useState(null);
        const [minutesDisplay, setMinutesDisplay] = useState(null);
        const [hoursDisplay, setHoursDisplay] = useState(null);
        const [playRecording, setPlayRecording] = useState();
        const [playbackStatus, setPlaybackStatus] = useState(undefined);
        const [isAudioPlaying, setIsAudioPlaying] = useState(false);
        const [recordButtonDisabled, setRecordButtonDisabled] = useState(false);
        const [playButtonDisabled, setPlayButtonDisabled] = useState(false);
        console.log(timeSpentRecording);

        const onChangeRecordingStatus = (status) => {
            var recordingDuration = status.durationMillis % 1000;
            recordingDuration = status.durationMillis - recordingDuration;
            recordingDuration = recordingDuration / 1000;
            console.log("Recording has gone on for " + recordingDuration);
            setTimeSpentRecording(recordingDuration);
            var d = Number(status.durationMillis / 1000);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            var s = Math.floor(d % 3600 % 60);
        
            setHoursDisplay(h > 0 ? h + (h == 1 ? m == '' ? " hour " : " hour, " : m != '' ? " hours " : " hours, ") : "")
            setMinutesDisplay(m > 0 ? m + (m == 1 ? s == '' ? " minute " : " minute, and " : s != '' ? " minutes" : "minutes, and ") : "")
            setSecondsDisplay(s > 0 ? s + (s == 1 ? " second" : " seconds") : "")
        }

        const [recording, setRecording] = useState();
        const [recordingStatus, setRecordingStatus] = useState(false);

        async function startRecording() {
            try {
                setRecordButtonDisabled(true);
                if (playbackStatus && isAudioPlaying == true) {
                    alert("Stop the audio from playing before making a new recording");
                    setRecordButtonDisabled(false);
                    setRecordingStatus(false);
                    return;
                }
                console.log('Requesting permissions..');
                await Audio.requestPermissionsAsync();
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                }); 
                console.log('Starting recording..');
                setPlaybackStatus(undefined);
                setPlayRecording(undefined);
                const { recording, status } = await Audio.Recording.createAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                );
                setRecording(recording);
                setRecordingStatus(true);
                recording.setOnRecordingStatusUpdate((status) => {onChangeRecordingStatus(status)});
                setRecordButtonDisabled(false);
                console.log('Recording started');
            } catch (err) {
                console.error('Failed to start recording', err);
                setRecordButtonDisabled(false);
            }
        }

        var [recording_uri, setRecording_uri] = useState('');
    
        async function stopRecording() {
            setRecordButtonDisabled(true);
            console.log('Stopping recording..');
            setRecording(undefined);
            await recording.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: true,
            }); 
            var recording_uri = recording.getURI(); 
            console.log('Recording stopped and stored at', recording_uri);
            setRecordButtonDisabled(false);
            setRecordingStatus(false);
            setRecording_uri(recording_uri);
        }
    
        /* End of audio recording code */

        /* Start of audio play and pause code */
        
        async function playAudio(recording_uri) {
            if (playbackStatus != null && playRecording) {
                if (playbackStatus.isLoaded && !playbackStatus.isPlaying) {
                    setPlayButtonDisabled(true);
                    const status = await playRecording.playAsync()
                    setPlaybackStatus(status);
                    setIsAudioPlaying(true);
                    setPlayButtonDisabled(false);
                }
            }
            if (!playbackStatus && !playRecording) {
                setPlayButtonDisabled(true);
                var play_sound = new Audio.Sound();
                setPlayRecording(play_sound);
                let status_update_num = 0;
                try {
                    console.log("Loading sound")
                    if (recordingStatus == true) {
                        alert("Please stop the recording before playing a recording");
                        setPlayRecording(undefined);
                        setPlayButtonDisabled(false);
                        return;
                    }
                    await play_sound.loadAsync(
                        { uri: recording_uri },
                        { shouldPlay: true },
                        { progressUpdateIntervalMillis: 500 }
                    );
                    await play_sound.setVolumeAsync(1);
                    console.log('Loaded Sound');
                    console.log("Playing sound");
                    play_sound.setOnPlaybackStatusUpdate(async (status) => {
                        setPlaybackStatus(status);
                        status_update_num += 1;
                        console.log("Playback status update num = " + status_update_num);
                        console.log(status)
                        if (status.didJustFinish === true) {
                            // audio has finished!
                            console.log('Audio has finished')
                            await play_sound.unloadAsync()
                            setIsAudioPlaying(false);
                            setPlaybackStatus(undefined);
                            setPlayRecording(undefined);
                        }
                    })
                    await play_sound.playAsync();
                    setIsAudioPlaying(true);
                    setPlayButtonDisabled(false);
                    
                } catch (error) {
                    console.log("Error when playing sound:", error);
                    alert("An error has occured. " + error)
                }
            }
        }

        async function pauseAudio() {
            setPlayButtonDisabled(true);
            if (playRecording) {
                setPlayButtonDisabled(false);
                setIsAudioPlaying(false);
                await playRecording.pauseAsync();
            } else {
                setIsAudioPlaying(false);
                setPlayButtonDisabled(false);
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
        if (recordingStatus == true) {
            alert("Please stop the recording before continuing")
            return;
        }
        if (playbackStatus && isAudioPlaying == true) {
            alert("Please stop the audio from playing before continuing")
            return;
        }
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

    const goBack_Navigation = () => {
        if (recordingStatus == true && recording) {
            alert("Stop the recording before leaving this screen");
            return;
        } else if (playbackStatus && isAudioPlaying == true) {
            alert("Stop the audio from playing before leaving this screen");
            return;
        } else if (timeSpentRecording && recording_uri) {
            Alert.alert(
                "You are trying to leave this screen with a recording still in memory",
                "If you leave this screen, the recording will be deleted and you will not be able to get it back. Are you sure you want to continue?",
                [
                  {
                    text: "Yes, delete my recording and go back",
                    onPress: () => {navigation.goBack()}
                  },
                  {
                    text: "No, keep my recording",
                    onPress: () => {return},
                    style: "cancel"
                  },
                ]
            );
        } else {
            navigation.goBack();
        }
    }

    const tabBarHeight = useBottomTabBarHeight();
    const windowHeight = Dimensions.get('window').height

    useEffect(() => {
        alert('Audio posting functionality coming soon')
    }, [])

    


    return(
        <>    
            <StatusBar style={colors.StatusBarColor}/>
                <BackgroundDarkColor style={{backgroundColor: colors.primary}}>
                    <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                        {!recordingStatus && !recording &&
                            <Navigator_BackButton onPress={goBack_Navigation}>
                                <Image
                                source={require('../../assets/app_icons/back_arrow.png')}
                                style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                                resizeMode="contain"
                                resizeMethod="resize"
                                />
                            </Navigator_BackButton>
                        }
                        <TestText style={{textAlign: 'center', color: colors.tertiary}}>Record Audio</TestText>
                    </ChatScreen_Title>
                        <View>
                            <View style={{alignItems: 'center'}}>
                                <TouchableOpacity disabled={recordButtonDisabled} onPress={changeRecordingStatus}>
                                    <Image style={{width: 100, height: 100}} source={recordingStatus == false? 
                                        dark? require('../../assets/record_button.png') : require('../../assets/lightmode_recordbutton.png') 
                                        : dark? require('../../assets/recording_icon.png') : require('../../assets/lightmode_recordingicon.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            {!recording_uri && !recording && !recordingStatus && hoursDisplay == null && minutesDisplay == null && secondsDisplay == null ? <TestText style={{marginTop: 20, color: colors.tertiary}}>Press the recording button to get started</TestText> : null}
                            <TestText style={{color: colors.tertiary, marginTop: 20}}>{hoursDisplay == null & minutesDisplay == null & secondsDisplay == null ? null : "Recording for " + hoursDisplay + minutesDisplay + secondsDisplay}</TestText>
                            <View style={{alignItems: 'center', marginVertical: 20}}>
                                {recording_uri ?
                                    !recording && !recordingStatus ?
                                        isAudioPlaying == true?
                                            <TouchableOpacity disabled={playButtonDisabled} onPress={pauseAudio}>
                                                <Icon name="pausecircleo" color={colors.tertiary} size={80}/>
                                            </TouchableOpacity> 
                                            :
                                            <TouchableOpacity disabled={playButtonDisabled} onPress={() => recording_uri? playAudio(recording_uri) : alert("Create a recording first")}>
                                                <Icon name="playcircleo" color={colors.tertiary} size={80}/>
                                            </TouchableOpacity> 
                                        : null 
                                    : null
                                }
                            </View>
                            {recording_uri? 
                                !recordingStatus && !recording ?
                                    <StyledButton onPress={sendAudioSnippet}>
                                        <ButtonText>Send Audio Snippet</ButtonText>
                                    </StyledButton> 
                                : null
                            : null
                            }
                        </View>
                </BackgroundDarkColor>
        </>
    );
}

export default RecordAudioPage;
