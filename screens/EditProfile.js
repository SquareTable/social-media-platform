import React, {useState, useEffect, useContext, useRef} from 'react';
import {View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, Keyboard, Switch, Alert} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
    Avatar,
    SubTitle,
    MsgBox,
    LeftIcon,
    StyledTextInput,
    StyledInputLabel,
    ConfirmLogoutButtonText,
    ConfirmLogoutText,
    ConfirmLogoutButtons,
    ConfirmLogoutView
} from './screenStylings/styling';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext';
import ActionSheet from 'react-native-actionsheet';
import * as ImagePicker from 'expo-image-picker';
import { CredentialsContext } from '../components/CredentialsContext';
import { ServerUrlContext } from '../components/ServerUrlContext';
import { AllCredentialsStoredContext } from '../components/AllCredentialsStoredContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";
import Octicons from 'react-native-vector-icons/Octicons';
import { useIsFocused } from '@react-navigation/native';

const EditProfile = ({navigation, route}) => {
    const {colors, dark} = useTheme()
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext);
    const {imageFromRoute} = route.params;
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {_id, secondId, name, displayName, bio, privateAccount} = storedCredentials;
    const originalName = name;
    const originalDisplayName = displayName;
    const originalBio = bio;
    const [nameText, setNameText] = useState(name);
    const [displayNameText, setDisplayNameText] = useState(displayName);
    const [bioText, setBioText] = useState(bio);
    const {serverUrl, setServerUrl} = useContext(ServerUrlContext);
    const [changingPfp, setChangingPfp] = useState(false)
    const {allCredentialsStoredList, setAllCredentialsStoredList} = useContext(AllCredentialsStoredContext);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const StatusBarHeight = Constants.statusBarHeight;
    const [savingChanges, setSavingChanges] = useState(false);
    const [savingChangesStatus, setSavingChangesStatus] = useState(false);
    const changesHaveBeenMade = (originalName !== nameText) || (originalDisplayName !== displayNameText) || (originalBio !== bioText);
    const [isPrivateAccount, setIsPrivateAccount] = useState(privateAccount);
    const [hideMakeAccountPrivateConfirmationScreen, setHideMakeAccountPrivateConfirmationScreen] = useState(true);
    const [hideMakeAccountPublicConfirmationScreen, setHideMakeAccountPublicConfirmationScreen] = useState(true);
    const [changingPrivateAccount, setChangingPrivateAccount] = useState(false);
    const isFocused = useIsFocused();
    const PfpPickerActionMenuOptions = [
        'Take Photo',
        'Choose from Photo Library',
        'Cancel'
    ];
    const PfpPickerActionMenu = useRef(null);

    const OpenImgLibrary = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work! Go into Settings and allow SocialSquare to use camera roll permissions to get this to work.');
            } else {
                pickImage()
            }
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        
        if (!result.cancelled) {
            console.log(result)
            uploadPFP(result)
        }
    };

    const checkForCameraPermissions = () => {
        navigation.navigate('TakeImage_Camera', {locationToGoTo: 'EditProfile'})
    }

    useEffect(() => {
        if (imageFromRoute != null) {
            console.log('Image received from imageFromRoute')
            console.log(imageFromRoute)
            uploadPFP(imageFromRoute)
            navigation.setParams({imageFromRoute: null})
        }
    })

    const uploadPFP = (image) => {
        const formData = new FormData();
        formData.append("image", {
            name: image.uri.substr(image.uri.lastIndexOf('/') + 1),
            uri: image.uri,
            type: 'image/jpg'
        })
        formData.append("userId", _id)

        const url = serverUrl + '/user/postProfileImage';
        setChangingPfp(true)
        axios.post(url, formData, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }}).then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                handleMessage(message, status);
                setChangingPfp(false)
                console.log(message)
                alert("An error occured while changing your profile picture.")
            } else {
                console.log(data)
                handleMessage(message, status)
                getProfilePicture()
                //persistLogin({...data[0]}, message, status);
            }

        }).catch(error => {
            console.log(error);
            setChangingPfp(false);
            handleMessage("An error occured. Try checking your network connection and retry.");
        })
    }

    const getProfilePicture = () => {
        const url = serverUrl + '/user/getProfilePic/' + secondId;

        axios.get(url).then(async (response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                console.log('GETTING PROFILE PICTURE FOR PROFILESCREEN.JS WAS NOT A SUCCESS')
                console.log(status)
                console.log(message)
                alert('Profile picture has been uploaded but an error occured while setting your profile picture. Log out and log back in and your profile picture will show up.')
                setChangingPfp(false)
            } else {
                console.log(status)
                console.log(message)
                try {
                    const imageResponse = await axios.get(`${serverUrl}/getImageOnServer/${data}`);

                    if (imageResponse) {
                        const pfp = 'data:image/jpeg;base64,' + imageResponse.data;
                        console.log('Setting profile picture to user profile picture')
                        setProfilePictureUri(pfp)
                        setChangingPfp(false)
                        var temp = allCredentialsStoredList;
                        temp[storedCredentials.indexLength].profilePictureUri = pfp;
                        setAllCredentialsStoredList(temp)
                        const currentStoredCredentials = temp[storedCredentials.indexLength];
                        setStoredCredentials(currentStoredCredentials)
                        AsyncStorage.setItem('socialSquareCredentials', JSON.stringify(currentStoredCredentials));
                        AsyncStorage.setItem('socialSquare_AllCredentialsList', JSON.stringify(temp));
                    } else {
                        alert('Profile picture has been uploaded but an error occured while setting your profile picture. Log out and log back in and your profile picture will show up.')
                        setChangingPfp(false)
                    }
                } catch (error) {
                    console.log("Image not recieved")
                    console.log(error);
                    alert('Profile picture has been uploaded but an error occured while setting your profile picture. Log out and log back in and your profile picture will show up.')
                    setChangingPfp(false)
                }
            }
            //setSubmitting(false);

        }).catch(error => {
            console.log(error);
            alert('Profile picture has been uploaded but an error occured while setting your profile picture. Log out and log back in and your profile picture will show up.')
            setChangingPfp(false)
        })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const saveChanges = () => {
        Keyboard.dismiss();
        setSavingChanges(true);
        setMessage();
        setMessageType();
        setSavingChangesStatus(1);
    }

    useEffect(() => {
        if (savingChangesStatus === 1) {
            if (originalName !== nameText) {
                if (nameText !== null && nameText !== undefined && nameText != '' && nameText.length > 0) {
                    // Saving username
                    let username = nameText;
                    username = username.split(''); // Get each letter in the username
                    for (let i = 0; i < username.length; i++) {
                        username[i] = username[i].toLowerCase().trim(); // Make each letter lowercase and trim whitespace
                    }
                    username = username.join(''); // Put the letters back together
                    const toSend = {userID: _id, desiredUsername: username};
                    const url = serverUrl + '/user/changeusername';
                    axios.post(url, toSend).then(response => {
                        const result = response.data;
                        const {message, status, data} = result;
    
                        if (status !== 'SUCCESS') {
                            handleMessage(message, status);
                            setSavingChanges(false)
                            console.log(message)
                            setSavingChangesStatus(false);
                        } else {
                            let temp = allCredentialsStoredList;
                            temp[storedCredentials.indexLength].name = username;
                            setAllCredentialsStoredList(temp)
                            setStoredCredentials(temp[storedCredentials.indexLength])
                            AsyncStorage.setItem('socialSquare_AllCredentialsList', JSON.stringify(temp));
                            AsyncStorage.setItem('socialSquare_StoredCredentials', JSON.stringify(temp[storedCredentials.indexLength]));
                            setSavingChangesStatus(2);
                        }
                    }).catch(error => {
                        console.log(error);
                        handleMessage("An error occured. Try checking your network connection and retry.", "FAILED");
                        setSavingChanges(false);
                        setSavingChangesStatus(false);
                    })
                } else {
                    handleMessage('Please enter a username.', 'FAILED');
                    setSavingChanges(false);
                    setSavingChangesStatus(false);
                }
            } else {
                setSavingChangesStatus(2);
            }
        } else if (savingChangesStatus === 2) {
            if (originalDisplayName !== displayNameText) {
                // Saving username
                let displayName = displayNameText;
                const toSend = {userID: _id, desiredDisplayName: displayName};
                const url = serverUrl + '/user/changedisplayname';
                axios.post(url, toSend).then(response => {
                    const result = response.data;
                    const {message, status, data} = result;

                    if (status !== 'SUCCESS') {
                        handleMessage(message, status);
                        setSavingChanges(false)
                        console.log(message)
                        setSavingChangesStatus(false);
                    } else {
                        let temp = allCredentialsStoredList;
                        temp[storedCredentials.indexLength].displayName = displayName;
                        setAllCredentialsStoredList(temp)
                        setStoredCredentials(temp[storedCredentials.indexLength])
                        AsyncStorage.setItem('socialSquare_AllCredentialsList', JSON.stringify(temp));
                        AsyncStorage.setItem('socialSquare_StoredCredentials', JSON.stringify(temp[storedCredentials.indexLength]));
                        setSavingChangesStatus(3);
                    }
                }).catch(error => {
                    console.log(error);
                    handleMessage("An error occured. Try checking your network connection and retry.", "FAILED");
                    setSavingChanges(false);
                    setSavingChangesStatus(false);
                })
            } else {
                setSavingChangesStatus(3);
            }
        } else if (savingChangesStatus === 3) {
            if (originalBio !== bioText) {
                let bio = bioText;
                const toSend = {userID: _id, bio};
                const url = serverUrl + '/user/changebio';
                axios.post(url, toSend).then(response => {
                    const result = response.data;
                    const {message, status, data} = result;

                    if (status !== 'SUCCESS') {
                        handleMessage(message, status);
                        setSavingChanges(false)
                        console.log(message)
                        setSavingChangesStatus(false);
                    } else {
                        let temp = allCredentialsStoredList;
                        temp[storedCredentials.indexLength].bio = bio;
                        setAllCredentialsStoredList(temp)
                        setStoredCredentials(temp[storedCredentials.indexLength])
                        AsyncStorage.setItem('socialSquare_AllCredentialsList', JSON.stringify(temp));
                        AsyncStorage.setItem('socialSquare_StoredCredentials', JSON.stringify(temp[storedCredentials.indexLength]));
                        setSavingChangesStatus('SUCCESS');
                    }
                }).catch(error => {
                    console.log(error);
                    handleMessage("An error occured. Try checking your network connection and retry.", "FAILED");
                    setSavingChanges(false);
                    setSavingChangesStatus(false);
                })
            } else {
                setSavingChangesStatus('SUCCESS')
            }
        } else if (savingChangesStatus === 'SUCCESS') {
            setSavingChanges(false);
            setSavingChangesStatus(false);
            handleMessage('Changes saved.', 'SUCCESS');
            setTimeout(() => {
                navigation.goBack()
            }, 1000);
        }
    }, [savingChangesStatus])

    const makeAccountPrivate = () => {
        setHideMakeAccountPrivateConfirmationScreen(true)
        setChangingPrivateAccount(true)
        setSavingChanges(true)
        let url = serverUrl + '/user/makeaccountprivate';
        let toSend = {userID: _id};
        axios.post(url, toSend).then(response => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                handleMessage(message, status);
                setChangingPrivateAccount(false);
                setSavingChanges(false)
            } else {
                let temp = allCredentialsStoredList;
                temp[storedCredentials.indexLength].privateAccount = true;
                setAllCredentialsStoredList(temp)
                setStoredCredentials(temp[storedCredentials.indexLength])
                setChangingPrivateAccount(false)
                AsyncStorage.setItem('socialSquare_AllCredentialsList', JSON.stringify(temp));
                AsyncStorage.setItem('socialSquareCredentials', JSON.stringify(temp[storedCredentials.indexLength]));
                setSavingChanges(false)
                setIsPrivateAccount(true)
            }
        }).catch(error => {
            console.log(error);
            handleMessage("An error occured. Try checking your network connection and retry.", "FAILED");
            setChangingPrivateAccount(false);
            setSavingChanges(false)
        })
    }

    const makeAccountPublic = () => {
        setHideMakeAccountPublicConfirmationScreen(true)
        setChangingPrivateAccount(true)
        setSavingChanges(true)
        let url = serverUrl + '/user/makeaccountpublic';
        let toSend = {userID: _id};
        axios.post(url, toSend).then(response => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                handleMessage(message, status);
                setChangingPrivateAccount(false);
                setSavingChanges(false)
            } else {
                let temp = allCredentialsStoredList;
                temp[storedCredentials.indexLength].privateAccount = false;
                setAllCredentialsStoredList(temp)
                setStoredCredentials(temp[storedCredentials.indexLength])
                setChangingPrivateAccount(false)
                AsyncStorage.setItem('socialSquare_AllCredentialsList', JSON.stringify(temp));
                AsyncStorage.setItem('socialSquareCredentials', JSON.stringify(temp[storedCredentials.indexLength]));
                setSavingChanges(false)
                setIsPrivateAccount(false)
            }
        }).catch(error => {
            console.log(error);
            handleMessage("An error occured. Try checking your network connection and retry.", "FAILED");
            setChangingPrivateAccount(false);
            setSavingChanges(false)
        })
    }

    useEffect(() =>
        navigation.addListener('beforeRemove', (e) => {
            if (savingChanges == false || changesHaveBeenMade == false) {
                // If we don't have unsaved changes, then we don't need to do anything
                return;
            }
    
            // Prevent default behavior of leaving the screen
            e.preventDefault();

            if (savingChanges == true) {
                Alert.alert(
                    'Changes are being saved',
                    'Are you sure you want to leave this screen while changes are being saved?',
                    [
                        { text: "Don't Leave", style: 'cancel', onPress: () => {} },
                        {
                            text: 'Leave',
                            style: 'destructive',
                            // If the user confirmed, then we dispatch the action we blocked earlier
                            // This will continue the action that had triggered the removal of the screen
                            onPress: () => {
                                isFocused == true ? navigation.dispatch(e.data.action) : null
                            }
                        },
                    ]
                );
            } else if (changesHaveBeenMade == true) {
                Alert.alert(
                    'Changes have been made',
                    'Do you want to save your changes before leaving?',
                    [
                        { text: "Discard Changes", style: 'cancel', onPress: () => {} },
                        {
                            text: 'Save Changes',
                            style: 'destructive',
                            // If the user confirmed, then we dispatch the action we blocked earlier
                            // This will continue the action that had triggered the removal of the screen
                            onPress: () => {
                                isFocused == true ? navigation.dispatch(e.data.action) : null
                            }
                        },
                    ]
                );
            } else {
                alert('An error occured. Taking you back to the previous screen.')
                navigation.goBack()
            }

        }), [navigation, savingChanges]);
    return (
        <>
            <ConfirmLogoutView style={{backgroundColor: colors.primary, height: 500}} viewHidden={hideMakeAccountPrivateConfirmationScreen}>
                <ConfirmLogoutText style={{color: colors.tertiary, fontSize: 24}}>Are you sure you want to make your account private?</ConfirmLogoutText>
                <ConfirmLogoutText style={{color: colors.tertiary, fontSize: 14, marginVertical: 2}}>People will have to request to follow you and get their request accepted before they can see your posts.</ConfirmLogoutText>
                <ConfirmLogoutText style={{color: colors.tertiary, fontSize: 14, marginVertical: 3}}>Threads will stay public unless they are in private categories in which case only members of the thread's category will be able to see it.</ConfirmLogoutText>
                <ConfirmLogoutText style={{color: colors.tertiary, fontSize: 14, marginVertical: 2}}>Categories that you own will also stay public unless you make the category itself private</ConfirmLogoutText>
                <ConfirmLogoutText style={{color: colors.tertiary, fontSize: 14, marginVertical: 2}}>People currently following you will stay following you and will still be able to see your posts.</ConfirmLogoutText>
                <ConfirmLogoutButtons style={{height: 100}} cancelButton={true} onPress={() => {setHideMakeAccountPrivateConfirmationScreen(true)}}>
                    <ConfirmLogoutButtonText cancelButton={true}>Cancel</ConfirmLogoutButtonText>
                </ConfirmLogoutButtons> 
                <ConfirmLogoutButtons style={{height: 100}} confirmButton={true} onPress={makeAccountPrivate}>
                    <ConfirmLogoutButtonText confirmButton>Confirm</ConfirmLogoutButtonText>
                </ConfirmLogoutButtons> 
            </ConfirmLogoutView>
            <ConfirmLogoutView style={{backgroundColor: colors.primary, height: 500}} viewHidden={hideMakeAccountPublicConfirmationScreen}>
                <ConfirmLogoutText style={{color: colors.tertiary, fontSize: 24}}>Are you sure you want to make your account public?</ConfirmLogoutText>
                <ConfirmLogoutText style={{color: colors.tertiary, fontSize: 14, marginVertical: 2}}>Anyone will be able to follow you and see your posts whether or not they are following you.</ConfirmLogoutText>
                <ConfirmLogoutText style={{color: colors.tertiary, fontSize: 14, marginVertical: 3}}>Any follow requests still not accepted or denied will be accepted and those users will start following you.</ConfirmLogoutText>
                <ConfirmLogoutButtons cancelButton={true} onPress={() => {setHideMakeAccountPublicConfirmationScreen(true)}}>
                    <ConfirmLogoutButtonText cancelButton={true}>Cancel</ConfirmLogoutButtonText>
                </ConfirmLogoutButtons> 
                <ConfirmLogoutButtons confirmButton={true} onPress={makeAccountPublic}>
                    <ConfirmLogoutButtonText confirmButton>Confirm</ConfirmLogoutButtonText>
                </ConfirmLogoutButtons> 
            </ConfirmLogoutView>
            <ActionSheet
                ref={PfpPickerActionMenu}
                title={'How would you like to choose your profile picture?'}
                options={PfpPickerActionMenuOptions}
                // Define cancel button index in the option array
                // This will take the cancel option in bottom
                // and will highlight it
                cancelButtonIndex={2}
                // Highlight any specific option
                //destructiveButtonIndex={2}
                onPress={(index) => {
                    if (index == 0) {
                        checkForCameraPermissions()
                    } else if (index == 1) {
                        OpenImgLibrary()
                    } else if (index == 2) {
                        console.log('Closing action picker')
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
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>Edit Profile</TestText>
                <TouchableOpacity style={{position: 'absolute', top: savingChanges ? StatusBarHeight + 10 : StatusBarHeight + 7.5, right: savingChanges ? 20 : 10}} onPress={saveChanges} disabled={savingChanges || !changesHaveBeenMade}>
                    {savingChanges ?
                        <ActivityIndicator size="small" color={colors.brand} />
                    :
                        <Text style={{color: colors.brand, fontSize: 20, fontWeight: 'bold', opacity: changesHaveBeenMade ? 1 : 0.3}}>Save</Text>
                    }
                </TouchableOpacity>
            </ChatScreen_Title>
            <ScrollView>
                <MsgBox type={messageType}>{message}</MsgBox>
                <Avatar resizeMode="cover" source={{uri: profilePictureUri}} style={{marginBottom: 0}} />
                <TouchableOpacity onPress={() => {PfpPickerActionMenu.current.show()}}>
                    {changingPfp == true ?
                        <ActivityIndicator color={colors.brand} size="large" style={{marginTop: 10}} />
                    :
                        <SubTitle style={{marginBottom: 0, color: colors.darkestBlue, textAlign: 'center', marginTop: 5}}>Change</SubTitle>
                    }
                </TouchableOpacity>
                <View style={{width: '90%', alignSelf: 'center', marginTop: 5}}>
                    <UserTextInput
                        label="Username"
                        icon="pencil"
                        onChangeText={(text) => {savingChanges ? null : setNameText(text.toLowerCase().trim())}}
                        value={nameText}
                        style={{backgroundColor: colors.primary, color: colors.tertiary}}
                        colors={colors}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <UserTextInput
                        label="Display Name"
                        icon="pencil"
                        onChangeText={(text) => {savingChanges ? null : setDisplayNameText(text.trim())}}
                        value={displayNameText}
                        style={{backgroundColor: colors.primary, color: colors.tertiary}}
                        colors={colors}
                        autoCorrect={false}
                    />
                    <UserTextInput
                        label="Bio"
                        icon="pencil"
                        onChangeText={(text) => {savingChanges ? null : setBioText(text)}}
                        value={bioText}
                        style={{backgroundColor: colors.primary, color: colors.tertiary}}
                        colors={colors}
                    />
                    <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 10}}>
                        <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold'}}>Private Account</Text>
                        {changingPrivateAccount == false ?
                            <Switch
                                value={isPrivateAccount}
                                onValueChange={(value) => {
                                    //Show warning and confirmation screen and then write server code to handle private account change
                                    if (value == true) {
                                        // Making account private
                                        setHideMakeAccountPrivateConfirmationScreen(false)
                                    } else {
                                        // Making account public
                                        setHideMakeAccountPublicConfirmationScreen(false)
                                    }
                                }}
                                trackColor={{true: colors.brand, false: colors.primary}}
                                thumbColor={isPrivateAccount ? colors.tertiary : colors.tertiary}
                            />
                        :
                            <ActivityIndicator color={colors.brand} size="small" />
                        }
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default EditProfile;

const UserTextInput = ({label, icon, colors, ...props}) => {
    return(
        <View>
            <LeftIcon style={{top: 34.5}}>
                <Octicons name={icon} size={30} color={colors.brand} />
            </LeftIcon>
            <StyledInputLabel style={{marginLeft: 10}}>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
        </View>
    )
}