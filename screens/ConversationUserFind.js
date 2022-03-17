import React, {useContext, useState} from 'react';
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
    PostIcons
} from './screenStylings/styling.js';

// Colors
const {brand, primary, tertiary, greyish, darkLight, slightlyLighterGrey, midWhite, red, darkest} = Colors;

// icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { ImageBackground, ScrollView, View, SectionList, ActivityIndicator } from 'react-native';

// formik
import {Formik} from 'formik';

import background from "./../assets/img/Toga.jpg";

//axios
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png.js';

const ConversationUserFind = ({route, navigation}) => {
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {photoUrl, name} = storedCredentials;
    const {conversationTitle, conversationDescription, initialUsers, conversationNSFW, conversationNSFL} = route.params;
    const AvatarImg = photoUrl ? {uri: photoUrl} : require('./../assets/img/Logo.png');
    var submitting = false;
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [foundAmount, setFoundAmount] = useState();
    const [debounce, setDebounce] = useState(false);
    const [changeSections, setChangeSections] = useState()
    const [loadingOne, setLoadingOne] = useState()
    const [conversationMembersSections, setConversationMembersSections] = useState(null)
    const [conversationMembers, setConversationMembers] = useState(null)
    const [initialUsersState, setInitialUsersState] = useState(null)
    const [lastSearch, setLastSearch] = useState(null)
    var userLoadMax = 10;

    if (initialUsersState == null) {
        setInitialUsersState(initialUsers)
    } else {
        if (initialUsers !== initialUsersState) {
            console.log("Not same users")
            setConversationMembers()
            setConversationMembers(null)
            setConversationMembersSections()
            setConversationMembersSections(null)
        } else {
            console.log("Same Users")
        }
    }

    if (conversationMembersSections == null) {
        console.log("Test")
        console.log("Initial Users:")
        console.log(initialUsers)
        console.log(initialUsers.length)
        setConversationMembersSections([])
        if (initialUsers.length !== 0) {
            var tempSections = []
            var itemsProcessed = 0;
            initialUsers.forEach(function (item, index) {
                tempSections.push({data: [{name: initialUsers[index]}]})
                itemsProcessed++;
                if (itemsProcessed == initialUsers.length) {
                    setConversationMembersSections(tempSections)
                }
            })
        } else {
            console.log("This")
            setConversationMembersSections([])
        }
    }

    if (conversationMembers == null) {
        if (initialUsers.length !== 0) {
            setConversationMembers([])
            console.log("Adding initial users to conversationMembers")
            setConversationMembers(initialUsers)
        } else {
            console.log("Didn't add initial users to conversationMembers")
            setConversationMembers([])
        }
    }

    const addMember = (addedMembersName) => {
        var forSet = conversationMembersSections
        var forSetTwo = conversationMembers
        if (forSet !== null) {
            if (forSetTwo !== null) {
                if (forSetTwo.length+1 <= 14) {
                    var forSetUserSearch = changeSections
                    console.log(addedMembersName)
                    console.log(changeSections)
                    async function forAsync() {
                        var spliceFromSearchIndex = await forSetUserSearch.findIndex(x => x.data[0].name === addedMembersName);
                        if (spliceFromSearchIndex > -1) {
                            forSetUserSearch.splice(spliceFromSearchIndex, 1);
                            setChangeSections([])
                            setChangeSections(forSetUserSearch)
                            forSet.push({data: [{name: addedMembersName}]})
                            setConversationMembersSections([])
                            setConversationMembersSections(forSet)
                            forSetTwo.push(addedMembersName)
                            setConversationMembers([])
                            setConversationMembers(forSetTwo)
                            console.log(forSet)
                            setMessage("Member Added")
                        } else {
                            setMessage("Couldn't Get Member.")
                        }
                    }
                    forAsync()
                } else {
                    setMessage("Reached Max")
                }
            } else {
                setMessage("Page Was Not Loaded, Try Again.")
            }
        } else {
            setMessage("Page Was Not Loaded, Try Again.")
        }
    }

    const removeMember = (memberForRemoval) => {
        var forSet = conversationMembersSections
        console.log(forSet)
        var forSetTwo = conversationMembers
        if (forSet !== null) {
            if (forSetTwo !== null) {
                async function forAsync() {
                    var indexOfMemberFS = await forSet.findIndex(x => x.data[0].name === memberForRemoval);
                    var indexOfMemberFSTwo = await forSetTwo.indexOf(memberForRemoval);
                    if (indexOfMemberFS > -1) {
                        forSet.splice(indexOfMemberFS, 1);
                        setConversationMembersSections([])
                        setConversationMembersSections(forSet)
                        if (indexOfMemberFSTwo > -1) {
                            forSetTwo.splice(indexOfMemberFSTwo, 1);
                            setConversationMembers([])
                            setConversationMembers(forSetTwo)
                            if (lastSearch !== null) {
                                handleUserSearch(lastSearch)
                            }
                        } else {
                            setMessage("2: Couldn't Get Member.")
                        }
                    } else {
                        setMessage("1: Couldn't Get Member.")
                    }
                }
                forAsync()
            } else {
                setMessage("Page Was Not Loaded, Try Again.")
            }
        } else {
            setMessage("Page Was Not Loaded, Try Again.")
        }
    }

    const MemberItem = ({name}) => (
        <View>
            <View style={{backgroundColor: darkest, borderRadius: 300, flexDirection: 'row', textAlign: 'center', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, marginRight: 5}}>
                <TouchableOpacity onPress={() => {removeMember(name)}}>
                    <SubTitle style={{fontWeight: 'normal', marginBottom: 0, fontSize: 12, marginRight: 5, aspectRatio: 1/1, borderRadius: 300, backgroundColor: darkLight, textAlign: 'center', alignSelf: 'center'}}>X</SubTitle>
                </TouchableOpacity>
                <SubTitle style={{marginBottom: 0}}>{name}</SubTitle>
            </View>
        </View>
    );

    const UserItem = ({name, displayName, following, followers, totalLikes, profileKey}) => (
        <SearchFrame onPress={() => {addMember(name)}}>
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
                        if (conversationMembers.includes(allData[index].name)) {
                            console.log("User in conversation found")
                            itemsProcessed++;
                            if(itemsProcessed === allData.length) {
                                setLoadingOne(false)
                                setChangeSections(tempSections)
                            }
                        } else {
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
                    handleMessage(message, status);
                    setLoadingOne(false)
                } else {
                    console.log(data)
                    layoutUsersFound(data)
                    setLastSearch(val)
                    handleMessage("Search Complete", "SUCCESS");
                    //persistLogin({...data[0]}, message, status);
                }
                submitting = false;

            }).catch(error => {
                console.log(error);
                submitting = false;
                setLoadingOne(false)
                handleMessage("An error occured. Try checking your network connection and retry.");
            })
        } else {
            handleMessage("Empty search");
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

    return(
        <>    
            <StatusBar style="dark"/>
            <ScrollView style={{'backgroundColor': primary}}>
                <WelcomeContainer postScreen={true}>
                    <PageTitle>Select Users</PageTitle>
                    <SubTitle>{message}</SubTitle>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 10}}>
                        <PostIcons tintColor={brand} style={{width: 30, height: 30}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/114-user.png')}/>
                        {conversationMembers !== null && (
                            <SubTitle style={{marginBottom: 0, fontWeight: 'normal'}}>{conversationMembers.length + 1}/14</SubTitle>
                        )}
                        {conversationMembers == null && (
                            <SubTitle style={{marginBottom: 0, fontWeight: 'normal'}}>Loading</SubTitle>
                        )}
                    </View>
                    <View style={{width: '90%', padding: 10, borderTopWidth: 3, borderBottomWidth: 3, borderColor: slightlyLighterGrey, alignSelf: 'center', marginTop: 10}}>
                        <SectionList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            sections={conversationMembersSections}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item }) => <MemberItem name={item.name}/>}
                        />
                    </View>
                    <SearchBarArea>
                        <UserTextInput
                            placeholder="Search"
                            placeholderTextColor={darkLight}
                            onChangeText={(val) => handleChange(val)}
                        />
                    </SearchBarArea>
                </WelcomeContainer>
                <View style={{'width': '100%'}}>
                    <SectionList
                        sections={changeSections}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => <UserItem name={item.name} displayName={item.displayName} followers={item.followers}  following={item.following} totalLikes={item.totalLikes} profileKey={item.profileKey}/>}
                    />
                </View>
                {loadingOne == true && (
                    <ActivityIndicator size="large" color={brand} style={{marginBottom: 20}} />  
                )}
            </ScrollView>
            <StyledButton signUpButton={true} style={{position: 'absolute', width: '80%', alignSelf: 'center', bottom: 20}} onPress={() => {navigation.navigate("CreateConversation", {conversationTitle: conversationTitle, conversationDescription: conversationDescription, sentConversationMembers: conversationMembers, sentConversationNSFW: conversationNSFW, sentConversationNSFL: conversationNSFL})}}>
                    <ButtonText signUpButton={true}>Confirm</ButtonText>
            </StyledButton>
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

export default ConversationUserFind;
