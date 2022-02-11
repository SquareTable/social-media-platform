import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CredentialsContext } from '../components/CredentialsContext';
import {
    StyledButton,
    ButtonText,
} from './screenStylings/styling.js';

const ChatScreenNavigator = ({navigation}) => {
    const {colors} = useTheme()
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    return(
        <>
            {storedCredentials ?
                <View style={{flex: 1, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>Chats coming soon</Text>
                    <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>Chats will be available on iOS, macOS, Android, Windows, and on the SocialSquare website</Text>
                </View>
            :
                <View style={{flex: 1, justifyContent: 'center', marginHorizontal: '2%'}}>
                    <Text style={{color: colors.tertiary, fontSize: 20, textAlign: 'center', marginBottom: 20}}>Please login to use chats</Text>
                    <StyledButton onPress={() => {navigation.navigate('ModalLoginScreen', {modal: true})}}>
                        <ButtonText> Login </ButtonText>
                    </StyledButton>
                    <StyledButton style={{backgroundColor: colors.primary, color: colors.tertiary}} signUpButton={true} onPress={() => navigation.navigate('ModalSignupScreen', {modal: true, Modal_NoCredentials: true})}>
                            <ButtonText signUpButton={true} style={{color: colors.tertiary, top: -9.5}}> Signup </ButtonText>
                    </StyledButton>
                </View>
            }
        </>
    )
}

export default ChatScreenNavigator;