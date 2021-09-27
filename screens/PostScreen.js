import React, {useContext, useState} from 'react';
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

    const continuePressed = () => {
        if (formatOneSelected == true) {
            setMessageVisibility(false)
            navigation.navigate("MultiMediaUploadPage")
        } else if (formatTwoSelected == true) {
            setMessageVisibility(false)
            navigation.navigate("ThreadUploadPage")
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

    const {colors} = useTheme();

    return(
        <>    
            <StatusBar style={colors.StatusBarColor}/>
                <WelcomeContainer style={{backgroundColor: colors.primary}} postScreen={true}>
                    <PageTitle>Post Screen</PageTitle>
                    <SubTitle style={{color: colors.tertiary}}>Select a format</SubTitle>
                    <PostCollectionView>
                        <PostTypeSelector styleForSelected={formatOneSelected} onPress={formatOnePressed}>
                            <PostIcons source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/016-camera.png')}/>
                        </PostTypeSelector>
                        <PostHorizontalView>
                            <PostTypeSelector sideIcons={true} styleForSelected={formatTwoSelected} onPress={formatTwoPressed}>
                                <PostIcons source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/007-pencil2.png')}/>
                            </PostTypeSelector>
                            <PostTypeSelector sideIcons={true} styleForSelected={formatThreeSelected} onPress={formatThreePressed}>
                                <PostIcons source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/157-stats-bars.png')}/>
                            </PostTypeSelector>
                        </PostHorizontalView>
                        <PostTypeSelector styleForSelected={formatFourSelected} onPress={formatFourPressed}>
                            <PostIcons source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/018-music.png')}/>
                        </PostTypeSelector>
                        <PostMsgBox viewHidden={messageVisibility}> Select a format </PostMsgBox>
                    </PostCollectionView>
                    <StyledButton continueButton={true} onPress={continuePressed}>
                        <ButtonText continueButton={true}>
                            Continue
                        </ButtonText>
                    </StyledButton>
                </WelcomeContainer>
        </>
    );
}

export default PostScreen;
