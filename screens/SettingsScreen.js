import React from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import {darkModeStyling, darkModeOn, lightModeStyling} from '../screens/screenStylings/styling.js';
if (darkModeOn === true) {
    var styling = darkModeStyling;
} else {
    var styling = lightModeStyling;
}

const SettingsScreen = ({navigation}) => {
    return(
        <SafeAreaView style={{flex: 1, ...styling.backgroundColor}}>
            <ScrollView style={{flex: 1}}>
                <View style={Styles.flex_row}>
                    <TouchableOpacity style={styling.settingsButtonTouchableOpacity} onPressIn={() => navigation.navigate('Login')}>
                        <View>
                            <Text style={styling.settingsButtonText}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={Styles.flex_row}>
                    <TouchableOpacity style={styling.settingsButtonTouchableOpacity} onPressIn={() => navigation.navigate('Change Username')}>
                        <View>
                            <Text style={styling.settingsButtonText}>Change Username</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styling.settingsButtonTouchableOpacity} onPressIn={() => navigation.navigate('Change Password')}>
                        <View>
                            <Text style={styling.settingsButtonText}>Change Password</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={Styles.flex_row}>
                    <TouchableOpacity style={styling.settingsButtonTouchableOpacity} onPressIn={() => navigation.navigate('Account Settings')}>
                        <View>
                            <Text style={styling.settingsButtonText}>Account Settings</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styling.settingsButtonTouchableOpacity} onPressIn={() => navigation.navigate('App Styling')}>
                        <View>
                            <Text style={styling.settingsButtonText}>App Styling</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{width: '100%', minWidth: '100%', maxWidth: '100%'}}>
                    <Text style={{fontSize: 18, textAlign: 'center', ...styling.textColor}}>Made by Sebastian Webster, Kovid Dev, and Jacob Bowen</Text>
                    <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 5, maxHeight: 5, minHeight: 5}}/>
                    <Text style={{fontSize: 16, textAlign: 'center', ...styling.textColor}}>© SquareTable 2021</Text>
                    <Text style={{fontSize: 16, textAlign: 'center', ...styling.textColor}}>All Rights Reserved</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};



export default SettingsScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E3440'
    },
    flex_row: {
        flex: 2,
        flexDirection: 'row',
        marginTop: 20
    }
});