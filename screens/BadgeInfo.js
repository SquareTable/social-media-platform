import React, {useContext} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, Platform, Animated, Dimensions, Alert, FlatList, Button } from "react-native";
import { useTheme } from "@react-navigation/native";
import Constants from 'expo-constants';
import {
    PageTitle,
    Avatar,
} from './screenStylings/styling.js';
import { ProfilePictureURIContext } from "../components/ProfilePictureURIContext";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BadgeInfo = ({navigation, route}) => {
    const {badgeName, badgeUnlocked} = route.params;
    const {colors, dark} = useTheme();
    const StatusBarHeight = Constants.statusBarHeight;
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext);

    const BadgeIcon = ({badgeName}) => {
        if (badgeName == 'Joined SocialSquare') {
            return <EvilIcons name="trophy" size={75} color={colors.tertiary}/>
        } else if (badgeName == 'Sent 10 texts') {
            return <AntDesign name="message1" size={75} color={colors.tertiary}/>
        } else if (badgeName == '10 Minutes of Call Time') {
            return <AntDesign name="phone" size={75} color={colors.tertiary}/>
        } else if (badgeName == 'Upload 1 Post') {
            return <Ionicons name="cloud-upload-outline" size={75} color={colors.tertiary}/>
        } else if (badgeName == 'Post 1 Comment') {
            return <FontAwesome name="comments" size={75} color={colors.tertiary}/>
        } else {
            return <Text style={{fontSize: 30, color: colors.errorColor, fontWeight: 'bold', textAlign: 'center'}}>Error occured while getting badge icon</Text>
        }
    }
    return(
        <>
            <View style={{paddingTop: StatusBarHeight - 10, backgroundColor: colors.primary, borderColor: colors.borderColor, borderBottomWidth: 0, alignItems: 'center', width: '100%'}}>
                <>
                    <View style={{position: 'absolute', top: StatusBarHeight, left: 10}}>
                        <TouchableOpacity style={{marginRight: '75.5%'}} onPress={() => {navigation.goBack()}}>
                            <Image
                                source={require('../assets/app_icons/back_arrow.png')}
                                style={{ width: 40, height: 40, tintColor: colors.tertiary}}
                                resizeMode="contain"
                                resizeMethod="resize"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <PageTitle style={{fontSize: 24}} welcome={true}>{badgeName}</PageTitle>
                    </View>
                </>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <BadgeIcon badgeName={badgeName}/>
                <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{badgeName}</Text>
                <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{badgeDescription(badgeName)}</Text>
                {badgeUnlocked ?
                    <Text style={{color: colors.tertiary, fontSize: 20, textAlign: 'center'}}>You unlocked this badge at: backend implementation coming soon</Text>
                :
                    <>
                        <Text style={{color: colors.tertiary, fontSize: 20, textAlign: 'center'}}>You have not unlocked this badge yet.</Text>
                        <Text style={{color: colors.tertiary, fontSize: 20, textAlign: 'center'}}>Progress: number / number. Backend implementation coming soon</Text>
                    </>
                }
            </View>
        </>
    );
}

const badgeDescription = (badgeName) => {
    if (badgeName == 'Joined SocialSquare') {
        return 'Made an account'
    } else if (badgeName == 'Sent 10 texts') {
        return 'You have sent 10 texts in the SocialSquare app.'
    } else if (badgeName == '10 Minutes of Call Time') {
        return 'Have a total of 10 minutes of call time in the SocialSquare app.'
    } else if (badgeName == 'Upload 1 Post') {
        return 'Upload your first post to SocialSquare.'
    } else if (badgeName == 'Post 1 Comment') {
        return 'Post your first comment on SocialSquare.'
    } else {
        return 'Error occured while getting badge description'
    }
}

export default BadgeInfo;