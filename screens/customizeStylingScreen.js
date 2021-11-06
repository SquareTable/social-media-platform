import React from "react";
import {View, Text, Image} from 'react-native';
import { useTheme } from "@react-navigation/native";
import {
    Navigator_BackButton,
    TestText,
    ChatScreen_Title
} from './screenStylings/styling.js'

const customizeStylingScreen = ({navigation}) => {
    const {colors, dark} = useTheme()
    return(
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
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>Customize App Styling</TestText>
            </ChatScreen_Title>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: colors.tertiary, textAlign: 'center', marginVertical: 20}}>An idea that I've been playing around with.</Text>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: colors.tertiary, textAlign: 'center', marginVertical: 20}}>Might come soon, might take forever to come out, or might never come out</Text>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: colors.tertiary, textAlign: 'center', marginVertical: 20}}>You never know lol</Text>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: colors.tertiary, textAlign: 'center', marginVertical: 20}}>Even I don't know yet</Text>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: colors.tertiary, textAlign: 'center', marginVertical: 20}}>But no other social media platform has this feature so I wanna get this out lol</Text>
            </View>
        </>
    );
}

export default customizeStylingScreen;