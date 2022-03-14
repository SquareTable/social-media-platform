import React, {useContext, useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {useTheme} from "@react-navigation/native";
import Constants from 'expo-constants';

import {
    WelcomeContainer,
    Avatar,
    SettingsPageItemTouchableOpacity,
    SettingsItemImage,
    SettingsItemText,
    ConfirmLogoutView,
    ConfirmLogoutText,
    ConfirmLogoutButtons,
    ConfirmLogoutButtonText,
    TextLinkContent,
    TextLink,
    SettingsHorizontalView,
    ChatScreen_Title,
    Navigator_BackButton,
    StyledButton,
    ButtonText,
    TestText
} from '../screenStylings/styling.js';

import {Image, View, Text, TouchableOpacity, ScrollView, Alert, Switch, Linking} from 'react-native';


const Algorithm_HomeScreenSettings = ({navigation}) => {
    const {colors, dark} = useTheme();
    const StatusBarHeight = Constants.statusBarHeight;
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(true);
    const [alogrithmEnabled, setAlogrithmEnabled] = useState(false);
    const [useUpvoteData, setUseUpvoteData] = useState(false);
    const [useDownvoteData, setUseDownvoteData] = useState(false);
    const [useFollowingData, setUseFollowingData] = useState(false);
    const [collectAndUseLocationData, setCollectAndUseLocationData] = useState(false);
    useEffect(() =>
        navigation.addListener('beforeRemove', (e) => {
            if (!hasUnsavedChanges) {
              // If we don't have unsaved changes, then we don't need to do anything
              return;
            }
    
            // Prevent default behavior of leaving the screen
            e.preventDefault();
    
            // Prompt the user before leaving the screen
            Alert.alert(
              'Discard changes?',
              'You have unsaved changes. Are you sure to discard them and leave the screen?',
              [
                { text: "Don't leave", style: 'cancel', onPress: () => {} },
                {
                  text: 'Discard',
                  style: 'destructive',
                  // If the user confirmed, then we dispatch the action we blocked earlier
                  // This will continue the action that had triggered the removal of the screen
                  onPress: () => navigation.dispatch(e.data.action),
                },
              ]
            );
        }),
        [navigation, hasUnsavedChanges]
    );
    return(
        <> 
            <StatusBar style={colors.StatusBarColor}/>   
            <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                    <Image
                    source={require('../../assets/app_icons/back_arrow.png')}
                    style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                    resizeMode="contain"
                    resizeMethod="resize"
                    />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: colors.tertiary, fontSize: 14, top: 3}}>Home Screen Algorithm Settings</TestText>
                <TouchableOpacity style={{position: 'absolute', top: StatusBarHeight + 8, right: 10}} onPress={() => {alert('Coming soon!')}}>
                    <Text style={{color: colors.brand, fontSize: 20, fontWeight: 'bold'}}>Save</Text>
                </TouchableOpacity>
            </ChatScreen_Title>
            <ScrollView>
                <Text style={{color: colors.tertiary, fontSize: 14, textAlign: 'center', marginHorizontal: '5%'}}>SocialSquare is committed to your privacy, safety, and health. Our algorithm is fully optional and you can decide what data gets given to the algorithm to give you better posts.</Text>
                <Text style={{color: colors.errorColor, fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>This screen has not been linked up to the backend yet and does not work.</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '5%', marginVertical: 20}}>
                    <Text style={{color: colors.tertiary, fontSize: 24}}>Algorithm</Text>
                    <Switch
                        trackColor={{ false: colors.primary, true: colors.brand }}
                        thumbColor={colors.tertiary}
                        ios_backgroundColor={colors.primary}
                        onValueChange={(value) => {setAlogrithmEnabled(value)}}
                        value={alogrithmEnabled}
                    />
                </View>
                {alogrithmEnabled && (
                    <>
                        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: colors.tertiary}}>Data Collection:</Text>
                        <View style={{marginHorizontal: '5%'}}>
                            <Text style={{fontSize: 16, textAlign: 'center', color: colors.tertiary}}>This list of data is already collected as it is neccesary for SocialSquare to run. You can choose what neccesary data can be used for recommending you posts here.</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20}}>
                                <Text style={{color: colors.tertiary, fontSize: 24}}>Post Upvotes Data</Text>
                                <Switch
                                    trackColor={{ false: colors.primary, true: colors.brand }}
                                    thumbColor={colors.tertiary}
                                    ios_backgroundColor={colors.primary}
                                    onValueChange={(value) => {setUseUpvoteData(value)}}
                                    value={useUpvoteData}
                                />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20}}>
                                <Text style={{color: colors.tertiary, fontSize: 24}}>Post Downvotes Data</Text>
                                <Switch
                                    trackColor={{ false: colors.primary, true: colors.brand }}
                                    thumbColor={colors.tertiary}
                                    ios_backgroundColor={colors.primary}
                                    onValueChange={(value) => {setUseDownvoteData(value)}}
                                    value={useDownvoteData}
                                />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20}}>
                                <Text style={{color: colors.tertiary, fontSize: 24}}>Who you follow</Text>
                                <Switch
                                    trackColor={{ false: colors.primary, true: colors.brand }}
                                    thumbColor={colors.tertiary}
                                    ios_backgroundColor={colors.primary}
                                    onValueChange={(value) => {setUseFollowingData(value)}}
                                    value={useFollowingData}
                                />
                            </View>
                            <Text style={{fontSize: 16, textAlign: 'center', color: colors.tertiary}}>Decide if this data can be used and collected by SocialSquare to recommend you better posts. This list of data is not neccesary for SocialSquare to run and collection of this data can be turned on and off here at any time.</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20}}>
                                <Text style={{color: colors.tertiary, fontSize: 24}}>Location Data</Text>
                                <Switch
                                    trackColor={{ false: colors.primary, true: colors.brand }}
                                    thumbColor={colors.tertiary}
                                    ios_backgroundColor={colors.primary}
                                    value={collectAndUseLocationData}
                                    onValueChange={(value) => {setCollectAndUseLocationData(value)}}
                                />
                            </View>
                            <View style={{height: 50}}/>
                            <Text style={{color: colors.tertiary, fontSize: 14, textAlign: 'center'}}>Want to see how we use your data and make sure that it is being handled securely? Check out the SocialSquare GitHub repo to look at the code we use to run SocialSquare.</Text>
                            <TouchableOpacity style={{marginHorizontal: '20%', borderColor: colors.borderColor, borderWidth: 5, borderRadius: 20/2, marginVertical: 15}} onPressOut={() => {Linking.openURL('https://github.com/SquareTable/social-media-platform')}}>
                                <Text style={{color: colors.tertiary, fontSize: 16, textAlign: 'center', padding: 7}}>Press here to visit the SocialSquare GitHub repo</Text>
                        </TouchableOpacity>
                        </View>
                    </>
                )}
            </ScrollView>
        </>
    );
}

export default Algorithm_HomeScreenSettings;
