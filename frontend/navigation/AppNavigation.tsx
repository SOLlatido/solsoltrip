import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro from '../screens/Intro';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import MyAccounts from '../screens/MyAccounts';
import { ImageSourcePropType, ImageStyle, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';
import EndTimeReset from '../screens/EndTimeReset';
import Mypage from '../screens/Mypage';
import EndTimeHistory from '../screens/EndTimeHistory';

const Stack = createNativeStackNavigator();
//뒤로가기 버튼 컴포넌트
const BackButton: React.FC = () => {
  const navigation = useNavigation();
  return (
  <Pressable onPress={()=>{navigation.goBack(); console.log("yay")}}>
  <Entypo name="chevron-thin-left" size={24} color="black" />
  </Pressable>
  )
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
            headerLeft : () => (
                <BackButton></BackButton>
            )
          }}
          />
          
        <Stack.Screen name='EndTimeReset' component={EndTimeReset} />

        <Stack.Screen name='Mypage' component={Mypage} 
          options={{
            headerTitle : "마이페이지",
            headerTransparent : true, 
            headerBackTitleVisible : false,
            headerLeft : () => (
                <BackButton></BackButton>
            )
          }}
          />
        <Stack.Screen name='EndTimeHistory' component={EndTimeHistory} />
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
