import React, { useState } from 'react';
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
    const [people, setPeople] = useState([
        { postSource: Images.posts.social_studies_1, key: '1' },
        { postSource: Images.posts.social_studies_2, key: '2' },
        { postSource: Images.posts.clock, key: '3' },
        { postSource: Images.posts.clock, key: '4' },
        { postSource: Images.posts.clock, key: '5' },
    ]);
    return(
        <SafeAreaView
         style={{flex: 1, ...styling.backgroundColor, paddingLeft: 10}}
         >
            <Text style={{fontSize: 30, fontWeight: 'bold', alignContent: 'center', alignItems: 'center', alignSelf: 'center', ...styling.textColor}}>SocialSquare</Text>
            <FlatList 
                data={people} 
                renderItem={({ item }) => ( 
                    <Post postSource={item.postSource}></Post>
                )}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;