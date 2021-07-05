import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';

var onPressSettings=() => {
    alert("Once I learn how to make there be a Bottom Tabs Navigator and a Stack Navigator in the same project, I will make this settings icon take you to the settings screen");
}

const ProfileScreen = ({navigation}) => {
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#08F1ED', paddingLeft: 10}}>
            <TouchableOpacity onPressIn={() => navigation.navigate('Settings')} activeOpacity={0.5} style={{maxHeight: 15, minHeight: 15}}>
                <Image
                    source={require('../assets/app_icons/settings.png')} 
                    style={{ width: 40, height: 40, position: 'absolute', right: 20, top: 10, zIndex: 9999999999}}
                    resizeMode="contain"
                    resizeMethod="resize"
                />
            </TouchableOpacity>
            <Text style={{fontSize: 20, fontWeight: 'bold', alignContent: 'center', alignItems: 'center', alignSelf: 'center'}}>PROFILE NAME HERE</Text>
            <ScrollView>
                <Text style={{fontSize: 30}}>Profile stuff will go here</Text>
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