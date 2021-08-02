import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import AppStyling from './AppStylingScreen';
import {darkModeStyling, darkModeOn, lightModeStyling} from '../screens/screenStylings/styling.js';

const LoginScreen = ({navigation}) => {
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }
    
    const Styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            ...styling.backgroundColor
        },
    });

    return(
        <View style={Styles.container}>
            <Text style={{fontWeight: 'bold', fontSize: 30, ...styling.textColor}}>Login Screen</Text>
            <Text style={{fontWeight: 'bold', fontSize: 30, ...styling.textColor}}>COMING SOONNNNNNNN</Text>
            <Text style={{fontWeight: 'bold', fontSize: 20, ...styling.textColor}}>Press the doge gif to temporarily login</Text>
            <TouchableOpacity onPressIn={() => navigation.replace('Profile Name Here')}>
                <Image
                    source={require('../assets/doge.gif')}
                    resizeMode = 'contain'
                    style={{
                        width: 200,
                        height: 200
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;