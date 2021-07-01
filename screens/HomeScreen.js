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
    return(
        <SafeAreaView style={Styles.container}>
            <TouchableOpacity onPressIn={() => {onPressSettings();}} activeOpacity={0.5}>
                    <Image
                        source={require('../assets/app_icons/settings.png')} 
                        style={{ width: 40, height: 40, position: 'absolute', right: 20, top: 10}}
                        resizeMode="contain"
                        resizeMethod="resize"
                    />
            </TouchableOpacity>
            <View style={{paddingLeft: 15}}>
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
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: '#08F1ED',
    },
});