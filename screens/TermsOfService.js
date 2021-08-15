/* Terms of Service screen, this is coming soon */

import React from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, ScrollView, Appearance, TouchableOpacity, Dimensions } from 'react-native';
import ProgressiveImage from '../posts/ProgressiveImage.js';
import {
    darkModeStyling, 
    darkModeOn, 
    lightModeStyling,
    TermsOfServiceGoBackButton,
    TermsOfServiceGoBackButtonText,
    TermsOfServiceBackground
} from '../screens/screenStylings/styling.js';
import Images from "../posts/images.js";
import { setSyntheticLeadingComments } from 'typescript';
import { FindScreen_Posts_Row } from '../posts/FindScreen_Posts_Row.js';

const TermsOfService = ({navigation}) => {
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

    const goBackToSignupScreen = () => {
        navigation.navigate("Signup");
    }

    return(
        <TermsOfServiceBackground>
            <Text style={{textAlign: 'center', fontSize: 30, ...styling.textColor, fontWeight: 'bold', marginBottom: 30}}>Terms of Service</Text>
            <ScrollView style={{marginHorizontal: 10}}>
                <Text style={{...styling.textColor}}>Terms of Service coming soon hehehhehehe :)</Text> 
                <TermsOfServiceGoBackButton onPress={goBackToSignupScreen}>
                       <TermsOfServiceGoBackButtonText>Go back</TermsOfServiceGoBackButtonText>
                </TermsOfServiceGoBackButton>  
            </ScrollView>
        </TermsOfServiceBackground>
    );
};

export default TermsOfService;

