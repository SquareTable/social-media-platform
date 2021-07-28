import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import FindScreen from '../screens/FindScreen';
import ChatScreen from '../screens/ChatScreen';
import PostScreen from '../screens/PostScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BadgesScreen from '../screens/BadgesScreen';
import LoginScreen from '../screens/LoginScreen';
import settingsButtonTopRight from '../screens/settingsButtonTopRight';
import ProfileScreen from '../screens/ProfileScreen';
import {ProfileScreenToSettings_StackNavigation, SettingsToBadges_StackNavigation} from '../navigation/StackNavigator.js'


const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            /*... styles.shadow*/
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#e32f45'
        }}>
            {children}
        </View>
    </TouchableOpacity>
);


const Tabs = () => {
    return(
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 2, /*Change the margin from the bottom of the screen for the tab navigator*/
                    left: 0, /*Change the margin from the left of the screen for the tab navigator*/
                    right: 0, /*Change the margin from the right of the screen for the tab navigator*/
                    elevation: 0,
                    backgroundColor: '#3B4252',
                    borderRadius: '15px',
                    borderColor: "#3B4252",
                    height: 75,
                    /*...styles.shadow*/
                }
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../assets/app_icons/home.png')}
                            resizeMode = 'contain'
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? '#88C0D0' : '#ECEFF4'
                            }}
                        />
                        <Text style={{color: focused ? '#88C0D0' : '#ECEFF4', fontSize: 10,}}>HOME</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Find" component={FindScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../assets/app_icons/find.png')}
                            resizeMode = 'contain'
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? '#88C0D0' : '#ECEFF4'
                            }}
                        />
                        <Text style={{color: focused ? '#88C0D0' : '#ECEFF4', fontSize: 10,}}>FIND</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Post" component={PostScreen} 
            options={{
                tabBarIcon: ({focused}) => (
                    <Image 
                        source={require('../assets/app_icons/test3.png')}
                        resizeMode="contain"
                        style={{
                            width: 70,
                            height: 70,
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props} />
                )
            }}/>
            <Tab.Screen name="Chat" component={ChatScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../assets/app_icons/chat.png')}
                            resizeMode = 'contain'
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? '#88C0D0' : '#ECEFF4'
                            }}
                        />
                        <Text style={{color: focused ? '#88C0D0' : '#ECEFF4', fontSize: 10,}}>CHAT</Text>
                    </View>
                ),
            }}/>
            <Tab.Screen name="Profile" component={ProfileScreenToSettings_StackNavigation} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../assets/app_icons/profile_pic.jpg')}
                            resizeMode = 'contain'
                            style={{
                                width: 35,
                                height: 35,
                                borderWidth: 3,
                                borderColor: focused ? '#88C0D0' : '#ECEFF4',
                                borderRadius: 40/2
                            }}
                        />
                        <Text style={{color: focused ? '#88C0D0' : '#ECEFF4', fontSize: 10,}}>PROFILE</Text>
                    </View>
                ),
            }}/>
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#88C0D0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default Tabs;