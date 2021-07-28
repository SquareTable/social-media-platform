import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import styled from "styled-components";
import Images from "../posts/images.js";
import ProgressiveImage from './ProgressiveImage.js';

const StatusBarHeight = Constants.statusBarHeight;

const Post = ({navigation}) => {
    return(
        <View style={Styles.post_background}>
            <View style={Styles.post}>
                <View style={{maxWidth: 400, minWidth: 400}}>
                    <Text style={{color: '#ECEFF4', textAlign: 'center'}}>Profile pic and username goes here</Text>
                    <View style={{backgroundColor: '#2E3440', maxWidth: 400, minWidth: 400}}>
                        <ProgressiveImage
                            source={Images.posts.clock}
                            style={{minHeight: 400, minWidth: 400, width: 400, height: 400, maxWidth: 400, maxHeight: 400}}
                            resizeMode="contain"
                            resizeMethod="resize"
                        />
                    </View>
                    <Text style={{color: "#ECEFF4", textAlign: 'center'}}>Like and comment buttons will go here</Text>
                </View>
            </View>
        </View>
    );
};

export default Post;

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
        minWidth: 500,
        width: 500,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },
    post_background: {
        minWidth: 500,
        maxWidth: 500,
        width: 500,
        backgroundColor: '#2E3440',
        alignSelf: 'center',
    },
});