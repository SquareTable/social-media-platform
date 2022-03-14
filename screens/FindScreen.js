import React, {useContext, useEffect, useState, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

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
import SwitchToggle from "react-native-switch-toggle";

// Colors
const {brand, primary, tertiary, greyish, darkLight, slightlyLighterGrey, midWhite, red} = Colors;

// icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { ImageBackground, ScrollView, View, SectionList, ActivityIndicator, Text, SafeAreaView } from 'react-native';

// formik
import {Formik} from 'formik';

import background from "./../assets/img/Toga.jpg";

//axios
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useTheme } from '@react-navigation/native';
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png.js';
import { ServerUrlContext } from '../components/ServerUrlContext.js';

const FindScreen = ({navigation}) => {
    const {colors, dark} = useTheme();
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const [filterFormatSearch, setFilterFormatSearch] = useState("Users")
    var submitting = false;
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [foundAmount, setFoundAmount] = useState();
    const [debounce, setDebounce] = useState(false);
    const [changeSections, setChangeSections] = useState()
    const [changeSectionsOne, setChangeSectionsOne] = useState()
    const [changeSectionsTwo, setChangeSectionsTwo] = useState()
    const [loadingOne, setLoadingOne] = useState(false)
    const [loadingTwo, setLoadingTwo] = useState(false)
    const [noResults, setNoResults] = useState(false);
    const searchValue = useRef(null);
    var userLoadMax = 10;
    let cancelTokenPostFormatOne = axios.CancelToken.source();
    let cancelTokenPostFormatTwo = axios.CancelToken.source();
    const {serverUrl, setServerurl} = useContext(ServerUrlContext);
    const StatusBarHeight = Constants.statusBarHeight;
    const UserItem = ({name, displayName, following, followers, totalLikes, profileKey, badges, index}) => (
        /* OLD DESIGN
            <SearchFrame onPress={() => navigation.navigate("ProfilePages", {profilesName: name, profilesDisplayName: displayName, following: following, followers: followers, totalLikes: totalLikes, profileKey: profileKey != null ? `data:image/jpg;base64,${profileKey}` : SocialSquareLogo_B64_png, badges: badges})}>
                {profileKey !== null && (
                    <Avatar resizeMode="cover" searchPage={true} source={{uri: `data:image/jpg;base64,${profileKey}`}} />
                )}
                {profileKey == null && (
                    <Avatar resizeMode="cover" searchPage={true} source={require('./../assets/img/Logo.png')} />
                )}
                <SubTitle style={{color: colors.tertiary}} searchResTitle={true}>{name}</SubTitle>
                <SubTitle searchResTitleDisplayName={true} style={{color: brand}}>@{displayName}</SubTitle>
                <SearchHorizontalView>
                    <SearchHorizontalViewItem>
                        <SearchSubTitle style={{color: colors.tertiary}} welcome={true}> Following </SearchSubTitle>
                        <ProfIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/273-checkmark.png')}/>
                        <SearchSubTitle style={{color: colors.tertiary}} welcome={true}> {following.length} </SearchSubTitle>
                    </SearchHorizontalViewItem>

                    <SearchHorizontalViewItemCenter>
                        <SearchSubTitle style={{color: colors.tertiary}} welcome={true}> Followers </SearchSubTitle>
                        <ProfIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/274-checkmark2.png')}/>
                        <SearchSubTitle style={{color: colors.tertiary}} welcome={true}> {followers.length} </SearchSubTitle>
                    </SearchHorizontalViewItemCenter>

                    <SearchHorizontalViewItem>
                        <SearchSubTitle style={{color: colors.tertiary}} welcome={true}> Total Likes </SearchSubTitle>
                        <ProfIcons style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/273-checkmark.png')}/>
                        <SearchSubTitle style={{color: colors.tertiary}} welcome={true}> {totalLikes} </SearchSubTitle>
                    </SearchHorizontalViewItem>
                </SearchHorizontalView>
            </SearchFrame>
        */
            <TouchableOpacity onPress={() => navigation.navigate("ProfilePages", {profilesName: name, profilesDisplayName: displayName, following: following, followers: followers, totalLikes: totalLikes, profileKey: profileKey != null ? `data:image/jpg;base64,${profileKey}` : SocialSquareLogo_B64_png, badges: badges})} style={{borderColor: colors.darkLight, flexDirection: 'row', width: '100%', padding: 5}}>
                <View style={{alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                    {profileKey !== null && (
                        <Avatar style={{width: 60, height: 60, marginBottom: 5, marginTop: 5}} resizeMode="cover" searchPage={true} source={{uri: `data:image/jpg;base64,${profileKey}`}} />
                    )}
                    {profileKey == null && (
                        <Avatar style={{width: 60, height: 60, marginBottom: 5, marginTop: 5}} resizeMode="cover" searchPage={true} source={{uri: SocialSquareLogo_B64_png}} />
                    )}
                    <SubTitle style={{color: colors.tertiary, marginTop: 24, marginLeft: 10}} searchResTitle={true}>{name}</SubTitle>
                </View>
            </TouchableOpacity>
    );

    const CategoryItem = ({categoryTitle, categoryDescription, members, categoryTags, image, NSFW, NSFL, datePosted}) => (
        <SearchFrame onPress={() => navigation.navigate("CategoryViewPage", {categoryTitle: categoryTitle})}>
            {image !== null && (
                <Avatar resizeMode="cover" searchPage={true} source={{uri: `data:image/jpg;base64,${image}`}} />
            )}
            {image == null && (
                <Avatar resizeMode="cover" searchPage={true} source={{uri: SocialSquareLogo_B64_png}} />
            )}
            {NSFW == false && (
                <View>
                    {NSFL == false && (
                        <SubTitle style={{color: colors.tertiary}} searchResTitle={true}>{categoryTitle}</SubTitle>
                    )}
                    {NSFL == true && (
                        <View style={{flexDirection: 'row'}}>
                            <SubTitle searchResTitle={true} style={{color: red}}>(NSFL) </SubTitle>
                            <SubTitle style={{color: colors.tertiary}} searchResTitle={true}>{categoryTitle}</SubTitle>
                        </View>
                    )}
                </View>
            )}
            {NSFW == true && (
                <View style={{flexDirection: 'row'}}>
                    <SubTitle searchResTitle={true} style={{color: red}}>(NSFW) </SubTitle>
                    <SubTitle style={{color: colors.tertiary}} searchResTitle={true}>{categoryTitle}</SubTitle>
                </View>
            )}
            <SubTitle style={{color: colors.tertiary, textAlign: 'center'}} searchResTitleDisplayName={true}>{categoryDescription}</SubTitle>
            <SubTitle searchResTitleDisplayName={true} style={{color: brand}}>{categoryTags}</SubTitle>
            <SearchHorizontalView>
                <SearchHorizontalViewItemCenter style={{height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                    <SearchSubTitle welcome={true} style={{flex: 1, color: colors.tertiary}}> Members </SearchSubTitle>
                    <ProfIcons style={{flex: 1, tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/115-users.png')}/>
                    {members == 0 && ( 
                        <SearchSubTitle welcome={true} style={{flex: 1, color: colors.tertiary}}> 0 </SearchSubTitle>
                    )}
                    {members !== 0 && ( 
                        <SearchSubTitle welcome={true} style={{flex: 1, color: colors.tertiary}}> {members} </SearchSubTitle>
                    )}
                </SearchHorizontalViewItemCenter>
                <SearchHorizontalViewItemCenter style={{height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                    <SearchSubTitle welcome={true} style={{flex: 1, color: colors.tertiary}}> Date Created </SearchSubTitle>
                    <ProfIcons style={{flex: 1, tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/084-calendar.png')}/>
                    <SearchSubTitle welcome={true} style={{flex: 1, color: colors.tertiary}}> {datePosted} </SearchSubTitle>
                </SearchHorizontalViewItemCenter>
            </SearchHorizontalView>
        </SearchFrame>
    );

    //any image honestly
    async function getImageWithKeyOne(imageKey) {
        return axios.get((serverUrl + '/getImage/' + imageKey), { cancelToken: cancelTokenPostFormatOne.token})
        .then(res => res.data).catch(error => {
            console.log(error);
            //setSubmitting(false);
            console.log("Either an error or cancelled.");
        })
    }

    const handleUserSearch = (val) => {
        setChangeSectionsOne()
        if (val !== "") {
            const layoutUsersFound = (data) => {
                setFoundAmount("Poll Comments:")
                var allData = data
                console.log(allData)
                console.log(allData.length)
                var tempSections = []
                var itemsProcessed = 0;
                allData.forEach(function (item, index) {
                    if (allData[index].profileKey !== "") {
                        async function asyncFunctionForImages() {
                            if (index+1 <= userLoadMax) {
                                var displayName = allData[index].displayName
                                if (displayName == "") {
                                    displayName = allData[index].name
                                }
                                const imageInPfp = await getImageWithKeyOne(allData[index].profileKey)
                                const imageInPfpB64 = imageInPfp.data
                                var tempSectionsTemp = {data: [{name: allData[index].name, displayName: displayName, followers: allData[index].followers, following: allData[index].following, totalLikes: allData[index].totalLikes, profileKey: imageInPfpB64, badges: allData[index].badges}]}
                                tempSections.push(tempSectionsTemp)
                                itemsProcessed++;
                                if(itemsProcessed === allData.length) {
                                    setLoadingOne(false)
                                    setChangeSectionsOne(tempSections)
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
                            var tempSectionsTemp = {data: [{name: allData[index].name, displayName: displayName, followers: allData[index].followers, following: allData[index].following, totalLikes: allData[index].totalLikes, profileKey: null, badges: allData[index].badges}]}
                            tempSections.push(tempSectionsTemp)
                            itemsProcessed++;
                            if(itemsProcessed === allData.length) {
                                setLoadingOne(false)
                                setChangeSectionsOne(tempSections)
                            }
                        }
                    }
                });
            }

            setLoadingOne(true)
            handleMessage(null);
            const url = serverUrl + '/user/searchpageusersearch/' + val;
            submitting = true;
            axios.get(url).then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS') {
                    if (message === 'No results') {
                        setNoResults(true)
                        setLoadingOne(false)
                        return
                    }
                    handleMessage(message, status);
                    setLoadingOne(false)
                    setNoResults(false)
                } else {
                    console.log(data)
                    layoutUsersFound(data)
                    console.log('Search complete.')
                    setNoResults(false)
                    //persistLogin({...data[0]}, message, status);
                }
                submitting = false;

            }).catch(error => {
                console.log(error);
                submitting = false;
                setLoadingOne(false)
                handleMessage("An error occured. Try checking your network connection and retry.");
                setNoResults(false)
            })
        } else {
            console.log('Empty search')
            setNoResults(false)
            setChangeSectionsOne()
        }
    }

    async function getImageInCategory(imageKey) {
        return axios.get((serverUrl + '/getImage/' + imageKey), { cancelToken: cancelTokenPostFormatTwo.token})
        .then(res => res.data);
    }

    const handleCategorySearch = (val) => {
        if (val !== "") {
            setChangeSectionsTwo()
            const layoutCategoriesFound = (data) => {
                setFoundAmount("Poll Comments:")
                var allData = data
                console.log(allData)
                console.log(allData.length)
                var tempSections = []
                var itemsProcessed = 0;
                allData.forEach(function (item, index) {
                    if (allData[index].imageKey !== "") {
                        if (index+1 <= userLoadMax) {      
                            async function asyncFunctionForImages() {
                                const imageInCategory = await getImageInCategory(allData[index].imageKey)
                                const imageB64 = imageInCategory.data
                                var tempSectionsTemp = {data: [{categoryTitle: allData[index].categoryTitle, categoryDescription: allData[index].categoryDescription, members: allData[index].members, categoryTags: allData[index].categoryTags, image: imageB64, NSFW: allData[index].NSFW, NSFL: allData[index].NSFL, datePosted: allData[index].datePosted}]}
                                tempSections.push(tempSectionsTemp)
                                itemsProcessed++;
                                if(itemsProcessed === allData.length) {
                                    setChangeSectionsTwo(tempSections)
                                    setLoadingTwo(false)
                                }
                            }
                            asyncFunctionForImages()
                        }
                    } else {
                        if (index+1 <= userLoadMax) {      
                            var tempSectionsTemp = {data: [{categoryTitle: allData[index].categoryTitle, categoryDescription: allData[index].categoryDescription, members: allData[index].members, categoryTags: allData[index].categoryTags, image: null, NSFW: allData[index].NSFW, NSFL: allData[index].NSFL, datePosted: allData[index].datePosted}]}
                            tempSections.push(tempSectionsTemp)
                            itemsProcessed++;
                            if(itemsProcessed === allData.length) {
                                setChangeSectionsTwo(tempSections)
                                setLoadingTwo(false)
                            }
                        }
                    }
                });
            }

            setLoadingTwo(true)
            handleMessage(null);
            const url = serverUrl + '/user/searchpagesearchcategories/' + val
            submitting = true;
            axios.get(url).then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS') {
                    if (message === 'No results') {
                        setNoResults(true)
                        setLoadingTwo(false)
                        return
                    }
                    handleMessage(message, status);
                    setLoadingTwo(false)
                    setNoResults(false)
                } else {
                    console.log(data)
                    setNoResults(false)
                    layoutCategoriesFound(data)
                    console.log('Category search was a success')
                    //persistLogin({...data[0]}, message, status);
                }
                submitting = false;

            }).catch(error => {
                console.log(error);
                submitting = false;
                setLoadingTwo(false)
                setNoResults(false)
                handleMessage("An error occured. Try checking your network connection and retry.");
            })
        } else {
            console.log('Empty category search')
            setNoResults(false)
            setChangeSectionsTwo()
        }
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const handleChange = (val) => {
        searchValue.current = val;
        if (submitting == false) {
            if (filterFormatSearch == "Users") {
                console.log(val)
                handleUserSearch(val)
            } else if (filterFormatSearch == "Categories") {
                console.log(val)
                handleCategorySearch(val)
            } 
        }
    }

    useEffect(() => {
        if (message) {
            alert(message + '. This message is only being shown while we transition SocialSquare over to the new design. Once we have fully transitioned this alert will go away.');
        }
    }, [message])

    useEffect(() => {
        if (searchValue.current !== "" && searchValue.current !== null) {
            setNoResults(false)
            if (filterFormatSearch == "Users") {
                handleUserSearch(searchValue.current)
            } else if (filterFormatSearch == "Categories") {
                handleCategorySearch(searchValue.current)
            }
        }
    }, [filterFormatSearch])
    return(
        <>    
            <StatusBar style={colors.StatusBarColor}/>
            <View style={{paddingTop: StatusBarHeight - 15, borderColor: colors.borderColor, borderBottomWidth: 1, paddingBottom: 5}}>
                <SearchBarArea style={{alignSelf: 'center'}}>
                    <UserTextInput
                        placeholder="Search"
                        placeholderTextColor={darkLight}
                        onChangeText={(val) => handleChange(val)}
                        colors={colors}
                    />
                </SearchBarArea>
                <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', marginTop: -20}}>
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <SubTitle style={{marginBottom: 0, fontSize: 15, fontWeight: 'normal', color: colors.tertiary}}>Users</SubTitle>
                        {filterFormatSearch == "Users" && (
                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: brand, borderWidth: 3, padding: 10, backgroundColor: dark? darkLight : colors.borderColor, alignItems: 'center', justifyContent: 'center'}}>
                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/035-file-text.png')}/>
                            </TouchableOpacity>
                        )}
                        {filterFormatSearch !== "Users" && (
                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: slightlyLighterGrey, borderWidth: 3, padding: 10, backgroundColor: dark? darkLight : colors.borderColor, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                                cancelTokenPostFormatTwo.cancel()
                                setChangeSectionsOne()
                                setFilterFormatSearch("Users")  
                            }}>
                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/035-file-text.png')}/>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <SubTitle style={{marginBottom: 0, fontSize: 15, fontWeight: 'normal', color: colors.tertiary}}>Categories</SubTitle>
                        {filterFormatSearch == "Categories" && (
                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: brand, borderWidth: 3, padding: 10, backgroundColor: dark? darkLight : colors.borderColor, alignItems: 'center', justifyContent: 'center'}}>
                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/093-drawer.png')}/>
                            </TouchableOpacity>
                        )}
                        {filterFormatSearch !== "Categories" && (
                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: slightlyLighterGrey, borderWidth: 3, padding: 10, backgroundColor: dark? darkLight : colors.borderColor, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                                cancelTokenPostFormatOne.cancel()
                                setChangeSectionsTwo()
                                setFilterFormatSearch("Categories")
                            }}>
                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/093-drawer.png')}/>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <SubTitle style={{marginBottom: 0, fontSize: 15, fontWeight: 'normal', color: colors.tertiary}}>Images</SubTitle>
                        {filterFormatSearch == "Images" && (
                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: brand, borderWidth: 3, padding: 10, backgroundColor: dark? darkLight : colors.borderColor, alignItems: 'center', justifyContent: 'center'}}>
                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/015-images.png')}/>
                            </TouchableOpacity>
                        )}
                        {filterFormatSearch !== "Images" && (
                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: slightlyLighterGrey, borderWidth: 3, padding: 10, backgroundColor: dark? darkLight : colors.borderColor, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                                //cancelTokenPostFormatOne.cancel()
                                //cancelTokenPostFormatTwo.cancel()
                                //setChangeSections()
                                //setFilterFormatSearch("Images")
                                alert('This feature is coming soon')
                            }}>
                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/015-images.png')}/>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
            {filterFormatSearch == "Users" && (
                <SectionList
                    sections={changeSectionsOne}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }) => <UserItem name={item.name} displayName={item.displayName} followers={item.followers}  following={item.following} totalLikes={item.totalLikes} profileKey={item.profileKey} badges={item.badges} index={index}/>}
                    ListFooterComponent={
                        <>
                            <View style={{marginTop: 20}}>
                                {loadingOne == true && (
                                    <ActivityIndicator size="large" color={brand} />     
                                )}
                            </View>
                        </>
                    }
                    ListHeaderComponent={
                        <>
                            {noResults == true && (
                                <View style={{marginTop: 20}}>
                                    <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.tertiary, textAlign: 'center'}}>No results found</Text>
                                </View>
                            )}
                        </>
                    }
                />
            )}
            {filterFormatSearch == "Categories" && (
                <SectionList
                    sections={changeSectionsTwo}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <CategoryItem categoryTitle={item.categoryTitle} categoryDescription={item.categoryDescription} members={item.members} categoryTags={item.categoryTags} image={item.image} NSFW={item.NSFW} NSFL={item.NSFL} datePosted={item.datePosted}/>}
                    ListFooterComponent={
                        <>
                            <View style={{marginTop: 20}}>
                                {loadingTwo == true && (
                                    <ActivityIndicator size="large" color={brand} />     
                                )}
                            </View>
                        </>
                    }
                    ListHeaderComponent={
                        <>
                            {noResults == true && (
                                <View style={{marginTop: 20}}>
                                    <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.tertiary, textAlign: 'center'}}>No results found</Text>
                                </View>
                            )}
                        </>
                    }
                />
            )}
            {filterFormatSearch == "Images" && (
                <View style={{alignSelf: 'center', textAlign: 'center'}}>
                    <SubTitle style={{alignSelf: 'center', textAlign: 'center', color: colors.tertiary}}>This feature is not out yet...</SubTitle>
                </View>
            )}
        </>
    );
}

const UserTextInput = ({label, icon, isPassword, colors, ...props}) => {
    return(
        <SearchBarArea>
            <LeftIcon searchIcon={true}>
                <Octicons name={"search"} size={20} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput style={{backgroundColor: colors.primary, color: colors.tertiary, borderColor: colors.borderColor}} searchPage={true} {...props}/>
        </SearchBarArea>
    )
}

export default FindScreen;