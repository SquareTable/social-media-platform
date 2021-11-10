import React, {useContext, useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import {Formik} from 'formik';

import { Camera } from 'expo-camera';

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
const {brand, primary, tertiary, greyish, darkLight, darkestBlue, slightlyLighterPrimary} = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../../components/CredentialsContext';
import { ImageBackground, ScrollView, Image, View, TouchableOpacity, Text } from 'react-native';

//Image picker
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '@react-navigation/native';

const MultiMediaUploadPage = ({navigation, route}) => {
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [image, setImage] = useState(null);
    const [clearingImage, setClearingImage] = useState(false);
    const {imageFromRoute} = route.params;


    useEffect(() => {
        setImage(imageFromRoute)
    })
    

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
            navigation.setParams({imageFromRoute: result})
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

    const {colors, dark} = useTheme()

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const checkForCameraPermissions = async () => {
        var { status } = await Camera.requestPermissionsAsync();
        setHasCameraPermission(status === 'granted');
        if (hasCameraPermission == false) {
            alert('Please enable camera permissions for this feature to work.')
        } else {
            console.log('Camera permissions have been granted')
            navigation.navigate('TakeImage_Camera', {locationToGoTo: 'MultiMediaUploadPage'})
        }
    }

    const UserTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
        return(
            <View>
                <LeftIcon>
                    <Octicons name={icon} size={30} color={brand} />
                </LeftIcon>
                <StyledInputLabel style={{color: colors.tertiary}}>{label}</StyledInputLabel>
                <StyledTextInput {...props}/>
            </View>
        )
    }

    return(
        <>    
            <StatusBar style="dark"/>
            <ScrollView style={{backgroundColor: colors.primary}}>
                <MultiMediaPostFrame style={{backgroundColor: dark ? slightlyLighterPrimary : colors.borderColor}} TitleView={true}>
                    <PageTitle>MultiMedia Post Screen</PageTitle>
                    <SubTitle style={{color: darkestBlue}}>Format: Image</SubTitle>
                </MultiMediaPostFrame>
                {image && <MultiMediaPostFrame style={{backgroundColor: dark ? slightlyLighterPrimary : colors.borderColor}} ImageView={true}>
                    <Image source={image} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
                </MultiMediaPostFrame>}

                {!image && <MultiMediaPostFrame style={{backgroundColor: dark ? slightlyLighterPrimary : colors.borderColor}} ImageView={true}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <StyledButton style={{backgroundColor: dark ? slightlyLighterPrimary : colors.borderColor, borderColor: colors.tertiary}} postImage={true} onPress={OpenImgLibrary}>
                            <ButtonText style={{color: colors.tertiary}} postImage={true}>
                                +
                            </ButtonText>
                        </StyledButton>
                        <View style={{width: 20}}/>
                        <StyledButton style={{backgroundColor: dark ? slightlyLighterPrimary : colors.borderColor, borderColor: colors.tertiary}} postImage={true} onPress={checkForCameraPermissions}>
                            <Image
                                source={require('../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/016-camera.png')}
                                style={{height: 30, width: 30, tintColor: colors.tertiary}}
                                resizeMode="contain"
                                resizeMethod="resize"
                            />
                        </StyledButton>
                    </View>
                </MultiMediaPostFrame>}
                {image && <StyledButton style={{backgroundColor: dark ? slightlyLighterPrimary : colors.borderColor, borderColor: colors.tertiary}} removeImage={true} onPress={() => {navigation.setParams({imageFromRoute: null})}}>
                    <ButtonText style={{color: colors.tertiary}} removeImage={true}>
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
                                    style={{backgroundColor: colors.primary, color: colors.tertiary}}
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
                                    style={{backgroundColor: colors.primary, color: colors.tertiary}}
                                />

                                <MsgBox type={messageType}>{message}</MsgBox>
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText> Continue </ButtonText>
                                </StyledButton>
                                
                                <StyledButton style={{backgroundColor: colors.primary}} signUpButton={true} onPress={() => navigation.navigate("PostScreen")}>
                                        <ButtonText signUpButton={true}> Cancel </ButtonText>
                                </StyledButton>
                            </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </ScrollView>

        </>
    );
}


export default MultiMediaUploadPage;
