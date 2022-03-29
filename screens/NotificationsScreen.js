import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
    StyledButton,
    ButtonText
} from './screenStylings/styling.js';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Constants from 'expo-constants';
import {CredentialsContext} from '../components/CredentialsContext';

const NotificationsScreen = ({navigation}) => {
    const {colors, dark} = useTheme();
    const StatusBarHeight = Constants.statusBarHeight;
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    return(
        <>
            <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                <TouchableOpacity style={{top: StatusBarHeight + 2, right: 10, position: 'absolute', zIndex: 2}} onPress={() => {navigation.navigate('HomeScreen')}}>
                    <AntDesign size={40} color={colors.tertiary} name="arrowright"/>
                </TouchableOpacity>
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>Notifications</TestText>
            </ChatScreen_Title>
            {storedCredentials ?
                <>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Needs backend implementation; coming soon</Text>
                    </View>
                </>
            :
                <View style={{flex: 1, justifyContent: 'center', marginHorizontal: '2%'}}>
                    <Text style={{color: colors.tertiary, fontSize: 20, textAlign: 'center', marginBottom: 20}}>Please login to see notifications</Text>
                    <StyledButton onPress={() => {navigation.navigate('ModalLoginScreen', {modal: true})}}>
                        <ButtonText> Login </ButtonText>
                    </StyledButton>
                    <StyledButton style={{backgroundColor: colors.primary, color: colors.tertiary}} signUpButton={true} onPress={() => navigation.navigate('ModalSignupScreen', {modal: true, Modal_NoCredentials: true})}>
                            <ButtonText signUpButton={true} style={{color: colors.tertiary, top: -9.5}}> Signup </ButtonText>
                    </StyledButton>
                </View>
            }
        </>
    );
}

export default NotificationsScreen;