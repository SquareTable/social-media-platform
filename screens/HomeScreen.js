import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import styled from "styled-components";
import Images from "../posts/images.js";
import Post from "../posts/post.js";
import {darkModeStyling, darkModeOn, lightModeStyling} from '../screens/screenStylings/styling.js';


const HomeScreen = ({navigation}) => {
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }
    return(
        <SafeAreaView
         style={{flex: 1, ...styling.backgroundColor, paddingLeft: 10}}
         >
            <Text style={{fontSize: 30, fontWeight: 'bold', alignContent: 'center', alignItems: 'center', alignSelf: 'center', ...styling.textColor}}>SocialSquare</Text>
            <ScrollView>
                <Post></Post>
                <Post></Post>
                <Post></Post>
                <Post></Post>
                <Post></Post>
                <Post></Post>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const Styles = StyleSheet.create({
    
});