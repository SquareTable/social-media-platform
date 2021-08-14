import React from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, ScrollView, Appearance, TouchableOpacity, Dimensions } from 'react-native';
import ProgressiveImage from '../posts/ProgressiveImage.js';
import {darkModeStyling, darkModeOn, lightModeStyling} from '../screens/screenStylings/styling.js';
import Images from "../posts/images.js";
import { setSyntheticLeadingComments } from 'typescript';
import { FindScreen_Posts_Row } from '../posts/FindScreen_Posts_Row.js';

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

    const navigateToPost = () => {
        navigation.navigate("Post_FullScreen");
    }

    return(
        <SafeAreaView style={Styles.container}>
            <ScrollView>
                <View style={{flex: 3, flexDirection: 'column', ...styling.backgroundColor}}>
                    <FindScreen_Posts_Row/>
                    <FindScreen_Posts_Row/>
                    <FindScreen_Posts_Row/>
                    <FindScreen_Posts_Row/>
                </View>           
            </ScrollView>
        </SafeAreaView>
    );
};

export default FindScreen;

