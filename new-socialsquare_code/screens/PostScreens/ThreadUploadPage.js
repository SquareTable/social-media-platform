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
    AboveButtonText,
    PostHorizontalView,
    CheckBoxForPosts,
    PostIcons,
    MultiMediaPostFrame
} from '../../components/styles';
const {brand, primary, tertiary, darkLight, slightlyLighterGrey, midWhite} = Colors;

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

const ThreadUploadPage = ({route, navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [postIsNSFW, setPostIsNSFW] = useState(false);
    const [postIsNSFL, setPostIsNSFL] = useState(false);
    const [selectFormat, setSelectFormat] = useState("Text");
    const {threadFormat, threadTitle, threadSubtitle, threadTags, categoryTitle, threadBody, threadImage, threadImageDescription, threadNSFW, threadNSFL} = route.params;
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
    
    console.log("Format:", threadFormat, "Title:", threadTitle, "Subtitle:", threadSubtitle, "Tags:", threadTags, "CategoryTitle:", categoryTitle, "Body:", threadBody, "ThreadImage:", threadImage, "ThreadImageDescription:", threadImageDescription, "ThreadNSFW:", threadNSFW, "ThreadNSFL:", threadNSFL)
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
        if (threadImage !== null) {
            if (image !== threadImage) {
                setImage()
                setImage(threadImage)
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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
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

    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                    <StatusBar style="dark"/>
                    <InnerContainer>
                        <PageLogo source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/007-pencil2.png')} />
                        
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
                                            <SubTitle style={{marginBottom: 0, fontSize: 15, fontWeight: 'normal'}}>Text</SubTitle>
                                            {selectFormat == "Text" && (
                                                <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: brand, borderWidth: 3, padding: 10, backgroundColor: darkLight, alignItems: 'center', justifyContent: 'center'}}>
                                                    <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/035-file-text.png')}/>
                                                </TouchableOpacity>
                                            )}
                                            {selectFormat !== "Text" && (
                                                <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: slightlyLighterGrey, borderWidth: 3, padding: 10, backgroundColor: darkLight, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                                                    setSelectFormat("Text")
                                                    values.threadFormat="Text"
                                                }}>
                                                    <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/035-file-text.png')}/>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                                            <SubTitle style={{marginBottom: 0, fontSize: 15, fontWeight: 'normal'}}>Images</SubTitle>
                                            {selectFormat == "Images" && (
                                                <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: brand, borderWidth: 3, padding: 10, backgroundColor: darkLight, alignItems: 'center', justifyContent: 'center'}}>
                                                    <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/015-images.png')}/>
                                                </TouchableOpacity>
                                            )}
                                            {selectFormat !== "Images" && (
                                                <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: slightlyLighterGrey, borderWidth: 3, padding: 10, backgroundColor: darkLight, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                                                    setSelectFormat("Images")
                                                    values.threadFormat="Images"
                                                }}>
                                                    <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/015-images.png')}/>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                                            <SubTitle style={{marginBottom: 0, fontSize: 15, fontWeight: 'normal'}}>User Posts</SubTitle>
                                            {selectFormat == "User Posts" && (
                                                <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: brand, borderWidth: 3, padding: 10, backgroundColor: darkLight, alignItems: 'center', justifyContent: 'center'}}>
                                                    <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/115-users.png')}/>
                                                </TouchableOpacity>
                                            )}
                                            {selectFormat !== "User Posts" && (
                                                <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: slightlyLighterGrey, borderWidth: 3, padding: 10, backgroundColor: darkLight, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
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
                                            {image && <MultiMediaPostFrame style={{width: '100%', aspectRatio: 1/1}} PostingThreadImage={true}>
                                                <Image source={image} style={{ width: "100%", height: '100%'}} resizeMode="contain" />
                                            </MultiMediaPostFrame>}
                                            {image && <StyledButton removeImage={true} onPress={() => {setImage()}}>
                                                <ButtonText removeImage={true}>
                                                    X
                                                </ButtonText>
                                            </StyledButton>}
                                            {!image && <MultiMediaPostFrame style={{width: '100%', aspectRatio: 1/1}} PostingThreadImage={true}>
                                                <StyledButton postImage={true} onPress={OpenImgLibrary}>
                                                    <ButtonText postImage={true}>
                                                        +
                                                    </ButtonText>
                                                </StyledButton>
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
                                    <AboveButtonText>Select Category</AboveButtonText>
                                    <StyledButton signUpButton={true} onPress={() => navigation.navigate("SelectCategorySearchScreen", {threadFormat: selectFormat, threadTitle: values.threadTitle, threadSubtitle: values.threadSubtitle, threadTags: values.threadTags, threadCategory: selectedCategory, threadBody: values.threadBody, threadImage: image, threadImageDescription: values.threadImageDescription, threadNSFW: values.threadNSFW, threadNSFL: values.threadNSFL})}>
                                        <ButtonText signUpButton={true}>{selectedCategory || "None"}</ButtonText>
                                    </StyledButton>
                                    <PostHorizontalView centerAlign={true}>
                                        <CheckBoxForPosts selectedState={postIsNSFW} onPress={checkboxNSFWPressed}/>
                                        <AboveButtonText byCheckBox={true}>Mark as NSFW</AboveButtonText>
                                    </PostHorizontalView>
                                    <PostHorizontalView centerAlign={true}>
                                        <CheckBoxForPosts selectedState={postIsNSFL} onPress={checkboxNSFLPressed}/>
                                        <AboveButtonText byCheckBox={true}>Mark as NSFL</AboveButtonText>
                                    </PostHorizontalView>
                                    <MsgBox type={messageType}>{message}</MsgBox>
                                    {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                                        <ButtonText> Submit </ButtonText>
                                    </StyledButton>)}

                                    {isSubmitting && (<StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary} />
                                    </StyledButton>)}
                                    
                                    <StyledButton signUpButton={true} onPress={() => navigation.navigate("PostScreen")}>
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
                <StyledInputLabel>{label}</StyledInputLabel>
                <StyledTextInput searchPage={true} style={{borderColor: slightlyLighterGrey}} {...props}/>
            </View>
        )
    }
}

export default ThreadUploadPage;
