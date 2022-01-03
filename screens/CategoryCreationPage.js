import React, {useState, useContext, useRef, useEffect} from 'react';

import { StatusBar } from 'expo-status-bar';

// formik
import {Formik} from 'formik';

// icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import ActionSheet from 'react-native-actionsheet';

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
import { useTheme } from '@react-navigation/native';

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

    //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {_id} = storedCredentials;

    useEffect(() => {
        setImage(imageFromRoute)
    })

    const handleCreateCategory = (credentials) => {
        handleMessage(null);
        if (image !== null) {
            const formData = new FormData();
            formData.append("image", {
                name: image.uri.substr(image.uri.lastIndexOf('/') + 1),
                uri: image.uri,
                type: 'image/jpg'
            })
            formData.append("categoryTitle", credentials.categoryTitle)
            formData.append("categoryDescription", credentials.categoryDescription)
            formData.append("creatorId", _id)
            formData.append("categoryTags", credentials.categoryTags)
            formData.append("categoryNSFW", credentials.categoryNSFW)
            formData.append("categoryNSFL", credentials.categoryNSFL)
            console.log(formData);

            const url = "https://nameless-dawn-41038.herokuapp.com/user/postcategorywithimage";
            
            axios.post(url, formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }}).then((response) => {
                const result = response.data;
                const {message, status, data} = result;
                
                if (status !== 'SUCCESS') {
                    handleMessage(message,status);
                    setSubmitting(false);
                } else {
                    handleMessage(message,status);
                    setSubmitting(false);
                }

            }).catch(error => {
                console.log(error);
                setSubmitting(false);
                handleMessage("An error occured. Try checking your network connection and retry.");
            })
        } else {
            const url = "https://nameless-dawn-41038.herokuapp.com/user/postcategorywithoutimage";
            const toSend = {creatorId: _id, categoryTitle: credentials.categoryTitle, categoryDescription: credentials.categoryDescription, categoryTags: credentials.categoryTags, categoryNSFW: credentials.categoryNSFW, categoryNSFL: credentials.categoryNSFL}
            axios.post(url, toSend).then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message,status);
                    setSubmitting(false);
                } else {
                    handleMessage(message,status);
                    setSubmitting(false);
                }

            }).catch(error => {
                console.log(error);
                setSubmitting(false);
                handleMessage("An error occured. Try checking your network connection and retry.");
            })
        }
    }

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
                    <LeftIcon searchIcon={true}>
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

    const ActionMenuOptions = [
        'Camera',
        'Photo Library',
        'Reset Icon',
        'Cancel'
    ]

    let CategoryIconPickerActionMenu = useRef()

    const checkForCameraPermissions = async () => {
        navigation.navigate('TakeImage_Camera', {locationToGoTo: 'CategoryCreationPage'})
    }

    return(
        <>
            <ActionSheet
                ref={CategoryIconPickerActionMenu}
                title={'How would you like to pick the icon?'}
                options={ActionMenuOptions}
                // Define cancel button index in the option array
                // This will take the cancel option in bottom
                // and will highlight it
                cancelButtonIndex={3}
                // Highlight any specific option
                destructiveButtonIndex={2}
                onPress={(index) => {
                    if (index == 0) {
                        console.log('Opening camera...')
                        checkForCameraPermissions()
                    } else if (index == 1) {
                        console.log('Opening image library')
                        OpenImgLibrary()
                    } else if (index == 2) {
                        console.log('Resetting icon')
                        navigation.setParams({imageFromRoute: null})
                    } else if (index == 3) {
                        console.log('Cancelling picker menu')
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
                                        handleCreateCategory(values);
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
                                            <Avatar resizeMode="cover" source={require("./../assets/img/Logo.png")}/>
                                        )}
                                        <StyledButton style={{backgroundColor: colors.primary}} signUpButton={true} onPress={() => {CategoryIconPickerActionMenu.current.show();}}>
                                            <ButtonText signUpButton={true}>Change</ButtonText>
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
                                        <MsgBox type={messageType}>{message}</MsgBox>
                                        {!submitting && (<StyledButton onPress={() => {
                                            setSubmitting(true)
                                            handleSubmit()
                                        }}>
                                            <ButtonText> Submit </ButtonText>
                                        </StyledButton>)}

                                        {submitting && (<StyledButton disabled={true}>
                                            <ActivityIndicator size="large" color={primary} />
                                        </StyledButton>)}
                                        
                                        <StyledButton style={{backgroundColor: colors.primary}} signUpButton={true} onPress={() => navigation.navigate("AccountSettings")}>
                                                <ButtonText signUpButton={true}> Back </ButtonText>
                                        </StyledButton>
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
