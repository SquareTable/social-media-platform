import SocialSquareLogo_B64_png from "../assets/SocialSquareLogo_Base64_png";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logout(storedCredentials, setStoredCredentials, allCredentialsStoredList, setAllCredentialsStoredList, navigation, setProfilePictureUri) {
    if (storedCredentials && allCredentialsStoredList) {
        if (allCredentialsStoredList.length == 1 || allCredentialsStoredList.length == 0 || allCredentialsStoredList == undefined || allCredentialsStoredList == null) {
            console.log('Running logout code for when allCredentialsStoredLists length is 1 or 0');
            setProfilePictureUri(SocialSquareLogo_B64_png);
            AsyncStorage.removeItem('socialSquareCredentials').then(() => {
                setStoredCredentials(null)
            })
            AsyncStorage.removeItem('socialSquare_AllCredentialsList').then(() => {
                setAllCredentialsStoredList(null)
            })
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            });
        } else {
            console.log('Running logout code for when allCredentialsStoredLists length is not 1 or 0')
            allCredentialsStoredList.splice(storedCredentials.indexLength, 1);
            AsyncStorage.setItem('socialSquare_AllCredentialsList', JSON.stringify(allCredentialsStoredList)).then(() => {
                setAllCredentialsStoredList(allCredentialsStoredList)
            });
            AsyncStorage.setItem('socialSquareCredentials', JSON.stringify(allCredentialsStoredList[0])).then(() => {
                setProfilePictureUri(allCredentialsStoredList[0].profilePictureUri)
                setStoredCredentials(allCredentialsStoredList[0])
            });
            navigation.reset({
                index: 0,
                routes: [{ name: 'Tabs' }],
            })
        }
    } else {
        setProfilePictureUri(SocialSquareLogo_B64_png);
        AsyncStorage.removeItem('socialSquareCredentials').then(() => {
            setStoredCredentials(null)
        })
        AsyncStorage.removeItem('socialSquare_AllCredentialsList').then(() => {
            setAllCredentialsStoredList(null)
        })
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
        });
    }
}