import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View, SafeAreaView, Text, TouchableOpacity, Image} from 'react-native';
import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
    Colors
} from '../screenStylings/styling.js';
import Icon from 'react-native-vector-icons/AntDesign';

const GDPRCompliance = ({navigation}) => {
    const {colors, dark} = useTheme()
    const {brand} = Colors;
    return(
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
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>GDPR Compliance</TestText>
            </ChatScreen_Title>
            <Text style={{color: colors.tertiary, fontSize: 16, textAlign: 'center', marginTop: 20}}>In order to comply with GDPR laws, we must give you the option to download or delete all of the data that is stored on our servers that is associated with your account within 30 days from the request. You can create a request to download or delete all of your data using this screen.</Text>
            <TouchableOpacity onPress={() => {navigation.navigate('WhatIsStoredOnOurServers')}} style={{borderColor: colors.borderColor, borderWidth: 2, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, marginVertical: 20}}>
                <Text style={{color: brand, fontWeight: 'bold'}}>Learn about what data we store on our servers</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity onPress={() => {alert('Coming soon')}} style={{alignItems: 'center', flexDirection: 'column', borderColor: colors.borderColor, borderWidth: 2, marginHorizontal: '5%', width: '40%', paddingVertical: 30}}>
                    <Text style={{color: colors.tertiary, fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginBottom: 10}}>Download Data</Text>
                    <Icon name="download" size={60} color={colors.tertiary}/>
                    <Text style={{color: colors.tertiary, fontSize: 12, textAlign: 'center', marginHorizontal: '5%', marginTop: 10}}>After pressing this button we will email you a link to download all of your data on our servers within 30 days of pressing the button</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {alert('Coming soon')}} style={{alignItems: 'center', flexDirection: 'column', borderColor: colors.borderColor, borderWidth: 2, marginHorizontal: '5%', width: '40%', paddingVertical: 30}}>
                    <Text style={{color: 'red', fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>Delete all data</Text>
                    <Icon name="exclamation" size={70} color={colors.tertiary}/>
                    <Text style={{color: colors.tertiary, fontSize: 12, textAlign: 'center', marginHorizontal: '5%', marginTop: 10}}>This will delete all of the data stored on this account on our servers forever. There will not be any way to restore your account after this button has been pressed. We will send you a confirmation email once all data has been deleted.</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default GDPRCompliance;