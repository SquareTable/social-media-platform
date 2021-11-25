import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
} from '../screenStylings/styling.js'
import Icon from 'react-native-vector-icons/Entypo';
import Constants from 'expo-constants';

import {Octicons} from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const EditSimpleStyle = ({navigation, route}) => {
    const {name, type, dark, primary, tertiary, borderColor, background, secondary, darkLight, brand, green, red, darkest, greyish, bronzeRarity, darkestBlue, StatusBarColor, navFocusedColor, navNonFocusedColor, orange, yellow, purple, slightlyLighterGrey, midWhite, slightlyLighterPrimary, descTextColor} = route.params;
    const [showCrossAndTick, setShowCrossAndTick] = useState(false)
    const StatusBarHeight = Constants.statusBarHeight

    const leaveAndSave = async () => {
        let currentSimpleStyleData = await AsyncStorage.getItem('simpleStylingData')
        currentSimpleStyleData = JSON.parse(currentSimpleStyleData)
        for (let i = 0; i < currentSimpleStyleData.length; i++) {
            console.log(currentSimpleStyleData[i].indexNum)
            console.log(currentSimpleStyleData)
            if (currentSimpleStyleData[i].name == name) {
                let tempData = currentSimpleStyleData;
                console.log(tempData)
                console.log(i)
                tempData.splice(i, 1)
                
            }
        }
        let tempLength = currentSimpleStyleData.length
        currentSimpleStyleData.push({name: name, indexNum: tempLength, dark: dark, colors: {primary: primary, tertiary: tertiary, borderColor: borderColor, background: primary, secondary: secondary, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navNonFocusedColor: navNonFocusedColor, navFocusedColor: navFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterPrimary, descTextColor: descTextColor}})
        console.log(currentSimpleStyleData)
        AsyncStorage.setItem('simpleStylingData', JSON.stringify(currentSimpleStyleData))
        navigation.navigate('SimpleStylingMenu', {ableToRefresh: true})
    }
    return (
        <>
            <ChatScreen_Title style={{backgroundColor: primary, borderWidth: 0}}>
                <Navigator_BackButton onPress={() => {showCrossAndTick == true ? navigation.goBack() : setShowCrossAndTick(true)}}>
                    {showCrossAndTick == false ?
                        <Image
                        source={require('../../assets/app_icons/back_arrow.png')}
                        style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: tertiary}}
                        resizeMode="contain"
                        resizeMethod="resize"
                        />
                    :
                        <Octicons name={"x"} size={40} color={tertiary} />
                    }
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: tertiary}}>Edit {name}</TestText>
                {showCrossAndTick != false &&
                    <TouchableOpacity onPress={leaveAndSave} style={{position: 'absolute', right: 10, top: StatusBarHeight + 2}}>
                        <Icon name="save" size={40} color={tertiary}/>
                    </TouchableOpacity>
                }
            </ChatScreen_Title>
            <View style={{backgroundColor: primary, height: '100%'}}>
                <ScrollView contentContainerStyle={{flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: primary}}>
                    <TouchableOpacity style={{justifyContent: 'center', borderColor: borderColor, borderWidth: 3, marginVertical: 10, borderRadius: 50, padding: 20, width: '90%'}} onPress={() => {
                        setShowCrossAndTick(false)
                        navigation.navigate('Simple_ColorPickerScreen', {name: name, type: 'primary', dark: dark, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterPrimary, descTextColor: descTextColor});
                    }}>
                        <Text style={{fontSize: 20, color: tertiary, fontWeight: 'bold', textAlign: 'center'}}>Background Color</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent: 'center', borderColor: borderColor, borderWidth: 3, marginVertical: 10, borderRadius: 50, padding: 20, width: '90%'}} onPress={() => {
                        setShowCrossAndTick(false)
                        navigation.navigate('Simple_ColorPickerScreen', {name: name, type: 'tertiary', dark: dark, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterPrimary, descTextColor: descTextColor});
                    }}>
                        <Text style={{fontSize: 20, color: tertiary, fontWeight: 'bold', textAlign: 'center'}}>Text and Image Tint Color</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent: 'center', borderColor: borderColor, borderWidth: 3, marginVertical: 10, borderRadius: 50, padding: 20, width: '90%'}} onPress={() => {
                        setShowCrossAndTick(false)
                        navigation.navigate('Simple_ColorPickerScreen', {name: name, type: 'borderColor', dark: dark, primary: primary, tertiary: tertiary, borderColor: borderColor, background: background, darkLight: darkLight, brand: brand, green: green, red: red, darkest: darkest, greyish: greyish, bronzeRarity: bronzeRarity, darkestBlue: darkestBlue, StatusBarColor: StatusBarColor, navFocusedColor: navFocusedColor, navNonFocusedColor: navNonFocusedColor, orange: orange, yellow: yellow, purple: purple, slightlyLighterGrey: slightlyLighterGrey, midWhite: midWhite, slightlyLighterPrimary: slightlyLighterPrimary, descTextColor: descTextColor});
                    }}>
                        <Text style={{fontSize: 20, color: tertiary, fontWeight: 'bold', textAlign: 'center'}}>Border Color</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    );
}

export default EditSimpleStyle;