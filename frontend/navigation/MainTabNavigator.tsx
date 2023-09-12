import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from '../screens/MainPage';
import Report from '../screens/Report';
import Event from '../screens/EventMap';
import MyPointList from '../screens/MyPointList';
import {Ionicons} from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Text } from 'react-native';
import tw from 'twrnc';
const MainTab = createBottomTabNavigator();

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
        <MainTab.Screen name="MainPage" component={MainPage} />
        <MainTab.Screen name="Report" component={Report} />
        <MainTab.Screen name="Event" component={Event} />
        <MainTab.Screen name="MyPointList" component={MyPointList} />
      </MainTab.Navigator>
    );
  };

export default MainTabNavigator;
