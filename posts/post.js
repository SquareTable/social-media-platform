import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import styled from "styled-components";
import Images from "../posts/images.js";
import ProgressiveImage from './ProgressiveImage.js';

const StatusBarHeight = Constants.statusBarHeight;
import {darkModeStyling, darkModeOn, lightModeStyling} from '../screens/screenStylings/styling.js';

const Post = ({navigation}) => {
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }
    return(
        <View style={{minWidth: 500, maxWidth: 500, width: 500, ...styling.backgroundColor, alignSelf: 'center',}}>
            <View style={{maxWidth: 500, minWidth: 500, width: 500, alignContent: 'center', alignItems: 'center', alignSelf: 'center',}}>
                <View style={{maxWidth: 400, minWidth: 400}}>
                    <Text style={{...styling.textColor, textAlign: 'center'}}>Profile pic and username goes here</Text>
                    <View style={{...styling.backgroundColor, maxWidth: 400, minWidth: 400}}>
                        <ProgressiveImage
                            source={Images.posts.clock}
                            style={{minHeight: 400, minWidth: 400, width: 400, height: 400, maxWidth: 400, maxHeight: 400}}
                            resizeMode="contain"
                            resizeMethod="resize"
                        />
                    </View>
                    <Text style={{...styling.textColor, textAlign: 'center'}}>Like and comment buttons will go here</Text>
                </View>
            </View>
        </View>
    );
};

export default Post;