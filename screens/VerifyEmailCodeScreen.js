// Made with help from https://thoughtbot.com/blog/make-a-snazzy-code-input-in-react-native
import React, {useState, useContext, useRef, useEffect} from 'react';
import { Image, ActivityIndicator, View, Text, Pressable, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native';
import {
    Navigator_BackButton,
    ChatScreen_Title,
    TestText,
    InnerContainer,
    StyledFormArea,
    StyledTextInput,
    StyledButton,
    ButtonText,
    MsgBox,
    SubTitle,
    RightIcon,
    LeftIcon,
    StyledInputLabel
} from './screenStylings/styling.js';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper.js';
import { Formik } from 'formik';
import Octicons from 'react-native-vector-icons/Octicons';
import { ServerUrlContext } from '../components/ServerUrlContext.js';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext.js';
import { AllCredentialsStoredContext } from '../components/AllCredentialsStoredContext.js';
import { CredentialsContext } from '../components/CredentialsContext.js';
import NetInfo from '@react-native-community/netinfo';
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyEmailCodeScreen = ({route, navigation}) => {
    const {colors, dark} = useTheme();
    const {task, email, fromAddress, username, userID, secondId} = route.params;
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const {serverUrl, setServerUrl} = useContext(ServerUrlContext);
    const CODE_LENGTH = 8;
    const [code, setCode] = useState('');
    const codeDigitsArray = new Array(CODE_LENGTH).fill(0);
    const inputFocusRef = useRef(null);
    const [containerIsFocused, setContainerIsFocused] = useState(true);
    const [submitting, setSubmitting] = useState(false)
    const isFocused = useIsFocused();
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext);
    const {allCredentialsStoredList, setAllCredentialsStoredList} = useContext(AllCredentialsStoredContext);
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const [profilePictureData, setProfilePictureData] = useState(null);

    //Login to app code
    const sameAccount = useRef();

    const toDigitInput = (_value, idx) => {
        const emptyInputChar = ' ';
        const digit = code[idx] || emptyInputChar;

        const isCurrentDigit = idx === code.length;
        const isLastDigit = idx === CODE_LENGTH - 1;
        const isCodeFull = code.length === CODE_LENGTH;

        const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

        const containerStyle =
            containerIsFocused && isFocused
                ? {borderColor: colors.tertiary, borderWidth: 2, borderRadius: 4, paddingHorizontal: 4, paddingVertical: 12, width: 30, marginHorizontal: 2}
                : {borderColor: colors.borderColor, borderWidth: 2, borderRadius: 4, paddingHorizontal: 4, paddingVertical: 12, width: 30, marginHorizontal: 2};
    
        return (
          <View key={idx} style={containerStyle}>
            <Text style={{color: colors.tertiary, fontSize: 16, textAlign: 'center'}}>{digit}</Text>
          </View>
        );
    };

    useEffect(() => {
        if (code.length === CODE_LENGTH) {
            inputFocusRef?.current?.blur();
            setContainerIsFocused(false);
            handleCheckVerificationCode()
        }
    }, [code]);

    const handleOnPress = () => {
        inputFocusRef?.current?.focus();
        setContainerIsFocused(true);
    };

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const persistLogin = (credentials, message, status) => {
        let credentialsToUse = credentials;
        if (allCredentialsStoredList) {
            for (let i = 0; i < allCredentialsStoredList.length; i++) {
                if (allCredentialsStoredList[i].secondId == credentialsToUse.secondId) {
                    sameAccount.current = true;
                }
            }
        } else {
            sameAccount.current = false;
        }
        console.log('Getting profile picture for ProfilePictureUriContext')
        const getProfilePicture = () => {
            const url = serverUrl + '/user/getProfilePic/' + credentialsToUse.secondId;
    
            axios.get(url).then(async (response) => {
                const result = response.data;
                const {message, status, data} = result;
    
                if (status !== 'SUCCESS') {
                    console.log('GETTING PROFILE PICTURE FOR ProfilePictureUriContext WAS NOT A SUCCESS')
                    console.log(status)
                    console.log(message)
                    setProfilePictureData([SocialSquareLogo_B64_png, message, status, credentialsToUse])
                } else {
                    console.log(status)
                    console.log(message)
                    const getImageUrl = serverUrl + '/getImageOnServer/' + data;
                    try {
                        const imageResponse = await axios.get(getImageUrl);

                        if (imageResponse) {
                            console.log('Setting profile picture to user profile picture')
                            setProfilePictureUri('data:image/jpeg;base64,' + imageResponse.data);
                            setProfilePictureData([('data:image/jpeg;base64,' + imageResponse.data), message, status, credentialsToUse])
                        } else {
                            console.log('Setting profile picture to SocialSquare logo')
                            console.warn('An unexpected error occured while getting profile picture')
                            setProfilePictureUri(SocialSquareLogo_B64_png)
                            setProfilePictureData([SocialSquareLogo_B64_png, message, status, credentialsToUse])
                        }
                    } catch (error) {
                        console.log('Setting profile picture to SocialSquare logo')
                        console.warn('An unexpected error occured while getting profile picture')
                        console.warn(error)
                        setProfilePictureUri(SocialSquareLogo_B64_png)
                        setProfilePictureData([SocialSquareLogo_B64_png, error, 'FAILED', credentialsToUse])
                    }
                }
                //setSubmitting(false);
    
            }).catch(error => {
                console.log(error);
                //setSubmitting(false);
                handleMessage("An error occured. Try checking your network connection and retry.");
            })
        }
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected == true) {
                if (credentials) {
                console.log('There is no profile picture in AsyncStorage. Loading profile picture for ProfilePictureUri Context using internet connection')
                getProfilePicture()
                } else {
                console.log('There is no stored credentials and no profile picture in Async Storage. Setting ProfilePictureUri to SocialSquareB64Logo')
                setProfilePictureUri(SocialSquareLogo_B64_png)
                setProfilePictureData([SocialSquareLogo_B64_png, message, status, credentialsToUse])
                }
            } else {
                console.log('There is no internet connection and no saved profile picture in Async Storage. Setting ProfilePictureUri to SocialSquareB64Logo')
                setProfilePictureUri(SocialSquareLogo_B64_png)
                setProfilePictureData([SocialSquareLogo_B64_png, message, status, credentialsToUse])
            }
        });
    }

    useEffect(() => {
        if (profilePictureData != null) {
            let profilePictureUriData = profilePictureData[0];
            let message = profilePictureData[1];
            let status = profilePictureData[2];
            let credentialsToUse = profilePictureData[3];
            console.log(credentialsToUse)
            let temp = allCredentialsStoredList;
            let tempStoredCreds = storedCredentials;
            setProfilePictureUri(profilePictureUriData);
            if (temp == null || temp == undefined) {
                temp = [];
                credentialsToUse.indexLength = 0;
            } else {
                credentialsToUse.indexLength = temp.length;
            }
            credentialsToUse.profilePictureUri = profilePictureUriData;
            AsyncStorage.setItem('socialSquareCredentials', JSON.stringify(credentialsToUse))
            .then(() => {
                setStoredCredentials(credentialsToUse);
                if (sameAccount.current == false) {
                    temp.push(credentialsToUse);
                }
                AsyncStorage.setItem('socialSquare_AllCredentialsList', JSON.stringify(temp))
                .then(() => {
                    handleMessage(message, status);
                    if (sameAccount.current === false) {
                        setAllCredentialsStoredList(temp);
                    }
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Tabs' }],
                    });
                    handleMessage(message, status);
                })
                .catch((error) => {
                    console.log(error);
                    handleMessage('Persisting login failed');
                })
                })
            .catch((error) => {
                console.log(error);
                handleMessage('Persisting login failed');
            })
        }
    }, [profilePictureData])

    const handleCheckVerificationCode = () => {
        handleMessage('', 'SUCCESS');
        setSubmitting(true);
        setContainerIsFocused(false)
        inputFocusRef?.current?.blur();
        const url = serverUrl + "/user/checkverificationcode"
        if (task == 'Reset Password') {
            const toSend = {username: username, verificationCode: code, task: 'Check Before Reset Password', getAccountMethod: 'username', userID: undefined, secondId: undefined}
            axios.post(url, toSend).then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, 'FAILED');
                    setSubmitting(false);
                    setContainerIsFocused(true);
                    inputFocusRef?.current?.focus();
                    return;
                } else {
                    setCode('');
                    isFocused ? navigation.navigate('ResetPasswordAfterVerificationScreen', {username: username, code: code}) : null
                }
                setSubmitting(false);
            }).catch((error) => {
                console.error(error)
                handleMessage(error.message, 'FAILED');
                setSubmitting(false);
                setContainerIsFocused(true);
                inputFocusRef?.current?.focus();
            })
        } else if (task == 'Add Email Multi-Factor Authentication') {
            const toSend = {username: undefined, verificationCode: code, task: 'Add Email Multi-Factor Authentication', getAccountMethod: 'userID', userID: userID, email: email, secondId: undefined}
            axios.post(url, toSend).then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, 'FAILED');
                    setSubmitting(false);
                    setContainerIsFocused(true);
                    inputFocusRef?.current?.focus();
                    return;
                } else {
                    console.log(message);
                    setCode('');
                    isFocused ? navigation.pop(3) : null
                }
            }).catch((error) => {
                console.error(error)
                handleMessage(error.message, 'FAILED');
                setSubmitting(false);
                setContainerIsFocused(true);
                inputFocusRef?.current?.focus();
            })
        } else if (task == 'Verify Email MFA Code') {
            const toSend = {username: undefined, verificationCode: code, task: 'Verify Email MFA Code', getAccountMethod: 'secondId', userID: undefined, secondId: secondId}
            axios.post(url, toSend).then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, 'FAILED');
                    setSubmitting(false);
                    setContainerIsFocused(true);
                    inputFocusRef?.current?.focus();
                    return;
                } else {
                    console.log(message);
                    setCode('');
                    persistLogin(data, message, status);
                }
            }).catch((error) => {
                console.error(error)
                handleMessage(error.message, 'FAILED');
                setSubmitting(false);
                setContainerIsFocused(true);
                inputFocusRef?.current?.focus();
            })
        } else {
            alert('Unknown task. Error occured.')
            navigation.goBack();
        }
    }

    const handleResendCode = () => {
        handleMessage('', 'SUCCESS');
        inputFocusRef?.current?.blur();
        setContainerIsFocused(false);
        setSubmitting(true);
        const url = serverUrl + '/user/forgottenpasswordaccountusername';
        const toSend = {username: username};
        axios.post(url, toSend).then((response) => {
            const result = response.data;
            const {message, status, data} = result;
            console.log('Message: ' + message)
            console.log('Status: ' + status)
            console.log('Data: ' + data)

            if (status !== 'SUCCESS') {
                console.warn(message)
                handleMessage('An error occured while resending verification code. Try checking your network connection and then try again.');
            } else {
                handleMessage(('Resent code to ' + email + ' from ' + fromAddress), 'SUCCESS');
                setCode('');
                inputFocusRef?.current?.focus();
                setContainerIsFocused(true)
            }
            setSubmitting(false);
        }).catch(error => {
            console.log(error);
            setSubmitting(false);
            handleMessage('An error occured while resending verification code. Try checking your network connection and then try again.');
        });
    }
    return (
        <>
            <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                    <Image
                    source={require('../assets/app_icons/back_arrow.png')}
                    style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                    resizeMode="contain"
                    resizeMethod="resize"
                    />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>Verify Email Code</TestText>
            </ChatScreen_Title>
            <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginHorizontal: '5%'}}>An email with a verification code has been sent to {email} from {fromAddress}.</Text>
            <Text style={{color: colors.tertiary, fontSize: 16, textAlign: 'center', marginHorizontal: '5%'}}>If you can't find it please check your spam folder.</Text>
            <Text style={{color: colors.errorColor, fontSize: 16, textAlign: 'center', marginHorizontal: '5%'}}>Codes expire after 5 minutes from being sent.</Text>
            <MsgBox type={messageType}>{message}</MsgBox>
            <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
                <Pressable style={styles.inputsContainer} onPress={() => {submitting == false ? handleOnPress() : null}}>
                    {codeDigitsArray.map(toDigitInput)}
                </Pressable>
                {submitting == true ?
                    <ActivityIndicator size="large" color={colors.brand} style={{marginTop: 10}}/>
                :
                    <>
                        <StyledButton style={{marginTop: 10, paddingHorizontal: 5}} onPress={handleCheckVerificationCode}>
                            <ButtonText>Submit</ButtonText>
                        </StyledButton>
                        <TouchableOpacity onPress={handleResendCode} style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 10}}>
                            <ButtonText style={{color: colors.brand, fontSize: 20}}>Resend new code</ButtonText>
                        </TouchableOpacity>
                    </>
                }
                <TextInput
                    value={code}
                    onChangeText={(text) => {setCode(text.toLowerCase().trim())}}
                    returnKeyType="done"
                    textContentType="oneTimeCode"
                    maxLength={CODE_LENGTH}
                    style={styles.hiddenCodeInput}
                    ref={inputFocusRef}
                    autoFocus={true}
                    onSubmitEditing={handleCheckVerificationCode}
                    autoCorrect={false}
                    autoCapitalize="none"
                />
            </View>
        </>
    );
}

export default VerifyEmailCodeScreen;

const styles = StyleSheet.create({
    inputsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    inputContainer: {
      borderColor: '#cccccc',
      borderWidth: 2,
      borderRadius: 4,
      padding: 12,
    },
    inputContainerFocused: {
      borderColor: '#0f5181',
    },
    hiddenCodeInput: {
      position: 'absolute',
      height: 0,
      width: 0,
      opacity: 0,
    },
  });