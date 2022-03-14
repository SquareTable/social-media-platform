import React, { useState, useContext, useRef, useEffect, useCallback, memo } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Alert, useWindowDimensions, Animated, ActivityIndicator, TouchableWithoutFeedback} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from "styled-components";
import Images from "../posts/images.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme, useFocusEffect, useIsFocused, CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Constants from "expo-constants";
import {
    darkModeStyling, 
    darkModeOn, 
    lightModeStyling,
    ProfileOptionsView,
    ProfileOptionsViewText,
    ProfileOptionsViewSubtitleText,
    ProfileOptionsViewButtons,
    ProfileOptionsViewButtonsText,
    ReportProfileOptionsView,
    ReportProfileOptionsViewButtons,
    ReportProfileOptionsViewButtonsText,
    ReportProfileOptionsViewSubtitleText,
    ReportProfileOptionsViewText,
    ChatScreen_Title,
    Navigator_BackButton,
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
    Colors,
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
    ProfileSelectMediaTypeItem,
    ProfileSelectMediaTypeHorizontalView,
    ProfileSelectMediaTypeIcons,
    ProfileSelectMediaTypeIconsBorder,
    PollPostFrame,
    PollPostTitle,
    PollPostSubTitle,
    PollBarOutline,
    PollBarItem,
    PollKeyViewOne,
    PollKeyViewTwo,
    PollKeyViewThree,
    PollKeyViewFour,
    PollKeyViewFive,
    PollKeyViewSix,
    PollKeysCircle,
    PollPostHorizontalView,
    PollPostIcons,
    AboveBarPollPostHorizontalView,
    BottomPollPostHorizontalView,
    LikesView,
    CommentsView,
    PollBottomItem,
    MultiMediaPostFrame,
    ImagePostFrame,
    PostCreatorIcon,
    PostsHorizontalView,
    PostsVerticalView,
    PostHorizontalView,
    PostsIcons,
    PostsIconFrame,
    MsgBox,
    ImagePostTextFrame,
    SearchFrame,
    SearchHorizontalView,
    SearchHorizontalViewItem,
    SearchHorizontalViewItemCenter,
    SearchSubTitle,
    ConfirmLogoutButtons,
    ConfirmLogoutButtonText,
    ViewHider,
} from '../screens/screenStylings/styling.js';
import ProgressiveImage from '../posts/ProgressiveImage.js';
import { CredentialsContext } from '../components/CredentialsContext.js';
import { AdIDContext } from '../components/AdIDContext.js';
import VisitingProfileScreen from '../screens/VisitingProfileScreen.js';
import ScalableProgressiveImage from '../components/ScalableProgressiveImage.js';
import { Viewport } from '@skele/components';
import { Audio } from 'expo-av';
import SwitchToggle from "react-native-switch-toggle";
import { SimpleStylingVersion } from '../components/StylingVersionsFile.js';
import { AppStylingContext } from '../components/AppStylingContext.js';
import HTML from 'react-native-render-html';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import WebView from 'react-native-webview';
import axios from 'axios';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext.js';
import { ServerUrlContext } from '../components/ServerUrlContext.js';

const {brand, primary, tertiary, greyish, darkLight, darkestBlue, slightlyLighterPrimary, slightlyLighterGrey, descTextColor, darkest, red, orange, yellow, green, purple} = Colors;

const HomeScreen = ({navigation, route}) => {
    // Filter code
    const [showPhotos, setShowPhotos] = useState(undefined);
    const [showVideos, setShowVideos] = useState(undefined);
    const [showAudio, setShowAudio] = useState(undefined);
    const [showThreads, setShowThreads] = useState(undefined);
    const [showPolls, setShowPolls] = useState(undefined);
    const [showCategories, setShowCategories] = useState(undefined);
    const [PlayVideoSoundInSilentMode, setPlayVideoSoundInSilentMode] = useState(undefined)
    const OutputAsyncStorageToConsole = false
    const [updateSimpleStylesWarningHidden, setUpdateSimpleStylesWarningHidden] = useState(true);
    const {AppStylingContextState, setAppStylingContextState} = useContext(AppStylingContext);
    const adContent = `<iframe data-aa='1882208' src='https://ad.a-ads.com/1882208?size=300x250' style='width:300px; height:250px; border:0px; padding:0; overflow:hidden; background-color: transparent;'></iframe>`
    const [uploading, setUploading] = useState(false);
    const [uploadingText, setUploadingText] = useState('Uploading...');
    const [errorOccuredWhileUploading, setErrorOccuredWhileUploading] = useState(false);
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext);
    const [usernameToReport, setUsernameToReport] = useState(null);
    const [postEncrypted, setPostEncrypted] = useState(null);
    const [ProfileOptionsViewState, setProfileOptionsViewState] = useState(true);
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const [postSent, setPostSent] = useState(null);
    const {AdID, setAdID} = useContext(AdIDContext);
    const StatusBarHeight = Constants.statusBarHeight;
    async function unloadAudioFunction() {
        playRecording.unloadAsync;
    }
    const [optionOnesBarLength, setOptionOnesBarLength] = useState(0);
    const [optionTwosBarLength, setOptionTwosBarLength] = useState(0);
    const [optionThreesBarLength, setOptionThreesBarLength] = useState(0);
    const [optionFoursBarLength, setOptionFoursBarLength] = useState(0);
    const [optionFivesBarLength, setOptionFivesBarLength] = useState(0);
    const [optionSixesBarLength, setOptionSixesBarLength] = useState(0);
    if (storedCredentials) {var {name, displayName, email, photoUrl, _id} = storedCredentials}
    const {serverUrl, setServerUrl} = useContext(ServerUrlContext);

    //Easter egg - Logo Press
    const logoPressedTimes = useRef(0);

    // Uploading posts code
    const postMultiMedia = (postData) => { // Creating multimedia post
        const formData = new FormData();
        formData.append("image", {
            name: postData.image.uri.substr(postData.image.uri.lastIndexOf('/') + 1),
            uri: postData.image.uri,
            type: 'image/jpg'
        })
        formData.append("title", postData.title)
        formData.append("description", postData.description)
        formData.append("creatorId", _id)
        formData.append("screenshotsAllowed", postData.screenshotsAllowed)
        console.log(formData);
        console.log("Post pressed")
        setUploadingText('Uploading photo post...')
        setUploading(true)
        const url = serverUrl + '/user/postImage';

        axios.post(url, formData, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }}).then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                setUploadingText('Error occured while uploading post. Press here to try again.')
                setErrorOccuredWhileUploading(true)
                console.log(result)
            } else {
                console.log(data)
                setUploadingText('Photo post uploaded!')
                setErrorOccuredWhileUploading(false)
                setTimeout(() => {
                    setUploading(false)
                }, 3000)
            }

        }).catch(error => {
            console.log(error);
            setUploadingText("An error occured. Try checking your network connection and press here to retry.");
            setErrorOccuredWhileUploading(true);
        })
    }

    const handleCreatePollPost = (pollValues) => { // Creating poll post
        setUploadingText('Uploading poll post...')
        setUploading(true)
        console.log(pollValues)
        const url = serverUrl + '/user/createpollpost';

        axios.post(url, pollValues).then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                setUploadingText('Error occured while uploading post. Press here to try again.')
                setErrorOccuredWhileUploading(true)
            } else {
                setUploadingText('Poll post uploaded!')
                setErrorOccuredWhileUploading(false);
                setTimeout(() => {
                    setUploading(false)
                }, 3000)
            }

        }).catch(error => {
            console.log(error);
            setUploadingText("An error occured. Try checking your network connection and press here to retry.");
            setErrorOccuredWhileUploading(true);
        })
    }

    const handlePostThread = (credentials, selectFormat) => { // Creating thread post
        setUploadingText('Uploading thread post...')
        setUploading(true)
        if (selectFormat == "Text") {
            console.log("Text Format")
            const url = serverUrl + '/user/posttextthread';
            var toSend = {creatorId: _id, threadTitle: credentials.threadTitle, threadSubtitle: credentials.threadSubtitle, threadTags: credentials.threadTags, threadCategory: credentials.selectedCategory, threadBody: credentials.threadBody, threadNSFW: credentials.threadNSFW, threadNSFL: credentials.threadNSFL, screenshotsAllowed: credentials.screenshotsAllowed}
            axios.post(url, toSend).then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS') {
                    setUploadingText('Error occured while uploading post. Press here to try again.')
                    setErrorOccuredWhileUploading(true)
                } else {
                    setUploadingText('Thread post uploaded!')
                    setErrorOccuredWhileUploading(false);
                    setTimeout(() => {
                        setUploading(false)
                    }, 3000)
                }

            }).catch(error => {
                console.log(error);
                setUploadingText("An error occured. Try checking your network connection and press here to retry.");
                setErrorOccuredWhileUploading(true);
            })
        } else if (selectFormat == "Images") {
            //Set up formdata
            console.log("Image format")
            const formData = new FormData();
            formData.append("image", {
                name: credentials.image.uri.substr(credentials.image.uri.lastIndexOf('/') + 1),
                uri: credentials.image.uri,
                type: 'image/jpg'
            })
            formData.append("creatorId", _id)
            formData.append("threadTitle", credentials.threadTitle)
            formData.append("threadSubtitle", credentials.threadSubtitle)
            formData.append("threadTags", credentials.threadTags)
            formData.append("threadCategory", credentials.selectedCategory)
            formData.append("threadImageDescription", credentials.threadImageDescription)
            formData.append("threadNSFW", credentials.threadNSFW)
            formData.append("threadNSFL", credentials.threadNSFL)
            formData.append("screenshotsAllowed", credentials.screenshotsAllowed)
            console.log("FormData:")
            console.log(formData);
            
            //post
            const url = serverUrl + '/user/postimagethread';
            axios.post(url, formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }}).then((response) => {
                const result = response.data;
                const {message, status, data} = result;
                
                if (status !== 'SUCCESS') {
                    setUploadingText('Error occured while uploading post. Press here to try again.')
                    setErrorOccuredWhileUploading(true)
                } else {
                    setUploadingText('Thread post uploaded!');
                    setErrorOccuredWhileUploading(false);
                    setTimeout(() => {
                        setUploading(false)
                    }, 3000);
                }

            }).catch(error => {
                console.log(error);
                setUploadingText("An error occured. Try checking your network connection and press here to retry.");
                setErrorOccuredWhileUploading(true);
            })
        }
    }

    const handleCreateCategory = (credentials) => {
        setUploadingText('Creating category...')
        setUploading(true)
        if (credentials.image !== null) {
            const formData = new FormData();
            formData.append("image", {
                name: credentials.image.uri.substr(credentials.image.uri.lastIndexOf('/') + 1),
                uri: credentials.image.uri,
                type: 'image/jpg'
            })
            formData.append("categoryTitle", credentials.categoryTitle)
            formData.append("categoryDescription", credentials.categoryDescription)
            formData.append("creatorId", _id)
            formData.append("categoryTags", credentials.categoryTags)
            formData.append("categoryNSFW", credentials.categoryNSFW)
            formData.append("categoryNSFL", credentials.categoryNSFL)
            console.log(formData);

            const url = serverUrl + '/user/postcategorywithimage';
            
            axios.post(url, formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }}).then((response) => {
                const result = response.data;
                const {message, status, data} = result;
                
                if (status !== 'SUCCESS') {
                    setUploadingText('Error occured while creating a category. Press here to try again.')
                    setErrorOccuredWhileUploading(true)
                } else {
                    setUploadingText('Category created!');
                    setErrorOccuredWhileUploading(false);
                    setTimeout(() => {
                        setUploading(false)
                    }, 3000);
                }

            }).catch(error => {
                console.log(error);
                setUploadingText("An error occured. Try checking your network connection and press here to retry.");
                setErrorOccuredWhileUploading(true);
            })
        } else {
            const url = serverUrl + '/user/postcategorywithoutimage';
            const toSend = {creatorId: _id, categoryTitle: credentials.categoryTitle, categoryDescription: credentials.categoryDescription, categoryTags: credentials.categoryTags, categoryNSFW: credentials.categoryNSFW, categoryNSFL: credentials.categoryNSFL}
            axios.post(url, toSend).then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS') {
                    setUploadingText('Error occured while creating a category. Press here to try again.')
                    setErrorOccuredWhileUploading(true)
                } else {
                    setUploadingText('Category created!');
                    setErrorOccuredWhileUploading(false);
                    setTimeout(() => {
                        setUploading(false)
                    }, 3000);
                }

            }).catch(error => {
                console.log(error);
                setUploadingText("An error occured. Try checking your network connection and press here to retry.");
                setErrorOccuredWhileUploading(true);
            })
        }
    }

    if (route.params) {var {postData, postType} = route.params;}
    useEffect(() => {
        if (postData != postSent) {
            setPostSent(postData)
            if (postType == 'multimedia') {
                postMultiMedia(postData);
            } else if (postType == 'poll') {
                if (postData.totalNumberOfOptions == 'Two') {
                    setOptionOnesBarLength(100 / 2)
                    setOptionTwosBarLength(100 / 2)
                } else if (postData.totalNumberOfOptions == 'Three') {
                    setOptionOnesBarLength(100 / 3)
                    setOptionTwosBarLength(100 / 3)
                    setOptionThreesBarLength(100 / 3)
                } else if (postData.totalNumberOfOptions == 'Four') {
                    setOptionOnesBarLength(100 / 4)
                    setOptionTwosBarLength(100 / 4)
                    setOptionThreesBarLength(100 / 4)
                    setOptionFoursBarLength(100 / 4)
                } else if (postData.totalNumberOfOptions == 'Five') {
                    setOptionOnesBarLength(100 / 5)
                    setOptionTwosBarLength(100 / 5)
                    setOptionThreesBarLength(100 / 5)
                    setOptionFoursBarLength(100 / 5)
                    setOptionFivesBarLength(100 / 5)
                } else if (postData.totalNumberOfOptions == 'Six') {
                    setOptionOnesBarLength(100 / 6)
                    setOptionTwosBarLength(100 / 6)
                    setOptionThreesBarLength(100 / 6)
                    setOptionFoursBarLength(100 / 6)
                    setOptionFivesBarLength(100 / 6)
                    setOptionSixesBarLength(100 / 6)
                }
                handleCreatePollPost(postData);
            } else if (postType == 'thread_text') {
                handlePostThread(postData, 'Text');
            } else if (postType == 'thread_image') {
                handlePostThread(postData, 'Images');
            } else if (postType == 'category') {
                handleCreateCategory(postData);
            }
        }
    }, [postData, postType])

    useEffect(() => {
        async function setUp() {
            const showPhotosValue = await AsyncStorage.getItem('ShowPhotos_AppBehaviour_AsyncStorage')
            if (OutputAsyncStorageToConsole) {console.log('ShowPhotos_AppBehaviour_AsyncStorage key is: ' + showPhotosValue)}
            if (showPhotosValue == null) {
                setShowPhotos(true)
                AsyncStorage.setItem('ShowPhotos_AppBehaviour_AsyncStorage', 'true')
            } else if (showPhotosValue == 'true') {
                setShowPhotos(true)
                AsyncStorage.setItem('ShowPhotos_AppBehaviour_AsyncStorage', 'true')
            } else if (showPhotosValue == 'false') {
                setShowPhotos(false)
                AsyncStorage.setItem('ShowPhotos_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured while getting ShowPhotos value in setUp() function in AppBehaviour_HomeScreen.js')
            }

            const showVideosValue = await AsyncStorage.getItem('ShowVideos_AppBehaviour_AsyncStorage')
            if (OutputAsyncStorageToConsole) {console.log('ShowVideos_AppBehaviour_AsyncStorage key is: ' + showVideosValue)}
            if (showVideosValue == null) {
                setShowVideos(true)
                AsyncStorage.setItem('ShowVideos_AppBehaviour_AsyncStorage', 'true')
            } else if (showVideosValue == 'true') {
                setShowVideos(true)
                AsyncStorage.setItem('ShowVideos_AppBehaviour_AsyncStorage', 'true')
            } else if (showVideosValue == 'false') {
                setShowVideos(false)
                AsyncStorage.setItem('ShowVideos_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured while getting ShowVideos value in setUp() function in AppBehaviour_HomeScreen.js')
            }

            const showAudioValue = await AsyncStorage.getItem('ShowAudio_AppBehaviour_AsyncStorage')
            if (OutputAsyncStorageToConsole) {console.log('ShowAudio_AppBehaviour_AsyncStorage key is: ' + showAudioValue)}
            if (showAudioValue == null) {
                setShowAudio(true)
                AsyncStorage.setItem('ShowAudio_AppBehaviour_AsyncStorage', 'true')
            } else if (showAudioValue == 'true') {
                setShowAudio(true)
                AsyncStorage.setItem('ShowAudio_AppBehaviour_AsyncStorage', 'true')
            } else if (showAudioValue == 'false') {
                setShowAudio(false)
                AsyncStorage.setItem('ShowAudio_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured while getting ShowAudio value in setUp() function in AppBehaviour_HomeScreen.js')
            }

            const showPollsValue = await AsyncStorage.getItem('ShowPolls_AppBehaviour_AsyncStorage')
            if (OutputAsyncStorageToConsole) {console.log('ShowPolls_AppBehaviour_AsyncStorage key is: ' + showPollsValue)}
            if (showPollsValue == null) {
                setShowPolls(true)
                AsyncStorage.setItem('ShowPolls_AppBehaviour_AsyncStorage', 'true')
            } else if (showPollsValue == 'true') {
                setShowPolls(true)
                AsyncStorage.setItem('ShowPolls_AppBehaviour_AsyncStorage', 'true')
            } else if (showPollsValue == 'false') {
                setShowPolls(false)
                AsyncStorage.setItem('ShowPolls_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured while getting ShowPolls value in setUp() function in AppBehaviour_HomeScreen.js')
            }

            const showThreadsValue = await AsyncStorage.getItem('ShowThreads_AppBehaviour_AsyncStorage')
            if (OutputAsyncStorageToConsole) {console.log('ShowThreads_AppBehaviour_AsyncStorage key is: ' + showThreadsValue)}
            if (showThreadsValue == null) {
                setShowThreads(true)
                AsyncStorage.setItem('ShowThreads_AppBehaviour_AsyncStorage', 'true')
            } else if (showThreadsValue == 'true') {
                setShowThreads(true)
                AsyncStorage.setItem('ShowThreads_AppBehaviour_AsyncStorage', 'true')
            } else if (showThreadsValue == 'false') {
                setShowThreads(false)
                AsyncStorage.setItem('ShowThreads_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured while getting ShowThreads value in setUp() function in AppBehaviour_HomeScreen.js')
            }

            const value = await AsyncStorage.getItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage')
            if (OutputAsyncStorageToConsole) {console.log('HomeScreen.js value of PlayAudioInSilentMode_AppBehaviour_AsyncStorage key is: ' + value)}
            if (value == null) {
                setPlayAudioInSilentMode(false)
                AsyncStorage.setItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage', 'false')
            } else if (value == 'true') {
                setPlayAudioInSilentMode(true)
                AsyncStorage.setItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage', 'true')
            } else if (value == 'false') {
                setPlayAudioInSilentMode(false)
                AsyncStorage.setItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured in setUp() function in HomeScreen.js')
            }

            const showCategoriesValue = await AsyncStorage.getItem('ShowCategories_AppBehaviour_AsyncStorage')
            if (OutputAsyncStorageToConsole) {console.log('ShowCategories_AppBehaviour_AsyncStorage key is: ' + showCategoriesValue)}
            if (showCategoriesValue == null) {
                setShowCategories(true)
                AsyncStorage.setItem('ShowCategories_AppBehaviour_AsyncStorage', 'true')
            } else if (showCategoriesValue == 'true') {
                setShowCategories(true)
                AsyncStorage.setItem('ShowCategories_AppBehaviour_AsyncStorage', 'true')
            } else if (showCategoriesValue == 'false') {
                setShowCategories(false)
                AsyncStorage.setItem('ShowCategories_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured while getting ShowCategories value in setUp() function in AppBehaviour_HomeScreen.js')
            }

            const PlayVideoSoundInSilentModeValue = await AsyncStorage.getItem('PlayVideoSoundInSilentMode_AppBehaviour_AsyncStorage')
            if (OutputAsyncStorageToConsole) {console.log('HomeScreen.js value of PlayAudioInSilentMode_AppBehaviour_AsyncStorage key is: ' + PlayVideoSoundInSilentMode)}
            if (PlayVideoSoundInSilentModeValue == null) {
                setPlayVideoSoundInSilentMode(false)
                AsyncStorage.setItem('PlayVideoSoundInSilentMode_AppBehaviour_AsyncStorage', 'false')
            } else if (PlayVideoSoundInSilentModeValue == 'true') {
                setPlayVideoSoundInSilentMode(true)
                AsyncStorage.setItem('PlayVideoSoundInSilentMode_AppBehaviour_AsyncStorage', 'true')
            } else if (PlayVideoSoundInSilentModeValue == 'false') {
                setPlayVideoSoundInSilentMode(false)
                AsyncStorage.setItem('PlayVideoSoundInSilentMode_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured in setUp() function in HomeScreen.js')
            }
        }
        setUp()
    }, [])
   
    const setContextAndAsyncStorage = (type) => {
        if (type == 'ShowPhotos') {
            if (showPhotos == true) {
                setShowPhotos(false)
                AsyncStorage.setItem('ShowPhotos_AppBehaviour_AsyncStorage', 'false')
            } else {
                setShowPhotos(true)
                AsyncStorage.setItem('ShowPhotos_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else if (type == 'ShowVideos') {
            if (showVideos == true) {
                setShowVideos(false)
                AsyncStorage.setItem('ShowVideos_AppBehaviour_AsyncStorage', 'false')
            } else {
                setShowVideos(true)
                AsyncStorage.setItem('ShowVideos_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else if (type == 'ShowAudio') {
            if (showAudio == true) {
                setShowAudio(false)
                AsyncStorage.setItem('ShowAudio_AppBehaviour_AsyncStorage', 'false')
            } else {
                setShowAudio(true)
                AsyncStorage.setItem('ShowAudio_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else if (type == 'ShowPolls') {
            if (showPolls == true) {
                setShowPolls(false)
                AsyncStorage.setItem('ShowPolls_AppBehaviour_AsyncStorage', 'false')
            } else {
                setShowPolls(true)
                AsyncStorage.setItem('ShowPolls_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else if (type == 'ShowThreads') {
            if (showThreads == true) {
                setShowThreads(false)
                AsyncStorage.setItem('ShowThreads_AppBehaviour_AsyncStorage', 'false')
            } else {
                setShowThreads(true)
                AsyncStorage.setItem('ShowThreads_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else if (type == 'ShowCategories') {
            if (showCategories == true) {
                setShowCategories(false)
                AsyncStorage.setItem('ShowCategories_AppBehaviour_AsyncStorage', 'false')
            } else {
                setShowCategories(true)
                AsyncStorage.setItem('ShowCategories_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else if (type == 'PlayAudioInSilentMode') {
            if (PlayAudioInSilentMode == true) {
                setPlayAudioInSilentMode(false)
                AsyncStorage.setItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage', 'false')
            } else {
                setPlayAudioInSilentMode(true)
                AsyncStorage.setItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else if (type == 'PlayVideoSoundInSilentMode') {
            if (PlayVideoSoundInSilentMode == true) {
                setPlayVideoSoundInSilentMode(false)
                AsyncStorage.setItem('PlayVideoSoundInSilentMode_AppBehaviour_AsyncStorage', 'false')
            } else {
                setPlayVideoSoundInSilentMode(true)
                AsyncStorage.setItem('PlayVideoSoundInSilentMode_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else {
            console.error('Wrong value entered')
        }
    }
    // End of filter code
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }
    const {colors, dark, indexNum, stylingType} = useTheme();

    const [Posts, setPosts] = useState([
        /*{ postSource: Images.posts.social_studies_1, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool', encrypted: 'true' },
        { postSource: Images.posts.seb_and_azaria_1, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool', encrypted: 'true' },
        { postSource: Images.posts.seb_and_azaria_2, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool', encrypted: 'true' },
        { postSource: Images.posts.seb_and_azaria_3, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool', encrypted: 'true' },
        { postSource: Images.posts.background, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool', encrypted: 'true' },
        { postSource: Images.posts.apple, profilePictureSource: Images.posts.apple, username: 'ILoveApples', displayName: 'AppleKid', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool', encrypted: 'false' },
        { postSource: 'https://github.com/SquareTable/social-media-platform/raw/main/assets/MorningMood_song.mp3', profilePictureSource: Images.posts.profile_picture, username: 'testing_audio', displayName: 'sebthemancreator', type: 'audio', timeUploadedAgo: '1 sec ago', bio: "Hello! This is an audio post. There are quite a few bugs with it right now, but we will be fixing those shortly :) For now just listen to this peaceful song", encrypted: 'false' },
        { postSource: 'https://github.com/SquareTable/social-media-platform/raw/main/assets/ComputerSong.mp3', profilePictureSource: Images.posts.profile_picture, username: 'testing_audio', displayName: 'sebthemancreator', type: 'audio', timeUploadedAgo: '1 sec ago', bio: "Computer error song :) Also we are aware that sometimes the posts play the wrong audio and we will be fixing that shortly lol", encrypted: 'true' },*/
    ]);
    const goToProfileScreen = (name, userToNavigateTo, profilePictureUrl, displayName) => {
        name? 
        name === userToNavigateTo? navigation.navigate("Welcome", {backButtonHidden: false, imageFromRoute: null}) : navigation.navigate("VisitingProfileScreen", {name: userToNavigateTo, photoUrl: profilePictureUrl, displayName: displayName}) 
        : alert("An error occured");
    }
    
    const changeOptionsView = (PostOwner, PostEncrypted) => {
        if (ProfileOptionsViewState == true) {
            setUsernameToReport(PostOwner);
            setPostEncrypted(PostEncrypted)
            setProfileOptionsViewState(false);
            setFlatListElementsEnabledState(false);
        } else {
            setUsernameToReport(null);
            setPostEncrypted(null);
            setProfileOptionsViewState(true);
            setFlatListElementsEnabledState(true);
        }
    }

    const OptionsViewMessageButtonOnPress = () => {
        alert("Coming soon");
    }

    const OptionsViewReportButtonOnPress = () => {
        setReportProfileOptionsViewState(false);
        setProfileOptionsViewState(true);
    }

    const changeReportProfilesOptionsView = () => {
        if (ReportProfileOptionsViewState == true) {
            setReportProfileOptionsViewState(false);
            setFlatListElementsEnabledState(false);
        } else {
            setReportProfileOptionsViewState(true);
            setFlatListElementsEnabledState(true);
        }
    }

    const changeReportProfiles_ContentThatShouldNotBePosted_OptionsView = () => {
        if (ReportProfile_ContentThatShouldNotBePosted_OptionsViewState == true) {
            setReportProfile_ContentThatShouldNotBePosted_OptionsViewState(false);
        } else {
            setReportProfile_ContentThatShouldNotBePosted_OptionsViewState(true);
        }
    }

    const changeReportProfiles_PretendingToBeSomeoneElse_OptionsView = () => {
        if (ReportProfile_PretendingToBeSomeoneElse_OptionsViewState == true) {
            setReportProfile_PretendingToBeSomeoneElse_OptionsViewState(false);
        } else {
            setReportProfile_PretendingToBeSomeoneElse_OptionsViewState(true);
        }
    }
    const [ReportProfileOptionsViewState, setReportProfileOptionsViewState] = useState(true);
    const [ReportProfile_ContentThatShouldNotBePosted_OptionsViewState, setReportProfile_ContentThatShouldNotBePosted_OptionsViewState] = useState(true);
    const [ReportProfile_PretendingToBeSomeoneElse_OptionsViewState, setReportProfile_PretendingToBeSomeoneElse_OptionsViewState] = useState(true);
    const [FlatListElementsEnabledState, setFlatListElementsEnabledState] = useState(true);
    // Start of checking for update and announce the update
    useEffect(() => {
        async function checkAndAnnounceUpdate() {
            const welcome_message = () => {
                alert("Welcome to SocialSquare, it looks like you have just downloaded this app for the first time! Nice! You are right now on development version " + development_version);
            };
            var development_version = '0.1.12';
            //Get data
            try {
                var development_version_localstorage_value = await AsyncStorage.getItem('development_version')
                if(development_version_localstorage_value !== null) {
                    if (development_version !== development_version_localstorage_value) {
                        console.log(development_version_localstorage_value);
                        var releaseNotes = "Fix all storedCredentials issues (so now usernames etc. show up) and added ads (1 ad gets shown per 5 posts shown)";
                        var alert_on_update = "SocialSquare has been updated to the latest version (dev version " + development_version + "). Changes in this update are: " + releaseNotes;
                        alert(alert_on_update);
                    } else {
                        console.log("Not updated");
                    }
                } else {
                    welcome_message();
                }
            } catch(e) {
                alert(e)
            }
            //Store data
            try {
                await AsyncStorage.setItem('development_version', development_version)
            } catch (e) {
                alert(e)
            }
        }
        checkAndAnnounceUpdate();
    }, [])
    // End of checking for update and announcing the update

    var deviceDimensions = useWindowDimensions()

    const [showEndOfListMessage, setShowEndOfListMessage] = useState(false);

    const ViewportAwareView = Viewport.Aware(View);

    // Audio play and pause code
    const [playbackStatus, setPlaybackStatus] = useState(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [playRecording, setPlayRecording] = useState(undefined);
    const [PlayAudioInSilentMode, setPlayAudioInSilentMode] = useState(undefined);
        async function playAudio(recording_uri) {
            setIntentionallyPaused(false);
            if (playbackStatus != null && playRecording) {
                if (playbackStatus.isLoaded && !playbackStatus.isPlaying) {
                    const status = await playRecording.playAsync()
                    setPlaybackStatus(status);
                    setIsAudioPlaying(true);
                }
            }
            if (!playbackStatus && !playRecording) {
                await Audio.setAudioModeAsync({
                    playsInSilentModeIOS: PlayAudioInSilentMode,
                });
                var play_sound = new Audio.Sound();
                setPlayRecording(play_sound);
                let status_update_num = 0;
                try {
                    console.log("Loading sound")
                    await play_sound.loadAsync(
                        { uri: recording_uri },
                        { shouldPlay: true },
                        { progressUpdateIntervalMillis: 100 }
                    );
                    await play_sound.setVolumeAsync(1);
                    console.log('Loaded Sound');
                    console.log("Playing sound");
                    play_sound.setOnPlaybackStatusUpdate(async (status) => {
                        setPlaybackStatus(status);
                        status_update_num += 1;
                        console.log("Playback status update num = " + status_update_num);
                        if (status.didJustFinish === true) {
                        // audio has finished!
                        await play_sound.unloadAsync()
                        setIsAudioPlaying(false);
                        setPlaybackStatus(null);
                        setPlayRecording(undefined);
                        }
                    })
                    await play_sound.playAsync();
                    setIsAudioPlaying(true);
                    
                } catch (error) {
                    console.log("Error when playing sound:", error);
                    alert("An error has occured. " + error)
                }
            }
        }

        async function pauseAudio(intentionallyPaused) {
            if (intentionallyPaused == true) {
                setIntentionallyPaused(true);
            } else {
                setIntentionallyPaused(false);
            }
            if (playRecording) {
                setIsAudioPlaying(false);
                await playRecording.pauseAsync();
            } else {
                setIsAudioPlaying(false);
            }
        }

        async function unloadAudio() {
            await playRecording.unloadAsync();
            setIsAudioPlaying(false);
            setPlaybackStatus(null);
            setPlayRecording(undefined);
            console.log('Unloaded audio')
        }

        const isFocused = useIsFocused()
        isFocused ? null : logoPressedTimes.current = 0
        isFocused ? null : playRecording ? unloadAudio() : null


    //End of Audio play and pause code

    const [intentionallyPaused, setIntentionallyPaused] = useState(false);

    const [filterMenuShown, setFilterMenuShown] = useState(true)

    const changeFilterView = () => {
        if (filterMenuShown == false) {
            setFilterMenuShown(true)
            setFlatListElementsEnabledState(true)
        } else {
            setFilterMenuShown(false)
            setFlatListElementsEnabledState(false)
        }
    }

    const [homeScreenSettingsMenuShown, setHomeScreenSettingsMenuShown] = useState(true)

    const changeHomeScreenSettingsMenuView = () => {
        if (homeScreenSettingsMenuShown == false) {
            setHomeScreenSettingsMenuShown(true)
            setFlatListElementsEnabledState(true)
        } else {
            setHomeScreenSettingsMenuShown(false)
            setFlatListElementsEnabledState(false)
        }
    }

    useEffect(() => {
        async function checkToShowUpdateSimpleStylesWarning() {
            const lastVersionUsed = await AsyncStorage.getItem('versionLastShownForSimpleStylingUpdateWarning')
            const simpleStylingData = JSON.parse(await AsyncStorage.getItem('simpleStylingData'))
            let lowestVersion = 9999;
            console.log('LAST VERSION USED IS ' + lastVersionUsed)
            if (simpleStylingData) {
                for (let i = 0; i < simpleStylingData.length; i++) {
                    if (simpleStylingData[i].stylingVersion < lowestVersion) {
                        lowestVersion = simpleStylingData[i].stylingVersion
                    }
                    if (simpleStylingData[i].stylingVersion == undefined) {
                        lowestVersion = 1
                    }
                }
                console.log(lowestVersion)
                console.log(lastVersionUsed)
                if (lastVersionUsed == null) {
                    console.log('Last version used is null. Now running the code for null')
                    if (lowestVersion < SimpleStylingVersion) {
                        if (AppStylingContextState == 'Default' || AppStylingContextState == 'Dark' || AppStylingContextState == 'Light' || AppStylingContextState == 'PureDark' || AppStylingContextState == 'PureLight') {
                            setAppStylingContextState('Default')
                            console.warn('Setting styling to Default')
                        }
                        setUpdateSimpleStylesWarningHidden(false)
                        setFlatListElementsEnabledState(false)
                    }
                    AsyncStorage.setItem('versionLastShownForSimpleStylingUpdateWarning', SimpleStylingVersion.toString())
                } else {
                    if (parseInt(lastVersionUsed) < SimpleStylingVersion) {
                        console.log('Last version used is less than current simple styling version')
                        if (AppStylingContextState == 'Default' || AppStylingContextState == 'Dark' || AppStylingContextState == 'Light' || AppStylingContextState == 'PureDark' || AppStylingContextState == 'PureLight') {
                            setAppStylingContextState('Default')
                            console.warn('Setting styling to Default')
                        }
                        setUpdateSimpleStylesWarningHidden(false)
                        setFlatListElementsEnabledState(false)
                        AsyncStorage.setItem('versionLastShownForSimpleStylingUpdateWarning', SimpleStylingVersion.toString())
                    }
                }
            } else {
                console.log('No simple styling data')
            }
        }
        checkToShowUpdateSimpleStylesWarning()
    }, [])

    const logoPressEasterEgg = () => {
        alert('Easter egg has been triggered')
    }

    const HTMLRenderers = {
        iframe: IframeRenderer
      };
      
    const customHTMLElementModels = {
        iframe: iframeModel
    };
    return(
        <View
         style={{flex: 1, backgroundColor: colors.primary, paddingTop: StatusBarHeight}}
         >
            <StatusBar color={colors.StatusBarColor}/>
            <View style={{flexDirection:'row', justifyContent: 'space-around'}}>
                <TouchableOpacity disabled={!FlatListElementsEnabledState} onPress={() => {navigation.navigate('NotificationsScreen')}}>
                    <Icon name="notifications" size={32} color={colors.tertiary}/>
                </TouchableOpacity>
                {/*<Text style={{fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: colors.tertiary, marginRight: 3}}>SocialSquare</Text>*/}
                <TouchableWithoutFeedback onPress={() => {
                    logoPressedTimes.current < 49 ? logoPressedTimes.current += 1 : logoPressEasterEgg()
                    console.log('Logo pressed times = ' + logoPressedTimes.current)
                }}>
                    <Image
                        source={require('../assets/NewLogo.png')}
                        resizeMode = 'contain'
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: colors.tertiary
                        }}
                    />
                </TouchableWithoutFeedback>
                <TouchableOpacity disabled={!FlatListElementsEnabledState} onPress={() => {navigation.navigate('ChatScreenNavigator')}}>
                    <Image
                        source={require('../assets/app_icons/chat.png')}
                        resizeMode = 'contain'
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: colors.tertiary
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', position: 'absolute', top: StatusBarHeight + 40, width: '100%', zIndex: 2}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: colors.brand, marginRight: 3}}>For You</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: colors.tertiary, marginRight: 3}}>Following</Text>
            </View>
            <ProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={updateSimpleStylesWarningHidden}>
                <ScrollView style={{marginHorizontal: 10}}>
                    <Text style={{color: colors.errorColor ? colors.errorColor : 'red', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>SocialSquare has recently been updated and the custom styles that you currently have are now out of date.</Text>
                    <Text style={{color: colors.tertiary, fontSize: 18, textAlign: 'center', marginVertical: 10}}>At least one of your custom styles are now outdated and SocialSquare now only supports version {SimpleStylingVersion}.</Text>
                    <StyledButton 
                        style={{marginVertical: 20, height: 'auto'}}
                        onPress={() => {
                            setUpdateSimpleStylesWarningHidden(true)
                            navigation.navigate('Profile', {
                                screen: 'Welcome',
                                params: {backButtonHidden: true, imageFromRoute: null, goToStylingMenu: true},
                            });
                        }}
                    >
                        <ButtonText style={{textAlign: 'center'}}>Go to custom stylings screen to update them and never show this message again</ButtonText>
                    </StyledButton>
                    <StyledButton onPress={() => {setUpdateSimpleStylesWarningHidden(true)}} style={{height: 'auto'}}>
                        <ButtonText style={{textAlign: 'center'}}>Ignore this message and never show it again</ButtonText>
                    </StyledButton>
                </ScrollView>
            </ProfileOptionsView>
            <ProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={filterMenuShown}>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                    <TouchableOpacity style={{position: 'absolute', left: 10}} onPress={changeFilterView}>
                        <Image
                        source={require('../assets/app_icons/back_arrow.png')}
                        style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, tintColor: colors.tertiary}}
                        resizeMode="contain"
                        resizeMethod="resize"
                        />
                    </TouchableOpacity>
                    <Text style={{textAlign: 'center', color: colors.tertiary, fontSize: 30, alignSelf: 'center'}}>Filter</Text>
                </View>
                <ProfileOptionsViewSubtitleText style={{color: colors.tertiary}}>Coming soon</ProfileOptionsViewSubtitleText>
                <ScrollView style={{width: '100%'}}>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        <View style={{flexDirection: 'column', flex: 1, alignItems: 'center'}}>
                            <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>Photos</Text>
                            <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>Videos</Text>
                            <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>Audio</Text>
                            <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>Threads</Text>
                            <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>Polls</Text>
                            <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>Categories</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                            <SwitchToggle
                                switchOn={showPhotos}
                                onPress={() => {setContextAndAsyncStorage('ShowPhotos')}}
                                circleColorOff={colors.tertiary}
                                circleColorOn={dark? colors.teritary : colors.primary}
                                backgroundColorOn={colors.darkestBlue}
                                backgroundColorOff={colors.borderColor}
                                containerStyle={{
                                    width: 50,
                                    height: 28,
                                    borderRadius: 25,
                                    padding: 5,
                                    marginVertical: 6.7
                                }}
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                }}
                            />
                            <SwitchToggle
                                switchOn={showVideos}
                                onPress={() => {setContextAndAsyncStorage('ShowVideos')}}
                                circleColorOff={colors.tertiary}
                                circleColorOn={dark? colors.teritary : colors.primary}
                                backgroundColorOn={colors.darkestBlue}
                                backgroundColorOff={colors.borderColor}
                                containerStyle={{
                                    width: 50,
                                    height: 28,
                                    borderRadius: 25,
                                    padding: 5,
                                    marginVertical: 6.7
                                }}
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                }}
                            />
                            <SwitchToggle
                                switchOn={showAudio}
                                onPress={() => {setContextAndAsyncStorage('ShowAudio')}}
                                circleColorOff={colors.tertiary}
                                circleColorOn={dark? colors.teritary : colors.primary}
                                backgroundColorOn={colors.darkestBlue}
                                backgroundColorOff={colors.borderColor}
                                containerStyle={{
                                    width: 50,
                                    height: 28,
                                    borderRadius: 25,
                                    padding: 5,
                                    marginVertical: 6.7
                                }}
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                }}
                            />
                            <SwitchToggle
                                switchOn={showThreads}
                                onPress={() => {setContextAndAsyncStorage('ShowThreads')}}
                                circleColorOff={colors.tertiary}
                                circleColorOn={dark? colors.teritary : colors.primary}
                                backgroundColorOn={colors.darkestBlue}
                                backgroundColorOff={colors.borderColor}
                                containerStyle={{
                                    width: 50,
                                    height: 28,
                                    borderRadius: 25,
                                    padding: 5,
                                    marginVertical: 6.7
                                }}
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                }}
                            />
                            <SwitchToggle
                                switchOn={showPolls}
                                onPress={() => {setContextAndAsyncStorage('ShowPolls')}}
                                circleColorOff={colors.tertiary}
                                circleColorOn={dark? colors.teritary : colors.primary}
                                backgroundColorOn={colors.darkestBlue}
                                backgroundColorOff={colors.borderColor}
                                containerStyle={{
                                    width: 50,
                                    height: 28,
                                    borderRadius: 25,
                                    padding: 5,
                                    marginVertical: 6.7
                                }}
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                }}
                            />
                            <SwitchToggle
                                switchOn={showCategories}
                                onPress={() => {setContextAndAsyncStorage('ShowCategories')}}
                                circleColorOff={colors.tertiary}
                                circleColorOn={dark? colors.teritary : colors.primary}
                                backgroundColorOn={colors.darkestBlue}
                                backgroundColorOff={colors.borderColor}
                                containerStyle={{
                                    width: 50,
                                    height: 28,
                                    borderRadius: 25,
                                    padding: 5,
                                    marginVertical: 6.7
                                }}
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </ProfileOptionsView>
            <ProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={homeScreenSettingsMenuShown}>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                    <TouchableOpacity style={{position: 'absolute', left: 10}} onPress={changeHomeScreenSettingsMenuView}>
                        <Image
                        source={require('../assets/app_icons/back_arrow.png')}
                        style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, tintColor: colors.tertiary}}
                        resizeMode="contain"
                        resizeMethod="resize"
                        />
                    </TouchableOpacity>
                    <Text style={{textAlign: 'center', color: colors.tertiary, fontSize: 24, alignSelf: 'center'}}>Home Screen Settings</Text>
                </View>
                <ScrollView style={{width: '100%'}}>
                    <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 30, marginVertical: 20, justifyContent: 'space-evenly', minHeight: 30, height: 30, maxHeight: 30}}>
                        <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold'}}>Play Audio in Silent Mode</Text>
                        <SwitchToggle
                            switchOn={PlayAudioInSilentMode}
                            onPress={() => {setContextAndAsyncStorage('PlayAudioInSilentMode')}}
                            circleColorOff={colors.tertiary}
                            circleColorOn={dark? colors.teritary : colors.primary}
                            backgroundColorOn={colors.darkestBlue}
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
                    <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 30, marginVertical: 20, justifyContent: 'space-evenly', minHeight: 30, height: 30, maxHeight: 30}}>
                        <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold'}}>Mute video in Silent Mode</Text>
                        <SwitchToggle
                            switchOn={PlayVideoSoundInSilentMode}
                            onPress={() => {setContextAndAsyncStorage('PlayVideoSoundInSilentMode')}}
                            circleColorOff={colors.tertiary}
                            circleColorOn={dark? colors.teritary : colors.primary}
                            backgroundColorOn={colors.darkestBlue}
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
                </ScrollView>
            </ProfileOptionsView>
            <ProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={ProfileOptionsViewState}>
                <ProfileOptionsViewText style={{color: colors.tertiary}}>{usernameToReport || "Couldn't get name"}</ProfileOptionsViewText>
                <ProfileOptionsViewSubtitleText style={{color: colors.tertiary}}>Options</ProfileOptionsViewSubtitleText>
                <ProfileOptionsViewButtons greyButton={true} onPress={changeOptionsView}>
                    <ProfileOptionsViewButtonsText greyButton={true}>Cancel</ProfileOptionsViewButtonsText>
                </ProfileOptionsViewButtons> 
                <ProfileOptionsViewButtons greyButton={true} onPress={OptionsViewMessageButtonOnPress}>
                    <ProfileOptionsViewButtonsText greyButton={true}>Message</ProfileOptionsViewButtonsText>
                </ProfileOptionsViewButtons>
                <ProfileOptionsViewButtons redButton={true} onPress={OptionsViewReportButtonOnPress}>
                    <ProfileOptionsViewButtonsText redButton={true}>Report</ProfileOptionsViewButtonsText>
                </ProfileOptionsViewButtons> 
            </ProfileOptionsView>
                {postEncrypted == 'false' ?
                    <ReportProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={ReportProfileOptionsViewState} post={true}>
                        <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{"Report " + usernameToReport || "Report profile"}</ReportProfileOptionsViewText>
                        <ReportProfileOptionsViewSubtitleText style={{color: colors.tertiary}}>Use this page to report this profile. If anyone is in danger immediately call emergency services. Do Not Wait.</ReportProfileOptionsViewSubtitleText>
                        <ReportProfileOptionsViewButtons greyButton={true} onPress={changeReportProfilesOptionsView}>
                            <ReportProfileOptionsViewButtonsText greyButton={true}>Cancel</ReportProfileOptionsViewButtonsText>
                        </ReportProfileOptionsViewButtons>
                        <ReportProfileOptionsViewButtons redButton={true} onPress={changeReportProfiles_ContentThatShouldNotBePosted_OptionsView}>
                            <ReportProfileOptionsViewButtonsText redButton={true}>This post is content that should not be on SocialSquare.</ReportProfileOptionsViewButtonsText>
                        </ReportProfileOptionsViewButtons>
                        <ReportProfileOptionsViewButtons redButton={true} onPress={changeReportProfiles_PretendingToBeSomeoneElse_OptionsView}>
                            <ReportProfileOptionsViewButtonsText redButton={true}>This post is pretending to be someone they're not</ReportProfileOptionsViewButtonsText>
                        </ReportProfileOptionsViewButtons>
                    </ReportProfileOptionsView>
                :
                    <ReportProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={ReportProfileOptionsViewState} post={true}>
                        <ReportProfileOptionsViewButtons greyButton={true} onPress={changeReportProfilesOptionsView}>
                            <ReportProfileOptionsViewButtonsText greyButton={true}>Cancel</ReportProfileOptionsViewButtonsText>
                        </ReportProfileOptionsViewButtons>
                        <Text style={{fontSize: 24, color: colors.tertiary, textAlign: 'center', marginVertical: 30}}>This post is encrypted. Because this post is encrypted, SocialSquare cannot look at the post and therefore we can not take any action on it.</Text>
                        <Text style={{fontStyle: 'italic', color: 'red', fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>If anyone is in immediate danger, call emergency services. Do Not Wait.</Text>
                    </ReportProfileOptionsView>
                }
            <ReportProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={ReportProfile_ContentThatShouldNotBePosted_OptionsViewState}>
                <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{"Report " + usernameToReport || "Report profile"}</ReportProfileOptionsViewText>
                <ReportProfileOptionsViewSubtitleText style={{color: colors.tertiary}}>What content are you trying to report?</ReportProfileOptionsViewSubtitleText>
                <ReportProfileOptionsViewButtons padding={true} paddingAmount={'100px'}greyButton={true} onPress={changeReportProfiles_ContentThatShouldNotBePosted_OptionsView}>
                    <ReportProfileOptionsViewButtonsText greyButton={true}>Back</ReportProfileOptionsViewButtonsText>
                </ReportProfileOptionsViewButtons>
                <ScrollView style={{width: '100%'}}>
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>It's spam</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Nudity or sexual activity</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>I just don't like it</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Hate speech or symbols</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Suicide, self-injury or eating disorders</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Sale of illegal or regulated goods</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Violence or dangerous organizations</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Bullying or harassment</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Intellectual property violation</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Scam or fraud</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>False information</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                </ScrollView>
            </ReportProfileOptionsView>
            <ReportProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={ReportProfile_PretendingToBeSomeoneElse_OptionsViewState}>
                <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{"Report " + usernameToReport || "Report profile"}</ReportProfileOptionsViewText>
                <ReportProfileOptionsViewSubtitleText style={{color: colors.tertiary}}>User Is Pretending To Be Someone Else</ReportProfileOptionsViewSubtitleText>
                <ReportProfileOptionsViewButtons greyButton={true} onPress={changeReportProfiles_PretendingToBeSomeoneElse_OptionsView}>
                    <ReportProfileOptionsViewButtonsText greyButton={true}>Back</ReportProfileOptionsViewButtonsText>
                </ReportProfileOptionsViewButtons>
                <ScrollView style={{width: '100%'}}>
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>This account is pretending to be me</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>This account is pretending to be someone I know</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>This account is pretending to be a celebrity or public figure</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>This account is pretending to be a business or organisation</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                </ScrollView>
            </ReportProfileOptionsView>
            {uploading == true &&
                <TouchableOpacity onPress={() => {errorOccuredWhileUploading ? postType == 'multimedia' ? postMultiMedia(postData) : postType == 'poll' ? handleCreatePollPost(postData) : postType == 'thread_text' ? handlePostThread(postData, 'text') : postType == 'thread_image' ? handlePostThread(postData, 'image') : alert('Error occured') : null}} style={{alignItems: 'center', flexDirection: 'row', alignSelf: 'center'}}>
                    <ActivityIndicator size="small" color={colors.brand}/>
                    <Text style={{color: colors.tertiary, fontSize: 20, marginLeft: 10, textAlign: 'center', marginBottom: 5}}>{uploadingText}</Text>
                </TouchableOpacity>
            }
            <FlatList
                data={Posts}
                scrollEnabled={FlatListElementsEnabledState}
                ListHeaderComponent={postData != undefined ?
                    postType == 'multimedia' ?
                    <>
                        <View style={{backgroundColor: dark ? colors.slightlyLighterPrimary : colors.borderColor, borderRadius: 15, marginBottom: 10}}>
                            <PostsHorizontalView style={{marginLeft: '5%', borderBottomWidth: 3, borderColor: colors.darkLight, width: '90%', paddingBottom: 5, marginRight: '5%'}}>
                                <PostsVerticalView>
                                    <PostCreatorIcon source={{uri: profilePictureUri}}/>
                                </PostsVerticalView>
                                <PostsVerticalView style={{marginTop: 9}}>
                                    <SubTitle style={{fontSize: 20, color: colors.brand, marginBottom: 0}}>{displayName}</SubTitle>
                                    <SubTitle style={{fontSize: 12, marginBottom: 0, color: colors.tertiary}}>@{name}</SubTitle>
                                </PostsVerticalView>
                            </PostsHorizontalView>
                            <PostsHorizontalView style={{alignItems: 'center', justifyContent: 'center'}}>
                                <MultiMediaPostFrame postOnProfile={true} style={{ aspectRatio: 1/1, backgroundColor: colors.primary }}>
                                    <Image style={{width: '100%', height: '100%', resizeMode : 'cover', borderRadius: 20}} source={{uri: postData.image.uri}}/>
                                </MultiMediaPostFrame>
                            </PostsHorizontalView>
                            <ImagePostTextFrame style={{textAlign: 'center'}}>
                                <SubTitle style={{fontSize: 20, color: colors.tertiary, marginBottom: 0}}>{postData.title}</SubTitle>
                                <SubTitle style={{fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{postData.description}</SubTitle>
                            </ImagePostTextFrame>
                            <PostHorizontalView style={{marginLeft: '5%', width: '90%', paddingVertical: 10, flex: 1, flexDirection: 'row'}}>
                                <PostsIconFrame>
                                    <PostsIcons style={{flex: 1}} tintColor={colors.brand} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')}/>
                                </PostsIconFrame>
                                <PostsIconFrame>
                                    <SubTitle style={{alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal'}}>0</SubTitle>
                                </PostsIconFrame>
                                <PostsIconFrame>
                                    <PostsIcons style={{flex: 1}} tintColor={colors.brand} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')}/>
                                </PostsIconFrame>
                                <PostsIconFrame/>
                                <PostsIconFrame>
                                    <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/113-bubbles4.png')}/>
                                </PostsIconFrame>
                                <PostsIconFrame>
                                    <PostsIcons style={{flex: 1, height: 30, width: 30}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/387-share2.png')}/>
                                </PostsIconFrame>
                                <PostsIconFrame>
                                    <PostsIcons style={{flex: 1}} source={require('./../assets/img/ThreeDots.png')}/>
                                </PostsIconFrame>
                            </PostHorizontalView>
                            <SubTitle style={{flex: 1, alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal'}}>Just Now</SubTitle>
                            <SubTitle style={{flex: 1, alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal'}}>0 comments</SubTitle>
                        </View>
                    </>
                    :   postType == 'poll' ?
                            <>
                                <PollPostFrame>
                                    <PostsHorizontalView style={{marginLeft: '5%', borderBottomWidth: 3, borderColor: darkLight, width: '90%', paddingBottom: 5, marginRight: '5%'}}>
                                        <PostsVerticalView>
                                            <PostCreatorIcon source={{uri: profilePictureUri}}/>
                                        </PostsVerticalView>
                                        <PostsVerticalView style={{marginTop: 9}}>
                                            <SubTitle style={{fontSize: 20, color: brand, marginBottom: 0}}>{displayName}</SubTitle>
                                            <SubTitle style={{fontSize: 12, marginBottom: 0, color: colors.tertiary}}>@{name}</SubTitle>
                                        </PostsVerticalView>
                                    </PostsHorizontalView>
                                    <PollPostTitle style={{width: '95%'}}>
                                        {postData.pollTitle}
                                    </PollPostTitle>
                                    <PollPostSubTitle style={{width: '95%', color: colors.tertiary}}>
                                        {postData.pollSubTitle}
                                    </PollPostSubTitle>
                                    <AboveBarPollPostHorizontalView>
                                        <PollPostSubTitle style={{width: optionOnesBarLength+'%', color: colors.tertiary}}>
                                            1
                                        </PollPostSubTitle>
                                        <PollPostSubTitle style={{width: optionTwosBarLength+'%', color: colors.tertiary }}>
                                            2
                                        </PollPostSubTitle>
                                        <PollPostSubTitle style={{width: optionThreesBarLength+'%', color: colors.tertiary }}>
                                            3
                                        </PollPostSubTitle>
                                        <PollPostSubTitle style={{width: optionFoursBarLength+'%', color: colors.tertiary }}>
                                            4
                                        </PollPostSubTitle>
                                        <PollPostSubTitle style={{width: optionFivesBarLength+'%', color: colors.tertiary }}>
                                            5
                                        </PollPostSubTitle>
                                        <PollPostSubTitle style={{width: optionSixesBarLength+'%', color: colors.tertiary }}>
                                            6
                                        </PollPostSubTitle>
                                    </AboveBarPollPostHorizontalView>
                                    <PollBarOutline>
                                        <PollBarItem borderChange={optionOnesBarLength} style={{ width: optionOnesBarLength+'%', backgroundColor: postData.optionOnesColor == 'Not Specified' ? brand : eval(postData.optionOnesColor.toLowerCase())}}></PollBarItem>
                                        <PollBarItem borderChange={optionTwosBarLength} style={{ width: optionTwosBarLength+'%', backgroundColor: postData.optionTwosColor == 'Not Specified' ? brand : eval(postData.optionTwosColor.toLowerCase() )}}></PollBarItem>
                                        <PollBarItem borderChange={optionThreesBarLength} style={{ width: optionThreesBarLength+'%', backgroundColor: postData.optionThreesColor == 'Not Specified' ? brand : eval(postData.optionThreesColor.toLowerCase()) }}></PollBarItem>
                                        <PollBarItem borderChange={optionFoursBarLength} style={{ width: optionFoursBarLength+'%', backgroundColor: postData.optionFoursColor == 'Not Specified' ? brand : eval(postData.optionFoursColor.toLowerCase()) }}></PollBarItem>
                                        <PollBarItem borderChange={optionFivesBarLength} style={{ width: optionFivesBarLength+'%', backgroundColor: postData.optionFivesColor == 'Not Specified' ? brand : eval(postData.optionFivesColor.toLowerCase()) }}></PollBarItem>
                                        <PollBarItem borderChange={optionSixesBarLength} style={{ width: optionSixesBarLength+'%', backgroundColor: postData.optionSixesColor == 'Not Specified' ? brand : eval(postData.optionSixesColor.toLowerCase()) }}></PollBarItem>
                                    </PollBarOutline>
                                    <PollPostHorizontalView>
                                        <PollKeyViewOne pollOptions={postData.totalNumberOfOptions}>
                                            <PollPostSubTitle style={{color: colors.tertiary}}>
                                                1. {postData.optionOne}
                                            </PollPostSubTitle>
                                            <PollKeysCircle circleColor={postData.optionOnesColor}></PollKeysCircle>
                                        </PollKeyViewOne>
                                        <PollKeyViewTwo pollOptions={postData.totalNumberOfOptions}>
                                            <PollKeysCircle circleColor={postData.optionTwosColor}></PollKeysCircle>
                                            <PollPostSubTitle style={{color: colors.tertiary}}>
                                                2. {postData.optionTwo}
                                            </PollPostSubTitle>
                                        </PollKeyViewTwo>
                                    </PollPostHorizontalView>
                                    
                                    <PollPostHorizontalView>
                                        <PollKeyViewThree pollOptions={postData.totalNumberOfOptions}>
                                            <PollPostSubTitle style={{color: colors.tertiary}}>
                                                3. {postData.optionThree}
                                            </PollPostSubTitle>
                                            <PollKeysCircle circleColor={postData.optionThreesColor}></PollKeysCircle>
                                        </PollKeyViewThree>
                                        <PollKeyViewFour pollOptions={postData.totalNumberOfOptions}>
                                            <PollKeysCircle circleColor={postData.optionFoursColor}></PollKeysCircle>
                                            <PollPostSubTitle style={{color: colors.tertiary}}>
                                                4. {postData.optionFour}
                                            </PollPostSubTitle>
                                        </PollKeyViewFour>
                                    </PollPostHorizontalView>

                                    <PollPostHorizontalView>
                                        <PollKeyViewFive pollOptions={postData.totalNumberOfOptions}>
                                            <PollPostSubTitle style={{color: colors.tertiary}}>
                                                5. {postData.optionFive}
                                            </PollPostSubTitle>
                                            <PollKeysCircle circleColor={postData.optionFivesColor}></PollKeysCircle>
                                        </PollKeyViewFive>
                                        <PollKeyViewSix pollOptions={postData.totalNumberOfOptions}>
                                            <PollKeysCircle circleColor={postData.optionSixesColor}></PollKeysCircle>
                                            <PollPostSubTitle style={{color: colors.tertiary}}>
                                                6. {postData.optionSix}
                                            </PollPostSubTitle>
                                        </PollKeyViewSix>
                                    </PollPostHorizontalView>
                                    <PostHorizontalView style={{marginLeft: '5%', width: '90%', paddingVertical: 10, flex: 1, flexDirection: 'row', borderTopWidth: 3, borderColor: darkest}}>
                                    <PostsIconFrame>
                                        <PostsIcons style={{flex: 1}} tintColor={brand} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')}/>
                                    </PostsIconFrame>
                                    <PostsIconFrame>
                                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>0</SubTitle>
                                    </PostsIconFrame>
                                    <PostsIconFrame>
                                        <PostsIcons style={{flex: 1}} tintColor={brand} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')}/>
                                    </PostsIconFrame>
                                    <PostsIconFrame>
                                        <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/113-bubbles4.png')}/>
                                    </PostsIconFrame>
                                    <PostsIconFrame>
                                        <PostsIcons style={{flex: 1, height: 30, width: 30}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/387-share2.png')}/>
                                    </PostsIconFrame>
                                    <PostsIconFrame>
                                        <PostsIcons style={{flex: 1}} source={require('./../assets/img/ThreeDots.png')}/>
                                    </PostsIconFrame>
                                    </PostHorizontalView>
                                    <SubTitle style={{flex: 1, alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>Just Now</SubTitle>
                                    <SubTitle style={{flex: 1, alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>0 comments</SubTitle>
                                </PollPostFrame>
                            </>
                        : postType == 'thread_text' || postType == 'thread_image' ?
                            <>
                                <View style={{backgroundColor: dark ? slightlyLighterPrimary : colors.borderColor, borderRadius: 15, marginBottom: 10}}>
                                    {postData.threadNSFW === true && (
                                        <SubTitle style={{fontSize: 10, color: red, marginBottom: 0}}>(NSFW)</SubTitle>
                                    )}
                                    {postData.threadNSFL === true && (
                                        <SubTitle style={{fontSize: 10, color: red, marginBottom: 0}}>(NSFL)</SubTitle>
                                    )}
                                    <View style={{paddingHorizontal: '50%'}}/>
                                    <PostsHorizontalView style={{marginLeft: '5%', borderColor: darkLight, width: '90%', paddingBottom: 5, marginRight: '5%'}}>
                                        <TouchableOpacity style={{width: '100%', height: 60}}>
                                            <PostsHorizontalView>
                                                <PostsVerticalView>
                                                    <PostCreatorIcon source={{uri: profilePictureUri}}/>
                                                </PostsVerticalView>
                                                <PostsVerticalView style={{marginTop: 9}}>
                                                    <SubTitle style={{fontSize: 20, marginBottom: 0, color: colors.tertiary}}>{displayName}</SubTitle>
                                                    <SubTitle style={{fontSize: 12, color: brand, marginBottom: 0}}>@{name}</SubTitle>
                                                </PostsVerticalView>
                                            </PostsHorizontalView>
                                        </TouchableOpacity>
                                    </PostsHorizontalView>
                                    <TouchableOpacity>
                                        <ImagePostTextFrame style={{textAlign: 'left', alignItems: 'baseline'}}>
                                            <TouchableOpacity>
                                                <SubTitle style={{fontSize: 10, color: brand, marginBottom: 0}}>Category: {postData.selectedCategory}</SubTitle>
                                            </TouchableOpacity>
                                            <SubTitle style={{fontSize: 20, marginBottom: 0, color: colors.tertiary}}>{postData.threadTitle}</SubTitle>
                                            {postData.threadSubtitle !== "" && (
                                                <SubTitle style={{fontSize: 18, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{postData.threadSubtitle}</SubTitle>
                                            )}
                                            {postData.threadTags !== "" && (
                                                <TouchableOpacity>
                                                    <SubTitle style={{fontSize: 10, color: brand, marginBottom: 10}}>{postData.threadTags}</SubTitle>
                                                </TouchableOpacity>
                                            )}
                                            {postType == "thread_text" && (
                                                <SubTitle style={{fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{postData.threadBody}</SubTitle>
                                            )}
                                            <View style={{textAlign: 'left', alignItems: 'baseline', marginLeft: '5%', marginRight: '5%', width: '90%'}}>
                                                {postType == "thread_image" && (
                                                    <View>
                                                        <View style={{height: 200, width: 200}}>
                                                            <Image style={{height: '100%', width: 'auto', resizeMode: 'contain'}} source={{uri: postData.image.uri}}/>
                                                        </View>
                                                        <SubTitle style={{fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{postData.threadImageDescription}</SubTitle>
                                                    </View>
                                                )}
                                            </View>
                                        </ImagePostTextFrame>
                                    </TouchableOpacity>
                                    
                                    <PostHorizontalView style={{marginLeft: '5%', width: '90%', paddingVertical: 10, flex: 1, flexDirection: 'row'}}>
                                    
                                        <PostsIconFrame>
                                            <PostsIcons style={{flex: 1}} tintColor={brand} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')}/>
                                        </PostsIconFrame>
                                        <PostsIconFrame>
                                            <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>0</SubTitle>
                                        </PostsIconFrame>
                                        <PostsIconFrame>
                                            <PostsIcons style={{flex: 1}} tintColor={brand} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')}/>
                                        </PostsIconFrame>
                                        <PostsIconFrame>
                                            <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/113-bubbles4.png')}/>
                                        </PostsIconFrame>
                                        <PostsIconFrame>
                                            <PostsIcons style={{flex: 1, height: 30, width: 30}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/387-share2.png')}/>
                                        </PostsIconFrame>
                                        <PostsIconFrame>
                                            <PostsIcons style={{flex: 1}} source={require('./../assets/img/ThreeDots.png')}/>
                                        </PostsIconFrame>
                                    </PostHorizontalView>
                                    <SubTitle style={{flex: 1, alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>Just Now</SubTitle>
                                    <TouchableOpacity>
                                        <SubTitle style={{flex: 1, alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>0 comments</SubTitle>
                                    </TouchableOpacity>
                                </View>
                            </>
                        : postType == 'category' ?
                            <>
                                <SearchFrame>
                                    <View style={{paddingHorizontal: '50%'}}/>
                                    {postData.image !== null && (
                                        <Avatar resizeMode="cover" searchPage={true} source={{uri: postData.image.uri}} />
                                    )}
                                    {postData.image == null && (
                                        <Avatar resizeMode="cover" searchPage={true} source={require('./../assets/img/Logo.png')} />
                                    )}
                                    {postData.categoryNSFW == false && (
                                        <View>
                                            {postData.categoryNSFL == false && (
                                                <SubTitle style={{color: colors.tertiary}} searchResTitle={true}>{postData.categoryTitle}</SubTitle>
                                            )}
                                            {postData.categoryNSFL == true && (
                                                <View style={{flexDirection: 'row'}}>
                                                    <SubTitle searchResTitle={true} style={{color: red}}>(NSFL) </SubTitle>
                                                    <SubTitle style={{color: colors.tertiary}} searchResTitle={true}>{postData.categoryTitle}</SubTitle>
                                                </View>
                                            )}
                                        </View>
                                    )}
                                    {postData.categoryNSFW == true && (
                                        <View style={{flexDirection: 'row'}}>
                                            <SubTitle searchResTitle={true} style={{color: red}}>(NSFW) </SubTitle>
                                            <SubTitle style={{color: colors.tertiary}} searchResTitle={true}>{postData.categoryTitle}</SubTitle>
                                        </View>
                                    )}
                                    <SubTitle style={{color: colors.tertiary}} searchResTitleDisplayName={true}>{postData.categoryDescription}</SubTitle>
                                    <SubTitle searchResTitleDisplayName={true} style={{color: brand}}>{postData.categoryTags}</SubTitle>
                                    <SearchHorizontalView>
                                        <SearchHorizontalViewItemCenter style={{height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                                            <SearchSubTitle welcome={true} style={{flex: 1, color: colors.tertiary}}> Members </SearchSubTitle>
                                            <ProfIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/115-users.png')}/>
                                            <SearchSubTitle welcome={true} style={{flex: 1, color: colors.tertiary}}> 0 </SearchSubTitle>
                                        </SearchHorizontalViewItemCenter>
                                        <SearchHorizontalViewItemCenter style={{height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                                            <SearchSubTitle welcome={true} style={{flex: 1, color: colors.tertiary}}> Date Created </SearchSubTitle>
                                            <ProfIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/084-calendar.png')}/>
                                            <SearchSubTitle welcome={true} style={{flex: 1, color: colors.tertiary}}> Just Now </SearchSubTitle>
                                        </SearchHorizontalViewItemCenter>
                                    </SearchHorizontalView>
                                </SearchFrame>
                            </>
                        :
                            <Text style={{color: colors.errorColor, fontSize: 20, textAlign: 'center', marginVertical: 20}}>Error occured.</Text>
                : null
                }
            />
        
        </View>
    );
};

export default HomeScreen;