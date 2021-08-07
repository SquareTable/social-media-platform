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
        { postSource: Images.posts.clock, key: '1' },
        { postSource: Images.posts.clock, key: '2' },
        { postSource: Images.posts.clock, key: '3' },
        { postSource: Images.posts.clock, key: '4' },
        { postSource: Images.posts.clock, key: '5' },
        { postSource: Images.posts.clock, key: '6' },
        { postSource: Images.posts.clock, key: '7' },
        { postSource: Images.posts.clock, key: '8' },
        { postSource: Images.posts.clock, key: '9' },
        { postSource: Images.posts.clock, key: '10' },
        { postSource: Images.posts.clock, key: '11' },
        { postSource: Images.posts.clock, key: '12' },
        { postSource: Images.posts.clock, key: '13' },
        { postSource: Images.posts.clock, key: '14' },
        { postSource: Images.posts.clock, key: '15' },
        { postSource: Images.posts.clock, key: '16' },
        { postSource: Images.posts.clock, key: '17' },
        { postSource: Images.posts.clock, key: '18' },
        { postSource: Images.posts.clock, key: '19' },
        { postSource: Images.posts.clock, key: '20' },
        { postSource: Images.posts.clock, key: '21' },
        { postSource: Images.posts.clock, key: '22' },
        { postSource: Images.posts.clock, key: '23' },
        { postSource: Images.posts.clock, key: '24' },
        { postSource: Images.posts.clock, key: '25' },
        { postSource: Images.posts.clock, key: '26' },
        { postSource: Images.posts.clock, key: '27' },
        { postSource: Images.posts.clock, key: '28' },
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