import React from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, Switch} from 'react-native';
import {darkModeStyling, darkModeOn, lightModeStyling} from '../screens/screenStylings/styling.js';

const PostScreen = ({navigation}) => {
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }

    const Styles = StyleSheet.create({
        container: {
            flex: 1,
            ...styling.backgroundColor
        },
    });
    
    return(
        <SafeAreaView style={Styles.container}>
            <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold', ...styling.textColor}}>Post Screen</Text>
            <Text style={{textAlign: 'center', fontSize: 20, ...styling.textColor}}>Coming soon :)</Text>
        </SafeAreaView>
    );
};

export default PostScreen;