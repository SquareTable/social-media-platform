import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import {useTheme} from '@react-navigation/native';

const PrivacyPolicy = ({navigation}) => {
    const {colors, dark} = useTheme();
    return (
        <SafeAreaView style={{backgroundColor: colors.primary, height: '100%'}}>
            <Text style={{color: colors.tertiary, fontSize: 30, textAlign: 'center'}}>Privacy Policy coming soon</Text>
            <TouchableOpacity onPress={() => {navigation.goBack()}} style={{borderColor: colors.tertiary, borderWidth: 1.5, borderRadius: 10, marginTop: 50, paddingVertical: 20, marginHorizontal: 20}}>
                <Text style={{color: colors.tertiary, fontSize: 30, textAlign: 'center'}}>Click me to go back</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default PrivacyPolicy;