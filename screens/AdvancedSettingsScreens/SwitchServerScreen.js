import React, {useContext, useState, useEffect, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import {useTheme} from "@react-navigation/native";

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
    TextLinkContent,
    TextLink,
    SettingsHorizontalView,
    ChatScreen_Title,
    Navigator_BackButton,
    StyledButton,
    ButtonText,
    TestText,
    StyledFormArea,
    MsgBox,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    StyledContainer,
    InnerContainer,
} from '../screenStylings/styling.js';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../../components/CredentialsContext';
import { ImageBackground, ScrollView, Settings } from 'react-native';
import { ProfilePictureURIContext } from '../../components/ProfilePictureURIContext.js';

import {Image, View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';

import {Formik} from 'formik';

import {Octicons} from '@expo/vector-icons';
import { ServerUrlContext } from '../../components/ServerUrlContext.js';

import Constants from "expo-constants";
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper.js';


const SwitchServerScreen = ({navigation}) => {
    const {colors, dark} = useTheme();
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    if (storedCredentials) {var {name, displayName, email, photoUrl} = storedCredentials}
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext)
    const [message, handleMessage] = useState('');
    const {serverUrl, setServerUrl} = useContext(ServerUrlContext);
    const [messageType, setMessageType] = useState('FAILED');
    const StatusBarHeight = Constants.statusBarHeight;

    const handleSwitchServer = (values, setSubmitting, setServerUrl, setMessageType, handleMessage) => {
        const {serverInfo} = values;
        setServerUrl(serverInfo);
        AsyncStorage.setItem('SocialSquareServerUrl', serverInfo.toString());
        setSubmitting(false);
        setMessageType('SUCCESS');
        if (serverInfo == 'http://it-solutions.homedns.org:9443') {
            handleMessage('Switched to default server');
        } else {
            handleMessage('Switched to ' + serverInfo);
        }
    }
    

    return(
        <> 
            <StatusBar style={colors.StatusBarColor}/>   
            <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                    <Image
                    source={require('../../assets/app_icons/back_arrow.png')}
                    style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                    resizeMode="contain"
                    resizeMethod="resize"
                    />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>Switch Server</TestText>
            </ChatScreen_Title>
            <Text style={{textAlign: 'center', color: colors.tertiary, fontSize: 16, marginHorizontal: 5}}>If you are hosting your own SocialSquare server at home or work, you can switch to using that server here.</Text>
            <KeyboardAvoidingWrapper style={{backgroundColor: colors.primary}}>
                <StyledContainer style={{backgroundColor: colors.primary}}>
                    <InnerContainer style={{backgroundColor: colors.primary}}>
                        <Text style={{textAlign: 'center', color: colors.tertiary, fontSize: 16}}>Enter the IP/Domain and port here</Text>
                        <Text style={{textAlign: 'center', color: colors.tertiary, fontSize: 16}}> e.g: (https://example.com:5440) or (https://127.0.0.1:1234)</Text>
                        <Formik
                            initialValues={{serverInfo: ''}}
                            onSubmit={(values, {setSubmitting}) => {
                                try {
                                    if (values.serverInfo == '') {
                                        handleMessage('Please fill in the server field.');
                                        setMessageType('FAILED');
                                        setSubmitting(false);
                                    } else {
                                        handleSwitchServer(values, setSubmitting, setServerUrl, setMessageType, handleMessage);
                                    }
                                } catch (e) {
                                    handleMessage('An error occured. Please try again.')
                                    console.warn(e)
                                    setMessageType('FAILED')
                                }
                            }}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                                <StyledFormArea>
                                    <UserTextInput
                                        icon="mail"
                                        placeholder="https://example.com:5440"
                                        placeholderTextColor={colors.tertiary}
                                        onChangeText={handleChange('serverInfo')}
                                        onBlur={handleBlur('serverInfo')}
                                        value={values.serverInfo}
                                        autoCapitalize="none"
                                        style={{backgroundColor: colors.primary, color: colors.tertiary}}
                                        octiconColor={colors.brand}
                                    />
                                    <MsgBox type={messageType}>{message}</MsgBox>
                                    {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                                        <ButtonText> Switch to Server </ButtonText>
                                    </StyledButton>)}

                                    {isSubmitting && (<StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={colors.primary} />
                                    </StyledButton>)}

                                    {serverUrl != 'http://it-solutions.homedns.org:9443' && (
                                        <StyledButton onPress={() => {
                                            values.serverInfo = 'http://it-solutions.homedns.org:9443';
                                            handleSubmit()
                                        }}>
                                            <ButtonText> Switch to Default Server</ButtonText>
                                        </StyledButton>
                                    )}
                                    <Text style={{textAlign: 'center', color: colors.tertiary, fontSize: 16}}>Current server URL is:</Text>
                                    <Text style={{textAlign: 'center', color: colors.tertiary, fontSize: 16}}>{serverUrl == 'http://it-solutions.homedns.org:9443' ? 'SocialSquare Default Servers' : serverUrl}</Text>
                                    {serverUrl == 'http://it-solutions.homedns.org:9443' && (
                                        <Text style={{textAlign: 'center', color: colors.tertiary, fontSize: 13}}>(http://it-solutions.homedns.org:9443)</Text>
                                    )}
                                        
                                </StyledFormArea>
                            )}
                        </Formik>
                    </InnerContainer>
                </StyledContainer>
            </KeyboardAvoidingWrapper>
        </>
    );
}

const UserTextInput = ({label, icon, octiconColor, ...props}) => {
    return(
        <View>
            <LeftIcon style={{top: 34}}>
                <Octicons name={icon} size={30} color={octiconColor} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
        </View>
    )
}

export default SwitchServerScreen;
