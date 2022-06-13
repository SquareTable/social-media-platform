import React, { useState, useContext, PropTypes, Component, useRef } from 'react';

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
    SearchSubTitle
} from '../screens/screenStylings/styling.js';

// Colors
const { brand, primary, tertiary, greyish, darkLight, darkestBlue, slightlyLighterPrimary, slightlyLighterGrey, descTextColor, darkest, red} = Colors;

// icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './CredentialsContext';
import { ImageBackground, ScrollView, View, FlatList, ActivityIndicator, Image } from 'react-native';

// formik
import {Formik} from 'formik';

import background from "./../assets/img/Toga.jpg";

//axios
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';

import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png.js';

import { ServerUrlContext } from './ServerUrlContext.js';

import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withSpring
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler'

export default function Post( post ) {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    if (storedCredentials) {var { _id } = storedCredentials} else {var {_id} = {_id: 'SSGUEST'}}
    //
    const [usersUdnVote, setUsersUdnVote] = useState(post.usersUdnVote)
    const [initalUsersUdnVotes, setInitialUsersUdnVotes] = useState(post.usersUdnVote)
    const [changingUdn, setChangingUdn] = useState(false)

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [postNumForMsg, setPostNumForMsg] = useState();

    const {serverUrl, setServerUrl} = useContext(ServerUrlContext);

    const colors = post.colors

    const handleMessage = (message, type = 'FAILED', postNum) => {
        setMessage(message);
        setMessageType(type);
        if (post.postNotFromFeed == false) {
            if (postNum !== null) {
                setPostNumForMsg(postNum)
            } else {
                setPostNumForMsg(null)
            }
        }
    }

    //upvotes and stuff
    const UpVoteImage = (imageId, postNum) => {
        //Change to loading circle
        if (changingUdn == true) {

        } else {
            //Do rest
            handleMessage(null, null, null);
            const url = serverUrl + "/user/upvoteimage";

            var toSend = { userId: _id, imageId: imageId }

            console.log(toSend)
            
            setChangingUdn(true)

            axios.post(url, toSend).then((response) => {
                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status, postNum);
                    setChangingUdn(false)
                } else {
                    handleMessage(message, status);
                    if (message == "Post UpVoted") {
                        setUsersUdnVote("UpVoted")
                        setChangingUdn(false)
                    } else {
                        //Neither
                        setUsersUdnVote("Neither")
                        setChangingUdn(false)
                    }
                    //loadAndGetValues()
                    //persistLogin({...data[0]}, message, status);
                }
            }).catch(error => {
                console.log(error);
                setChangingUdn(false)
                handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', postNum);
            })
        }
    }

    const DownVoteImage = (imageId, postNum) => {
        //Change to loading circle
        if (changingUdn == true) {

        } else {
            //Do rest
            handleMessage(null, null, null);
            const url = serverUrl + "/user/downvoteimage";

            var toSend = { userId: _id, imageId: imageId }

            setChangingUdn(true)

            console.log(toSend)

            axios.post(url, toSend).then((response) => {
                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status, postNum);
                    setChangingUdn(false)
                } else {
                    handleMessage(message, status);
                    if (message == "Post DownVoted") {
                        setUsersUdnVote("DownVoted")
                        setChangingUdn(false)
                    } else {
                        //Neither
                        setUsersUdnVote("Neither")
                        setChangingUdn(false)
                    }
                }
            }).catch(error => {
                console.log(error);
                setChangingUdn(false)
                handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', postNum);
            })
        }
    }

    const UpVotePoll = (pollId, postNum) => {
        //Change to loading circle
        if (changingUdn == true) {

        } else {
            //Do rest
            handleMessage(null, null, null);
            const url = serverUrl + "/user/upvotepoll";

            var toSend = { userId: _id, pollId: pollId }

            console.log(toSend)

            setChangingUdn(true)

            axios.post(url, toSend).then((response) => {
                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status, postNum);
                    setChangingUdn(false)
                } else {
                    handleMessage(message, status);
                    if (message == "Post UpVoted") {
                        setUsersUdnVote("UpVoted")
                        setChangingUdn(false)
                    } else {
                        //Neither
                        setUsersUdnVote("Neither")
                        setChangingUdn(false)
                    }
                }
            }).catch(error => {
                console.log(error);
                setChangingUdn(false)
                handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', postNum);
            })
        }
    }

    const DownVotePoll = (pollId, postNum) => {
        //Change to loading circle
        if (changingUdn == true) {

        } else {
            console.log("DownVoting")
            //Do rest
            handleMessage(null, null, null);
            const url = serverUrl + "/user/downvotepoll";

            var toSend = { userId: _id, pollId: pollId }

            console.log(toSend)

            setChangingUdn(true)

            axios.post(url, toSend).then((response) => {
                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status, postNum);
                    setChangingUdn(false)
                } else {
                    handleMessage(message, status);
                    if (message == "Post DownVoted") {
                        setUsersUdnVote("DownVoted")
                        setChangingUdn(false)
                    } else {
                        //Neither
                        setUsersUdnVote("Neither")
                        setChangingUdn(false)
                    }
                }
            }).catch(error => {
                console.log(error);
                setChangingUdn(false)
                handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', postNum);
            })
        }
    }

    const UpVoteThread = (threadId, postNum) => {
        //Change to loading circle
        if (changingUdn == true) {

        } else {
            console.log("UpVoting")
            //Do rest
            handleMessage(null, null, null);
            const url = serverUrl + "/user/upvotethread";

            var toSend = { userId: _id, threadId: threadId }

            console.log(toSend)

            setChangingUdn(true)

            axios.post(url, toSend).then((response) => {
                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status, postNum);
                    setChangingUdn(false)
                } else {
                    handleMessage(message, status);
                    if (message == "Thread UpVoted") {
                        setUsersUdnVote("UpVoted")
                        setChangingUdn(false)
                    } else {
                        //Neither
                        setUsersUdnVote("Neither")
                        setChangingUdn(false)
                    }
                }
            }).catch(error => {
                console.log(error);
                setChangingUdn(false)
                handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', postNum);
            })
        }
    }

    const DownVoteThread = (threadId, postNum) => {
        //Change to loading circle
        if (changingUdn == true) {

        } else {
            console.log("DownVoting")
            //Do rest
            handleMessage(null, null, null);
            const url = serverUrl + "/user/downvotethread";

            var toSend = { userId: _id, threadId: threadId }

            console.log(toSend)

            setChangingUdn(true)

            axios.post(url, toSend).then((response) => {
                const result = response.data;
                const { message, status, data } = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status, postNum);
                    setChangingUdn(false)
                } else {
                    handleMessage(message, status);
                    if (message == "Thread DownVoted") {
                        setUsersUdnVote("DownVoted")
                        setChangingUdn(false)
                    } else {
                        //Neither
                        setUsersUdnVote("Neither")
                        setChangingUdn(false)
                    }
                    //loadAndGetValues()
                    //persistLogin({...data[0]}, message, status);
                }
            }).catch(error => {
                console.log(error);
                setChangingUdn(false)
                handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED', postNum);
            })
        }
    }

    const PinchableImageBox = ({ imageUri }) => {
        const scale = useSharedValue(1);
        
        const pinchGesture = Gesture.Pinch()
            .onUpdate((e) => {
            scale.value = e.scale < 1 ? 1 : e.scale > 3 ? 3 : e.scale;
            })
            .onEnd(() => {
            scale.value = withSpring(1, {stiffness: 90, overshootClamping: true});
            });

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }],
        }));

        return (
            <GestureDetector gesture={pinchGesture}>
                <Animated.Image
                    source={{ uri: imageUri}}
                    style={
                        [
                            {
                                width: '100%',
                                height: '100%',
                                borderRadius: 20,
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: 100,
                            },
                            animatedStyle,
                        ]
                    }
                    resizeMode='cover'
                />
            </GestureDetector>
        )
    }


    //Items/models
    const ImageItem = ({format, imageKey, imageB64, imageTitle, imageDescription, imageUpVotes, imageComments, creatorName, creatorDisplayName, creatorPfpB64, datePosted, postNum , postNotFromFeed}) => (
        
        <View style={{ backgroundColor: colors.primary, borderRadius: 15, marginBottom: 10, borderWidth: 3, borderColor: colors.borderColor }}>
            <PostsHorizontalView style={{ marginLeft: '5%', borderBottomWidth: 3, borderColor: colors.borderColor, width: '90%', paddingBottom: 5, marginRight: '5%' }}>
                <PostsVerticalView>
                    <PostCreatorIcon source={creatorPfpB64 ? { uri: creatorPfpB64 } : {uri: SocialSquareLogo_B64_png}} />
                </PostsVerticalView>
                <PostsVerticalView style={{ marginTop: 9 }}>
                    {creatorDisplayName !== "" ? (
                        <SubTitle style={{ color: colors.brand, fontSize: 20, marginBottom: 0 }}>{creatorDisplayName}</SubTitle>
                    ) : (null)}
                    {creatorDisplayName == "" ? (
                        <SubTitle style={{ color: colors.brand, fontSize: 20, marginBottom: 0 }}>{creatorName}</SubTitle>
                    ) : (null)}
                    <SubTitle style={{ fontSize: 12, marginBottom: 0, color: colors.tertiary }}>@{creatorName}</SubTitle>
                </PostsVerticalView>
            </PostsHorizontalView>
            <PostsHorizontalView style={{ alignItems: 'center', justifyContent: 'center' }}>
                <MultiMediaPostFrame postOnProfile={true} style={{ aspectRatio: 1 / 1 }} onPress={() => post.navigation.navigate("ViewImagePostPage", { imageKey, imageB64, imageTitle, imageDescription, creatorName, creatorDisplayName, creatorPfpB64: creatorPfpB64, datePosted })}>
                    <PinchableImageBox imageUri={imageB64}/>
                </MultiMediaPostFrame>
            </PostsHorizontalView>
            <ImagePostTextFrame style={{ textAlign: 'center' }}>
                <SubTitle style={{ fontSize: 20, color: colors.tertiary, marginBottom: 0 }}>{imageTitle}</SubTitle>
                <SubTitle style={{ fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageDescription}</SubTitle>
            </ImagePostTextFrame>
            <PostHorizontalView style={{ marginLeft: '5%', width: '90%', paddingVertical: 10, flex: 1, flexDirection: 'row' }}>
                
                {changingUdn == true && (<View style={{flexDirection: 'row', flex: 3}}>
                    <PostsIconFrame/>
                    {changingUdn == true && (<PostsIconFrame>
                        <ActivityIndicator size="small" color={colors.brand} />
                    </PostsIconFrame>)}
                    <PostsIconFrame/>
                </View>)}

                {changingUdn == false && (
                    <View style={{flexDirection: 'row', flex: 3}}>
                        {usersUdnVote == "UpVoted" && (<PostsIconFrame onPress={() => { UpVoteImage(imageKey, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.brand }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                        </PostsIconFrame>)}
                        {usersUdnVote == "Neither" && (<PostsIconFrame onPress={() => { UpVoteImage(imageKey, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                        </PostsIconFrame>)}
                        {usersUdnVote == "DownVoted" && (<PostsIconFrame onPress={() => { UpVoteImage(imageKey, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                        </PostsIconFrame>)}

                        {usersUdnVote == "UpVoted" && (<PostsIconFrame>
                            {initalUsersUdnVotes == "UpVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "Neither" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes + 1}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "DownVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes + 2}</SubTitle>
                            )}
                        </PostsIconFrame>)}
                        {usersUdnVote == "Neither" && (<PostsIconFrame>
                            {initalUsersUdnVotes == "Neither" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "UpVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes - 1}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "DownVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes + 1}</SubTitle>
                            )}
                        </PostsIconFrame>)}
                        {usersUdnVote == "DownVoted" && (<PostsIconFrame>
                            {initalUsersUdnVotes == "DownVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "Neither" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes - 1}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "UpVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageUpVotes - 2}</SubTitle>
                            )}
                        </PostsIconFrame>)}

                        {usersUdnVote == "DownVoted" && (<PostsIconFrame onPress={() => { DownVoteImage(imageKey, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.brand }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                        </PostsIconFrame>)}
                        {usersUdnVote == "Neither" && (<PostsIconFrame onPress={() => { DownVoteImage(imageKey, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                        </PostsIconFrame>)}
                        {usersUdnVote == "UpVoted" && (<PostsIconFrame onPress={() => { DownVoteImage(imageKey, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                        </PostsIconFrame>)}
                    </View>
                )}

                <PostsIconFrame>
                </PostsIconFrame>
                <PostsIconFrame onPress={() => post.navigation.navigate("ViewImagePostPage", { imageKey, imageB64, imageTitle, imageDescription, creatorName, creatorDisplayName, creatorPfpB64: creatorPfpB64, datePosted })}>
                    <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/113-bubbles4.png')} />
                </PostsIconFrame>
                <PostsIconFrame>
                    <PostsIcons style={{ flex: 1, height: 30, width: 30, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/387-share2.png')} />
                </PostsIconFrame>
                <PostsIconFrame>
                    <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/img/ThreeDots.png')} />
                </PostsIconFrame>
            </PostHorizontalView>
            {postNumForMsg == postNum && (<MsgBox type={messageType}>{message}</MsgBox>)}
            <SubTitle style={{ flex: 1, alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{datePosted}</SubTitle>
            {postNotFromFeed == true ?
                <SubTitle style={{ flex: 1, alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageComments.length} comments</SubTitle>
            :
                <TouchableOpacity onPress={() => post.navigation.navigate("ViewImagePostPage", { imageKey, imageB64, imageTitle, imageDescription, creatorName, creatorDisplayName, creatorPfpB64: creatorPfpB64, datePosted })}>
                    <SubTitle style={{ flex: 1, alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{imageComments.length} comments</SubTitle>
                </TouchableOpacity>
            }
        </View>
    );

    const PollItem = ({format, pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollUpOrDownVotes, pollId, votedFor, postNum, pollComments, pfpB64, creatorName, creatorDisplayName, datePosted }) => (
        <PollPostFrame style={{marginLeft: 0, marginRight: 0, width: '100%'}} onPress={() => post.navigation.navigate("ViewPollPostPage", { pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: pfpB64, creatorName, creatorDisplayName, datePosted })}>
            <PostsHorizontalView style={{ marginLeft: '5%', borderBottomWidth: 3, borderColor: colors.borderColor, width: '90%', paddingBottom: 5, marginRight: '5%' }}>
                <PostsVerticalView>
                    <PostCreatorIcon source={pfpB64 ? { uri: pfpB64 } : {uri: SocialSquareLogo_B64_png}} />
                </PostsVerticalView>
                <PostsVerticalView style={{ marginTop: 9 }}>
                    {creatorDisplayName !== "" ? (
                        <SubTitle style={{ color: colors.brand, fontSize: 20, marginBottom: 0 }}>{creatorDisplayName}</SubTitle>
                    ) : (null)}
                    {creatorDisplayName == "" ? (
                        <SubTitle style={{ color: colors.brand, fontSize: 20, marginBottom: 0 }}>{creatorName}</SubTitle>
                    ) : (null)}
                    <SubTitle style={{ fontSize: 12, marginBottom: 0, color: colors.tertiary }}>@{creatorName}</SubTitle>
                </PostsVerticalView>
            </PostsHorizontalView>
            <PollPostTitle style={{ width: '95%', color: colors.brand }}>
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
                <PollBarItem borderChange={optionOnesBarLength} style={{ width: optionOnesBarLength + '%', backgroundColor: colors.brand }}></PollBarItem>
                <PollBarItem borderChange={optionTwosBarLength} style={{ width: optionTwosBarLength + '%', backgroundColor: colors.brand }}></PollBarItem>
                <PollBarItem borderChange={optionThreesBarLength} style={{ width: optionThreesBarLength + '%', backgroundColor: colors.brand }}></PollBarItem>
                <PollBarItem borderChange={optionFoursBarLength} style={{ width: optionFoursBarLength + '%', backgroundColor: colors.brand }}></PollBarItem>
                <PollBarItem borderChange={optionFivesBarLength} style={{ width: optionFivesBarLength + '%', backgroundColor: colors.brand }}></PollBarItem>
                <PollBarItem borderChange={optionSixesBarLength} style={{ width: optionSixesBarLength + '%', backgroundColor: colors.brand }}></PollBarItem>
            </PollBarOutline>
            <PollPostHorizontalView>
                <PollKeyViewOne pollOptions={totalNumberOfOptions} onPress={() => post.navigation.navigate("ViewPollPostPage", { pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: pfpB64, creatorName, creatorDisplayName, datePosted })}>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        1. {optionOne}
                    </PollPostSubTitle>
                    <PollKeysCircle circleColor={optionOnesColor}></PollKeysCircle>
                </PollKeyViewOne>
                <PollKeyViewTwo pollOptions={totalNumberOfOptions} onPress={() => post.navigation.navigate("ViewPollPostPage", { pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: pfpB64, creatorName, creatorDisplayName, datePosted })}>
                    <PollKeysCircle circleColor={optionTwosColor}></PollKeysCircle>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        2. {optionTwo}
                    </PollPostSubTitle>
                </PollKeyViewTwo>
            </PollPostHorizontalView>

            <PollPostHorizontalView>
                <PollKeyViewThree pollOptions={totalNumberOfOptions} onPress={() => post.navigation.navigate("ViewPollPostPage", { pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: pfpB64, creatorName, creatorDisplayName, datePosted })}>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        3. {optionThree}
                    </PollPostSubTitle>
                    <PollKeysCircle circleColor={optionThreesColor}></PollKeysCircle>
                </PollKeyViewThree>
                <PollKeyViewFour pollOptions={totalNumberOfOptions} onPress={() => post.navigation.navigate("ViewPollPostPage", { pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: pfpB64, creatorName, creatorDisplayName, datePosted })}>
                    <PollKeysCircle circleColor={optionFoursColor}></PollKeysCircle>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        4. {optionFour}
                    </PollPostSubTitle>
                </PollKeyViewFour>
            </PollPostHorizontalView>

            <PollPostHorizontalView>
                <PollKeyViewFive pollOptions={totalNumberOfOptions} onPress={() => post.navigation.navigate("ViewPollPostPage", { pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: pfpB64, creatorName, creatorDisplayName, datePosted })}>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        5. {optionFive}
                    </PollPostSubTitle>
                    <PollKeysCircle circleColor={optionFivesColor}></PollKeysCircle>
                </PollKeyViewFive>
                <PollKeyViewSix pollOptions={totalNumberOfOptions} onPress={() => post.navigation.navigate("ViewPollPostPage", { pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: pfpB64, creatorName, creatorDisplayName, datePosted })}>
                    <PollKeysCircle circleColor={optionSixesColor}></PollKeysCircle>
                    <PollPostSubTitle style={{color: colors.tertiary}}>
                        6. {optionSix}
                    </PollPostSubTitle>
                </PollKeyViewSix>
            </PollPostHorizontalView>
            <PostHorizontalView style={{ marginLeft: '5%', width: '90%', paddingVertical: 10, flex: 1, flexDirection: 'row', borderTopWidth: 3, borderColor: colors.darkest }}>
                {changingUdn == true && (<View style={{flexDirection: 'row', flex: 3}}>
                    <PostsIconFrame/>
                    {changingUdn == true && (<PostsIconFrame>
                        <ActivityIndicator size="small" color={colors.brand} />
                    </PostsIconFrame>)}
                    <PostsIconFrame/>
                </View>)}

                {changingUdn == false && (
                    <View style={{flexDirection: 'row', flex: 3}}>
                        {usersUdnVote == "UpVoted" && (<PostsIconFrame onPress={() => { UpVotePoll(pollId, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.brand }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                        </PostsIconFrame>)}
                        {usersUdnVote == "Neither" && (<PostsIconFrame onPress={() => { UpVotePoll(pollId, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                        </PostsIconFrame>)}
                        {usersUdnVote == "DownVoted" && (<PostsIconFrame onPress={() => { UpVotePoll(pollId, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                        </PostsIconFrame>)}

                        {usersUdnVote == "UpVoted" && (<PostsIconFrame>
                            {initalUsersUdnVotes == "UpVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "Neither" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes + 1}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "DownVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes + 2}</SubTitle>
                            )}
                        </PostsIconFrame>)}
                        {usersUdnVote == "Neither" && (<PostsIconFrame>
                            {initalUsersUdnVotes == "Neither" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "UpVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes - 1}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "DownVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes + 1}</SubTitle>
                            )}
                        </PostsIconFrame>)}
                        {usersUdnVote == "DownVoted" && (<PostsIconFrame>
                            {initalUsersUdnVotes == "DownVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "Neither" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes - 1}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "UpVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollUpOrDownVotes - 2}</SubTitle>
                            )}
                        </PostsIconFrame>)}

                        {usersUdnVote == "DownVoted" && (<PostsIconFrame onPress={() => { DownVotePoll(pollId, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.brand }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                        </PostsIconFrame>)}
                        {usersUdnVote == "Neither" && (<PostsIconFrame onPress={() => { DownVotePoll(pollId, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                        </PostsIconFrame>)}
                        {usersUdnVote == "UpVoted" && (<PostsIconFrame onPress={() => { DownVotePoll(pollId, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                        </PostsIconFrame>)}
                    </View>      
                )}

                <PostsIconFrame>
                </PostsIconFrame>
                <PostsIconFrame onPress={() => post.navigation.navigate("ViewPollPostPage", { pollTitle, pollSubTitle, optionOne, optionOnesColor, optionOnesVotes, optionOnesBarLength, optionTwo, optionTwosColor, optionTwosVotes, optionTwosBarLength, optionThree, optionThreesColor, optionThreesVotes, optionThreesBarLength, optionFour, optionFoursColor, optionFoursVotes, optionFoursBarLength, optionFive, optionFivesColor, optionFivesVotes, optionFivesBarLength, optionSix, optionSixesColor, optionSixesVotes, optionSixesBarLength, totalNumberOfOptions, pollId, creatorPfpB64: pfpB64, creatorName, creatorDisplayName, datePosted })}>
                    <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/113-bubbles4.png')} />
                </PostsIconFrame>
                <PostsIconFrame>
                    <PostsIcons style={{ flex: 1, height: 30, width: 30, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/387-share2.png')} />
                </PostsIconFrame>
                <PostsIconFrame>
                    <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/img/ThreeDots.png')} />
                </PostsIconFrame>
            </PostHorizontalView>
            {postNumForMsg == postNum && (<MsgBox type={messageType}>{message}</MsgBox>)}
            <SubTitle style={{ flex: 1, alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{datePosted}</SubTitle>
            {pollComments && (
                <SubTitle style={{ flex: 1, alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{pollComments.length} comments</SubTitle>
            )}
        </PollPostFrame>
    );

    const ThreadItems = ({ format, postNum, threadId, threadComments, threadType, threadUpVotes, threadTitle, threadSubtitle, threadTags, threadCategory, threadBody, threadImageKey, threadImageDescription, threadNSFW, threadNSFL, datePosted, threadUpVoted, threadDownVoted, creatorDisplayName, creatorName, creatorImageB64, imageInThreadB64 }) => (
        <View style={{ backgroundColor: colors.primary, borderRadius: 15, marginBottom: 10, borderColor: colors.borderColor, borderWidth: 3 }} onPress={() => post.navigation.navigate("ThreadViewPage", { threadId: threadId })}>
            {threadNSFW === true && (
                <SubTitle style={{ fontSize: 10, color: colors.red, marginBottom: 0 }}>(NSFW)</SubTitle>
            )}
            {threadNSFL === true && (
                <SubTitle style={{ fontSize: 10, color: colors.red, marginBottom: 0 }}>(NSFL)</SubTitle>
            )}
            <View style={{ paddingHorizontal: '50%' }}>
            </View>
            <PostsHorizontalView style={{ marginLeft: '5%', borderColor: colors.borderColor, width: '90%', paddingBottom: 5, marginRight: '5%' }}>
                <TouchableOpacity style={{ width: '100%', height: 60 }}>
                    <PostsHorizontalView>
                        {creatorImageB64 !== null && (
                            <PostsVerticalView>
                                {creatorImageB64 !== null && (
                                    <PostCreatorIcon source={{ uri: creatorImageB64}} />
                                )}
                            </PostsVerticalView>
                        )}
                        {creatorImageB64 == null && (
                            <PostsVerticalView>
                                <PostCreatorIcon source={{uri: SocialSquareLogo_B64_png}} />
                            </PostsVerticalView>
                        )}
                        <PostsVerticalView style={{ marginTop: 9 }}>
                            {creatorDisplayName !== "" ? (
                                <SubTitle style={{ color: colors.brand, fontSize: 20, marginBottom: 0 }}>{creatorDisplayName}</SubTitle>
                            ) : (null)}
                            {creatorDisplayName == "" ? (
                                <SubTitle style={{ color: colors.brand, fontSize: 20, marginBottom: 0 }}>{creatorName}</SubTitle>
                            ) : (null)}
                            <SubTitle style={{ fontSize: 12, color: colors.brand, marginBottom: 0 }}>@{creatorName}</SubTitle>
                        </PostsVerticalView>
                    </PostsHorizontalView>
                </TouchableOpacity>
            </PostsHorizontalView>
            <TouchableOpacity onPress={() => post.navigation.navigate("ThreadViewPage", { threadId: threadId })}>
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

                {changingUdn == true && (<View style={{flexDirection: 'row', flex: 3}}>
                    <PostsIconFrame/>
                    {changingUdn == true && (<PostsIconFrame>
                        <ActivityIndicator size="small" color={colors.brand} />
                    </PostsIconFrame>)}
                    <PostsIconFrame/>
                </View>)}

                {changingUdn == false && (
                    <View style={{flexDirection: 'row', flex: 3}}>
                        {usersUdnVote == "UpVoted" && (<PostsIconFrame onPress={() => { UpVoteThread(threadId, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.brand }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                        </PostsIconFrame>)}
                        {usersUdnVote == "Neither" && (<PostsIconFrame onPress={() => { UpVoteThread(threadId, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                        </PostsIconFrame>)}
                        {usersUdnVote == "DownVoted" && (<PostsIconFrame onPress={() => { UpVoteThread(threadId, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')} />
                        </PostsIconFrame>)}

                        {usersUdnVote == "UpVoted" && (<PostsIconFrame>
                            {initalUsersUdnVotes == "UpVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "Neither" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes + 1}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "DownVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes + 2}</SubTitle>
                            )}
                        </PostsIconFrame>)}
                        {usersUdnVote == "Neither" && (<PostsIconFrame>
                            {initalUsersUdnVotes == "Neither" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "UpVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes - 1}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "DownVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes + 1}</SubTitle>
                            )}
                        </PostsIconFrame>)}
                        {usersUdnVote == "DownVoted" && (<PostsIconFrame>
                            {initalUsersUdnVotes == "DownVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "Neither" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes - 1}</SubTitle>
                            )}
                            {initalUsersUdnVotes == "UpVoted" && (
                                <SubTitle style={{ alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadUpVotes - 2}</SubTitle>
                            )}
                        </PostsIconFrame>)}

                        {usersUdnVote == "DownVoted" && (<PostsIconFrame onPress={() => { DownVoteThread(threadId, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.brand }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                        </PostsIconFrame>)}
                        {usersUdnVote == "Neither" && (<PostsIconFrame onPress={() => { DownVoteThread(threadId, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                        </PostsIconFrame>)}
                        {usersUdnVote == "UpVoted" && (<PostsIconFrame onPress={() => { DownVoteThread(threadId, postNum) }}>
                            <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')} />
                        </PostsIconFrame>)}
                    </View>
                )}

                <PostsIconFrame>
                </PostsIconFrame>
                <PostsIconFrame onPress={() => post.navigation.navigate("ThreadViewPage", { threadId: threadId })}>
                    <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/113-bubbles4.png')} />
                </PostsIconFrame>
                <PostsIconFrame>
                    <PostsIcons style={{ flex: 1, height: 30, width: 30, tintColor: colors.tertiary }} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/387-share2.png')} />
                </PostsIconFrame>
                <PostsIconFrame>
                    <PostsIcons style={{ flex: 1, tintColor: colors.tertiary }} source={require('./../assets/img/ThreeDots.png')} />
                </PostsIconFrame>
            </PostHorizontalView>
            {postNumForMsg == postNum && (<MsgBox type={messageType}>{message}</MsgBox>)}
            <SubTitle style={{ flex: 1, alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{datePosted}</SubTitle>
            <TouchableOpacity onPress={() => post.navigation.navigate("ThreadViewPage", { threadId: threadId })}>
                <SubTitle style={{ flex: 1, alignSelf: 'center', fontSize: 16, color: colors.descTextColor, marginBottom: 0, fontWeight: 'normal' }}>{threadComments} comments</SubTitle>
            </TouchableOpacity>
        </View>
    );


    return (
        <>
            {post.format == "Image" && (
                <ImageItem format={post.format} imageId={post.imageId} imageKey={post.imageKey} imageB64={post.imageB64} imageTitle={post.imageTitle} imageDescription={post.imageDescription} imageUpVotes={post.imageUpVotes} imageComments={post.imageComments} creatorName={post.creatorName} creatorDisplayName={post.creatorDisplayName} creatorPfpB64={post.creatorPfpB64} datePosted={post.datePosted} postNum={post.postNum} postNotFromFeed={post.postNotFromFeed}/>
            )}
            {post.format == "Poll" && (
                <PollItem format={post.format} pollTitle={post.pollTitle} pollSubTitle={post.pollSubTitle} optionOne={post.optionOne} optionOnesColor={post.optionOnesColor} optionOnesVotes={post.optionOnesVotes} optionOnesBarLength={post.optionOnesBarLength} optionTwo={post.optionTwo} optionTwosColor={post.optionTwosColor} optionTwosVotes={post.optionTwosVotes} optionTwosBarLength={post.optionTwosBarLength} optionThree={post.optionThree} optionThreesColor={post.optionThreesColor} optionThreesVotes={post.optionThreesVotes} optionThreesBarLength={post.optionThreesBarLength} optionFour={post.optionFour} optionFoursColor={post.optionFoursColor} optionFoursVotes={post.optionFoursVotes} optionFoursBarLength={post.optionFoursBarLength} optionFive={post.optionFive} optionFivesColor={post.optionFivesColor} optionFivesVotes={post.optionFivesVotes} optionFivesBarLength={post.optionFivesBarLength} optionSix={post.optionSix} optionSixesColor={post.optionSixesColor} optionSixesVotes={post.optionSixesVotes} optionSixesBarLength={post.optionSixesBarLength} totalNumberOfOptions={post.totalNumberOfOptions} pollUpOrDownVotes={post.pollUpOrDownVotes} pollId={post.pollId} votedFor={post.votedFor} pfpB64={post.pfpB64} creatorName={post.creatorName} creatorDisplayName={post.creatorDisplayName} postNum={post.postNum} datePosted={post.datePosted} pollComments={post.pollComments} />
            )}
            {post.format == "Thread" && (
                <ThreadItems format={post.format} postNum={post.postNum} threadId={post.threadId} threadComments={post.threadComments} threadType={post.threadType} threadUpVotes={post.threadUpVotes} threadTitle={post.threadTitle} threadSubtitle={post.threadSubtitle} threadTags={post.threadTags} threadCategory={post.threadCategory} threadBody={post.threadBody} threadImageKey={post.threadImageKey} threadImageDescription={post.threadImageDescription} threadNSFW={post.threadNSFW} threadNSFL={post.threadNSFL} datePosted={post.datePosted} threadUpVoted={post.threadUpVoted} threadDownVoted={post.threadDownVoted} creatorDisplayName={post.creatorDisplayName} creatorName={post.creatorName} creatorImageB64={post.creatorImageB64} imageInThreadB64={post.imageInThreadB64} />
            )}
        </>
    );
}