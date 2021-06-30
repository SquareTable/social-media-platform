import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Alert} from 'react-native';

const StackNavigator = createStackNavigator();

var onPressSettings=() => {
    alert("Breakups are shit");
}

const settingsButtonTopRight = ({navigation}) => {
    return(
        <View>
            <TouchableOpacity onPressIn={() => {onPressSettings();}}>
                <Image
                    source={require('../assets/app_icons/settings.png')} 
                    style={{ width: 30, height: 30, position: 'absolute', right: 20, top: 40 }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default settingsButtonTopRight;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#08F1ED'
    },
});