import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
    Colors,
    SearchBarArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    ProfileOptionsView,
    StyledFormArea,
    StyledButton,
    ButtonText
} from './screenStylings/styling.js'
import Icon from 'react-native-vector-icons/Entypo';
import Constants from 'expo-constants';

import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import { Formik } from 'formik';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStylingContext } from '../components/AppStylingContext.js';

const BuiltInStylingMenu = ({navigation}) => {
    const {dark, colors} = useTheme()
    const StatusBarHeight = Constants.statusBarHeight
    const {AppStylingContextState, setAppStylingContextState} = useContext(AppStylingContext);

    const {darkLight, brand} = Colors;

    const handlePress = async (style) => {
        console.log('Setting color styling to ' + style)
        setAppStylingContextState(style)
        await AsyncStorage.setItem('AppStylingContextState', style)
    }

    const styleData = [
        {displayName: 'Pure Dark', name: 'PureDark', alertInfo: 'This style sets the background to be pure black and text color and images to be pure white.'},
        {displayName: 'Pure Light', name: 'PureLight', alertInfo: 'This style sets the background to be pure white and text color and images to be pure black.'},
    ]

    return (
            <>
                <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                    <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                            <Image
                            source={require('../assets/app_icons/back_arrow.png')}
                            style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                            resizeMode="contain"
                            resizeMethod="resize"
                            />
                    </Navigator_BackButton>
                    <TestText style={{textAlign: 'center', color: colors.tertiary}}>Built-In Styling</TestText>
                </ChatScreen_Title>
                <View style={{height: '100%', backgroundColor: colors.primary}}>
                    <FlatList
                        data={styleData}
                        keyExtractor={(item, index) => 'key'+index}
                        renderItem={({ item, index }) => ( 
                            <View style={{borderColor: colors.borderColor, borderWidth: 3, flex: 1, paddingVertical: 20, flexDirection: 'row', borderTopWidth: index != 0 ? 1.5 : 3, borderBottomWidth: styleData.length - 1 == index ? 3 : 1.5, primaryColor: colors.primary}}>
                                <TouchableOpacity style={{flexDirection: 'row', width: '100%'}} onPress={() => {handlePress(item.name)}}>
                                    <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold'}}>{item.displayName}</Text>
                                        {console.log('AppStylingContextState is: ' + AppStylingContextState)}
                                        <View style={{backgroundColor: colors.borderColor, minHeight: 45, height: 45, maxHeight: 45, minWidth: 45, width: 45, maxWidth: 45, borderRadius: 45/2, borderColor: AppStylingContextState == item.name ? colors.brand : colors.tertiary, borderWidth: 2, position: 'absolute', right: 10, top: -10}}>
                                            {AppStylingContextState == item.name && (
                                                <View style={{backgroundColor: dark ? 'black' : colors.tertiary, marginTop: 5, marginLeft: 5.5, minHeight: 30, height: 30, maxHeight: 30, minWidth: 30, width: 30, maxWidth: 30, borderRadius: 30/2}}/>
                                            )}
                                        </View>
                                        <TouchableOpacity onPress={() => {alert(item.alertInfo)}} style={{position: 'absolute', top: -12, right: 70}}>
                                            <Octicons name={'info'} size={50} color={colors.tertiary} />
                                        </TouchableOpacity>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </>
    );
}

export default BuiltInStylingMenu;