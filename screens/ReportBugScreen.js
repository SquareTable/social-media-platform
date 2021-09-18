import React, {useState, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import {useTheme} from '@react-navigation/native'

// formik
import {Formik} from 'formik';

// icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';
//Buttons and Text
import { Button, Title, TextInput } from 'react-native-paper';

import { Picker } from '@react-native-community/picker';

import DropDownPicker from 'react-native-dropdown-picker';



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
    ViewHider,
    TestText
} from '../screens/screenStylings/styling.js';
import {View, ActivityIndicator, ImageBackground, StyleSheet, Text, Alert} from 'react-native';

// Colors
const {brand, primary, tertiary, darkest} = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper_NoScrollview from '../components/KeyboardAvoidingWrapper_NoScrollview';

// API client
import axios from 'axios';
// mongodb+srv://Thekookiekov:<password>@cluster0.c403h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { withRepeat } from 'react-native-reanimated';

import * as Haptics from 'expo-haptics'


const ReportBugScreen = ({navigation}) => {


    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {email} = storedCredentials;

    const handleChangebugReport = (credentials, setSubmitting) => {
        /*
        handleMessage(null);
        const url = "https://nameless-dawn-41038.herokuapp.com/user/changeusername";

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
        CHANGE CODE TO FIT THIS AND THEN CHECK OVER WITH KOVID
        */
       alert("Coming soon");
       setSubmitting(false);
       console.log(credentials);
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const [ScreenBugOccuredOnViewState, setScreenBugOccuredOnViewState] = useState(false)
    const [BugScreenVarNum, setBugScreenVarNum] = useState(1)

    const changeScreenBugOccuredOnView = () => {
        if (ScreenBugOccuredOnViewState == true) {
            setScreenBugOccuredOnViewState(false);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setBugScreenVarNum(1);
            console.log("BugScreen " + BugScreenVarNum);
            handleMessage('')
        }else{
            console.log("Closed Confirm")
            if (value !== null) {
                setScreenBugOccuredOnViewState(true)
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setBugScreenVarNum(2);
                console.log("BugScreen " + BugScreenVarNum);
                handleMessage('')
            } else {
                handleMessage('Please select what screen the bug occured in');
            }
        }
    }

    console.log(BugScreenVarNum);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Login Screen', value: 'Login Screen'},
        {label: 'Signup Screen', value: 'Signup Screen'},
        {label: 'Terms Of Service Screen', value: 'Terms Of Service Screen'},
        {label: 'Home Screen', value: 'Home Screen'},
        {label: 'Find Screen', value: 'Find Screen'},
        {label: 'Post Screen (upload)', value: 'Post Screen (upload screen)'},
        {label: 'Chats', value: 'Chats'},
        {label: 'Profile Screen', value: 'Profile Screen'},
        {label: 'Settings Screen', value: 'Settings Screen'},
        {label: 'Account Settings Screen', value: 'Account Settings Screen'},
        {label: 'Report Bug Screen', value: 'Report Bug Screen'},
        {label: 'Change Display Name Screen', value: 'Change Dsiplay Name Screen'},
        {label: 'Change Username Screen', value: 'Change Username Screen'},
        {label: 'Change Email Screen', value: 'Change Email Screen'},
        {label: 'Change Password Screen', value: 'Change Password Screen'},
        {label: 'Post Screen (look)', value: 'Post Screen (look at posts screen)'},
        {label: 'Something not on this list', value: 'Somethign not on this list'},
    ]);

    const {colors} = useTheme();

    return(
        <KeyboardAvoidingWrapper_NoScrollview>
            <StyledContainer style={{backgroundColor: colors.primary}}>
                
                    <StatusBar style={colors.StatusBarColor}/>
                    <InnerContainer style={{backgroundColor: colors.primary}}>
                        <PageLogo source={require('./../assets/img/Logo.png')} />
                        <PageTitle>SocialSquare</PageTitle>
                        <SubTitle style={{color: colors.tertiary}}>Report bug</SubTitle>
                        <Formik
                            initialValues={{bugReport: '', screenThatBugOccuredOn: ''}}
                            onSubmit={(values, {setSubmitting}) => {
                                console.log("Submitting")
                                if (values.bugReport == "" || values.screenThatBugOccuredOn == "") {
                                    handleMessage('Please fill all the fields.');
                                    setSubmitting(false);
                                } else {
                                    if (values.screenThatBugOccuredOn == null) {
                                        handleMessage('Screen that bug occured on is null. This may be an error or you have not selected a screen that the bug occured on.');
                                        console.log("Screen that bug occured on box is null. This is the console log of the variable credentials");
                                        console.log(values);
                                        setSubmitting(false);
                                    } else {
                                        handleChangebugReport(values, setSubmitting);
                                        handleMessage('')
                                    }
                                }
                            }}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                                <StyledFormArea>
                                    <ViewHider bugScreenVarNum={BugScreenVarNum} bugScreen={2}>
                                        <PageTitle fontSize={'14px'}>Please explain what happened</PageTitle>
                                    </ViewHider>
                                    <ViewHider bugScreenVarNum={BugScreenVarNum} bugScreen={2}>
                                        <UserTextInput
                                            icon="megaphone"
                                            placeholder="Explain your bug here..."
                                            placeholderTextColor={colors.tertiary}
                                            onChangeText={handleChange('bugReport')}
                                            onBlur={handleBlur('bugReport')}
                                            value={values.bugReport}
                                            bugReport={true}
                                            multiline
                                            style={{backgroundColor: colors.primary, color: colors.tertiary}}
                                        />
                                    </ViewHider>
                                    <ViewHider bugScreenVarNum={BugScreenVarNum} bugScreen={1}>
                                        <PageTitle fontSize={'14px'}>What screen was this bug experienced on?</PageTitle>
                                    </ViewHider>
                                    <ViewHider bugScreenVarNum={BugScreenVarNum} bugScreen={1} zIndex={1000}>
                                        <DropDownPicker
                                            open={open}
                                            value={value}
                                            items={items}
                                            setOpen={setOpen}
                                            setValue={(value) => {
                                                values.screenThatBugOccuredOn = value;
                                                setValue(value);
                                            }}
                                            setItems={setItems}
                                            onChangeValue={(value) => {
                                                console.log("Value chosen in bug report screen dropdown box is " + value);
                                                setValue(value);
                                                values.screenThatBugOccuredOn = value
                                            }}
                                            style={{
                                                backgroundColor: brand,
                                                borderColor: darkest,
                                                borderWidth: 5
                                            }}
                                            containerStyle={{
                                                
                                            }}
                                            textStyle={{
                                                fontSize: 14,
                                            }}
                                            dropDownContainerStyle={{
                                                backgroundColor: brand,
                                                borderColor: darkest,
                                                borderWidth: 5
                                            }}
                                            onPress={(value) => {values.screenThatBugOccuredOn = value}}
                                            onClose={(value) => {values.screenThatBugOccuredOn = value}}
                                        />
                                    </ViewHider>
                                    <MsgBox type={messageType}>{message}</MsgBox>
                                    <ViewHider bugScreenVarNum={BugScreenVarNum} bugScreen={1}>
                                        <StyledButton onPress={changeScreenBugOccuredOnView}>
                                            <ButtonText>Next</ButtonText>
                                        </StyledButton>
                                    </ViewHider>
                                    <ViewHider bugScreenVarNum={BugScreenVarNum} bugScreen={2}>
                                        <StyledButton onPress={changeScreenBugOccuredOnView}>
                                            <ButtonText>Back</ButtonText>
                                        </StyledButton>
                                    </ViewHider>
                                    {!isSubmitting && (<ViewHider bugScreenVarNum={BugScreenVarNum} bugScreen={2}><StyledButton onPress={() => {
                                                if (values.bugReport == "") {
                                                    handleMessage('Please fill all the fields.');
                                                } else {
                                                    handleMessage('');
                                                    Alert.alert(
                                                        "Are you sure you want to send this?",
                                                        "Please make sure that your bug report includes: \n - A clear description of the problem \n - A step-by-step list of instructions to reproduce the problem (if possible) \n - What results you expected \n - What results you actually saw",
                                                        [
                                                        {
                                                            text: "Yes, send it", onPress: () => handleSubmit() 
                                                        },
                                                        { 
                                                            text: "Go back and edit",
                                                            onPress: () => console.log("Cancel Pressed"),
                                                            style: 'cancel',
                                                        }
                                                        ]
                                                    );
                                                }
                                            }
                                        }>
                                        <ButtonText> Submit </ButtonText>
                                    </StyledButton></ViewHider>)}

                                    {isSubmitting && (<StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary} />
                                    </StyledButton>)}
                                </StyledFormArea>)}
                        </Formik>
                    </InnerContainer>

            </StyledContainer>
        </KeyboardAvoidingWrapper_NoScrollview>
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

export default ReportBugScreen;
