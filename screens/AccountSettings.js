import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, Switch} from 'react-native';
import {darkModeStyling, darkModeOn, lightModeStyling} from '../screens/screenStylings/styling.js';

const AccountSettings = ({navigation}) => {
    if (darkModeOn === true) {
        var styling = darkModeOn;
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
            <ScrollView>
            <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold', ...styling.textColor}}>Account Screen</Text>
            <Text style={{textAlign: 'center', fontSize: 25, ...styling.textColor}}>Coming soon :)</Text>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', ...styling.textColor}}>Add account privacy settings here</Text>
            <View style={{height: 20, maxHeight: 20, minHeight: 20, width: '100%', minWidth: '100%', maxWidth: '100%'}}/>
            <Image
                source={require('../assets/doge.gif')}
                resizeMode = 'contain'
                style={{
                    width: 200,
                    height: 200,
                    paddingLeft: '50%',
                    paddingRight: '50%'
                }}
            />
            </ScrollView>
        </SafeAreaView>
    );
};

export default AccountSettings;