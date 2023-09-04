import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro from '../screens/Intro';
import Login from '../screens/Login';
import EndTimeReset from '../screens/EndTimeReset';
import CenterModal from '../components/Modals/CenterModal';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
            headerShown: false,
          }}
        initialRouteName='Intro'>
        <Stack.Screen name='Intro' component={Intro} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='EndTimeReset' component={EndTimeReset} />
        <Stack.Screen name='CenterModal' component={CenterModal} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation

//////

import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

type IntroParams = {
};

type LoginParams = {
    key : string;
};

type EndTimeResetParams = {
    key : string;
};

export type RootStackParamList = {
  Intro: IntroParams;
  Login: LoginParams;
  EndTimeReset : EndTimeResetParams;
};

export const defaultNavigationOptions: NativeStackNavigationOptions = {
};
