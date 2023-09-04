import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro from '../screens/Intro';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import MyAccounts from '../screens/MyAccounts';
import { Image, ImageSourcePropType, ImageStyle, Pressable } from 'react-native';
import backBtn from "../assets/images/back_button.png"
const Stack = createNativeStackNavigator();

interface BackButtonProps {
  source: ImageSourcePropType;
  style: ImageStyle;
}
const BackButton: React.FC<BackButtonProps> = ({ source, style }) => {
  return <Image source={source} style={style} />;
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        // screenOptions={{
        //     headerShown: false,
        //   }}
        initialRouteName='Intro'>
        <Stack.Screen name='Intro' component={Intro} options={{headerShown:false}} />
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
        <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}} />
        <Stack.Screen name='MyAccounts' component={MyAccounts} 
          options={{
            headerTitle : "나의 동행통장",
            headerTransparent : true, 
            headerBackTitleVisible : false,
            // headerBackImage : () => 
              // <BackButton source={backBtn} style={{width:30, height:30}} ></BackButton>
            headerLeft : (props) => (
              <Pressable onPress={()=>props.canGoBack}>
                <BackButton source={backBtn} style={{width:30}}></BackButton>
              </Pressable>
            )
          }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation

//////

import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

type IntroParams = {
};

type LoginParams = {
    key : string;
};

export type RootStackParamList = {
  Intro: IntroParams;
  Login: LoginParams;
};

export const defaultNavigationOptions: NativeStackNavigationOptions = {
};
