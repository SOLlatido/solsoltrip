import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import MainPage from '../screens/MainPage';
import Report from '../screens/Report';
import Event from '../screens/EventMap';
import MyPointList from '../screens/MyPointList';
import {Ionicons} from '@expo/vector-icons';
import { Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { Text, Pressable, View, Alert } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
const MainTab = createBottomTabNavigator();
type NavigationProps = {
  navigation: StackNavigationProp<any>;
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

//메인화면 버튼 컴포넌트
const MainButton:React.FC<NavigationProps> = ({navigation}) => {
  return (
  <Pressable onPress={()=>{navigation.navigate("MyAccounts")}}>
    <AntDesign name="home" size={26} color="black" />
  </Pressable>
  )
};
const MainTabNavigator = () => {
    return (
      <MainTab.Navigator
        screenOptions={({ route }) => ({
          headerShown : false,
          tabBarLabel: ({ focused, color }) => {
            let label;
  
            if (route.name === 'MainPage') {
              label = '동행통장';
            } else if (route.name === 'Report') {
              label = '그래프';
            } else if (route.name === 'Event') {
              label = '이벤트';
            } else if (route.name === 'MyPointList') {
              label = '상생포인트';
            }
  
            return (
              <Text
                style={[
                  tw `text-[2.6]`,
                  { color: focused ? '#2695B1' : '#999' }, // Change text color based on focus
                ]}
              >
                {label}
              </Text>
            );
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === 'MainPage') {
              iconName = focused ? 'card' : 'card-outline';
            } else if (route.name === 'Report') {
              iconName = focused ? 'document' : 'document-outline';
            } else if (route.name === 'Event') {
              iconName = focused ? 'gift' : 'gift-outline';
            } else if (route.name === 'MyPointList') {
                iconName = focused? 'person' : 'person-outline';
            }
  
            // You can customize the icon's appearance here
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor : "#2695B1",
          tabBarInactiveTintColor : "#999",
        })}
      >
        <MainTab.Screen name="MainPage" component={MainPage}/>
        <MainTab.Screen name="Report" component={Report} 
          options={{ headerShown: false }}
        />
        <MainTab.Screen name="Event" component={Event} />
        <MainTab.Screen name="MyPointList" component={MyPointList} />
      </MainTab.Navigator>
    );
  };

export default MainTabNavigator;
