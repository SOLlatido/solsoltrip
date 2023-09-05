import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import Intro from '../screens/Intro';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import MyAccounts from '../screens/MyAccounts';
import { ImageSourcePropType, ImageStyle, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';
import EndTimeReset from '../screens/EndTimeReset';
import AccountList from '../screens/RegisterAccount/AccountList';
import { AntDesign } from '@expo/vector-icons';
const Stack = createNativeStackNavigator();
type NavigationProps = {
  navigation: StackNavigationProp<any>;
};
//뒤로가기 버튼 컴포넌트
const BackButton: React.FC = () => {
  const navigation = useNavigation();
  return (
  <Pressable onPress={()=>{navigation.goBack()}}>
  <Entypo name="chevron-thin-left" size={24} color="black" />
  </Pressable>
  )
};
//취소버튼 컴포넌트
const CancelButton:React.FC<NavigationProps> = ({navigation}) => {
  return (
  <Pressable onPress={()=>{navigation.navigate("MyAccounts")}}>
    <AntDesign name="close" size={24} color="black" />
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
        <Stack.Screen name='AccountList' component={AccountList} 
          options={{
            headerTitle : "동행통장 만들기",
            headerTransparent : true, 
            headerBackTitleVisible : false,
            headerLeft: () => (
              <BackButton></BackButton>
                // <CancelButton navigation={useNavigation()}></CancelButton>
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
