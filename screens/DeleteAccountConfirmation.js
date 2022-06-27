import React, {useContext, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator} from 'react-native';
import { CredentialsContext } from '../components/CredentialsContext';
import {
    ConfirmLogoutButtons,
    ConfirmLogoutButtonText,
    MsgBox,
    LeftIcon,
    StyledTextInput,
    StyledInputLabel,
} from './screenStylings/styling.js';
import { Formik } from 'formik';
import Octicons from 'react-native-vector-icons/Octicons';
import axios from 'axios';
import { ServerUrlContext } from '../components/ServerUrlContext';
import Logout from '../components/HandleLogout';
import { AllCredentialsStoredContext } from '../components/AllCredentialsStoredContext';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext';

const DeleteAccountConfirmation = ({navigation}) => {
    const {colors} = useTheme();
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const {name, _id} = storedCredentials;
    const {serverUrl, setServerUrl} = useContext(ServerUrlContext);
    const {allCredentialsStoredList, setAllCredentialsStoredList} = useContext(AllCredentialsStoredContext);
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext);
    const [isSubmitting, setSubmitting] = useState(false);
    const [accountNameTextBoxValue, setAccountNameTextBoxValue] = useState('');

    const handleAccountDeletion = async () => {
        if (accountNameTextBoxValue == '') {
            handleMessage('Please enter your account name');
            return
        } else if (accountNameTextBoxValue != name) {
            handleMessage('Account name does not match');
            return
        }
        setSubmitting(true);
        const url = serverUrl + '/user/deleteaccount';
        const toSend = {userID: _id};
        try {
            const response = await axios.post(url, toSend);
            const result = response.data;
            const {status, message} = result;

            if (status !== "SUCCESS") {
                handleMessage(message);
                setSubmitting(false)
            } else {
                alert('Account with username ' + name + ' has been successfully deleted.');
                Logout(storedCredentials, setStoredCredentials, allCredentialsStoredList, setAllCredentialsStoredList, navigation, setProfilePictureUri)
            }
        } catch (error) {
            console.log(error)
            setSubmitting(false)
            handleMessage('An error occured. Please check your network connection and try again.')
        }
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <>
                {isSubmitting ?
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Deleting Account...</Text>
                        <ActivityIndicator size="large" color={colors.brand} />
                    </View>
                :
                    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                        <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center'}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                            <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Type {name} to delete your account <Text style={{color: colors.red}}>IMMEDIATELY</Text>.</Text>
                            <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
                                <UserTextInput
                                    label="Name"
                                    icon="pencil"
                                    placeholder="Enter your account name here"
                                    placeholderTextColor={colors.tertiary}
                                    value={accountNameTextBoxValue}
                                    onChangeText={(text) => setAccountNameTextBoxValue(text)}
                                    style={{backgroundColor: colors.primary, color: colors.tertiary}}
                                    colors={colors}
                                    autoCapitalize="none"
                                />
                            </View>
                            <MsgBox type={messageType}>{message}</MsgBox>
                            <View style={{alignItems: 'center'}}>
                                <ConfirmLogoutButtons style={{height: 70}} confirmButton={true} onPress={handleAccountDeletion}>
                                    <ConfirmLogoutButtonText confirmButton>Delete Account</ConfirmLogoutButtonText>
                                </ConfirmLogoutButtons>
                                <ConfirmLogoutButtons style={{height: 70}} cancelButton={true} onPress={() => {navigation.goBack()}}>
                                    <ConfirmLogoutButtonText cancelButton={true}>Go Back</ConfirmLogoutButtonText>
                                </ConfirmLogoutButtons> 
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                }
            </>
        </View>
    );
}

const UserTextInput = ({label, icon, colors, ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={colors.brand} />
            </LeftIcon>
            <StyledInputLabel style={{color: colors.tertiary}}>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
        </View>
    )
}

export default DeleteAccountConfirmation;