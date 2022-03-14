import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CredentialsContext } from '../components/CredentialsContext';
import {
    StyledButton,
    ButtonText,
    ChatScreen_Title,
    Navigator_BackButton,
    TestText
} from './screenStylings/styling.js';
import Constants from 'expo-constants';

const ChatScreenNavigator = ({navigation}) => {
    const {colors} = useTheme()
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const StatusBarHeight = Constants.statusBarHeight;
    return(
        <>
            {storedCredentials ?
                <>
                    <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                        <Navigator_BackButton onPress={() => {navigation.navigate('HomeScreen')}}>
                            <Image
                            source={require('../assets/app_icons/back_arrow.png')}
                            style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                            resizeMode="contain"
                            resizeMethod="resize"
                            />
                        </Navigator_BackButton>
                        <TestText style={{textAlign: 'center', color: colors.tertiary}}>Chats</TestText>
                    </ChatScreen_Title>
                    <View style={{flex: 1, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: colors.tertiary, fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>Chats coming soon</Text>
                        <Text style={{color: colors.tertiary, fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>I promise 🥺</Text>
                    </View>
                </>
            :
                <View style={{flex: 1, justifyContent: 'center', marginHorizontal: '2%'}}>
                    <TouchableOpacity style={{position: 'absolute', top: StatusBarHeight, left: 10}} onPress={() => {navigation.navigate('HomeScreen')}}>
                        <Image
                        source={require('../assets/app_icons/back_arrow.png')}
                        style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                        resizeMode="contain"
                        resizeMethod="resize"
                        />
                    </TouchableOpacity>
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