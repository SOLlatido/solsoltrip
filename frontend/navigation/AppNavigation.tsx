import React, {useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { Pressable, View, Text, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Entypo, AntDesign, Feather, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import tw from "twrnc";

//recoil
import { useRecoilState } from 'recoil';
import { centerModalState } from '../recoil/centerModal/atom';

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
import ExpenseDetail from '../screens/ExpenseDetail';
import Mypage from '../screens/Mypage';
import EndTimeHistory from '../screens/EndTimeHistory';
import EndTimeSavingMoney from '../screens/EndTimeSavingMoney';
import EventMap from '../screens/EventMap';
import MainTabNavigator from './MainTabNavigator'
import EndTimeOurStory from '../screens/EndTimeOurStory';
import MyPointList from '../screens/MyPointList';
import Report from '../screens/Report';
import TwoBtnModal from '../components/Modals/TwoBtnModal';


// 이미지
import coin from "../assets/icons/coin.png";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type NavigationProps = {
  navigation: StackNavigationProp<any>;
};


//메인화면 버튼 컴포넌트
const MainButton:React.FC<NavigationProps> = ({navigation}) => {
  return (
  <Pressable onPress={()=>{navigation.navigate("MyAccounts")}}>
    <AntDesign name="home" size={26} color="black" />
  </Pressable>
  )
};

//뒤로가기 버튼 화살표 컴포넌트
const BackButton: React.FC = () => {
  const navigation = useNavigation();
  return (
  <Pressable onPress={()=>{navigation.goBack()}}>
  <Entypo name="chevron-thin-left" size={24} color="black" />
  </Pressable>
  )
};
//뒤로가기 버튼 x 컴포넌트
const CancelButton: React.FC = () => {
  const navigation = useNavigation();
  return (
  <Pressable onPress={()=>{navigation.goBack()}}>
    <AntDesign name="close" size={26} color="black" />
  </Pressable>
  )
};
//취소버튼 컴포넌트
const CancelCreateAccountButton:React.FC<NavigationProps> = ({navigation}) => {
  return (
  <Pressable onPress={()=>{navigation.navigate("MyAccounts")}}>
    <AntDesign name="close" size={26} color="black" />
  </Pressable>
  )
};
const CancelInviteButton:React.FC<NavigationProps> = ({navigation}) => {
  return (
  <Pressable onPress={()=>{navigation.navigate("MainTabNavigator")}}>
    <AntDesign name="close" size={26} color="black" />
  </Pressable>
  )
};

//포인트 페이지 이동 버튼
const PointButton:React.FC<NavigationProps> = ({navigation}) => {
  return(
    <Pressable onPress={()=>{navigation.navigate("MyPointList")}}>
      <Image source={coin} style={tw`w-[40px] h-[40px]`}/>
    </Pressable>
  )
}

//지출 상세 수정 완료 버튼 컴포넌트
const ExpenseEditButton:React.FC<NavigationProps> = ({navigation}) => {
  return (
  <Pressable onPress={()=>{navigation.navigate("MainTabNavigator")}}>
    <Feather name="check" size={28} color="black" />
  </Pressable>
  )
};

const MainRightButtons : React.FC<NavigationProps> = ({navigation}) => {
  // 모달 recoil
  const [modalVisible, setModalVisible] = useRecoilState<ModalParams>(centerModalState);
  const [modalContent, setModalContent] = useState('');

  return (
    <>
    {modalVisible.open&&<View style={tw`-z-50`}><TwoBtnModal modalTitle='정산' content={`정산하시겠습니까?\n동행통장 기록이 종료됩니다.`}/></View>}
    <View style={tw `flex-row`}>
      <Pressable style={tw `ml-3 items-center`} onPress={()=>{navigation.navigate("InviteFriends")}}>
      <Ionicons name="person-add" size={20.5} color="black" />
      <View><Text style={tw `text-xs tracking-tighter`}>동행추가</Text></View>
      </Pressable>
      <Pressable style={tw `ml-3 items-center`} 
        onPress={()=>{setModalVisible({open:true, event:false})}}
      >
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
          <Stack.Screen
            name="MainTabNavigator"
            component={MainTabNavigator} // Use MainTabNavigator as the component
            options={{
              headerTitle: '',
              headerTransparent: true,
              headerBackTitleVisible: false,
              headerLeft: () => <MainButton navigation={useNavigation()} />,
              headerRight: () => <MainRightButtons navigation={useNavigation()} />,
            }}
          />
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
        <Stack.Screen name='EndTimeReset' component={EndTimeReset} 
          options={{
            headerTitle : "종료날짜 재설정",
            headerTransparent : true, 
            headerBackTitleVisible : false,
            headerLeft: () => (
              <CancelCreateAccountButton navigation={useNavigation()}></CancelCreateAccountButton>
            ),
          }}
        />

        <Stack.Screen name='EndTimeHistory' component={EndTimeHistory} options={{headerShown:false}}/>
        <Stack.Screen name='EndTimeSavingMoney' component={EndTimeSavingMoney} options={{headerShown:false}}/>
        <Stack.Screen name='EndTimeOurStory' component={EndTimeOurStory} options={{headerShown:false}}/>
        <Stack.Screen name='Mypage' component={Mypage} />

        <Stack.Screen name='AccountList' component={AccountList} 
          options={{
            headerTitle : "동행통장 만들기",
            headerTransparent : true, 
            headerBackTitleVisible : false,
            headerLeft: () => (
              <BackButton></BackButton>
            ),
            headerRight : () => (
              <CancelCreateAccountButton navigation={useNavigation()}></CancelCreateAccountButton>
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
              <CancelCreateAccountButton navigation={useNavigation()}></CancelCreateAccountButton>
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
                <CancelCreateAccountButton navigation={useNavigation()}></CancelCreateAccountButton>
            )
          }}
          />
          <Stack.Screen name='EventMap' component={EventMap} 
            options={{
              headerTitle : "SOL을 찾아라",
              headerTransparent : true, 
              headerBackTitleVisible : false,
              headerLeft : () => (
                  <BackButton></BackButton>
              ),
              headerRight: () => (
                <PointButton navigation={useNavigation()}/>
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
              <CancelCreateAccountButton navigation={useNavigation()}></CancelCreateAccountButton>
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
              <BackButton></BackButton>
            ),
          }}
        />
        <Stack.Screen name='ExpenseDetail'
          options={{
            presentation :"modal",
            animation : "fade",
            headerTitle : "지출 상세",
            headerTransparent : true, 
            headerBackTitleVisible : false,
            headerLeft: () => (
              <CancelButton></CancelButton>
            ),
            headerRight:()=>(
              <ExpenseEditButton navigation={useNavigation()}></ExpenseEditButton>
            )
          }}
        >
          {(props) => <ExpenseDetail {...props}></ExpenseDetail>}
        </Stack.Screen>
        <Stack.Screen name='TabNavigation' component={TabNavigation}
          options={{
            headerShown : false
          }}/>

        <Stack.Screen name='MyPointList' component={MyPointList} 
          options={{
            headerTitle : "신한 지역상생 포인트",
            animation : "fade_from_bottom",
            headerTransparent : true, 
            headerBackTitleVisible : false,
            headerLeft: () => (
              <BackButton></BackButton>
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

type ModalParams = {
  open:boolean;
  event:boolean;
};

export type RootStackParamList = {
  Intro: IntroParams;
  Login: LoginParams;
  EndTimeReset : EndTimeResetParams;
  Modal : ModalParams;
};

export const defaultNavigationOptions: NativeStackNavigationOptions = {
};
