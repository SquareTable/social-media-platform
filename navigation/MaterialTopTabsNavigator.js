import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import { ChatScreen_Stack } from './ChatScreenStackNavigator';

const TopTab = createMaterialTopTabNavigator();

function HomeChatNotificationsMaterialTopTabNavigator() {
    return (
      <TopTab.Navigator initialRouteName='HomeScreen' tabBar={() => {null}}>
        <TopTab.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <TopTab.Screen name="HomeScreen" component={HomeScreen} />
        <TopTab.Screen name="ChatScreenStack" component={ChatScreen_Stack} />
      </TopTab.Navigator>
    );
}

export default HomeChatNotificationsMaterialTopTabNavigator;