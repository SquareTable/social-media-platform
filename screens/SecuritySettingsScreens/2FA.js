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

const TwoFA = ({navigation}) => {
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
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>Two Factor Authentication</TestText>
            </ChatScreen_Title>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 30, fontWeight: 'bold', color: colors.tertiary}}>Coming soon :0</Text>
                <Text style={{fontSize: 100, fontWeight: 'bold', color: colors.tertiary}}>🚧</Text>
            </View>
        </>
    );
}

export default TwoFA;