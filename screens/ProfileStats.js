import React, {useContext, useEffect, memo, useState, useRef} from 'react';
import { useTheme } from '@react-navigation/native';
import {View, SafeAreaView, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, Animated} from 'react-native';
import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
    SubTitle,
    ReportProfileOptionsView,
    ReportProfileOptionsViewButtons,
    ReportProfileOptionsViewButtonsText,
    ReportProfileOptionsViewSubtitleText,
    ReportProfileOptionsViewText
} from './screenStylings/styling.js';
import { CredentialsContext } from '../components/CredentialsContext.js';
import axios from 'axios';
import { ServerUrlContext } from '../components/ServerUrlContext.js';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png.js';
import ActionSheet from 'react-native-actionsheet';
import { AllCredentialsStoredContext } from '../components/AllCredentialsStoredContext.js';

let arrayOfUserChanges = [];
let userIDToUnfollow = undefined;

const ProfileStats = ({navigation, route}) => {
    const {colors, dark} = useTheme()
    const {followers, type} = route.params;
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {name: username, displayName, _id} = storedCredentials;
    const name = displayName || username
    const userLoadMax = 10;
    const [listItems, setListItems] = useState([])
    const {serverUrl, setServerUrl} = useContext(ServerUrlContext);
    const [noMoreItems, setNoMoreItems] = useState(false);
    const UnfollowPrivateAccountConfirmationPickerMenu = useRef(null)
    const {allCredentialsStoredList, setAllCredentialsStoredList} = useContext(AllCredentialsStoredContext);
    const [updateFlatList, setUpdateFlatList] = useState(false);
    const [userOnThreeDotsMenu, setUserOnThreeDotsMenu] = useState(null);
    const [removingAFollower, setRemovingAFollower] = useState(false);
    const [blockingUser, setBlockingUser] = useState(false);
    const showUserBlockedConfirmation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        arrayOfUserChanges = [];
        userIDToUnfollow = undefined;
    }, []);

    async function loadItems() {
        if (noMoreItems == false) {
            let toAddToList = [];
            for (let i = 0; i < userLoadMax; i++) {
                if ((listItems.length + i) < followers.length) {
                    let url = serverUrl + '/user/getuserbyid/' + followers[(listItems.length + i)];
                    try {
                        const response = await axios.get(url);
                        const result = response.data;
                        const {message, status, data} = result;

                        if (status !== 'SUCCESS') {
                            console.log(message);
                            toAddToList.push({status: 'FAILED'});
                        } else {
                            let dataToUse = data;
                            if (type == 'Following') {
                                dataToUse.following = true;
                            }
                            console.log(data)
                            if (data.profileImageKey && data.profileImageKey !== '') {
                                let getImageUrl = serverUrl + '/getImageOnServer/' + data.profileImageKey
                                try {
                                    const imageResponse = await axios.get(getImageUrl);

                                    if (imageResponse.data) {
                                        dataToUse.profileImageB64 = 'data:image/jpeg;base64,' + imageResponse.data;
                                    } else {
                                        console.log(imageMessage);
                                        dataToUse.profileImageB64 = SocialSquareLogo_B64_png;
                                    }
                                } catch (e) {
                                    console.log(e)
                                    dataToUse.profileImageB64 = SocialSquareLogo_B64_png
                                }
                            } else {
                                dataToUse.profileImageB64 = SocialSquareLogo_B64_png
                            }
                            dataToUse.status = 'SUCCESS';
                            toAddToList.push(dataToUse);
                        }
                    } catch (e) {
                        console.log(e)
                        toAddToList.push({status: 'FAILED'});
                    }
                    console.log(toAddToList.length)
                    console.log('Items loaded: ' + (listItems.length + i))
                } else {
                    setNoMoreItems(true);
                    break;
                }
            }
            console.log(toAddToList);
            setListItems(listItems => [...listItems, ...toAddToList]);
        }
    }

    useEffect(() => {
        loadItems()
    }, [])

    useEffect(() =>
        navigation.addListener('beforeRemove', (e) => {
            console.log('Running beforeRemove listener code')
            if (arrayOfUserChanges.length < 1) {
                // If we don't have unsaved changes, then we don't need to do anything
                console.log('Returning as the changes array length is: ' + arrayOfUserChanges.length)
                return;
            }

            console.log('Saving changes')
            console.log(arrayOfUserChanges.length)

            if (type == 'Following') {
                setAllCredentialsStoredList(allCredentialsStoredList => {
                    console.log('Index is: ' + storedCredentials.indexLength)
                    allCredentialsStoredList[storedCredentials.indexLength].following = allCredentialsStoredList[storedCredentials.indexLength].following.filter(user => arrayOfUserChanges.includes(user) == false)
                    return allCredentialsStoredList;
                });
                setStoredCredentials(storedCredentials => {
                    storedCredentials.following = storedCredentials.following.filter(user => arrayOfUserChanges.includes(user) == false)
                    return storedCredentials;
                });
            } else if (type == 'Followers'){
                //Type is Followers
                setAllCredentialsStoredList(allCredentialsStoredList => {
                    console.log('Index is: ' + storedCredentials.indexLength)
                    allCredentialsStoredList[storedCredentials.indexLength].followers = allCredentialsStoredList[storedCredentials.indexLength].followers.filter(user => arrayOfUserChanges.includes(user) == false)
                    return allCredentialsStoredList;
                });
                setStoredCredentials(storedCredentials => {
                    storedCredentials.followers = storedCredentials.followers.filter(user => arrayOfUserChanges.includes(user) == false)
                    return storedCredentials;
                });
            } else {
                alert('An error occured.')
            }


        }), [navigation]);

    const Item = ({item, index}) => {
        if (type == 'Followers') {
            return <ProfileStats_FollowersItem item={item} index={index} setUserOnThreeDotsMenu={setUserOnThreeDotsMenu} userOnThreeDotsMenu={userOnThreeDotsMenu}/>
        } else {
            return <ProfileStats_FollowingItem item={item} index={index} setListItems={setListItems} UnfollowPrivateAccountConfirmationPickerMenu={UnfollowPrivateAccountConfirmationPickerMenu}/>
        }
    }

    const MemoizedItem = memo(Item);

    const removeFollower = async (userPubIdToRemove) => {
        if (userPubIdToRemove == null) {
            alert('An error occured.')
            return
        }
        setRemovingAFollower(true)
        console.log('Removing follower: ' + userPubIdToRemove)
        
        
        const url = serverUrl + '/user/removefollowerfromaccount';
        const toSend = {userID: _id, userToRemovePubId: userPubIdToRemove};
        try {
            const response = await axios.post(url, toSend);
            const result = response.data;
            const {message, status} = result;

            if (status !== 'SUCCESS') {
                console.log(message);
                alert('An error occured. Please try again.')
                setRemovingAFollower(false)
            } else {
                arrayOfUserChanges.push(userPubIdToRemove);
                console.log('Successfully removed follower')
                setRemovingAFollower(false)
                setListItems(listItems => listItems.filter(user => user.pubId !== userPubIdToRemove))
                navigation.setParams({followers: followers.filter(user => user !== userPubIdToRemove)})
                setUpdateFlatList(!updateFlatList)
                setUserOnThreeDotsMenu(null)
            }
        } catch (e) {
            console.log(e)
            alert('An error occured. Please try again.')
            setRemovingAFollower(false)
        }
    }

    const blockUser = async (userPubIdToBlock) => {
        if (userPubIdToBlock == null) {
            alert('An error occured.')
            return
        }
        setBlockingUser(true)
        console.log('Blocking user: ' + userPubIdToBlock)

        const url = serverUrl + '/user/blockaccount';
        const toSend = {userID: _id, userToBlockPubId: userPubIdToBlock};
        try {
            const response = await axios.post(url, toSend);
            const result = response.data;
            const {message, status} = result;

            if (status !== 'SUCCESS') {
                console.log(message);
                alert('An error occured. Please try again.')
                setBlockingUser(false)
            } else {
                arrayOfUserChanges.push(userPubIdToBlock);
                console.log('Successfully blocked user')
                setBlockingUser(false)
                setListItems(listItems => listItems.filter(user => user.pubId !== userPubIdToBlock))
                navigation.setParams({followers: followers.filter(user => user !== userPubIdToBlock)})
                setUpdateFlatList(!updateFlatList)
                setUserOnThreeDotsMenu(null)
                showUserBlockedConfirmation.setValue(1);
                setTimeout(() => {
                    showUserBlockedConfirmation.setValue(0);
                }, 2000);
            }
        } catch (e) {
            console.log(e)
            alert('An error occured. Please try again.')
            setBlockingUser(false)
        }
    }
    return(
        <>
            <Animated.View pointerEvents="box-none" style={{opacity: showUserBlockedConfirmation, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', zIndex: 100}}>
                <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 10, paddingVertical: 15, paddingHorizontal: 10}}>
                    <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>User blocked</Text>
                </View>
            </Animated.View>
            <ReportProfileOptionsView style={{backgroundColor: colors.primary, height: 400}} viewHidden={userOnThreeDotsMenu != null ? false : true}>
                <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{userOnThreeDotsMenu == null ? null : userOnThreeDotsMenu.name}</ReportProfileOptionsViewText>
                <ReportProfileOptionsViewButtons greyButton={true} onPress={() => {setUserOnThreeDotsMenu(null)}}>
                    <ReportProfileOptionsViewButtonsText greyButton={true}>Cancel</ReportProfileOptionsViewButtonsText>
                </ReportProfileOptionsViewButtons>
                {removingAFollower == false ?
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {removeFollower(userOnThreeDotsMenu == null ? null : userOnThreeDotsMenu.pubId)}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Remove Follower</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                :
                    <ActivityIndicator color={colors.brand} size="large" style={{marginTop: 24, marginBottom: 15}}/>
                }
                {blockingUser == false ?
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {blockUser(userOnThreeDotsMenu == null ? null : userOnThreeDotsMenu.pubId)}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Block</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                :
                    <ActivityIndicator color={colors.brand} size="large" style={{marginTop: 24, marginBottom: 15}}/>
                }
                <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert('Coming soon')}}>
                    <ReportProfileOptionsViewButtonsText redButton={true}>Report</ReportProfileOptionsViewButtonsText>
                </ReportProfileOptionsViewButtons>
            </ReportProfileOptionsView>
            <ActionSheet
                ref={UnfollowPrivateAccountConfirmationPickerMenu}
                title={'Are you sure you want to unfollow this user? You will have to make a follow request if you want to follow them again.'}
                options={['Unfollow', 'Cancel']}
                // Define cancel button index in the option array
                // This will take the cancel option in bottom
                // and will highlight it
                cancelButtonIndex={1}
                // Highlight any specific option
                destructiveButtonIndex={0}
                onPress={(index) => {
                    if (index == 0) {
                        async function toggleFollowOfAUser(userPubId) {
                            const pushChangesToArray = (userPubId, following) => {
                                if (!following) {
                                    //Push changes to save unfollowing user
                                    arrayOfUserChanges.push(userPubId);
                                    console.log('Pushing changes to array')
                                } else {
                                    //Push changes to save following user
                                    arrayOfUserChanges.splice(arrayOfUserChanges.indexOf(userPubId), 1);
                                    console.log('Removing changes from array')
                                }
                            }
                    
                            const url = `${serverUrl}/user/toggleFollowOfAUser`;
                            const toSend = {userId: _id, userToFollowPubId: userPubId};
                            try {
                                const response = await axios.post(url, toSend);
                                const result = response.data;
                                const { message, status, data } = result;
                                console.log(message)
                                console.log(status)
                    
                                if (status !== "SUCCESS") {
                                    console.log(status + message)
                                    alert('An error occured. Please try again.')
                                } else {
                                    console.log(status + message)
                                    if (message == "Followed User") {
                                        //Followed
                                        pushChangesToArray(userPubId, true)
                                        setListItems(listItems => {
                                            listItems[listItems.findIndex(item => item.pubId == userPubId)].following = true;
                                            return listItems
                                        })
                                        setUpdateFlatList(updateFlatList => !updateFlatList)
                                    } else if (message == "Requested To Follow User") {
                                        //Requested
                                        pushChangesToArray(userPubId, false)
                                        setListItems(listItems => {
                                            listItems[listItems.findIndex(item => item.pubId == userPubId)].following = 'Requested';
                                            return listItems
                                        })
                                        setUpdateFlatList(updateFlatList => !updateFlatList)
                                    } else {
                                        //Unfollowed or unrequested
                                        pushChangesToArray(userPubId, false)
                                        setListItems(listItems => {
                                            listItems[listItems.findIndex(item => item.pubId == userPubId)].following = false;
                                            return listItems
                                        })
                                        setUpdateFlatList(updateFlatList => !updateFlatList)
                                    }
                                }
                            } catch (error) {
                                console.log(error)
                                alert('An error occured. Please try again.')
                            }
                        }
                        if (userIDToUnfollow != undefined) {
                            toggleFollowOfAUser(userIDToUnfollow)
                            console.log(userIDToUnfollow)
                        } else {
                            alert('An error occured. Please try again.')
                        }
                    } else {
                        console.log('Cancelled')
                    }
                }}
            />
            <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                    <Image
                        source={require('../assets/app_icons/back_arrow.png')}
                        style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                        resizeMode="contain"
                        resizeMethod="resize"
                    />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>{type == 'Followers' ? 'People following you:' : 'You follow:'}</TestText>
            </ChatScreen_Title>
            {followers.length != 0 ?
                listItems.length != 0 ?
                    <FlatList
                        data={listItems}
                        keyExtractor={(item, index) => 'key'+index}
                        renderItem={({ item, index }) => <MemoizedItem item={item} index={index}/>}
                        getItemLayout={(data, index) => (
                            {length: 70, offset: 70 * index, index}
                        )}
                        onEndReached={() => {noMoreItems == false ? loadItems() : null}}
                        onEndReachedThreshold={1}
                        ListFooterComponent={
                            noMoreItems == true ? <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 15, marginBottom: 30}}>No more users to show</Text> : <ActivityIndicator size="large" color={colors.brand} style={{marginTop: 10, marginBottom: 20}}/>
                        }
                        extraData={updateFlatList}
                        scrollEnabled={userOnThreeDotsMenu == null}
                    />
                :
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color={colors.brand}/>
                    </View>
            :
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: colors.tertiary, fontSize: 35, textAlign: 'center', fontWeight: 'bold', marginHorizontal: '5%'}}>
                        {type == 'Following' ? 'You do not follow anyone' : 'No one follows you'}   
                    </Text>
                </View>
            }
        </>
    );
}

export default ProfileStats;

function ProfileStats_FollowingItem({item, index, setListItems, UnfollowPrivateAccountConfirmationPickerMenu}) {
    const {colors} = useTheme()
    const [following, setFollowing] = useState(item.following);
    const [changingFollowing, setChangingFollowing] = useState(false)
    const {serverUrl, setServerUrl} = useContext(ServerUrlContext);
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {_id} = storedCredentials;

    async function toggleFollowOfAUser(userPubId) {
        setChangingFollowing(true)
        const pushChangesToArray = (userPubId, following) => {
            if (!following) {
                //Push changes to save unfollowing user
                arrayOfUserChanges.push(userPubId);
                console.log('Pushing changes to array')
            } else {
                //Push changes to save following user
                arrayOfUserChanges.splice(arrayOfUserChanges.indexOf(userPubId), 1);
                console.log('Removing changes from array')
            }
        }

        const url = `${serverUrl}/user/toggleFollowOfAUser`;
        const toSend = {userId: _id, userToFollowPubId: userPubId};
        try {
            const response = await axios.post(url, toSend);
            const result = response.data;
            const { message, status, data } = result;
            console.log(message)
            console.log(status)

            if (status !== "SUCCESS") {
                console.log(status + message)
                alert('An error occured. Please try again.')
                setChangingFollowing(false)
            } else {
                console.log(status + message)
                if (message == "Followed User") {
                    //Followed
                    pushChangesToArray(userPubId, true)
                    setFollowing(true)
                    setChangingFollowing(false)
                    setListItems(listItems => {
                        listItems[listItems.findIndex(item => item.pubId == userPubId)].following = true;
                        return listItems
                    })
                } else if (message == "Requested To Follow User") {
                    //Requested
                    pushChangesToArray(userPubId, false)
                    setFollowing('Requested')
                    setChangingFollowing(false)
                    setListItems(listItems => {
                        listItems[listItems.findIndex(item => item.pubId == userPubId)].following = 'Requested';
                        return listItems
                    })
                } else {
                    //Unfollowed or unrequested
                    pushChangesToArray(userPubId, false)
                    setFollowing(false)
                    setChangingFollowing(false)
                    setListItems(listItems => {
                        listItems[listItems.findIndex(item => item.pubId == userPubId)].following = false;
                        return listItems
                    })
                }
            }
        } catch (error) {
            console.log(error)
            alert('An error occured. Please try again.')
            setChangingFollowing(false)
        }
    }

    if (item.status === 'FAILED') {
        return (
            <View style={{alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', borderTopWidth: index == 0 ? 3 : 0, borderBottomWidth: 3, paddingLeft: 5, borderColor: colors.borderColor, height: 70}}>
                <AntDesign name="exclamationcircleo" size={50} color={colors.errorColor} style={{marginTop: 5, marginBottom: 5}}/>
                <SubTitle style={{color: colors.tertiary, marginLeft: 10, marginTop: 8}} searchResTitle={true}>Error loading user</SubTitle>
            </View>
        )
    } else {
        return (
            <View style={{alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', borderTopWidth: index == 0 ? 3 : 0, borderBottomWidth: 3, paddingLeft: 5, borderColor: colors.borderColor, height: 70}}>
                <Image style={{width: 60, height: 60, marginBottom: 5, marginTop: 5, borderRadius: 50, borderColor: colors.brand, borderWidth: 2}} source={{uri: item.profileImageB64}} />
                <SubTitle style={{color: colors.tertiary, marginLeft: 10, marginTop: 8}} searchResTitle={true}>{item.displayName || item.name || 'Error getting username'}</SubTitle>
                {changingFollowing == false ?
                    <TouchableOpacity onPress={() => {
                            if (item.privateAccount == true && following == true) {
                                userIDToUnfollow = item.pubId;
                                UnfollowPrivateAccountConfirmationPickerMenu.current.show();
                            } else {
                                toggleFollowOfAUser(item.pubId)
                            }
                        }} 
                        style={{position: 'absolute', right: 10, justifyContent: 'center', alignItems: 'center', borderColor: colors.borderColor, borderWidth: 3, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5}}
                    >
                        <Text style={{color: colors.tertiary, fontSize: 16, fontWeight: 'bold'}}>{following == true ? 'Unfollow' : following == false ? 'Follow' : following == 'Requested' ? 'Requested' : 'Error Occured'}</Text>
                    </TouchableOpacity>
                :
                    <ActivityIndicator size="large" color={colors.brand} style={{position: 'absolute', right: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5}}/>
                }
            </View>
        )
    }
}

function ProfileStats_FollowersItem({item, index, setUserOnThreeDotsMenu, userOnThreeDotsMenu}) {
    const {colors} = useTheme();
    if (item.status === 'FAILED') {
        return (
            <View style={{alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', borderTopWidth: index == 0 ? 3 : 0, borderBottomWidth: 3, paddingLeft: 5, borderColor: colors.borderColor, height: 70}}>
                <AntDesign name="exclamationcircleo" size={50} color={colors.errorColor} style={{marginTop: 5, marginBottom: 5}}/>
                <SubTitle style={{color: colors.tertiary, marginLeft: 10, marginTop: 8}} searchResTitle={true}>Error loading user</SubTitle>
            </View>
        )
    } else {
        return (
            <View style={{alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', borderTopWidth: index == 0 ? 3 : 0, borderBottomWidth: 3, paddingLeft: 5, borderColor: colors.borderColor, height: 70}}>
                <Image style={{width: 60, height: 60, marginBottom: 5, marginTop: 5, borderRadius: 50, borderColor: colors.brand, borderWidth: 2}} source={{uri: item.profileImageB64}} />
                <SubTitle style={{color: colors.tertiary, marginLeft: 10, marginTop: 8}} searchResTitle={true}>{item.displayName || item.name || 'Error getting username'}</SubTitle>
                <TouchableOpacity disabled={userOnThreeDotsMenu != null} onPress={() => {setUserOnThreeDotsMenu({name: item.displayName || item.name, pubId: item.pubId})}} style={{position: 'absolute', right: 10}}>
                    <Image
                        source={require('../assets/app_icons/3dots.png')}
                        style={{ width: 40, height: 40, tintColor: colors.tertiary}}
                        resizeMode="contain"
                        resizeMethod="resize"
                    />
                </TouchableOpacity>
            </View>
        )
    }
}