import React, { Component, useContext ,useState } from 'react';

import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, Platform, ScrollView } from 'react-native';

import imagesArray from './../assets/badgeimages/imageDir';

import { StatusBar } from 'expo-status-bar';

import {
    WelcomeContainer,
    Avatar,
    SettingsPageItemTouchableOpacity,
    SettingsItemImage,
    SettingsItemText,
    ConfirmLogoutView,
    ConfirmLogoutText,
    ConfirmLogoutButtons,
    ConfirmLogoutButtonText,
    PageTitle,
    BadgeGridLayout,
    BadgeGridViewBlockStyle,
    GridViewInsideTextItemStyle,
    BadgeGridViewImage
} from '../components/styles';



// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { set } from 'react-native-reanimated';

const AccountBadges = () => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {name, email, photoUrl, badges} = storedCredentials;
    const AvatarImg = photoUrl ? {uri: photoUrl} : require('./../assets/img/Logo.png');
    const [logoutViewState, setLogoutViewState] = useState("false")
    const [badgeValue, setBadgeValue] = useState("")
    const [badgeDebounce, setBadgeDebounce] = useState("")
    const [rarity, setRarity] = useState("")
    const [badgeText, setBadgeText] = useState("")
    const [badgeDescription, setBadgeDescription] = useState("")

    const changeBadgeValue = (badgeName) => {
        if (badgeName == "onSignUpBadge") {
            if (badgeDebounce !== "onSignUpBadge") {
                console.log("User Has On Sign Up Badge")
                setBadgeText("Welcome To Hell")
                setBadgeDescription("Made an account")
                setRarity("Bronze")
                setBadgeValue(imagesArray.onSignupBadge)
                setBadgeDebounce("onSignUpBadge")
            }
        }
    }

    return(
            <> 
                <StatusBar style="dark"/>   
                <WelcomeContainer>                
                    <PageTitle badges={true}>{name} Badges</PageTitle>
                    <BadgeGridLayout>
                        <React.Fragment>
                            <ScrollView>  
                                <BadgeGridViewBlockStyle>
                                    {badges.map((badge) => (
                                            
                                            <React.Fragment>

                                                <GridViewInsideTextItemStyle key={rarity} onload={changeBadgeValue(badge)} rarityForTextColor={rarity}>{rarity}</GridViewInsideTextItemStyle>
                                                <BadgeGridViewImage key={imagesArray} source={badgeValue}/>
                                                <GridViewInsideTextItemStyle key={badge} badgeTitle={true}>{badgeText}</GridViewInsideTextItemStyle>
                                                <GridViewInsideTextItemStyle key={badgeDescription} bottomText={true}>{badgeDescription}</GridViewInsideTextItemStyle>
                                                
                                            </React.Fragment>
                                    
                                        
                                    ))}
                                </BadgeGridViewBlockStyle>
                            </ScrollView>
                        </React.Fragment>
                </BadgeGridLayout>
            </WelcomeContainer>
        </>
    );
}

export default AccountBadges