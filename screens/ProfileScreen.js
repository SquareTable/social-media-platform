import React, {useLayoutEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {darkModeStyling, darkModeOn} from '../screens/screenStylings/styling.js';

const ProfileScreen = ({navigation}) => {
    if (darkModeOn === true) {
        useLayoutEffect(() => {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity>
                        <MaterialIcons 
                        name="logout" 
                        size={24} 
                        color="#ECEFF4"
                        onPress={() => navigation.replace('Login')}
                        />
                    </TouchableOpacity>
                )
            })
        }, [])
    } else {
        useLayoutEffect(() => {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity>
                        <MaterialIcons 
                        name="logout" 
                        size={24} 
                        color="#2E3440"
                        onPress={() => navigation.replace('Login')}
                        />
                    </TouchableOpacity>
                )
            })
        }, [])
    }
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#2E3440', paddingLeft: 10}}>
            <TouchableOpacity onPressIn={() => navigation.navigate('Settings')} activeOpacity={0.5} style={{maxHeight: 55, minHeight: 55}}>
                <Image
                    source={require('../assets/app_icons/settings.png')} 
                    style={{ width: 40, height: 40, position: 'absolute', right: 20, top: 10, zIndex: 9999999999, tintColor: '#ECEFF4'}}
                    resizeMode="contain"
                    resizeMethod="resize"
                />
            </TouchableOpacity>
            <ScrollView>
                <Text style={{fontSize: 30, color: '#ECEFF4'}}>Profile stuff will go here</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08F1ED'
    },
});