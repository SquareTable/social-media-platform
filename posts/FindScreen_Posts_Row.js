import React from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, ScrollView, Appearance, TouchableOpacity, Dimensions } from 'react-native';
import ProgressiveImage from './ProgressiveImage.js';
import {darkModeStyling, darkModeOn, lightModeStyling} from '../screens/screenStylings/styling.js';
import Images from "./images.js";
import { setSyntheticLeadingComments } from 'typescript';

const FindScreen_Posts_Row = ({navigation}) => {
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
    
    const navigateToPost = () => {
        navigation.navigate("Post_FullScreen");
    }

    return(
        <View style={{flex: 2, flexDirection: 'row', ...styling.backgroundColor, marginTop: 0, marginBottom: postHeight}}>
            <TouchableOpacity style={{minWidth: '30%', width: '30%', maxWidth: '30%', marginHorizontal: '1.6%'}} onPressOut={navigateToPost}>
                <ProgressiveImage
                    source={Images.posts.clock}
                    style={{width: postWidth, height: postHeight, position: 'absolute'}}
                    resizeMode="contain"
                    resizeMethod="resize"
                />
            </TouchableOpacity>
            <TouchableOpacity style={{minWidth: '30%', width: '30%', maxWidth: '30%', marginHorizontal: '1.6%'}} onPressOut={navigateToPost}>
                <ProgressiveImage
                    source={Images.posts.clock}
                    style={{width: postWidth, height: postHeight, position: 'absolute'}}
                    resizeMode="contain"
                    resizeMethod="resize"
                />
            </TouchableOpacity>
            <TouchableOpacity style={{minWidth: '30%', width: '30%', maxWidth: '30%', marginHorizontal: '1.6%'}} onPressOut={navigateToPost}>
                <ProgressiveImage
                    source={Images.posts.clock}
                    style={{width: postWidth, height: postHeight, position: 'absolute'}}
                    resizeMode="contain"
                    resizeMethod="resize"
                />
            </TouchableOpacity>
        </View>
    );
};

export { FindScreen_Posts_Row} ;

