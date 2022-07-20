import React, {useContext, useEffect, memo, useState, useRef} from 'react';
import { useTheme } from '@react-navigation/native';
import {View, SafeAreaView, Text, TouchableOpacity, Image, FlatList, ActivityIndicator} from 'react-native';
import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
    SubTitle
} from './screenStylings/styling.js';
import { CredentialsContext } from '../components/CredentialsContext.js';
import axios from 'axios';
import { ServerUrlContext } from '../components/ServerUrlContext.js';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png.js';
import { AllCredentialsStoredContext } from '../components/AllCredentialsStoredContext.js';

let arrayOfUserChanges = [];

const AccountFollowRequestsScreen = ({navigation, route}) => {
    const {colors, dark} = useTheme()
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {allCredentialsStoredList, setAllCredentialsStoredList} = useContext(AllCredentialsStoredContext);
    const {_id} = storedCredentials;
    const userLoadMax = 10;
    const [listItems, setListItems] = useState([])
    const {serverUrl, setServerUrl} = useContext(ServerUrlContext);
    const [noMoreItems, setNoMoreItems] = useState(false);
    const [accountFollowRequests, setAccountFollowRequests] = useState('NOT LOADED');
    const [errorOccured, setErrorOccured] = useState(false);
    const [refreshFlatList, setRefreshFlatList] = useState(false);

    useEffect(() => {arrayOfUserChanges = []}, []);

    async function loadItems() {
        if (noMoreItems == false && accountFollowRequests != 'NOT LOADED' && accountFollowRequests.length > 0) {
            let toAddToList = [];
            for (let i = 0; i < userLoadMax; i++) {
                if ((listItems.length + i) < accountFollowRequests.length) {
                    let url = serverUrl + '/tempRoute/getuserbyid/' + accountFollowRequests[(listItems.length + i)];
                    try {
                        const response = await axios.get(url);
                        const result = response.data;
                        const {message, status, data} = result;

                        if (status !== 'SUCCESS') {
                            console.log(message);
                            toAddToList.push({status: 'FAILED'});
                        } else {
                            let dataToUse = data;
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
        axios.get(serverUrl + '/tempRoute/getfollowrequests/' + _id).then(response => {
            const result = response.data;
            const {message, status, data} = result;
            
            if (status !== 'SUCCESS') {
                console.log(message);
                setErrorOccured(true);
            } else {
                setAccountFollowRequests(data);
            }
        }).catch(e => {
            console.log(e)
            setErrorOccured(true);
        })
    }, [])

    useEffect(() => {
        if (accountFollowRequests !== 'NOT LOADED') {
            loadItems();
        }
    }, [accountFollowRequests]) //When account follow requests have been loaded, load the items

    const denyFollowRequest = async (userToDeny, itemIndex) => {
        const url = serverUrl + '/tempRoute/denyfollowrequest';
        const toSend = {accountFollowRequestedID: _id, accountFollowRequestDeniedPubID: userToDeny};
        try {
            const response = await axios.post(url, toSend);
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                console.log(message)
                alert('An error occured. Please try again.')
            } else {
                setListItems(listItems => {
                    let newList = listItems;
                    newList.splice(itemIndex, 1);
                    return newList;
                })
                setAccountFollowRequests(accountFollowRequests => {
                    let newList = accountFollowRequests;
                    newList.splice(itemIndex, 1);
                    return newList;
                })
                setRefreshFlatList(refreshFlatList => !refreshFlatList)
            }
        } catch (e) {
            console.log(e)
            alert('An error occured. Please try again.')
        }
    }

    const acceptFollowRequest = async (userToAccept, itemIndex) => {
        const url = serverUrl + '/tempRoute/acceptfollowrequest';
        const toSend = {accountFollowRequestedID: _id, accountFollowRequestAcceptedPubID: userToAccept};
        try {
            const response = await axios.post(url, toSend);
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                console.log(message)
                alert('An error occured. Please try again.')
            } else {
                setListItems(listItems => {
                    let newList = listItems;
                    newList.splice(itemIndex, 1);
                    return newList;
                })
                setAccountFollowRequests(accountFollowRequests => {
                    let newList = accountFollowRequests;
                    newList.splice(itemIndex, 1);
                    return newList;
                })
                arrayOfUserChanges.push(userToAccept);
                setRefreshFlatList(refreshFlatList => !refreshFlatList)
            }
        } catch (e) {
            console.log(e)
            alert('An error occured. Please try again.')
        }
    }

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

            setAllCredentialsStoredList(allCredentialsStoredList => {
                console.log('Index is: ' + storedCredentials.indexLength)
                for (let i = 0; i < arrayOfUserChanges.length; i++) {
                    console.log('Running loop and i is: ' + i);
                    allCredentialsStoredList[storedCredentials.indexLength].followers.push(arrayOfUserChanges[i]);
                }
                return allCredentialsStoredList;
            });
            setStoredCredentials(storedCredentials => {
                for (let i = 0; i < arrayOfUserChanges.length; i++) {
                    console.log('Running loop and i is: ' + i);
                    storedCredentials.followers.push(arrayOfUserChanges[i]);
                }
                return storedCredentials;
            });


        }), [navigation]);

    const Item = ({item, index}) => {
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
                    <SubTitle style={{color: colors.tertiary, marginLeft: 10, marginTop: 8, fontSize: 16}} searchResTitle={true}>{item.displayName || item.name || 'Error getting username'}</SubTitle>
                    <View style={{position: 'absolute', right: 10, flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => {acceptFollowRequest(item.pubId, index)}} style={{justifyContent: 'center', alignItems: 'center', borderColor: colors.borderColor, borderWidth: 2, paddingVertical: 6, paddingHorizontal: 8, marginHorizontal: 3, borderRadius: 10}}>
                            <Text style={{color: colors.tertiary, fontSize: 15, fontWeight: 'bold', color: colors.green}}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {denyFollowRequest(item.pubId, index)}} style={{justifyContent: 'center', alignItems: 'center', borderColor: colors.borderColor, borderWidth: 2, paddingVertical: 6, paddingHorizontal: 8, marginHorizontal: 3, borderRadius: 10}}>
                            <Text style={{color: colors.tertiary, fontSize: 15, fontWeight: 'bold', color: colors.red}}>Deny</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    const MemoizedItem = memo(Item);
    return(
        <>
            <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                    <Image
                    source={require('../assets/app_icons/back_arrow.png')}
                    style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                    resizeMode="contain"
                    resizeMethod="resize"
                    />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>Account Follow Requests</TestText>
            </ChatScreen_Title>
            {errorOccured ? (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: colors.errorColor, fontSize: 20, fontWeight: 'bold'}}>An error occured. Please try again.</Text>
                </View>
            ) : (
                accountFollowRequests.length != 0 ?
                    listItems.length != 0 ?
                        <FlatList
                            data={listItems}
                            keyExtractor={(item, index) => 'key'+index}
                            renderItem={({ item, index }) => <MemoizedItem item={item} index={index}/>}
                            getItemLayout={(data, index) => (
                                {length: 70, offset: 70 * index, index}
                            )}
                            onEndReached={() => {noMoreItems == false ? loadItems() : null}}
                            onEndReachedThreshold={0.2}
                            ListFooterComponent={
                                noMoreItems == true ? <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 15, marginBottom: 30}}>No more users to show</Text> : <ActivityIndicator size="large" color={colors.brand} style={{marginTop: 10, marginBottom: 20}}/>
                            }
                            extraData={refreshFlatList}
                        />
                    :
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large" color={colors.brand}/>
                        </View>
                :
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: colors.tertiary, fontSize: 30, textAlign: 'center', fontWeight: 'bold', marginHorizontal: '5%'}}>No one is requesting to follow you right now</Text>
                    </View>
            )}
        </>
    );
}

export default AccountFollowRequestsScreen;