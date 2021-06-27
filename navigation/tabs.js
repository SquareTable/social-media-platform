import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import FindScreen from '../screens/FindScreen';
import ChatScreen from '../screens/ChatScreen';
import PostScreen from '../screens/PostScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
            <Tab.Screen name="Find" component={FindScreen}></Tab.Screen>
            <Tab.Screen name="Chat" component={ChatScreen}></Tab.Screen>
            <Tab.Screen name="Post" component={PostScreen}></Tab.Screen>
            <Tab.Screen name="Settings" component={SettingsScreen}></Tab.Screen>
        </Tab.Navigator>
    );
};

export default Tabs;