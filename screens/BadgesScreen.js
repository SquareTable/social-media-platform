/*This is going to be used as the testing screen*/

import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, SafeAreaView, StatusBar, Dimensions, FlatList} from 'react-native';
import AppStyling from './AppStylingScreen';
import {darkModeStyling, darkModeOn, lightModeStyling} from '../screens/screenStylings/styling.js';

const screenWidth = Dimensions.get('window').width;

const BadgesScreen = ({navigation}) => {
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }
    const Styles = StyleSheet.create({
        container: {
            ...styling.backgroundColor,
            flex: 1,
        },
        containerText: {
            textAlign: 'center',
            ...styling.textColor
        },  
    });
    return(
        <SafeAreaView style={Styles.container}>
            <ScrollView style={{flex: 1}}>
                <View>
                    <Text style={Styles.containerText}>Badges Screen</Text>
                    <Text style={Styles.containerText}>This will be used for testing since it is the least of our priorities</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                    <Text style={Styles.containerText}>Testing</Text>
                </View>
                <View style={{height: 100}} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default BadgesScreen;