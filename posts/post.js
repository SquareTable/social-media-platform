import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, TouchableNativeFeedbackBase} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import styled from "styled-components";
import Images from "../posts/images.js";
import ProgressiveImage from './ProgressiveImage.js';
import { useNavigation } from '@react-navigation/native';

const StatusBarHeight = Constants.statusBarHeight;
import {darkModeStyling, darkModeOn, lightModeStyling} from '../screens/screenStylings/styling.js';

const Post = (props) => {
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }
    const navigation = useNavigation(); 
    const goToProfileScreen = () => {
        navigation.navigate("Welcome");
        alert("We need to make it so there is a back button to go back to the homescreen");
    }
    const { postSource } = props;
    return(
        <View style={{minWidth: 500, maxWidth: 500, width: 500, ...styling.backgroundColor, alignSelf: 'center', zIndex: 100}}>
            <View style={{maxWidth: 500, minWidth: 500, width: 500, alignContent: 'center', alignItems: 'center', alignSelf: 'center',}}>
                <View style={{maxWidth: 400, minWidth: 400}}>
                    <TouchableOpacity onPressOut={goToProfileScreen}>
                        <View style={{flex: 2, flexDirection:'row'}}>
                            <View style={{width:60}}>
                                <Image
                                    source={Images.posts.profile_picture}
                                    style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, position:'absolute', left:13}}
                                    resizeMode="contain"
                                    resizeMethod="resize"
                                />
                                <View style={{width:'100%', minHeight:42, height:42}}/>
                            </View>
                            <View style={{width:'100%'}}>
                                <Text style={{...styling.textColor, textAlign: 'left', fontWeight:'bold', fontSize: 20, textAlignVertical:'bottom'}}>SebTheMan</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{...styling.backgroundColor, maxWidth: 400, minWidth: 400}}>
                        <ProgressiveImage
                            source={postSource}
                            style={{minHeight: 400, minWidth: 400, width: 400, height: 400, maxWidth: 400, maxHeight: 400}}
                            resizeMode="contain"
                            resizeMethod="resize"
                        />
                    </View>
                    <View style={{flex: 2, flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                        <View style={{height: 50, width: 65}}>
                            <TouchableOpacity>
                                <Image
                                    source={Images.posts.heart}
                                    style={{...styling.like_comment_save_buttons, ...styling.tintColor}}
                                    resizeMode="contain"
                                    resizeMethod="resize"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{width: 50}}>
                            <TouchableOpacity>
                                <Image
                                    source={Images.posts.message_bubbles}
                                    style={{...styling.like_comment_save_buttons, ...styling.tintColor}}
                                    resizeMode="contain"
                                    resizeMethod="resize"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{width:50, position:'absolute', right: 20}}>
                            <TouchableOpacity>
                                <Image
                                    source={Images.posts.bookmark}
                                    style={{...styling.like_comment_save_buttons, ...styling.tintColor}}
                                    resizeMode="contain"
                                    resizeMethod="resize"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Post;