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

// icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

// Colors
const {brand, primary, tertiary, greyish, darkLight, darkestBlue} = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../../components/CredentialsContext';
import { ImageBackground, ScrollView, Image, View } from 'react-native';

//Image picker
import * as ImagePicker from 'expo-image-picker';

const MultiMediaUploadPage = ({navigation}) => {
    const [image, setImage] = useState();
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        
        if (!result.cancelled) {
            console.log(result)
            setImage(result);
        }
    };

        
    const OpenImgLibrary = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            } else {
                pickImage()
            }
        }
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    return(
        <>    
            <StatusBar style="dark"/>
            <ScrollView style={{backgroundColor: primary}}>
                <MultiMediaPostFrame TitleView={true}>
                    <PageTitle>MultiMedia Post Screen</PageTitle>
                    <SubTitle style={{color: darkestBlue}}>Format: Image</SubTitle>
                </MultiMediaPostFrame>
                {image && <MultiMediaPostFrame ImageView={true}>
                    <Image source={image} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
                </MultiMediaPostFrame>}

                {!image && <MultiMediaPostFrame ImageView={true}>
                    <StyledButton postImage={true} onPress={OpenImgLibrary}>
                        <ButtonText postImage={true}>
                            +
                        </ButtonText>
                    </StyledButton>
                </MultiMediaPostFrame>}
                {image && <StyledButton removeImage={true} onPress={() => {setImage()}}>
                    <ButtonText removeImage={true}>
                        X
                    </ButtonText>
                </StyledButton>}
                <InnerContainer>
                    <Formik
                        initialValues={{title: '', description: ''}}
                        onSubmit={(values) => {
                            if (values.title == "" || values.description == "" || image == null) {
                                handleMessage('Please fill all the fields.');
                            } else {
                                navigation.navigate("MultiMediaUploadPreview", {title: values.title, description: values.description, image: image})
                            }
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                            <StyledFormArea>
                                <UserTextInput
                                    label="Title"
                                    icon="pencil"
                                    placeholder=""
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('title')}
                                    onBlur={handleBlur('title')}
                                    value={values.title}
                                />

                                <UserTextInput
                                    label="Description"
                                    icon="pencil"
                                    placeholder=""
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                    multiline={true}
                                />

                                <MsgBox type={messageType}>{message}</MsgBox>
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText> Continue </ButtonText>
                                </StyledButton>
                                
                                <StyledButton signUpButton={true} onPress={() => navigation.navigate("PostScreen")}>
                                        <ButtonText signUpButton={true}> Cancel </ButtonText>
                                </StyledButton>
                            </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </ScrollView>

        </>
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
        </View>
    )
}

export default MultiMediaUploadPage;
