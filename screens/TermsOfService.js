/* Terms of Service screen, this is coming soon */

import React from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, ScrollView, Appearance, TouchableOpacity, Dimensions } from 'react-native';
import ProgressiveImage from '../posts/ProgressiveImage.js';
import { useTheme } from '@react-navigation/native';
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
        navigation.goBack();
    }

    const {colors} = useTheme();

    return(
        <TermsOfServiceBackground style={{backgroundColor: colors.primary}}>
            <Text style={{textAlign: 'center', fontSize: 30, color: colors.tertiary, fontWeight: 'bold', marginBottom: 30}}>Terms of Service</Text>
            <ScrollView style={{marginHorizontal: 10}}>
                <Text style={{color: colors.tertiary}}>Terms of Service coming soon hehehhehehe :)</Text> 
                <TermsOfServiceGoBackButton style={{backgroundColor: colors.primary, borderColor: colors.tertiary}}onPress={goBackToSignupScreen}>
                       <TermsOfServiceGoBackButtonText style={{color: colors.tertiary}}>Go back</TermsOfServiceGoBackButtonText>
                </TermsOfServiceGoBackButton>  
            </ScrollView>
        </TermsOfServiceBackground>
    );
};

export default TermsOfService;

