import React, {useState, useContext, useEffect} from 'react';

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
    MultiMediaPostFrame
} from '../screenStylings/styling.js';
const {brand, primary, tertiary, darkLight, slightlyLighterGrey, midWhite, greyish} = Colors;

//From react native
import {View, Image, ActivityIndicator, ImageBackground, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

//Axios
import axios from 'axios';

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../../components/CredentialsContext';

//Image picker
import * as ImagePicker from 'expo-image-picker';
import CategoryCreationPage from '../CategoryCreationPage';
import { useTheme } from '@react-navigation/native';

const ThreadUploadPage = ({route, navigation}) => {
    const {colors, dark} = useTheme();
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [postIsNSFW, setPostIsNSFW] = useState(false);
    const [postIsNSFL, setPostIsNSFL] = useState(false);
    const [selectFormat, setSelectFormat] = useState("Text");
    const {threadFormat, threadTitle, threadSubtitle, threadTags, categoryTitle, threadBody, imageFromRoute, threadImageDescription, threadNSFW, threadNSFL} = route.params;
    const [selectedTitle, setSelectedTitle] = useState("")
    const [selectedSubTitle, setSelectedSubTitle] = useState("")
    const [selectedTags, setSelectedTags] = useState("")
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedBody, setSelectedBody] = useState("")
    const [image, setImage] = useState();
    const [selectedThreadImageDescription, setSelectedThreadImageDescription] = useState("")
    const [selectedThreadNSFW, setSelectedThreadNSFW] = useState(false)
    const [selectedThreadNSFL, setSelectedThreadNSFL] = useState(false)
    const [changeOnce, setChangeOnce] = useState(false)
    //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {_id} = storedCredentials;

    useEffect(() => {
        setImage(imageFromRoute)
    })
    
    console.log("Format:", threadFormat, "Title:", threadTitle, "Subtitle:", threadSubtitle, "Tags:", threadTags, "CategoryTitle:", categoryTitle, "Body:", threadBody, "ImageFromRoute:", imageFromRoute, "ThreadImageDescription:", threadImageDescription, "ThreadNSFW:", threadNSFW, "ThreadNSFL:", threadNSFL)
    console.log("SelectedCategory:", selectedCategory)
    if (categoryTitle !== null) {
        if (selectedCategory !== categoryTitle) {
            setSelectedCategory(null)
            setSelectedCategory(categoryTitle)
            console.log("Changed selected category")
        }
    }
    if (changeOnce == false) {
        if (threadFormat !== null) {
            if (selectFormat !== threadFormat) {
                setSelectFormat()
                setSelectFormat(threadFormat)
            }
        }
        if (threadTitle !== null) {
            if (selectedTitle !== threadTitle) {
                setSelectedTitle()
                setSelectedTitle(threadTitle)
            }
        }
        if (threadSubtitle !== null) {
            if (selectedSubTitle !== threadSubtitle) {
                setSelectedSubTitle()
                setSelectedSubTitle(threadSubtitle)
            }
        }
        if (threadTags !== null) {
            if (selectedTags !== threadTags) {
                setSelectedTags()
                setSelectedTags(threadTags)
            }
        }
        if (threadBody !== null) {
            if (selectedBody !== threadBody) {
                setSelectedBody()
                setSelectedBody(threadBody)
            }
        }
        if (imageFromRoute !== null) {
            if (image !== imageFromRoute) {
                setImage()
                setImage(imageFromRoute)
            }
        }
        if (threadImageDescription !== null) {
            if (selectedThreadImageDescription !== threadImageDescription) {
                setSelectedThreadImageDescription()
                setSelectedThreadImageDescription(threadImageDescription)
            }
        }
        if (threadNSFW !== null) {
            if (selectedThreadNSFW !== threadNSFW) {
                setSelectedThreadNSFW()
                setSelectedThreadNSFW(threadNSFW)
            }
        }
        if (threadNSFL !== null) {
            if (selectedThreadNSFL !== threadNSFL) {
                setSelectedThreadNSFL()
                setSelectedThreadNSFL(threadNSFL)
            }
        }
        setChangeOnce(true)
    }

    const checkboxNSFWPressed = () => {
        if (postIsNSFW == true) {
            if (postIsNSFL == true) {
                setPostIsNSFL(true)
                setPostIsNSFW(false)
            }else{
                setPostIsNSFL(false)
                setPostIsNSFW(false)
            }
        } else {
            setPostIsNSFL(false)
            setPostIsNSFW(true)
        }
    }

    const checkboxNSFLPressed = () => {
        if (postIsNSFL == true) {
            if (postIsNSFW == true) {
                setPostIsNSFW(true)
                setPostIsNSFL(false)
            }else{
                setPostIsNSFL(false)
                setPostIsNSFW(false)
            }
        } else {
            setPostIsNSFW(false)
            setPostIsNSFL(true)
        }
    }

    const handlePostThread = (credentials) => {
        handleMessage(null);
        if (selectFormat == "Text") {
            console.log("Text Format")
            const url = "https://nameless-dawn-41038.herokuapp.com/user/posttextthread";
            var toSend = {creatorId: _id, threadTitle: credentials.threadTitle, threadSubtitle: credentials.threadSubtitle, threadTags: credentials.threadTags, threadCategory: selectedCategory, threadBody: credentials.threadBody, threadNSFW: credentials.threadNSFW, threadNSFL: credentials.threadNSFL}
            axios.post(url, toSend).then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message,status);
                } else {
                    handleMessage(message, status)
                }

            }).catch(error => {
                console.log(error);
                handleMessage("An error occured. Try checking your network connection and retry.");
            })
        } else if (selectFormat == "Images") {
            //Set up formdata
            console.log("Image format")
            const formData = new FormData();
            formData.append("image", {
                name: image.uri.substr(image.uri.lastIndexOf('/') + 1),
                uri: image.uri,
                type: 'image/jpg'
            })
            formData.append("creatorId", _id)
            formData.append("threadTitle", credentials.threadTitle)
            formData.append("threadSubtitle", credentials.threadSubtitle)
            formData.append("threadTags", credentials.threadTags)
            formData.append("threadCategory", selectedCategory)
            formData.append("threadImageDescription", credentials.threadImageDescription)
            formData.append("threadNSFW", credentials.threadNSFW)
            formData.append("threadNSFL", credentials.threadNSFL)
            console.log("FormData:")
            console.log(formData);
            
            //post
            const url = "https://nameless-dawn-41038.herokuapp.com/user/postimagethread";
            axios.post(url, formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }}).then((response) => {
                const result = response.data;
                const {message, status, data} = result;
                
                if (status !== 'SUCCESS') {
                    handleMessage(message,status);
                } else {
                    handleMessage(message,status);
                }

            }).catch(error => {
                console.log(error);
                handleMessage("An error occured. Try checking your network connection and retry.");
            })
        }
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const UserTextInput = ({label, icon, body, ...props}) => {
        if (body == true) {
            return(
                <View>
                    <LeftIcon searchIcon={true}>
                        <Octicons name={icon} size={30} color={brand} />
                    </LeftIcon>
                    <StyledInputLabel style={{color: colors.tertiary}}>{label}</StyledInputLabel>
                    <StyledTextInput searchPage={true} style={{borderColor: dark ? midWhite : greyish, borderRadius: 10, backgroundColor: dark ? darkLight : colors.borderColor, borderWidth: 3, color: colors.tertiary}} {...props}/>
                </View>
            )
        } else {
            return(
                <View>
                    <LeftIcon searchIcon={true}>
                        <Octicons name={icon} size={30} color={brand} />
                    </LeftIcon>
                    <StyledInputLabel style={{color: colors.tertiary}}>{label}</StyledInputLabel>
                    <StyledTextInput searchPage={true} style={{borderColor: dark ? slightlyLighterGrey : greyish, backgroundColor: dark ? darkLight : colors.borderColor, color: colors.tertiary}} {...props}/>
                </View>
            )
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });
        
        if (!result.cancelled) {
            console.log(result)
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

    const checkForCameraPermissions = async () => {
        navigation.navigate('TakeImage_Camera', {locationToGoTo: 'ThreadUploadPage'})
    }

    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer style={{backgroundColor: colors.primary}}>
                    <StatusBar style={dark ? 'light' : 'dark'}/>
                    <InnerContainer style={{backgroundColor: colors.primary}}>
                        <PageLogo style={{tintColor: colors.tertiary}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/007-pencil2.png')} />
                        
                        <PageTitle>Create Thread</PageTitle>
                        <Formik
                            initialValues={{threadFormat: selectFormat, threadTitle: selectedTitle, threadSubtitle: selectedSubTitle, threadTags: selectedTags, threadCategory: selectedCategory, threadBody: selectedBody, threadImageDescription: selectedThreadImageDescription, threadNSFW: selectedThreadNSFW, threadNSFL: selectedThreadNSFL}}
                            onSubmit={(values) => {
                                console.log("Submitting")
                                if (values.threadFormat == "Text") {
                                    if (values.threadTitle == "" || selectedCategory == null || values.threadBody == "") {
                                        handleMessage('Please fill all the fields.');
                                    } else {
                                        handlePostThread(values);
                                    }
                                } else if (values.threadFormat == "Images") {
                                    if (values.threadTitle == "" || selectedCategory == null || image == null) {
                                        handleMessage('Please fill all the fields.');
                                    } else {
                                        handlePostThread(values);
                                    }
                                }
                            }}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                                <StyledFormArea theOutline={true}>
                                    <UserTextInput
                                        label="Thread Title"
                                        icon="note"
                                        placeholder=""
                                        placeholderTextColor={tertiary}
                                        onChangeText={handleChange('threadTitle')}
                                        onBlur={handleBlur('threadTitle')}
                                        value={values.threadTitle}
                                    />
                                    <UserTextInput
                                        label="Thread Subtitle (optional)"
                                        icon="note"
                                        placeholder=""
                                        placeholderTextColor={tertiary}
                                        onChangeText={handleChange('threadSubtitle')}
                                        onBlur={handleBlur('threadSubtitle')}
                                        value={values.threadSubtitle}
                                    />
                                    <UserTextInput
                                        label="Tags (optional)"
                                        icon="note"
                                        placeholder=""
                                        placeholderTextColor={tertiary}
                                        onChangeText={handleChange('threadTags')}
                                        onBlur={handleBlur('threadTags')}
                                        value={values.threadTags}
                                    />
                                    <View style={{width: '100%', flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                                            <SubTitle style={{marginBottom: 0, fontSize: 15, fontWeight: 'normal', color: colors.tertiary}}>Text</SubTitle>
                                            {selectFormat == "Text" && (
                                                <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: brand, borderWidth: 3, padding: 10, backgroundColor: colors.borderColor, alignItems: 'center', justifyContent: 'center'}}>
                                                    <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/035-file-text.png')}/>
                                                </TouchableOpacity>
                                            )}
                                            {selectFormat !== "Text" && (
                                                <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: slightlyLighterGrey, borderWidth: 3, padding: 10, backgroundColor: colors.borderColor, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                                                    setSelectFormat("Text")
                                                    values.threadFormat="Text"
                                                }}>
                                                    <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/035-file-text.png')}/>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                                            <SubTitle style={{marginBottom: 0, fontSize: 15, fontWeight: 'normal', color: colors.tertiary}}>Images</SubTitle>
                                            {selectFormat == "Images" && (
                                                <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: brand, borderWidth: 3, padding: 10, backgroundColor: colors.borderColor, alignItems: 'center', justifyContent: 'center'}}>
                                                    <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/015-images.png')}/>
                                                </TouchableOpacity>
                                            )}
                                            {selectFormat !== "Images" && (
                                                <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: slightlyLighterGrey, borderWidth: 3, padding: 10, backgroundColor: colors.borderColor, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                                                    setSelectFormat("Images")
                                                    values.threadFormat="Images"
                                                }}>
                                                    <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/015-images.png')}/>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                                            <SubTitle style={{marginBottom: 0, fontSize: 15, fontWeight: 'normal', color: colors.tertiary}}>User Posts</SubTitle>
                                            {selectFormat == "User Posts" && (
                                                <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: brand, borderWidth: 3, padding: 10, backgroundColor: colors.borderColor, alignItems: 'center', justifyContent: 'center'}}>
                                                    <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/115-users.png')}/>
                                                </TouchableOpacity>
                                            )}
                                            {selectFormat !== "User Posts" && (
                                                <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: slightlyLighterGrey, borderWidth: 3, padding: 10, backgroundColor: colors.borderColor, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                                                    setSelectFormat("User Posts")
                                                    values.threadFormat="User Posts"
                                                }}>
                                                    <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/115-users.png')}/>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    </View>
                                    {selectFormat == "Text" && (
                                        <UserTextInput
                                            label="Body"
                                            icon="note"
                                            placeholder=""
                                            body={true}
                                            multiline={true}
                                            placeholderTextColor={tertiary}
                                            onChangeText={handleChange('threadBody')}
                                            onBlur={handleBlur('threadBody')}
                                            value={values.threadBody}
                                        />
                                    )}
                                    {selectFormat == "Images" && (
                                        <View style={{width: '90%', alignSelf: 'center', marginVertical: 10}}>
                                            {image && <MultiMediaPostFrame style={{width: '100%', aspectRatio: 1/1, backgroundColor: colors.borderColor}} PostingThreadImage={true}>
                                                <Image source={image} style={{ width: "100%", height: '100%'}} resizeMode="contain" />
                                            </MultiMediaPostFrame>}
                                            {image && <StyledButton style={{backgroundColor: colors.primary, borderColor: colors.tertiary}} removeImage={true} onPress={() => {navigation.setParams({imageFromRoute: null})}}>
                                                <ButtonText style={{color: colors.tertiary}} removeImage={true}>
                                                    X
                                                </ButtonText>
                                            </StyledButton>}
                                            {!image && <MultiMediaPostFrame style={{width: '100%', aspectRatio: 1/1, backgroundColor: colors.borderColor}} PostingThreadImage={true}>
                                                <View style={{flexDirection: 'row'}}>
                                                    <StyledButton style={{backgroundColor: colors.borderColor, borderColor: colors.tertiary}} postImage={true} onPress={OpenImgLibrary}>
                                                        <ButtonText style={{color: colors.tertiary}} postImage={true}>
                                                            +
                                                        </ButtonText>
                                                    </StyledButton>
                                                    <View style={{width: 20}}/>
                                                    <StyledButton style={{backgroundColor: colors.borderColor, borderColor: colors.tertiary}} postImage={true} onPress={checkForCameraPermissions}>
                                                    <Image
                                                        source={require('../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/016-camera.png')}
                                                        style={{height: 30, width: 30, tintColor: colors.tertiary}}
                                                        resizeMode="contain"
                                                        resizeMethod="resize"
                                                    />
                                                    </StyledButton>
                                                </View>
                                            </MultiMediaPostFrame>}
                                            <UserTextInput
                                                label="Image Description (optional)"
                                                icon="note"
                                                placeholder=""
                                                body={true}
                                                multiline={true}
                                                placeholderTextColor={tertiary}
                                                onChangeText={handleChange('threadImageDescription')}
                                                onBlur={handleBlur('threadImageDescription')}
                                                value={values.threadImageDescription}
                                            />
                                        </View>
                                    )}
                                    <AboveButtonText style={{color: colors.tertiary}}>Select Category</AboveButtonText>
                                    <StyledButton style={{backgroundColor: colors.primary}} signUpButton={true} onPress={() => navigation.navigate("SelectCategorySearchScreen", {threadFormat: selectFormat, threadTitle: values.threadTitle, threadSubtitle: values.threadSubtitle, threadTags: values.threadTags, threadCategory: selectedCategory, threadBody: values.threadBody, threadImage: image, threadImageDescription: values.threadImageDescription, threadNSFW: values.threadNSFW, threadNSFL: values.threadNSFL})}>
                                        <ButtonText signUpButton={true}>{selectedCategory || "None"}</ButtonText>
                                    </StyledButton>
                                    <PostHorizontalView centerAlign={true}>
                                        <CheckBoxForPosts selectedState={postIsNSFW} onPress={checkboxNSFWPressed}/>
                                        <AboveButtonText style={{color: colors.tertiary, borderColor: dark ? 3 : 5}} byCheckBox={true}>Mark as NSFW</AboveButtonText>
                                    </PostHorizontalView>
                                    <PostHorizontalView centerAlign={true}>
                                        <CheckBoxForPosts selectedState={postIsNSFL} onPress={checkboxNSFLPressed}/>
                                        <AboveButtonText style={{color: colors.tertiary, borderColor: dark ? 3 : 5}} byCheckBox={true}>Mark as NSFL</AboveButtonText>
                                    </PostHorizontalView>
                                    <MsgBox type={messageType}>{message}</MsgBox>
                                    {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                                        <ButtonText> Submit </ButtonText>
                                    </StyledButton>)}

                                    {isSubmitting && (<StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary} />
                                    </StyledButton>)}
                                    
                                    <StyledButton style={{backgroundColor: colors.primary}} signUpButton={true} onPress={() => navigation.navigate("PostScreen")}>
                                            <ButtonText signUpButton={true}> Back </ButtonText>
                                    </StyledButton>
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

export default ThreadUploadPage;
