import React from 'react';
import {View, Text} from 'react-native';
import { useTheme } from '@react-navigation/native';

const ChatScreenNavigator = () => {
    const {colors} = useTheme()
    return(
        <View style={{flex: 1, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>Chats coming soon</Text>
            <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>Probably before the end of the week</Text>
        </View>
    )
}

export default ChatScreenNavigator;