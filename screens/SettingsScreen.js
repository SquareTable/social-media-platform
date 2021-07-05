import React from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

const SettingsScreen = ({navigation}) => {
    return(
        <SafeAreaView style={Styles.container}>
            <Text>Settings Screen</Text>
            <TouchableOpacity style={{backgroundColor: "#184727", width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50}}>
                <View>
                    <Text>Hi</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: "#927431", width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50}}>
                <View>
                    <Text>Hi</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: "#543187", width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50}}>
                <View>
                    <Text>Hi</Text>
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