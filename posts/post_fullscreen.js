import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, TouchableNativeFeedbackBase} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import styled from "styled-components";
import Images from "../posts/images.js";
import ProgressiveImage from './ProgressiveImage.js';

const StatusBarHeight = Constants.statusBarHeight;
import {darkModeStyling, darkModeOn, lightModeStyling} from '../screens/screenStylings/styling.js';
import Post from './post.js';

const Post_FullScreen = ({navigation}) => {
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }
    return(
        <ScrollView style={styling.backgroundColor}>
            <View style={{marginTop: 20}}/>
            <Post postSource={Images.posts.clock} profilePictureSource={Images.posts.profile_picture} username={'sebthemancreator'}></Post>
        </ScrollView>
    );
};

export default Post_FullScreen;