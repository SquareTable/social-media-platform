import React from 'react';
import {View, Text} from 'react-native';
import { useTheme } from '@react-navigation/native';

const ChatScreenNavigator = () => {
    const {colors} = useTheme()
    return(
        <View style={{flex: 1, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: colors.tertiary, fontSize: 100, fontWeight: 'bold', textAlign: 'center'}}>. .</Text>
            <Text style={{color: colors.tertiary, fontSize: 100, fontWeight: 'bold', textAlign: 'center'}}>\_/</Text>
            <Text style={{color: colors.tertiary, fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 40}}>Stay tuned for something awesome</Text>
        </View>
    )
}

export default ChatScreenNavigator;