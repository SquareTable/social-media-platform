import React, {useContext, useState} from 'react';
import { StatusBar } from 'expo-status-bar';

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
} from '../screenStylings/styling.js';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../../components/CredentialsContext';
import { ImageBackground, ScrollView } from 'react-native';


const MultiMediaUploadPage = ({navigation}) => {
     //context
    

    return(
        <>    
            <StatusBar style="dark"/>
                <WelcomeContainer postScreen={true}>
                    <PageTitle>MultiMedia Post Screen</PageTitle>
                    <SubTitle>Select a format</SubTitle>
                    <StyledButton continueButton={true}>
                        <ButtonText continueButton={true}>
                            Continue
                        </ButtonText>
                    </StyledButton>
                </WelcomeContainer>
        </>
    );
}

export default MultiMediaUploadPage;
