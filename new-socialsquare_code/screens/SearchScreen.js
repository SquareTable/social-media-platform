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
} from '../components/styles';

// Colors
const {brand, primary, tertiary, greyish, darkLight, slightlyLighterGrey, midWhite, red} = Colors;

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

const SearchScreen = ({navigation}) => {
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {photoUrl} = storedCredentials;
    const AvatarImg = photoUrl ? {uri: photoUrl} : require('./../assets/img/Logo.png');
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
    var userLoadMax = 10;
    let cancelTokenPostFormatOne = axios.CancelToken.source();
    let cancelTokenPostFormatTwo = axios.CancelToken.source();

    const UserItem = ({name, displayName, following, followers, totalLikes, profileKey}) => (
        <SearchFrame onPress={() => navigation.navigate("ProfilePages", {profilesName: name, profilesDisplayName: displayName, following: following, followers: followers, totalLikes: totalLikes, profileKey})}>
            {profileKey !== null && (
                <Avatar resizeMode="cover" searchPage={true} source={{uri: `data:image/jpg;base64,${profileKey}`}} />
            )}
            {profileKey == null && (
                <Avatar resizeMode="cover" searchPage={true} source={require('./../assets/img/Logo.png')} />
            )}
            <SubTitle searchResTitle={true}>{name}</SubTitle>
            <SubTitle searchResTitleDisplayName={true} style={{color: brand}}>@{displayName}</SubTitle>
            <SearchHorizontalView>
                <SearchHorizontalViewItem>
                    <SearchSubTitle welcome={true}> Following </SearchSubTitle>
                    <ProfIcons source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/273-checkmark.png')}/>
                    <SearchSubTitle welcome={true}> {following.length} </SearchSubTitle>
                </SearchHorizontalViewItem>

                <SearchHorizontalViewItemCenter>
                    <SearchSubTitle welcome={true}> Followers </SearchSubTitle>
                    <ProfIcons source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/274-checkmark2.png')}/>
                    <SearchSubTitle welcome={true}> {followers.length} </SearchSubTitle>
                </SearchHorizontalViewItemCenter>

                <SearchHorizontalViewItem>
                    <SearchSubTitle welcome={true}> Total Likes </SearchSubTitle>
                    <ProfIcons source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/273-checkmark.png')}/>
                    <SearchSubTitle welcome={true}> {totalLikes} </SearchSubTitle>
                </SearchHorizontalViewItem>
            </SearchHorizontalView>
        </SearchFrame>
    );

    const CategoryItem = ({categoryTitle, categoryDescription, members, categoryTags, image, NSFW, NSFL, datePosted}) => (
        <SearchFrame onPress={() => navigation.navigate("CategoryViewPage", {categoryTitle: categoryTitle})}>
            {image !== null && (
                <Avatar resizeMode="cover" searchPage={true} source={{uri: `data:image/jpg;base64,${image}`}} />
            )}
            {image == null && (
                <Avatar resizeMode="cover" searchPage={true} source={require('./../assets/img/Logo.png')} />
            )}
            {NSFW == false && (
                <View>
                    {NSFL == false && (
                        <SubTitle searchResTitle={true}>{categoryTitle}</SubTitle>
                    )}
                    {NSFL == true && (
                        <View style={{flexDirection: 'row'}}>
                            <SubTitle searchResTitle={true} style={{color: red}}>(NSFL) </SubTitle>
                            <SubTitle searchResTitle={true}>{categoryTitle}</SubTitle>
                        </View>
                    )}
                </View>
            )}
            {NSFW == true && (
                <View style={{flexDirection: 'row'}}>
                    <SubTitle searchResTitle={true} style={{color: red}}>(NSFW) </SubTitle>
                    <SubTitle searchResTitle={true}>{categoryTitle}</SubTitle>
                </View>
            )}
            <SubTitle searchResTitleDisplayName={true}>{categoryDescription}</SubTitle>
            <SubTitle searchResTitleDisplayName={true} style={{color: brand}}>{categoryTags}</SubTitle>
            <SearchHorizontalView>
                <SearchHorizontalViewItemCenter style={{height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                    <SearchSubTitle welcome={true} style={{flex: 1}}> Members </SearchSubTitle>
                    <ProfIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/115-users.png')}/>
                    {members == 0 && ( 
                        <SearchSubTitle welcome={true} style={{flex: 1}}> 0 </SearchSubTitle>
                    )}
                    {members !== 0 && ( 
                        <SearchSubTitle welcome={true} style={{flex: 1}}> {members} </SearchSubTitle>
                    )}
                </SearchHorizontalViewItemCenter>
                <SearchHorizontalViewItemCenter style={{height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                    <SearchSubTitle welcome={true} style={{flex: 1}}> Date Created </SearchSubTitle>
                    <ProfIcons style={{flex: 1}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/084-calendar.png')}/>
                    <SearchSubTitle welcome={true} style={{flex: 1}}> {datePosted} </SearchSubTitle>
                </SearchHorizontalViewItemCenter>
            </SearchHorizontalView>
        </SearchFrame>
    );

    //any image honestly
    async function getImageWithKeyOne(imageKey) {
        return axios.get(`https://nameless-dawn-41038.herokuapp.com/getImage/${imageKey}`, { cancelToken: cancelTokenPostFormatOne.token})
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
                                var tempSectionsTemp = {data: [{name: allData[index].name, displayName: displayName, followers: allData[index].followers, following: allData[index].following, totalLikes: allData[index].totalLikes, profileKey: imageInPfpB64}]}
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
                            var tempSectionsTemp = {data: [{name: allData[index].name, displayName: displayName, followers: allData[index].followers, following: allData[index].following, totalLikes: allData[index].totalLikes, profileKey: null}]}
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
            setChangeSectionsOne()
        }
    }

    async function getImageInCategory(imageKey) {
        return axios.get(`https://nameless-dawn-41038.herokuapp.com/getImage/${imageKey}`, { cancelToken: cancelTokenPostFormatTwo.token})
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
            const url = `https://nameless-dawn-41038.herokuapp.com/user/searchpagesearchcategories/${val}`;
            submitting = true;
            axios.get(url).then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                    setLoadingTwo(false)
                } else {
                    console.log(data)
                    layoutCategoriesFound(data)
                    handleMessage("Search Complete", "SUCCESS");
                    //persistLogin({...data[0]}, message, status);
                }
                submitting = false;

            }).catch(error => {
                console.log(error);
                submitting = false;
                setLoadingTwo(false)
                handleMessage("An error occured. Try checking your network connection and retry.");
            })
        } else {
            handleMessage("Empty search");
            setChangeSectionsTwo()
        }
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const handleChange = (val) => {
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

    return(
        <>    
            <StatusBar style="dark"/>
            <ScrollView style={{'backgroundColor': primary}}>
                <WelcomeContainer postScreen={true}>
                    <PageTitle>Search Screen</PageTitle>
                    <SubTitle>Select a format</SubTitle>
                    <SubTitle>{message}</SubTitle>
                    <SearchBarArea>
                        <UserTextInput
                            placeholder="Search"
                            placeholderTextColor={darkLight}
                            onChangeText={(val) => handleChange(val)}
                        />
                    </SearchBarArea>
                </WelcomeContainer>
                <View style={{'alignItems': 'center', flexDirection: 'row', flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                        <SubTitle style={{marginBottom: 0, fontSize: 15, fontWeight: 'normal'}}>Users</SubTitle>
                        {filterFormatSearch == "Users" && (
                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: brand, borderWidth: 3, padding: 10, backgroundColor: darkLight, alignItems: 'center', justifyContent: 'center'}}>
                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/035-file-text.png')}/>
                            </TouchableOpacity>
                        )}
                        {filterFormatSearch !== "Users" && (
                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: slightlyLighterGrey, borderWidth: 3, padding: 10, backgroundColor: darkLight, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                                cancelTokenPostFormatTwo.cancel()
                                setChangeSectionsOne()
                                setFilterFormatSearch("Users")  
                            }}>
                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/035-file-text.png')}/>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                        <SubTitle style={{marginBottom: 0, fontSize: 15, fontWeight: 'normal'}}>Categories</SubTitle>
                        {filterFormatSearch == "Categories" && (
                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: brand, borderWidth: 3, padding: 10, backgroundColor: darkLight, alignItems: 'center', justifyContent: 'center'}}>
                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/093-drawer.png')}/>
                            </TouchableOpacity>
                        )}
                        {filterFormatSearch !== "Categories" && (
                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: slightlyLighterGrey, borderWidth: 3, padding: 10, backgroundColor: darkLight, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                                cancelTokenPostFormatOne.cancel()
                                setChangeSectionsTwo()
                                setFilterFormatSearch("Categories")
                            }}>
                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/093-drawer.png')}/>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                        <SubTitle style={{marginBottom: 0, fontSize: 15, fontWeight: 'normal'}}>Images</SubTitle>
                        {filterFormatSearch == "Images" && (
                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: brand, borderWidth: 3, padding: 10, backgroundColor: darkLight, alignItems: 'center', justifyContent: 'center'}}>
                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/015-images.png')}/>
                            </TouchableOpacity>
                        )}
                        {filterFormatSearch !== "Images" && (
                            <TouchableOpacity style={{width: 50, height: 50, borderRadius: 30, borderColor: slightlyLighterGrey, borderWidth: 3, padding: 10, backgroundColor: darkLight, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                                cancelTokenPostFormatOne.cancel()
                                cancelTokenPostFormatTwo.cancel()
                                setChangeSections()
                                setFilterFormatSearch("Images")
                            }}>
                                <PostIcons style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/015-images.png')}/>
                            </TouchableOpacity>
                        )}
                    </View>
                </View> 
                {filterFormatSearch == "Users" && (
                    <View style={{'width': '100%'}}>
                        <SectionList
                            sections={changeSectionsOne}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item }) => <UserItem name={item.name} displayName={item.displayName} followers={item.followers}  following={item.following} totalLikes={item.totalLikes} profileKey={item.profileKey}/>}
                        />
                    </View>
                )}
                {filterFormatSearch == "Categories" && (
                    <View style={{'width': '100%'}}>
                        <SectionList
                            sections={changeSectionsTwo}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item }) => <CategoryItem categoryTitle={item.categoryTitle} categoryDescription={item.categoryDescription} members={item.members} categoryTags={item.categoryTags} image={item.image} NSFW={item.NSFW} NSFL={item.NSFL} datePosted={item.datePosted}/>}
                        />
                    </View>
                )}
                {filterFormatSearch == "Images" && (
                    <View style={{alignSelf: 'center', textAlign: 'center'}}>
                        <SubTitle style={{alignSelf: 'center', textAlign: 'center'}}>This feature is not out yet...</SubTitle>
                    </View>
                )}
                {filterFormatSearch == "Users" && ( 
                    <View style={{marginTop: 20}}>
                        {loadingOne == true && (
                            <ActivityIndicator size="large" color={brand} />     
                        )}
                    </View>
                )}
                {filterFormatSearch == "Categories" && ( 
                    <View style={{marginTop: 20}}>
                        {loadingTwo == true && (
                            <ActivityIndicator size="large" color={brand} />     
                        )}
                    </View>
                )}
            </ScrollView>

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

export default SearchScreen;