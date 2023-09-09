import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { Pressable, View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Entypo, AntDesign, Feather, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import tw from "twrnc";

import Intro from '../screens/Intro';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import EndTimeReset from '../screens/EndTimeReset';
import AccountList from '../screens/RegisterAccount/AccountList';
import MyAccounts from '../screens/MyAccounts';
import AccountName from '../screens/RegisterAccount/AccountName';
import AccountDuration from '../screens/RegisterAccount/AccountDuration';
import BalanceDivision from "../screens/RegisterAccount/BalanceDivision"
import InviteFriends from '../screens/RegisterAccount/InviteFriends';
import MainPage from '../screens/MainPage';
import MyTravelMates from '../screens/MyTravelMates';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
    <AntDesign name="close" size={26} color="black" />
  </Pressable>
  )
};
const CancelInviteButton:React.FC<NavigationProps> = ({navigation}) => {
  return (
  <Pressable onPress={()=>{navigation.navigate("MainPage")}}>
    <AntDesign name="close" size={26} color="black" />
  </Pressable>
  )
};

//메인화면 버튼 컴포넌트
const MainButton:React.FC<NavigationProps> = ({navigation}) => {
  return (
  <Pressable onPress={()=>{navigation.navigate("MyAccounts")}}>
    <AntDesign name="home" size={26} color="black" />
  </Pressable>
  )
};

const MainRightButtons : React.FC<NavigationProps> = ({navigation}) => {
  return (
    <>
    <View style={tw `flex-row`}>
      <Pressable style={tw `ml-3 items-center`} onPress={()=>{navigation.navigate("InviteFriends")}}>
      <Ionicons name="person-add" size={20.5} color="black" />
      <View><Text style={tw `text-xs tracking-tighter`}>동행추가</Text></View>
      </Pressable>
      <Pressable style={tw `ml-3 items-center`} onPress={()=>{Alert.alert("로그아웃 하시겠습니까?")}}>
      <MaterialCommunityIcons name="airplane-landing" size={22} color="black" />
      <View><Text style={tw `text-xs tracking-tighter`}>정산하기</Text></View>
      </Pressable>
      <Pressable style={tw `ml-3 items-center`} onPress={()=>{Alert.alert("로그아웃 하시겠습니까?")}}>
      <Feather name="log-out" size={22} color="black" />
      <View><Text style={tw `text-xs tracking-tighter`}>로그아웃</Text></View>
      </Pressable>
    </View>
    </>
  )
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
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
            ),
            headerRight : () => (
              <CancelButton navigation={useNavigation()}></CancelButton>
          )
          }}
        />
        <Stack.Screen name='AccountName' component={AccountName} 
          options={{
            headerTitle : "동행통장 만들기",
            headerTransparent : true, 
            headerBackTitleVisible : false,
            headerLeft: () => (
              <BackButton></BackButton>
            ),
            headerRight : () => (
              <CancelButton navigation={useNavigation()}></CancelButton>
          )
          }}
        />
        <Stack.Screen name='AccountDuration' component={AccountDuration} 
          options={{
            headerTitle : "동행통장 만들기",
            headerTransparent : true, 
            headerBackTitleVisible : false,
            headerLeft: () => (
              <BackButton></BackButton>
              ),
            headerRight : () => (
                <CancelButton navigation={useNavigation()}></CancelButton>
            )
          }}
        />
        <Stack.Screen name='BalanceDivision' component={BalanceDivision} 
          options={{
            headerTitle : "동행통장 만들기",
            headerTransparent : true, 
            headerBackTitleVisible : false,
            headerLeft: () => (
              <BackButton></BackButton>
            ),
            headerRight : () => (
              <CancelButton navigation={useNavigation()}></CancelButton>
          )
          }}
        />
        <Stack.Screen name='InviteFriends' component={InviteFriends} 
          options={{
            // gestureDirection : "vertical",
            animation : "fade_from_bottom",
            headerTitle : "",
            headerTransparent : true, 
            headerBackTitleVisible : true,
            headerBackTitle : "메인",
            headerLeft: () => (
              <CancelInviteButton navigation={useNavigation()}></CancelInviteButton>
            ),
          }}
        />
        <Stack.Screen name='MainPage' component={MainPage} 
          options={{
            // gestureDirection : "vertical",
            animation : "fade_from_bottom",
            headerTitle : "",
            headerTransparent : true, 
            headerBackTitleVisible : false,
            headerLeft: () => (
              <MainButton navigation={useNavigation()}></MainButton>
            ),
            headerRight : () => (
              <MainRightButtons navigation={useNavigation()}></MainRightButtons>

            )
          }}
        />
        <Stack.Screen name='MyTravelMates' component={MyTravelMates} 
          options={{
            // gestureDirection : "vertical",
            // animation : "",
            headerTitle : "",
            headerTransparent : true, 
            headerBackTitleVisible : false,
            headerLeft: () => (
              <CancelInviteButton navigation={useNavigation()}></CancelInviteButton>
            ),
          }}
        />
        <Stack.Screen name='TabNavigation' component={TabNavigation}
          options={{
            headerShown : false
          }}/>
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
