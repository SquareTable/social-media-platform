import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, Platform, FlatList, Dimensions, RefreshControl} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Images from "../posts/images.js";
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
    Avatar,
    StyledContainer,
    ProfileHorizontalView,
    ProfileHorizontalViewItem,
    ProfIcons,
    ProfInfoAreaImage,
    ProfileBadgesView,
    ProfileBadgeIcons,
    ProfilePostsSelectionView,
    ProfilePostsSelectionBtns,
    ProfileGridPosts,
    ProfileFeaturedPosts,
    ProfileTopBtns,
    TopButtonIcons,
    BackgroundDarkColor,
    darkModeOn,
    darkModeStyling,
    lightModeStyling,
    ProfileOptionsView,
    ProfileOptionsViewButtons,
    ProfileOptionsViewButtonsText,
    ProfileOptionsViewText,
    ProfileOptionsViewSubtitleText,
    ReportProfileOptionsView,
    ReportProfileOptionsViewButtons,
    ReportProfileOptionsViewButtonsText,
    ReportProfileOptionsViewSubtitleText,
    ReportProfileOptionsViewText,
    BackgroundDarkColor_SafeAreaView,
    ChatScreenNavigator_Title,
    TestText,
    FlexRow,
    FlexRow_NOJustifyContent,
    ViewHider,
    ChatScreenNavigator_Row_Styling
} from '../screens/screenStylings/styling.js';
import { useNavigation, useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ChatScreenNavigator_Row = (props) => {
    var deviceWidth = Dimensions.get('window').width
    var pictureSize = deviceWidth / 100 * 11
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }
    const { username, user_profile_pic, displayName } = props;
    const navigation = useNavigation();
    const {colors} = useTheme();
    return(
        <ChatScreenNavigator_Row_Styling style={{backgroundColor: colors.primary, borderWidth: 0}} onPress={() => {navigation.navigate('Chat', {username: username, user_profile_pic: user_profile_pic, displayName: displayName});}}>
            <Image
                source={user_profile_pic || require('../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/266-question.png')}
                style={{minHeight: pictureSize, minWidth: pictureSize, width: pictureSize, height: pictureSize, maxWidth: pictureSize, maxHeight: pictureSize, borderRadius: 10000/2, marginLeft: 10, marginTop: 10, flex: 2}}
                resizeMode="cover"
                resizeMethod="resize"
            />
            <View style={{width: '86%'}}>
                <TestText numberOfLines={1} ellipsizeMode='tail' style={{marginTop: 15, color: colors.tertiary, flex: 1, marginLeft: '3%', marginRight: '15%', textAlign: 'left'}}>{username || "Couldn't get name"}</TestText>
            </View>
            <TouchableOpacity style={{position: 'absolute', right: 10, marginTop: 10, flex: 2}}onPress={() => {alert("Coming soon")}}>
                <Image
                    source={require('../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/016-camera.png')}
                    style={{minHeight: pictureSize, minWidth: pictureSize, width: pictureSize, height: pictureSize, maxWidth: pictureSize, maxHeight: pictureSize, tintColor: colors.tertiary, flex: 2}}
                    resizeMode="contain"
                    resizeMethod="resize"
                />
            </TouchableOpacity>
        </ChatScreenNavigator_Row_Styling>
    );
};


const ChatScreenNavigator = ({navigation}) => {
    const [directMessages, setDirectMessages] = useState();
    async function GetChatList() {
        var DMsList = await AsyncStorage.getItem('SocialSquareDMsList')
        DMsList == null? setDirectMessages([]) : setDirectMessages(JSON.parse(DMsList))
    }
    GetChatList();
    const {colors} = useTheme();

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(async () => {
        //Pull to refresh code goes here
        // Fetch data from server if you pull to refresh
        setRefreshing(true)
        // Check if data has been refreshed code goes here
        // Replace dataHasBeenRefreshed var and if statement with an actual check for data
        const dataHasBeenRefreshed = true
        if (dataHasBeenRefreshed == true) {
            setRefreshing(false)
        }
    })


    return(
        <BackgroundDarkColor_SafeAreaView style={{backgroundColor: colors.primary}}>
            <ChatScreenNavigator_Title style={{borderWidth: 0}}>
                <FlexRow_NOJustifyContent>
                    <SubTitle marginLeft={'10px'} style={{color: colors.tertiary}}>SocialSquare DMs</SubTitle>
                    <TouchableOpacity style={{position: 'absolute', right: 10}}onPress={() => {navigation.navigate("CreateChatScreen")}}>
                        <Image
                            source={require('../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/074-compass.png')}
                            style={{minHeight: 30, minWidth: 30, width: 30, height: 30, maxWidth: 30, maxHeight: 30, tintColor: colors.tertiary}}
                            resizeMode="contain"
                            resizeMethod="resize"
                        />
                    </TouchableOpacity>
                </FlexRow_NOJustifyContent>
            </ChatScreenNavigator_Title>
            <FlatList 
                data={directMessages}
                keyExtractor={(item, index) => 'key'+index}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={
                    <View style={{marginTop: '80%'}}>
                        <TestText style={{color: colors.tertiary, fontSize: 25}}>No messages to show here</TestText>
                        <StyledButton onPress={() => {navigation.navigate('CreateChatScreen')}} style={{width: '75%', marginLeft: '12.5%'}}>
                            <ButtonText>Create a new message</ButtonText>
                        </StyledButton>
                    </View>
                }
                renderItem={({ item }) => ( 
                    <ChatScreenNavigator_Row username={item.username} user_profile_pic={item.user_profile_pic} displayName={item.displayName}/>
                )}
            />
        </BackgroundDarkColor_SafeAreaView>
    );
};



export default ChatScreenNavigator;