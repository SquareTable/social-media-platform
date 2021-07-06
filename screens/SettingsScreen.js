import React from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

const SettingsScreen = ({navigation}) => {
    return(
        <SafeAreaView style={Styles.container}>
            <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 20, maxHeight: 20, minHeight: 20}}/>
            <TouchableOpacity style={{backgroundColor: "#08AAF1", width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50}} onPressIn={() => navigation.navigate('Badges')}>
                <View>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', textAlignVertical: 'center', justifyContent: 'center'}}>Badges</Text>
                </View>
            </TouchableOpacity>
            <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 20, maxHeight: 20, minHeight: 20}}/>
            <TouchableOpacity style={{backgroundColor: "#08AAF1", width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50}} onPressIn={() => navigation.navigate('Login')}>
                <View>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', textAlignVertical: 'center', justifyContent: 'center'}}>Login</Text>
                </View>
            </TouchableOpacity>
            <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 20, maxHeight: 20, minHeight: 20}}/>
            <TouchableOpacity style={{backgroundColor: "#08AAF1", width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50}} onPressIn={() => navigation.navigate('Change Username')}>
                <View>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', textAlignVertical: 'center', justifyContent: 'center'}}>Change Username</Text>
                </View>
            </TouchableOpacity>
            <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 20, maxHeight: 20, minHeight: 20}}/>
            <TouchableOpacity style={{backgroundColor: "#08AAF1", width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50}} onPressIn={() => navigation.navigate('Change Password')}>
                <View>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', textAlignVertical: 'center', justifyContent: 'center'}}>Change Password</Text>
                </View>
            </TouchableOpacity>
            <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 20, maxHeight: 20, minHeight: 20}}/>
            <TouchableOpacity style={{backgroundColor: "#08AAF1", width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50}} onPressIn={() => navigation.navigate('Account Settings')}>
                <View>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', textAlignVertical: 'center', justifyContent: 'center'}}>Account Settings</Text>
                </View>
            </TouchableOpacity>
            <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 20, maxHeight: 20, minHeight: 20}}/>
            <TouchableOpacity style={{backgroundColor: "#08AAF1", width: '100%', maxWidth: '100%', minWidth: '100%', height: 50, maxHeight: 50, minHeight: 50}} onPressIn={() => alert("More settings coming soon")}>
                <View>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', textAlignVertical: 'center', justifyContent: 'center'}}>More settings coming soon</Text>
                </View>
            </TouchableOpacity>
            <View style={{width: '100%', minWidth: '100%', maxWidth: '100%'}}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>Made by Sebastian Webster and Kovid Dev</Text>
                <View style={{width: '100%', maxWidth: '100%', minWidth: '100%', height: 5, maxHeight: 5, minHeight: 5}}/>
                <Text style={{fontSize: 16, textAlign: 'center', color: 'gray'}}>© (coming soon) 2021</Text>
            </View>
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