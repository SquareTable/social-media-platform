import React from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, ScrollView, Appearance, TouchableOpacity} from 'react-native';
import ProgressiveImage from '../posts/ProgressiveImage.js';
import {darkModeStyling, darkModeOn, lightModeStyling} from '../screens/screenStylings/styling.js';
import Images from "../posts/images.js";
import { setSyntheticLeadingComments } from 'typescript';

const FindScreen = ({navigation}) => {
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }

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
        navigation.navigate("Post");
    }

    return(
        <SafeAreaView style={Styles.container}>
            <ScrollView>
                <View style={{flex: 2, flexDirection: 'row', ...styling.backgroundColor, marginTop: 0, marginBottom: 20}}>
                    <TouchableOpacity style={{minWidth: '30%', width: '30%', maxWidth: '30%', marginHorizontal: '1.6%'}} onPress={navigateToPost}>
                        <ProgressiveImage
                            source={Images.posts.clock}
                            style={{minWidth: '100%', width: '100%', maxWidth: '100%', aspectRatio: 1, position: 'absolute'}}
                            resizeMode="contain"
                            resizeMethod="resize"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{minWidth: '30%', width: '30%', maxWidth: '30%', marginHorizontal: '1.6%'}} onPress={navigateToPost}>
                        <ProgressiveImage
                            source={Images.posts.clock}
                            style={{minWidth: '100%', width: '100%', maxWidth: '100%', aspectRatio: 1, position: 'absolute'}}
                            resizeMode="contain"
                            resizeMethod="resize"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{minWidth: '30%', width: '30%', maxWidth: '30%', marginHorizontal: '1.6%'}} onPress={navigateToPost}>
                        <ProgressiveImage
                            source={Images.posts.clock}
                            style={{minWidth: '100%', width: '100%', maxWidth: '100%', aspectRatio: 1, position: 'absolute'}}
                            resizeMode="contain"
                            resizeMethod="resize"
                        />
                    </TouchableOpacity>
                </View>           
            </ScrollView>
        </SafeAreaView>
    );
};

export default FindScreen;

