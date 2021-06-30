import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import styled from "styled-components";

const StatusBarHeight = Constants.statusBarHeight;

var onPressSettings=() => {
    alert("Breakups are shit");
}

const HomeScreen = ({navigation}) => {
    return(
        <SafeAreaView style={Styles.container}>
            <TouchableOpacity onPressIn={() => {onPressSettings();}}>
                <Image
                    source={require('../assets/app_icons/settings.png')} 
                    style={{ width: 40, height: 40, position: 'absolute', right: 1, top: 20}}
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

/*const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight}px;
    backgroundColor: #08F1ED
`*/

const Styles = StyleSheet.create({
    color_container: {
        marginTop: -Constants.statusBarHeight,
        backgroundColor: '#08F1ED',
        marginTop: Constants.statusBarHeight,
    },
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: '#08F1ED',
    },
});