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
                <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 20, maxHeight: 20, minHeight: 20}}/>
                <TouchableOpacity style={{...styling.navBackgroundColor, width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50, borderTopColor: '#5E81AC', borderBottomColor: '#5E81AC', borderBottomWidth: 5, borderTopWidth: 5}} onPressIn={() => navigation.navigate('Badges')}>
                    <View>
                        <Text style={{...styling.textColor, fontWeight: 'bold', fontSize: 20, textAlign: 'center', textAlignVertical: 'center', justifyContent: 'center'}}>Badges</Text>
                    </View>
                </TouchableOpacity>
                <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 20, maxHeight: 20, minHeight: 20}}/>
                <TouchableOpacity style={{...styling.navBackgroundColor, width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50, borderTopColor: '#5E81AC', borderBottomColor: '#5E81AC', borderBottomWidth: 5, borderTopWidth: 5}} onPressIn={() => navigation.navigate('Login')}>
                    <View>
                        <Text style={{...styling.textColor, fontWeight: 'bold', fontSize: 20, textAlign: 'center', textAlignVertical: 'center', justifyContent: 'center'}}>Login</Text>
                    </View>
                </TouchableOpacity>
                <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 20, maxHeight: 20, minHeight: 20}}/>
                <TouchableOpacity style={{...styling.navBackgroundColor, width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50, borderTopColor: '#5E81AC', borderBottomColor: '#5E81AC', borderBottomWidth: 5, borderTopWidth: 5}} onPressIn={() => navigation.navigate('Change Username')}>
                    <View>
                        <Text style={{...styling.textColor, fontWeight: 'bold', fontSize: 20, textAlign: 'center', textAlignVertical: 'center', justifyContent: 'center'}}>Change Username</Text>
                    </View>
                </TouchableOpacity>
                <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 20, maxHeight: 20, minHeight: 20}}/>
                <TouchableOpacity style={{...styling.navBackgroundColor, width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50, borderTopColor: '#5E81AC', borderBottomColor: '#5E81AC', borderBottomWidth: 5, borderTopWidth: 5}} onPressIn={() => navigation.navigate('Change Password')}>
                    <View>
                        <Text style={{...styling.textColor, fontWeight: 'bold', fontSize: 20, textAlign: 'center', textAlignVertical: 'center', justifyContent: 'center'}}>Change Password</Text>
                    </View>
                </TouchableOpacity>
                <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 20, maxHeight: 20, minHeight: 20}}/>
                <TouchableOpacity style={{...styling.navBackgroundColor, width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50, borderTopColor: '#5E81AC', borderBottomColor: '#5E81AC', borderBottomWidth: 5, borderTopWidth: 5}} onPressIn={() => navigation.navigate('Account Settings')}>
                    <View>
                        <Text style={{...styling.textColor, fontWeight: 'bold', fontSize: 20, textAlign: 'center', textAlignVertical: 'center', justifyContent: 'center'}}>Account Settings</Text>
                    </View>
                </TouchableOpacity>
                <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 20, maxHeight: 20, minHeight: 20}}/>
                <TouchableOpacity style={{...styling.navBackgroundColor, width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50, borderTopColor: '#5E81AC', borderBottomColor: '#5E81AC', borderBottomWidth: 5, borderTopWidth: 5}} onPressIn={() => navigation.navigate('App Styling')}>
                    <View>
                        <Text style={{...styling.textColor, fontWeight: 'bold', fontSize: 20, textAlign: 'center', textAlignVertical: 'center', justifyContent: 'center'}}>App Styling</Text>
                    </View>
                </TouchableOpacity>
                <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 20, maxHeight: 20, minHeight: 20}}/>
                <TouchableOpacity style={{...styling.navBackgroundColor, width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50, borderTopColor: '#5E81AC', borderBottomColor: '#5E81AC', borderBottomWidth: 5, borderTopWidth: 5}} onPressIn={() => alert("More settings coming soon")}>
                    <View>
                        <Text style={{...styling.textColor, fontWeight: 'bold', fontSize: 20, textAlign: 'center', textAlignVertical: 'center', justifyContent: 'center'}}>More settings coming soon</Text>
                    </View>
                </TouchableOpacity>
                <View style={{width: '100%', minWidth: '100%', maxWidth: '100%'}}>
                    <Text style={{fontSize: 18, textAlign: 'center', ...styling.textColor}}>Made by Sebastian Webster, Kovid Dev, and Jacob Bowen</Text>
                    <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 5, maxHeight: 5, minHeight: 5}}/>
                    <Text style={{fontSize: 16, textAlign: 'center', ...styling.textColor}}>© (coming soon) 2021</Text>
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
});