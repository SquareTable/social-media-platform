import React, {useState, useContext} from 'react';
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
} from '../screens/screenStylings/styling.js';
import {View, ActivityIndicator, ImageBackground, StyleSheet} from 'react-native';

// Colors
const {brand, primary, tertiary} = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// API client
import axios from 'axios';
// mongodb+srv://Thekookiekov:<password>@cluster0.c403h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { withRepeat } from 'react-native-reanimated';


const ChangeDisplayNamePage = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {email} = storedCredentials;

    const handleChangeDisplayName = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = "https://nameless-dawn-41038.herokuapp.com/user/changedisplayname";

        axios.post(url, credentials).then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                handleMessage(message,status);
            } else {
                persistLogin({...data[0]}, message, status);
            }
            setSubmitting(false);

        }).catch(error => {
            console.log(error);
            setSubmitting(false);
            handleMessage("An error occured. Try checking your network connection and retry.");
        })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const persistLogin = (credentials, message, status) => {
        AsyncStorage.removeItem('socialSquareCredentials')
        .then(() => {
            setStoredCredentials("");
        })
        .catch(error => console.log(error))

        AsyncStorage.setItem('socialSquareCredentials', JSON.stringify(credentials))
        .then(() => {
            handleMessage(message, status);
            setStoredCredentials(credentials);
        })
        .catch((error) => {
            console.log(error);
            handleMessage('Persisting login failed');
        })
    }

    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                
                    <StatusBar style="dark"/>
                    <InnerContainer>
                        <PageLogo source={require('./../assets/img/Logo.png')} />
                        <PageTitle>SocialSquare</PageTitle>
                        <SubTitle>Change Display Name</SubTitle>

                        <Formik
                            initialValues={{password: '', userEmail: email, desiredDisplayName: ''}}
                            onSubmit={(values, {setSubmitting}) => {
                                console.log("Submitting")
                                if (values.desiredDisplayName == "" || values.password == "") {
                                    handleMessage('Please fill all the fields.');
                                    setSubmitting(false);
                                } else {
                                    handleChangeDisplayName(values, setSubmitting);
                                }
                            }}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                                <StyledFormArea>
                                    <UserTextInput
                                        icon="person"
                                        placeholder="Desired Display Name"
                                        placeholderTextColor={tertiary}
                                        onChangeText={handleChange('desiredDisplayName')}
                                        onBlur={handleBlur('desiredDisplayName')}
                                        value={values.desiredDisplayName}
                                    />
                                    <UserTextInput
                                        icon="lock"
                                        placeholder="Confirm Password"
                                        placeholderTextColor={tertiary}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />
                                    <MsgBox type={messageType}>{message}</MsgBox>
                                    {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                                        <ButtonText> Submit </ButtonText>
                                    </StyledButton>)}

                                    {isSubmitting && (<StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary} />
                                    </StyledButton>)}
                                    
                                    <StyledButton signUpButton={true} onPress={() => navigation.navigate("AccountSettings")}>
                                            <ButtonText signUpButton={true}> Back </ButtonText>
                                    </StyledButton>
                                    <SubTitle disclaimerText={true}>You may have to re-login to view your changes</SubTitle>
                                </StyledFormArea>)}
                        </Formik>
                    </InnerContainer>

            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: "center"
    }
})

const UserTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={brand}/>
                </RightIcon>
            )}
        </View>
    )
}

export default ChangeDisplayNamePage;
