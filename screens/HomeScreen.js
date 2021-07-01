import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import styled from "styled-components";

const StatusBarHeight = Constants.statusBarHeight;

var onPressSettings=() => {
    alert("KING KOVID");
}

const HomeScreen = ({navigation}) => {
    /*   LIST OF THINGS TO DO TO THIS PAGE (HomeScreen.js):
        -Get settings button to work at the top of the screen for iOS and Android
        -Add a little bit of padding to SafeAreaView for iOS and Android
    */
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#08F1ED', paddingLeft: 10}}>
            <TouchableOpacity onPressIn={() => {onPressSettings();}} activeOpacity={0.5}>
                    <Image
                        source={require('../assets/app_icons/settings.png')} 
                        style={{ width: 40, height: 40, position: 'absolute', right: 20, top: 10, zIndex: 9999999999}}
                        resizeMode="contain"
                        resizeMethod="resize"
                    />
            </TouchableOpacity>
            <Text style={{fontSize: 30}}>SocialSquare</Text>
            <Text>Home Screen</Text>
            <Image
                source={require('../assets/doge.gif')}
                resizeMode = 'contain'
                style={{
                    width: 200,
                    height: 200,
                }}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;

const Styles = StyleSheet.create({

});