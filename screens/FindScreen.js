import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, ScrollView, Appearance, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import ProgressiveImage from '../posts/ProgressiveImage.js';
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

    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark') {
        //Dark mode is on
    } else {
        //Dark mode is off
    }

    const Styles = StyleSheet.create({
        container: {
            flex: 1,
            ...styling.backgroundColor
        },
    });

    const [PostRows, setPostRows] = useState([
        { post_source_one: Images.posts.profile_picture, post_one_profilepicture: Images.posts.profile_picture, post_one_username: 'sebthemancreator', post_source_two: Images.posts.background, post_two_profilepicture: Images.posts.profile_picture, post_two_username: 'sebthemancreator', post_source_three: Images.posts.clock, post_three_profilepicture: Images.posts.profile_picture, post_three_username: 'sebthemancreator', key: '1' },
        { post_source_one: Images.posts.profile_picture, post_one_profilepicture: Images.posts.profile_picture, post_one_username: 'sebthemancreator', post_source_two: Images.posts.background, post_two_profilepicture: Images.posts.profile_picture, post_two_username: 'sebthemancreator', post_source_three: Images.posts.clock, post_three_profilepicture: Images.posts.profile_picture, post_three_username: 'sebthemancreator', key: '2' },
    ]);

    const navigateToPost = (post_id, profilePictureSource, username) => {
        navigation.navigate("Post_FullScreen", {post_id, profilePictureSource, username});
    }

    const {tertiary} = Colors;
    return(
        <SafeAreaView style={Styles.container}>
            <FlatList 
                data={PostRows}
                renderItem={({ item }) => ( 
                    <View style={{flex: 2, flexDirection: 'row', ...styling.backgroundColor, marginTop: 0, marginBottom: postHeight}}>
                        <TouchableOpacity style={{minWidth: '30%', width: '30%', maxWidth: '30%', marginHorizontal: '1.6%'}} onPressOut={() => {navigateToPost(item.post_source_one, item.post_one_profilepicture, item.post_one_username)}}>
                            <ProgressiveImage
                                source={item.post_source_one}
                                style={{width: postWidth, height: postHeight, position: 'absolute'}}
                                resizeMode="contain"
                                resizeMethod="resize"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{minWidth: '30%', width: '30%', maxWidth: '30%', marginHorizontal: '1.6%'}} onPressOut={() => {navigateToPost(item.post_source_two, item.post_two_profilepicture, item.post_two_username)}}>
                            <ProgressiveImage
                                source={item.post_source_two}
                                style={{width: postWidth, height: postHeight, position: 'absolute'}}
                                resizeMode="contain"
                                resizeMethod="resize"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{minWidth: '30%', width: '30%', maxWidth: '30%', marginHorizontal: '1.6%'}} onPressOut={() => {navigateToPost(item.post_source_three, item.post_three_profilepicture, item.post_three_username)}}>
                            <ProgressiveImage
                                source={item.post_source_three}
                                style={{width: postWidth, height: postHeight, position: 'absolute'}}
                                resizeMode="contain"
                                resizeMethod="resize"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default FindScreen;

