import React, { useContext, useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesomeFive from 'react-native-vector-icons/FontAwesome5';

global.Buffer = global.Buffer || require('buffer').Buffer

import nacl from 'tweet-nacl-react-native-expo'

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
    ViewHider,
    ProfileOptionsView,
    ProfileOptionsViewButtons,
    ProfileOptionsViewButtonsText,
    ProfileOptionsViewText,
    ProfileOptionsViewSubtitleText,
    ReportProfileOptionsView,
    ReportProfileOptionsViewButtons,
    ReportProfileOptionsViewButtonsText,
    ReportProfileOptionsViewSubtitleText,
    ReportProfileOptionsViewText,
    ProfileBadgeItemUnderline
} from './screenStylings/styling';


// Colors
const { brand, primary, tertiary, greyish, darkLight, darkestBlue, slightlyLighterPrimary, slightlyLighterGrey, descTextColor, darkest, red, orange, yellow, green, purple } = Colors;

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//axios
import axios from 'axios';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { ImageBackground, ScrollView, SectionList, View, Image, TouchableOpacity, ActivityIndicator, Animated, Text, useWindowDimensions } from 'react-native';

import {useTheme} from "@react-navigation/native"

import Constants from "expo-constants";
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png';
import * as Haptics from 'expo-haptics';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ServerUrlContext } from '../components/ServerUrlContext.js';
import ActionSheet from 'react-native-actionsheet';

const ProfilePages = ({ route, navigation }) => {
    const StatusBarHeight = Constants.statusBarHeight;
    var backButtonHidden = false
    const [PageElementsState, setPageElementsState] = useState(false)
    const { colors, dark } = useTheme();
    //context
    const { profilesName, profilesDisplayName, following, followers, totalLikes, profileKey, badges, pubId, bio, privateAccount } = route.params;
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    if (storedCredentials) {var { _id, secondId, badges: storedBadges } = storedCredentials} else {var {_id, secondId, badges: storedBadges} = {_id: "SSGUEST", secondId: "SSGUEST", badges: []}}
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
    const [changeSectionsOne, setChangeSectionsOne] = useState([])
    const [changeSectionsTwo, setChangeSectionsTwo] = useState([])
    const [changeSectionsThree, setChangeSectionsThree] = useState([])
    const [changeSectionsFour, setChangeSectionsFour] = useState([])
    const [changeSectionsFive, setChangeSectionsFive] = useState([])
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
    //3 dots menus
    const ProfileOptionsViewOpacity = useRef(new Animated.Value(0)).current;
    const ReportProfileOptionsOpacity = useRef(new Animated.Value(0)).current;
    const ReportProfile_ContentThatShouldNotBePosted_Opacity = useRef(new Animated.Value(0)).current;
    const ReportProfile_PretendingToBeSomeoneElse_Opacity = useRef(new Animated.Value(0)).current;
    const ReportProfile_MayBeUnder13_Opacity = useRef(new Animated.Value(0)).current;
    const ProfileOptionsViewOpen = useRef(false);
    const ReportProfileOptionsViewOpen = useRef(false);
    const ReportProfileOptionsView_ContentThatShouldNotBePosted_Open = useRef(false);
    const ReportProfileOptionsView_MayBeUnder13_Open = useRef(false);
    const ReportProfileOptionsView_PretendingToBeSomeoneElse_Open = useRef(false);
    const PreventTouchEventsViewZIndex = useRef(new Animated.Value(-10)).current;
    // double tap for ImageItem
    const ScaleUpvoteImageAmount = useRef(new Animated.Value(0.5)).current;
    const OpacityUpvoteImageAmount = useRef(new Animated.Value(0)).current;
    const ScaleNeutralVoteImageAmount = useRef(new Animated.Value(0.5)).current;
    const OpacityNeutralVoteImageAmount = useRef(new Animated.Value(0)).current;
    const ScaleDownvoteImageAmount = useRef(new Animated.Value(0.5)).current;
    const OpacityDownvoteImageAmount = useRef(new Animated.Value(0)).current;
    const [imageKeyToShowImageAnimation, setImageKeyToShowImageAnimation] = useState(null);
    // Grid or Tagged grids showing
    const GridOrTagLineTranslateX = useRef(new Animated.Value(0)).current;
    const deviceDimensions = useWindowDimensions();
    // Followers setup
    const [loadingFollowers, setLoadingFollowers] = useState(true);
    const [initiallyFollowed, setInitiallyFollowed] = useState()
    const [userIsFollowed, setUserIsFollowed] = useState()
    const [togglingFollow, setTogglingFollow] = useState(false)
    // Chat setup
    const [settingUpChat, setSettingUpChat] = useState(false);
    const [settingUpChatErrorMessage, setSettingUpChatErrorMessage] = useState(null);
    const [settingUpChatErrorOrigin, setSettingUpChatErrorOrigin] = useState(null);
    // Server url
    const {serverUrl, setServerUrl} = useContext(ServerUrlContext);
    //Unfollow confirmation
    const UnfollowPrivateAccountConfirmationPickerMenu = useRef(null);
    // When user is not found
    const [userNotFound, setUserNotFound] = useState(false);

    const getFollowersEtc = () => {
        const url = `${serverUrl}/user/reloadUsersDetails/${pubId}/${secondId}`;
        changeToOne()
        
        axios.get(url).then((response) => {
            const result = response.data;
            const { message, status, data } = result;

            if (status !== 'SUCCESS') {
                if (message == "User not found.") {
                    setUserNotFound(true);
                }
                handleMessage(message, status);
                console.log(status)
                console.log(message)
                setLoadingFollowers('Error')
                navigation.setParams({following: 'Error'});
            } else {
                console.log(status)
                console.log(message)
                /*setProfilesName(data.name)
                setProfilesDisplayName(data.displayName)
                setFollowers(data.followers)
                setFollowing(data.following)*/
                setInitiallyFollowed(data.userIsFollowing)
                setUserIsFollowed(data.userIsFollowing)
                //setTotalLikes(data.totalLikes)
                setLoadingFollowers(false)
            }
            //setSubmitting(false);

        }).catch(error => {
            console.log(error);
            //setSubmitting(false);
            handleMessage("An error occured. Try checking your network connection and retry.");
            setLoadingFollowers('Error')
        })
    }

    useEffect(() => {
        getFollowersEtc()
    }, [])

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
                if (storedCredentials) {
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
                        showNeutralVoteImageAnimation()
                        setUpVotesImages(upVotedImages)
                    }
                    if (downVotedImages.includes(imageId)) {
                        beforeChange = "DownVoted"
                        var index = downVotedImages.indexOf(imageId);
                        if (index > -1) {
                            downVotedImages.splice(index, 1);
                        }
                        showUpvoteImageAnimation()
                        setDownVotesImages(downVotedImages)
                    }
                    if (neitherVotedImages.includes(imageId)) {
                        beforeChange = "Neither"
                        var index = neitherVotedImages.indexOf(imageId);
                        if (index > -1) {
                            neitherVotedImages.splice(index, 1);
                        }
                        showUpvoteImageAnimation()
                        setNeitherVotesImages(neitherVotedImages)
                    }
                    changingVotedImagesArray = changingVotedImages
                    changingVotedImagesArray.push(imageId)
                    setChangingVotedImages(changingVotedImagesArray)
                    //Do rest
                    handleMessage(null, null, null);
                    const url = serverUrl + "/user/upvoteimage";

                    var toSend = { userId: _id, imageId: imageId }

                    console.log(toSend)

                    axios.post(url, toSend).then((response) => {
                        const result = response.data;
                        const { message, status, data } = result;

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
                            setImageKeyToShowImageAnimation(null)
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
                } else {
                    navigation.navigate('ModalLoginScreen', {modal: true})
                }
            }
        }
    }

    const DownVoteImage = (imageId, postNum) => {
        //Change to loading circle
        if (findingVotedImages.includes(imageId)) {

        } else {
            if (changingVotedImages.includes(imageId)) {

            } else {
                if (storedCredentials) {
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
                    const url = serverUrl + "/user/downvoteimage";

                    var toSend = { userId: _id, imageId: imageId }

                    console.log(toSend)

                    axios.post(url, toSend).then((response) => {
                        const result = response.data;
                        const { message, status, data } = result;

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
                } else {
                    navigation.navigate('ModalLoginScreen', {modal: true})
                }
            }
        }
    }

    const UpVotePoll = (pollId, postNum) => {
        //Change to loading circle
        if (findingVotedPolls.includes(pollId)) {

        } else {
            if (changingVotedPolls.includes(pollId)) {

            } else {
                if (storedCredentials) {
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
                    const url = serverUrl + "/user/upvotepoll";

                    var toSend = { userId: _id, pollId: pollId }

                    console.log(toSend)

                    axios.post(url, toSend).then((response) => {
                        const result = response.data;
                        const { message, status, data } = result;

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
                } else {
                    navigation.navigate('ModalLoginScreen', {modal: true})
                }
            }
        }
    }

    const DownVotePoll = (pollId, postNum) => {
        //Change to loading circle
        if (findingVotedPolls.includes(pollId)) {

        } else {
            if (changingVotedPolls.includes(pollId)) {

            } else {
                if (storedCredentials) {
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
                    const url = serverUrl + "/user/downvotepoll";

                    var toSend = { userId: _id, pollId: pollId }

                    console.log(toSend)

                    axios.post(url, toSend).then((response) => {
                        const result = response.data;
                        const { message, status, data } = result;

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
                } else {
                    navigation.navigate('ModalLoginScreen', {modal: true})
                }
            }
        }
    }

    const UpVoteThread = (threadId, postNum) => {
        //Change to loading circle
        if (findingVotedThreads.includes(threadId)) {

        } else {
            if (changingVotedThreads.includes(threadId)) {

            } else {
                if (storedCredentials) {
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
                    const url = serverUrl + "/user/upvotethread";

                    var toSend = { userId: _id, threadId: threadId }

                    console.log(toSend)

                    axios.post(url, toSend).then((response) => {
                        const result = response.data;
                        const { message, status, data } = result;

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
                } else {
                    navigation.navigate('ModalLoginScreen', {modal: true})
                }
            }
        }
    }

    const DownVoteThread = (threadId, postNum) => {
        //Change to loading circle
        if (findingVotedThreads.includes(threadId)) {

        } else {
            if (changingVotedThreads.includes(threadId)) {

            } else {
                if (storedCredentials) {
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
                    const url = serverUrl + "/user/downvotethread";

                    var toSend = { userId: _id, threadId: threadId }

                    console.log(toSend)

                    axios.post(url, toSend).then((response) => {
                        const result = response.data;
                        const { message, status, data } = result;

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
                } else {
                    navigation.navigate('ModalLoginScreen', {modal: true})
                }
            }
        }
    }

    const ImageItem = ({ imageKey, imageB64, imageTitle, imageDescription, imageUpVotes, imageComments, creatorName, creatorDisplayName, datePosted, postNum }) => (
        <View style={{ backgroundColor: dark ? slightlyLighterPrimary : colors.borderColor, borderRadius: 15, marginBottom: 10 }}>
            <PostsHorizontalView style={{ marginLeft: '5%', borderBottomWidth: 3, borderColor: darkLight, width: '90%', paddingBottom: 5, marginRight: '5%' }}>
                <PostsVerticalView>
                    <PostCreatorIcon source={{ uri: profileKey}}/>
                </PostsVerticalView>
                <PostsVerticalView style={{ marginTop: 9 }}>
                    <SubTitle style={{ fontSize: 20, color: brand, marginBottom: 0 }}>{creatorDisplayName}</SubTitle>
                    <SubTitle style={{ fontSize: 12, marginBottom: 0, color: colors.tertiary }}>@{creatorName}</SubTitle>
                </PostsVerticalView>
            </PostsHorizontalView>
            <PostsHorizontalView style={{ alignItems: 'center', justifyContent: 'center' }}>
                <MultiMediaPostFrame postOnProfile={true} style={{ aspectRatio: 1 / 1, backgroundColor: colors.borderColor }} onPress={() => /*navigation.navigate("ViewImagePostPage", { imageKey, imageB64, imageTitle, imageDescription, creatorName, creatorDisplayName, creatorPfpB64, datePosted })*/ onDoublePress(imageKey, postNum)}>
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 20 }} source={{ uri: imageB64 }} />
                    {imageKeyToShowImageAnimation == imageKey ?
                        <>
                            <Animated.Image style={{ width: '50%', height: '50%', resizeMode: 'cover', position: 'absolute', top: '25%', right: '25%', opacity: OpacityUpvoteImageAmount, transform: [{scale: ScaleUpvoteImageAmount}] }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                            <Animated.Image style={{ width: '50%', height: '50%', resizeMode: 'cover', position: 'absolute', top: '25%', right: '25%', opacity: OpacityNeutralVoteImageAmount, transform: [{scale: ScaleNeutralVoteImageAmount}] }} source={require('./../assets/app_icons/NeutralVoteImage.png')} />
                            <Animated.Image style={{ width: '50%', height: '50%', resizeMode: 'cover', position: 'absolute', top: '25%', right: '25%', opacity: OpacityDownvoteImageAmount, transform: [{scale: ScaleDownvoteImageAmount}] }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                        </>
                    : null}
                </MultiMediaPostFrame>
            </PostsHorizontalView>
            <ImagePostTextFrame style={{ textAlign: 'center' }}>
                <SubTitle style={{ fontSize: 20, color: colors.tertiary, marginBottom: 0 }}>{imageTitle}</SubTitle>
                <SubTitle style={{ fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageDescription}</SubTitle>
            </ImagePostTextFrame>
            <PostHorizontalView style={{ marginLeft: '5%', width: '90%', paddingVertical: 10, flex: 1, flexDirection: 'row' }}>

                {upVotesImages.includes(imageKey) && (<PostsIconFrame onPress={() => { UpVoteImage(imageKey, postNum) }}>
                    <PostsIcons style={{ flex: 1, tintColor: colors.brand }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                </PostsIconFrame>)}
                {neitherVotesImages.includes(imageKey) && (<PostsIconFrame onPress={() => { UpVoteImage(imageKey, postNum) }}>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                </PostsIconFrame>)}
                {downVotesImages.includes(imageKey) && (<PostsIconFrame onPress={() => { UpVoteImage(imageKey, postNum) }}>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                </PostsIconFrame>)}
                {changingVotedImages.includes(imageKey) && (<PostsIconFrame></PostsIconFrame>)}


                {upVotesImages.includes(imageKey) && (<PostsIconFrame>
                    {initialUpVotesImages.includes(imageKey) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes}</SubTitle>
                    )}
                    {initialNeitherVotesImages.includes(imageKey) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes + 1}</SubTitle>
                    )}
                    {initialDownVotesImages.includes(imageKey) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes + 2}</SubTitle>
                    )}
                </PostsIconFrame>)}
                {neitherVotesImages.includes(imageKey) && (<PostsIconFrame>
                    {initialNeitherVotesImages.includes(imageKey) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes}</SubTitle>
                    )}
                    {initialUpVotesImages.includes(imageKey) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes - 1}</SubTitle>
                    )}
                    {initialDownVotesImages.includes(imageKey) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes + 1}</SubTitle>
                    )}
                </PostsIconFrame>)}
                {downVotesImages.includes(imageKey) && (<PostsIconFrame>
                    {initialDownVotesImages.includes(imageKey) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes}</SubTitle>
                    )}
                    {initialNeitherVotesImages.includes(imageKey) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes - 1}</SubTitle>
                    )}
                    {initialUpVotesImages.includes(imageKey) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes - 2}</SubTitle>
                    )}
                </PostsIconFrame>)}
                {changingVotedImages.includes(imageKey) && (<PostsIconFrame>
                    <ActivityIndicator size="small" color={brand} />
                </PostsIconFrame>)}

                {downVotesImages.includes(imageKey) && (<PostsIconFrame onPress={() => { DownVoteImage(imageKey, postNum) }}>
                    <PostsIcons style={{ flex: 1, tintColor: colors.brand }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                </PostsIconFrame>)}
                {neitherVotesImages.includes(imageKey) && (<PostsIconFrame onPress={() => { DownVoteImage(imageKey, postNum) }}>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                </PostsIconFrame>)}
                {upVotesImages.includes(imageKey) && (<PostsIconFrame onPress={() => { DownVoteImage(imageKey, postNum) }}>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                </PostsIconFrame>)}
                {changingVotedImages.includes(imageKey) && (<PostsIconFrame></PostsIconFrame>)}
                <PostsIconFrame>
                </PostsIconFrame>
                <PostsIconFrame onPress={() => navigation.navigate("ViewImagePostPage", { imageKey, imageB64, imageTitle, imageDescription, creatorName, creatorDisplayName, creatorPfpB64: profileKey, datePosted })}>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/113-bubbles4.png')} />
                </PostsIconFrame>
                <PostsIconFrame>
                    <PostsIcons style={{ flex: 1, height: 30, width: 30 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/387-share2.png')} />
                </PostsIconFrame>
                <PostsIconFrame onPress={changeProfilesOptionsView}>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/img/ThreeDots.png')} />
                </PostsIconFrame>
            </PostHorizontalView>
            {postNumForMsg == postNum && (<MsgBox type={messageType}>{message}</MsgBox>)}
            <SubTitle style={{ flex: 1, alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{datePosted}</SubTitle>
            <TouchableOpacity onPress={() => navigation.navigate("ViewImagePostPage", { imageKey, imageB64, imageTitle, imageDescription, creatorName, creatorDisplayName, creatorPfpB64: profileKey, datePosted })}>
                <SubTitle style={{ flex: 1, alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageComments.length} comments</SubTitle>
            </TouchableOpacity>
        </View>
    );

    const PollItem = ({ pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollUpOrDownVotes, pollId, votedFor, postNum, pollComments, creatorName, creatorDisplayName, datePosted }) => (
        <PollPostFrame onPress={() => navigation.navigate("ViewPollPostPage", { pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: profileKey, creatorName, creatorDisplayName, datePosted })}>
            <PostsHorizontalView style={{ marginLeft: '5%', borderBottomWidth: 3, borderColor: darkLight, width: '90%', paddingBottom: 5, marginRight: '5%' }}>
                <PostsVerticalView>
                    <PostCreatorIcon source={{ uri: profileKey}} />
                </PostsVerticalView>
                <PostsVerticalView style={{ marginTop: 9 }}>
                    <SubTitle style={{ fontSize: 20, color: brand, marginBottom: 0 }}>{creatorDisplayName}</SubTitle>
                    <SubTitle style={{ fontSize: 12, marginBottom: 0, color: colors.tertiary }}>@{creatorName}</SubTitle>
                </PostsVerticalView>
            </PostsHorizontalView>
            <PollPostTitle style={{ width: '95%' }}>
                {pollTitle}
            </PollPostTitle>
            <PollPostSubTitle style={{ width: '95%', color: colors.tertiary }}>
                {pollSubTitle}
            </PollPostSubTitle>
            <AboveBarPollPostHorizontalView>
                <PollPostSubTitle style={{ width: optionOnesBarLength + '%', color: colors.tertiary }}>
                    1
                </PollPostSubTitle>
                <PollPostSubTitle style={{ width: optionTwosBarLength + '%', color: colors.tertiary }}>
                    2
                </PollPostSubTitle>
                <PollPostSubTitle style={{ width: optionThreesBarLength + '%', color: colors.tertiary }}>
                    3
                </PollPostSubTitle>
                <PollPostSubTitle style={{ width: optionFoursBarLength + '%', color: colors.tertiary }}>
                    4
                </PollPostSubTitle>
                <PollPostSubTitle style={{ width: optionFivesBarLength + '%', color: colors.tertiary }}>
                    5
                </PollPostSubTitle>
                <PollPostSubTitle style={{ width: optionSixesBarLength + '%', color: colors.tertiary }}>
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
                <PollKeyViewOne pollOptions={totalNumberOfOptions} onPress={() => navigation.navigate("ViewPollPostPage", { pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: profileKey, creatorName, creatorDisplayName, datePosted })}>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        1. {optionOne}
                    </PollPostSubTitle>
                    <PollKeysCircle circleColor={optionOnesColor}></PollKeysCircle>
                </PollKeyViewOne>
                <PollKeyViewTwo pollOptions={totalNumberOfOptions} onPress={() => navigation.navigate("ViewPollPostPage", { pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: profileKey, creatorName, creatorDisplayName, datePosted })}>
                    <PollKeysCircle circleColor={optionTwosColor}></PollKeysCircle>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        2. {optionTwo}
                    </PollPostSubTitle>
                </PollKeyViewTwo>
            </PollPostHorizontalView>

            <PollPostHorizontalView>
                <PollKeyViewThree pollOptions={totalNumberOfOptions} onPress={() => navigation.navigate("ViewPollPostPage", { pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: profileKey, creatorName, creatorDisplayName, datePosted })}>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        3. {optionThree}
                    </PollPostSubTitle>
                    <PollKeysCircle circleColor={optionThreesColor}></PollKeysCircle>
                </PollKeyViewThree>
                <PollKeyViewFour pollOptions={totalNumberOfOptions} onPress={() => navigation.navigate("ViewPollPostPage", { pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: profileKey, creatorName, creatorDisplayName, datePosted })}>
                    <PollKeysCircle circleColor={optionFoursColor}></PollKeysCircle>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        4. {optionFour}
                    </PollPostSubTitle>
                </PollKeyViewFour>
            </PollPostHorizontalView>

            <PollPostHorizontalView>
                <PollKeyViewFive pollOptions={totalNumberOfOptions} onPress={() => navigation.navigate("ViewPollPostPage", { pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: profileKey, creatorName, creatorDisplayName, datePosted })}>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        5. {optionFive}
                    </PollPostSubTitle>
                    <PollKeysCircle circleColor={optionFivesColor}></PollKeysCircle>
                </PollKeyViewFive>
                <PollKeyViewSix pollOptions={totalNumberOfOptions} onPress={() => navigation.navigate("ViewPollPostPage", { pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: profileKey, creatorName, creatorDisplayName, datePosted })}>
                    <PollKeysCircle circleColor={optionSixesColor}></PollKeysCircle>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        6. {optionSix}
                    </PollPostSubTitle>
                </PollKeyViewSix>
            </PollPostHorizontalView>
            <PostHorizontalView style={{ marginLeft: '5%', width: '90%', paddingVertical: 10, flex: 1, flexDirection: 'row', borderTopWidth: 3, borderColor: darkest }}>
                {upVotesPolls.includes(pollId) && (<PostsIconFrame onPress={() => { UpVotePoll(pollId, postNum) }}>
                    <PostsIcons style={{ flex: 1, tintColor: colors.brand }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                </PostsIconFrame>)}
                {neitherVotesPolls.includes(pollId) && (<PostsIconFrame onPress={() => { UpVotePoll(pollId, postNum) }}>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                </PostsIconFrame>)}
                {downVotesPolls.includes(pollId) && (<PostsIconFrame onPress={() => { UpVotePoll(pollId, postNum) }}>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                </PostsIconFrame>)}
                {changingVotedPolls.includes(pollId) && (<PostsIconFrame></PostsIconFrame>)}


                {upVotesPolls.includes(pollId) && (<PostsIconFrame>
                    {initialUpVotesPolls.includes(pollId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes}</SubTitle>
                    )}
                    {initialNeitherVotesPolls.includes(pollId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes + 1}</SubTitle>
                    )}
                    {initialDownVotesPolls.includes(pollId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes + 2}</SubTitle>
                    )}
                </PostsIconFrame>)}
                {neitherVotesPolls.includes(pollId) && (<PostsIconFrame>
                    {initialNeitherVotesPolls.includes(pollId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes}</SubTitle>
                    )}
                    {initialUpVotesPolls.includes(pollId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes - 1}</SubTitle>
                    )}
                    {initialDownVotesPolls.includes(pollId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes + 1}</SubTitle>
                    )}
                </PostsIconFrame>)}
                {downVotesPolls.includes(pollId) && (<PostsIconFrame>
                    {initialDownVotesPolls.includes(pollId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes}</SubTitle>
                    )}
                    {initialNeitherVotesPolls.includes(pollId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes - 1}</SubTitle>
                    )}
                    {initialUpVotesPolls.includes(pollId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes - 2}</SubTitle>
                    )}
                </PostsIconFrame>)}
                {changingVotedPolls.includes(pollId) && (<PostsIconFrame>
                    <ActivityIndicator size="small" color={brand} />
                </PostsIconFrame>)}

                {downVotesPolls.includes(pollId) && (<PostsIconFrame onPress={() => { DownVotePoll(pollId, postNum) }}>
                    <PostsIcons style={{ flex: 1, tintColor: colors.brand }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                </PostsIconFrame>)}
                {neitherVotesPolls.includes(pollId) && (<PostsIconFrame onPress={() => { DownVotePoll(pollId, postNum) }}>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                </PostsIconFrame>)}
                {upVotesPolls.includes(pollId) && (<PostsIconFrame onPress={() => { DownVotePoll(pollId, postNum) }}>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                </PostsIconFrame>)}
                {changingVotedPolls.includes(pollId) && (<PostsIconFrame></PostsIconFrame>)}
                <PostsIconFrame>
                </PostsIconFrame>
                <PostsIconFrame onPress={() => navigation.navigate("ViewPollPostPage", { pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: profileKey, creatorName, creatorDisplayName, datePosted })}>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/113-bubbles4.png')} />
                </PostsIconFrame>
                <PostsIconFrame>
                    <PostsIcons style={{ flex: 1, height: 30, width: 30 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/387-share2.png')} />
                </PostsIconFrame>
                <PostsIconFrame>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/img/ThreeDots.png')} />
                </PostsIconFrame>
            </PostHorizontalView>
            {postNumForMsg == postNum && (<MsgBox type={messageType}>{message}</MsgBox>)}
            <SubTitle style={{ flex: 1, alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{datePosted}</SubTitle>
            {pollComments && (
                <SubTitle style={{ flex: 1, alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollComments.length} comments</SubTitle>
            )}
        </PollPostFrame>
    );

    const CategoryItem = ({ categoryTitle, categoryDescription, members, categoryTags, image, NSFW, NSFL, datePosted }) => (
        <SearchFrame onPress={() => navigation.navigate("CategoryViewPage", { categoryTitle: categoryTitle, NSFW: NSFW, NSFL: NSFL })}>
            <View style={{ paddingHorizontal: '50%' }}>
            </View>
            <Avatar resizeMode="cover" searchPage={true} source={{ uri: image != null || '' ? image : SocialSquareLogo_B64_png}} />
            {NSFW == false && (
                <View>
                    {NSFL == false && (
                        <SubTitle style={{color: colors.tertiary}} searchResTitle={true}>{categoryTitle}</SubTitle>
                    )}
                    {NSFL == true && (
                        <View style={{ flexDirection: 'row' }}>
                            <SubTitle searchResTitle={true} style={{ color: red }}>(NSFL) </SubTitle>
                            <SubTitle style={{color: colors.tertiary}} searchResTitle={true}>{categoryTitle}</SubTitle>
                        </View>
                    )}
                </View>
            )}
            {NSFW == true && (
                <View style={{ flexDirection: 'row' }}>
                    <SubTitle searchResTitle={true} style={{ color: red }}>(NSFW) </SubTitle>
                    <SubTitle searchResTitle={true} style={{color: colors.tertiary}}>{categoryTitle}</SubTitle>
                </View>
            )}
            <SubTitle searchResTitleDisplayName={true} style={{color: colors.tertiary}}>{categoryDescription}</SubTitle>
            <SubTitle searchResTitleDisplayName={true} style={{ color: brand }}>{categoryTags}</SubTitle>
            <SearchHorizontalView>
                <SearchHorizontalViewItemCenter style={{ height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <SearchSubTitle welcome={true} style={{ flex: 1, color: colors.tertiary }}> Members </SearchSubTitle>
                    <ProfIcons style={{ flex: 1 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/115-users.png')} />
                    {members == 0 && (
                        <SearchSubTitle welcome={true} style={{ flex: 1, color: colors.tertiary }}> 0 </SearchSubTitle>
                    )}
                    {members !== 0 && (
                        <SearchSubTitle welcome={true} style={{ flex: 1, color: colors.tertiary }}> {members} </SearchSubTitle>
                    )}
                </SearchHorizontalViewItemCenter>
                <SearchHorizontalViewItemCenter style={{ height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <SearchSubTitle welcome={true} style={{ flex: 1, color: colors.tertiary }}> Date Created </SearchSubTitle>
                    <ProfIcons style={{ flex: 1 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/084-calendar.png')} />
                    <SearchSubTitle welcome={true} style={{ flex: 1, color: colors.tertiary }}> {datePosted} </SearchSubTitle>
                </SearchHorizontalViewItemCenter>
            </SearchHorizontalView>
        </SearchFrame>
    );

    const ThreadItems = ({ postNum, threadId, threadComments, threadType, threadUpVotes, threadTitle, threadSubtitle, threadTags, threadCategory, threadBody, threadImageKey, threadImageDescription, threadNSFW, threadNSFL, datePosted, threadUpVoted, threadDownVoted, creatorDisplayName, creatorName, imageInThreadB64 }) => (
        <View style={{ backgroundColor: dark ? colors.slightlyLighterPrimary : colors.borderColor, borderRadius: 15, marginBottom: 10 }} onPress={() => navigation.navigate("ThreadViewPage", { threadId: threadId, creatorPfpB64: profileKey })}>
            {threadNSFW === true && (
                <SubTitle style={{ fontSize: 10, color: colors.red, marginBottom: 0 }}>(NSFW)</SubTitle>
            )}
            {threadNSFL === true && (
                <SubTitle style={{ fontSize: 10, color: colors.red, marginBottom: 0 }}>(NSFL)</SubTitle>
            )}
            <View style={{ paddingHorizontal: '50%' }}>
            </View>
            <PostsHorizontalView style={{ marginLeft: '5%', borderColor: colors.darkLight, width: '90%', paddingBottom: 5, marginRight: '5%' }}>
                <TouchableOpacity style={{ width: '100%', height: 60 }}>
                    <PostsHorizontalView>
                        <PostsVerticalView>
                            <PostCreatorIcon source={{ uri: profileKey}} />
                        </PostsVerticalView>
                        <PostsVerticalView style={{ marginTop: 9 }}>
                            <SubTitle style={{ fontSize: 20, marginBottom: 0, color: colors.tertiary }}>{creatorDisplayName}</SubTitle>
                            <SubTitle style={{ fontSize: 12, color: colors.brand, marginBottom: 0 }}>@{creatorName}</SubTitle>
                        </PostsVerticalView>
                    </PostsHorizontalView>
                </TouchableOpacity>
            </PostsHorizontalView>
            <TouchableOpacity onPress={() => navigation.navigate("ThreadViewPage", { threadId: threadId, creatorPfpB64: profileKey })}>
                <ImagePostTextFrame style={{ textAlign: 'left', alignItems: 'baseline' }}>
                    <TouchableOpacity>
                        <SubTitle style={{ fontSize: 10, color: colors.brand, marginBottom: 0 }}>Category: {threadCategory}</SubTitle>
                    </TouchableOpacity>
                    <SubTitle style={{ fontSize: 20, color: colors.tertiary, marginBottom: 0 }}>{threadTitle}</SubTitle>
                    {threadSubtitle !== "" && (
                        <SubTitle style={{ fontSize: 18, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadSubtitle}</SubTitle>
                    )}
                    {threadTags !== "" && (
                        <TouchableOpacity>
                            <SubTitle style={{ fontSize: 10, color: colors.brand, marginBottom: 10 }}>{threadTags}</SubTitle>
                        </TouchableOpacity>
                    )}
                    {threadType == "Text" && (
                        <SubTitle style={{ fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadBody}</SubTitle>
                    )}
                    <View style={{ textAlign: 'left', alignItems: 'baseline', marginLeft: '5%', marginRight: '5%', width: '90%' }}>
                        {threadType == "Images" && (
                            <View>
                                <View style={{ height: 200, width: 200 }}>
                                    <Image style={{ height: '100%', width: 'auto', resizeMode: 'contain' }} source={{ uri: imageInThreadB64 }} />
                                </View>
                                <SubTitle style={{ fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadImageDescription}</SubTitle>
                            </View>
                        )}
                    </View>
                </ImagePostTextFrame>
            </TouchableOpacity>

            <PostHorizontalView style={{ marginLeft: '5%', width: '90%', paddingVertical: 10, flex: 1, flexDirection: 'row' }}>

                {upVotesThreads.includes(threadId) && (<PostsIconFrame onPress={() => { UpVoteThread(threadId, postNum) }}>
                    <PostsIcons style={{ flex: 1, tintColor: colors.brand }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                </PostsIconFrame>)}
                {neitherVotesThreads.includes(threadId) && (<PostsIconFrame onPress={() => { UpVoteThread(threadId, postNum) }}>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                </PostsIconFrame>)}
                {downVotesThreads.includes(threadId) && (<PostsIconFrame onPress={() => { UpVoteThread(threadId, postNum) }}>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                </PostsIconFrame>)}
                {changingVotedThreads.includes(threadId) && (<PostsIconFrame></PostsIconFrame>)}


                {upVotesThreads.includes(threadId) && (<PostsIconFrame>
                    {initialUpVotesThreads.includes(threadId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes}</SubTitle>
                    )}
                    {initialNeitherVotesThreads.includes(threadId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes + 1}</SubTitle>
                    )}
                    {initialDownVotesThreads.includes(threadId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes + 2}</SubTitle>
                    )}
                </PostsIconFrame>)}
                {neitherVotesThreads.includes(threadId) && (<PostsIconFrame>
                    {initialNeitherVotesThreads.includes(threadId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes}</SubTitle>
                    )}
                    {initialUpVotesThreads.includes(threadId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes - 1}</SubTitle>
                    )}
                    {initialDownVotesThreads.includes(threadId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes + 1}</SubTitle>
                    )}
                </PostsIconFrame>)}
                {downVotesThreads.includes(threadId) && (<PostsIconFrame>
                    {initialDownVotesThreads.includes(threadId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes}</SubTitle>
                    )}
                    {initialNeitherVotesThreads.includes(threadId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes - 1}</SubTitle>
                    )}
                    {initialUpVotesThreads.includes(threadId) && (
                        <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes - 2}</SubTitle>
                    )}
                </PostsIconFrame>)}
                {changingVotedThreads.includes(threadId) && (<PostsIconFrame>
                    <ActivityIndicator size="small" color={brand} />
                </PostsIconFrame>)}

                {downVotesThreads.includes(threadId) && (<PostsIconFrame onPress={() => { DownVoteThread(threadId, postNum) }}>
                    <PostsIcons style={{ flex: 1, tintColor: colors.brand }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                </PostsIconFrame>)}
                {neitherVotesThreads.includes(threadId) && (<PostsIconFrame onPress={() => { DownVoteThread(threadId, postNum) }}>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                </PostsIconFrame>)}
                {upVotesThreads.includes(threadId) && (<PostsIconFrame onPress={() => { DownVoteThread(threadId, postNum) }}>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                </PostsIconFrame>)}
                {changingVotedThreads.includes(threadId) && (<PostsIconFrame></PostsIconFrame>)}
                <PostsIconFrame>
                </PostsIconFrame>
                <PostsIconFrame onPress={() => navigation.navigate("ThreadViewPage", { threadId: threadId, creatorPfpB64: profileKey })}>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/113-bubbles4.png')} />
                </PostsIconFrame>
                <PostsIconFrame>
                    <PostsIcons style={{ flex: 1, height: 30, width: 30 }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/387-share2.png')} />
                </PostsIconFrame>
                <PostsIconFrame>
                    <PostsIcons style={{ flex: 1 }} source={require('./../assets/img/ThreeDots.png')} />
                </PostsIconFrame>
            </PostHorizontalView>
            {postNumForMsg == postNum && (<MsgBox type={messageType}>{message}</MsgBox>)}
            <SubTitle style={{ flex: 1, alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{datePosted}</SubTitle>
            <TouchableOpacity onPress={() => navigation.navigate("ThreadViewPage", { threadId: threadId, creatorPfpB64: profileKey })}>
                <SubTitle style={{ flex: 1, alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadComments} comments</SubTitle>
            </TouchableOpacity>
        </View>
    );

    //main
    const toSendProfileName = { pubId: pubId, userId: _id };

    const clearLogin = () => {
        AsyncStorage.removeItem('socialSquareCredentials').then(() => {
            setStoredCredentials("");
        })
            .catch(error => console.log(error))
    }
    const changeToGrid = () => {
        if (gridViewState == "none") {
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
        if (featuredViewState == "none") {
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
        return axios.get(`${serverUrl}/getImageOnServer/${imageData[index].imageKey}`, { cancelToken: source.token })
            .then(res => 'data:image/jpeg;base64,' + res.data).catch(error => {
                console.log(error);
                //setSubmitting(false);
                setLoadingPosts(false)
                console.log("Either an error or cancelled.");
            })
    }
    //profile image of creator
    async function getImageInPfp(imageData, index) {
        return axios.get(`${serverUrl}/getImageOnServer/${imageData[index].creatorPfpKey}`, { cancelToken: source.token })
            .then(res => 'data:image/jpeg;base64,' + res.data).catch(error => {
                console.log(error);
                //setSubmitting(false);
                setLoadingPosts(false)
                console.log("Either an error or cancelled.");
            })
    }
    async function getImageInCategory(imageKey) {
        return axios.get(`${serverUrl}/getImageOnServer/${imageKey}`, { cancelToken: cancelTokenPostFormatFive.token })
            .then(res => 'data:image/jpeg;base64,' + res.data).catch(error => {
                console.log(error);
                //setSubmitting(false);
                setLoadingPosts(false)
                console.log("Either an error or cancelled.");
            })
    }
    //any image honestly
    async function getImageWithKeyOne(imageKey) {
        return axios.get(`${serverUrl}/getImageOnServer/${imageKey}`, { cancelToken: cancelTokenPostFormatOne.token })
            .then(res => 'data:image/jpeg;base64,' + res.data).catch(error => {
                console.log(error);
                //setSubmitting(false);
                setLoadingPostsImage(false)
                console.log("Either an error or cancelled.");
            })
    }
    async function getImageWithKeyTwo(imageKey) {
        return axios.get(`${serverUrl}/getImageOnServer/${imageKey}`, { cancelToken: cancelTokenPostFormatTwo.token })
            .then(res => 'data:image/jpeg;base64,' + res.data).catch(error => {
                console.log(error);
                //setSubmitting(false);
                setLoadingPostsVideo(false)
                console.log("Either an error or cancelled.");
            })
    }
    async function getImageWithKeyThree(imageKey) {
        return axios.get(`${serverUrl}/getImageOnServer/${imageKey}`, { cancelToken: cancelTokenPostFormatThree.token })
            .then(res => 'data:image/jpeg;base64,' + res.data).catch(error => {
                console.log(error);
                //setSubmitting(false);
                setLoadingPostsPoll(false)
                console.log("Either an error or cancelled.");
            })
    }
    async function getImageWithKeyFour(imageKey) {
        return axios.get(`${serverUrl}/getImageOnServer/${imageKey}`, { cancelToken: cancelTokenPostFormatFour.token })
            .then(res => 'data:image/jpeg;base64,' + res.data).catch(error => {
                console.log(error);
                //setSubmitting(false);
                setLoadingPostsThread(false)
                console.log("Either an error or cancelled.");
            })
    }
    async function getImageWithKeyFive(imageKey) {
        return axios.get(`${serverUrl}/getImageOnServer/${imageKey}`, { cancelToken: cancelTokenPostFormatFive.token })
            .then(res => 'data:image/jpeg;base64,' + res.data).catch(error => {
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
            setChangeSectionsOne([])
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
                            const imageB64 = await getImageWithKeyOne(imageData[index].imageKey)
                            console.log("Image In Post Recieved")
                            //Add
                            const addAndPush = async () => {
                                console.log("TestHere")
                                var tempSectionsTemp = { data: [{ imageKey: imageData[index].imageKey, imageB64: imageB64, imageTitle: imageData[index].imageTitle, imageDescription: imageData[index].imageDescription, imageUpVotes: imageData[index].imageUpVotes, imageComments: imageData[index].imageComments, creatorName: imageData[index].creatorName, creatorDisplayName: imageData[index].creatorDisplayName, datePosted: imageData[index].datePosted, postNum: index }] }
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
                            if (itemsProcessed === imageData.length) {
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

            const url = serverUrl + "/user/getImagesFromProfile";

            setLoadingPostsImage(true)
            axios.post(url, toSendProfileName).then((response) => {
                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    setLoadingPostsImage(false)
                    handleMessage(message, status);
                    console.log(status)
                    console.log(message)
                } else {
                    layoutImagePosts({ data });
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

    const changeToTwo = () => {
        cancelTokenPostFormatOne.cancel()
        cancelTokenPostFormatThree.cancel()
        cancelTokenPostFormatFour.cancel()
        cancelTokenPostFormatFive.cancel()
        setFormatTwoText("This user has no Video posts.")
        setSelectedPostFormat("Two")
        setChangeSectionsTwo([])
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
            setChangeSectionsThree([])
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
                    var totalVotes = pollData[index].optionOnesVotes + pollData[index].optionTwosVotes + pollData[index].optionThreesVotes + pollData[index].optionFoursVotes + pollData[index].optionFivesVotes + pollData[index].optionSixesVotes
                    //console.log(item, index);
                    if (totalVotes !== 0) {
                        optionOnesBarLength = (pollData[index].optionOnesVotes / totalVotes) * 100
                        console.log("O1 BL")
                        console.log(optionOnesBarLength)
                        optionTwosBarLength = (pollData[index].optionTwosVotes / totalVotes) * 100
                        console.log("O2 BL")
                        console.log(optionTwosBarLength)
                        optionThreesBarLength = (pollData[index].optionThreesVotes / totalVotes) * 100
                        console.log("O3 BL")
                        console.log(optionThreesBarLength)
                        optionFoursBarLength = (pollData[index].optionFoursVotes / totalVotes) * 100
                        console.log("O4 BL")
                        console.log(optionFoursBarLength)
                        optionFivesBarLength = (pollData[index].optionFivesVotes / totalVotes) * 100
                        console.log("O5 BL")
                        console.log(optionFivesBarLength)
                        optionSixesBarLength = (pollData[index].optionSixesVotes / totalVotes) * 100
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
                                optionOnesBarLength = 100 / 2
                                optionTwosBarLength = 100 / 2
                                optionThreesBarLength = 0
                                optionFoursBarLength = 0
                                optionFivesBarLength = 0
                                optionSixesBarLength = 0
                            } else if (pollData[index].totalNumberOfOptions == "Three") {
                                optionOnesBarLength = 100 / 3
                                optionTwosBarLength = 100 / 3
                                optionThreesBarLength = 100 / 3
                                optionFoursBarLength = 0
                                optionFivesBarLength = 0
                                optionSixesBarLength = 0
                            } else if (pollData[index].totalNumberOfOptions == "Four") {
                                optionOnesBarLength = 100 / 4
                                optionTwosBarLength = 100 / 4
                                optionThreesBarLength = 100 / 4
                                optionFoursBarLength = 100 / 4
                                optionFivesBarLength = 0
                                optionSixesBarLength = 0
                            } else if (pollData[index].totalNumberOfOptions == "Five") {
                                optionOnesBarLength = 100 / 5
                                optionTwosBarLength = 100 / 5
                                optionThreesBarLength = 100 / 5
                                optionFoursBarLength = 100 / 5
                                optionFivesBarLength = 100 / 5
                                optionSixesBarLength = 0
                            } else if (pollData[index].totalNumberOfOptions == "Six") {
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
                    console.log(pollData[index])
                    async function getPfpImageForPollWithAsync() {
                        var tempSectionsTemp = { data: [{ pollTitle: pollData[index].pollTitle, pollSubTitle: pollData[index].pollSubTitle, optionOne: pollData[index].optionOne, optionOnesColor: pollData[index].optionOnesColor, optionOnesVotes: pollData[index].optionOnesVotes, optionOnesBarLength: optionOnesBarLength, optionTwo: pollData[index].optionTwo, optionTwosColor: pollData[index].optionTwosColor, optionTwosVotes: pollData[index].optionTwosVotes, optionTwosBarLength: optionTwosBarLength, optionThree: pollData[index].optionThree, optionThreesColor: pollData[index].optionThreesColor, optionThreesVotes: pollData[index].optionThreesVotes, optionThreesBarLength: optionThreesBarLength, optionFour: pollData[index].optionFour, optionFoursColor: pollData[index].optionFoursColor, optionFoursVotes: pollData[index].optionFoursVotes, optionFoursBarLength: optionFoursBarLength, optionFive: pollData[index].optionFive, optionFivesColor: pollData[index].optionFivesColor, optionFivesVotes: pollData[index].optionFivesVotes, optionFivesBarLength: optionFivesBarLength, optionSix: pollData[index].optionSix, optionSixesColor: pollData[index].optionSixesColor, optionSixesVotes: pollData[index].optionSixesVotes, optionSixesBarLength: optionSixesBarLength, totalNumberOfOptions: pollData[index].totalNumberOfOptions, pollUpOrDownVotes: pollData[index].pollUpOrDownVotes, pollId: pollData[index]._id, votedFor: pollData[index].votedFor, postNum: index, pollComments: pollData[index].pollComments, creatorName: pollData[index].creatorName, creatorDisplayName: pollData[index].creatorDisplayName, datePosted: pollData[index].datePosted }] }
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
                        if (itemsProcessed === pollData.length) {
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

            const url = serverUrl + "/user/searchforpollposts";

            setLoadingPostsPoll(true)
            axios.post(url, toSendProfileName).then((response) => {
                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                    setLoadingPostsPoll(false)
                    console.log(status)
                    console.log(message)
                } else {
                    layoutPollPosts({ data });
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
            setChangeSectionsFour([])
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
                                        var tempSectionsTemp = { data: [{ postNum: index, threadId: threadData[index].threadId, threadComments: threadData[index].threadComments, threadType: threadData[index].threadType, threadUpVotes: threadData[index].threadUpVotes, threadTitle: threadData[index].threadTitle, threadSubtitle: threadData[index].threadSubtitle, threadTags: threadData[index].threadTags, threadCategory: threadData[index].threadCategory, threadBody: threadData[index].threadBody, threadImageKey: threadData[index].threadImageKey, threadImageDescription: threadData[index].threadImageDescription, threadNSFW: threadData[index].threadNSFW, threadNSFL: threadData[index].threadNSFL, datePosted: threadData[index].datePosted, threadUpVoted: threadData[index].threadUpVoted, threadDownVoted: threadData[index].threadDownVoted, creatorDisplayName: threadData[index].creatorDisplayName, creatorName: threadData[index].creatorName, imageInThreadB64: null }] }
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
                                        if (itemsProcessed === threadData.length) {
                                            setChangeSectionsFour(tempSections)
                                            setLoadingPostsThread(false)
                                            console.log(upVotesThreads)
                                            console.log(downVotesThreads)
                                            console.log(neitherVotesThreads)
                                        }
                                    }
                                    await addAndPush()
                                } else if (threadData[index].threadType == "Images") {
                                    const imageInThreadB64 = await getImageWithKeyFour(threadData[index].threadImageKey)
                                    const addAndPush = async () => {
                                        var tempSectionsTemp = { data: [{ postNum: index, threadId: threadData[index].threadId, threadComments: threadData[index].threadComments, threadType: threadData[index].threadType, threadUpVotes: threadData[index].threadUpVotes, threadTitle: threadData[index].threadTitle, threadSubtitle: threadData[index].threadSubtitle, threadTags: threadData[index].threadTags, threadCategory: threadData[index].threadCategory, threadBody: threadData[index].threadBody, threadImageKey: threadData[index].threadImageKey, threadImageDescription: threadData[index].threadImageDescription, threadNSFW: threadData[index].threadNSFW, threadNSFL: threadData[index].threadNSFL, datePosted: threadData[index].datePosted, threadUpVoted: threadData[index].threadUpVoted, threadDownVoted: threadData[index].threadDownVoted, creatorDisplayName: threadData[index].creatorDisplayName, creatorName: threadData[index].creatorName, imageInThreadB64: imageInThreadB64 }] }
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
                                        if (itemsProcessed === threadData.length) {
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

            const url = `${serverUrl}/user/getthreadsfromprofile/${pubId}/${_id}`;

            setLoadingPostsThread(true)
            axios.get(url).then((response) => {
                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    setLoadingPostsThread(false)
                    handleMessage(message, status);
                    console.log(status)
                    console.log(message)
                } else {
                    layoutThreadPosts({ data });
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
            setChangeSectionsFive([])
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
                        if (index + 1 <= userLoadMax) {
                            async function asyncFunctionForImages() {
                                const imageB64 = await getImageWithKeyFive(allData[index].imageKey)
                                var tempSectionsTemp = { data: [{ categoryTitle: allData[index].categoryTitle, categoryDescription: allData[index].categoryDescription, members: allData[index].members, categoryTags: allData[index].categoryTags, image: imageB64, NSFW: allData[index].NSFW, NSFL: allData[index].NSFL, datePosted: allData[index].datePosted }] }
                                tempSections.push(tempSectionsTemp)
                                itemsProcessed++;
                                if (itemsProcessed === allData.length) {
                                    setChangeSectionsFive(tempSections)
                                    setLoadingPostsCategory(false)
                                }
                            }
                            asyncFunctionForImages()
                        }
                    } else {
                        if (index + 1 <= userLoadMax) {
                            var tempSectionsTemp = { data: [{ categoryTitle: allData[index].categoryTitle, categoryDescription: allData[index].categoryDescription, members: allData[index].members, categoryTags: allData[index].categoryTags, image: null, NSFW: allData[index].NSFW, NSFL: allData[index].NSFL, datePosted: allData[index].datePosted }] }
                            tempSections.push(tempSectionsTemp)
                            itemsProcessed++;
                            if (itemsProcessed === allData.length) {
                                setChangeSectionsFive(tempSections)
                                setLoadingPostsCategory(false)
                            }
                        }
                    }
                });
            }

            handleMessage(null);
            const url = `${serverUrl}/user/findcategoryfromprofile/${pubId}/${_id}`;
            setLoadingPostsCategory(true)
            axios.get(url).then((response) => {
                const result = response.data;
                const { message, status, data } = result;

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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            console.log(result)
            postMultiMedia(result)
        }
    };


    const OpenImgLibrary = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            } else {
                pickImage()
            }
        }
    }

    const handleScroll = (event) => {
        var scrollY = event.nativeEvent.contentOffset.y
        if (scrollY < 560) {
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

    const TopProfileBarFadeAnim = useRef(new Animated.Value(0)).current;

    const changeProfilesOptionsView = () => {
        if (ProfileOptionsViewOpen.current == true) {
            Animated.parallel([
                Animated.timing(ProfileOptionsViewOpacity, {
                    toValue: 0,
                    duration: 1,
                    useNativeDriver: 'true'
                }),
                Animated.timing(PreventTouchEventsViewZIndex, {
                    toValue: -10,
                    duration: 1,
                    useNativeDriver: 'true'
                })
            ]).start()
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            ProfileOptionsViewOpen.current = false;
        } else {
            Animated.parallel([
                Animated.timing(ProfileOptionsViewOpacity, {
                    toValue: 1,
                    duration: 1,
                    useNativeDriver: 'true'
                }),
                Animated.timing(PreventTouchEventsViewZIndex, {
                    toValue: 2,
                    duration: 1,
                    useNativeDriver: 'true'
                })
            ]).start()
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            ProfileOptionsViewOpen.current = true;
        }
    }

    const ProfileOptionsViewMessageButtonOnPress = () => {
        if (storedCredentials) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            if (settingUpChat == false) {
                const forAsync = async () => {
                    setSettingUpChat(true)
                    setSettingUpChatErrorMessage(null)
                    
                    const nonce = await nacl.randomBytes(24)

                    console.log("Attempting to create a DM")
                    const url = serverUrl + "/conversations/createDirectMessage";
                    const toSend = {creatorId: _id, recipientName: profilesName, cryptographicNonce: nonce}
                    axios.post(url, toSend).then((response) => {
                        const result = response.data;
                        const {message, status, data} = result;

                        if (status !== 'SUCCESS') {
                            if (message == "Direct Message Exists") {
                                setSettingUpChat(false);
                                navigateToChatScreen()
                            } else {
                                setSettingUpChat(false);
                                setSettingUpChatErrorMessage(message)
                                setSettingUpChatErrorOrigin('creating the DM')
                            }
                        } else {
                            setSettingUpChat(false);
                            navigateToChatScreen()
                        }

                    }).catch(error => {
                        console.log(error);
                        setSettingUpChat(false);
                        setSettingUpChatErrorMessage("Network Error.");
                        setSettingUpChatErrorOrigin('creating the DM')
                    })
                }
                forAsync()
            }
        } else {
            navigation.navigate('ModalSignupScreen', {modal: true, Modal_NoCredentials: true})
        }
    }

    const navigateToChatScreen = () => {
        const url = `${serverUrl}/conversations/singleDmWithName/${profilesName}/${_id}`;
        axios.get(url).then((response) => {
            const result = response.data;
            const { message, status, data } = result;

            if (status !== 'SUCCESS') {
                setSettingUpChat(false)
                setSettingUpChatErrorMessage(message)
                setSettingUpChatErrorOrigin('getting the chat info from ID')
            } else {
                console.log(data)
                setSettingUpChat(false)
                setSettingUpChatErrorMessage(null)
                setSettingUpChatErrorOrigin(null)
                navigation.navigate('ChatScreenStack', {screen: 'Chat', params: {conversationId: data.conversationId, isDirectMessage: data.isDirectMessage, members: data.members, conversationImageB64: data.conversationImageB64, conversationTitleSent: data.conversationTitle, conversationNSFW: data.conversationNSFW, conversationNSFL: data.conversationNSFL, dateCreated: data.dateCreated, lastMessage: data.lastMessage, lastMessageDate: data.lastMessageDate, cryptographicNonce: data.cryptographicNonce, conversationDescription: data.conversationDescription, unreadsMessages: data.unreadsMessages}});
                changeProfilesOptionsView()
            }

        }).catch(error => {
            console.log(error);
            setSettingUpChat(false)
            setSettingUpChatErrorMessage("Network Error.");
            setSettingUpChatErrorOrigin('getting the chat info from ID')
        })
    }

    const ProfileOptionsViewReportButtonOnPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        changeProfilesOptionsView();
        changeReportProfilesOptionsView();
    }

    const changeReportProfilesOptionsView = () => {
        if (ReportProfileOptionsViewOpen.current == true) {
            changeProfilesOptionsView()
            Animated.parallel([
                Animated.timing(ReportProfileOptionsOpacity, {
                    toValue: 0,
                    duration: 1,
                    useNativeDriver: 'true'
                }),
                Animated.timing(PreventTouchEventsViewZIndex, {
                    toValue: 2,
                    duration: 1,
                    useNativeDriver: 'true'
                })
            ]).start()
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            ReportProfileOptionsViewOpen.current = false;
        } else {
            Animated.parallel([
                Animated.timing(ReportProfileOptionsOpacity, {
                    toValue: 1,
                    duration: 1,
                    useNativeDriver: 'true'
                }),
                Animated.timing(PreventTouchEventsViewZIndex, {
                    toValue: 2,
                    duration: 1,
                    useNativeDriver: 'true'
                })
            ]).start()
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            ReportProfileOptionsViewOpen.current = true;
        }
    }

    const changeReportProfiles_ContentThatShouldNotBePosted_OptionsView = () => {
        if (ReportProfileOptionsView_ContentThatShouldNotBePosted_Open.current == true) {
            Animated.timing(ReportProfile_ContentThatShouldNotBePosted_Opacity, {
                toValue: 0,
                duration: 1,
                useNativeDriver: 'true'
            }).start()
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            ReportProfileOptionsView_ContentThatShouldNotBePosted_Open.current = false;
        } else {
            Animated.timing(ReportProfile_ContentThatShouldNotBePosted_Opacity, {
                toValue: 1,
                duration: 1,
                useNativeDriver: 'true'
            }).start()
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            ReportProfileOptionsView_ContentThatShouldNotBePosted_Open.current = true;
        }
    }

    const changeReportProfiles_PretendingToBeSomeoneElse_OptionsView = () => {
        if (ReportProfileOptionsView_PretendingToBeSomeoneElse_Open.current == true) {
            Animated.timing(ReportProfile_PretendingToBeSomeoneElse_Opacity, {
                toValue: 0,
                duration: 1,
                useNativeDriver: 'true'
            }).start()
            ReportProfileOptionsView_PretendingToBeSomeoneElse_Open.current = false;
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } else {
            Animated.timing(ReportProfile_PretendingToBeSomeoneElse_Opacity, {
                toValue: 1,
                duration: 1,
                useNativeDriver: 'true'
            }).start()
            ReportProfileOptionsView_PretendingToBeSomeoneElse_Open.current = true;
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    }

    const changeReportProfiles_MayBeUnder13_OptionsView = () => {
        if (ReportProfileOptionsView_MayBeUnder13_Open.current == true) {
            Animated.timing(ReportProfile_MayBeUnder13_Opacity, {
                toValue: 0,
                duration: 1,
                useNativeDriver: 'true'
            }).start()
            ReportProfileOptionsView_MayBeUnder13_Open.current = false;
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } else {
            Animated.timing(ReportProfile_MayBeUnder13_Opacity, {
                toValue: 1,
                duration: 1,
                useNativeDriver: 'true'
            }).start()
            ReportProfileOptionsView_MayBeUnder13_Open.current = true;
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    }

    let lastPress = 0;
    const onDoublePress = (imageKey, postNum) => {
        const time = new Date().getTime();
        const delta = time - lastPress;

        const DOUBLE_PRESS_DELAY = 200;
        if (delta < DOUBLE_PRESS_DELAY) {
            // Success double press
            console.log('double press');
            if (storedCredentials) {
                setImageKeyToShowImageAnimation(imageKey)
                UpVoteImage(imageKey, postNum)
            } else {
                navigation.navigate('ModalLoginScreen', {modal: true})
            }

        }
        lastPress = time;
    };

    const showUpvoteImageAnimation = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(OpacityUpvoteImageAmount, {
                    toValue: 1,
                    duration: 50,
                    useNativeDriver: true
                }),
                Animated.timing(ScaleUpvoteImageAmount, {
                    toValue: 0.8,
                    duration: 50,
                    useNativeDriver: true
                })
            ]),
            Animated.delay(400),
            Animated.parallel([
                Animated.timing(OpacityUpvoteImageAmount, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true
                }),
                Animated.timing(ScaleUpvoteImageAmount, {
                    toValue: 0.5,
                    duration: 50,
                    useNativeDriver: true
                })
            ]),
        ]).start()
    }

    const showNeutralVoteImageAnimation = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(OpacityNeutralVoteImageAmount, {
                    toValue: 1,
                    duration: 50,
                    useNativeDriver: true
                }),
                Animated.timing(ScaleNeutralVoteImageAmount, {
                    toValue: 0.8,
                    duration: 50,
                    useNativeDriver: true
                })
            ]),
            Animated.delay(400),
            Animated.parallel([
                Animated.timing(OpacityNeutralVoteImageAmount, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true
                }),
                Animated.timing(ScaleNeutralVoteImageAmount, {
                    toValue: 0.5,
                    duration: 50,
                    useNativeDriver: true
                })
            ]),
        ]).start()
    }

    const showDownvoteImageAnimation = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(OpacityDownvoteImageAmount, {
                    toValue: 1,
                    duration: 50,
                    useNativeDriver: true
                }),
                Animated.timing(ScaleDownvoteImageAmount, {
                    toValue: 0.8,
                    duration: 50,
                    useNativeDriver: true
                })
            ]),
            Animated.delay(400),
            Animated.parallel([
                Animated.timing(OpacityDownvoteImageAmount, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true
                }),
                Animated.timing(ScaleDownvoteImageAmount, {
                    toValue: 0.5,
                    duration: 50,
                    useNativeDriver: true
                })
            ]),
        ]).start()
    }

    const GetBadgeIcon = (badge) => {
        return (
            <View style={{width: 25, height: 25, marginHorizontal: 3, marginTop: 6, marginBottom: 12}}>
                {badge == 'onSignUpBadge' ?
                    <EvilIcons name="trophy" size={35} color={colors.tertiary} style={{marginLeft: -5, marginTop: -1}}/>
                : badge == 'homeScreenLogoPressEasterEgg' ?
                    storedBadges.includes('homeScreenLogoPressEasterEgg') ?
                        <Image style={{width: 25, height: 25, tintColor: colors.tertiary}} source={require('../assets/app_icons/home.png')}/>
                    :
                        <MaterialCommunityIcons name="egg-easter" size={28} color={colors.tertiary} style={{marginLeft: -1, marginTop: -1}}/>
                :
                    <AntDesign name="questioncircleo" size={25} color={colors.tertiary}/>
                }
            </View>
        )
    }

    const BadgesArea = (badges) => {
        if (badges.length > 0) {
            return (
                <ProfileBadgesView onPress={() => navigation.navigate("AccountBadges", {name: profilesName, displayName: profilesDisplayName, badgesObject: badges, profilePictureUri: profileKey})} style={{borderColor: colors.primary}}>
                    {badges.length == 1 ?
                        <>
                            <ProfileBadgeItemUnderline style={{backgroundColor: colors.tertiary}}/>
                            {GetBadgeIcon(badges[0])}
                        </>
                    : badges.length == 2 ?
                        <>
                            <ProfileBadgeItemUnderline style={{backgroundColor: colors.tertiary}}/>
                            {GetBadgeIcon(badges[0])}
                            <ProfileBadgeItemUnderline style={{backgroundColor: colors.tertiary, left: 31}}/>
                            {GetBadgeIcon(badges[1])}
                        </>
                    : badges.length == 3 ?
                        <>
                            <ProfileBadgeItemUnderline style={{backgroundColor: colors.tertiary}}/>
                            {GetBadgeIcon(badges[0])}
                            <ProfileBadgeItemUnderline style={{backgroundColor: colors.tertiary, left: 31}}/>
                            {GetBadgeIcon(badges[1])}
                            <ProfileBadgeItemUnderline style={{backgroundColor: colors.tertiary, left: 62}}/>
                            {GetBadgeIcon(badges[2])}
                        </>
                    : badges.length == 4 ?
                        <>
                            <ProfileBadgeItemUnderline style={{backgroundColor: colors.tertiary}}/>
                            {GetBadgeIcon(badges[0])}
                            <ProfileBadgeItemUnderline style={{backgroundColor: colors.tertiary, left: 31}}/>
                            {GetBadgeIcon(badges[1])}
                            <ProfileBadgeItemUnderline style={{backgroundColor: colors.tertiary, left: 62}}/>
                            {GetBadgeIcon(badges[2])}
                            <ProfileBadgeItemUnderline style={{backgroundColor: colors.tertiary, left: 93}}/>
                            {GetBadgeIcon(badges[3])}
                        </>
                    :
                        <>
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
                        </>
                    }
                </ProfileBadgesView>
            )
        } else {
            return null
        }
    }

    const toggleFollowOfAUser = () => {
        if (storedCredentials) {
            setTogglingFollow(true)
            const url = `${serverUrl}/user/toggleFollowOfAUser`;
            axios.post(url, {userId: _id, userToFollowPubId: pubId}).then((response) => {
                const result = response.data;
                const { message, status, data } = result;

                if (status !== "SUCCESS") {
                    console.log(status + message)
                    handleMessage(message)
                } else {
                    console.log(status + message)
                    if (message == "Followed User") {
                        //Followed
                        setUserIsFollowed(true)
                        setTogglingFollow(false)
                    } else if (message == "Requested To Follow User") {
                        //Requested
                        setUserIsFollowed('Requested')
                        setTogglingFollow(false)
                    } else {
                        //Unfollowed or unrequested
                        setUserIsFollowed(false)
                        setTogglingFollow(false)
                    }
                }
            }).catch(error => {
                console.log(error);
                setTogglingFollow(false)
                handleMessage("An error occured. Try checking your network connection and retry.");
            })
        } else {
            navigation.navigate('ModalLoginScreen', {modal: true})
        }
    }

    console.log('User is followed: ' + userIsFollowed)
    console.log('Initially user followed is: ' + initiallyFollowed)

    return (
        <>
            <ActionSheet
                ref={UnfollowPrivateAccountConfirmationPickerMenu}
                title={'Are you sure you want to unfollow this user? You will have to make a follow request if you want to follow them again.'}
                options={['Unfollow', 'Cancel']}
                // Define cancel button index in the option array
                // This will take the cancel option in bottom
                // and will highlight it
                cancelButtonIndex={1}
                // Highlight any specific option
                destructiveButtonIndex={0}
                onPress={(index) => {
                    if (index == 0) {
                        toggleFollowOfAUser()
                    } else {
                        console.log('Cancelled')
                    }
                }}
            />
            <StatusBar style={colors.StatusBarColor} />
            <Animated.View style={{opacity: ProfileOptionsViewOpacity, zIndex: ProfileOptionsViewOpacity.interpolate({inputRange: [0, 1], outputRange: [-10, 3]})}}>
                {settingUpChatErrorMessage ?
                    <ProfileOptionsView style={{backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center'}} viewHidden={false}>
                        <Text style={{color: colors.errorColor, fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10}}>An error occured while {settingUpChatErrorOrigin}</Text>
                        <Text style={{color: colors.errorColor, fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20}}>{settingUpChatErrorMessage}</Text>
                        <ProfileOptionsViewButtons 
                            greyButton={true} 
                            onPress={() => {
                                setSettingUpChat(false)
                                setSettingUpChatErrorMessage(null)
                            }}
                        >
                            <ProfileOptionsViewButtonsText>Go back</ProfileOptionsViewButtonsText>
                        </ProfileOptionsViewButtons>
                    </ProfileOptionsView>
                : settingUpChat ?
                    <ProfileOptionsView style={{backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center'}} viewHidden={false}>
                        <Text style={{color: colors.tertiary, fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>Loading...</Text>
                        <ActivityIndicator size="large" color={colors.tertiary} />
                    </ProfileOptionsView>
                :
                    <ProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={false}>
                        <ProfileOptionsViewText style={{color: colors.tertiary}}>{profilesDisplayName || "Couldn't get profile display name"}</ProfileOptionsViewText>
                        <ProfileOptionsViewSubtitleText style={{color: colors.tertiary}}>Options</ProfileOptionsViewSubtitleText>
                        <ProfileOptionsViewButtons greyButton={true} onPress={changeProfilesOptionsView}>
                            <ProfileOptionsViewButtonsText greyButton={true}>Cancel</ProfileOptionsViewButtonsText>
                        </ProfileOptionsViewButtons> 
                        <ProfileOptionsViewButtons greyButton={true} onPress={ProfileOptionsViewMessageButtonOnPress}>
                            <ProfileOptionsViewButtonsText greyButton={true}>Message</ProfileOptionsViewButtonsText>
                        </ProfileOptionsViewButtons>
                        <ProfileOptionsViewButtons redButton={true} onPress={ProfileOptionsViewReportButtonOnPress}>
                            <ProfileOptionsViewButtonsText redButton={true}>Report</ProfileOptionsViewButtonsText>
                        </ProfileOptionsViewButtons> 
                    </ProfileOptionsView>
                }
            </Animated.View>
            <Animated.View style={{opacity: ReportProfileOptionsOpacity, zIndex: ReportProfileOptionsOpacity.interpolate({inputRange: [0, 1], outputRange: [-10, 4]})}}>
                <ReportProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={false}>
                    <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{profilesDisplayName ? ("Report " + profilesDisplayName) : "Report profile"}</ReportProfileOptionsViewText>
                    <ReportProfileOptionsViewSubtitleText style={{color: colors.tertiary}}>Use this page to report this profile. If anyone is in danger immediately call emergency services. Do Not Wait.</ReportProfileOptionsViewSubtitleText>
                    <ReportProfileOptionsViewButtons greyButton={true} onPress={changeReportProfilesOptionsView}>
                        <ReportProfileOptionsViewButtonsText greyButton={true}>Cancel</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                    <ReportProfileOptionsViewButtons redButton={true} onPress={changeReportProfiles_ContentThatShouldNotBePosted_OptionsView}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>This account is posting content that should not be on SocialSquare</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                    <ReportProfileOptionsViewButtons redButton={true} onPress={changeReportProfiles_MayBeUnder13_OptionsView}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>This account is run by someone under 13</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={changeReportProfiles_PretendingToBeSomeoneElse_OptionsView}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>This account is pretending to be someone they're not</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                </ReportProfileOptionsView>
            </Animated.View>
            <Animated.View style={{opacity: ReportProfile_ContentThatShouldNotBePosted_Opacity, zIndex: ReportProfile_ContentThatShouldNotBePosted_Opacity.interpolate({inputRange: [0, 1], outputRange: [-10, 5]})}}>
                <ReportProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={false}>
                    <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{profilesDisplayName ? ("Report " + profilesDisplayName) : "Report profile"}</ReportProfileOptionsViewText>
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
            </Animated.View>
            <Animated.View style={{opacity: ReportProfile_MayBeUnder13_Opacity, zIndex: ReportProfile_MayBeUnder13_Opacity.interpolate({inputRange: [0, 1], outputRange: [-10, 5]})}}>
                <ReportProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={false}>
                    <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{profilesDisplayName ? ("Report " + profilesDisplayName) : "Report profile"}</ReportProfileOptionsViewText>
                    <ReportProfileOptionsViewSubtitleText style={{color: colors.tertiary}}>User May Be Under 13</ReportProfileOptionsViewSubtitleText>
                    <ReportProfileOptionsViewButtons greyButton={true} onPress={changeReportProfiles_MayBeUnder13_OptionsView}>
                        <ReportProfileOptionsViewButtonsText greyButton={true}>Back</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                    <Text style={{color: colors.tertiary, fontSize: 18, textAlign: 'center', marginTop: 25, marginBottom: 10}}>Everyone must be at least 13 to have a SocialSquare account. In some jurisdictions, this age limit may be higher. If you would like to report an account because it belongs to someone under the age of 13, or someone is impresonating your child who's under 13, please press the report button.</Text>
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Send report</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                </ReportProfileOptionsView>
            </Animated.View>
            <Animated.View style={{opacity: ReportProfile_PretendingToBeSomeoneElse_Opacity, zIndex: ReportProfile_PretendingToBeSomeoneElse_Opacity.interpolate({inputRange: [0, 1], outputRange: [-10, 5]})}}>
                <ReportProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={false}>
                    <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{profilesDisplayName ? ("Report " + profilesDisplayName) : "Report profile"}</ReportProfileOptionsViewText>
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
            </Animated.View>
            <Animated.View style={{paddingTop: StatusBarHeight - 10, backgroundColor: colors.primary, borderColor: colors.borderColor, borderBottomWidth: 0, alignItems: 'center', opacity: TopProfileBarFadeAnim, zIndex: TopProfileBarFadeAnim.interpolate({inputRange: [0, 1], outputRange: [-10, 100]}), position: 'absolute', top: 0, width: '100%', flexDirection: 'column'}}>
                <>
                    <View style={{position: 'absolute', top: StatusBarHeight, left: 10}}>
                        <TouchableOpacity style={{marginRight: '75.5%'}} onPress={() => {navigation.goBack()}}>
                            <Image
                                source={require('../assets/app_icons/back_arrow.png')}
                                style={{ width: 40, height: 40, tintColor: colors.tertiary}}
                                resizeMode="contain"
                                resizeMethod="resize"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <PageTitle style={{fontSize: 24}} welcome={true}>{profilesDisplayName || profilesName || "Couldn't get name"}</PageTitle>
                        <Avatar style={{width: 40, height: 40}} resizeMode="cover" source={{uri: profileKey}}/>
                    </View>
                    <View style={{position: 'absolute', right: 10, top: StatusBarHeight}}>
                        <TouchableOpacity onPress={changeProfilesOptionsView}>
                            <Image
                                source={require('../assets/app_icons/3dots.png')}
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
            <Animated.View style={{opacity: 0, zIndex: PreventTouchEventsViewZIndex, width: '100%', height: '100%', backgroundColor: 'transparent', position: 'absolute', top: 0, right: 0, left: 0, bottom: 0}}/>
            <ScrollView
                onScroll={handleScroll}
                scrollEventThrottle={1}
                nestedScrollEnabled={true}
            >
                <WelcomeContainer style={{backgroundColor: colors.primary}}>
                    <ProfileHorizontalView style={{marginBottom: -20, marginTop: 10}} topItems={true}>
                        <ViewHider viewHidden={backButtonHidden}>
                            <TouchableOpacity style={{marginRight: '75.5%'}} onPress={() => {navigation.goBack()}}>
                                <Image
                                    source={require('../assets/app_icons/back_arrow.png')}
                                    style={{ width: 40, height: 40, tintColor: colors.tertiary}}
                                    resizeMode="contain"
                                    resizeMethod="resize"
                                />
                            </TouchableOpacity>
                        </ViewHider>
                        <TouchableOpacity onPress={changeProfilesOptionsView}>
                            <Image
                                source={require('../assets/app_icons/3dots.png')}
                                style={{ width: 40, height: 40, tintColor: colors.tertiary}}
                                resizeMode="contain"
                                resizeMethod="resize"
                            />
                        </TouchableOpacity>
                    </ProfileHorizontalView>
                    <ProfInfoAreaImage style={{marginTop: 1}}>
                        <Avatar resizeMode="cover" source={{uri: profileKey}} />
                        <PageTitle welcome={true}>{profilesDisplayName || profilesName || "Couldn't get name"}</PageTitle>
                        <SubTitle style={{color: colors.tertiary, marginBottom: 0}}>{"@" + profilesDisplayName}</SubTitle>
                        {BadgesArea(badges)}
                        {bio ? <SubTitle style={{color: colors.tertiary, marginBottom: 5, fontSize: 14, textAlign: 'center'}} bioText={true} >{bio}</SubTitle> : null}
                    </ProfInfoAreaImage>
                    <ProfileHorizontalView>
                        <ProfileHorizontalViewItem profLeftIcon={true}>
                            {loadingFollowers == true ?
                                <>
                                    <ProfIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/114-user.png')} />
                                    <SubTitle welcome={true} style={{color: colors.tertiary}}> Followers </SubTitle> 
                                    <ActivityIndicator size="large" color={colors.tertiary} />
                                </>
                            : loadingFollowers == 'Error' ?
                                <>
                                    <ProfIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/114-user.png')} />
                                    <SubTitle welcome={true} style={{color: colors.tertiary}}> Followers </SubTitle> 
                                    <SubTitle welcome={true} style={{color: colors.tertiary}}> Error </SubTitle> 
                                </>
                            :
                                <View style={{alignItems: 'center'}}>
                                    <ProfIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/114-user.png')} />
                                    {initiallyFollowed == false && (
                                        <View>
                                            {userIsFollowed == true && (
                                                <SubTitle welcome={true} style={{color: colors.tertiary}}> {followers + 1} </SubTitle> 
                                            )}
                                            {(userIsFollowed == false || userIsFollowed == 'Requested') && (
                                                <SubTitle welcome={true} style={{color: colors.tertiary}}> {followers} </SubTitle> 
                                            )}
                                        </View>
                                    )}
                                    {initiallyFollowed == true && (
                                        <View>
                                            {userIsFollowed == true && (
                                                <SubTitle welcome={true} style={{color: colors.tertiary}}> {followers} </SubTitle> 
                                            )}
                                            {userIsFollowed == false || userIsFollowed == 'Requested' && (
                                                <SubTitle welcome={true} style={{color: colors.tertiary}}> {followers - 1} </SubTitle> 
                                            )}
                                        </View>
                                    )}
                                    {initiallyFollowed == 'Requested' && (
                                        <SubTitle welcome={true} style={{color: colors.tertiary}}> {followers} </SubTitle> 
                                    )}
                                    {togglingFollow == false && (
                                        <View style={{width: '80%', borderRadius: 5, backgroundColor: colors.primary, borderColor: colors.borderColor, borderWidth: 3, paddingHorizontal: 10, paddingTop: 2}}>
                                            {userIsFollowed == false && (
                                                <TouchableOpacity onPress={() => toggleFollowOfAUser()}>
                                                    <SubTitle welcome={true} style={{textAlign: 'center', color: colors.tertiary}}> Follow </SubTitle>
                                                </TouchableOpacity>
                                            )}
                                            {userIsFollowed == true && (
                                                <TouchableOpacity onPress={() => privateAccount == true ? UnfollowPrivateAccountConfirmationPickerMenu.current.show() : toggleFollowOfAUser()}>
                                                    <SubTitle welcome={true} style={{textAlign: 'center', color: colors.tertiary}}> Unfollow </SubTitle>
                                                </TouchableOpacity>
                                            )}
                                            {userIsFollowed == 'Requested' && (
                                                <TouchableOpacity onPress={() => toggleFollowOfAUser()}>
                                                    <SubTitle welcome={true} style={{textAlign: 'center', color: colors.tertiary, fontSize: 14}}> Requested </SubTitle>
                                                </TouchableOpacity>
                                            )}
                                            {userIsFollowed !== true && (
                                                <View>
                                                    {userIsFollowed !== false && (
                                                        <View>
                                                            {userIsFollowed !== 'Requested' && (
                                                                <ActivityIndicator size={20} color={colors.brand} />
                                                            )}
                                                        </View>
                                                    )}
                                                </View>
                                            )}
                                        </View>
                                    )}
                                    {togglingFollow == true && (
                                        <ActivityIndicator size="large" color={colors.brand} />
                                    )}
                                </View>
                            }
                        </ProfileHorizontalViewItem>
                        <ProfileHorizontalViewItem profCenterIcon={true}>
                            <SubTitle style={{color: colors.tertiary}} welcome={true}> Following </SubTitle>
                            <ProfIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/115-users.png')} />
                            <SubTitle style={{color: colors.tertiary}} welcome={true}> {following} </SubTitle>
                        </ProfileHorizontalViewItem>
                        <ProfileHorizontalViewItem profRightIcon={true}>
                            <SubTitle style={{color: colors.tertiary}} welcome={true}> Upvotes </SubTitle>
                            <ProfIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                            <SubTitle style={{color: colors.tertiary}} welcome={true}> Coming soon{/*totalLikes*/} </SubTitle>
                        </ProfileHorizontalViewItem>
                    </ProfileHorizontalView>
                    {userNotFound == true ? 
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold'}}>User not found</Text>
                        </View>
                    :
                        privateAccount == false || (userIsFollowed == true && privateAccount == true) ?
                            <>
                                <ProfilePostsSelectionView style={{borderBottomWidth: 0}}>
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
                                        <ProfileSelectMediaTypeIconsBorder style={{backgroundColor: colors.borderColor, borderColor: colors.borderColor}}>
                                            <ProfileSelectMediaTypeIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/015-images.png')} />
                                        </ProfileSelectMediaTypeIconsBorder>
                                    </ProfileSelectMediaTypeItem>
                                    <ProfileSelectMediaTypeItem onPress={changeToTwo}>
                                        <ProfileSelectMediaTypeIconsBorder style={{backgroundColor: colors.borderColor, borderColor: colors.borderColor}}>
                                            <ProfileSelectMediaTypeIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/020-film.png')} />
                                        </ProfileSelectMediaTypeIconsBorder>
                                    </ProfileSelectMediaTypeItem>
                                    <ProfileSelectMediaTypeItem onPress={changeToThree}>
                                        <ProfileSelectMediaTypeIconsBorder style={{backgroundColor: colors.borderColor, borderColor: colors.borderColor}}>
                                            <ProfileSelectMediaTypeIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/157-stats-bars.png')} />
                                        </ProfileSelectMediaTypeIconsBorder>
                                    </ProfileSelectMediaTypeItem>
                                    <ProfileSelectMediaTypeItem onPress={changeToFour}>
                                        <ProfileSelectMediaTypeIconsBorder style={{backgroundColor: colors.borderColor, borderColor: colors.borderColor}}>
                                            <ProfileSelectMediaTypeIcons style={{ height: '80%', width: '80%', tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/007-pencil2.png')} />
                                        </ProfileSelectMediaTypeIconsBorder>
                                    </ProfileSelectMediaTypeItem>
                                    <ProfileSelectMediaTypeItem onPress={changeToFive}>
                                        <ProfileSelectMediaTypeIconsBorder style={{backgroundColor: colors.borderColor, borderColor: colors.borderColor}}>
                                            <ProfileSelectMediaTypeIcons style={{ height: '80%', width: '80%', tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/093-drawer.png')} />
                                        </ProfileSelectMediaTypeIconsBorder>
                                    </ProfileSelectMediaTypeItem>
                                </ProfileSelectMediaTypeHorizontalView>
                                <ProfileGridPosts display={gridViewState}>
                                    {selectedPostFormat == "One" && (<SectionList
                                        sections={changeSectionsOne}
                                        keyExtractor={(item, index) => item + index}
                                        renderItem={({ item }) => <ImageItem imageKey={item.imageKey} imageB64={item.imageB64} imageTitle={item.imageTitle} imageDescription={item.imageDescription} imageUpVotes={item.imageUpVotes} imageComments={item.imageComments} creatorName={item.creatorName} creatorDisplayName={item.creatorDisplayName} creatorPfpB64={item.creatorPfpB64} datePosted={item.datePosted} postNum={item.postNum} />}
                                        ListFooterComponent={<PostLoadingSpinners selectedPostFormat={selectedPostFormat} loadingPostsImage={loadingPostsImage} loadingPostsVideo={loadingPostsVideo} loadingPostsPoll={loadingPostsPoll} loadingPostsThread={loadingPostsThread} loadingPostsCategory={loadingPostsCategory}/>}
                                        ListHeaderComponent={<PostMessages selectedPostFormat={selectedPostFormat} formatOneText={formatOneText} formatTwoText={formatTwoText} formatThreeText={formatThreeText} formatFourText={formatFourText} formatFiveText={formatFiveText} colors={colors}/>}
                                    />)}
                                    {selectedPostFormat == "Two" && (<SectionList
                                        sections={changeSectionsTwo}
                                        keyExtractor={(item, index) => item + index}
                                        renderItem={({ item }) => <PollItem pollTitle={item.pollTitle} pollSubTitle={item.pollSubTitle} optionOne={item.optionOne} optionOnesColor={item.optionOnesColor} optionOnesVotes={item.optionOnesVotes} optionOnesBarLength={item.optionOnesBarLength} optionTwo={item.optionTwo} optionTwosColor={item.optionTwosColor} optionTwosVotes={item.optionTwosVotes} optionTwosBarLength={item.optionTwosBarLength} optionThree={item.optionThree} optionThreesColor={item.optionThreesColor} optionThreesVotes={item.optionThreesVotes} optionThreesBarLength={item.optionThreesBarLength} optionFour={item.optionFour} optionFoursColor={item.optionFoursColor} optionFoursVotes={item.optionFoursVotes} optionFoursBarLength={item.optionFoursBarLength} optionFive={item.optionFive} optionFivesColor={item.optionFivesColor} optionFivesVotes={item.optionFivesVotes} optionFivesBarLength={item.optionFivesBarLength} optionSix={item.optionSix} optionSixesColor={item.optionSixesColor} optionSixesVotes={item.optionSixesVotes} optionSixesBarLength={item.optionSixesBarLength} totalNumberOfOptions={item.totalNumberOfOptions} pollUpOrDownVotes={item.pollUpOrDownVotes} pollId={item.pollId} votedFor={item.votedFor} pollLiked={item.pollLiked} pfpB64={item.pfpB64} creatorName={item.creatorName} creatorDisplayName={item.creatorDisplayName} />}
                                        ListFooterComponent={<PostLoadingSpinners selectedPostFormat={selectedPostFormat} loadingPostsImage={loadingPostsImage} loadingPostsVideo={loadingPostsVideo} loadingPostsPoll={loadingPostsPoll} loadingPostsThread={loadingPostsThread} loadingPostsCategory={loadingPostsCategory}/>}
                                        ListHeaderComponent={<PostMessages selectedPostFormat={selectedPostFormat} formatOneText={formatOneText} formatTwoText={formatTwoText} formatThreeText={formatThreeText} formatFourText={formatFourText} formatFiveText={formatFiveText} colors={colors}/>}
                                    />)}
                                    {selectedPostFormat == "Three" && (<SectionList
                                        sections={changeSectionsThree}
                                        keyExtractor={(item, index) => item + index}
                                        renderItem={({ item }) => <PollItem pollTitle={item.pollTitle} pollSubTitle={item.pollSubTitle} optionOne={item.optionOne} optionOnesColor={item.optionOnesColor} optionOnesVotes={item.optionOnesVotes} optionOnesBarLength={item.optionOnesBarLength} optionTwo={item.optionTwo} optionTwosColor={item.optionTwosColor} optionTwosVotes={item.optionTwosVotes} optionTwosBarLength={item.optionTwosBarLength} optionThree={item.optionThree} optionThreesColor={item.optionThreesColor} optionThreesVotes={item.optionThreesVotes} optionThreesBarLength={item.optionThreesBarLength} optionFour={item.optionFour} optionFoursColor={item.optionFoursColor} optionFoursVotes={item.optionFoursVotes} optionFoursBarLength={item.optionFoursBarLength} optionFive={item.optionFive} optionFivesColor={item.optionFivesColor} optionFivesVotes={item.optionFivesVotes} optionFivesBarLength={item.optionFivesBarLength} optionSix={item.optionSix} optionSixesColor={item.optionSixesColor} optionSixesVotes={item.optionSixesVotes} optionSixesBarLength={item.optionSixesBarLength} totalNumberOfOptions={item.totalNumberOfOptions} pollUpOrDownVotes={item.pollUpOrDownVotes} pollId={item.pollId} votedFor={item.votedFor} pfpB64={item.pfpB64} creatorName={item.creatorName} creatorDisplayName={item.creatorDisplayName} postNum={item.postNum} datePosted={item.datePosted} pollComments={item.pollComments} />}
                                        ListFooterComponent={<PostLoadingSpinners selectedPostFormat={selectedPostFormat} loadingPostsImage={loadingPostsImage} loadingPostsVideo={loadingPostsVideo} loadingPostsPoll={loadingPostsPoll} loadingPostsThread={loadingPostsThread} loadingPostsCategory={loadingPostsCategory}/>}
                                        ListHeaderComponent={<PostMessages selectedPostFormat={selectedPostFormat} formatOneText={formatOneText} formatTwoText={formatTwoText} formatThreeText={formatThreeText} formatFourText={formatFourText} formatFiveText={formatFiveText} colors={colors}/>}
                                    />)}
                                    {selectedPostFormat == "Four" && (<SectionList
                                        sections={changeSectionsFour}
                                        keyExtractor={(item, index) => item + index}
                                        renderItem={({ item }) => <ThreadItems postNum={item.postNum} threadId={item.threadId} threadComments={item.threadComments} threadType={item.threadType} threadUpVotes={item.threadUpVotes} threadTitle={item.threadTitle} threadSubtitle={item.threadSubtitle} threadTags={item.threadTags} threadCategory={item.threadCategory} threadBody={item.threadBody} threadImageKey={item.threadImageKey} threadImageDescription={item.threadImageDescription} threadNSFW={item.threadNSFW} threadNSFL={item.threadNSFL} datePosted={item.datePosted} threadUpVoted={item.threadUpVoted} threadDownVoted={item.threadDownVoted} creatorDisplayName={item.creatorDisplayName} creatorName={item.creatorName} creatorImageB64={item.creatorImageB64} imageInThreadB64={item.imageInThreadB64} />}
                                        ListFooterComponent={<PostLoadingSpinners selectedPostFormat={selectedPostFormat} loadingPostsImage={loadingPostsImage} loadingPostsVideo={loadingPostsVideo} loadingPostsPoll={loadingPostsPoll} loadingPostsThread={loadingPostsThread} loadingPostsCategory={loadingPostsCategory}/>}
                                        ListHeaderComponent={<PostMessages selectedPostFormat={selectedPostFormat} formatOneText={formatOneText} formatTwoText={formatTwoText} formatThreeText={formatThreeText} formatFourText={formatFourText} formatFiveText={formatFiveText} colors={colors}/>}
                                    />)}
                                    {selectedPostFormat == "Five" && (<SectionList
                                        sections={changeSectionsFive}
                                        keyExtractor={(item, index) => item + index}
                                        renderItem={({ item }) => <CategoryItem categoryTitle={item.categoryTitle} categoryDescription={item.categoryDescription} members={item.members} categoryTags={item.categoryTags} image={item.image} NSFW={item.NSFW} NSFL={item.NSFL} datePosted={item.datePosted} />}
                                        ListFooterComponent={<PostLoadingSpinners selectedPostFormat={selectedPostFormat} loadingPostsImage={loadingPostsImage} loadingPostsVideo={loadingPostsVideo} loadingPostsPoll={loadingPostsPoll} loadingPostsThread={loadingPostsThread} loadingPostsCategory={loadingPostsCategory}/>}
                                        ListHeaderComponent={<PostMessages selectedPostFormat={selectedPostFormat} formatOneText={formatOneText} formatTwoText={formatTwoText} formatThreeText={formatThreeText} formatFourText={formatFourText} formatFiveText={formatFiveText} colors={colors}/>}
                                    />)}
                                </ProfileGridPosts>
                                <ProfileFeaturedPosts display={featuredViewState}>
                                    <SubTitle style={{color: colors.tertiary}} profNoPosts={true}>
                                        Features don't work yet...
                                    </SubTitle>
                                </ProfileFeaturedPosts>
                            </>
                        : 
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <EvilIcons name="lock" color={colors.tertiary} size={70}/>
                                <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>This is a private account.</Text>
                                <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Follow this account to see their posts.</Text>
                            </View>
                        }
                </WelcomeContainer>
            </ScrollView>
        </>
    );
}

export default ProfilePages;

const PostLoadingSpinners = ({selectedPostFormat, loadingPostsImage, loadingPostsVideo, loadingPostsPoll, loadingPostsThread, loadingPostsCategory}) => {
    return(
        <>
            {selectedPostFormat == "One" && (
                <View>
                    {loadingPostsImage == true && (
                        <ActivityIndicator size="large" color={brand} style={{ marginBottom: 20 }} />
                    )}
                </View>
            )}
            {selectedPostFormat == "Two" && (
                <View>
                    {loadingPostsVideo == true && (
                        <ActivityIndicator size="large" color={brand} style={{ marginBottom: 20 }} />
                    )}
                </View>
            )}
            {selectedPostFormat == "Three" && (
                <View>
                    {loadingPostsPoll == true && (
                        <ActivityIndicator size="large" color={brand} style={{ marginBottom: 20 }} />
                    )}
                </View>
            )}
            {selectedPostFormat == "Four" && (
                <View>
                    {loadingPostsThread == true && (
                        <ActivityIndicator size="large" color={brand} style={{ marginBottom: 20 }} />
                    )}
                </View>
            )}
            {selectedPostFormat == "Five" && (
                <View>
                    {loadingPostsCategory == true && (
                        <ActivityIndicator size="large" color={brand} style={{ marginBottom: 20 }} />
                    )}
                </View>
            )}
        </>
    )
}

const PostMessages = ({selectedPostFormat, formatOneText, formatTwoText, formatThreeText, formatFourText, formatFiveText, colors}) => {
    return(
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