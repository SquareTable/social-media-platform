import React, {useCallback, useContext, useState, useRef, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesomeFive from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ActionSheet from 'react-native-actionsheet';
import * as MediaLibrary from 'expo-media-library';

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
    ProfileBadgeItemUnderline
} from '../screens/screenStylings/styling.js';


// Colors
const {brand, primary, tertiary, greyish, darkLight, darkestBlue, slightlyLighterPrimary, slightlyLighterGrey, descTextColor, darkest, red, orange, yellow, green, purple} = Colors;

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//axios
import axios from 'axios';

//Image picker
import * as ImagePicker from 'expo-image-picker';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { ImageBackground, ScrollView, SectionList, Image, View, ActivityIndicator, Touchable, RefreshControl, SafeAreaView, Text, Animated, useWindowDimensions, Platform, PermissionsAndroid, TouchableOpacity } from 'react-native';

import {useTheme, useIsFocused} from "@react-navigation/native"

import Constants from "expo-constants";
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png.js';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext.js';
import { ShowAccountSwitcherContext } from '../components/ShowAccountSwitcherContext.js';
import { AllCredentialsStoredContext } from '../components/AllCredentialsStoredContext.js';
import { ServerUrlContext } from '../components/ServerUrlContext.js';

const Welcome = ({navigation, route}) => {
    const StatusBarHeight = Constants.statusBarHeight;
    if (route.params) {
        var {backButtonHidden, imageFromRoute, goToStylingMenu} = route.params;
        console.log(backButtonHidden)
        if (goToStylingMenu == true) {
            navigation.replace('SimpleStylingMenu', {ableToRefresh: false, indexNumToUse: null, backToProfileScreen: true})
        }
    } else {
        var backButtonHidden = true;
        var imageFromRoute = null;
        var goToStylingMenu = false;
    }
    const [PageElementsState, setPageElementsState] = useState(false);
    const { colors, dark } = useTheme();
    const goToSettingsScreen = () => {
        navigation.navigate("SettingsScreen");
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext);
    if (storedCredentials) {var {_id, name, displayName, email, photoUrl, followers, following, badges} = storedCredentials}
    const [gridViewState, setGridViewState] = useState("flex")
    const [featuredViewState, setFeaturedViewState] = useState("none")
    const [selectedPostFormat, setSelectedPostFormat] = useState("One")
    const [selectedPostFormatName, setSelectedPostFormatName] = useState("This user has no Image posts.")
    const [formatOneText, setFormatOneText] = useState("This user has no Image posts.")
    const [formatTwoText, setFormatTwoText] = useState("This user has no Video posts.")
    const [formatThreeText, setFormatThreeText] = useState("This user has no Poll posts.")
    const [formatFourText, setFormatFourText] = useState("This user has no Thread posts.")
    const [formatFiveText, setFormatFiveText] = useState("This user associates with no categories.")
    const [useStatePollData, setUseStatePollData] = useState()
    const [changeSectionsOne, setChangeSectionsOne] = useState()
    const [changeSectionsTwo, setChangeSectionsTwo] = useState()
    const [changeSectionsThree, setChangeSectionsThree] = useState()
    const [changeSectionsFour, setChangeSectionsFour] = useState()
    const [changeSectionsFive, setChangeSectionsFive] = useState()
    const [changePollIfLiked, setChangePollIfLiked] = useState(tertiary)
    const [resetFoundPolls, setResetFoundPolls] = useState(false)
    const [loadingPostsImage, setLoadingPostsImage] = useState(false)
    const [loadingPostsVideo, setLoadingPostsVideo] = useState(false)
    const [loadingPostsPoll, setLoadingPostsPoll] = useState(false)
    const [loadingPostsThread, setLoadingPostsThread] = useState(false)
    const [loadingPostsCategory, setLoadingPostsCategory] = useState(false)
    const [loadingPosts, setLoadingPosts] = useState(false)
    //ImageStuff
    const [getPfp, setGetPfp] = useState(false)
    const [getImagesOnLoad, setGetImagesOnLoad] = useState(false)
    const [changingPfp, setChangingPfp] = useState(false)
    const [loadingPfp, setLoadingPfp] = useState(false)
    var allImages = []
    var initialAllImages = []
    //Up and Down Vote Image Stuff
    var upVotedImages = []
    var initialUpVotedImages = []
    const [initialUpVotesImages, setInitialUpVotesImages] = useState([])
    const [upVotesImages, setUpVotesImages] = useState([])
    //
    var downVotedImages = []
    var initialDownVotedImages = []
    const [initialDownVotesImages, setInitialDownVotesImages] = useState([])
    const [downVotesImages, setDownVotesImages] = useState([])
    //
    var neitherVotedImages = []
    var initialNeitherVotedImages = []
    const [initialNeitherVotesImages, setInitialNeitherVotesImages] = useState([])
    const [neitherVotesImages, setNeitherVotesImages] = useState([])
    //
    var changingVotedImagesArray = []
    const [changingVotedImages, setChangingVotedImages] = useState([])
    //
    var findingVotedImagesArray = []
    const [findingVotedImages, setFindingVotedImages] = useState([])
    //
    //Up and Down Vote Poll Stuff
    var upVotedPolls = []
    var initialUpVotedPolls = []
    const [initialUpVotesPolls, setInitialUpVotesPolls] = useState([])
    const [upVotesPolls, setUpVotesPolls] = useState([])
    //
    var downVotedPolls = []
    var initialDownVotedPolls = []
    const [initialDownVotesPolls, setInitialDownVotesPolls] = useState([])
    const [downVotesPolls, setDownVotesPolls] = useState([])
    //
    var neitherVotedPolls = []
    var initialNeitherVotedPolls = []
    const [initialNeitherVotesPolls, setInitialNeitherVotesPolls] = useState([])
    const [neitherVotesPolls, setNeitherVotesPolls] = useState([])
    //
    var changingVotedPollsArray = []
    const [changingVotedPolls, setChangingVotedPolls] = useState([])
    //
    var findingVotedPollsArray = []
    const [findingVotedPolls, setFindingVotedPolls] = useState([])
    //
    //Up and Down Vote Thread Stuff
    var upVotedThreads = []
    var initialUpVotedThreads = []
    const [initialUpVotesThreads, setInitialUpVotesThreads] = useState([])
    const [upVotesThreads, setUpVotesThreads] = useState([])
    //
    var downVotedThreads = []
    var initialDownVotedThreads = []
    const [initialDownVotesThreads, setInitialDownVotesThreads] = useState([])
    const [downVotesThreads, setDownVotesThreads] = useState([])
    //
    var neitherVotedThreads = []
    var initialNeitherVotedThreads = []
    const [initialNeitherVotesThreads, setInitialNeitherVotesThreads] = useState([])
    const [neitherVotesThreads, setNeitherVotesThreads] = useState([])
    //
    var changingVotedThreadsArray = []
    const [changingVotedThreads, setChangingVotedThreads] = useState([])
    //
    var findingVotedThreadsArray = []
    const [findingVotedThreads, setFindingVotedThreads] = useState([])
    //
    var allPolls = []
    var initialAllPolls = []
    //up or down votes
    const [initialUpOrDownVotes, setInitialUpOrDownVotes] = useState([])
    const [upOrDownVotes, setUpOrDownVotes] = useState([])
    //ServerStuff
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [postNumForMsg, setPostNumForMsg] = useState();
    const userLoadMax = 100;
    //tokens
    let cancelTokenPostFormatOne = axios.CancelToken.source();
    let cancelTokenPostFormatTwo = axios.CancelToken.source();
    let cancelTokenPostFormatThree = axios.CancelToken.source();
    let cancelTokenPostFormatFour = axios.CancelToken.source();
    let cancelTokenPostFormatFive = axios.CancelToken.source();
    //delete post stuff
    const [postsWithDeleteMenuOpen, setPostsWithDeleteMenuOpen] = useState()
    // Grid or Tagged grids showing
    const GridOrTagLineTranslateX = useRef(new Animated.Value(0)).current;
    const deviceDimensions = useWindowDimensions();
    // Account switcher
    const {showAccountSwitcher, setShowAccountSwitcher} = useContext(ShowAccountSwitcherContext)
    const {allCredentialsStoredList, setAllCredentialsStoredList} = useContext(AllCredentialsStoredContext);
    // Top profile bar
    const TopProfileBarFadeAnim = useRef(new Animated.Value(0)).current;
    // ActionSheet menus
    let PfpSaveActionMenu = useRef();
    const PfpSaveActionMenuOptions = [
        'Save to Camera Roll',
        'Cancel'
    ];
    let PfpPickerActionMenu = useRef();
    const PfpPickerActionMenuOptions = [
        'Take Photo',
        'Choose from Photo Library',
        'Cancel'
    ];
    // Server URL
    const {serverUrl, setServerUrl} = useContext(ServerUrlContext)


    const openDeletePrompt = (postId, creatorName) => {
        if (name == creatorName) {
            setPostsWithDeleteMenuOpen(postId)
        }
    }

    const confirmDeletePrompt = (postId, postNum) => {
        if (selectedPostFormat == "One") {
            const url = serverUrl + '/user/deleteimage';
            var toSend = {userId: _id, imageKey: postId}
            console.log(toSend)
            axios.post(url, toSend).then((response) => { 
                const result = response.data;
                const {message, status, data} = result;
                if (status !== 'SUCCESS') {
                    handleMessage(message, status, postNum);
                    setPostsWithDeleteMenuOpen()
                } else {
                    setPostsWithDeleteMenuOpen()
                    changeToOne()
                }
            }).catch(error => {
                console.log(error)
                setPostsWithDeleteMenuOpen()
                handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', postNum);
            })
        } else if (selectedPostFormat == "Two") {

        } else if (selectedPostFormat == "Three") {
            const url = serverUrl + '/user/deletepoll';
            var toSend = {userId: _id, pollId: postId}
            console.log(toSend)
            axios.post(url, toSend).then((response) => { 
                const result = response.data;
                const {message, status, data} = result;
                if (status !== 'SUCCESS') {
                    handleMessage(message, status, postNum);
                    setPostsWithDeleteMenuOpen()
                } else {
                    setPostsWithDeleteMenuOpen()
                    changeToThree()
                }
            }).catch(error => {
                console.log(error)
                setPostsWithDeleteMenuOpen()
                handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', postNum);
            })
        } else if (selectedPostFormat == "Four") {
            const url = serverUrl + '/user/deletethread';
            var toSend = {userId: _id, threadId: postId}
            console.log(toSend)
            axios.post(url, toSend).then((response) => { 
                const result = response.data;
                const {message, status, data} = result;
                if (status !== 'SUCCESS') {
                    handleMessage(message, status, postNum);
                    setPostsWithDeleteMenuOpen()
                } else {
                    setPostsWithDeleteMenuOpen()
                    changeToFour()
                }
            }).catch(error => {
                console.log(error)
                setPostsWithDeleteMenuOpen()
                handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', postNum);
            })
        } else if (selectedPostFormat == "Five") {
            setPostsWithDeleteMenuOpen(postId)
        }
    }


    const handleMessage = (message, type = 'FAILED', postNum) => {
        setMessage(message);
        setMessageType(type);
        if (postNum !== null) {
            setPostNumForMsg(postNum)
        } else {
            setPostNumForMsg(null)
        }
    }

    const UpVoteImage = (imageId, postNum) => {
        //Change to loading circle
        if (findingVotedImages.includes(imageId)) { 

        } else {
            if (changingVotedImages.includes(imageId)) {

            } else {
                upVotedImages = upVotesImages
                downVotedImages = downVotesImages
                neitherVotedImages = neitherVotesImages
                var beforeChange = "Neither"
                if (upVotedImages.includes(imageId)) {
                    beforeChange = "UpVoted"
                    var index = upVotedImages.indexOf(imageId);
                    if (index > -1) {
                        upVotedImages.splice(index, 1);
                    }
                    setUpVotesImages(upVotedImages)
                }
                if (downVotedImages.includes(imageId)) {
                    beforeChange = "DownVoted"
                    var index = downVotedImages.indexOf(imageId);
                    if (index > -1) {
                        downVotedImages.splice(index, 1);
                    }
                    setDownVotesImages(downVotedImages)
                }
                if (neitherVotedImages.includes(imageId)) {
                    beforeChange = "Neither"
                    var index = neitherVotedImages.indexOf(imageId);
                    if (index > -1) {
                        neitherVotedImages.splice(index, 1);
                    }
                    setNeitherVotesImages(neitherVotedImages)
                }
                changingVotedImagesArray = changingVotedImages
                changingVotedImagesArray.push(imageId)
                setChangingVotedImages(changingVotedImagesArray)
                //Do rest
                handleMessage(null, null, null);
                const url = serverUrl + '/user/upvoteimage';

                var toSend = {userId: _id, imageId: imageId}

                console.log(toSend)

                axios.post(url, toSend).then((response) => {
                    const result = response.data;
                    const {message, status, data} = result;
                
                    if (status !== 'SUCCESS') {
                        handleMessage(message, status, postNum);
                        changingVotedImagesArray = changingVotedImages
                        var index = changingVotedImagesArray.indexOf(imageId);
                        if (index > -1) {
                            changingVotedImagesArray.splice(index, 1);
                        }
                        if (beforeChange == "UpVoted") {
                            upVotedImages = upVotesImages
                            upVotedImages.push(imageId)
                            setUpVotesImages(upVotedImages)
                            setChangingVotedImages([])
                            setChangingVotedImages(changingVotedImagesArray)
                        } 
                        if (beforeChange == "DownVoted") {
                            downVotedImages = downVotesImages
                            downVotedImages.push(imageId)
                            setDownVotesImages(downVotedImages)
                            setChangingVotedImages([])
                            setChangingVotedImages(changingVotedImagesArray)
                        }
                        if (beforeChange == "Neither") {
                            neitherVotedImages = neitherVotesImages
                            neitherVotedImages.push(imageId)
                            setNeitherVotesImages(neitherVotedImages)
                            setChangingVotedImages([])
                            setChangingVotedImages(changingVotedImagesArray)
                        }
                    } else {
                        handleMessage(message, status);
                        var tempChangingVotedImagesArray = changingVotedImages
                        var index = tempChangingVotedImagesArray.indexOf(imageId);
                        if (index > -1) {
                            tempChangingVotedImagesArray.splice(index, 1);
                            console.log("Spliced tempChangingVotedImagesArray")
                        } else {
                            console.log("Didnt find in changing array")
                        }
                        if (message == "Post UpVoted") {
                            upVotedImages = upVotesImages
                            upVotedImages.push(imageId)
                            setUpVotesImages([])
                            setUpVotesImages(upVotedImages)
                            setChangingVotedImages([])
                            setChangingVotedImages(tempChangingVotedImagesArray)
                        } else {
                            //Neither
                            neitherVotedImages = neitherVotesImages
                            neitherVotedImages.push(imageId)
                            setNeitherVotesImages([])
                            setNeitherVotesImages(neitherVotedImages)
                            setChangingVotedImages([])
                            setChangingVotedImages(tempChangingVotedImagesArray)
                        }
                        //loadAndGetValues()
                        //persistLogin({...data[0]}, message, status);
                    }
                }).catch(error => {
                    console.log(error);
                    changingVotedImagesArray = changingVotedImages
                    var index = changingVotedImagesArray.indexOf(imageId);
                    if (index > -1) {
                        changingVotedImagesArray.splice(index, 1);
                    }
                    setChangingVotedImages(changingVotedImagesArray)
                    if (beforeChange == "UpVoted") {
                        upVotedImages = upVotesImages
                        upVotedImages.push(imageId)
                        setUpVotesImages(upVotedImages)
                    } 
                    if (beforeChange == "DownVoted") {
                        downVotedImages = downVotesImages
                        downVotedImages.push(imageId)
                        setDownVotesImages(downVotedImages)
                    }
                    if (beforeChange == "Neither") {
                        neitherVotedImages = neitherVotesImages
                        neitherVotedImages.push(imageId)
                        setNeitherVotesImages(neitherVotedImages)
                    }
                    handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', postNum);
                })
            }
        }
    }

    const DownVoteImage = (imageId, postNum) => {
        //Change to loading circle
        if (findingVotedImages.includes(imageId)) { 

        } else {
            if (changingVotedImages.includes(imageId)) {

            } else {
                upVotedImages = upVotesImages
                downVotedImages = downVotesImages
                neitherVotedImages = neitherVotesImages
                var beforeChange = "Neither"
                if (upVotedImages.includes(imageId)) {
                    beforeChange = "UpVoted"
                    var index = upVotedImages.indexOf(imageId);
                    if (index > -1) {
                        upVotedImages.splice(index, 1);
                    }
                    setUpVotesImages(upVotedImages)
                }
                if (downVotedImages.includes(imageId)) {
                    beforeChange = "DownVoted"
                    var index = downVotedImages.indexOf(imageId);
                    if (index > -1) {
                        downVotedImages.splice(index, 1);
                    }
                    setDownVotesImages(downVotedImages)
                }
                if (neitherVotedImages.includes(imageId)) {
                    beforeChange = "Neither"
                    var index = neitherVotedImages.indexOf(imageId);
                    if (index > -1) {
                        neitherVotedImages.splice(index, 1);
                    }
                    setNeitherVotesImages(neitherVotedImages)
                }
                changingVotedImagesArray = changingVotedImages
                changingVotedImagesArray.push(imageId)
                setChangingVotedImages(changingVotedImagesArray)
                //Do rest
                handleMessage(null, null, null);
                const url = serverUrl + '/user/downvoteimage';

                var toSend = {userId: _id, imageId: imageId}

                console.log(toSend)

                axios.post(url, toSend).then((response) => {
                    const result = response.data;
                    const {message, status, data} = result;
                
                    if (status !== 'SUCCESS') {
                        handleMessage(message, status, postNum);
                        changingVotedImagesArray = changingVotedImages
                        var index = changingVotedImagesArray.indexOf(imageId);
                        if (index > -1) {
                            changingVotedImagesArray.splice(index, 1);
                        }
                        if (beforeChange == "UpVoted") {
                            upVotedImages = upVotesImages
                            upVotedImages.push(imageId)
                            setUpVotesImages(upVotedImages)
                            setChangingVotedPolls([])
                            setChangingVotedImages(changingVotedImagesArray)
                        } 
                        if (beforeChange == "DownVoted") {
                            downVotedImages = downVotesImages
                            downVotedImages.push(imageId)
                            setDownVotesImages(downVotedImages)
                            setChangingVotedPolls([])
                            setChangingVotedImages(changingVotedImagesArray)
                        }
                        if (beforeChange == "Neither") {
                            neitherVotedImages = neitherVotesImages
                            neitherVotedImages.push(imageId)
                            setNeitherVotesImages(neitherVotedImages)
                            setChangingVotedPolls([])
                            setChangingVotedImages(changingVotedImagesArray)
                        }
                    } else {
                        handleMessage(message, status);
                        var tempChangingVotedImagesArray = changingVotedImages
                        var index = tempChangingVotedImagesArray.indexOf(imageId);
                        if (index > -1) {
                            tempChangingVotedImagesArray.splice(index, 1);
                            console.log("Spliced tempChangingVotedImagesArray")
                        } else {
                            console.log("Didnt find in changing array")
                        }
                        if (message == "Post DownVoted") {
                            downVotedImages = downVotesImages
                            downVotedImages.push(imageId)
                            setDownVotesImages([])
                            setDownVotesImages(downVotedImages)
                            setChangingVotedImages([])
                            setChangingVotedImages(tempChangingVotedImagesArray)
                        } else {
                            //Neither
                            neitherVotedImages = neitherVotesImages
                            neitherVotedImages.push(imageId)
                            setNeitherVotesImages([])
                            setNeitherVotesImages(neitherVotedImages)
                            setChangingVotedImages([])
                            setChangingVotedImages(tempChangingVotedImagesArray)
                        }
                        //loadAndGetValues()
                        //persistLogin({...data[0]}, message, status);
                    }
                }).catch(error => {
                    console.log(error);
                    changingVotedImagesArray = changingVotedImages
                    var index = changingVotedImagesArray.indexOf(imageId);
                    if (index > -1) {
                        changingVotedImagesArray.splice(index, 1);
                    }
                    setChangingVotedImages(changingVotedImagesArray)
                    if (beforeChange == "UpVoted") {
                        upVotedImages = upVotesImages
                        upVotedImages.push(imageId)
                        setUpVotesImages(upVotedImages)
                    } 
                    if (beforeChange == "DownVoted") {
                        downVotedImages = downVotesImages
                        downVotedImages.push(imageId)
                        setDownVotesImages(downVotedImages)
                    }
                    if (beforeChange == "Neither") {
                        neitherVotedImages = neitherVotesImages
                        neitherVotedImages.push(imageId)
                        setNeitherVotesImages(neitherVotedImages)
                    }
                    handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', postNum);
                })
            }
        }
    }

    const UpVotePoll = (pollId, postNum) => {
        //Change to loading circle
        if (findingVotedPolls.includes(pollId)) { 

        } else {
            if (changingVotedPolls.includes(pollId)) {

            } else {
                console.log("UpVoting")
                upVotedPolls = upVotesPolls
                downVotedPolls = downVotesPolls
                neitherVotedPolls = neitherVotesPolls
                var beforeChange = "Neither"
                if (upVotedPolls.includes(pollId)) {
                    beforeChange = "UpVoted"
                    var index = upVotedPolls.indexOf(pollId);
                    if (index > -1) {
                        upVotedPolls.splice(index, 1);
                    }
                    setUpVotesPolls(upVotedPolls)
                }
                if (downVotedPolls.includes(pollId)) {
                    beforeChange = "DownVoted"
                    var index = downVotedPolls.indexOf(pollId);
                    if (index > -1) {
                        downVotedPolls.splice(index, 1);
                    }
                    setDownVotesPolls(downVotedPolls)
                }
                if (neitherVotedPolls.includes(pollId)) {
                    beforeChange = "Neither"
                    var index = neitherVotedPolls.indexOf(pollId);
                    if (index > -1) {
                        neitherVotedPolls.splice(index, 1);
                    }
                    setNeitherVotesPolls(neitherVotedPolls)
                }
                changingVotedPollsArray = changingVotedPolls
                changingVotedPollsArray.push(pollId)
                setChangingVotedPolls(changingVotedPollsArray)
                //Do rest
                handleMessage(null, null, null);
                const url = serverUrl + '/user/upvotepoll';

                var toSend = {userId: _id, pollId: pollId}

                console.log(toSend)

                axios.post(url, toSend).then((response) => {
                    const result = response.data;
                    const {message, status, data} = result;
                
                    if (status !== 'SUCCESS') {
                        handleMessage(message, status, postNum);
                        changingVotedPollsArray = changingVotedPolls
                        var index = changingVotedPollsArray.indexOf(pollId);
                        if (index > -1) {
                            changingVotedPollsArray.splice(index, 1);
                        }
                        if (beforeChange == "UpVoted") {
                            upVotedPolls = upVotesPolls
                            upVotedPolls.push(pollId)
                            setUpVotesPolls(upVotedPolls)
                            setChangingVotedPolls([])
                            setChangingVotedPolls(changingVotedPollsArray)
                        } 
                        if (beforeChange == "DownVoted") {
                            downVotedPolls = downVotesPolls
                            downVotedPolls.push(pollId)
                            setDownVotesPolls(downVotedPolls)
                            setChangingVotedPolls([])
                            setChangingVotedPolls(changingVotedPollsArray)
                        }
                        if (beforeChange == "Neither") {
                            neitherVotedPolls = neitherVotesPolls
                            neitherVotedPolls.push(pollId)
                            setNeitherVotesPolls(neitherVotedPolls)
                            setChangingVotedPolls([])
                            setChangingVotedPolls(changingVotedPollsArray)
                        }
                    } else {
                        handleMessage(message, status);
                        var tempChangingVotedPollsArray = changingVotedPolls
                        var index = tempChangingVotedPollsArray.indexOf(pollId);
                        if (index > -1) {
                            tempChangingVotedPollsArray.splice(index, 1);
                            console.log("Spliced tempChangingVotedPollsArray")
                        } else {
                            console.log("Didnt find in changing array")
                        }
                        if (message == "Post UpVoted") {
                            upVotedPolls = upVotesPolls
                            upVotedPolls.push(pollId)
                            setUpVotesPolls([])
                            setUpVotesPolls(upVotedPolls)
                            setChangingVotedPolls([])
                            setChangingVotedPolls(tempChangingVotedPollsArray)
                        } else {
                            //Neither
                            neitherVotedPolls = neitherVotesPolls
                            neitherVotedPolls.push(pollId)
                            setNeitherVotesPolls([])
                            setNeitherVotesPolls(neitherVotedPolls)
                            setChangingVotedPolls([])
                            setChangingVotedPolls(tempChangingVotedPollsArray)
                        }
                        //loadAndGetValues()
                        //persistLogin({...data[0]}, message, status);
                    }
                }).catch(error => {
                    console.log(error);
                    changingVotedPollsArray = changingVotedPolls
                    var index = changingVotedPollsArray.indexOf(pollId);
                    if (index > -1) {
                        changingVotedPollsArray.splice(index, 1);
                    }
                    setChangingVotedImages(changingVotedPollsArray)
                    if (beforeChange == "UpVoted") {
                        upVotedPolls = upVotesPolls
                        upVotedPolls.push(pollId)
                        setUpVotesPolls(upVotedPolls)
                    } 
                    if (beforeChange == "DownVoted") {
                        downVotedPolls = downVotesPolls
                        downVotedPolls.push(pollId)
                        setDownVotesPolls(downVotedPolls)
                    }
                    if (beforeChange == "Neither") {
                        neitherVotedPolls = neitherVotesPolls
                        neitherVotedPolls.push(pollId)
                        setNeitherVotesPolls(neitherVotedPolls)
                    }
                    handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', postNum);
                })
            }
        }
    }

    const DownVotePoll = (pollId, postNum) => {
        //Change to loading circle
        if (findingVotedPolls.includes(pollId)) { 

        } else {
            if (changingVotedPolls.includes(pollId)) {

            } else {
                console.log("DownVoting")
                upVotedPolls = upVotesPolls
                downVotedPolls = downVotesPolls
                neitherVotedPolls = neitherVotesPolls
                var beforeChange = "Neither"
                if (upVotedPolls.includes(pollId)) {
                    beforeChange = "UpVoted"
                    var index = upVotedPolls.indexOf(pollId);
                    if (index > -1) {
                        upVotedPolls.splice(index, 1);
                    }
                    setUpVotesPolls(upVotedPolls)
                }
                if (downVotedPolls.includes(pollId)) {
                    beforeChange = "DownVoted"
                    var index = downVotedPolls.indexOf(pollId);
                    if (index > -1) {
                        downVotedPolls.splice(index, 1);
                    }
                    setDownVotesPolls(downVotedPolls)
                }
                if (neitherVotedPolls.includes(pollId)) {
                    beforeChange = "Neither"
                    var index = neitherVotedPolls.indexOf(pollId);
                    if (index > -1) {
                        neitherVotedPolls.splice(index, 1);
                    }
                    setNeitherVotesPolls(neitherVotedPolls)
                }
                changingVotedPollsArray = changingVotedPolls
                changingVotedPollsArray.push(pollId)
                setChangingVotedPolls(changingVotedPollsArray)
                //Do rest
                handleMessage(null, null, null);
                const url = serverUrl + '/user/downvotepoll';

                var toSend = {userId: _id, pollId: pollId}

                console.log(toSend)

                axios.post(url, toSend).then((response) => {
                    const result = response.data;
                    const {message, status, data} = result;
                
                    if (status !== 'SUCCESS') {
                        handleMessage(message, status, postNum);
                        changingVotedPollsArray = changingVotedPolls
                        var index = changingVotedPollsArray.indexOf(pollId);
                        if (index > -1) {
                            changingVotedPollsArray.splice(index, 1);
                        }
                        if (beforeChange == "UpVoted") {
                            upVotedPolls = upVotesPolls
                            upVotedPolls.push(pollId)
                            setUpVotesPolls(upVotedPolls)
                            setChangingVotedPolls([])
                            setChangingVotedPolls(changingVotedPollsArray)
                        } 
                        if (beforeChange == "DownVoted") {
                            downVotedPolls = downVotesPolls
                            downVotedPolls.push(pollId)
                            setDownVotesPolls(downVotedPolls)
                            setChangingVotedPolls([])
                            setChangingVotedPolls(changingVotedPollsArray)
                        }
                        if (beforeChange == "Neither") {
                            neitherVotedPolls = neitherVotesPolls
                            neitherVotedPolls.push(pollId)
                            setNeitherVotesPolls(neitherVotedPolls)
                            setChangingVotedPolls([])
                            setChangingVotedPolls(changingVotedPollsArray)
                        }
                    } else {
                        handleMessage(message, status);
                        var tempChangingVotedPollsArray = changingVotedPolls
                        var index = tempChangingVotedPollsArray.indexOf(pollId);
                        if (index > -1) {
                            tempChangingVotedPollsArray.splice(index, 1);
                            console.log("Spliced tempChangingVotedPollsArray")
                        } else {
                            console.log("Didnt find in changing array")
                        }
                        if (message == "Post DownVoted") {
                            downVotedPolls = downVotesPolls
                            downVotedPolls.push(pollId)
                            setDownVotesPolls([])
                            setDownVotesPolls(downVotedPolls)
                            setChangingVotedPolls([])
                            setChangingVotedPolls(tempChangingVotedPollsArray)
                        } else {
                            //Neither
                            neitherVotedPolls = neitherVotesPolls
                            neitherVotedPolls.push(pollId)
                            setNeitherVotesPolls([])
                            setNeitherVotesPolls(neitherVotedPolls)
                            setChangingVotedPolls([])
                            setChangingVotedPolls(tempChangingVotedPollsArray)
                        }
                        //loadAndGetValues()
                        //persistLogin({...data[0]}, message, status);
                    }
                }).catch(error => {
                    console.log(error);
                    changingVotedPollsArray = changingVotedPolls
                    var index = changingVotedPollsArray.indexOf(pollId);
                    if (index > -1) {
                        changingVotedPollsArray.splice(index, 1);
                    }
                    setChangingVotedImages(changingVotedPollsArray)
                    if (beforeChange == "UpVoted") {
                        upVotedPolls = upVotesPolls
                        upVotedPolls.push(pollId)
                        setUpVotesPolls(upVotedPolls)
                    } 
                    if (beforeChange == "DownVoted") {
                        downVotedPolls = downVotesPolls
                        downVotedPolls.push(pollId)
                        setDownVotesPolls(downVotedPolls)
                    }
                    if (beforeChange == "Neither") {
                        neitherVotedPolls = neitherVotesPolls
                        neitherVotedPolls.push(pollId)
                        setNeitherVotesPolls(neitherVotedPolls)
                    }
                    handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', postNum);
                })
            }
        }
    }

    const UpVoteThread = (threadId, postNum) => {
        //Change to loading circle
        if (findingVotedThreads.includes(threadId)) { 

        } else {
            if (changingVotedThreads.includes(threadId)) {

            } else {
                console.log("UpVoting")
                upVotedThreads = upVotesThreads
                downVotedThreads = downVotesThreads
                neitherVotedThreads = neitherVotesThreads
                var beforeChange = "Neither"
                if (upVotedThreads.includes(threadId)) {
                    beforeChange = "UpVoted"
                    var index = upVotedThreads.indexOf(threadId);
                    if (index > -1) {
                        upVotedThreads.splice(index, 1);
                    }
                    setUpVotesThreads(upVotedThreads)
                }
                if (downVotedThreads.includes(threadId)) {
                    beforeChange = "DownVoted"
                    var index = downVotedThreads.indexOf(threadId);
                    if (index > -1) {
                        downVotedThreads.splice(index, 1);
                    }
                    setDownVotesThreads(downVotedThreads)
                }
                if (neitherVotedThreads.includes(threadId)) {
                    beforeChange = "Neither"
                    var index = neitherVotedThreads.indexOf(threadId);
                    if (index > -1) {
                        neitherVotedThreads.splice(index, 1);
                    }
                    setNeitherVotesThreads(neitherVotedThreads)
                }
                changingVotedThreadsArray = changingVotedThreads
                changingVotedThreadsArray.push(threadId)
                setChangingVotedThreads(changingVotedThreadsArray)
                //Do rest
                handleMessage(null, null, null);
                const url = serverUrl + '/user/upvotethread';

                var toSend = {userId: _id, threadId: threadId}

                console.log(toSend)

                axios.post(url, toSend).then((response) => {
                    const result = response.data;
                    const {message, status, data} = result;
                
                    if (status !== 'SUCCESS') {
                        handleMessage(message, status, postNum);
                        changingVotedThreadsArray = changingVotedThreads
                        var index = changingVotedThreadsArray.indexOf(threadId);
                        if (index > -1) {
                            changingVotedThreadsArray.splice(index, 1);
                            setChangingVotedThreads(changingVotedThreadsArray)
                        }
                        if (beforeChange == "UpVoted") {
                            upVotedThreads = upVotesThreads
                            upVotedThreads.push(threadId)
                            setUpVotesThreads(upVotedThreads)
                            setChangingVotedThreads([])
                            setChangingVotedThreads(changingVotedThreadsArray)
                        } 
                        if (beforeChange == "DownVoted") {
                            downVotedThreads = downVotesThreads
                            downVotedThreads.push(threadId)
                            setDownVotesThreads(downVotedThreads)
                            setChangingVotedThreads([])
                            setChangingVotedThreads(changingVotedThreadsArray)
                        }
                        if (beforeChange == "Neither") {
                            neitherVotedThreads = neitherVotesThreads
                            neitherVotedThreads.push(threadId)
                            setNeitherVotesThreads(neitherVotedThreads)
                            setChangingVotedThreads([])
                            setChangingVotedThreads(changingVotedThreadsArray)
                        }
                    } else {
                        handleMessage(message, status);
                        var tempChangingVotedThreadsArray = changingVotedThreads
                        var index = tempChangingVotedThreadsArray.indexOf(threadId);
                        if (index > -1) {
                            tempChangingVotedThreadsArray.splice(index, 1);
                            console.log("Spliced tempChangingVotedThreadsArray")
                        } else {
                            console.log("Didnt find in changing array")
                        }
                        if (message == "Thread UpVoted") {
                            upVotedThreads = upVotesThreads
                            upVotedThreads.push(threadId)
                            setUpVotesThreads([])
                            setUpVotesThreads(upVotedThreads)
                            setChangingVotedThreads([])
                            setChangingVotedThreads(tempChangingVotedThreadsArray)
                        } else {
                            //Neither
                            neitherVotedThreads = neitherVotesImages
                            neitherVotedThreads.push(threadId)
                            setNeitherVotesThreads([])
                            setNeitherVotesThreads(neitherVotedThreads)
                            setChangingVotedThreads([])
                            setChangingVotedThreads(tempChangingVotedThreadsArray)
                        }
                        //loadAndGetValues()
                        //persistLogin({...data[0]}, message, status);
                    }
                }).catch(error => {
                    console.log(error);
                    changingVotedThreadsArray = changingVotedThreads
                    var index = changingVotedThreadsArray.indexOf(threadId);
                    if (index > -1) {
                        changingVotedThreadsArray.splice(index, 1);
                    }
                    setChangingVotedThreads(changingVotedThreadsArray)
                    if (beforeChange == "UpVoted") {
                        upVotedThreads = upVotesThreads
                        upVotedThreads.push(threadId)
                        setUpVotesThreads(upVotedThreads)
                    } 
                    if (beforeChange == "DownVoted") {
                        downVotedThreads = downVotesThreads
                        downVotedThreads.push(threadId)
                        setDownVotesThreads(downVotedThreads)
                    }
                    if (beforeChange == "Neither") {
                        neitherVotedThreads = neitherVotesThreads
                        neitherVotedThreads.push(threadId)
                        setNeitherVotesThreads(neitherVotedThreads)
                    }
                    handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', postNum);
                })
            }
        }
    }

    const DownVoteThread = (threadId, postNum) => {
        //Change to loading circle
        if (findingVotedThreads.includes(threadId)) { 

        } else {
            if (changingVotedThreads.includes(threadId)) {

            } else {
                console.log("DownVoting")
                upVotedThreads = upVotesThreads
                downVotedThreads = downVotesThreads
                neitherVotedThreads = neitherVotesThreads
                var beforeChange = "Neither"
                if (upVotedThreads.includes(threadId)) {
                    beforeChange = "UpVoted"
                    var index = upVotedThreads.indexOf(threadId);
                    if (index > -1) {
                        upVotedThreads.splice(index, 1);
                    }
                    setUpVotesThreads(upVotedThreads)
                }
                if (downVotedThreads.includes(threadId)) {
                    beforeChange = "DownVoted"
                    var index = downVotedThreads.indexOf(threadId);
                    if (index > -1) {
                        downVotedThreads.splice(index, 1);
                    }
                    setDownVotesThreads(downVotedThreads)
                }
                if (neitherVotedThreads.includes(threadId)) {
                    beforeChange = "Neither"
                    var index = neitherVotedThreads.indexOf(threadId);
                    if (index > -1) {
                        neitherVotedThreads.splice(index, 1);
                    }
                    setNeitherVotesThreads(neitherVotedThreads)
                }
                changingVotedThreadsArray = changingVotedThreads
                changingVotedThreadsArray.push(threadId)
                setChangingVotedThreads(changingVotedThreadsArray)
                //Do rest
                handleMessage(null, null, null);
                const url = serverUrl + '/user/downvotethread';

                var toSend = {userId: _id, threadId: threadId}

                console.log(toSend)

                axios.post(url, toSend).then((response) => {
                    const result = response.data;
                    const {message, status, data} = result;
                
                    if (status !== 'SUCCESS') {
                        handleMessage(message, status, postNum);
                        changingVotedThreadsArray = changingVotedThreads
                        var index = changingVotedThreadsArray.indexOf(threadId);
                        if (index > -1) {
                            changingVotedThreadsArray.splice(index, 1);
                            setChangingVotedThreads(changingVotedThreadsArray)
                        }
                        if (beforeChange == "UpVoted") {
                            upVotedThreads = upVotesThreads
                            upVotedThreads.push(threadId)
                            setUpVotesThreads(upVotedThreads)
                            setChangingVotedThreads([])
                            setChangingVotedThreads(changingVotedThreadsArray)
                        } 
                        if (beforeChange == "DownVoted") {
                            downVotedThreads = downVotesThreads
                            downVotedThreads.push(threadId)
                            setDownVotesThreads(downVotedThreads)
                            setChangingVotedThreads([])
                            setChangingVotedThreads(changingVotedThreadsArray)
                        }
                        if (beforeChange == "Neither") {
                            neitherVotedThreads = neitherVotesThreads
                            neitherVotedThreads.push(threadId)
                            setNeitherVotesThreads(neitherVotedThreads)
                            setChangingVotedThreads([])
                            setChangingVotedThreads(changingVotedThreadsArray)
                        }
                    } else {
                        handleMessage(message, status);
                        var tempChangingVotedThreadsArray = changingVotedThreads
                        var index = tempChangingVotedThreadsArray.indexOf(threadId);
                        if (index > -1) {
                            tempChangingVotedThreadsArray.splice(index, 1);
                            console.log("Spliced tempChangingVotedThreadsArray")
                        } else {
                            console.log("Didnt find in changing array")
                        }
                        if (message == "Thread DownVoted") {
                            downVotedThreads = downVotesThreads
                            downVotedThreads.push(threadId)
                            setDownVotesThreads([])
                            setDownVotesThreads(downVotedThreads)
                            setChangingVotedThreads([])
                            setChangingVotedThreads(tempChangingVotedThreadsArray)
                        } else {
                            //Neither
                            neitherVotedThreads = neitherVotesThreads
                            neitherVotedThreads.push(threadId)
                            setNeitherVotesThreads([])
                            setNeitherVotesThreads(neitherVotedThreads)
                            setChangingVotedThreads([])
                            setChangingVotedThreads(tempChangingVotedThreadsArray)
                        }
                        //loadAndGetValues()
                        //persistLogin({...data[0]}, message, status);
                    }
                }).catch(error => {
                    console.log(error);
                    changingVotedThreadsArray = changingVotedThreads
                    var index = changingVotedThreadsArray.indexOf(threadId);
                    if (index > -1) {
                        changingVotedThreadsArray.splice(index, 1);
                    }
                    setChangingVotedThreads(changingVotedThreadsArray)
                    if (beforeChange == "UpVoted") {
                        upVotedThreads = upVotesThreads
                        upVotedThreads.push(threadId)
                        setUpVotesThreads(upVotedThreads)
                    } 
                    if (beforeChange == "DownVoted") {
                        downVotedThreads = downVotesPolls
                        downVotedThreads.push(threadId)
                        setDownVotesThreads(downVotedThreads)
                    }
                    if (beforeChange == "Neither") {
                        neitherVotedThreads = neitherVotesImages
                        neitherVotedThreads.push(threadId)
                        setNeitherVotesThreads(neitherVotedThreads)
                    }
                    handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', postNum);
                })
            }
        }
    }

    const ImageItem = ({imageKey, imageB64, imageTitle, imageDescription, imageUpVotes, imageComments, creatorName, creatorDisplayName, datePosted, postNum})  => (
        <View style={{backgroundColor: dark ? colors.slightlyLighterPrimary : colors.borderColor, borderRadius: 15, marginBottom: 10}}>
            {postsWithDeleteMenuOpen == imageKey && (
                <View style={{position: 'absolute', zIndex: 100, alignSelf: 'center', alignItems: 'center', width: '100%', height: '100%', justifyContent: 'center'}}>
                    <View style={{borderRadius: 30, width: '80%', minHeight: '35%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, borderColor: colors.darkest, borderWidth: 6}}>
                        <SubTitle style={{marginBottom: 0, color: colors.tertiary}}>Delete Post?</SubTitle>
                        <ConfirmLogoutButtons cancelButton={true} onPress={()=>{setPostsWithDeleteMenuOpen(null)}}>
                            <ConfirmLogoutButtonText cancelButton={true}>Cancel</ConfirmLogoutButtonText>
                        </ConfirmLogoutButtons> 
                        <ConfirmLogoutButtons confirmButton={true} onPress={()=>{confirmDeletePrompt(imageKey, postNum)}}>
                            <ConfirmLogoutButtonText confirmButton>Confirm</ConfirmLogoutButtonText>
                        </ConfirmLogoutButtons> 
                    </View>
                </View>
            )}
            <PostsHorizontalView style={{marginLeft: '5%', borderBottomWidth: 3, borderColor: colors.darkLight, width: '90%', paddingBottom: 5, marginRight: '5%'}}>
                <PostsVerticalView>
                    <PostCreatorIcon source={{uri: profilePictureUri}}/>
                </PostsVerticalView>
                <PostsVerticalView style={{marginTop: 9}}>
                    <SubTitle style={{fontSize: 20, color: colors.brand, marginBottom: 0}}>{creatorDisplayName}</SubTitle>
                    <SubTitle style={{fontSize: 12, marginBottom: 0, color: colors.tertiary}}>@{creatorName}</SubTitle>
                </PostsVerticalView>
            </PostsHorizontalView>
            <PostsHorizontalView style={{alignItems: 'center', justifyContent: 'center'}}>
                <MultiMediaPostFrame postOnProfile={true} style={{ aspectRatio: 1/1, backgroundColor: colors.primary }}>
                    <Image style={{width: '100%', height: '100%', resizeMode : 'cover', borderRadius: 20}} source={{uri: `data:image/jpg;base64,${imageB64}`}}/>
                </MultiMediaPostFrame>
            </PostsHorizontalView>
            <ImagePostTextFrame style={{textAlign: 'center'}}>
                <SubTitle style={{fontSize: 20, color: colors.tertiary, marginBottom: 0}}>{imageTitle}</SubTitle>
                <SubTitle style={{fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageDescription}</SubTitle>
            </ImagePostTextFrame>
            <PostHorizontalView style={{marginLeft: '5%', width: '90%', paddingVertical: 10, flex: 1, flexDirection: 'row'}}>
                
                {upVotesImages.includes(imageKey) && (<PostsIconFrame onPress={() => {UpVoteImage(imageKey, postNum)}}>
                    <PostsIcons style={{flex: 1}} tintColor={colors.brand} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')}/>
                </PostsIconFrame>)}
                {neitherVotesImages.includes(imageKey) && (<PostsIconFrame onPress={() => {UpVoteImage(imageKey, postNum)}}>
                    <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')}/>
                </PostsIconFrame>)}
                {downVotesImages.includes(imageKey) && (<PostsIconFrame onPress={() => {UpVoteImage(imageKey, postNum)}}>
                    <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')}/>
                </PostsIconFrame>)}
                {changingVotedImages.includes(imageKey) && (<PostsIconFrame></PostsIconFrame>)}
                

                {upVotesImages.includes(imageKey) && (<PostsIconFrame>
                    {initialUpVotesImages.includes(imageKey) && (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpVotes}</SubTitle>
                    )}
                    {initialNeitherVotesImages.includes(imageKey) && (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpVotes+1}</SubTitle>
                    )}
                    {initialDownVotesImages.includes(imageKey) && (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpVotes+2}</SubTitle>
                    )}
                </PostsIconFrame>)}
                {neitherVotesImages.includes(imageKey) && (<PostsIconFrame>
                    {initialNeitherVotesImages.includes(imageKey) && (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpVotes}</SubTitle>
                    )}
                    {initialUpVotesImages.includes(imageKey) && (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpVotes-1}</SubTitle>
                    )}
                    {initialDownVotesImages.includes(imageKey) && (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpVotes+1}</SubTitle>
                    )}
                </PostsIconFrame>)}
                {downVotesImages.includes(imageKey) && (<PostsIconFrame>
                    {initialDownVotesImages.includes(imageKey) && (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpVotes}</SubTitle>
                    )}
                    {initialNeitherVotesImages.includes(imageKey) && (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpVotes-1}</SubTitle>
                    )}
                    {initialUpVotesImages.includes(imageKey)&& (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpVotes-2}</SubTitle>
                    )}
                </PostsIconFrame>)}
                {changingVotedImages.includes(imageKey) && (<PostsIconFrame>
                    <ActivityIndicator size="small" color={colors.brand} />                
                </PostsIconFrame>)}

                {downVotesImages.includes(imageKey) && (<PostsIconFrame onPress={() => {DownVoteImage(imageKey, postNum)}}>
                    <PostsIcons style={{flex: 1}} tintColor={colors.brand} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')}/>
                </PostsIconFrame>)}
                {neitherVotesImages.includes(imageKey) && (<PostsIconFrame onPress={() => {DownVoteImage(imageKey, postNum)}}>
                    <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')}/>
                </PostsIconFrame>)}
                {upVotesImages.includes(imageKey) && (<PostsIconFrame onPress={() => {DownVoteImage(imageKey, postNum)}}>
                    <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')}/>
                </PostsIconFrame>)}
                {changingVotedImages.includes(imageKey) && (<PostsIconFrame></PostsIconFrame>)}
                <PostsIconFrame>
                </PostsIconFrame>
                <PostsIconFrame onPress={() => navigation.navigate("ViewImagePostPage", {imageKey, imageB64, imageTitle, imageDescription, creatorName, creatorDisplayName, creatorPfpB64, datePosted})}>
                    <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/113-bubbles4.png')}/>
                </PostsIconFrame>
                <PostsIconFrame>
                    <PostsIcons style={{flex: 1, height: 30, width: 30}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/387-share2.png')}/>
                </PostsIconFrame>
                <PostsIconFrame onPress={()=>{openDeletePrompt(imageKey, creatorName)}}>
                    <PostsIcons style={{flex: 1}} source={require('./../assets/img/ThreeDots.png')}/>
                </PostsIconFrame>
            </PostHorizontalView>
            {postNumForMsg == postNum && (<MsgBox type={messageType}>{message}</MsgBox>)}
            <SubTitle style={{flex: 1, alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{datePosted}</SubTitle>
            <TouchableOpacity onPress={() => navigation.navigate("ViewImagePostPage", {imageKey, imageB64, imageTitle, imageDescription, creatorName, creatorDisplayName, creatorPfpB64, datePosted})}>
                <SubTitle style={{flex: 1, alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageComments.length} comments</SubTitle>
            </TouchableOpacity>
        </View>
    );

    const PollItem = ({ pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollUpOrDownVotes, pollId, votedFor, postNum, pollComments, creatorName, creatorDisplayName, datePosted}) => (
        <PollPostFrame onPress={() => navigation.navigate("ViewPollPostPage", {pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: pfpB64, creatorName, creatorDisplayName, datePosted})}>
            {postsWithDeleteMenuOpen == pollId && (
                <View style={{position: 'absolute', zIndex: 100, alignSelf: 'center', alignItems: 'center', width: '100%', height: '100%', justifyContent: 'center'}}>
                    <View style={{borderRadius: 30, width: '80%', minHeight: '35%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, borderColor: darkest, borderWidth: 6}}>
                        <SubTitle style={{marginBottom: 0, color: colors.tertiary}}>Delete Post?</SubTitle>
                        <ConfirmLogoutButtons cancelButton={true} onPress={()=>{setPostsWithDeleteMenuOpen(null)}}>
                            <ConfirmLogoutButtonText cancelButton={true}>Cancel</ConfirmLogoutButtonText>
                        </ConfirmLogoutButtons> 
                        <ConfirmLogoutButtons confirmButton={true} onPress={()=>{confirmDeletePrompt(pollId, postNum)}}>
                            <ConfirmLogoutButtonText confirmButton>Confirm</ConfirmLogoutButtonText>
                        </ConfirmLogoutButtons> 
                    </View>
                </View>
            )}
            <PostsHorizontalView style={{marginLeft: '5%', borderBottomWidth: 3, borderColor: darkLight, width: '90%', paddingBottom: 5, marginRight: '5%'}}>
                <PostsVerticalView>
                    <PostCreatorIcon source={{uri: profilePictureUri}}/>
                </PostsVerticalView>
                <PostsVerticalView style={{marginTop: 9}}>
                    <SubTitle style={{fontSize: 20, color: brand, marginBottom: 0}}>{creatorDisplayName}</SubTitle>
                    <SubTitle style={{fontSize: 12, marginBottom: 0, color: colors.tertiary}}>@{creatorName}</SubTitle>
                </PostsVerticalView>
            </PostsHorizontalView>
            <PollPostTitle style={{width: '95%'}}>
                {pollTitle}
            </PollPostTitle>
            <PollPostSubTitle style={{width: '95%', color: colors.tertiary}}>
                {pollSubTitle}
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
                <PollBarItem borderChange={optionOnesBarLength} style={{ width: optionOnesBarLength+'%', backgroundColor: optionOnesColor == 'Not Specified' ? brand : eval(optionOnesColor.toLowerCase())}}></PollBarItem>
                <PollBarItem borderChange={optionTwosBarLength} style={{ width: optionTwosBarLength+'%', backgroundColor: optionTwosColor == 'Not Specified' ? brand : eval(optionTwosColor.toLowerCase() )}}></PollBarItem>
                <PollBarItem borderChange={optionThreesBarLength} style={{ width: optionThreesBarLength+'%', backgroundColor: optionThreesColor == 'Not Specified' ? brand : eval(optionThreesColor.toLowerCase()) }}></PollBarItem>
                <PollBarItem borderChange={optionFoursBarLength} style={{ width: optionFoursBarLength+'%', backgroundColor: optionFoursColor == 'Not Specified' ? brand : eval(optionFoursColor.toLowerCase()) }}></PollBarItem>
                <PollBarItem borderChange={optionFivesBarLength} style={{ width: optionFivesBarLength+'%', backgroundColor: optionFivesColor == 'Not Specified' ? brand : eval(optionFivesColor.toLowerCase()) }}></PollBarItem>
                <PollBarItem borderChange={optionSixesBarLength} style={{ width: optionSixesBarLength+'%', backgroundColor: optionSixesColor == 'Not Specified' ? brand : eval(optionSixesColor.toLowerCase()) }}></PollBarItem>
            </PollBarOutline>
            <PollPostHorizontalView>
                <PollKeyViewOne pollOptions={totalNumberOfOptions}  onPress={() => navigation.navigate("ViewPollPostPage", {pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: pfpB64, creatorName, creatorDisplayName, datePosted})}>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        1. {optionOne}
                    </PollPostSubTitle>
                    <PollKeysCircle circleColor={optionOnesColor}></PollKeysCircle>
                </PollKeyViewOne>
                <PollKeyViewTwo pollOptions={totalNumberOfOptions} onPress={() => navigation.navigate("ViewPollPostPage", {pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: pfpB64, creatorName, creatorDisplayName, datePosted})}>
                    <PollKeysCircle circleColor={optionTwosColor}></PollKeysCircle>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        2. {optionTwo}
                    </PollPostSubTitle>
                </PollKeyViewTwo>
            </PollPostHorizontalView>
            
            <PollPostHorizontalView>
                <PollKeyViewThree pollOptions={totalNumberOfOptions} onPress={() => navigation.navigate("ViewPollPostPage", {pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: pfpB64, creatorName, creatorDisplayName, datePosted})}>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        3. {optionThree}
                    </PollPostSubTitle>
                    <PollKeysCircle circleColor={optionThreesColor}></PollKeysCircle>
                </PollKeyViewThree>
                <PollKeyViewFour pollOptions={totalNumberOfOptions} onPress={() => navigation.navigate("ViewPollPostPage", {pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: pfpB64, creatorName, creatorDisplayName, datePosted})}>
                    <PollKeysCircle circleColor={optionFoursColor}></PollKeysCircle>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        4. {optionFour}
                    </PollPostSubTitle>
                </PollKeyViewFour>
            </PollPostHorizontalView>

            <PollPostHorizontalView>
                <PollKeyViewFive pollOptions={totalNumberOfOptions} onPress={() => navigation.navigate("ViewPollPostPage", {pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: pfpB64, creatorName, creatorDisplayName, datePosted})}>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        5. {optionFive}
                    </PollPostSubTitle>
                    <PollKeysCircle circleColor={optionFivesColor}></PollKeysCircle>
                </PollKeyViewFive>
                <PollKeyViewSix pollOptions={totalNumberOfOptions} onPress={() => navigation.navigate("ViewPollPostPage", {pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: pfpB64, creatorName, creatorDisplayName, datePosted})}>
                    <PollKeysCircle circleColor={optionSixesColor}></PollKeysCircle>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        6. {optionSix}
                    </PollPostSubTitle>
                </PollKeyViewSix>
            </PollPostHorizontalView>
            <PostHorizontalView style={{marginLeft: '5%', width: '90%', paddingVertical: 10, flex: 1, flexDirection: 'row', borderTopWidth: 3, borderColor: darkest}}>
            {upVotesPolls.includes(pollId) && (<PostsIconFrame onPress={() => {UpVotePoll(pollId, postNum)}}>
                    <PostsIcons style={{flex: 1}} tintColor={brand} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')}/>
                </PostsIconFrame>)}
                {neitherVotesPolls.includes(pollId) && (<PostsIconFrame onPress={() => {UpVotePoll(pollId, postNum)}}>
                    <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')}/>
                </PostsIconFrame>)}
                {downVotesPolls.includes(pollId) && (<PostsIconFrame onPress={() => {UpVotePoll(pollId, postNum)}}>
                    <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')}/>
                </PostsIconFrame>)}
                {changingVotedPolls.includes(pollId) && (<PostsIconFrame></PostsIconFrame>)}
                

                {upVotesPolls.includes(pollId) && (<PostsIconFrame>
                    {initialUpVotesPolls.includes(pollId) && (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{pollUpOrDownVotes}</SubTitle>
                    )}
                    {initialNeitherVotesPolls.includes(pollId) && (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{pollUpOrDownVotes+1}</SubTitle>
                    )}
                    {initialDownVotesPolls.includes(pollId) && (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{pollUpOrDownVotes+2}</SubTitle>
                    )}
                </PostsIconFrame>)}
                {neitherVotesPolls.includes(pollId) && (<PostsIconFrame>
                    {initialNeitherVotesPolls.includes(pollId) && (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{pollUpOrDownVotes}</SubTitle>
                    )}
                    {initialUpVotesPolls.includes(pollId) && (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{pollUpOrDownVotes-1}</SubTitle>
                    )}
                    {initialDownVotesPolls.includes(pollId) && (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{pollUpOrDownVotes+1}</SubTitle>
                    )}
                </PostsIconFrame>)}
                {downVotesPolls.includes(pollId) && (<PostsIconFrame>
                    {initialDownVotesPolls.includes(pollId) && (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{pollUpOrDownVotes}</SubTitle>
                    )}
                    {initialNeitherVotesPolls.includes(pollId) && (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{pollUpOrDownVotes-1}</SubTitle>
                    )}
                    {initialUpVotesPolls.includes(pollId)&& (
                        <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{pollUpOrDownVotes-2}</SubTitle>
                    )}
                </PostsIconFrame>)}
                {changingVotedPolls.includes(pollId) && (<PostsIconFrame>
                    <ActivityIndicator size="small" color={brand} />                
                </PostsIconFrame>)}

                {downVotesPolls.includes(pollId) && (<PostsIconFrame onPress={() => {DownVotePoll(pollId, postNum)}}>
                    <PostsIcons style={{flex: 1}} tintColor={brand} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')}/>
                </PostsIconFrame>)}
                {neitherVotesPolls.includes(pollId) && (<PostsIconFrame onPress={() => {DownVotePoll(pollId, postNum)}}>
                    <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')}/>
                </PostsIconFrame>)}
                {upVotesPolls.includes(pollId) && (<PostsIconFrame onPress={() => {DownVotePoll(pollId, postNum)}}>
                    <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')}/>
                </PostsIconFrame>)}
                {changingVotedPolls.includes(pollId) && (<PostsIconFrame></PostsIconFrame>)}
                <PostsIconFrame>
                </PostsIconFrame>
                <PostsIconFrame onPress={() => navigation.navigate("ViewPollPostPage", {pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: pfpB64, creatorName, creatorDisplayName, datePosted})}>
                    <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/113-bubbles4.png')}/>
                </PostsIconFrame>
                <PostsIconFrame>
                    <PostsIcons style={{flex: 1, height: 30, width: 30}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/387-share2.png')}/>
                </PostsIconFrame>
                <PostsIconFrame onPress={()=>{openDeletePrompt(pollId, creatorName)}}>
                    <PostsIcons style={{flex: 1}} source={require('./../assets/img/ThreeDots.png')}/>
                </PostsIconFrame>
            </PostHorizontalView>
            {postNumForMsg == postNum && (<MsgBox type={messageType}>{message}</MsgBox>)}
            <SubTitle style={{flex: 1, alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{datePosted}</SubTitle>
            {pollComments && (
                <SubTitle style={{flex: 1, alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{pollComments.length} comments</SubTitle>
            )}
            </PollPostFrame>
    );

    const CategoryItem = ({categoryTitle, categoryDescription, members, categoryTags, image, NSFW, NSFL, datePosted}) => (
        <SearchFrame onPress={() => navigation.navigate("CategoryViewPage", {categoryTitle: categoryTitle})}>
            <View style={{paddingHorizontal: '50%'}}>
            </View>
            {image !== null && (
                <Avatar resizeMode="cover" searchPage={true} source={{uri: `data:image/jpg;base64,${image}`}} />
            )}
            {image == null && (
                <Avatar resizeMode="cover" searchPage={true} source={require('./../assets/img/Logo.png')} />
            )}
            {NSFW == false && (
                <View>
                    {NSFL == false && (
                        <SubTitle style={{color: colors.tertiary}} searchResTitle={true}>{categoryTitle}</SubTitle>
                    )}
                    {NSFL == true && (
                        <View style={{flexDirection: 'row'}}>
                            <SubTitle searchResTitle={true} style={{color: red}}>(NSFL) </SubTitle>
                            <SubTitle style={{color: colors.tertiary}} searchResTitle={true}>{categoryTitle}</SubTitle>
                        </View>
                    )}
                </View>
            )}
            {NSFW == true && (
                <View style={{flexDirection: 'row'}}>
                    <SubTitle searchResTitle={true} style={{color: red}}>(NSFW) </SubTitle>
                    <SubTitle style={{color: colors.tertiary}} searchResTitle={true}>{categoryTitle}</SubTitle>
                </View>
            )}
            <SubTitle style={{color: colors.tertiary}} searchResTitleDisplayName={true}>{categoryDescription}</SubTitle>
            <SubTitle searchResTitleDisplayName={true} style={{color: brand}}>{categoryTags}</SubTitle>
            <SearchHorizontalView>
                <SearchHorizontalViewItemCenter style={{height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                    <SearchSubTitle welcome={true} style={{flex: 1, color: colors.tertiary}}> Members </SearchSubTitle>
                    <ProfIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/115-users.png')}/>
                    {members == 0 && ( 
                        <SearchSubTitle welcome={true} style={{flex: 1, color: colors.tertiary}}> 0 </SearchSubTitle>
                    )}
                    {members !== 0 && ( 
                        <SearchSubTitle welcome={true} style={{flex: 1, color: colors.tertiary}}> {members} </SearchSubTitle>
                    )}
                </SearchHorizontalViewItemCenter>
                <SearchHorizontalViewItemCenter style={{height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                    <SearchSubTitle welcome={true} style={{flex: 1, color: colors.tertiary}}> Date Created </SearchSubTitle>
                    <ProfIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/084-calendar.png')}/>
                    <SearchSubTitle welcome={true} style={{flex: 1, color: colors.tertiary}}> {datePosted} </SearchSubTitle>
                </SearchHorizontalViewItemCenter>
            </SearchHorizontalView>
        </SearchFrame>
    );

    const ThreadItems = ({postNum, threadId, threadComments, threadType, threadUpVotes, threadTitle, threadSubtitle, threadTags, threadCategory, threadBody, threadImageKey, threadImageDescription, threadNSFW, threadNSFL, datePosted, threadUpVoted, threadDownVoted, creatorDisplayName, creatorName, creatorImageB64, imageInThreadB64})  => (
        <View style={{backgroundColor: dark ? slightlyLighterPrimary : colors.borderColor, borderRadius: 15, marginBottom: 10}} onPress={() => navigation.navigate("ThreadViewPage", {threadId: threadId})}>
                {postsWithDeleteMenuOpen == threadId && (
                    <View style={{position: 'absolute', zIndex: 100, alignSelf: 'center', alignItems: 'center', width: '100%', height: '100%', justifyContent: 'center'}}>
                        <View style={{borderRadius: 30, width: '80%', minHeight: '35%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, borderColor: darkest, borderWidth: 6}}>
                            <SubTitle style={{marginBottom: 0, color: colors.tertiary}}>Delete Post?</SubTitle>
                            <ConfirmLogoutButtons cancelButton={true} onPress={()=>{setPostsWithDeleteMenuOpen(null)}}>
                                <ConfirmLogoutButtonText cancelButton={true}>Cancel</ConfirmLogoutButtonText>
                            </ConfirmLogoutButtons> 
                            <ConfirmLogoutButtons confirmButton={true} onPress={()=>{confirmDeletePrompt(threadId, postNum)}}>
                                <ConfirmLogoutButtonText confirmButton>Confirm</ConfirmLogoutButtonText>
                            </ConfirmLogoutButtons> 
                        </View>
                    </View>
                )}
                {threadNSFW === true && (
                    <SubTitle style={{fontSize: 10, color: red, marginBottom: 0}}>(NSFW)</SubTitle>
                )}
                {threadNSFL === true && (
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
                                <SubTitle style={{fontSize: 20, marginBottom: 0, color: colors.tertiary}}>{creatorDisplayName}</SubTitle>
                                <SubTitle style={{fontSize: 12, color: brand, marginBottom: 0}}>@{creatorName}</SubTitle>
                            </PostsVerticalView>
                        </PostsHorizontalView>
                    </TouchableOpacity>
                </PostsHorizontalView>
                <TouchableOpacity onPress={() => navigation.navigate("ThreadViewPage", {threadId: threadId})}>
                    <ImagePostTextFrame style={{textAlign: 'left', alignItems: 'baseline'}}>
                        <TouchableOpacity>
                            <SubTitle style={{fontSize: 10, color: brand, marginBottom: 0}}>Category: {threadCategory}</SubTitle>
                        </TouchableOpacity>
                        <SubTitle style={{fontSize: 20, marginBottom: 0, color: colors.tertiary}}>{threadTitle}</SubTitle>
                        {threadSubtitle !== "" && (
                            <SubTitle style={{fontSize: 18, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{threadSubtitle}</SubTitle>
                        )}
                        {threadTags !== "" && (
                            <TouchableOpacity>
                                <SubTitle style={{fontSize: 10, color: brand, marginBottom: 10}}>{threadTags}</SubTitle>
                            </TouchableOpacity>
                        )}
                        {threadType == "Text" && (
                            <SubTitle style={{fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{threadBody}</SubTitle>
                        )}
                        <View style={{textAlign: 'left', alignItems: 'baseline', marginLeft: '5%', marginRight: '5%', width: '90%'}}>
                            {threadType == "Images" && (
                                <View>
                                    <View style={{height: 200, width: 200}}>
                                        <Image style={{height: '100%', width: 'auto', resizeMode: 'contain'}} source={{uri: `data:image/jpg;base64,${imageInThreadB64}`}}/>
                                    </View>
                                    <SubTitle style={{fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{threadImageDescription}</SubTitle>
                                </View>
                            )}
                        </View>
                    </ImagePostTextFrame>
                </TouchableOpacity>
                
                <PostHorizontalView style={{marginLeft: '5%', width: '90%', paddingVertical: 10, flex: 1, flexDirection: 'row'}}>
                    
                    {upVotesThreads.includes(threadId) && (<PostsIconFrame onPress={() => {UpVoteThread(threadId, postNum)}}>
                        <PostsIcons style={{flex: 1}} tintColor={brand} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')}/>
                    </PostsIconFrame>)}
                    {neitherVotesThreads.includes(threadId) && (<PostsIconFrame onPress={() => {UpVoteThread(threadId, postNum)}}>
                        <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')}/>
                    </PostsIconFrame>)}
                    {downVotesThreads.includes(threadId) && (<PostsIconFrame onPress={() => {UpVoteThread(threadId, postNum)}}>
                        <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')}/>
                    </PostsIconFrame>)}
                    {changingVotedThreads.includes(threadId) && (<PostsIconFrame></PostsIconFrame>)}
                    

                    {upVotesThreads.includes(threadId) && (<PostsIconFrame>
                        {initialUpVotesThreads.includes(threadId) && (
                            <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{threadUpVotes}</SubTitle>
                        )}
                        {initialNeitherVotesThreads.includes(threadId) && (
                            <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{threadUpVotes+1}</SubTitle>
                        )}
                        {initialDownVotesThreads.includes(threadId) && (
                            <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{threadUpVotes+2}</SubTitle>
                        )}
                    </PostsIconFrame>)}
                    {neitherVotesThreads.includes(threadId) && (<PostsIconFrame>
                        {initialNeitherVotesThreads.includes(threadId) && (
                            <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{threadUpVotes}</SubTitle>
                        )}
                        {initialUpVotesThreads.includes(threadId) && (
                            <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{threadUpVotes-1}</SubTitle>
                        )}
                        {initialDownVotesThreads.includes(threadId) && (
                            <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{threadUpVotes+1}</SubTitle>
                        )}
                    </PostsIconFrame>)}
                    {downVotesThreads.includes(threadId) && (<PostsIconFrame>
                        {initialDownVotesThreads.includes(threadId) && (
                            <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{threadUpVotes}</SubTitle>
                        )}
                        {initialNeitherVotesThreads.includes(threadId) && (
                            <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{threadUpVotes-1}</SubTitle>
                        )}
                        {initialUpVotesThreads.includes(threadId)&& (
                            <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{threadUpVotes-2}</SubTitle>
                        )}
                    </PostsIconFrame>)}
                    {changingVotedThreads.includes(threadId) && (<PostsIconFrame>
                        <ActivityIndicator size="small" color={brand} />                
                    </PostsIconFrame>)}

                    {downVotesThreads.includes(threadId) && (<PostsIconFrame onPress={() => {DownVoteThread(threadId, postNum)}}>
                        <PostsIcons style={{flex: 1}} tintColor={brand} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')}/>
                    </PostsIconFrame>)}
                    {neitherVotesThreads.includes(threadId) && (<PostsIconFrame onPress={() => {DownVoteThread(threadId, postNum)}}>
                        <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')}/>
                    </PostsIconFrame>)}
                    {upVotesThreads.includes(threadId) && (<PostsIconFrame onPress={() => {DownVoteThread(threadId, postNum)}}>
                        <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')}/>
                    </PostsIconFrame>)}
                    {changingVotedThreads.includes(threadId) && (<PostsIconFrame></PostsIconFrame>)}
                    <PostsIconFrame>
                    </PostsIconFrame>
                    <PostsIconFrame onPress={() => navigation.navigate("ThreadViewPage", {threadId: threadId})}>
                        <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/113-bubbles4.png')}/>
                    </PostsIconFrame>
                    <PostsIconFrame>
                        <PostsIcons style={{flex: 1, height: 30, width: 30}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/387-share2.png')}/>
                    </PostsIconFrame>
                    <PostsIconFrame onPress={()=>{openDeletePrompt(threadId, creatorName)}}>
                        <PostsIcons style={{flex: 1}} source={require('./../assets/img/ThreeDots.png')}/>
                    </PostsIconFrame>
                </PostHorizontalView>
                {postNumForMsg == postNum && (<MsgBox type={messageType}>{message}</MsgBox>)}
                <SubTitle style={{flex: 1, alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{datePosted}</SubTitle>
                <TouchableOpacity onPress={() => navigation.navigate("ThreadViewPage", {threadId: threadId})}>
                    <SubTitle style={{flex: 1, alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{threadComments} comments</SubTitle>
                </TouchableOpacity>
        </View>
    );

    //main
    const toSendProfileName = {profileName: name, userId: _id}

    const clearLogin = () => {
        AsyncStorage.removeItem('socialSquareCredentials').then(() => {
            setStoredCredentials("");
        })
        .catch(error => console.log(error))
    }
    const changeToGrid = () => {
        if (gridViewState=="none") {
            setFeaturedViewState("none")
            setGridViewState("flex")
            Animated.timing(GridOrTagLineTranslateX, {
                toValue: 0,
                duration: 150,
                useNativeDriver: 'true',
            }).start()
        }
    }

    const changeToFeatured = () => {
        if (featuredViewState=="none") {
            console.log("SussyBaka")
            setGridViewState("none")
            setFeaturedViewState("flex")
            Animated.timing(GridOrTagLineTranslateX, {
                toValue: deviceDimensions.width / 2,
                duration: 150,
                useNativeDriver: 'true',
            }).start()
        }
    }

    //get image of post
    async function getImageInPost(imageData, index) {
        return axios.get((serverUrl + '/getImage/' + imageData[index].imageKey), { cancelToken: source.token})
        .then(res => res.data).catch(error => {
            console.log(error);
            //setSubmitting(false);
            setLoadingPosts(false)
            console.log("Either an error or cancelled.");
        })
    }
    //profile image of creator
    async function getImageInPfp(imageData, index) {
        return axios.get((serverUrl + '/getImage/' + imageData[index].creatorPfpKey), { cancelToken: source.token})
        .then(res => res.data).catch(error => {
            console.log(error);
            //setSubmitting(false);
            setLoadingPosts(false)
            console.log("Either an error or cancelled.");
        })
    }
    async function getImageInCategory(imageKey) {
        return axios.get((serverUrl + '/getImage/' + imageKey), { cancelToken: cancelTokenPostFormatFive.token})
        .then(res => res.data).catch(error => {
            console.log(error);
            //setSubmitting(false);
            setLoadingPosts(false)
            console.log("Either an error or cancelled.");
        })
    }
    //any image honestly
    async function getImageWithKeyOne(imageKey) {
            return axios.get((serverUrl + '/getImage/' + imageKey), { cancelToken: cancelTokenPostFormatOne.token})
            .then(res => res.data).catch(error => {
                console.log(error);
                //setSubmitting(false);
                setLoadingPostsImage(false)
                console.log("Either an error or cancelled.");
            })
    }
    async function getImageWithKeyTwo(imageKey) {
        return axios.get((serverUrl + '/getImage/' + imageKey), { cancelToken: cancelTokenPostFormatTwo.token})
        .then(res => res.data).catch(error => {
            console.log(error);
            //setSubmitting(false);
            setLoadingPostsVideo(false)
            console.log("Either an error or cancelled.");
        })
    }
    async function getImageWithKeyThree(imageKey) {
        return axios.get((serverUrl + '/getImage/' + imageKey), { cancelToken: cancelTokenPostFormatThree.token})
        .then(res => res.data).catch(error => {
            console.log(error);
            //setSubmitting(false);
            setLoadingPostsPoll(false)
            console.log("Either an error or cancelled.");
        })
    }
    async function getImageWithKeyFour(imageKey) {
        return axios.get((serverUrl + '/getImage/' + imageKey), { cancelToken: cancelTokenPostFormatFour.token})
        .then(res => res.data).catch(error => {
            console.log(error);
            //setSubmitting(false);
            setLoadingPostsThread(false)
            console.log("Either an error or cancelled.");
        })
    }
    async function getImageWithKeyFive(imageKey) {
        return axios.get((serverUrl + '/getImage/' + imageKey), { cancelToken: cancelTokenPostFormatFive.token})
        .then(res => res.data).catch(error => {
            console.log(error);
            //setSubmitting(false);
            setLoadingPostsCategory(false)
            console.log("Either an error or cancelled.");
        })
    }

    const changeToOne = () => {
        if (loadingPostsImage == false) {
            cancelTokenPostFormatTwo.cancel()
            cancelTokenPostFormatThree.cancel()
            cancelTokenPostFormatFour.cancel()
            cancelTokenPostFormatFive.cancel()
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
            setChangeSectionsOne()
            handleMessage(null, null, null);
            setSelectedPostFormat("One")
            setFormatOneText("This user has no Image posts.")
            const layoutImagePosts = (data) => {
                setFormatOneText("Users Image Posts:")
                var imageData = data.data
                console.log("The Image data")
                console.log(imageData)
                console.log(imageData.length)
                var tempSections = []
                var itemsProcessed = 0;
                imageData.forEach(function (item, index) {
                    //image in post
                    async function findImages() {
                        //
                        async function asyncFunctionForImages() {
                            const imageInPost = await getImageWithKeyOne(imageData[index].imageKey)
                            console.log("Image In Post Recieved")
                            //Add
                            const addAndPush = async () => {
                                var imageB64 = imageInPost.data
                                console.log("TestHere")
                                var tempSectionsTemp = {data: [{imageKey: imageData[index].imageKey, imageB64: imageB64, imageTitle: imageData[index].imageTitle, imageDescription: imageData[index].imageDescription, imageUpVotes: imageData[index].imageUpVotes, imageComments: imageData[index].imageComments, creatorName: imageData[index].creatorName, creatorDisplayName: imageData[index].creatorDisplayName, datePosted: imageData[index].datePosted, postNum: index}]}
                                if (imageData[index].imageUpVoted) {
                                    console.log("UpVoted")
                                    upVotedImages.push(imageData[index].imageKey)
                                    setUpVotesImages(upVotedImages)
                                    initialUpVotedImages.push(imageData[index].imageKey)
                                    setInitialUpVotesImages(initialUpVotedImages)
                                } else if (imageData[index].imageDownVoted) {
                                    console.log("DownVoted")
                                    downVotedImages.push(imageData[index].imageKey)
                                    setDownVotesImages(downVotedImages)
                                    initialDownVotedImages.push(imageData[index].imageKey)
                                    setInitialDownVotesImages(initialDownVotedImages)
                                } else {
                                    console.log("Neither")
                                    neitherVotedImages.push(imageData[index].imageKey)
                                    setNeitherVotesImages(neitherVotedImages)
                                    initialNeitherVotedImages.push(imageData[index].imageKey)
                                    setInitialNeitherVotesImages(initialNeitherVotedImages)
                                }
                                tempSections.push(tempSectionsTemp)
                            }
                            await addAndPush()
                            itemsProcessed++;
                            if(itemsProcessed === imageData.length) {
                                setChangeSectionsOne(tempSections)  
                                setLoadingPostsImage(false)  
                                console.log(upVotesImages)
                                console.log(downVotesImages)
                                console.log(neitherVotesImages)
                            }
                        }
                        asyncFunctionForImages()
                    }
                    findImages()
                });
            }

            const url = serverUrl + '/user/getImagesFromProfile';

            setLoadingPostsImage(true)
            axios.post(url, toSendProfileName).then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS') {
                    setLoadingPostsImage(false)
                    handleMessage(message, status);
                    console.log(status)
                    console.log(message)
                } else {
                    layoutImagePosts({data});
                    console.log(status)
                    console.log(message)
                }
                //setSubmitting(false);

            }).catch(error => {
                console.log(error);
                //setSubmitting(false);
                setLoadingPostsImage(false)
                handleMessage("An error occured. Try checking your network connection and retry.");
            })
        } else {
            setSelectedPostFormat("One")
            setFormatOneText("Users Image Posts:") 
        }
    }

    if (getImagesOnLoad == false) {
        changeToOne()
        setGetImagesOnLoad(true)
    }

    const changeToTwo = () => {
        cancelTokenPostFormatOne.cancel()
        cancelTokenPostFormatThree.cancel()
        cancelTokenPostFormatFour.cancel()
        cancelTokenPostFormatFive.cancel()
        setFormatTwoText("This user has no Video posts.")
        setSelectedPostFormat("Two")
        setChangeSectionsTwo()
    }

    const changeToThree = () => {
        setSelectedPostFormat("Three")
        setFormatThreeText("This user has no Poll posts.")
        if (loadingPostsPoll == false) {
            cancelTokenPostFormatOne.cancel()
            cancelTokenPostFormatTwo.cancel()
            cancelTokenPostFormatFour.cancel()
            cancelTokenPostFormatFive.cancel()
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
            setChangeSectionsThree()
            handleMessage(null, null, null);
            const layoutPollPosts = (data) => {
                setFormatThreeText("Users Poll Posts:")
                var pollData = data.data
                console.log("The poll data")
                console.log(pollData)
                console.log(pollData.length)
                var tempSections = []
                var itemsProcessed = 0
                pollData.forEach(function (item, index) {
                    var optionOnesBarLength = 16.6666666667
                    var optionTwosBarLength = 16.6666666667
                    var optionThreesBarLength = 16.6666666667
                    var optionFoursBarLength = 16.6666666667
                    var optionFivesBarLength = 16.6666666667
                    var optionSixesBarLength = 16.6666666667
                    var totalVotes = pollData[index].optionOnesVotes+pollData[index].optionTwosVotes+pollData[index].optionThreesVotes+pollData[index].optionFoursVotes+pollData[index].optionFivesVotes+pollData[index].optionSixesVotes
                    //console.log(item, index);
                    if (totalVotes !== 0) {
                        optionOnesBarLength = (pollData[index].optionOnesVotes/totalVotes)*100
                        console.log("O1 BL")
                        console.log(optionOnesBarLength)
                        optionTwosBarLength = (pollData[index].optionTwosVotes/totalVotes)*100
                        console.log("O2 BL")
                        console.log(optionTwosBarLength)
                        optionThreesBarLength = (pollData[index].optionThreesVotes/totalVotes)*100
                        console.log("O3 BL")
                        console.log(optionThreesBarLength)
                        optionFoursBarLength = (pollData[index].optionFoursVotes/totalVotes)*100
                        console.log("O4 BL")
                        console.log(optionFoursBarLength)
                        optionFivesBarLength = (pollData[index].optionFivesVotes/totalVotes)*100
                        console.log("O5 BL")
                        console.log(optionFivesBarLength)
                        optionSixesBarLength = (pollData[index].optionSixesVotes/totalVotes)*100
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
                            if (pollData[index].totalNumberOfOptions == "Two") {
                                optionOnesBarLength = 100/2
                                optionTwosBarLength = 100/2
                                optionThreesBarLength = 0
                                optionFoursBarLength = 0
                                optionFivesBarLength = 0
                                optionSixesBarLength = 0
                            } else if (pollData[index].totalNumberOfOptions == "Three") {
                                optionOnesBarLength = 100/3
                                optionTwosBarLength = 100/3
                                optionThreesBarLength = 100/3
                                optionFoursBarLength = 0
                                optionFivesBarLength = 0
                                optionSixesBarLength = 0
                            } else if (pollData[index].totalNumberOfOptions == "Four") {
                                optionOnesBarLength = 100/4
                                optionTwosBarLength = 100/4
                                optionThreesBarLength = 100/4
                                optionFoursBarLength = 100/4
                                optionFivesBarLength = 0
                                optionSixesBarLength = 0
                            } else if (pollData[index].totalNumberOfOptions == "Five") {
                                optionOnesBarLength = 100/5
                                optionTwosBarLength = 100/5
                                optionThreesBarLength = 100/5
                                optionFoursBarLength = 100/5
                                optionFivesBarLength = 100/5
                                optionSixesBarLength = 0
                            } else if (pollData[index].totalNumberOfOptions == "Six") {
                                optionOnesBarLength = 100/6
                                optionTwosBarLength = 100/6
                                optionThreesBarLength = 100/6
                                optionFoursBarLength = 100/6
                                optionFivesBarLength = 100/6
                                optionSixesBarLength = 100/6
                            }
                        }
                    }
                    console.log("poll data")
                    console.log(pollData[index])
                    async function getPfpImageForPollWithAsync() {
                        var imageData = pollData
                        
                        var tempSectionsTemp = {data: [{pollTitle: pollData[index].pollTitle, pollSubTitle: pollData[index].pollSubTitle, optionOne: pollData[index].optionOne, optionOnesColor: pollData[index].optionOnesColor, optionOnesVotes: pollData[index].optionOnesVotes, optionOnesBarLength: optionOnesBarLength, optionTwo: pollData[index].optionTwo, optionTwosColor: pollData[index].optionTwosColor, optionTwosVotes: pollData[index].optionTwosVotes, optionTwosBarLength: optionTwosBarLength, optionThree: pollData[index].optionThree, optionThreesColor: pollData[index].optionThreesColor, optionThreesVotes: pollData[index].optionThreesVotes, optionThreesBarLength: optionThreesBarLength, optionFour: pollData[index].optionFour, optionFoursColor: pollData[index].optionFoursColor, optionFoursVotes: pollData[index].optionFoursVotes, optionFoursBarLength: optionFoursBarLength, optionFive: pollData[index].optionFive, optionFivesColor: pollData[index].optionFivesColor, optionFivesVotes: pollData[index].optionFivesVotes, optionFivesBarLength:optionFivesBarLength, optionSix: pollData[index].optionSix, optionSixesColor: pollData[index].optionSixesColor, optionSixesVotes: pollData[index].optionSixesVotes, optionSixesBarLength: optionSixesBarLength, totalNumberOfOptions: pollData[index].totalNumberOfOptions, pollUpOrDownVotes: pollData[index].pollUpOrDownVotes, pollId: pollData[index]._id, votedFor: pollData[index].votedFor, postNum: index, pollComments: pollData[index].pollComments, creatorName: pollData[index].creatorName, creatorDisplayName: pollData[index].creatorDisplayName, datePosted: pollData[index].datePosted}]}
                        if (pollData[index].pollUpOrDownVoted == "UpVoted") {
                            console.log("UpVoted")
                            upVotedPolls.push(pollData[index]._id)
                            setUpVotesPolls(upVotedPolls)
                            initialUpVotedPolls.push(pollData[index]._id)
                            setInitialUpVotesPolls(initialUpVotedPolls)
                        } else if (pollData[index].pollUpOrDownVoted == "DownVoted") {
                            console.log("DownVoted")
                            downVotedPolls.push(pollData[index]._id)
                            setDownVotesPolls(downVotedPolls)
                            initialDownVotedPolls.push(pollData[index]._id)
                            setInitialDownVotesPolls(initialDownVotedPolls)
                        } else {
                            console.log("Neither")
                            neitherVotedPolls.push(pollData[index]._id)
                            setNeitherVotesPolls(neitherVotedPolls)
                            initialNeitherVotedPolls.push(pollData[index]._id)
                            setInitialNeitherVotesPolls(initialNeitherVotedPolls)
                        }
                        tempSections.push(tempSectionsTemp)
                        itemsProcessed++;
                        if(itemsProcessed === pollData.length) {
                            //console.log(tempSections) removed since floods output
                            setChangeSectionsThree(tempSections)
                            setLoadingPostsPoll(false)
                            console.log(upVotesPolls)
                            console.log(downVotesPolls)
                            console.log(neitherVotesPolls)
                        }
                    }
                    getPfpImageForPollWithAsync()
                });
            }

            const url = serverUrl + '/user/searchforpollposts';

            setLoadingPostsPoll(true)
            axios.post(url, toSendProfileName).then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                    setLoadingPostsPoll(false)
                    console.log(status)
                    console.log(message)
                } else {
                    layoutPollPosts({data});
                    console.log(status)
                    console.log(message)
                }
                //setSubmitting(false);

            }).catch(error => {
                console.log(error);
                //setSubmitting(false);
                setLoadingPostsPoll(false)
                handleMessage("An error occured. Try checking your network connection and retry.");
            })
        } else {
            setSelectedPostFormat("Three")
            setFormatThreeText("Users Poll Posts:") 
        }
    }

    const changeToFour = () => {
        if (loadingPostsThread == false) {
            cancelTokenPostFormatOne.cancel()
            cancelTokenPostFormatTwo.cancel()
            cancelTokenPostFormatThree.cancel()
            cancelTokenPostFormatFive.cancel()
            setChangeSectionsFour()
            setSelectedPostFormat("Four")
            setFormatFourText("This user has no Thread posts.")
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
            handleMessage(null, null, null);
            const layoutThreadPosts = (data) => {
                setFormatFourText("Recent Thread Posts:")
                var threadData = data.data
                console.log("The Thread data")
                console.log(threadData)
                console.log(threadData.length)
                var tempSections = []
                var itemsProcessed = 0;
                threadData.forEach(function (item, index) {
                    //image in post
                    async function findImages() {
                        //
                        async function asyncFunctionForImages() {
                            if (threadData[index].threadType == "Text") {
                                const addAndPush = async () => {
                                    var tempSectionsTemp = {data: [{postNum: index, threadId: threadData[index].threadId, threadComments: threadData[index].threadComments, threadType: threadData[index].threadType, threadUpVotes: threadData[index].threadUpVotes, threadTitle: threadData[index].threadTitle, threadSubtitle: threadData[index].threadSubtitle, threadTags: threadData[index].threadTags, threadCategory: threadData[index].threadCategory, threadBody: threadData[index].threadBody, threadImageKey: threadData[index].threadImageKey, threadImageDescription: threadData[index].threadImageDescription, threadNSFW: threadData[index].threadNSFW, threadNSFL: threadData[index].threadNSFL, datePosted: threadData[index].datePosted, threadUpVoted: threadData[index].threadUpVoted, threadDownVoted: threadData[index].threadDownVoted, creatorDisplayName: threadData[index].creatorDisplayName, creatorName: threadData[index].creatorName, imageInThreadB64: null}]}
                                    if (threadData[index].threadUpVoted == true) {
                                        console.log("UpVoted")
                                        upVotedThreads.push(threadData[index].threadId)
                                        setUpVotesThreads(upVotedThreads)
                                        initialUpVotedThreads.push(threadData[index].threadId)
                                        setInitialUpVotesThreads(initialUpVotedThreads)
                                    } else if (threadData[index].threadDownVoted == true) {
                                        console.log("DownVoted")
                                        downVotedThreads.push(threadData[index].threadId)
                                        setDownVotesThreads(downVotedThreads)
                                        initialDownVotedThreads.push(threadData[index].threadId)
                                        setInitialDownVotesThreads(initialDownVotedThreads)
                                    } else {
                                        console.log("Neither")
                                        neitherVotedThreads.push(threadData[index].threadId)
                                        setNeitherVotesThreads(neitherVotedThreads)
                                        initialNeitherVotedThreads.push(threadData[index].threadId)
                                        setInitialNeitherVotesThreads(initialNeitherVotedThreads)
                                    }
                                    tempSections.push(tempSectionsTemp)
                                    itemsProcessed++;
                                    if(itemsProcessed === threadData.length) {
                                        setChangeSectionsFour(tempSections)  
                                        setLoadingPostsThread(false)  
                                        console.log(upVotesThreads)
                                        console.log(downVotesThreads)
                                        console.log(neitherVotesThreads)
                                    }
                                }
                                await addAndPush()
                            } else if (threadData[index].threadType == "Images") {
                                const imageInThread = await getImageWithKeyFour(threadData[index].threadImageKey)
                                const addAndPush = async () => {
                                    var imageInThreadB64 = imageInThread.data
                                    var tempSectionsTemp = {data: [{postNum: index, threadId: threadData[index].threadId, threadComments: threadData[index].threadComments, threadType: threadData[index].threadType, threadUpVotes: threadData[index].threadUpVotes, threadTitle: threadData[index].threadTitle, threadSubtitle: threadData[index].threadSubtitle, threadTags: threadData[index].threadTags, threadCategory: threadData[index].threadCategory, threadBody: threadData[index].threadBody, threadImageKey: threadData[index].threadImageKey, threadImageDescription: threadData[index].threadImageDescription, threadNSFW: threadData[index].threadNSFW, threadNSFL: threadData[index].threadNSFL, datePosted: threadData[index].datePosted, threadUpVoted: threadData[index].threadUpVoted, threadDownVoted: threadData[index].threadDownVoted, creatorDisplayName: threadData[index].creatorDisplayName, creatorName: threadData[index].creatorName, imageInThreadB64: imageInThreadB64}]}
                                    if (threadData[index].threadUpVoted == true) {
                                        console.log("UpVoted")
                                        upVotedThreads.push(threadData[index].threadId)
                                        setUpVotesThreads(upVotedThreads)
                                        initialUpVotedThreads.push(threadData[index].threadId)
                                        setInitialUpVotesThreads(initialUpVotedThreads)
                                    } else if (threadData[index].threadDownVoted == true) {
                                        console.log("DownVoted")
                                        downVotedThreads.push(threadData[index].threadId)
                                        setDownVotesThreads(downVotedThreads)
                                        initialDownVotedThreads.push(threadData[index].threadId)
                                        setInitialDownVotesThreads(initialDownVotedThreads)
                                    } else {
                                        console.log("Neither")
                                        neitherVotedThreads.push(threadData[index].threadId)
                                        setNeitherVotesThreads(neitherVotedThreads)
                                        initialNeitherVotedThreads.push(threadData[index].threadId)
                                        setInitialNeitherVotesThreads(initialNeitherVotedThreads)
                                    }
                                    tempSections.push(tempSectionsTemp)
                                    itemsProcessed++;
                                    if(itemsProcessed === threadData.length) {
                                        setChangeSectionsFour(tempSections)  
                                        setLoadingPostsThread(false)  
                                        console.log(upVotesThreads)
                                        console.log(downVotesThreads)
                                        console.log(neitherVotesThreads)
                                    }
                                }
                                await addAndPush()
                            }
                        }
                        asyncFunctionForImages()
                    }
                    findImages()
                });
            }

            const url = serverUrl + '/user/getthreadsfromprofilewithid/' + _id;

            setLoadingPostsThread(true)
            axios.get(url).then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS') {
                    setLoadingPostsThread(false)
                    handleMessage(message, status);
                    console.log(status)
                    console.log(message)
                } else {
                    layoutThreadPosts({data});
                    console.log(status)
                    console.log(message)
                }
                //setSubmitting(false);

            }).catch(error => {
                console.log(error);
                //setSubmitting(false);
                setLoadingPostsThread(false)
                handleMessage("An error occured. Try checking your network connection and retry.");
            })
        } else {
            setSelectedPostFormat("Four")
            setFormatFourText("Users Thread Posts:") 
        }
    }
    
    const changeToFive = () => {
        if (loadingPostsCategory == false) {
            cancelTokenPostFormatOne.cancel()
            cancelTokenPostFormatTwo.cancel()
            cancelTokenPostFormatThree.cancel()
            cancelTokenPostFormatFour.cancel()
            setChangeSectionsFive()
            setSelectedPostFormat("Five")
            setFormatFiveText("This user associates with no categories.")
            const layoutCategoriesFound = (data) => {
                var allData = data
                console.log(allData)
                console.log(allData.length)
                setFormatFiveText("Categories:")
                var tempSections = []
                var itemsProcessed = 0;
                allData.forEach(function (item, index) {
                    if (allData[index].imageKey !== "") {
                        if (index+1 <= userLoadMax) {      
                            async function asyncFunctionForImages() {
                                const imageInCategory = await getImageWithKeyFive(allData[index].imageKey)
                                const imageB64 = imageInCategory.data
                                var tempSectionsTemp = {data: [{categoryTitle: allData[index].categoryTitle, categoryDescription: allData[index].categoryDescription, members: allData[index].members, categoryTags: allData[index].categoryTags, image: imageB64, NSFW: allData[index].NSFW, NSFL: allData[index].NSFL, datePosted: allData[index].datePosted}]}
                                tempSections.push(tempSectionsTemp)
                                itemsProcessed++;
                                if(itemsProcessed === allData.length) {
                                    setChangeSectionsFive(tempSections)
                                    setLoadingPostsCategory(false)
                                }
                            }
                            asyncFunctionForImages()
                        }
                    } else {
                        if (index+1 <= userLoadMax) {
                            var tempSectionsTemp = {data: [{categoryTitle: allData[index].categoryTitle, categoryDescription: allData[index].categoryDescription, members: allData[index].members, categoryTags: allData[index].categoryTags, image: null, NSFW: allData[index].NSFW, NSFL: allData[index].NSFL, datePosted: allData[index].datePosted}]}
                            tempSections.push(tempSectionsTemp)
                            itemsProcessed++;
                            if(itemsProcessed === allData.length) {
                                setChangeSectionsFive(tempSections)
                                setLoadingPostsCategory(false)
                            }
                        }
                    }
                });
            }

            handleMessage(null);
            const url = serverUrl + '/user/findcategorywithuserid/' + _id;
            setLoadingPostsCategory(true)
            axios.get(url).then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                    setLoadingPostsCategory(false)
                } else {
                    console.log(data)
                    layoutCategoriesFound(data)
                    handleMessage("Search Complete", "SUCCESS");
                    //persistLogin({...data[0]}, message, status);
                }

            }).catch(error => {
                console.log(error);
                setLoadingPostsCategory(false)
                handleMessage("An error occured. Try checking your network connection and retry.");
            })
        } else {
            setSelectedPostFormat("Five")
            setFormatFiveText("Categories:")
        }
    }

    const getProfilePicture = () => {
        const url = serverUrl + '/user/getProfilePic/' + storedCredentials.name;

        axios.get(url).then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                console.log('GETTING PROFILE PICTURE FOR PROFILESCREEN.JS WAS NOT A SUCCESS')
                console.log(status)
                console.log(message)
            } else {
                console.log(status)
                console.log(message)
                axios.get(`https://nameless-dawn-41038.herokuapp.com/getImage/${data}`)
                .then((response) => {
                    const result = response.data;
                    const {message, status, data} = result;
                    console.log(status)
                    console.log(message)
                    console.log(data)
                    //set image
                    if (message == 'No profile image.' && status == 'FAILED') {
                        console.log('Setting logo to SocialSquare logo')
                        setProfilePictureUri(SocialSquareLogo_B64_png)
                        setChangingPfp(false)
                        const temp = allCredentialsStoredList;
                        temp[storedCredentials.indexLength].profilePictureUri = SocialSquareLogo_B64_png;
                        setAllCredentialsStoredList(temp)
                        AsyncStorage.setItem('socialSquare_AllCredentialsList', JSON.stringify(temp));
                    } else if (data) {
                        //convert back to image
                        console.log('Setting logo in tab bar to profile logo')
                        var base64Icon = `data:image/jpg;base64,${data}`
                        setProfilePictureUri(base64Icon)
                        setChangingPfp(false)
                        const temp = allCredentialsStoredList;
                        temp[storedCredentials.indexLength].profilePictureUri = base64Icon;
                        setAllCredentialsStoredList(temp)
                        AsyncStorage.setItem('socialSquare_AllCredentialsList', JSON.stringify(temp));
                    } else {
                        console.log('Setting logo to SocialSquare logo')
                        setProfilePictureUri(SocialSquareLogo_B64_png)
                        setChangingPfp(false)
                        const temp = allCredentialsStoredList;
                        temp[storedCredentials.indexLength].profilePictureUri = SocialSquareLogo_B64_png;
                        setAllCredentialsStoredList(temp)
                        AsyncStorage.setItem('socialSquare_AllCredentialsList', JSON.stringify(temp));
                    }
                })
                .catch(function (error) {
                    console.log("Image not recieved")
                    console.log(error);
                });
            }
            //setSubmitting(false);

        }).catch(error => {
            console.log(error);
        })
    }

    const uploadPFP = (image) => {
        const formData = new FormData();
        formData.append("image", {
            name: image.uri.substr(image.uri.lastIndexOf('/') + 1),
            uri: image.uri,
            type: 'image/jpg'
        })
        formData.append("userId", _id)

        const url = serverUrl + '/user/postProfileImage';
        setChangingPfp(true)
        axios.post(url, formData, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }}).then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                handleMessage(message, status);
                setChangingPfp(false)
                console.log(message)
                alert("An error occured while changing your profile picture.")
            } else {
                console.log(data)
                handleMessage(message, status)
                getProfilePicture()
                //persistLogin({...data[0]}, message, status);
            }

        }).catch(error => {
            console.log(error);
            setChangingPfp(false);
            handleMessage("An error occured. Try checking your network connection and retry.");
        })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        
        if (!result.cancelled) {
            console.log(result)
            uploadPFP(result)
        }
    };

        
    const OpenImgLibrary = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work! Go into Settings and allow SocialSquare to use camera roll permissions to get this to work.');
            } else {
                pickImage()
            }
        }
    }

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        // Get data here
        setRefreshing(false)
        
    })

    const isFocused = useIsFocused()

    const handleScroll = (event) => {
        var scrollY = event.nativeEvent.contentOffset.y
        if (scrollY < 550) {
            Animated.timing(TopProfileBarFadeAnim, {
                toValue: 0,
                duration: 1,
                useNativeDriver: 'true'
            }).start()
        } else {
            Animated.timing(TopProfileBarFadeAnim, {
                toValue: 1,
                duration: 1,
                useNativeDriver: 'true'
            }).start()
        }
    }

    const checkForCameraPermissions = async () => {
        navigation.navigate('TakeImage_Camera', {locationToGoTo: 'Welcome'})
    }

    useEffect(() => {
        if (imageFromRoute != null) {
            console.log('Image received from imageFromRoute')
            console.log(imageFromRoute)
            uploadPFP(imageFromRoute)
            navigation.setParams({imageFromRoute: null})
        }
    })

    const ChangePfp = () => {
        PfpPickerActionMenu.current.show();
    }

    async function savePicture(imageTag) {
        if (await MediaLibrary.isAvailableAsync() == true) {
            if (await MediaLibrary.getPermissionsAsync == 'all' || 'limited') {
                MediaLibrary.saveToLibraryAsync(imageTag)
            } else {
                if (await MediaLibrary.requestPermissionsAsync() == 'granted') {
                    if (Platform.OS == 'ios') {
                        MediaLibrary.saveToLibraryAsync(imageTag)
                    } else {
                        alert('Android saving images is coming soon')
                    }
                } else {
                    alert('Photo library write permissions have not been enabled. Please enable them in your settings to use this feature.')
                }
            }
        } else {
            alert('This device cannot save images to the photo library')
        }
    };

    const GetBadgeIcon = (badge) => {
        return (
            <View style={{width: 25, height: 25, marginHorizontal: 3, marginTop: 6, marginBottom: 12}}>
                {badge == 'onSignUpBadge' ?
                    <EvilIcons name="trophy" size={35} color={colors.tertiary} style={{marginLeft: -5, marginTop: -1}}/>
                :
                    <AntDesign name="questioncircleo" size={25} color={colors.tertiary}/>
                }
            </View>
        )
    }
    return(
        <>
            <StatusBar style={colors.StatusBarColor}/>
            {storedCredentials ?
                <>
                    <>
                        <ActionSheet
                            ref={PfpSaveActionMenu}
                            title={'Profile Picture Options'}
                            options={PfpSaveActionMenuOptions}
                            // Define cancel button index in the option array
                            // This will take the cancel option in bottom
                            // and will highlight it
                            cancelButtonIndex={1}
                            // Highlight any specific option
                            //destructiveButtonIndex={2}
                            onPress={(index) => {
                                if (index == 0) {
                                    savePicture(profilePictureUri)
                                } else if (index == 1) {
                                    console.log('Closing profile picture picker menu')
                                }
                            }}
                        />
                    </>
                    <>
                        <ActionSheet
                            ref={PfpPickerActionMenu}
                            title={'How would you like to choose your profile picture?'}
                            options={PfpPickerActionMenuOptions}
                            // Define cancel button index in the option array
                            // This will take the cancel option in bottom
                            // and will highlight it
                            cancelButtonIndex={2}
                            // Highlight any specific option
                            //destructiveButtonIndex={2}
                            onPress={(index) => {
                                if (index == 0) {
                                    checkForCameraPermissions()
                                } else if (index == 1) {
                                    OpenImgLibrary()
                                } else if (index == 2) {
                                    console.log('Closing action picker')
                                }
                            }}
                        />
                    </>
                    <Animated.View style={{paddingTop: StatusBarHeight - 10, backgroundColor: colors.primary, borderColor: colors.borderColor, borderBottomWidth: 1, alignItems: 'center', opacity: TopProfileBarFadeAnim, zIndex: TopProfileBarFadeAnim.interpolate({inputRange: [0, 1], outputRange: [-10, 100]}), position: 'absolute', top: 0, width: '100%', flexDirection: 'column'}}>
                        <>
                            {backButtonHidden == false &&
                                <View style={{position: 'absolute', top: StatusBarHeight, left: 10}}>
                                    <TouchableOpacity style={{marginRight: '75.5%'}} disabled={PageElementsState} onPress={() => {navigation.goBack()}}>
                                        <Image
                                            source={require('../assets/app_icons/back_arrow.png')}
                                            style={{ width: 40, height: 40, tintColor: colors.tertiary}}
                                            resizeMode="contain"
                                            resizeMethod="resize"
                                        />
                                    </TouchableOpacity>
                                </View>
                            }
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableOpacity onPress={() => {setShowAccountSwitcher(true)}}>
                                    <PageTitle style={{fontSize: 24}} welcome={true}>{displayName || name || "Couldn't get name"}</PageTitle>
                                </TouchableOpacity>
                                <Avatar style={{width: 40, height: 40}} resizeMode="cover" source={{uri: profilePictureUri}}/>
                            </View>
                            <View style={{position: 'absolute', right: 10, top: StatusBarHeight}}>
                                <TouchableOpacity disabled={PageElementsState} onPress={goToSettingsScreen}>
                                    <Image
                                        source={require('../assets/app_icons/settings.png')}
                                        style={{ width: 40, height: 40, tintColor: colors.tertiary}}
                                        resizeMode="contain"
                                        resizeMethod="resize"
                                    />
                                </TouchableOpacity>
                            </View>
                        </>
                        <ProfilePostsSelectionView style={{height: 50, borderBottomWidth: 0}}>
                            <ProfilePostsSelectionBtns onPress={changeToGrid}>
                                <Icon name="grid" color={colors.tertiary} size={30}/>
                            </ProfilePostsSelectionBtns>
                            <ProfilePostsSelectionBtns onPress={changeToFeatured}>
                                <FontAwesomeFive name="user-tag" color={colors.tertiary} size={30}/>
                            </ProfilePostsSelectionBtns>
                            <Animated.View style={{backgroundColor: colors.tertiary, height: 3, width: '50%', position: 'absolute', bottom: 0, transform: [{translateX: GridOrTagLineTranslateX}], zIndex: 1002}}/>
                            <View style={{backgroundColor: colors.borderColor, height: 3, width: '100%', position: 'absolute', bottom: 0}}/>
                        </ProfilePostsSelectionView>
                    </Animated.View>
                    <ScrollView
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        onScroll={handleScroll}
                        scrollEventThrottle={1}
                        nestedScrollEnabled={true}
                    >
                        <WelcomeContainer style={{backgroundColor: colors.primary}}>
                            <ProfileHorizontalView topItems={true}>
                                <ViewHider viewHidden={backButtonHidden}>
                                    <TouchableOpacity style={{marginRight: '65%'}} disabled={PageElementsState} onPress={() => {navigation.goBack()}}>
                                        <Image
                                            source={require('../assets/app_icons/back_arrow.png')}
                                            style={{ width: 40, height: 40, tintColor: colors.tertiary}}
                                            resizeMode="contain"
                                            resizeMethod="resize"
                                        />
                                    </TouchableOpacity>
                                </ViewHider>
                                <ViewHider viewHidden={!backButtonHidden}>
                                    <View style={{minWidth: 40, marginRight: '65%'}}/>
                                </ViewHider>
                                <TouchableOpacity disabled={PageElementsState} onPress={goToSettingsScreen}>
                                    <Image
                                        source={require('../assets/app_icons/settings.png')}
                                        style={{ width: 40, height: 40, tintColor: colors.tertiary}}
                                        resizeMode="contain"
                                        resizeMethod="resize"
                                    />
                                </TouchableOpacity>
                            </ProfileHorizontalView>
                            <ProfInfoAreaImage>
                                {loadingPfp == false && (
                                    <View style={{alignSelf: 'center', alignContent: 'center'}}>
                                        <TouchableOpacity onLongPress={() => {PfpSaveActionMenu.current.show()}}>
                                            <Avatar resizeMode="cover" source={{uri: profilePictureUri}}/>
                                        </TouchableOpacity>
                                        {changingPfp == false && (
                                            <TouchableOpacity onPress={() => {ChangePfp()}}>
                                                <SubTitle style={{marginBottom: 0, color: darkestBlue, textAlign: 'center'}}>Change</SubTitle>
                                            </TouchableOpacity>
                                        )}
                                        {changingPfp == true && (
                                            <ActivityIndicator size="large" color={brand} style={{marginBottom: 20}} />  
                                        )}
                                    </View>
                                )}
                                {loadingPfp == true && (
                                    <View style={{alignSelf: 'center', alignContent: 'center'}}>
                                        <ActivityIndicator size={10} color={brand} style={{marginBottom: 20, padding: 40, borderColor: darkestBlue, borderWidth: 3, borderRadius: 150}} />  
                                        <SubTitle style={{marginBottom: 0, color: darkestBlue, textAlign: 'center'}}></SubTitle>
                                    </View>
                                )}
                                <TouchableOpacity onPress={() => {setShowAccountSwitcher(true)}}>
                                    <PageTitle welcome={true}>{displayName || name || "Couldn't get name"}</PageTitle>
                                </TouchableOpacity>
                                <SubTitle style={{color: colors.tertiary}}>{"@"+name}</SubTitle>
                                <ProfileBadgesView onPress={() => navigation.navigate("AccountBadges")}>
                                    <ProfileBadgeItemUnderline style={{backgroundColor: colors.tertiary}}/>
                                    {GetBadgeIcon(badges[0])}
                                    <ProfileBadgeItemUnderline style={{backgroundColor: colors.tertiary, left: 31}}/>
                                    {GetBadgeIcon(badges[1])}
                                    <ProfileBadgeItemUnderline style={{backgroundColor: colors.tertiary, left: 62}}/>
                                    {GetBadgeIcon(badges[2])}
                                    <ProfileBadgeItemUnderline style={{backgroundColor: colors.tertiary, left: 93}}/>
                                    {GetBadgeIcon(badges[3])}
                                    <ProfileBadgeItemUnderline style={{backgroundColor: colors.tertiary, left: 124}}/>
                                    {GetBadgeIcon(badges[4])}
                                </ProfileBadgesView>
                                <SubTitle style={{color: colors.tertiary}} bioText={true} > Bio will go here </SubTitle>
                            </ProfInfoAreaImage>
                            <ProfileHorizontalView>
                                <ProfileHorizontalViewItem profLeftIcon={true}>
                                    <TouchableOpacity onPress={() => {navigation.navigate('ProfileStats', {name: name, followers: followers, type: 'Followers'})}} style={{alignItems: 'center'}}>
                                        <SubTitle style={{color: colors.tertiary}} welcome={true}> Followers </SubTitle>
                                        <ProfIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/114-user.png')}/>
                                        <SubTitle style={{color: colors.tertiary}} welcome={true}> 0 </SubTitle>
                                    </TouchableOpacity>
                                </ProfileHorizontalViewItem>
                                <ProfileHorizontalViewItem profCenterIcon={true}>
                                    <TouchableOpacity onPress={() => {navigation.navigate('ProfileStats', {name: name, followers: following, type: 'Following'})}} style={{alignItems: 'center'}}>
                                        <SubTitle style={{color: colors.tertiary}} welcome={true}> Following </SubTitle>
                                        <ProfIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/115-users.png')}/>
                                        <SubTitle style={{color: colors.tertiary}} welcome={true}> 0 </SubTitle>
                                    </TouchableOpacity>
                                </ProfileHorizontalViewItem>
                                <ProfileHorizontalViewItem profRightIcon={true}>
                                    <SubTitle style={{color: colors.tertiary}} welcome={true}> Likes </SubTitle>
                                    <ProfIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/219-heart.png')}/>
                                    <SubTitle style={{color: colors.tertiary}} welcome={true}> 0 </SubTitle>
                                </ProfileHorizontalViewItem>
                            </ProfileHorizontalView>
                            <ProfilePostsSelectionView style={{position: 'relative', borderBottomWidth: 0}}>
                                <ProfilePostsSelectionBtns onPress={changeToGrid}>
                                    <Icon name="grid" color={colors.tertiary} size={45}/>
                                </ProfilePostsSelectionBtns>
                                <ProfilePostsSelectionBtns onPress={changeToFeatured}>
                                    <FontAwesomeFive name="user-tag" color={colors.tertiary} size={45}/>
                                </ProfilePostsSelectionBtns>
                                <Animated.View style={{backgroundColor: colors.tertiary, height: 3, width: '50%', position: 'absolute', bottom: 0, transform: [{translateX: GridOrTagLineTranslateX}], zIndex: 2}}/>
                                <View style={{backgroundColor: colors.borderColor, height: 3, width: '100%', position: 'absolute', bottom: 0}}/>
                            </ProfilePostsSelectionView>
                            <ProfileSelectMediaTypeHorizontalView>
                                <ProfileSelectMediaTypeItem onPress={changeToOne}>
                                    <ProfileSelectMediaTypeIconsBorder style={{backgroundColor: colors.borderColor, borderColor: selectedPostFormat == 'One' ? colors.brand : colors.borderColor}}>
                                        <ProfileSelectMediaTypeIcons style={{tintColor: selectedPostFormat == 'One' ? colors.brand : colors.tertiary, margin: 5}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/015-images.png')}/>
                                    </ProfileSelectMediaTypeIconsBorder>
                                </ProfileSelectMediaTypeItem>
                                <ProfileSelectMediaTypeItem onPress={changeToTwo}>
                                    <ProfileSelectMediaTypeIconsBorder style={{backgroundColor: colors.borderColor, borderColor: selectedPostFormat == 'Two' ? colors.brand : colors.borderColor}}>
                                        <ProfileSelectMediaTypeIcons style={{tintColor: selectedPostFormat == 'Two' ? colors.brand : colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/020-film.png')}/>
                                    </ProfileSelectMediaTypeIconsBorder>                        
                                </ProfileSelectMediaTypeItem>
                                <ProfileSelectMediaTypeItem onPress={changeToThree}>
                                    <ProfileSelectMediaTypeIconsBorder style={{backgroundColor: colors.borderColor, borderColor: selectedPostFormat == 'Three' ? colors.brand : colors.borderColor}}>     
                                        <ProfileSelectMediaTypeIcons style={{tintColor: selectedPostFormat == 'Three' ? colors.brand : colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/157-stats-bars.png')}/>
                                    </ProfileSelectMediaTypeIconsBorder>     
                                </ProfileSelectMediaTypeItem>
                                <ProfileSelectMediaTypeItem onPress={changeToFour}>
                                    <ProfileSelectMediaTypeIconsBorder style={{backgroundColor: colors.borderColor, borderColor: selectedPostFormat == 'Four' ? colors.brand : colors.borderColor}}>     
                                        <ProfileSelectMediaTypeIcons style={{height: '80%', width: '80%', tintColor: selectedPostFormat == 'Four' ? colors.brand : colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/007-pencil2.png')}/>
                                    </ProfileSelectMediaTypeIconsBorder>     
                                </ProfileSelectMediaTypeItem>
                                <ProfileSelectMediaTypeItem onPress={changeToFive}>
                                    <ProfileSelectMediaTypeIconsBorder style={{backgroundColor: colors.borderColor, borderColor: selectedPostFormat == 'Five' ? colors.brand : colors.borderColor}}>     
                                        <ProfileSelectMediaTypeIcons style={{height: '80%', width: '80%', tintColor: selectedPostFormat == 'Five' ? colors.brand : colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/093-drawer.png')}/>
                                    </ProfileSelectMediaTypeIconsBorder>     
                                </ProfileSelectMediaTypeItem>
                            </ProfileSelectMediaTypeHorizontalView>
                        </WelcomeContainer>
                        <ProfileGridPosts display={gridViewState} style={{marginBottom: 20}}>
                            {selectedPostFormat == "One" && (<SectionList
                                sections={changeSectionsOne}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item }) => <ImageItem imageKey={item.imageKey} imageB64={item.imageB64} imageTitle={item.imageTitle} imageDescription={item.imageDescription} imageUpVotes={item.imageUpVotes} imageComments={item.imageComments} creatorName={item.creatorName} creatorDisplayName={item.creatorDisplayName} creatorPfpB64={item.creatorPfpB64} datePosted={item.datePosted} postNum={item.postNum}/>}
                                ListFooterComponent={<PostLoadingSpinners selectedPostFormat={selectedPostFormat} loadingPostsImage={loadingPostsImage} loadingPostsVideo={loadingPostsVideo} loadingPostsPoll={loadingPostsPoll} loadingPostsThread={loadingPostsThread} loadingPostsCategory={loadingPostsCategory}/>}
                                ListHeaderComponent={<PostMessages selectedPostFormat={selectedPostFormat} formatOneText={formatOneText} formatTwoText={formatTwoText} formatThreeText={formatThreeText} formatFourText={formatFourText} formatFiveText={formatFiveText} colors={colors}/>}
                            />)}
                            {selectedPostFormat == "Two" && (<SectionList
                                sections={changeSectionsTwo}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item }) => <PollItem pollTitle={item.pollTitle} pollSubTitle={item.pollSubTitle} optionOne={item.optionOne} optionOnesColor={item.optionOnesColor} optionOnesVotes={item.optionOnesVotes} optionOnesBarLength={item.optionOnesBarLength} optionTwo={item.optionTwo} optionTwosColor={item.optionTwosColor} optionTwosVotes={item.optionTwosVotes} optionTwosBarLength={item.optionTwosBarLength} optionThree={item.optionThree} optionThreesColor={item.optionThreesColor} optionThreesVotes={item.optionThreesVotes} optionThreesBarLength={item.optionThreesBarLength} optionFour={item.optionFour} optionFoursColor={item.optionFoursColor} optionFoursVotes={item.optionFoursVotes} optionFoursBarLength={item.optionFoursBarLength} optionFive={item.optionFive} optionFivesColor={item.optionFivesColor} optionFivesVotes={item.optionFivesVotes} optionFivesBarLength={item.optionFivesBarLength} optionSix={item.optionSix} optionSixesColor={item.optionSixesColor} optionSixesVotes={item.optionSixesVotes} optionSixesBarLength={item.optionSixesBarLength} totalNumberOfOptions={item.totalNumberOfOptions} pollUpOrDownVotes={item.pollUpOrDownVotes} pollId={item.pollId} votedFor={item.votedFor} pollLiked={item.pollLiked} pfpB64={item.pfpB64} creatorName={item.creatorName} creatorDisplayName={item.creatorDisplayName}/>}
                                ListFooterComponent={<PostLoadingSpinners selectedPostFormat={selectedPostFormat} loadingPostsImage={loadingPostsImage} loadingPostsVideo={loadingPostsVideo} loadingPostsPoll={loadingPostsPoll} loadingPostsThread={loadingPostsThread} loadingPostsCategory={loadingPostsCategory}/>}
                                ListHeaderComponent={<PostMessages selectedPostFormat={selectedPostFormat} formatOneText={formatOneText} formatTwoText={formatTwoText} formatThreeText={formatThreeText} formatFourText={formatFourText} formatFiveText={formatFiveText} colors={colors}/>}
                            />)}
                            {selectedPostFormat == "Three" && (<SectionList
                                sections={changeSectionsThree}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item }) => <PollItem pollTitle={item.pollTitle} pollSubTitle={item.pollSubTitle} optionOne={item.optionOne} optionOnesColor={item.optionOnesColor} optionOnesVotes={item.optionOnesVotes} optionOnesBarLength={item.optionOnesBarLength} optionTwo={item.optionTwo} optionTwosColor={item.optionTwosColor} optionTwosVotes={item.optionTwosVotes} optionTwosBarLength={item.optionTwosBarLength} optionThree={item.optionThree} optionThreesColor={item.optionThreesColor} optionThreesVotes={item.optionThreesVotes} optionThreesBarLength={item.optionThreesBarLength} optionFour={item.optionFour} optionFoursColor={item.optionFoursColor} optionFoursVotes={item.optionFoursVotes} optionFoursBarLength={item.optionFoursBarLength} optionFive={item.optionFive} optionFivesColor={item.optionFivesColor} optionFivesVotes={item.optionFivesVotes} optionFivesBarLength={item.optionFivesBarLength} optionSix={item.optionSix} optionSixesColor={item.optionSixesColor} optionSixesVotes={item.optionSixesVotes} optionSixesBarLength={item.optionSixesBarLength} totalNumberOfOptions={item.totalNumberOfOptions} pollUpOrDownVotes={item.pollUpOrDownVotes} pollId={item.pollId} votedFor={item.votedFor} pfpB64={item.pfpB64} creatorName={item.creatorName} creatorDisplayName={item.creatorDisplayName} postNum={item.postNum} datePosted={item.datePosted} pollComments={item.pollComments}/>}
                                ListFooterComponent={<PostLoadingSpinners selectedPostFormat={selectedPostFormat} loadingPostsImage={loadingPostsImage} loadingPostsVideo={loadingPostsVideo} loadingPostsPoll={loadingPostsPoll} loadingPostsThread={loadingPostsThread} loadingPostsCategory={loadingPostsCategory}/>}
                                ListHeaderComponent={<PostMessages selectedPostFormat={selectedPostFormat} formatOneText={formatOneText} formatTwoText={formatTwoText} formatThreeText={formatThreeText} formatFourText={formatFourText} formatFiveText={formatFiveText} colors={colors}/>}
                            />)}
                            {selectedPostFormat == "Four" && (<SectionList
                                sections={changeSectionsFour}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item }) => <ThreadItems postNum={item.postNum} threadId={item.threadId} threadComments={item.threadComments} threadType={item.threadType} threadUpVotes={item.threadUpVotes} threadTitle={item.threadTitle} threadSubtitle={item.threadSubtitle} threadTags={item.threadTags} threadCategory={item.threadCategory} threadBody={item.threadBody} threadImageKey={item.threadImageKey} threadImageDescription={item.threadImageDescription} threadNSFW={item.threadNSFW} threadNSFL={item.threadNSFL} datePosted={item.datePosted} threadUpVoted={item.threadUpVoted} threadDownVoted={item.threadDownVoted} creatorDisplayName={item.creatorDisplayName} creatorName={item.creatorName} creatorImageB64={item.creatorImageB64} imageInThreadB64={item.imageInThreadB64}/>}
                                ListFooterComponent={<PostLoadingSpinners selectedPostFormat={selectedPostFormat} loadingPostsImage={loadingPostsImage} loadingPostsVideo={loadingPostsVideo} loadingPostsPoll={loadingPostsPoll} loadingPostsThread={loadingPostsThread} loadingPostsCategory={loadingPostsCategory}/>}
                                ListHeaderComponent={<PostMessages selectedPostFormat={selectedPostFormat} formatOneText={formatOneText} formatTwoText={formatTwoText} formatThreeText={formatThreeText} formatFourText={formatFourText} formatFiveText={formatFiveText} colors={colors}/>}
                            />)}
                            {selectedPostFormat == "Five" && (<SectionList
                                sections={changeSectionsFive}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item }) => <CategoryItem categoryTitle={item.categoryTitle} categoryDescription={item.categoryDescription} members={item.members} categoryTags={item.categoryTags} image={item.image} NSFW={item.NSFW} NSFL={item.NSFL} datePosted={item.datePosted}/>}
                                ListFooterComponent={<PostLoadingSpinners selectedPostFormat={selectedPostFormat} loadingPostsImage={loadingPostsImage} loadingPostsVideo={loadingPostsVideo} loadingPostsPoll={loadingPostsPoll} loadingPostsThread={loadingPostsThread} loadingPostsCategory={loadingPostsCategory}/>}
                                ListHeaderComponent={<PostMessages selectedPostFormat={selectedPostFormat} formatOneText={formatOneText} formatTwoText={formatTwoText} formatThreeText={formatThreeText} formatFourText={formatFourText} formatFiveText={formatFiveText} colors={colors}/>}
                            />)}
                        </ProfileGridPosts>
                        <ProfileFeaturedPosts display={featuredViewState}>
                            <SubTitle style={{color: colors.tertiary}} profNoPosts={true}>
                                Features don't work yet...
                            </SubTitle>
                        </ProfileFeaturedPosts>
                    </ScrollView>
                </>
            :
                <View style={{flex: 1, justifyContent: 'center', marginHorizontal: '2%'}}>
                    <Text style={{color: colors.tertiary, fontSize: 20, textAlign: 'center', marginBottom: 20}}>Please login to access your profile screen</Text>
                    <StyledButton onPress={() => {navigation.navigate('ModalLoginScreen', {modal: true})}}>
                        <ButtonText> Login </ButtonText>
                    </StyledButton>
                    <StyledButton style={{backgroundColor: colors.primary, color: colors.tertiary}} signUpButton={true} onPress={() => navigation.navigate('ModalSignupScreen', {modal: true, Modal_NoCredentials: true})}>
                            <ButtonText signUpButton={true} style={{color: colors.tertiary, top: -9.5}}> Signup </ButtonText>
                    </StyledButton>
                    <StyledButton style={{backgroundColor: colors.primary, color: colors.tertiary}} signUpButton={true} onPress={goToSettingsScreen}>
                            <ButtonText signUpButton={true} style={{color: colors.tertiary, top: -9.5}}> Settings </ButtonText>
                    </StyledButton>
                </View>
            }
        </>
    );
}

export default Welcome;

const PostLoadingSpinners = ({selectedPostFormat, loadingPostsImage, loadingPostsVideo, loadingPostsPoll, loadingPostsThread, loadingPostsCategory}) => {
    return(
        <>
            {selectedPostFormat == "One" && (
                <View>
                    {loadingPostsImage == true && (
                        <ActivityIndicator size="large" color={brand} style={{marginBottom: 20}} />  
                    )}
                </View>
            )}
            {selectedPostFormat == "Two" && (
                <View>
                    {loadingPostsVideo == true && (
                        <ActivityIndicator size="large" color={brand} style={{marginBottom: 20}} />  
                    )}
                </View>
            )}
            {selectedPostFormat == "Three" && (
                <View>
                    {loadingPostsPoll == true && (
                        <ActivityIndicator size="large" color={brand} style={{marginBottom: 20}} />  
                    )}
                </View>
            )}
            {selectedPostFormat == "Four" && (
                <View>
                    {loadingPostsThread == true && (
                        <ActivityIndicator size="large" color={brand} style={{marginBottom: 20}} />  
                    )}
                </View>
            )}
            {selectedPostFormat == "Five" && (
                <View>
                    {loadingPostsCategory == true && (
                        <ActivityIndicator size="large" color={brand} style={{marginBottom: 20}} />  
                    )}
                </View>
            )}
        </>
    )
}

const PostMessages = ({selectedPostFormat, formatOneText, formatTwoText, formatThreeText, formatFourText, formatFiveText, colors}) => {
    return (
        <>
            {selectedPostFormat == "One" && (
                <SubTitle style={{color: colors.tertiary}} profNoPosts={true}>
                    {formatOneText}
                </SubTitle>
            )}
            {selectedPostFormat == "Two" && (
                <SubTitle style={{color: colors.tertiary}} profNoPosts={true}>
                    {formatTwoText}
                </SubTitle>
            )}
            {selectedPostFormat == "Three" && (
                <SubTitle style={{color: colors.tertiary}} profNoPosts={true}>
                    {formatThreeText}
                </SubTitle>
            )}
            {selectedPostFormat == "Four" && (
                <SubTitle style={{color: colors.tertiary}} profNoPosts={true}>
                    {formatFourText}
                </SubTitle>
            )}
            {selectedPostFormat == "Five" && (
                <SubTitle style={{color: colors.tertiary}} profNoPosts={true}>
                    {formatFiveText}
                </SubTitle>
            )}
        </>
    );
}