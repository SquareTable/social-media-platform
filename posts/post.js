import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import styled from "styled-components";
import Images from "../posts/images.js";

const StatusBarHeight = Constants.statusBarHeight;

const Post = ({navigation}) => {
    return(
        <View style={Styles.post_background}>
            <View style={Styles.post}>
                <View style={{backgroundColor: '#FF0000', maxWidth: 500, minWidth: 500}}>
                    <Image
                        source={Images.posts.clock}
                        style={{width: 500, height: 500}}
                        resizeMode="contain"
                        resizeMethod="resize"
                    />
                    </View>
                    <Text style={{color: "white"}}>Like and comment buttons will go here</Text>
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