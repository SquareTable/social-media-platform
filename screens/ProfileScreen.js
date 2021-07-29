import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';

const ProfileScreen = ({navigation}) => {
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#2E3440', paddingLeft: 10}}>
            <TouchableOpacity onPressIn={() => navigation.navigate('Settings')} activeOpacity={0.5} style={{maxHeight: 55, minHeight: 55}}>
                <Image
                    source={require('../assets/app_icons/settings.png')} 
                    style={{ width: 40, height: 40, position: 'absolute', right: 20, top: 10, zIndex: 9999999999, tintColor: '#ECEFF4'}}
                    resizeMode="contain"
                    resizeMethod="resize"
                />
            </TouchableOpacity>
            <ScrollView>
                <Text style={{fontSize: 30, color: '#ECEFF4'}}>Profile stuff will go here</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08F1ED'
    },
});