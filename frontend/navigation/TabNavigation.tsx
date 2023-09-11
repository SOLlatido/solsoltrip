import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import MainPage from '../screens/MainPage';
import Report from '../screens/Report';

const Tab = createBottomTabNavigator();
function TabNavigation() {
  return (
      <Tab.Navigator initialRouteName='Main'>
        <Tab.Screen name="Main" component={MainPage}
            options={{
                tabBarIcon : () => (
                    <AntDesign name="creditcard" size={24} color="black" />
                )
            }} />
        <Tab.Screen name="Report" component={Report}
            options={{
                tabBarIcon : () => (
                    <Ionicons name="document-text-outline" size={24} color="black" />
                )
            }} />

      </Tab.Navigator>
  )
};

export default TabNavigation