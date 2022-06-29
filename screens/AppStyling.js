import React, {useState, useContext, useEffect, useRef} from 'react';
import {useTheme} from '@react-navigation/native';

import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
} from './screenStylings/styling.js';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStylingContext } from '../components/AppStylingContext.js';
import { ExperimentalFeaturesEnabledContext } from '../components/ExperimentalFeaturesEnabledContext.js';


const AppStyling = ({navigation}) => {
    const {AppStylingContextState, setAppStylingContextState} = useContext(AppStylingContext);
    const {experimentalFeaturesEnabled, setExperimentalFeaturesEnabled} = useContext(ExperimentalFeaturesEnabledContext);
    const {colors, dark} = useTheme();

    console.log('Primary color is: ' + colors.primary)

    const handleButtonOnePress = async () => {
        if (AppStylingContextState != 'Default') {
            await AsyncStorage.setItem('AppStylingContextState', 'Default');
            setAppStylingContextState('Default');
        }
    }

    const handleButtonTwoPress = async () => {
        if (AppStylingContextState != 'Dark') {
            await AsyncStorage.setItem('AppStylingContextState', 'Dark')
            setAppStylingContextState('Dark')
        }
    }

    const handleButtonThreePress = async () => {
        if (AppStylingContextState != 'Light') {
            await AsyncStorage.setItem('AppStylingContextState', 'Light')
            setAppStylingContextState('Light')
        }
    }
    return(
        <View style={{height: '100%'}}>
            <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                    <Image
                    source={require('../assets/app_icons/back_arrow.png')}
                    style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                    resizeMode="contain"
                    resizeMethod="resize"
                    />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>App Styling</TestText>
            </ChatScreen_Title>
            <View style={{justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', alignSelf: 'center', flex: 3}}>
                <View style={{flex: 2, alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                        <TouchableOpacity onPress={handleButtonOnePress} disabled={AppStylingContextState == 'Default'}>
                            <Image style={{width: 110.75, height: 223.5, borderRadius: 10/2}} source={require('../assets/appstyling_fusion.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleButtonOnePress} disabled={AppStylingContextState == 'Default'}>
                            <Text style={{fontSize: 16, color: colors.tertiary, textAlign: 'center', fontWeight: 'bold'}}>Device Default</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleButtonOnePress} disabled={AppStylingContextState == 'Default'}>
                            <View style={{marginTop: 20, backgroundColor: colors.borderColor, minHeight: 30, height: 30, maxHeight: 30, minWidth: 30, width: 30, maxWidth: 30, borderRadius: 30/2, borderColor: AppStylingContextState == 'Default' ? colors.brand : colors.tertiary, borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
                                {AppStylingContextState == 'Default' && (
                                    <View style={{backgroundColor: colors.tertiary, minHeight: 15, height: 15, maxHeight: 15, minWidth: 15, width: 15, maxWidth: 15, borderRadius: 15/2}}/>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                        <TouchableOpacity onPress={handleButtonTwoPress} disabled={AppStylingContextState == 'Dark'}>
                            <Image style={{width: 110.75, height: 223.5, borderRadius: 10/2}} source={require('../assets/appstyling_darkmode.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleButtonTwoPress} disabled={AppStylingContextState == 'Dark'}>
                            <Text style={{fontSize: 16, color: colors.tertiary, textAlign: 'center', fontWeight: 'bold'}}>Dark</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleButtonTwoPress} disabled={AppStylingContextState == 'Dark'}>
                            <View style={{marginTop: 20, backgroundColor: colors.borderColor, minHeight: 30, height: 30, maxHeight: 30, minWidth: 30, width: 30, maxWidth: 30, borderRadius: 30/2, borderColor: AppStylingContextState == 'Dark' ? colors.brand : colors.tertiary, borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
                                {AppStylingContextState == 'Dark' && (
                                    <View style={{backgroundColor: colors.tertiary, minHeight: 15, height: 15, maxHeight: 15, minWidth: 15, width: 15, maxWidth: 15, borderRadius: 15/2}}/>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                        <TouchableOpacity onPress={handleButtonThreePress} disabled={AppStylingContextState == 'Light'}>
                            <Image style={{width: 110.75, height: 223.5, borderRadius: 10/2}} source={require('../assets/appstyling_lightmode.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleButtonThreePress} disabled={AppStylingContextState == 'Light'}>
                            <Text style={{fontSize: 16, color: colors.tertiary, textAlign: 'center', fontWeight: 'bold'}}>Light</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleButtonThreePress} disabled={AppStylingContextState == 'Light'}>
                            <View style={{marginTop: 20, backgroundColor: colors.borderColor, minHeight: 30, height: 30, maxHeight: 30, minWidth: 30, width: 30, maxWidth: 30, borderRadius: 30/2, borderColor: AppStylingContextState == 'Light' ? colors.brand : colors.tertiary, borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
                                {AppStylingContextState == 'Light' && (
                                    <View style={{backgroundColor: colors.tertiary, minHeight: 15, height: 15, maxHeight: 15, minWidth: 15, width: 15, maxWidth: 15, borderRadius: 15/2}}/>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {experimentalFeaturesEnabled && (
                <>
                    <TouchableOpacity style={{flexDirection: 'column', alignItems: 'center', marginHorizontal: '15%', width: '70%', minWidth: '70%', maxWidth: '70%', backgroundColor: colors.primary, borderColor: colors.borderColor, borderWidth: 2, borderRadius: 50}} onPress={() => {navigation.navigate('BuiltInStylingMenu')}}>
                        <Text style={{fontSize: 24, fontWeight: 'bold', color: colors.tertiary, textAlign: 'center'}}>Other Styles</Text>
                        <View style={{marginVertical: 10, backgroundColor: colors.borderColor, minHeight: 30, height: 30, maxHeight: 30, minWidth: 30, width: 30, maxWidth: 30, borderRadius: 30/2, borderColor: AppStylingContextState != 'Dark' && AppStylingContextState != 'Light' && AppStylingContextState != 'Default' && AppStylingContextState != 'PureDark' && AppStylingContextState != 'PureLight' ? colors.brand : colors.tertiary, borderWidth: 2}}>
                            {AppStylingContextState == 'PureLight' || AppStylingContextState == 'PureDark' ? (
                                <View style={{backgroundColor: colors.tertiary, marginTop: 5, marginLeft: 5.5, minHeight: 15, height: 15, maxHeight: 15, minWidth: 15, width: 15, maxWidth: 15, borderRadius: 15/2}}/>
                            ) : null}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'column', alignItems: 'center', marginHorizontal: '15%', width: '70%', minWidth: '70%', maxWidth: '70%', backgroundColor: colors.primary, borderColor: colors.borderColor, borderWidth: 2, borderRadius: 50, marginVertical: 20}} onPress={() => {navigation.navigate('SimpleStylingMenu', {ableToRefresh: false, indexNumToUse: null, backToProfileScreen: false})}}>
                        <Text style={{fontSize: 24, fontWeight: 'bold', color: colors.tertiary, textAlign: 'center'}}>Custom Styling</Text>
                        <View style={{marginVertical: 10, backgroundColor: colors.borderColor, minHeight: 30, height: 30, maxHeight: 30, minWidth: 30, width: 30, maxWidth: 30, borderRadius: 30/2, borderColor: AppStylingContextState != 'Dark' && AppStylingContextState != 'Light' && AppStylingContextState != 'Default' && AppStylingContextState != 'PureDark' && AppStylingContextState != 'PureLight' ? colors.brand : colors.tertiary, borderWidth: 2}}>
                            {AppStylingContextState != 'Dark' && AppStylingContextState != 'Light' && AppStylingContextState != 'Default' && AppStylingContextState != 'PureLight' && AppStylingContextState != 'PureDark' && (
                                <View style={{backgroundColor: colors.tertiary, marginTop: 5, marginLeft: 5.5, minHeight: 15, height: 15, maxHeight: 15, minWidth: 15, width: 15, maxWidth: 15, borderRadius: 15/2}}/>
                            )}
                        </View>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

export default AppStyling;
