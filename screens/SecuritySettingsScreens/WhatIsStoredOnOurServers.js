import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View, SafeAreaView, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
    Colors,
    ListItem
} from '../screenStylings/styling.js';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Linking from 'expo-linking';

const WhatIsStoredOnOurServers = ({navigation}) => {
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
                <TestText style={{textAlign: 'center', color: colors.tertiary, fontSize: 19}}>Data Stored On Our Servers</TestText>
            </ChatScreen_Title>
            <ScrollView>
                <Text style={{color: 'red', fontSize: 14, fontWeight: 'bold', margin: 10, textAlign: 'center'}}>We only store data neccesary to run SocialSquare. Nothing more.</Text>
                <View style={{borderColor: colors.borderColor, borderWidth: 3, marginVertical: 10}}>
                    <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: colors.tertiary, marginVertical: 20}}>This is a full list of the data we store on our servers that is associated with you:</Text>
                    <ListItem style={{color: colors.tertiary}}>{`\u2022 Your username`}</ListItem>
                    <ListItem style={{color: colors.tertiary}}>{`\u2022 Your display name`}</ListItem>
                    <ListItem style={{color: colors.tertiary}}>{`\u2022 Your email`}</ListItem>
                    <ListItem style={{color: colors.tertiary}}>{`\u2022 Your public ID`}</ListItem>
                    <ListItem style={{color: colors.tertiary}}>{`\u2022 The posts you have upvoted and downvoted`}</ListItem>
                    <ListItem style={{color: colors.tertiary}}>{`\u2022 Post media (such as photos, video, audio, etc.)`}</ListItem>
                    <ListItem style={{color: colors.tertiary}}>{`\u2022 Comments you have made on peoples' posts`}</ListItem>
                    <ListItem style={{color: colors.tertiary}}>{`\u2022 The comments you have upvoted and downvoted`}</ListItem>
                    <ListItem style={{color: colors.tertiary}}>{`\u2022 Messages you have sent (optional encryption)`}</ListItem>
                </View>
                <View style={{borderColor: colors.borderColor, borderWidth: 3, marginBottom: 10}}>
                    <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: colors.tertiary, marginVertical: 20}}>This is a full list of the data we store on our servers that is hashed:</Text>
                    <ListItem style={{color: colors.tertiary}}>{`\u2022 Your password`}</ListItem>
                </View>
                <View style={{borderColor: colors.borderColor, borderWidth: 3}}>
                    <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: colors.tertiary, marginVertical: 20}}>This is a full list of the data we store on our servers that is encrypted so no one (including SocialSquare) can read or see the data except for you:</Text>
                    <ListItem style={{color: colors.tertiary}}>{`\u2022 Messages you have sent (optional encryption)`}</ListItem>
                </View>
                <Text style={{color: 'red', fontSize: 18, textAlign: 'center', marginVertical: 10, fontWeight: 'bold'}}>Encryption for more data is coming soon</Text>
                <Text style={{fontSize: 14, color: colors.tertiary, fontWeight: 'bold', textAlign: 'center', marginHorizontal: '5%', marginVertical: 20}}>Don't trust us? Press the button below and get taken to the SocialSquare open source GitHub repository so you can take a look at the code used to create the app and see that we are not lying.</Text>
                <TouchableOpacity style={{marginHorizontal: '20%', borderColor: colors.borderColor, borderWidth: 5, borderRadius: 20/2, marginBottom: 30}} onPressOut={() => {Linking.openURL('https://github.com/SquareTable/social-media-platform')}}>
                    <Text style={{color: colors.tertiary, fontSize: 16, textAlign: 'center', padding: 7}}>Press here to visit the SocialSquare GitHub repo</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
}

export default WhatIsStoredOnOurServers;