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
    TextLinkContent
} from '../screens/screenStylings/styling.js';
import {View, ActivityIndicator} from 'react-native';

// Colors
const {brand, primary, tertiary} = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// API client
import axios from 'axios';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';


const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)

    const handleSignup = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = "https://nameless-dawn-41038.herokuapp.com/user/signup";

        axios.post(url, credentials).then((response) => { 
            const result = response.data;
            const {message, status, data} = result;

            
            if (status !== 'SUCCESS') {
                handleMessage(message,status);
            } else {
                persistLogin({...data}, message, status);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Tabs' }],
                });
            }
            setSubmitting(false);

        }).catch(error => {
            console.log(error.JSON());
            setSubmitting(false);
            handleMessage("An error occured. Try checking your network connection and retry.");
        })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const persistLogin = (credentials, message, status) => {
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

    const goBackToLoginScreen = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
        });
    }

    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark"/>
                <InnerContainer>
                    <PageTitle>SocialSquare</PageTitle>
                    <SubTitle>Signup Page</SubTitle>

                    <Formik
                        initialValues={{name: '',email: '', password: '', confirmPassword: ''}}
                        onSubmit={(values, {setSubmitting}) => {
                            if (values.email == "" || values.password == "" || values.name == "" || values.confirmPassword == "") {
                                handleMessage('Please fill all the fields.');
                                setSubmitting(false);
                            } else if (values.password !== values.confirmPassword) {
                                handleMessage('Passwords do not match.');
                                setSubmitting(false);
                            } else {
                                handleSignup(values, setSubmitting);
                            }
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                            <StyledFormArea>
                                <UserTextInput
                                    label="Username"
                                    icon="person"
                                    placeholder="Eg. PhotosAreCool123"
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />

                                <UserTextInput
                                    label="Email Address"
                                    icon="mail"
                                    placeholder="example@gmail.com"
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />

                                <UserTextInput
                                    label="Password"
                                    icon="lock"
                                    placeholder="* * * * * * * *"
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />

                                <UserTextInput
                                    label="Confirm Password"
                                    icon="lock"
                                    placeholder="* * * * * * * *"
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MsgBox type={messageType}>{message}</MsgBox>
                                {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                                    <ButtonText> Signup </ButtonText>
                                </StyledButton>)}

                                {isSubmitting && (<StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>)}
                                <ExtraView>
                                    <ExtraText>Already have an account? </ExtraText>
                                    <TextLink onPress={goBackToLoginScreen}>
                                        <TextLinkContent>Login</TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

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

export default Signup;
