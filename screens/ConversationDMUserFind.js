import React, {useContext, useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';

import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Colors,
    Avatar,
    StyledContainer,
    StyledInputLabel,
    StyledTextInput,
    SearchBarArea,
    LeftIcon,
    SearchHorizontalView,
    SearchHorizontalViewItem,
    SearchHorizontalViewItemCenter,
    SearchSubTitle,
    ProfIcons,
    SearchUserViewItemCenter,
    SearchFrame,
    PostIcons,
    ChatScreen_Title,
    Navigator_BackButton,
    TestText
} from './screenStylings/styling.js';

// Colors
const {brand, primary, tertiary, greyish, darkLight, slightlyLighterGrey, midWhite, red, darkest} = Colors;

// icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { SectionList, ActivityIndicator, Image, TouchableWithoutFeedback, Keyboard, Text, View } from 'react-native';

// formik
import {Formik} from 'formik';

import background from "./../assets/img/Toga.jpg";

//axios
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png';

import { useTheme } from '@react-navigation/native';

const ConversationDMUserFind = ({route, navigation}) => {
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {name} = storedCredentials;
    var submitting = false;
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [foundAmount, setFoundAmount] = useState();
    const [debounce, setDebounce] = useState(false);
    const [changeSections, setChangeSections] = useState()
    const [loadingOne, setLoadingOne] = useState()
    const {colors, dark} = useTheme()
    const [noResults, setNoResults] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    var userLoadMax = 10;
    
    const tryToCreateDM = (nameSent) => {
        console.log("Attempting to create a DM")
        navigation.navigate("CreateDMConversation", {nameSent: nameSent})
    }

    const UserItem = ({name, displayName, following, followers, totalLikes, profileKey}) => (
        <SearchFrame onPress={() => {tryToCreateDM(name)}}>
            {profileKey !== null && (
                <Avatar resizeMode="cover" searchPage={true} source={{uri: `data:image/jpg;base64,${profileKey}`}} />
            )}
            {profileKey == null && (
                <Avatar resizeMode="cover" searchPage={true} source={{uri: SocialSquareLogo_B64_png}} />
            )}
            <SubTitle searchResTitle={true}>{displayName}</SubTitle>
            <SubTitle searchResTitleDisplayName={true} style={{color: brand}}>@{name}</SubTitle>
            <SearchHorizontalView>
                <SearchHorizontalViewItem>
                    <SearchSubTitle welcome={true}> Following </SearchSubTitle>
                    <ProfIcons source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/273-checkmark.png')}/>
                    <SearchSubTitle welcome={true}> {following} </SearchSubTitle>
                </SearchHorizontalViewItem>

                <SearchHorizontalViewItemCenter>
                    <SearchSubTitle welcome={true}> Followers </SearchSubTitle>
                    <ProfIcons source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/274-checkmark2.png')}/>
                    <SearchSubTitle welcome={true}> {followers} </SearchSubTitle>
                </SearchHorizontalViewItemCenter>

                <SearchHorizontalViewItem>
                    <SearchSubTitle welcome={true}> Total Likes </SearchSubTitle>
                    <ProfIcons source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/273-checkmark.png')}/>
                    <SearchSubTitle welcome={true}> {totalLikes} </SearchSubTitle>
                </SearchHorizontalViewItem>
            </SearchHorizontalView>
        </SearchFrame>
    );

    //any image honestly
    async function getImageWithKeyOne(imageKey) {
        return axios.get(`https://nameless-dawn-41038.herokuapp.com/getImage/${imageKey}`)
        .then(res => res.data).catch(error => {
            console.log(error);
            //setSubmitting(false);
            console.log("Either an error or cancelled.");
        })
    }

    const handleUserSearch = (val) => {
        setChangeSections()
        if (val !== "") {
            const layoutUsersFound = (data) => {
                var allData = data
                console.log(allData)
                console.log(allData.length)
                var tempSections = []
                var itemsProcessed = 0;
                allData.forEach(function (item, index) {
                    if (allData[index].name !== name) {
                        if (allData[index].profileKey !== "") {
                            async function asyncFunctionForImages() {
                                if (index+1 <= userLoadMax) {
                                    var displayName = allData[index].displayName
                                    if (displayName == "") {
                                        displayName = allData[index].name
                                    }
                                    const imageInPfp = await getImageWithKeyOne(allData[index].profileKey)
                                    const imageInPfpB64 = imageInPfp.data
                                    var tempSectionsTemp = {data: [{name: allData[index].name, displayName: displayName, followers: allData[index].followers, following: allData[index].following, totalLikes: allData[index].totalLikes, profileKey: imageInPfpB64}]}
                                    tempSections.push(tempSectionsTemp)
                                    itemsProcessed++;
                                    if(itemsProcessed === allData.length) {
                                        setLoadingOne(false)
                                        setChangeSections(tempSections)
                                    }
                                }
                            }
                            asyncFunctionForImages()
                        } else {
                            if (index+1 <= userLoadMax) {
                                var displayName = allData[index].displayName
                                if (displayName == "") {
                                    displayName = allData[index].name
                                }
                                var tempSectionsTemp = {data: [{name: allData[index].name, displayName: displayName, followers: allData[index].followers, following: allData[index].following, totalLikes: allData[index].totalLikes, profileKey: null}]}
                                tempSections.push(tempSectionsTemp)
                                itemsProcessed++;
                                if(itemsProcessed === allData.length) {
                                    setLoadingOne(false)
                                    setChangeSections(tempSections)
                                }
                            }
                        }
                    } else {
                        itemsProcessed++;
                        if(itemsProcessed === allData.length) {
                            setLoadingOne(false)
                            setChangeSections(tempSections)
                        } 
                    }
                });
            }

            setLoadingOne(true)
            handleMessage(null);
            const url = `https://nameless-dawn-41038.herokuapp.com/user/searchpageusersearch/${val}`;
            submitting = true;
            axios.get(url).then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS') {
                    if (message == 'No results') {
                        setNoResults(true)
                        setErrorMessage('')
                        setLoadingOne(false)
                        return
                    }
                    setErrorMessage(message);
                    setLoadingOne(false)
                    setNoResults(false)
                } else {
                    console.log(data)
                    setNoResults(false)
                    setErrorMessage('')
                    layoutUsersFound(data)
                    console.log('Search was a success')
                    //persistLogin({...data[0]}, message, status);
                }
                submitting = false;

            }).catch(error => {
                console.log(error);
                submitting = false;
                setLoadingOne(false)
                setErrorMessage("An error occured. Try checking your network connection and retry.");
                setNoResults(false)
            })
        } else {
            console.log('Empty search')
            setNoResults(false)
            setErrorMessage('')
            setChangeSections()
        }
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const handleChange = (val) => {
        if (submitting == false) {
            console.log(val)
            handleUserSearch(val)
        }
    }

    useEffect(() => {
        if (message) {
            alert(message + '. This is a temporary message while we finish coding this screen')
        }
    }, [message])

    return(
        <>    
            <StatusBar style={colors.StatusBarColor}/>
            <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                    <Image
                    source={require('../assets/app_icons/back_arrow.png')}
                    style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                    resizeMode="contain"
                    resizeMethod="resize"
                    />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>Select Recipient</TestText>
            </ChatScreen_Title>
            <SearchBarArea style={{alignSelf: 'center'}}>
                <UserTextInput
                    placeholder="Search"
                    placeholderTextColor={darkLight}
                    onChangeText={(val) => handleChange(val)}
                />
            </SearchBarArea>
            <SectionList
                sections={changeSections}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <UserItem name={item.name} displayName={item.displayName} followers={item.followers}  following={item.following} totalLikes={item.totalLikes} profileKey={item.profileKey}/>}
                ListFooterComponent={
                    loadingOne == true ? (
                        <ActivityIndicator size="large" color={brand} style={{marginBottom: 20}} />  
                    ) : errorMessage != '' ? (
                        <Text style={{color: colors.errorColor, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{errorMessage}</Text>
                    ) : noResults == true ? (
                        <Text style={{color: tertiary, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>No results</Text>
                    ) : null
                }
                style={{marginTop: -20}}
            />
        </>
    );
}

const UserTextInput = ({label, icon, isPassword, ...props}) => {
    return(
        <SearchBarArea>
            <LeftIcon searchIcon={true}>
                <Octicons name={"search"} size={20} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput searchPage={true} {...props}/>
        </SearchBarArea>
    )
}

export default ConversationDMUserFind;
