import React, {useState, useContext, useEffect} from 'react';

import { StatusBar } from 'expo-status-bar';

// formik
import {Formik} from 'formik';

global.Buffer = global.Buffer || require('buffer').Buffer

import nacl from 'tweet-nacl-react-native-expo'

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
    AboveButtonText,
    PostHorizontalView,
    CheckBoxForPosts,
    PostIcons,
    MultiMediaPostFrame,
    Avatar
} from './screenStylings/styling.js';
const {brand, primary, tertiary, darkLight, slightlyLighterGrey, midWhite, slightlyLighterPrimary, descTextColor} = Colors;

//From react native
import {View, Image, ActivityIndicator, ImageBackground, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

// axios
import axios from 'axios';

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';

//Image picker
import * as ImagePicker from 'expo-image-picker';

import { useIsFocused } from '@react-navigation/native';

const CreateDMConversation = ({route, navigation}) => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {_id} = storedCredentials;
    const {nameSent} = route.params;
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [happenOnce, setHappenOnce] = useState(false)
    const [submittingCreate, setSubmittingCreate] = useState(false)

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    useEffect(() => {
        if (nameSent !== null) {
            if (submittingCreate == false) {
                const forAsync = async () => {
                    setSubmittingCreate(true)
                    
                    const nonce = await nacl.randomBytes(24)

                    console.log("Attempting to create a DM")
                    const url = "https://nameless-dawn-41038.herokuapp.com/conversations/createDirectMessage";
                    const toSend = {creatorId: _id, recipientName: nameSent, cryptographicNonce: nonce}
                    axios.post(url, toSend).then((response) => {
                        const result = response.data;
                        const {message, status, data} = result;

                        if (status !== 'SUCCESS') {
                            handleMessage(message,status);
                            if (message == "Direct Message Exists") {
                                setSubmittingCreate(false);
                                navigation.navigate("Conversations")
                            } else {
                                setSubmittingCreate(false);
                            }
                        } else {
                            handleMessage(message,status);
                            setSubmittingCreate(false);
                            navigation.navigate("Conversations")
                        }

                    }).catch(error => {
                        console.log(error);
                        setSubmittingCreate(false);
                        handleMessage("An error occured. Try checking your network connection and retry.");
                    })
                }
                forAsync()
            }
        } else {
            handleMessage("Error with recipient name sent over.")
        }
    })

    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                    <StatusBar style="dark"/>
                    <InnerContainer>
                        <PageLogo resizeMode={"contain"} tintColor={brand} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/113-bubbles4.png')}/>
                        <PageTitle>Attempting to create conversation</PageTitle>
                        {submittingCreate == true && (
                            <ActivityIndicator size="large" color={brand} style={{marginBottom: 20}} />  
                        )}
                        <MsgBox type={messageType}>{message}</MsgBox>
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

const UserTextInput = ({label, icon, body, ...props}) => {
    if (body == true) {
        return(
            <View>
                <LeftIcon searchIcon={true}>
                    <Octicons name={icon} size={30} color={brand} />
                </LeftIcon>
                <StyledInputLabel>{label}</StyledInputLabel>
                <StyledTextInput searchPage={true} style={{borderColor: midWhite, borderRadius: 10}} {...props}/>
            </View>
        )
    } else {
        return(
            <View>
                <StyledInputLabel>{label}</StyledInputLabel>
                <StyledTextInput searchPage={true} style={{borderColor: slightlyLighterGrey, borderRightWidth: 0, borderTopWidth: 0, borderRadius: 2, backgroundColor: primary, paddingLeft: 10}} {...props}/>
            </View>
        )
    }
}

export default CreateDMConversation;
