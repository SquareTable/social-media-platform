import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import styled from "styled-components";
import Images from "../posts/images.js";
import Post from "../posts/post.js";

const HomeScreen = ({navigation}) => {
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#08F1ED', paddingLeft: 10}}>
            <Text style={{fontSize: 30, fontWeight: 'bold', alignContent: 'center', alignItems: 'center', alignSelf: 'center'}}>SocialSquare</Text>
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
        backgroundColor: '#333333',
        alignSelf: 'center',
    },
});