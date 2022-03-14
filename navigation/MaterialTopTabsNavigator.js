import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChatScreenNavigator from '../screens/ChatScreenNavigator';
import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const TopTab = createMaterialTopTabNavigator();

function HomeChatNotificationsMaterialTopTabNavigator() {
    return (
      <TopTab.Navigator initialRouteName='HomeScreen' tabBar={() => {null}}>
        <TopTab.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <TopTab.Screen name="HomeScreen" component={HomeScreen} />
        <TopTab.Screen name="ChatScreenNavigator" component={ChatScreenNavigator} />
      </TopTab.Navigator>
    );
}

export default HomeChatNotificationsMaterialTopTabNavigator;