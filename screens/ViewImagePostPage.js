import React, {useState, useContext, Component, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import {Formik} from 'formik';

// icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withSpring
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';


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
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
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
    ViewScreenPollPostFrame,
    PollHorizontalViewItem,
    PollHorizontalViewItemCenter,
    ViewScreenPollPostCommentsFrame,
    CommentsContainer,
    CommenterName,
    CommenterIcon,
    CommentsHorizontalView,
    CommentsVerticalView,
    CommentText,
    CommentIcons,
    CommentsHorizontalViewItem,
    VoteText,
    MsgBox,
    VoteTextBox,
    MultiMediaPostFrame,
    ImagePostFrame,
    PostCreatorIcon,
    PostsHorizontalView,
    PostsVerticalView,
    PostHorizontalView,
    PostsIcons,
    PostsIconFrame,
    ImagePostTextFrame,
    ChatScreen_Title,
    Navigator_BackButton,
    TestText
} from './screenStylings/styling';

// Colors
const {brand, primary, tertiary, greyish, darkLight, slightlyLighterPrimary, descTextColor} = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// API client
import axios from 'axios';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';

import { View, ImageBackground, ScrollView, SectionList, ActivityIndicator, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext';

import { ServerUrlContext } from '../components/ServerUrlContext.js';


const ViewImagePostPage = ({route, navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    if (storedCredentials) {var {_id, name } = storedCredentials} else {var {_id, name } = {_id: 'SSGUEST', name: 'SSGUEST'}}
    const [pfpB64, setpfpB64] = useState('./../assets/img/Logo.png')
    const {imageKey, imageB64, imageTitle, imageDescription, creatorName, creatorDisplayName, creatorPfpB64, datePosted} = route.params;
    //Comment stuff
    const [ifCommentText, setIfCommentText] = useState("No comments found")
    const [changeSections, setChangeSections] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [limitSearch, setLimitSearch] = useState(false)
    const [commentLoadMax, setCommentLoadMax] = useState(10)
    const [commentsLength , setCommentsLength] = useState("Loading")
    const [loadingMoreComments, setLoadingMoreComments] = useState(false)
    //upvotes
    const [imageUpOrDownVotes, setImageUpOrDownVotes] = useState("Finding")
    const [imageUpOrDownVoted, setImageUpOrDownVoted] = useState("Finding")
    const [initialImageUpOrDownVoted, setInitialImageUpOrDownVoted] = useState("Finding")
    //Server stuff
    const {serverUrl, setServerUrl} = useContext(ServerUrlContext);

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const {colors, dark} = useTheme()

    //PFP
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext);

    //get image of post
    async function getImageInPost(imageData, index) {
        return axios.get(`${serverUrl}/getImageOnServer/${imageData[index].imageKey}`)
        .then(res => 'data:image/jpeg;base64,' + res.data);
    }
    //profile image of creator
    async function getImageInPfp(imageData, index) {
        return axios.get(`${serverUrl}/getImageOnServer/${imageData[index].creatorPfpKey}`)
        .then(res => 'data:image/jpeg;base64,' + res.data);
    }
    //profile image of commenter
    async function getImageInPfpComments(commentData, index) {
        return axios.get(`${serverUrl}/getImageOnServer/${commentData[index].profileImageKey}`)
        .then(res => 'data:image/jpeg;base64,' + res.data);
    }

    const UpVoteImage = () => {
        if (storedCredentials) {
            //Change to loading circle
            const beforeChange = imageUpOrDownVoted
            setImageUpOrDownVoted("Changing")
            //Do rest
            handleMessage(null, null, null);
            const url = serverUrl + "/tempRoute/upvoteimage";

            var toSend = {userId: _id, imageId: imageKey}

            console.log(toSend)

            axios.post(url, toSend).then((response) => {
                const result = response.data;
                const {message, status, data} = result;
            
                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                    setImageUpOrDownVoted(beforeChange)
                } else {
                    handleMessage(message, status);
                    if (message == "Post UpVoted") {
                        setImageUpOrDownVoted("UpVoted")
                    } else {
                        setImageUpOrDownVoted("Neither")
                    }
                    //loadAndGetValues()
                    //persistLogin({...data[0]}, message, status);
                }
            }).catch(error => {
                console.log(error);
                setImageUpOrDownVoted(beforeChange)
                handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED');
            })
        } else {
            navigation.navigate('ModalLoginScreen', {modal: true})
        }
    }

    const DownVoteImage = () => {
        if (storedCredentials) {
            //Change to loading circle
            const beforeChange = imageUpOrDownVoted
            setImageUpOrDownVoted("Changing")
            //Do rest
            handleMessage(null, null, null);
            const url = serverUrl + "/tempRoute/downvoteimage";

            var toSend = {userId: _id, imageId: imageKey}

            console.log(toSend)

            axios.post(url, toSend).then((response) => {
                const result = response.data;
                const {message, status, data} = result;
            
                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                    setImageUpOrDownVoted(beforeChange)
                } else {
                    handleMessage(message, status);
                    if (message == "Post DownVoted") {
                        setImageUpOrDownVoted("DownVoted")
                    } else {
                        setImageUpOrDownVoted("Neither")
                    }
                    //loadAndGetValues()
                    //persistLogin({...data[0]}, message, status);
                }
            }).catch(error => {
                console.log(error);
                setImageUpOrDownVoted(beforeChange)
                handleMessage("An error occured. Try checking your network connection and retry.", 'FAILED');
            })
        } else {
            navigation.navigate('ModalLoginScreen', {modal: true})
        }
    }
    
    const Item = ({commentId, commenterName, commenterDisplayName, commentsText, commentUpVotes, commentReplies, datePosted, commenterImageB64}) => (
        <CommentsContainer>
            <CommentsHorizontalView>
                <CommentsVerticalView alongLeft={true}>
                    <TouchableOpacity>
                        <CommenterIcon source={{uri: commenterImageB64}}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <CommentIcons source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <VoteText style={{color: colors.tertiary}}>
                            {commentUpVotes}
                        </VoteText>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <CommentIcons downVoteButton={true} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')}/>
                    </TouchableOpacity>
                </CommentsVerticalView>
                <CommentsVerticalView>
                    <TouchableOpacity>
                        <CommenterName style={{color: colors.tertiary}} displayName={true}>{commenterDisplayName}</CommenterName>
                        <CommenterName>@{commenterName}</CommenterName>
                    </TouchableOpacity>
                    <CommentText style={{color: colors.tertiary}}>{commentsText}</CommentText>
                </CommentsVerticalView>
            </CommentsHorizontalView>
            <CommentsHorizontalView bottomIcons={true}>
                <CommentsVerticalView alongLeft={true}>
                    <TouchableOpacity>
                        <CommentIcons source={require('./../assets/img/ThreeDots.png')}/>
                    </TouchableOpacity>
                </CommentsVerticalView>
                <CommentsVerticalView datePosted={true}>
                    <VoteText style={{color: colors.tertiary}}>
                        {datePosted}
                    </VoteText>
                    <TouchableOpacity onPress={() => {navigation.navigate("CommentViewPage", {commentId: commentId, postId: imageKey, postFormat: "Image"})}}>
                        <VoteText style={{color: brand}}>
                            {commentReplies} replies
                        </VoteText>
                    </TouchableOpacity>
                </CommentsVerticalView>
                <CommentsVerticalView alongLeft={true}>
                    <TouchableOpacity>
                        <CommentIcons source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/107-reply.png')}/>
                    </TouchableOpacity>
                </CommentsVerticalView>
            </CommentsHorizontalView>
        </CommentsContainer>
    );

    const prepareUpVotes = () => {
        const urlOne = `${serverUrl}/tempRoute/getimageupvoteswithkey`;

        axios.post(urlOne, {imageKey, userId: _id}).then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                handleMessage(message, status);
                setImageUpOrDownVotes("N/A")
                setInitialImageUpOrDownVoted("N/A")
            } else {
                setImageUpOrDownVotes(data.imageUpVotes)
                if (data.imageUpVoted == true) {
                    setImageUpOrDownVoted("UpVoted")
                    setInitialImageUpOrDownVoted("UpVoted")
                } else if (data.imageDownVoted == true) {
                    setImageUpOrDownVoted("DownVoted")
                    setInitialImageUpOrDownVoted("DownVoted")
                } else {
                    setImageUpOrDownVoted("Neither")
                    setInitialImageUpOrDownVoted("Neither")
                }
            }
            //setSubmitting(false);

        }).catch(error => {
            console.log(error);
            //setSubmitting(false);
            handleMessage("An error occured. Try checking your network connection and retry.");
        })
    }

    const prepareComments = () => {
        setIfCommentText("No comments found")
        const layoutComments = (data) => {
            setIfCommentText("Poll Comments:")
            var imageData = data.data
            var commentData = imageData
            console.log(commentData)
            setCommentsLength(commentData.length)
            setChangeSections([])
            console.log(commentData.length)
            var tempSections = []
            var itemsProcessed = 0;
            if (storedCredentials) {
                commentData.forEach(function (item, index) {
                    if (index+1 <= commentLoadMax) {
                        var displayName = commentData[index].commenterDisplayName
                        if (displayName == "") {
                            displayName = commentData[index].commenterName
                        }
                        //get pfp
                        if (commentData[index].profileImageKey !== "" || data !== null) {
                            async function getImageWithAwait() {
                                const pfpB64 = await getImageInPfpComments(imageData, index)
                                var tempSectionsTemp = {data: [{commentId: commentData[index].commentId, commenterName: commentData[index].commenterName, commenterDisplayName: displayName, commentsText: commentData[index].commentText, commentUpVotes: commentData[index].commentUpVotes, commentReplies: commentData[index].commentReplies, datePosted: commentData[index].datePosted, commenterImageB64: pfpB64}]}
                                tempSections.push(tempSectionsTemp)
                                itemsProcessed++;
                                if(itemsProcessed === imageData.length) {
                                    console.log(tempSections)
                                    setLoadingMoreComments(false)
                                    setChangeSections(tempSections) 
                                }
                            }
                            getImageWithAwait();
                        } else {
                            //add to list
                            var tempSectionsTemp = {data: [{commentId: commentData[index].commentId, commenterName: commentData[index].commenterName, commenterDisplayName: displayName, commentsText: commentData[index].commentText, commentUpVotes: commentData[index].commentUpVotes, commentReplies: commentData[index].commentReplies, datePosted: commentData[index].datePosted, commenterImageB64: require("./../assets/img/Logo.png")}]}
                            tempSections.push(tempSectionsTemp)
                            itemsProcessed++;
                            if(itemsProcessed === imageData.length) {
                                console.log(tempSections)
                                setLoadingMoreComments(false)
                                setChangeSections(tempSections)
                            }
                        }
                    }
                });
            }
        }

        const urlTwo = `${serverUrl}/tempRoute/getimagecommentswithkey/${imageKey}/${_id}`;
        setLoadingMoreComments(true)
        axios.get(urlTwo).then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                handleMessage(message, status);
                setLoadingMoreComments(false)
                if (message == 'No Comments') {
                    setCommentsLength(0)
                }
            } else {
                layoutComments({data});
            }
            //setSubmitting(false);

        }).catch(error => {
            console.log(error);
            setLoadingMoreComments(false)
            //setSubmitting(false);
            handleMessage("An error occured. Try checking your network connection and retry.");
        })
    }

    if (limitSearch == false) {
        setLimitSearch(true);
        prepareComments();
        prepareUpVotes();
    }
    
    const handleCommentPost = (commentProperties, setSubmitting) => {
        handleMessage(null);
        const url = serverUrl + "/tempRoute/imagepostcomment";

        axios.post(url, commentProperties).then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                handleMessage(message, status);
            } else {
                handleMessage("Comment Uploaded", "SUCCESS");
                prepareComments()
                //persistLogin({...data[0]}, message, status);
            }
            setSubmitting(false);

        }).catch(error => {
            console.log(error);
            setSubmitting(false);
            handleMessage("An error occured. Try checking your network connection and retry.");
        })
    }

    const PinchableBox = ({ imageUri }) => {
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
                    source={{ uri: imageUri }}
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
                                zIndex: 2,
                            },
                            animatedStyle,
                        ]
                    }
                    resizeMode='cover'
                />
            </GestureDetector>
        )
    }
    return(
        <>    
            <StatusBar style={colors.StatusBarColor}/>
            <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                    <Image
                        source={require('../assets/app_icons/back_arrow.png')}
                        style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                        resizeMode="contain"
                        resizeMethod="resize"
                    />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>{creatorDisplayName ? creatorDisplayName : creatorName}'s post</TestText>
            </ChatScreen_Title>
                <ScrollView style={{height: '100%', backgroundColor: colors.primary}}>
                    <View style={{backgroundColor: dark ? slightlyLighterPrimary : colors.borderColor, borderRadius: 15, marginBottom: 10}}>
                        <PostsHorizontalView style={{marginLeft: '5%', borderBottomWidth: 3, borderColor: darkLight, width: '90%', paddingBottom: 5, marginRight: '5%'}}>
                            <PostsVerticalView>
                                <PostCreatorIcon source={{uri: creatorPfpB64}}/>
                            </PostsVerticalView>
                            <PostsVerticalView style={{marginTop: 9}}>
                                <SubTitle style={{fontSize: 20, color: brand, marginBottom: 0}}>{creatorDisplayName}</SubTitle>
                                <SubTitle style={{fontSize: 12, marginBottom: 0, color: colors.tertiary}}>@{creatorName}</SubTitle>
                            </PostsVerticalView>
                        </PostsHorizontalView>
                        <PostsHorizontalView style={{alignItems: 'center', justifyContent: 'center', zIndex: 2}}>
                            <MultiMediaPostFrame postOnProfile={true} style={{ aspectRatio: 1/1, zIndex: 2 }}>
                                <PinchableBox imageUri={imageB64}/>
                            </MultiMediaPostFrame>
                        </PostsHorizontalView>
                        {imageTitle !== '' || imageDescription !== '' &&
                            <ImagePostFrame style={{textAlign: 'left'}}>
                                {imageTitle !== '' && <SubTitle style={{fontSize: 20, color: colors.tertiary, marginBottom: 0}}>{imageTitle}</SubTitle>}
                                {imageDescription !== '' && <SubTitle style={{fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageDescription}</SubTitle>}
                            </ImagePostFrame>
                        }
                        <PostHorizontalView style={{marginLeft: '5%', width: '90%', paddingVertical: 10, flex: 1, flexDirection: 'row'}}>
                            
                            {imageUpOrDownVoted == "UpVoted" && (<PostsIconFrame onPress={() => {UpVoteImage()}}>
                                <PostsIcons style={{flex: 1, tintColor: colors.brand}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')}/>
                            </PostsIconFrame>)}
                            {imageUpOrDownVoted == "Neither" && (<PostsIconFrame onPress={() => {UpVoteImage()}}>
                                <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')}/>
                            </PostsIconFrame>)}
                            {imageUpOrDownVoted == "DownVoted" && (<PostsIconFrame onPress={() => {UpVoteImage()}}>
                                <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/322-circle-up.png')}/>
                            </PostsIconFrame>)}
                            {imageUpOrDownVoted == "Changing" && (<PostsIconFrame></PostsIconFrame>)}

                            {imageUpOrDownVoted == "Finding" && (<PostsIconFrame style={{flex: 3}}>
                                <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpOrDownVotes}</SubTitle>
                            </PostsIconFrame>)}
                            {imageUpOrDownVoted == "UpVoted" && (<PostsIconFrame>
                                {initialImageUpOrDownVoted == "UpVoted" && (
                                    <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpOrDownVotes}</SubTitle>
                                )}
                                {initialImageUpOrDownVoted == "Neither" && (
                                    <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpOrDownVotes+1}</SubTitle>
                                )}
                                {initialImageUpOrDownVoted == "DownVoted" && (
                                    <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpOrDownVotes+2}</SubTitle>
                                )}
                            </PostsIconFrame>)}
                            {imageUpOrDownVoted == "Neither" && (<PostsIconFrame>
                                {initialImageUpOrDownVoted == "Neither" && (
                                    <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpOrDownVotes}</SubTitle>
                                )}
                                {initialImageUpOrDownVoted == "UpVoted" && (
                                    <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpOrDownVotes-1}</SubTitle>
                                )}
                                {initialImageUpOrDownVoted == "DownVoted" && (
                                    <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpOrDownVotes+1}</SubTitle>
                                )}
                            </PostsIconFrame>)}
                            {imageUpOrDownVoted == "DownVoted" && (<PostsIconFrame>
                                {initialImageUpOrDownVoted == "DownVoted" && (
                                    <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpOrDownVotes}</SubTitle>
                                )}
                                {initialImageUpOrDownVoted == "Neither" && (
                                    <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpOrDownVotes-1}</SubTitle>
                                )}
                                {initialImageUpOrDownVoted == "UpVoted" && (
                                    <SubTitle style={{alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{imageUpOrDownVotes-2}</SubTitle>
                                )}
                            </PostsIconFrame>)}
                            {imageUpOrDownVoted == "Changing" && (<PostsIconFrame>
                                <ActivityIndicator size="small" color={brand} />                
                            </PostsIconFrame>)}
                            
                            {imageUpOrDownVoted == "DownVoted" && (<PostsIconFrame onPress={() => {DownVoteImage()}}>
                                <PostsIcons style={{flex: 1, tintColor: colors.brand}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')}/>
                            </PostsIconFrame>)}
                            {imageUpOrDownVoted == "Neither" && (<PostsIconFrame onPress={() => {DownVoteImage()}}>
                                <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')}/>
                            </PostsIconFrame>)}
                            {imageUpOrDownVoted == "UpVoted" && (<PostsIconFrame onPress={() => {DownVoteImage()}}>
                                <PostsIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/324-circle-down.png')}/>
                            </PostsIconFrame>)}
                            {imageUpOrDownVoted == "Changing" && (<PostsIconFrame></PostsIconFrame>)}
                            <PostsIconFrame>
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
                        {typeof message === 'string' || message instanceof String && (
                            <MsgBox type={messageType}>{message}</MsgBox>
                        )}
                        <SubTitle style={{flex: 1, alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{datePosted}</SubTitle>
                        <SubTitle style={{flex: 1, alignSelf: 'center', fontSize: 16, color: descTextColor, marginBottom: 0, fontWeight: 'normal'}}>{commentsLength} comments</SubTitle>
                    </View>
                    {storedCredentials ?
                        <ViewScreenPollPostCommentsFrame style={{width: '100%', marginLeft: 0, marginRight: 0}}>
                            <PollPostTitle commentsTitle={true}>Comments</PollPostTitle>
                            <CommentsHorizontalView writeCommentArea={true}>
                                <Formik
                                    initialValues={{comment: '', userName: name, userId: _id, imageKey: imageKey}}
                                    onSubmit={(values, {setSubmitting}) => {
                                        if (values.comment == "") {
                                            handleMessage('You cant post and empty comment');
                                            setSubmitting(false);
                                        } else {
                                            handleCommentPost(values, setSubmitting);
                                            values.comment = ""
                                        }
                                    }}
                                >
                                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                                        <View>
                                            <CommentsHorizontalView>
                                                <CommentsHorizontalViewItem>
                                                    <CommenterName>Img/GIF</CommenterName>
                                                </CommentsHorizontalViewItem>
                                                <CommentsHorizontalViewItem>
                                                    <CommenterName>Text</CommenterName>
                                                </CommentsHorizontalViewItem>
                                                <CommentsHorizontalViewItem>
                                                    <CommenterName>Short Video</CommenterName>
                                                </CommentsHorizontalViewItem>
                                            </CommentsHorizontalView>
                                            <CommentsHorizontalView writeCommentArea={true}>
                                                <CommentsVerticalView alongLeft={true}>
                                                    <CommenterIcon source={{uri: profilePictureUri}}/>
                                                </CommentsVerticalView>
                                                <CommentsVerticalView>
                                                    <UserTextInput
                                                        placeholder="Post a comment"
                                                        placeholderTextColor={darkLight}
                                                        onChangeText={handleChange('comment')}
                                                        onBlur={handleBlur('comment')}
                                                        value={values.comment}
                                                        multiline={true}
                                                        style={{backgroundColor: colors.primary, borderColor: colors.borderColor, color: colors.tertiary}}
                                                    />
                                                </CommentsVerticalView>
                                            </CommentsHorizontalView>
                                            <CommentsHorizontalView belowWriteCommentArea={true}>
                                                <CommentsVerticalView postComment={true}>
                                                    {!isSubmitting && (<StyledButton style={{backgroundColor: colors.primary}} postComment={true} onPress={handleSubmit}>
                                                        <ButtonText postComment={true}> Post </ButtonText>
                                                    </StyledButton>)}
                                                    <MsgBox type={messageType}>{message}</MsgBox>
                                                    {isSubmitting && (<StyledButton disabled={true}>
                                                        <ActivityIndicator size="large" color={colors.primary} />
                                                    </StyledButton>)}
                                                </CommentsVerticalView>
                                            </CommentsHorizontalView>
                                        </View>
                                        )}
                                </Formik>
                            </CommentsHorizontalView>
                            <PollPostSubTitle>{ifCommentText}</PollPostSubTitle>
                            <SectionList
                                sections={changeSections}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item }) => <Item commentId={item.commentId} commenterName={item.commenterName} commenterDisplayName={item.commenterDisplayName} commentsText={item.commentsText}  commentUpVotes={item.commentUpVotes} commentReplies={item.commentReplies} datePosted={item.datePosted} commenterImageB64={item.commenterImageB64}/>}
                            />
                            {loadingMoreComments == true && (
                                <ActivityIndicator size="small" color={brand} />  
                            )}
                        </ViewScreenPollPostCommentsFrame>
                    :
                        <View style={{marginTop: 20}}>
                            <Text style={{color: colors.tertiary, fontSize: 20, textAlign: 'center', marginBottom: 20}}>Please login to post comments on this post</Text>
                            <StyledButton onPress={() => {navigation.navigate('ModalLoginScreen', {modal: true})}}>
                                <ButtonText> Login </ButtonText>
                            </StyledButton>
                            <StyledButton style={{backgroundColor: colors.primary, color: colors.tertiary}} signUpButton={true} onPress={() => navigation.navigate('ModalSignupScreen', {modal: true})}>
                                    <ButtonText signUpButton={true} style={{color: colors.tertiary, top: -9.5}}> Signup </ButtonText>
                            </StyledButton>
                        </View>
                    }
                </ScrollView>
        </>
    );
}

const UserTextInput = ({label, icon, isPassword, ...props}) => {
    return(
        <View>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput postComment={true} {...props}/>
        </View>
    )
}

export default ViewImagePostPage;