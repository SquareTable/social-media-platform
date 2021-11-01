import React, {useContext, useState} from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import {Formik} from 'formik';

import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    Colors,
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
    PostMsgBox,
    MultiMediaPostFrame,
    StyledTextInput,
    LeftIcon,
    StyledInputLabel,
    MsgBox
} from '../screenStylings/styling.js';
import {ActivityIndicator} from 'react-native';

// icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

// Colors
const {brand, primary, tertiary, greyish, darkLight, darkestBlue} = Colors;

// axios
import axios from 'axios';

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../../components/CredentialsContext';
import { ImageBackground, ScrollView, Image, View } from 'react-native';

//Image picker
import * as ImagePicker from 'expo-image-picker';
import { cos } from 'react-native-reanimated';

const MultiMediaUploadPreview = ({route, navigation}) => {
    const { title, description, image} = route.params;
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {_id, name, displayName, email, photoUrl} = storedCredentials;
    const [submitting, setSubmitting] = useState(false)
    
    const formData = new FormData();
    formData.append("image", {
        name: image.uri.substr(image.uri.lastIndexOf('/') + 1),
        uri: image.uri,
        type: 'image/jpg'
    })
    formData.append("title", title)
    formData.append("description", description)
    formData.append("creatorId", _id)
    console.log(formData);
    
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleMessage =  (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const postMultiMedia = () => {
        console.log("Post pressed")
        handleMessage(null);
        setSubmitting(true);
        const url = "https://nameless-dawn-41038.herokuapp.com/user/postImage";

        axios.post(url, formData, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }}).then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                handleMessage(message, status);
                console.log(result)
            } else {
                console.log(data)
                handleMessage(message, status)
                //persistLogin({...data[0]}, message, status);
            }
            setSubmitting(false);

        }).catch(error => {
            console.log(error);
            setSubmitting(false);
            handleMessage("An error occured. Try checking your network connection and retry.");
        })
    }

    return(
        <>    
            <StatusBar style="dark"/>
            <ScrollView style={{backgroundColor: primary}}>
                <MultiMediaPostFrame TitleView={true}>
                    <PageTitle>MultiMedia Post Screen</PageTitle>
                    <SubTitle style={{color: darkestBlue}}>Format: Image</SubTitle>
                </MultiMediaPostFrame>
                <SubTitle style={{color: brand, alignSelf: "center"}}>Preview</SubTitle>
                <MultiMediaPostFrame ImageView={true}>
                    <Image source={image} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
                </MultiMediaPostFrame>
                <MultiMediaPostFrame>
                    <SubTitle>{title}</SubTitle>
                    <SubTitle style={{fontSize: 10}}>{description}</SubTitle>
                </MultiMediaPostFrame>
                {!submitting && (<StyledButton onPress={postMultiMedia}>
                    <ButtonText> Post </ButtonText>
                </StyledButton>)}
                {submitting && (<StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                </StyledButton>)}
                <MsgBox>{message}</MsgBox>
            </ScrollView>

        </>
    );
}

export default MultiMediaUploadPreview;
