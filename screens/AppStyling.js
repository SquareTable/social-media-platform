import React, {useState, useContext, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';

import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
} from './screenStylings/styling.js';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStylingContext } from '../components/AppStylingContext.js';


const AppStyling = ({navigation}) => {
    const {AppStylingContextState, setAppStylingContextState} = useContext(AppStylingContext);
    const {colors, dark} = useTheme();
    const [buttonOneSelected, setButtonOneSelected] = useState(true)
    const [buttonTwoSelected, setButtonTwoSelected] = useState(false)
    const [buttonThreeSelected, setButtonThreeSelected] = useState(false)

    useEffect(() => {
        async function ChooseWhichButtonIsSelected() {
            await AsyncStorage.getItem('AppStylingContextState').then((result) => {
                if (result == 'Default') {
                    setButtonOneSelected(true)
                    setButtonTwoSelected(false)
                    setButtonThreeSelected(false)
                } else if (result == 'Dark') {
                    setButtonOneSelected(false)
                    setButtonTwoSelected(true)
                    setButtonThreeSelected(false)
                } else if (result == 'Light') {
                    setButtonOneSelected(false)
                    setButtonTwoSelected(false)
                    setButtonThreeSelected(true)
                }
            })
        }
        ChooseWhichButtonIsSelected()
    })

    const handleButtonOnePress = async () => {
        if (buttonOneSelected == false) {
            setButtonOneSelected(true)
            setButtonTwoSelected(false)
            setButtonThreeSelected(false)
            setAppStylingContextState('Default')
            await AsyncStorage.setItem('AppStylingContextState', 'Default')
        }
    }

    const handleButtonTwoPress = async () => {
        if (buttonTwoSelected == false) {
            setButtonOneSelected(false)
            setButtonTwoSelected(true)
            setButtonThreeSelected(false)
            setAppStylingContextState('Dark')
            await AsyncStorage.setItem('AppStylingContextState', 'Dark')
        }
    }

    const handleButtonThreePress = async () => {
        if (buttonThreeSelected == false) {
            setButtonOneSelected(false)
            setButtonTwoSelected(false)
            setButtonThreeSelected(true)
            setAppStylingContextState('Light')
            await AsyncStorage.setItem('AppStylingContextState', 'Light')
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
                        <TouchableOpacity onPress={handleButtonOnePress}>
                            <Image style={{width: 110.75, height: 223.5, borderRadius: 10/2}} source={require('../assets/appstyling_fusion.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleButtonOnePress}>
                            <Text style={{fontSize: 16, color: colors.tertiary, textAlign: 'center', fontWeight: 'bold'}}>Device Default</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleButtonOnePress}>
                            <View style={{marginTop: 20, backgroundColor: colors.borderColor, minHeight: 30, height: 30, maxHeight: 30, minWidth: 30, width: 30, maxWidth: 30, borderRadius: 30/2, borderColor: buttonOneSelected ? colors.brand : colors.tertiary, borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
                                {buttonOneSelected && (
                                    <View style={{backgroundColor: colors.tertiary, minHeight: 15, height: 15, maxHeight: 15, minWidth: 15, width: 15, maxWidth: 15, borderRadius: 15/2}}/>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                        <TouchableOpacity onPress={handleButtonTwoPress}>
                            <Image style={{width: 110.75, height: 223.5, borderRadius: 10/2}} source={require('../assets/appstyling_darkmode.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleButtonTwoPress}>
                            <Text style={{fontSize: 16, color: colors.tertiary, textAlign: 'center', fontWeight: 'bold'}}>Dark</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleButtonTwoPress}>
                            <View style={{marginTop: 20, backgroundColor: colors.borderColor, minHeight: 30, height: 30, maxHeight: 30, minWidth: 30, width: 30, maxWidth: 30, borderRadius: 30/2, borderColor: buttonTwoSelected ? colors.brand : colors.tertiary, borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
                                {buttonTwoSelected && (
                                    <View style={{backgroundColor: colors.tertiary, minHeight: 15, height: 15, maxHeight: 15, minWidth: 15, width: 15, maxWidth: 15, borderRadius: 15/2}}/>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                        <TouchableOpacity onPress={handleButtonThreePress}>
                            <Image style={{width: 110.75, height: 223.5, borderRadius: 10/2}} source={require('../assets/appstyling_lightmode.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleButtonThreePress}>
                            <Text style={{fontSize: 16, color: colors.tertiary, textAlign: 'center', fontWeight: 'bold'}}>Light</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleButtonThreePress}>
                            <View style={{marginTop: 20, backgroundColor: colors.borderColor, minHeight: 30, height: 30, maxHeight: 30, minWidth: 30, width: 30, maxWidth: 30, borderRadius: 30/2, borderColor: buttonThreeSelected ? colors.brand : colors.tertiary, borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
                                {buttonThreeSelected && (
                                    <View style={{backgroundColor: colors.tertiary, minHeight: 15, height: 15, maxHeight: 15, minWidth: 15, width: 15, maxWidth: 15, borderRadius: 15/2}}/>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={{marginHorizontal: '15%', width: '70%', minWidth: '70%', maxWidth: '70%', backgroundColor: colors.primary, borderColor: colors.borderColor, borderWidth: 2, borderRadius: 50, marginVertical: 20}} onPress={() => {navigation.navigate('CustomizeAppStyling')}}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: colors.tertiary, textAlign: 'center'}}>Customize styling</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AppStyling;
