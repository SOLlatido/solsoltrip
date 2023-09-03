import React from 'react'
import { View, Text} from 'react-native'
import tw from "twrnc";
import LongButton from '../components/ButtonItems/LongButton';
import { StackNavigationProp } from '@react-navigation/stack';
type NavigationProps = {
    navigation: StackNavigationProp<any>;
  };
const Login:React.FC<NavigationProps> = ({navigation}) => {
  const handleLogin = () =>{
    navigation.goBack();
  }
  return (
    <>
    <Text style={tw `mt-30 flex-1 items-center justify-center`}>Login</Text>
    <LongButton content='로그인' onPress={handleLogin}></LongButton>
    </>
  )
}

export default Login