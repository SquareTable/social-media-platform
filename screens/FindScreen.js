import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, ScrollView, Appearance, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import ProgressiveImage from '../posts/ProgressiveImage.js';
import SearchBar from "react-native-dynamic-search-bar";
import { useTheme } from '@react-navigation/native';

import {
    darkModeStyling, 
    darkModeOn, 
    lightModeStyling,
    Colors
} from '../screens/screenStylings/styling.js';
import Images from "../posts/images.js";
import { setSyntheticLeadingComments } from 'typescript';

const FindScreen = ({navigation}) => {
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }

    var deviceWidth = Dimensions.get('window').width
    var postWidth = deviceWidth / 3.1
    var postHeight = postWidth

    const [PostRows, setPostRows] = useState([
        { post_source_one: Images.posts.profile_picture, post_one_profilepicture: Images.posts.profile_picture, post_one_username: 'sebthemancreator', post_source_two: Images.posts.background, post_two_profilepicture: Images.posts.profile_picture, post_two_username: 'sebthemancreator', post_source_three: Images.posts.sad_pepe, post_three_profilepicture: Images.posts.profile_picture, post_three_username: 'sebthemancreator', key: '1' },
        { post_source_one: Images.posts.profile_picture, post_one_profilepicture: Images.posts.profile_picture, post_one_username: 'sebthemancreator', post_source_two: Images.posts.background, post_two_profilepicture: Images.posts.profile_picture, post_two_username: 'sebthemancreator', post_source_three: Images.posts.sad_pepe, post_three_profilepicture: Images.posts.profile_picture, post_three_username: 'sebthemancreator', key: '2' },
        { post_source_one: Images.posts.profile_picture, post_one_profilepicture: Images.posts.profile_picture, post_one_username: 'sebthemancreator', post_source_two: Images.posts.background, post_two_profilepicture: Images.posts.profile_picture, post_two_username: 'sebthemancreator', post_source_three: Images.posts.sad_pepe, post_three_profilepicture: Images.posts.profile_picture, post_three_username: 'sebthemancreator', key: '3' },
        { post_source_one: Images.posts.profile_picture, post_one_profilepicture: Images.posts.profile_picture, post_one_username: 'sebthemancreator', post_source_two: Images.posts.background, post_two_profilepicture: Images.posts.profile_picture, post_two_username: 'sebthemancreator', post_source_three: Images.posts.sad_pepe, post_three_profilepicture: Images.posts.profile_picture, post_three_username: 'sebthemancreator', key: '4' },
    ]);

    const navigateToPost = (post_id, profilePictureSource, username) => {
        navigation.navigate("Post_FullScreen", {post_id, profilePictureSource, username});
    }

    const {tertiary, primary} = Colors;
    const {width, height} = Dimensions.get('window');
    const {colors, dark} = useTheme();
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: colors.primary}}>
            <SearchBar
                darkMode={dark? true : false}
                style={{marginVertical: 10}}
                placeholder="Search here"
                onChangeText={(text) => {console.log(text)}}
                onSearchPress={() => console.log("Search Icon is pressed")}
                onClearPress={() => console.log("Clear")}
                onPress={() => console.log("onPress")}
            />
            <FlatList 
                data={PostRows}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => ( 
                    <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: colors.primary, marginTop: 0, marginBottom: postHeight - 8}}>
                        <TouchableOpacity style={{width: postWidth}} onPressOut={() => {navigateToPost(item.post_source_one, item.post_one_profilepicture, item.post_one_username)}}>
                            <ProgressiveImage
                                source={item.post_source_one}
                                style={{width: postWidth, height: postHeight, position: 'absolute', resizeMode: 'contain', aspectRatio: 1, flex: 1}}
                                resizeMode="cover"
                                resizeMethod="resize"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: postWidth}} onPressOut={() => {navigateToPost(item.post_source_two, item.post_two_profilepicture, item.post_two_username)}}>
                            <ProgressiveImage
                                source={item.post_source_two}
                                style={{width: postWidth, height: postHeight, position: 'absolute', resizeMode: 'contain', aspectRatio: 1, flex: 1}}
                                resizeMode="cover"
                                resizeMethod="resize"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: postWidth}} onPressOut={() => {navigateToPost(item.post_source_three, item.post_three_profilepicture, item.post_three_username)}}>
                            <ProgressiveImage
                                source={item.post_source_three}
                                style={{width: postWidth, height: postHeight, position: 'absolute', resizeMode: 'contain', aspectRatio: 1, flex: 1}}
                                resizeMode="cover"
                                resizeMethod="resize"
                            />
                        </TouchableOpacity>
                        <View style={{marginTop: 10}}/>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default FindScreen;

