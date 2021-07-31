import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import styled from "styled-components";
import Images from "../posts/images.js";
import Post from "../posts/post.js";

const darkMode = "#2E3440";
const lightMode = "#D8DEE9"


const HomeScreen = ({navigation}) => {
    return(
        <SafeAreaView
         style={{flex: 1, backgroundColor: '#2E3440', paddingLeft: 10}}
         >
            <Text style={{fontSize: 30, fontWeight: 'bold', alignContent: 'center', alignItems: 'center', alignSelf: 'center', color: "#ECEFF4"}}>SocialSquare</Text>
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
    centerItems: {
        paddingLeft: '50%',
        paddingRight: '50%',
    },
    centerText: {
        textAlign: 'center'
    },
    post: {
        maxWidth: 500,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },
    post_background: {
        minWidth: 600,
        maxWidth: 600,
        backgroundColor: '#2E3440',
        alignSelf: 'center',
    },
});