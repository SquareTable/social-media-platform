import React, {useContext, useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
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
    PostMsgBox
} from '../screens/screenStylings/styling.js';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { ImageBackground, ScrollView } from 'react-native';
import OfflineNotice from '../components/OfflineNotice.js';
import { AppStylingContext } from '../components/AppStylingContext.js';


const PostScreen = ({navigation}) => {
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    if (storedCredentials) {var {name, displayName, email, photoUrl} = storedCredentials;}
    const AvatarImg = photoUrl ? {uri: photoUrl} : require('./../assets/img/Logo.png');
    const [gridViewState, setGridViewState] = useState("flex")
    const [featuredViewState, setFeaturedViewState] = useState("none")
    const [messageVisibility, setMessageVisibility] = useState(false);
    const [formatOneSelected, setFormatOneSelected] = useState(false);
    const [formatTwoSelected, setFormatTwoSelected] = useState(false);
    const [formatThreeSelected, setFormatThreeSelected] = useState(false);
    const [formatFourSelected, setFormatFourSelected] = useState(false);
    const [useCustomStyling, setUseCustomStyling] = useState(false)
    const {AppStylingContextState, setAppStylingContextState} = useContext(AppStylingContext)

    const continuePressed = () => {
        if (formatOneSelected == true) {
            setMessageVisibility(false)
            navigation.navigate("MultiMediaUploadPage", {imageFromRoute: null, titleFromRoute: '', descriptionFromRoute: ''})
        } else if (formatTwoSelected == true) {
            setMessageVisibility(false)
            navigation.navigate("ThreadUploadPage", {threadFormat: null, threadTitle: null, threadSubtitle: null, threadTags: null, categoryTitle: null, threadBody: null, imageFromRoute: null, threadImageDescription: null, threadNSFW: null, threadNSFL: null})
        } else if (formatThreeSelected == true) {
            setMessageVisibility(false)
            navigation.navigate("PollUploadPage")
        } else if (formatFourSelected == true) {
            setMessageVisibility(false)
            navigation.navigate("AudioUploadPage")
        } else {
            setMessageVisibility(true)
        }
    }

    const formatOnePressed = () => {
        if (setFormatOneSelected !== true) {
            setFormatOneSelected(true)
            setFormatTwoSelected(false)
            setFormatThreeSelected(false)
            setFormatFourSelected(false)
        }
    }

    const formatTwoPressed = () => {
        if (setFormatTwoSelected !== true) {
            setFormatOneSelected(false)
            setFormatTwoSelected(true)
            setFormatThreeSelected(false)
            setFormatFourSelected(false)
        }
    }

    const formatThreePressed = () => {
        if (setFormatThreeSelected !== true) {
            setFormatOneSelected(false)
            setFormatTwoSelected(false)
            setFormatThreeSelected(true)
            setFormatFourSelected(false)
        }
    }

    const formatFourPressed = () => {
        if (setFormatFourSelected !== true) {
            setFormatOneSelected(false)
            setFormatTwoSelected(false)
            setFormatThreeSelected(false)
            setFormatFourSelected(true)
        }
    }

    const {colors, dark} = useTheme();
    const {post} = colors;


    return(
        <>    
            <StatusBar style={post ? colors.post.postScreenColors.statusBarColor : colors.StatusBarColor}/>
            <WelcomeContainer style={{backgroundColor: post ? colors.post.postScreenColors.backgroundColor : colors.primary}} postScreen={true}>
                <PageTitle style={{color: post ? colors.post.postScreenColors.titleTextColor : colors.brand}}>Post Screen</PageTitle>
                <SubTitle style={{color: post ? colors.post.postScreenColors.selectAFormatTextColor : colors.tertiary}}>Select a format</SubTitle>
                <PostCollectionView>
                    <PostTypeSelector style={{borderColor: formatOneSelected ? post ? colors.post.postScreenColors.multimediaImageActivatedBorderColor : colors.darkestBlue : post ? colors.post.postScreenColors.multimediaImageBorderColor : colors.brand}} styleForSelected={formatOneSelected} onPress={formatOnePressed}>
                        <PostIcons style={{tintColor: post ? colors.post.postScreenColors.multimediaImageTintColor : colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/016-camera.png')}/>
                    </PostTypeSelector>
                    <PostHorizontalView>
                        <PostTypeSelector style={{borderColor: formatTwoSelected ? post ? colors.post.postScreenColors.threadImageActivatedBorderColor : colors.darkestBlue : post ? colors.post.postScreenColors.threadImageBorderColor : colors.brand}} sideIcons={true} styleForSelected={formatTwoSelected} onPress={formatTwoPressed}>
                            <PostIcons style={{tintColor: post ? colors.post.postScreenColors.threadImageTintColor : colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/007-pencil2.png')}/>
                        </PostTypeSelector>
                        <PostTypeSelector style={{borderColor: formatThreeSelected ? post ? colors.post.postScreenColors.pollImageActivatedBorderColor : colors.darkestBlue : post ? colors.post.postScreenColors.pollImageBorderColor : colors.brand}} sideIcons={true} styleForSelected={formatThreeSelected} onPress={formatThreePressed}>
                            <PostIcons style={{tintColor: post ? colors.post.postScreenColors.pollImageTintColor : colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/157-stats-bars.png')}/>
                        </PostTypeSelector>
                    </PostHorizontalView>
                    <PostTypeSelector style={{borderColor: formatFourSelected ? post ? colors.post.postScreenColors.audioImageActivatedBorderColor : colors.darkestBlue : post ? colors.post.postScreenColors.audioImageBorderColor : colors.brand}} styleForSelected={formatFourSelected} onPress={formatFourPressed}>
                        <PostIcons style={{tintColor: post ? colors.post.postScreenColors.audioImageTintColor : colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/018-music.png')}/>
                    </PostTypeSelector>
                    <PostMsgBox style={{color: post ? colors.post.postScreenColors.errorMessage : colors.red}} viewHidden={messageVisibility}> Select a format </PostMsgBox>
                </PostCollectionView>
                <StyledButton /*continueButton={true}*/ style={{backgroundColor: post ? colors.post.postScreenColors.continueButtonBackgroundColor : colors.brand}} onPress={continuePressed}>
                    <ButtonText style={{color: post ? colors.post.postScreenColors.continuteButtonTextColor : 'black'}} /*continueButton={true}*/>
                        Continue
                    </ButtonText>
                </StyledButton>
            </WelcomeContainer>
        </>
    );
}

export default PostScreen;
