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
} from '../screenStylings/styling.js'
import Icon from 'react-native-vector-icons/Entypo';
import Constants from 'expo-constants';

import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import { Formik } from 'formik';

import KeyboardAvoidingWrapper_NoScrollview from '../../components/KeyboardAvoidingWrapper_NoScrollview.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStylingContext } from '../../components/AppStylingContext.js';

const SimpleStylingMenu = ({navigation, route}) => {
    const {dark, colors} = useTheme()
    const StatusBarHeight = Constants.statusBarHeight
    const [NamingNewStyle, setNamingNewStyle] = useState(true);
    const [message, handleMessage] = useState('')
    const [simpleStylingData, setSimpleStylingData] = useState([])
    const [listOfDataGettingDeleted, setListOfDataGettingDeleted] = useState([])
    const [temp, setTemp] = useState()
    const {AppStylingContextState, setAppStylingContextState} = useContext(AppStylingContext);
    const {ableToRefresh} = route.params;

    const {darkLight, brand} = Colors;

    const UserTextInput = ({label, icon, isPassword, ...props}) => {
        const {colors, dark} = useTheme();
        return(
            <SearchBarArea>
                <LeftIcon style={{top: 30}}>
                    <Octicons name={"pencil"} size={20} color={brand} />
                </LeftIcon>
                <StyledInputLabel>{label}</StyledInputLabel>
                <StyledTextInput style={{backgroundColor: colors.primary, color: colors.tertiary, borderColor: colors.borderColor}} searchPage={true} {...props}/>
            </SearchBarArea>
        )
    }

    const handleNewCreation = (name) => {
        for (let i = 0; i < simpleStylingData.length; i++) {
            if (simpleStylingData[i].name == name) {
                handleMessage('You already have a simple style called ' + name + '. Please choose a different name.')
                return
            }
        }
        handleMessage('')
        setNamingNewStyle(true)
        let tempData =  simpleStylingData
        let tempLength = tempData.length
        tempData.push({
            name: name, 
            indexNum: tempLength, 
            dark: true,
            colors: {
                primary: colors.primary, 
                tertiary: colors.tertiary, 
                borderColor: colors.borderColor,
                background: colors.background,
                secondary: colors.secondary,
                darkLight: colors.darkLight,
                brand: colors.brand,
                green: colors.green,
                red: colors.red,
                darkest: colors.darkest,
                greyish: colors.greyish,
                bronzeRarity: colors.bronzeRarity,
                darkestBlue: colors.darkestBlue,
                StatusBarColor: colors.StatusBarColor,
                navFocusedColor: colors.navFocusedColor,
                navNonFocusedColor: colors.navNonFocusedColor,
                orange: colors.orange,
                yellow: colors.yellow,
                purple: colors.purple,
                slightlyLighterGrey: colors.slightlyLighterGrey,
                midWhite: colors.midWhite,
                slightlyLighterPrimary: colors.slightlyLighterPrimary,
                descTextColor: colors.descTextColor
            }
        })
        AsyncStorage.setItem('simpleStylingData', JSON.stringify(tempData))
        setSimpleStylingData(tempData)
        setTemp(temp => temp == 'abc' ? 'cba' : 'abc')
    }

    useEffect(() => {
        async function getSimpleStylingData() {
            const data = await AsyncStorage.getItem('simpleStylingData');
            if (data != null) {
                setSimpleStylingData(JSON.parse(data));
            }
        }
        getSimpleStylingData()
    }, [])

    const cancelDelete = (indexNumber) => {
        for (let i = 0; i < listOfDataGettingDeleted.length; i++) {
            console.log(listOfDataGettingDeleted[i])
            if (listOfDataGettingDeleted[i] == indexNumber) {
                let tempData = listOfDataGettingDeleted;
                tempData.splice(i, 1)
                setListOfDataGettingDeleted(tempData)
                setTemp(temp => temp == 'abc' ? 'cba' : 'abc')
            }
        }
    }

    const confirmDelete = (name, indexNumber) => {
        for (let i = 0; i < simpleStylingData.length; i++) {
            console.log(simpleStylingData[i].indexNum)
            console.log(simpleStylingData)
            if (simpleStylingData[i].name == name) {
                let tempData = simpleStylingData;
                console.log(tempData)
                console.log(i)
                if (tempData[i].indexNum == AppStylingContextState) {
                    setAppStylingContextState('Default')
                }
                tempData.splice(i, 1)
                setSimpleStylingData(tempData)
                AsyncStorage.setItem('simpleStylingData', JSON.stringify(tempData))
                console.log(tempData)
                cancelDelete(indexNumber)
            }
        }
    }

    const handlePress = async (indexNum) => {
        setAppStylingContextState(indexNum.toString())
        await AsyncStorage.setItem('AppStylingContextState', indexNum.toString())
    }

    return (
        <KeyboardAvoidingWrapper_NoScrollview style={{backgroundColor: colors.primary}}>
            <>
                <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                    <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                            <Image
                            source={require('../../assets/app_icons/back_arrow.png')}
                            style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                            resizeMode="contain"
                            resizeMethod="resize"
                            />
                    </Navigator_BackButton>
                    <TestText style={{textAlign: 'center', color: colors.tertiary}}>Simple Styling</TestText>
                    <TouchableOpacity onPress={() => {setNamingNewStyle(NamingNewStyle == true ? false : true)}} style={{position: 'absolute', right: NamingNewStyle == true ? 10 : 15, top: StatusBarHeight + 2}}>
                        {NamingNewStyle == true ?
                            <Icon name="plus" size={40} color={colors.tertiary}/>
                        :
                            <Octicons name={"x"} size={40} color={colors.tertiary} />
                        }
                    </TouchableOpacity>
                </ChatScreen_Title>
                <ProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={NamingNewStyle}>
                    <ScrollView style={{width: '92%', backgroundColor: colors.primary}}>
                        <Text style={{color: colors.tertiary, fontSize: 30, textAlign: 'center'}}>Create new styling</Text>
                        <Formik
                            initialValues={{name: ''}}
                            onSubmit={(values) => {
                                if (values.name == '') {
                                    handleMessage('Please fill all the fields.');
                                } else {
                                    handleNewCreation(values.name)
                                    values.name = ''
                                }
                            }}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                                <>
                                    <View style={{marginLeft: '10%'}}>
                                        <StyledFormArea style={{width: '100%'}}>
                                            <UserTextInput
                                                placeholder="Name"
                                                placeholderTextColor={colors.tertiary}
                                                onChangeText={handleChange('name')}
                                                onBlur={handleBlur('name')}
                                                value={values.name}
                                                style={{backgroundColor: colors.primary, color: colors.tertiary, borderColor: colors.borderColor}}
                                            />
                                        </StyledFormArea>
                                    </View>
                                    <StyledButton onPress={() => {handleSubmit()}}>
                                        <ButtonText>Create</ButtonText>
                                    </StyledButton>
                                </>
                            )}
                        </Formik>
                        <Text style={{color: 'red', fontSize: 10, textAlign: 'center'}}>{message}</Text>
                    </ScrollView>
                </ProfileOptionsView>
                <View style={{height: '100%', backgroundColor: colors.primary}}>
                    <FlatList
                        data={simpleStylingData}
                        keyExtractor={(item, index) => 'key'+index}
                        ListEmptyComponent={
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '50%'}}>
                                <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>There are no simple stylings here.</Text>
                                <StyledButton onPress={() => {setNamingNewStyle(NamingNewStyle == true ? false : true)}}>
                                    <ButtonText>Create a new style</ButtonText>
                                </StyledButton>
                            </View>
                        }
                        renderItem={({ item, index }) => ( 
                            <View style={{borderColor: colors.borderColor, borderWidth: 3, flex: 1, paddingVertical: listOfDataGettingDeleted.includes(index) ? 0 : 20, flexDirection: 'row', borderTopWidth: index != 0 ? 1.5 : 3, borderBottomWidth: simpleStylingData.length - 1 == index ? 3 : 1.5, primaryColor: colors.primary}}>
                                {!listOfDataGettingDeleted.includes(index) && (
                                    <>
                                        <TouchableOpacity style={{flexDirection: 'row', width: '100%'}} onPress={() => {handlePress(item.indexNum)}}>
                                            <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
                                            <TouchableOpacity onPress={() => {navigation.navigate('EditSimpleStyle', {name: item.name, type: null, dark: true, primary: item.colors.primary, tertiary: item.colors.tertiary, borderColor: item.colors.borderColor, background: item.colors.background, secondary: item.colors.secondary, darkLight: item.colors.darkLight, brand: item.colors.brand, green: item.colors.green, red: item.colors.red, darkest: item.colors.darkest, greyish: item.colors.greyish, bronzeRarity: item.colors.bronzeRarity, darkestBlue: item.colors.darkestBlue, StatusBarColor: item.colors.StatusBarColor, navFocusedColor: item.colors.navFocusedColor, navNonFocusedColor: item.colors.navNonFocusedColor, orange: item.colors.orange, yellow: item.colors.yellow, purple: item.colors.purple, slightlyLighterGrey: item.colors.slightlyLighterGrey, midWhite: item.colors.midWhite, slightlyLighterPrimary: item.colors.slightlyLighterPrimary, descTextColor: item.colors.descTextColor})}} style={{position: 'absolute', right: 55, top: -7}}>
                                                <Octicons name={"pencil"} size={40} color={brand} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {setListOfDataGettingDeleted(listOfDataGettingDeleted => [...listOfDataGettingDeleted, index])}} style={{position: 'absolute', right: 10, top: -7}}>
                                                <Octicons name={"x"} size={40} color={brand} />
                                            </TouchableOpacity>
                                                {console.log('AppStylingContextState is: ' + AppStylingContextState)}
                                                {console.log('HI ' + (AppStylingContextState == item.indexNum))}
                                                <View style={{backgroundColor: colors.borderColor, minHeight: 45, height: 45, maxHeight: 45, minWidth: 45, width: 45, maxWidth: 45, borderRadius: 45/2, borderColor: AppStylingContextState == item.indexNum ? colors.brand : colors.tertiary, borderWidth: 2, position: 'absolute', right: 110, top: -8}}>
                                                    {AppStylingContextState == item.indexNum && (
                                                        <View style={{backgroundColor: colors.tertiary, marginTop: 5, marginLeft: 5.5, minHeight: 30, height: 30, maxHeight: 30, minWidth: 30, width: 30, maxWidth: 30, borderRadius: 30/2}}/>
                                                    )}
                                                </View>
                                        </TouchableOpacity>
                                    </>
                                )}
                                {listOfDataGettingDeleted.includes(index) && (
                                    <>
                                        <TouchableOpacity onPress={() => {cancelDelete(index)}} style={{backgroundColor: 'red', width: '50%', paddingVertical: 20}}>
                                            <Text style={{color: 'black', fontSize: 20, textAlign: 'center'}}>Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {confirmDelete(item.name, index)}} style={{backgroundColor: 'green', width: '50%', paddingVertical: 20}}>
                                            <Text style={{color: 'black', fontSize: 20, textAlign: 'center'}}>Confirm</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        )}
                    />
                </View>
            </>
        </KeyboardAvoidingWrapper_NoScrollview>
    );
}

export default SimpleStylingMenu;