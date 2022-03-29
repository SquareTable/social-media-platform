import React, {useState, useContext, useRef, useEffect} from 'react';

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
    AboveButtonText,
    PostHorizontalView,
    CheckBoxForPosts,
    PostIcons,
    MultiMediaPostFrame,
    Avatar
} from './screenStylings/styling';
const {brand, primary, tertiary, darkLight, slightlyLighterGrey, midWhite} = Colors;

//From react native
import {View, Image, ActivityIndicator, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Text} from 'react-native';

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
import { useTheme } from '@react-navigation/native';
import ActionSheet from 'react-native-actionsheet';
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png';

const CategoryCreationPage = ({navigation, route}) => {
    const {colors, dark} = useTheme()
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [image, setImage] = useState(null);
    const [postIsNSFW, setPostIsNSFW] = useState(false);
    const [postIsNSFL, setPostIsNSFL] = useState(false);
    const [selectFormat, setSelectFormat] = useState("Text");
    const [submitting, setSubmitting] = useState(false)
    const {imageFromRoute} = route.params;
    const [screenshotsAllowed, setScreenshotsAllowed] = useState(false);
    // Logo picker
    let LogoPickerActionSheet = useRef();
    let LogoPickerActionSheetOptions = [
        'Choose from Photo Library',
        'Take a Photo',
        'Reset to Default',
        'Cancel',
    ];

    //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {_id} = storedCredentials;

    useEffect(() => {
        setImage(imageFromRoute)
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
                    <LeftIcon style={{top: 27}} searchIcon={true}>
                        <Octicons name={icon} size={30} color={brand} />
                    </LeftIcon>
                    <StyledInputLabel style={{color: colors.tertiary}}>{label}</StyledInputLabel>
                    <StyledTextInput searchPage={true} style={{borderColor: slightlyLighterGrey}} {...props}/>
                </View>
            )
        }
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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1,1],
          quality: 1,
        });
        
        if (!result.cancelled) {
            console.log(result)
            navigation.setParams({imageFromRoute: result})
        } else {
            console.log("Cancelled")
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

    const checkForCameraPermissions = async () => {
        navigation.navigate('TakeImage_Camera', {locationToGoTo: 'CategoryCreationPage'})
    }

    return(
        <>
            <ActionSheet
                ref={LogoPickerActionSheet}
                title={'Profile Picture Options'}
                options={LogoPickerActionSheetOptions}
                // Define cancel button index in the option array
                // This will take the cancel option in bottom
                // and will highlight it
                cancelButtonIndex={3}
                // Highlight any specific option
                destructiveButtonIndex={2}
                onPress={(index) => {
                    if (index == 0) {
                        OpenImgLibrary()
                    } else if (index == 1) {
                        checkForCameraPermissions()
                    } else if (index == 2) {
                        navigation.setParams({imageFromRoute: null})
                    } else if (index == 3) {
                        console.log("Cancelled")
                    }
                }}
            />
            <KeyboardAvoidingWrapper>
                <StyledContainer style={{backgroundColor: colors.primary}}>
                        <StatusBar style={colors.StatusBarColor}/>
                        <InnerContainer>
                            <PageLogo style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/093-drawer.png')} />
                            <PageTitle>Create Category</PageTitle>
                            <Formik
                                initialValues={{categoryTitle: "", categoryDescription: "", categoryTags: "", categoryNSFW: false, categoryNSFL: false}}
                                onSubmit={(values, {setSubmitting}) => {
                                    console.log("Submitting")
                                    if (values.categoryTitle == "" || values.categoryDescription == "") {
                                        handleMessage('Please fill all the fields.');
                                        setSubmitting(false);
                                    } else {
                                        let tempValues = values;
                                        tempValues.image = imageFromRoute;
                                        tempValues.sentAllowScreenShots = screenshotsAllowed;
                                        navigation.reset({
                                            index: 0,
                                            routes: [{name: 'PostScreen', params: {postData: tempValues, postType: 'category', navigateToHomeScreen: true}}]
                                        })
                                    }
                                }}
                            >
                                {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                                    <StyledFormArea theOutline={true}>
                                        <UserTextInput
                                            label="Title (unchangeable)"
                                            icon="note"
                                            placeholder=""
                                            placeholderTextColor={colors.tertiary}
                                            onChangeText={handleChange('categoryTitle')}
                                            onBlur={handleBlur('categoryTitle')}
                                            value={values.categoryTitle}
                                            style={{backgroundColor: colors.borderColor, borderColor: colors.tertiary, color: colors.tertiary}}
                                        />
                                        <UserTextInput
                                            label="Description"
                                            icon="note"
                                            placeholder=""
                                            placeholderTextColor={colors.tertiary}
                                            onChangeText={handleChange('categoryDescription')}
                                            onBlur={handleBlur('categoryDescription')}
                                            value={values.categoryDescription}
                                            style={{backgroundColor: colors.borderColor, borderColor: colors.tertiary, color: colors.tertiary}}
                                        />
                                        <UserTextInput
                                            label="Tags (recommended)"
                                            icon="note"
                                            placeholder=""
                                            placeholderTextColor={colors.tertiary}
                                            onChangeText={handleChange('categoryTags')}
                                            onBlur={handleBlur('categoryTags')}
                                            value={values.categoryTags}
                                            style={{backgroundColor: colors.borderColor, borderColor: colors.tertiary, color: colors.tertiary}}
                                        />
                                        <SubTitle style={{alignSelf: 'center', fontSize: 15, fontWeight: 'normal', marginBottom: 0, color: colors.tertiary}}>Icon</SubTitle>
                                        <SubTitle style={{alignSelf: 'center', fontSize: 15, fontWeight: 'normal', marginBottom: 0, marginTop: 0, color: colors.tertiary}}>(recommended)</SubTitle>
                                        {image && (
                                            <Avatar resizeMode="cover" source={image}/>
                                        )}
                                        {!image && (
                                            <Avatar resizeMode="cover" source={{uri: SocialSquareLogo_B64_png}}/>
                                        )}
                                        <StyledButton signUpButton={true} onPress={() => {LogoPickerActionSheet.current.show()}}>
                                            <ButtonText signUpButton={true} style={{top: -9.5}}>Change logo</ButtonText>
                                        </StyledButton>
                                        <PostHorizontalView centerAlign={true}>
                                            <CheckBoxForPosts style={{borderWidth: dark ? 3 : 5}} selectedState={postIsNSFW} onPress={() => {
                                                if (values.categoryNSFW == true) {
                                                    setPostIsNSFL(false)
                                                    values.categoryNSFL = false
                                                    setPostIsNSFW(false)
                                                    values.categoryNSFW = false
                                                } else {
                                                    setPostIsNSFL(false)
                                                    values.categoryNSFL = false
                                                    setPostIsNSFW(true)
                                                    values.categoryNSFW = true
                                                }
                                            }}/>
                                            <AboveButtonText style={{color: colors.tertiary}} byCheckBox={true}>Mark as NSFW</AboveButtonText>
                                        </PostHorizontalView>
                                        <PostHorizontalView centerAlign={true}>
                                            <CheckBoxForPosts style={{borderWidth: dark ? 3 : 5}} selectedState={postIsNSFL} onPress={() => {
                                                if (values.categoryNSFL == true) {
                                                    setPostIsNSFL(false)
                                                    values.categoryNSFL = false
                                                    setPostIsNSFW(false)
                                                    values.categoryNSFW = false
                                                } else {
                                                    setPostIsNSFL(true)
                                                    values.categoryNSFL = true
                                                    setPostIsNSFW(false)
                                                    values.categoryNSFW = false
                                                }
                                            }}/>
                                            <AboveButtonText style={{color: colors.tertiary}} byCheckBox={true}>Mark as NSFL</AboveButtonText>
                                        </PostHorizontalView>
                                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 15}}>
                                            <Text style={{color: colors.tertiary, fontSize: 18, marginTop: 10, marginRight: 10}}>Allow screen capture</Text>
                                            <TouchableOpacity onPress={() => {setScreenshotsAllowed(screenshotsAllowed => !screenshotsAllowed)}} style={{width: 40, height: 40, borderColor: colors.borderColor, borderWidth: 3, justifyContent: 'center', alignItems: 'center'}}>
                                                <Text style={{color: colors.tertiary, fontSize: 18, textAlign: 'center', textAlignVertical: 'center'}}>{screenshotsAllowed == false ? '✕' : '✓'}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <MsgBox type={messageType}>{message}</MsgBox>
                                        {!submitting && (<StyledButton onPress={() => {
                                            setSubmitting(true)
                                            handleSubmit()
                                        }}>
                                            <ButtonText> Submit </ButtonText>
                                        </StyledButton>)}

                                        {submitting && (<StyledButton disabled={true}>
                                            <ActivityIndicator size="large" color={colors.primary} />
                                        </StyledButton>)}
                                    </StyledFormArea>)}
                            </Formik>
                        </InnerContainer>

                </StyledContainer>
            </KeyboardAvoidingWrapper>
        </>
    );
}

const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: "center"
    }
})

export default CategoryCreationPage;
