import React, {useState, useContext, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import {Formik} from 'formik';

// icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    SearchBarArea,
    PostsHorizontalView,
    PostsVerticalView,
    PostCreatorIcon,
    WelcomeContainer,
    ChatScreen_Title,
    Navigator_BackButton,
    TestText
} from './screenStylings/styling.js';
import {View, ActivityIndicator, ImageBackground, StyleSheet, Image, SectionList, Text} from 'react-native';

// Colors
const {brand, primary, tertiary, darkLight, descTextColor, slightlyLighterPrimary, red} = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// API client
import axios from 'axios';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { useIsFocused } from '@react-navigation/native';

import { useTheme } from '@react-navigation/native';


const CreateConversationSelection = ({navigation}) => {
    const {colors, dark} = useTheme();
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
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>Create a conversation</TestText>
            </ChatScreen_Title>
            <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>Select Either:</Text>
            <WelcomeContainer style={{justifyContent: 'center'}}>
                <View style={{height: '46%', width: '85%', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginBottom: '4%', borderRadius: 50, borderStyle: 'dashed', borderWidth: 2, borderColor: darkLight}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}} onPress={() => navigation.navigate("CreateConversation", {conversationTitle: null, conversationDescription: null, sentConversationMembers: null, sentConversationNSFW: null, sentConversationNSFL: null})}>
                        <SubTitle style={{marginBottom: 0, fontSize: 25, textAlign: 'center'}}>Create Group Conversation</SubTitle>
                    </TouchableOpacity>
                </View>
                <View style={{height: '46%', width: '85%', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 50, borderStyle: 'dashed', borderWidth: 2, borderColor: darkLight}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}} onPress={() => navigation.navigate("ConversationDMUserFind")}>
                        <SubTitle style={{marginBottom: 0, fontSize: 25, textAlign: 'center'}}>Create Private Conversation</SubTitle>
                        <SubTitle style={{marginBottom: 0, fontSize: 25, textAlign: 'center'}}>(Direct Message)</SubTitle>
                    </TouchableOpacity>
                </View>
            </WelcomeContainer>
        </>
    );
}

const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: "center"
    }
})

const UserTextInput = ({label, icon, isPassword, ...props}) => {
    return(
        <SearchBarArea style={{width: '100%'}}>
            <LeftIcon searchIcon={true}>
                <Octicons name={"search"} size={20} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput searchPage={true} {...props}/>
        </SearchBarArea>
    )
}

export default CreateConversationSelection;
