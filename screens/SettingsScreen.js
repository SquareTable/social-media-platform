import React from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

const SettingsScreen = ({navigation}) => {
    return(
        <SafeAreaView style={Styles.container}>
            <Text style={{textAlign: 'center'}}>Settings Screen</Text>
            <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 10, maxHeight: 10, minHeight: 10}}/>
            <TouchableOpacity style={{backgroundColor: "#184727", width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50}} onPressIn={() => alert("Need to learn how to have both a Stack Navigator and a Bottom Tabs Navigator in the same Expo app before I can make this work")}>
                <View>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: '20pt'}}>Badges</Text>
                </View>
            </TouchableOpacity>
            <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 10, maxHeight: 10, minHeight: 10}}/>
            <TouchableOpacity style={{backgroundColor: "#924871", width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50}} onPressIn={() => alert("More settings coming soon")}>
                <View>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: '20pt'}}>More settings coming soon</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};



export default SettingsScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08F1ED'
    },
});