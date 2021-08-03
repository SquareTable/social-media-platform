import { StyleSheet} from 'react-native';


var darkModeOn = false;

/* Transfer all settings pages over to the dark mode switching system */

var darkModeStyling = StyleSheet.create({
    textColor: {
        color: '#ECEFF4'
    },
    oppositeTextColor: {
        color: '#2E3440'
    },
    tintColor: {
        tintColor: '#ECEFF4'
    },
    oppositeTintColor: {
        tintColor: '#2E3440'
    },
    borderColor: {
        borderColor: '#ECEFF4'
    },
    backgroundColor: {
        backgroundColor: '#2E3440'
    },
    oppositeBackgroundColor: {
        backgroundColor: '#ECEFF4'
    },
    navBackgroundColor: {
        backgroundColor: '#3B4252'
    },
    navFocusedColor: {
        color: '#88C0D0'
    },
    settingsButtonTouchableOpacity: {
        backgroundColor: '#3B4252', 
        width: '40%', 
        maxWidth: '40%', 
        minWidth: '40%', 
        height: 50, 
        maxHeight: 50, 
        minHeight: 50, 
        borderColor: '#5E81AC', 
        borderWidth: 5, 
        borderRadius: 50/2, 
        marginLeft: '5%', 
        marginRight: '5%'
    },
    settingsButtonText: {
        color: '#ECEFF4',
        fontSize: 14, 
        textAlign: 'center', 
        textAlignVertical: 'center', 
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    like_comment_save_buttons: {
        minHeight: 40, 
        minWidth: 40, 
        width: 40, 
        height: 40, 
        maxWidth: 40, 
        maxHeight: 40, 
        position:'absolute', 
        left:15
    }
})

var lightModeStyling = StyleSheet.create({
    textColor: {
        color: '#2E3440'
    },
    oppositeTextColor: {
        color: '#ECEFF4'
    },
    tintColor: {
        tintColor: '#2E3440'
    },
    oppositeTintColor: {
        tintColor: '#ECEFF4'
    },
    borderColor: {
        borderColor: '#2E3440'
    },
    backgroundColor: {
        backgroundColor: '#ECEFF4'
    },
    oppositeBackgroundColor: {
        backgroundColor: '#2E3440'
    },
    navBackgroundColor: {
        backgroundColor: '#D8DEE9'
    },
    settingsButtonTouchableOpacity: {
        backgroundColor: '#D8DEE9',
        width: '40%', 
        maxWidth: '40%', 
        minWidth: '40%', 
        height: 50, 
        maxHeight: 50, 
        minHeight: 50, 
        borderColor: '#5E81AC', 
        borderWidth: 5, 
        borderRadius: 50/2, 
        marginLeft: '5%', 
        marginRight: '5%'
    },
    settingsButtonText: {
        color: '#2E3440',
        fontSize: 14, 
        textAlign: 'center', 
        textAlignVertical: 'center', 
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    like_comment_save_buttons: {
        minHeight: 40, 
        minWidth: 40, 
        width: 40, 
        height: 40, 
        maxWidth: 40, 
        maxHeight: 40, 
        position:'absolute', 
        left:15
    }
})

var lightModeStyling_navFocusedColor = '#5E81AC';
var darkModeStyling_navFocusedColor = '#88C0D0';
var darkModeStyling_navNonFocusedColor = '#ECEFF4';
var lightModeStyling_navNonFocusedColor = '#2E3440';



export {
    darkModeStyling, 
    darkModeOn, 
    lightModeStyling, 
    lightModeStyling_navFocusedColor, 
    darkModeStyling_navFocusedColor, 
    darkModeStyling_navNonFocusedColor, 
    lightModeStyling_navNonFocusedColor
};