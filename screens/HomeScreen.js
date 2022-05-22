import React, { useState, useContext, useRef, useEffect, useCallback, memo } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Alert, useWindowDimensions, Animated, ActivityIndicator, TouchableWithoutFeedback, RefreshControl} from 'react-native';
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
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png.js';
import { BadgeEarntNotificationContext } from '../components/BadgeEarntNotificationContext.js';
import * as Haptics from 'expo-haptics';

import Post from '../components/Posts.js';

import {
    AdMobBanner,
} from 'expo-ads-admob'
import { AllCredentialsStoredContext } from '../components/AllCredentialsStoredContext.js';

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
    if (storedCredentials) {var {name, displayName, _id} = storedCredentials} else {var {name, displayName, _id} = {name: 'SSGUEST', displayName: 'SSGUEST', _id: 'SSGUEST'}}
    const {serverUrl, setServerUrl} = useContext(ServerUrlContext);
    const {badgeEarntNotification, setBadgeEarntNotification} = useContext(BadgeEarntNotificationContext);
    const {allCredentialsStoredList, setAllCredentialsStoredList} = useContext(AllCredentialsStoredContext);

    //Easter egg - Logo Press
    const logoPressedTimes = useRef(0);

    // Start of Feed code

    const MemoizedPost = memo(Post)

    //Post usestates etc
    const [allPosts, setAllPosts] = useState([])

    //Usestates etc
    const [currentFeed, setCurrentFeed] = useState('Following');
    const [reloadFeed, setReloadFeed] = useState(false) //I havent made anything for this but I added it so its easier to make
    const [loadingFeed, setLoadingFeed] = useState(false)

    const viewedOnThisLoadsId = React.useRef([])

    //msg stuff
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [postNumForMsg, setPostNumForMsg] = useState();

    const handleMessage = (message, type = 'FAILED', postNum) => {
        setMessage(message);
        setMessageType(type);
        if (postNum !== null) {
            setPostNumForMsg(postNum)
        } else {
            setPostNumForMsg(null)
        }
    }

    //organise data and put to be displayed
    async function getImageWithKey(imageKey) {
        return axios.get(`${serverUrl}/getImageOnServer/${imageKey}`)
            .then(res => 'data:image/jpeg;base64,' + res.data).catch(error => {
                console.log(error);
                //setSubmitting(false);
                //setLoadingPostsImage(false)
                console.log("Either an error or cancelled.");
            })
    }

    const handleRecievedImagePost = (imageData, indexInRecieved, callback) => {
        var index = indexInRecieved
        if (allPosts.length !== 0) {
            index = indexInRecieved+allPosts.length
        } else {
            index = indexInRecieved
        }
        console.log(`imageData.hasSeenPosts: ${imageData.hasSeenPosts}`)

        /*
        var upVotedImages = upVotesImages
        var initialUpVotedImages = initialUpVotesImages
        var downVotedImages = downVotesImages
        var initialDownVotedImages = initialDownVotesImages
        var neitherVotedImages = neitherVotesImages
        var initialNeitherVotedImages = initialNeitherVotesImages
        */

        async function findImages() {
            //
            if (imageData.creatorPfpKey) {
                async function asyncFunctionForImages() {
                    const imageB64 = await getImageWithKey(imageData.imageKey)
                    const pfpB64 = await getImageWithKey(imageData.creatorPfpKey)
                    console.log("Image In Post Recieved")
                    //Add
                    const addAndPush = async () => {
                        console.log("TestHere")
                        var usersUdnVote = "Neither"
                        if (imageData.imageUpVoted) {
                            console.log("UpVoted")
                            usersUdnVote = "UpVoted"
                        } else if (imageData.imageDownVoted) {
                            console.log("DownVoted")
                            usersUdnVote = "DownVoted"
                        } else {
                            console.log("Neither")
                            usersUdnVote = "Neither"
                        }
                        var forSendBack = {format: "Image", imageId: imageData.imageId, imageKey: imageData.imageKey, imageB64: imageB64, imageTitle: imageData.imageTitle, imageDescription: imageData.imageDescription, imageUpVotes: imageData.imageUpVotes, imageComments: imageData.imageComments, creatorName: imageData.creatorName, creatorDisplayName: imageData.creatorDisplayName, creatorPfpB64: pfpB64, datePosted: imageData.datePosted, postNum: index, hasSeenPosts: imageData.hasSeenPosts, usersUdnVote: usersUdnVote}
                        return callback(forSendBack)
                    }
                    await addAndPush()
                }
                asyncFunctionForImages()
            } else {
                console.log("No pfp")
                const imageB64 = await getImageWithKey(imageData.imageKey)
                var imageInPfp = null
                //Add
                const addAndPush = async () => {
                    var pfpB64 = imageInPfp
                    console.log("TestHere")
                    var usersUdnVote = "Neither"
                    if (imageData.imageUpVoted) {
                        console.log("UpVoted")
                        usersUdnVote = "UpVoted"
                    } else if (imageData.imageDownVoted) {
                        console.log("DownVoted")
                        usersUdnVote = "DownVoted"
                    } else {
                        console.log("Neither")
                        usersUdnVote = "Neither"
                    }
                    var forSendBack = {format: "Image", imageId: imageData.imageId, imageKey: imageData.imageKey, imageB64: imageB64, imageTitle: imageData.imageTitle, imageDescription: imageData.imageDescription, imageUpVotes: imageData.imageUpVotes, imageComments: imageData.imageComments, creatorName: imageData.creatorName, creatorDisplayName: imageData.creatorDisplayName, creatorPfpB64: pfpB64, datePosted: imageData.datePosted, postNum: index, hasSeenPosts: imageData.hasSeenPosts, usersUdnVote: usersUdnVote}
                    return callback(forSendBack)
                }
                await addAndPush()
            }
        }
        findImages()
    }

    const handleRecievedPollPost = (pollData, indexInRecieved, callback) => {
        var index = indexInRecieved
        if (allPosts.length !== 0) {
            index = indexInRecieved+allPosts.length
        } else {
            index = indexInRecieved
        }
        var optionOnesBarLength = 16.6666666667
        var optionTwosBarLength = 16.6666666667
        var optionThreesBarLength = 16.6666666667
        var optionFoursBarLength = 16.6666666667
        var optionFivesBarLength = 16.6666666667
        var optionSixesBarLength = 16.6666666667
        var totalVotes = pollData.optionOnesVotes + pollData.optionTwosVotes + pollData.optionThreesVotes + pollData.optionFoursVotes + pollData.optionFivesVotes + pollData.optionSixesVotes
        //console.log(item, index);
        if (totalVotes !== 0) {
            optionOnesBarLength = (pollData.optionOnesVotes / totalVotes) * 100
            console.log("O1 BL")
            console.log(optionOnesBarLength)
            optionTwosBarLength = (pollData.optionTwosVotes / totalVotes) * 100
            console.log("O2 BL")
            console.log(optionTwosBarLength)
            optionThreesBarLength = (pollData.optionThreesVotes / totalVotes) * 100
            console.log("O3 BL")
            console.log(optionThreesBarLength)
            optionFoursBarLength = (pollData.optionFoursVotes / totalVotes) * 100
            console.log("O4 BL")
            console.log(optionFoursBarLength)
            optionFivesBarLength = (pollData.optionFivesVotes / totalVotes) * 100
            console.log("O5 BL")
            console.log(optionFivesBarLength)
            optionSixesBarLength = (pollData.optionSixesVotes / totalVotes) * 100
            console.log("O6 BL")
            console.log(optionSixesBarLength)
            if (Number.isNaN(optionOnesBarLength)) {
                optionOnesBarLength = 0
            }
            if (Number.isNaN(optionTwosBarLength)) {
                optionTwosBarLength = 0
            }
            if (Number.isNaN(optionThreesBarLength)) {
                optionThreesBarLength = 0
            }
            if (Number.isNaN(optionFoursBarLength)) {
                optionFoursBarLength = 0
            }
            if (Number.isNaN(optionFivesBarLength)) {
                optionFivesBarLength = 0
            }
            if (Number.isNaN(optionSixesBarLength)) {
                optionSixesBarLength = 0
            }
        } else {
            if (totalVotes == 0) {
                console.log("No Votes")
                if (pollData.totalNumberOfOptions == "Two") {
                    optionOnesBarLength = 100 / 2
                    optionTwosBarLength = 100 / 2
                    optionThreesBarLength = 0
                    optionFoursBarLength = 0
                    optionFivesBarLength = 0
                    optionSixesBarLength = 0
                } else if (pollData.totalNumberOfOptions == "Three") {
                    optionOnesBarLength = 100 / 3
                    optionTwosBarLength = 100 / 3
                    optionThreesBarLength = 100 / 3
                    optionFoursBarLength = 0
                    optionFivesBarLength = 0
                    optionSixesBarLength = 0
                } else if (pollData.totalNumberOfOptions == "Four") {
                    optionOnesBarLength = 100 / 4
                    optionTwosBarLength = 100 / 4
                    optionThreesBarLength = 100 / 4
                    optionFoursBarLength = 100 / 4
                    optionFivesBarLength = 0
                    optionSixesBarLength = 0
                } else if (pollData.totalNumberOfOptions == "Five") {
                    optionOnesBarLength = 100 / 5
                    optionTwosBarLength = 100 / 5
                    optionThreesBarLength = 100 / 5
                    optionFoursBarLength = 100 / 5
                    optionFivesBarLength = 100 / 5
                    optionSixesBarLength = 0
                } else if (pollData.totalNumberOfOptions == "Six") {
                    optionOnesBarLength = 100 / 6
                    optionTwosBarLength = 100 / 6
                    optionThreesBarLength = 100 / 6
                    optionFoursBarLength = 100 / 6
                    optionFivesBarLength = 100 / 6
                    optionSixesBarLength = 100 / 6
                }
            }
        }
        console.log("poll data")
        console.log(pollData)
        if (pollData.creatorPfpKey) {
            /*
            var upVotedPolls = upVotesPolls
            var initialUpVotedPolls = initialUpVotesPolls
            var downVotedPolls = downVotesPolls
            var initialDownVotedPolls = initialDownVotesPolls
            var neitherVotedPolls = neitherVotesPolls
            var initialNeitherVotedPolls = initialNeitherVotesPolls
            */
            async function getPfpImageForPollWithAsync() {
                var imageData = pollData
                const pfpB64 = await getImageWithKey(imageData.creatorPfpKey)
                var usersUdnVote = "Neither"
                if (pollData.pollUpOrDownVoted == "UpVoted") {
                    console.log("UpVoted")
                    usersUdnVote = "UpVoted"
                } else if (pollData.pollUpOrDownVoted == "DownVoted") {
                    console.log("DownVoted")
                    usersUdnVote = "DownVoted"
                } else {
                    console.log("Neither")
                    usersUdnVote = "Neither"
                }
                var forSendBack = {format: "Poll", pollTitle: pollData.pollTitle, pollSubTitle: pollData.pollSubTitle, optionOne: pollData.optionOne, optionOnesColor: pollData.optionOnesColor, optionOnesVotes: pollData.optionOnesVotes, optionOnesBarLength: optionOnesBarLength, optionTwo: pollData.optionTwo, optionTwosColor: pollData.optionTwosColor, optionTwosVotes: pollData.optionTwosVotes, optionTwosBarLength: optionTwosBarLength, optionThree: pollData.optionThree, optionThreesColor: pollData.optionThreesColor, optionThreesVotes: pollData.optionThreesVotes, optionThreesBarLength: optionThreesBarLength, optionFour: pollData.optionFour, optionFoursColor: pollData.optionFoursColor, optionFoursVotes: pollData.optionFoursVotes, optionFoursBarLength: optionFoursBarLength, optionFive: pollData.optionFive, optionFivesColor: pollData.optionFivesColor, optionFivesVotes: pollData.optionFivesVotes, optionFivesBarLength: optionFivesBarLength, optionSix: pollData.optionSix, optionSixesColor: pollData.optionSixesColor, optionSixesVotes: pollData.optionSixesVotes, optionSixesBarLength: optionSixesBarLength, totalNumberOfOptions: pollData.totalNumberOfOptions, pollUpOrDownVotes: pollData.pollUpOrDownVotes, pollId: pollData._id, votedFor: pollData.votedFor, postNum: index, pollComments: pollData.pollComments, pfpB64: pfpB64, creatorName: pollData.creatorName, creatorDisplayName: pollData.creatorDisplayName, datePosted: pollData.datePosted, hasSeenPosts: pollData.hasSeenPosts, usersUdnVote: usersUdnVote}
                return callback(forSendBack)
            }
            getPfpImageForPollWithAsync()
        } else {
            var pfpB64 = null
            var usersUdnVote = "Neither"
            if (pollData.pollUpOrDownVoted == "UpVoted") {
                console.log("UpVoted")
                usersUdnVote = "UpVoted"
            } else if (pollData.pollUpOrDownVoted == "DownVoted") {
                console.log("DownVoted")
                usersUdnVote = "DownVoted"
            } else {
                console.log("Neither")
                usersUdnVote = "Neither"
            }
            var forSendBack = {format: "Poll", pollTitle: pollData.pollTitle, pollSubTitle: pollData.pollSubTitle, optionOne: pollData.optionOne, optionOnesColor: pollData.optionOnesColor, optionOnesVotes: pollData.optionOnesVotes, optionOnesBarLength: optionOnesBarLength, optionTwo: pollData.optionTwo, optionTwosColor: pollData.optionTwosColor, optionTwosVotes: pollData.optionTwosVotes, optionTwosBarLength: optionTwosBarLength, optionThree: pollData.optionThree, optionThreesColor: pollData.optionThreesColor, optionThreesVotes: pollData.optionThreesVotes, optionThreesBarLength: optionThreesBarLength, optionFour: pollData.optionFour, optionFoursColor: pollData.optionFoursColor, optionFoursVotes: pollData.optionFoursVotes, optionFoursBarLength: optionFoursBarLength, optionFive: pollData.optionFive, optionFivesColor: pollData.optionFivesColor, optionFivesVotes: pollData.optionFivesVotes, optionFivesBarLength: optionFivesBarLength, optionSix: pollData.optionSix, optionSixesColor: pollData.optionSixesColor, optionSixesVotes: pollData.optionSixesVotes, optionSixesBarLength: optionSixesBarLength, totalNumberOfOptions: pollData.totalNumberOfOptions, pollUpOrDownVotes: pollData.pollUpOrDownVotes, pollId: pollData._id, votedFor: pollData.votedFor, postNum: index, pollComments: pollData.pollComments, pfpB64: pfpB64, creatorName: pollData.creatorName, creatorDisplayName: pollData.creatorDisplayName, datePosted: pollData.datePosted, hasSeenPosts: pollData.hasSeenPosts, usersUdnVote: usersUdnVote}
            return callback(forSendBack)
        }
    }

    const handleRecievedThreadPost = (threadData, indexInRecieved, callback) => {
        var index = indexInRecieved
        if (allPosts.length !== 0) {
            index = indexInRecieved+allPosts.length
        } else {
            index = indexInRecieved
        }

        /*
        var upVotedThreads = upVotesThreads
        var initialUpVotedThreads = initialUpVotesThreads
        var downVotedThreads = downVotesThreads
        var initialDownVotedThreads = initialDownVotesThreads
        var neitherVotedThreads = neitherVotesThreads
        var initialNeitherVotedThreads = initialNeitherVotesThreads
        */
         
        async function findImages() {
            //
            if (threadData.creatorImageKey) {
                async function asyncFunctionForImages() {
                    if (threadData.threadType == "Text") {
                        const imageInPfp = await getImageWithKey(threadData.creatorImageKey)
                        const addAndPush = async () => {
                            var pfpB64 = imageInPfp.data
                            var usersUdnVote = "Neither"
                            if (threadData.threadUpVoted == true) {
                                console.log("UpVoted")
                                usersUdnVote = "UpVoted"
                            } else if (threadData.threadDownVoted == true) {
                                console.log("DownVoted")
                                usersUdnVote = "DownVoted"
                            } else {
                                console.log("Neither")
                                usersUdnVote = "Neither"
                            }
                            var forSendBack = { format: "Thread", postNum: index, threadId: threadData.threadId, threadComments: threadData.threadComments, threadType: threadData.threadType, threadUpVotes: threadData.threadUpVotes, threadTitle: threadData.threadTitle, threadSubtitle: threadData.threadSubtitle, threadTags: threadData.threadTags, threadCategory: threadData.threadCategory, threadBody: threadData.threadBody, threadImageKey: threadData.threadImageKey, threadImageDescription: threadData.threadImageDescription, threadNSFW: threadData.threadNSFW, threadNSFL: threadData.threadNSFL, datePosted: threadData.datePosted, threadUpVoted: threadData.threadUpVoted, threadDownVoted: threadData.threadDownVoted, creatorDisplayName: threadData.creatorDisplayName, creatorName: threadData.creatorName, creatorImageB64: pfpB64, imageInThreadB64: null, hasSeenPosts: threadData.hasSeenPosts, usersUdnVote: usersUdnVote }
                            return callback(forSendBack)
                        }
                        await addAndPush()
                    } else if (threadData.threadType == "Images") {
                        const imageInPfp = await getImageWithKey(threadData.creatorImageKey)
                        const imageInThread = await getImageWithKey(threadData.threadImageKey)
                        const addAndPush = async () => {
                            var pfpB64 = imageInPfp.data
                            var imageInThreadB64 = imageInThread.data
                            var usersUdnVote = "Neither"
                            if (threadData.threadUpVoted == true) {
                                console.log("UpVoted")
                                usersUdnVote = "UpVoted"
                            } else if (threadData.threadDownVoted == true) {
                                console.log("DownVoted")
                                usersUdnVote = "DownVoted"
                            } else {
                                console.log("Neither")
                                usersUdnVote = "Neither"
                            }
                            var forSendBack = { format: "Thread", postNum: index, threadId: threadData.threadId, threadComments: threadData.threadComments, threadType: threadData.threadType, threadUpVotes: threadData.threadUpVotes, threadTitle: threadData.threadTitle, threadSubtitle: threadData.threadSubtitle, threadTags: threadData.threadTags, threadCategory: threadData.threadCategory, threadBody: threadData.threadBody, threadImageKey: threadData.threadImageKey, threadImageDescription: threadData.threadImageDescription, threadNSFW: threadData.threadNSFW, threadNSFL: threadData.threadNSFL, datePosted: threadData.datePosted, threadUpVoted: threadData.threadUpVoted, threadDownVoted: threadData.threadDownVoted, creatorDisplayName: threadData.creatorDisplayName, creatorName: threadData.creatorName, creatorImageB64: pfpB64, imageInThreadB64: imageInThreadB64, hasSeenPosts: threadData.hasSeenPosts, usersUdnVote: usersUdnVote }
                            return callback(forSendBack)
                        }
                        await addAndPush()
                    }
                }
                asyncFunctionForImages()
            } else {
                async function asyncFunctionForImages() {
                    if (threadData.threadType == "Text") {
                        const addAndPush = async () => {
                            var pfpB64 = null
                            var usersUdnVote = "Neither"
                            if (threadData.threadUpVoted == true) {
                                console.log("UpVoted")
                                usersUdnVote = "UpVoted"
                            } else if (threadData.threadDownVoted == true) {
                                console.log("DownVoted")
                                usersUdnVote = "DownVoted"
                            } else {
                                console.log("Neither")
                                usersUdnVote = "Neither"
                            }
                            var forSendBack = { format: "Thread", postNum: index, threadId: threadData.threadId, threadComments: threadData.threadComments, threadType: threadData.threadType, threadUpVotes: threadData.threadUpVotes, threadTitle: threadData.threadTitle, threadSubtitle: threadData.threadSubtitle, threadTags: threadData.threadTags, threadCategory: threadData.threadCategory, threadBody: threadData.threadBody, threadImageKey: threadData.threadImageKey, threadImageDescription: threadData.threadImageDescription, threadNSFW: threadData.threadNSFW, threadNSFL: threadData.threadNSFL, datePosted: threadData.datePosted, threadUpVoted: threadData.threadUpVoted, threadDownVoted: threadData.threadDownVoted, creatorDisplayName: threadData.creatorDisplayName, creatorName: threadData.creatorName, creatorImageB64: pfpB64, imageInThreadB64: null, hasSeenPosts: threadData.hasSeenPosts, usersUdnVote: usersUdnVote }
                            return callback(forSendBack)
                        }
                        await addAndPush()
                    } else if (threadData.threadType == "Images") {
                        const imageInThread = await getImageWithKey(threadData.threadImageKey)
                        const addAndPush = async () => {
                            var pfpB64 = null
                            var imageInThreadB64 = imageInThread.data
                            var usersUdnVote = "Neither"
                            if (threadData.threadUpVoted == true) {
                                console.log("UpVoted")
                                usersUdnVote = "UpVoted"
                            } else if (threadData.threadDownVoted == true) {
                                console.log("DownVoted")
                                usersUdnVote = "DownVoted"
                            } else {
                                console.log("Neither")
                                usersUdnVote = "Neither"
                            }
                            var forSendBack = { format: "Thread", postNum: index, threadId: threadData.threadId, threadComments: threadData.threadComments, threadType: threadData.threadType, threadUpVotes: threadData.threadUpVotes, threadTitle: threadData.threadTitle, threadSubtitle: threadData.threadSubtitle, threadTags: threadData.threadTags, threadCategory: threadData.threadCategory, threadBody: threadData.threadBody, threadImageKey: threadData.threadImageKey, threadImageDescription: threadData.threadImageDescription, threadNSFW: threadData.threadNSFW, threadNSFL: threadData.threadNSFL, datePosted: threadData.datePosted, threadUpVoted: threadData.threadUpVoted, threadDownVoted: threadData.threadDownVoted, creatorDisplayName: threadData.creatorDisplayName, creatorName: threadData.creatorName, creatorImageB64: pfpB64, imageInThreadB64: imageInThreadB64, hasSeenPosts: threadData.hasSeenPosts, usersUdnVote: usersUdnVote }
                            return callback(forSendBack)
                        }
                        await addAndPush()
                    }
                }
                asyncFunctionForImages()
            }
        }
        findImages()
    }

    const layOutAllPosts = (postsRecieved, resetPostsShowingOnLoad) => {
        console.log(`postsRecieved amount ${postsRecieved.length}`)
        const sortAndSet = (setUpPosts) => {
            const hasNotSeenRecievedPosts = setUpPosts.filter(x => x.hasSeenPosts == false)
            const hasSeenRecievedPosts = setUpPosts.filter(x => x.hasSeenPosts == true)
            const notSeenSortedRecievedPosts = hasNotSeenRecievedPosts.sort(function(a, b){
                var first = a.datePosted.split(" ")[0];
                var second = b.datePosted.split(" ")[0];
                if (first !== second) {
                    var aa = first.split('/').reverse().join(),
                        bb = second.split('/').reverse().join();
                    //console.log(`aa ${aa}`)
                    //console.log(`bb ${bb}`)
                    return aa > bb ? -1 : (aa > bb ? 1 : 0);
                } else {
                    var ind11 = a.datePosted.indexOf(' ');
                    var ind12 = a.datePosted.indexOf(' ', ind11 + 1);
                    var firstTime = a.datePosted.substring(ind12);
                    //console.log(firstTime)
                    var ind21 = b.datePosted.indexOf(' ');
                    var ind22 = b.datePosted.indexOf(' ', ind21 + 1);
                    var secondTime = b.datePosted.substring(ind22);
                    //console.log(ind22)
                    return firstTime > secondTime ? -1 : (firstTime > secondTime ? 1 : 0);
                }
            });
            const seenSortedRecievedPosts = hasSeenRecievedPosts.sort(function(a, b){
                var first = a.datePosted.split(" ")[0];
                var second = b.datePosted.split(" ")[0];
                if (first !== second) {
                    var aa = first.split('/').reverse().join(),
                        bb = second.split('/').reverse().join();
                    //console.log(`aa ${aa}`)
                    //console.log(`bb ${bb}`)
                    return aa > bb ? -1 : (aa > bb ? 1 : 0);
                } else {
                    var ind11 = a.datePosted.indexOf(' ');
                    var ind12 = a.datePosted.indexOf(' ', ind11 + 1);
                    var firstTime = a.datePosted.substring(ind12);
                    //console.log(firstTime)
                    var ind21 = b.datePosted.indexOf(' ');
                    var ind22 = b.datePosted.indexOf(' ', ind21 + 1);
                    var secondTime = b.datePosted.substring(ind22);
                    //console.log(ind22)
                    return firstTime > secondTime ? -1 : (firstTime > secondTime ? 1 : 0);
                }
            });
            if (allPosts.length !== 0) {
                if (resetPostsShowingOnLoad !== true) {
                    const sortedRecievedPosts = allPosts.concat(notSeenSortedRecievedPosts).concat(seenSortedRecievedPosts)
                    console.log("sortedRecievedPosts")
                    //console.log(sortedRecievedPosts)
                    setAllPosts(sortedRecievedPosts)
                } else {
                    setAllPosts(seenSortedRecievedPosts)
                    console.log('Reload was successful')
                }
                setReloadFeed(false)
            } else {
                if (resetPostsShowingOnLoad !== true) {
                    const sortedRecievedPosts = notSeenSortedRecievedPosts.concat(seenSortedRecievedPosts)
                    console.log("sortedRecievedPosts")
                    //console.log(sortedRecievedPosts)
                    setAllPosts(sortedRecievedPosts)
                } else {
                    setAllPosts(seenSortedRecievedPosts)
                    console.log('Reload was successful')
                }
                setReloadFeed(false)
            }
        }

        if (postsRecieved.length !== 0) {
            var postsProcessed = 0
            var forConcat = []
            postsRecieved.forEach(function (item, index) {
                if (postsRecieved[index].format == "Image") {
                    //Image
                    handleRecievedImagePost(postsRecieved[index], index, function(setUpImagePost) {
                        if (setUpImagePost.imageKey) { //just to check if it exists and is proper
                            forConcat.push(setUpImagePost)
                            postsProcessed++;
                            if (postsProcessed == postsRecieved.length) {
                                sortAndSet(forConcat)
                                setLoadingFeed(false)
                            }
                        } else {
                            postsProcessed++;
                            if (postsProcessed == postsRecieved.length) {
                                sortAndSet(forConcat)
                                setLoadingFeed(false)
                            }
                        }
                    })
                    
                } else if (postsRecieved[index].format == "Poll") {
                    //Poll
                    handleRecievedPollPost(postsRecieved[index], index, function(setUpPollPost) {
                        if (setUpPollPost.pollId) { //just to check if it exists and is proper
                            forConcat.push(setUpPollPost)
                            postsProcessed++;
                            if (postsProcessed == postsRecieved.length) {
                                sortAndSet(forConcat)
                                setLoadingFeed(false)
                            }
                        } else {
                            postsProcessed++;
                            if (postsProcessed == postsRecieved.length) {
                                sortAndSet(forConcat)
                                setLoadingFeed(false)
                            }
                        }
                    })
                    
                } else if (postsRecieved[index].format == "Thread") {
                    //Thread
                    //Poll
                    handleRecievedThreadPost(postsRecieved[index], index, function(setUpThreadPost) {
                        if (setUpThreadPost.threadId) { //just to check if it exists and is proper
                            forConcat.push(setUpThreadPost)
                            postsProcessed++;
                            if (postsProcessed == postsRecieved.length) {
                                sortAndSet(forConcat)
                                setLoadingFeed(false)
                            }
                        } else {
                            postsProcessed++;
                            if (postsProcessed == postsRecieved.length) {
                                sortAndSet(forConcat)
                                setLoadingFeed(false)
                            }
                        }
                    })
                } else {
                    postsProcessed++;
                    if (postsProcessed == postsRecieved.length) {
                        sortAndSet(forConcat)
                        setLoadingFeed(false)
                    }
                }
            })
        } else {
            setAllPosts(allPosts => [...allPosts, 'No More Posts'])
            setLoadingFeed(false)
        }   
    }

    const loadMorePosts = () => {
        if (currentFeed == "Following") {
                if (allPosts.at(-1) != 'No More Posts') { //Stop loading more posts if there are no more posts to load
                //is reload so bottom two isnt needed
                const imagePosts = allPosts.filter(x => x.imageId).map(x => x.imageId)
                const pollPosts = allPosts.filter(x => x.pollId).map(x => x.pollId)
                const threadPosts = allPosts.filter(x => x.threadId).map(x => x.threadId)
                const imageAndPolls = imagePosts.concat(pollPosts)
                const allPostIds = imageAndPolls.concat(threadPosts) // concat doesnt change original array
                const allPostIdsStringed = allPostIds.toString() 
                console.log("allPostIdsStringed:")
                console.log(allPostIdsStringed)

                setLoadingFeed(true)
                const url = `${serverUrl}/feed/followerFeed/${_id}/${allPostIdsStringed}`
                axios.get(url).then((response) => {
                    const result = response.data;
                    const { message, status, data } = result;

                    if (status !== 'SUCCESS') {
                        setLoadingFeed(false)
                        handleMessage(message, status);
                        console.log(status)
                        console.log(message)
                    } else {
                        layOutAllPosts(data, false);
                        console.log(status)
                        console.log(message)
                    }

                }).catch(error => {
                    console.log(error);
                    setLoadingFeed(false)
                    handleMessage("An error occured. Try checking your network connection and retry.");
                })
            }
        } else if ("Normal") {
            console.log("Doesnt exist yet lol")
        }
    }

    function loadFeed(forceReload) {
        /*
        const clearAllUpVotesDownVotesNeitherVotes = () => {
            //image
            upVotedImages = []
            initialUpVotedImages = []
            setUpVotesImages(upVotedImages)
            setInitialUpVotesImages(initialUpVotedImages)
            downVotedImages = []
            initialDownVotedImages = []
            setDownVotesImages(downVotedImages)
            setInitialDownVotesImages(initialDownVotedImages)
            neitherVotedImages = []
            initialNeitherVotedImages = []
            setNeitherVotesImages(neitherVotedImages)
            setInitialNeitherVotesImages(initialNeitherVotedImages)
            findingVotedImagesArray = []
            setFindingVotedImages(findingVotedImagesArray)
            changingVotedImagesArray = []
            setChangingVotedImages(changingVotedImagesArray)
            //poll
            upVotedPolls = []
            initialUpVotedPolls = []
            setUpVotesPolls(upVotedPolls)
            setInitialUpVotesPolls(initialUpVotedPolls)
            downVotedPolls = []
            initialDownVotedPolls = []
            setDownVotesPolls(downVotedPolls)
            setInitialDownVotesPolls(initialDownVotedPolls)
            neitherVotedPolls = []
            initialNeitherVotedPolls = []
            setNeitherVotesPolls(neitherVotedPolls)
            setInitialNeitherVotesPolls(initialNeitherVotedPolls)
            findingVotedPollsArray = []
            setFindingVotedPolls(findingVotedPollsArray)
            changingVotedPollsArray = []
            setChangingVotedPolls(changingVotedPollsArray)
            //thread
            upVotedThreads = []
            initialUpVotedThreads = []
            setUpVotesThreads(upVotedThreads)
            setInitialUpVotesThreads(initialUpVotedThreads)
            downVotedThreads = []
            initialDownVotedThreads = []
            setDownVotesThreads(downVotedThreads)
            setInitialDownVotesThreads(initialDownVotedThreads)
            neitherVotedThreads = []
            initialNeitherVotedThreads = []
            setNeitherVotesThreads(neitherVotedThreads)
            setInitialNeitherVotesThreads(initialNeitherVotedThreads)
            findingVotedThreadsArray = []
            setFindingVotedThreads(findingVotedThreadsArray)
            changingVotedThreadsArray = []
            setChangingVotedThreads(changingVotedThreadsArray)
        }
        */
       console.log('ReloadFeed is: ' + reloadFeed)
       if (currentFeed == "Following") {
           if (reloadFeed == true || forceReload == true) {
               console.log('Loading feed')
               //is reload so bottom two isnt needed
               
                const allPostIdsStringed = ',';

               const url = `${serverUrl}/feed/followerFeed/${_id}/${allPostIdsStringed}`
               axios.get(url).then((response) => {
                   const result = response.data;
                   const { message, status, data } = result;

                   if (status !== 'SUCCESS') {
                       setLoadingFeed(false)
                       handleMessage(message, status);
                       console.log(status)
                       console.log(message)
                       setReloadFeed(false)
                   } else {
                       //clearAllUpVotesDownVotesNeitherVotes() //do as these posts are the first posts being recieved
                       console.log(data)
                       layOutAllPosts(data, forceReload);
                       console.log(status)
                       console.log(message)
                   }

               }).catch(error => {
                   console.log(error);
                   setLoadingFeed(false)
                   handleMessage("An error occured. Try checking your network connection and retry.");
                   setReloadFeed(false)
               })
           } else {
               handleMessage("An error occured because reloadFeed is false. Please try again.", 'FAILED')
               console.error(new Error('ReloadFeed is false'))
           }
       } else if ("Normal") {
           console.log("Doesnt exist yet lol")
       }
    }

    useEffect(() => {
        setReloadFeed(true)
        loadFeed(true) //Force a reload and get rid of currently showing posts
    }, [storedCredentials])

    //Get feed of following
    useState(() => {setReloadFeed(true)}, [])
    useState(() => { if (reloadFeed == true) {loadFeed(false)}}, [reloadFeed])

    const onViewRef = React.useRef((viewableItems)=> {
        //console.log(viewableItems)

        if (Array.isArray(viewableItems.changed)) {
            //
            const removeInCaseOfErrorOrNotSuccess = (idOfToRemove) => {
                console.log("Removing in case of error or not success")
                let duplicatedArray = viewedOnThisLoadsId.current.slice()
                const indexIfInArray = duplicatedArray.findIndex(x => x == idOfToRemove)
                if (indexIfInArray !== -1) {
                    duplicatedArray.splice(indexIfInArray, 1)
                    viewedOnThisLoadsId.current = duplicatedArray        
                }
            }
            //
            viewableItems.changed.forEach(function (item, index) {
                if (viewableItems.changed[index].item.format == "Image") {
                    //Image
                    var idOfPost = viewableItems.changed[index].item.imageId
                    console.log(idOfPost)
                    if (!viewedOnThisLoadsId.current.includes(idOfPost)) {
                        var arrayForPush = []
                        arrayForPush = arrayForPush.concat(viewedOnThisLoadsId.current)
                        arrayForPush.push(viewableItems.changed[index].item.imageId)
                        viewedOnThisLoadsId.current = arrayForPush
                        console.log(`viewedOnThisLoadsId: ${JSON.stringify(viewedOnThisLoadsId.current)}`)
                        const url = serverUrl + '/feed/viewedPostInFeed'
                        //
                        const dataForView = {
                            userId: _id,
                            postId: idOfPost,
                            postFormat: "Image"
                        }
                        //
                        axios.post(url, dataForView).then((response) => {
                            const result = response.data;
                            const { message, status } = result;
        
                            if (status !== 'SUCCESS') {
                                console.log(message)
                                handleMessage(message, status, index);
                                removeInCaseOfErrorOrNotSuccess(idOfPost)
                            } else {
                                console.log(`Viewed Image ${idOfPost}`)
                            }
                            
                        }).catch(error => {
                            console.log(error);
                            handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', index);
                            removeInCaseOfErrorOrNotSuccess(idOfPost)
                        })
                    }
                } else if (viewableItems.changed[index].item.format == "Poll") {
                    //Poll
                    var idOfPost = viewableItems.changed[index].item.pollId
                    console.log(idOfPost)
                    if (!viewedOnThisLoadsId.current.includes(idOfPost)) {
                        var arrayForPush = []
                        arrayForPush = arrayForPush.concat(viewedOnThisLoadsId.current)
                        arrayForPush.push(viewableItems.changed[index].item.pollId)
                        viewedOnThisLoadsId.current = arrayForPush
                        console.log(`viewedOnThisLoadsId: ${JSON.stringify(viewedOnThisLoadsId.current)}`)
                        const url = serverUrl + '/feed/viewedPostInFeed'
                        //
                        const dataForView = {
                            userId: _id,
                            postId: idOfPost,
                            postFormat: "Poll"
                        }
                        //
                        axios.post(url, dataForView).then((response) => {
                            const result = response.data;
                            const { message, status } = result;
        
                            if (status !== 'SUCCESS') {
                                console.log(message)
                                handleMessage(message, status, index);
                                removeInCaseOfErrorOrNotSuccess(idOfPost)
                            } else {
                                console.log(`Viewed Image ${idOfPost}`)
                            }
                            
                        }).catch(error => {
                            console.log(error);
                            handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', index);
                            removeInCaseOfErrorOrNotSuccess(idOfPost)
                        })
                    }
                } else if (viewableItems.changed[index].item.format == "Thread") {
                    //Thread
                    var idOfPost = viewableItems.changed[index].item.threadId
                    console.log(idOfPost)
                    if (!viewedOnThisLoadsId.current.includes(idOfPost)) {
                        var arrayForPush = []
                        arrayForPush = arrayForPush.concat(viewedOnThisLoadsId.current)
                        arrayForPush.push(viewableItems.changed[index].item.threadIds)
                        viewedOnThisLoadsId.current = arrayForPush
                        console.log(`viewedOnThisLoadsId: ${JSON.stringify(viewedOnThisLoadsId.current)}`)
                        const url = serverUrl + '/feed/viewedPostInFeed'
                        //
                        const dataForView = {
                            userId: _id,
                            postId: idOfPost,
                            postFormat: "Thread"
                        }
                        //
                        axios.post(url, dataForView).then((response) => {
                            const result = response.data;
                            const { message, status } = result;
        
                            if (status !== 'SUCCESS') {
                                console.log(message)
                                handleMessage(message, status, index);
                                removeInCaseOfErrorOrNotSuccess(idOfPost)
                            } else {
                                console.log(`Viewed Image ${idOfPost}`)
                            }
                            
                        }).catch(error => {
                            console.log(error);
                            handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', index);
                            removeInCaseOfErrorOrNotSuccess(idOfPost)
                        })
                    }
                } else {
                    console.log("Not a valid post format?")
                }
            })
        }
    })

    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

    // End of feed code

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
        formData.append("sentAllowScreenShots", postData.screenshotsAllowed)
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
            var toSend = {creatorId: _id, threadTitle: credentials.threadTitle, threadSubtitle: credentials.threadSubtitle, threadTags: credentials.threadTags, threadCategory: credentials.selectedCategory, threadBody: credentials.threadBody, threadNSFW: credentials.threadNSFW, threadNSFL: credentials.threadNSFL, sentAllowScreenShots: credentials.sentAllowScreenShots}
            console.log(toSend)
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
            formData.append("sentAllowScreenShots", credentials.sentAllowScreenShots)
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
            formData.append("sentAllowScreenShots", credentials.sentAllowScreenShots)
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
            const toSend = {creatorId: _id, categoryTitle: credentials.categoryTitle, categoryDescription: credentials.categoryDescription, categoryTags: credentials.categoryTags, categoryNSFW: credentials.categoryNSFW, categoryNSFL: credentials.categoryNSFL, sentAllowScreenShots: credentials.sentAllowScreenShots}
            console.log(toSend)
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
   
    const {colors, dark, indexNum, stylingType} = useTheme();
    
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
        if (storedCredentials && allCredentialsStoredList && allCredentialsStoredList.length > 0) {
            logoPressedTimes.current = 0;
            
            const url = serverUrl + '/user/earnSpecialBadge';
            const toSend = {userId: _id, badgeEarnt: "homeScreenLogoPressEasterEgg"};
            axios.post(url, toSend).then((response) => {
                const result = response.data;
                const {message, status} = result;

                if (status != "SUCCESS") {
                    if (message == "Badge already earnt.") {
                        setBadgeEarntNotification('Badge already earnt.')
                    } else {
                        alert(message);
                        console.error(message)
                    }
                } else {
                    setBadgeEarntNotification('HomeScreenLogoEasterEgg')
                    var currentStoredCredentials = storedCredentials;
                    currentStoredCredentials.badges = [...currentStoredCredentials.badges, 'homeScreenLogoPressEasterEgg']
                    setStoredCredentials(currentStoredCredentials)
                    var currentAllStoredCredentialsList = allCredentialsStoredList;
                    for (var i = 0; i < currentAllStoredCredentialsList.length; i++) {
                        if (currentAllStoredCredentialsList[i]._id == currentStoredCredentials._id) {
                            currentAllStoredCredentialsList[i] = currentStoredCredentials
                        }
                    }
                    setAllCredentialsStoredList(currentAllStoredCredentialsList);
                }
            }).catch((error) => {
                console.log(error);
                alert('An error occured. Try checking your internet connection and then try again.')
            });
        } else {
            logoPressedTimes.current = 0;
        }
    }
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
                <TouchableOpacity disabled={!FlatListElementsEnabledState} onPress={() => {navigation.navigate('ChatScreenStack')}}>
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
                <TouchableWithoutFeedback onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setCurrentFeed('For You')
                }}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: currentFeed == 'For You' ? colors.brand : colors.tertiary, marginRight: 3}}>For You</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setCurrentFeed('Following')
                }}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: currentFeed == 'Following' ? colors.brand : colors.tertiary, marginRight: 3}}>Following</Text>
                </TouchableWithoutFeedback>
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
            {currentFeed == 'Following' ?
                <View style={{flex: 1}}>
                    <FlatList 
                        style={{flex: 1, paddingTop: 0, backgroundColor: colors.primary}}
                        onViewableItemsChanged={onViewRef.current}
                        viewabilityConfig={viewConfigRef.current}
                        data={allPosts}
                        ListHeaderComponent={<View style={{height: 50}}/>}
                        refreshControl={
                            <RefreshControl
                                refreshing={reloadFeed}
                                onRefresh={() => {
                                    setReloadFeed(true)
                                    loadFeed(true) //Force the reload because since state is asynchronous reloadFeed will be false when the function loads
                                }}
                            />
                        }
                        onEndReachedThreshold={0.7}
                        onEndReached = {({distanceFromEnd})=>{
                            if (distanceFromEnd > 0) {
                                console.log('End of the feed was reached with ' + distanceFromEnd + ' pixels from the end.')
                                if (loadingFeed == false) {
                                    loadMorePosts()
                                }
                            }
                        }}
                        renderItem={({item, index}) => {
                            if (item == 'No More Posts') {
                                return (
                                    <View style={{borderColor: colors.tertiary, borderTopWidth: 3, borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, paddingVertical: 15, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{color: colors.tertiary, fontWeight: 'bold', fontSize: 20}}>No More Posts</Text>
                                    </View>
                                )
                            } else {
                                return(
                                    <View>
                                        {item.hasSeenPosts == true && (
                                            <View>
                                                {index-1 == -1 && (
                                                    <View>
                                                        <SubTitle style={{marginBottom: 0, color: colors.brand, textAlign: 'center'}}>All possible unviewed posts seen</SubTitle>
                                                        <SubTitle style={{fontSize: 8, color: colors.tertiary, textAlign: 'center', marginBottom: 5}}>Now on you may have seen these posts more than twice or interacted with them</SubTitle>
                                                    </View>
                                                )}
                                                {index-1 !== -1 && (
                                                    <View>
                                                        {allPosts.slice(0, index).findIndex(x => x.hasSeenPosts == true) == -1 && (
                                                            <View>
                                                                <SubTitle style={{marginBottom: 0, color: colors.brand, textAlign: 'center'}}>All possible unviewed posts seen</SubTitle>
                                                                <SubTitle style={{fontSize: 8, color: colors.tertiary, textAlign: 'center', marginBottom: 5}}>Now on you may have seen these posts more than twice or interacted with them</SubTitle>
                                                            </View>
                                                        )}
                                                    </View>
                                                )}
                                            </View>
                                        )}
                                        
                                        {item.hasSeenPosts == false && (
                                            <View>
                                                {index-1 !== -1 && (
                                                    <View>
                                                        {allPosts.slice(0, index).findIndex(x => x.hasSeenPosts == true) !== -1 && ( //has seen one above somewhere
                                                            <View>
                                                                <SubTitle style={{marginBottom: 0, color: colors.brand, textAlign: 'center'}}>New Post</SubTitle>
                                                                <SubTitle style={{fontSize: 8, color: colors.tertiary, textAlign: 'center', marginBottom: 5}}>You may have not seen the following post</SubTitle>
                                                            </View>
                                                        )}
                                                    </View>
                                                )}
                                            </View>
                                        )}

                                        {index % 5 == 0 && index !== 0 && (
                                            <View style={{alignItems: 'center'}}>
                                                <AdMobBanner
                                                    bannerSize="mediumRectangle"
                                                    adUnitID={AdID} // SocialSquare Google AdMob Ad ID
                                                    servePersonalizedAds={false}
                                                    onDidFailToReceiveAdWithError={(error) => {console.warn(error)}} 
                                                />
                                            </View>
                                        )}

                                        {item.format == "Image" && (
                                            <MemoizedPost colors={colors} navigation={navigation} format={item.format} imageId={item.imageId} imageKey={item.imageKey} imageB64={item.imageB64} imageTitle={item.imageTitle} imageDescription={item.imageDescription} imageUpVotes={item.imageUpVotes} imageComments={item.imageComments} creatorName={item.creatorName} creatorDisplayName={item.creatorDisplayName} creatorPfpB64={item.creatorPfpB64} datePosted={item.datePosted} postNum={item.postNum} usersUdnVote={item.usersUdnVote} postNotFromFeed={false}/>
                                        )}
                                        {item.format == "Poll" && (
                                            <MemoizedPost colors={colors} navigation={navigation} format={item.format} pollTitle={item.pollTitle} pollSubTitle={item.pollSubTitle} optionOne={item.optionOne} optionOnesColor={item.optionOnesColor} optionOnesVotes={item.optionOnesVotes} optionOnesBarLength={item.optionOnesBarLength} optionTwo={item.optionTwo} optionTwosColor={item.optionTwosColor} optionTwosVotes={item.optionTwosVotes} optionTwosBarLength={item.optionTwosBarLength} optionThree={item.optionThree} optionThreesColor={item.optionThreesColor} optionThreesVotes={item.optionThreesVotes} optionThreesBarLength={item.optionThreesBarLength} optionFour={item.optionFour} optionFoursColor={item.optionFoursColor} optionFoursVotes={item.optionFoursVotes} optionFoursBarLength={item.optionFoursBarLength} optionFive={item.optionFive} optionFivesColor={item.optionFivesColor} optionFivesVotes={item.optionFivesVotes} optionFivesBarLength={item.optionFivesBarLength} optionSix={item.optionSix} optionSixesColor={item.optionSixesColor} optionSixesVotes={item.optionSixesVotes} optionSixesBarLength={item.optionSixesBarLength} totalNumberOfOptions={item.totalNumberOfOptions} pollUpOrDownVotes={item.pollUpOrDownVotes} pollId={item.pollId} votedFor={item.votedFor} pfpB64={item.pfpB64} creatorName={item.creatorName} creatorDisplayName={item.creatorDisplayName} postNum={item.postNum} datePosted={item.datePosted} pollComments={item.pollComments} usersUdnVote={item.usersUdnVote}/>
                                        )}
                                        {item.format == "Thread" && (
                                            <MemoizedPost colors={colors} navigation={navigation} format={item.format} postNum={item.postNum} threadId={item.threadId} threadComments={item.threadComments} threadType={item.threadType} threadUpVotes={item.threadUpVotes} threadTitle={item.threadTitle} threadSubtitle={item.threadSubtitle} threadTags={item.threadTags} threadCategory={item.threadCategory} threadBody={item.threadBody} threadImageKey={item.threadImageKey} threadImageDescription={item.threadImageDescription} threadNSFW={item.threadNSFW} threadNSFL={item.threadNSFL} datePosted={item.datePosted} threadUpVoted={item.threadUpVoted} threadDownVoted={item.threadDownVoted} creatorDisplayName={item.creatorDisplayName} creatorName={item.creatorName} creatorImageB64={item.creatorImageB64} imageInThreadB64={item.imageInThreadB64} usersUdnVote={item.usersUdnVote}/>
                                        )}

                                        {/*Check if its last index*/}
                                        {index == allPosts.length-1 && (
                                            <View>
                                                {loadingFeed == true && (
                                                    <ActivityIndicator size="large" color={colors.brand} />  
                                                )}
                                                {loadingFeed == false && (
                                                    <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => loadMorePosts()}>
                                                        <SubTitle style={{textAlign: 'center', alignSelf: 'center', textAlign: 'center', color: colors.tertiary}}>Load More</SubTitle>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                        )}
                                    </View>
                                )
                            }
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    {postNumForMsg == null && (<MsgBox type={messageType}>{message}</MsgBox>)}
                </View>
            :
                <>
                    {uploading == true &&
                        <TouchableOpacity onPress={() => {errorOccuredWhileUploading ? postType == 'multimedia' ? postMultiMedia(postData) : postType == 'poll' ? handleCreatePollPost(postData) : postType == 'thread_text' ? handlePostThread(postData, 'text') : postType == 'thread_image' ? handlePostThread(postData, 'image') : alert('Error occured') : null}} style={{alignItems: 'center', flexDirection: 'row', alignSelf: 'center'}}>
                            <ActivityIndicator size="small" color={colors.brand}/>
                            <Text style={{color: colors.tertiary, fontSize: 20, marginLeft: 10, textAlign: 'center', marginBottom: 5}}>{uploadingText}</Text>
                        </TouchableOpacity>
                    }
                    <FlatList
                        data={[{key: '1'}]}
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
                                                <Avatar resizeMode="cover" searchPage={true} source={{uri: SocialSquareLogo_B64_png}} />
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
                </>
            }
        
        </View>
    );
};

export default HomeScreen;