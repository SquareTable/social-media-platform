import { StyleSheet } from 'react-native';

var darkModeOn = true;

var darkModeStyling = StyleSheet.create({
    darkModeText: {
        color: '#ECEFF4'
    },
    darkModeBackgroundColor: {
        backgroundColor: '#2E3440'
    }
})



export {darkModeStyling, darkModeOn};