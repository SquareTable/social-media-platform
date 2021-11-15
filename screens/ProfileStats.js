import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View, SafeAreaView, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
    Colors
} from './screenStylings/styling.js';
import Icon from 'react-native-vector-icons/AntDesign';

const ProfileStats = ({navigation, route}) => {
    const {colors, dark} = useTheme()
    const {brand} = Colors;
    const {name, followers, type} = route.params;
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
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>Profile Stats</TestText>
            </ChatScreen_Title>
            {type == 'Followers' ?
                followers.length != 0 ?
                    <Text style={{color: colors.tertiary, fontSize: 18, textAlign: 'center', fontWeight: 'bold', marginVertical: 20}}>People following {name}:</Text>
                :
                    null
            :
                followers.length != 0 ?
                    <Text style={{color: colors.tertiary, fontSize: 18, textAlign: 'center', fontWeight: 'bold', marginVertical: 20}}>{name} follows:</Text>
                :
                    null
            }
            {followers.length != 0 ?
                <FlatList
                    data={followers}
                    keyExtractor={(item, index) => 'key'+index}
                    renderItem={({ item, index }) => ( 
                        <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center'}}>{`\u2022 ${item}`}</Text>
                    )}
                />
            :
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: colors.tertiary, fontSize: 35, textAlign: 'center', fontWeight: 'bold', marginHorizontal: '5%'}}>
                        {type == 'Following' ? name + ' does not follow anyone' : 'No one follows ' + name}   
                    </Text>
                </View>
            }
        </>
    );
}

export default ProfileStats;