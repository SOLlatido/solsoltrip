import React, { useState } from 'react'
import { View, Text, ImageBackground, TextInput} from 'react-native'
import tw from "twrnc";
import LongButton from '../components/ButtonItems/LongButton';
import { StackNavigationProp } from '@react-navigation/stack';
import aurora from '../assets/images/aurora_background.png';
type NavigationProps = {
    navigation: StackNavigationProp<any>;
  };
const Login:React.FC<NavigationProps> = ({navigation}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () =>{
    navigation.goBack();
  }
  const handleSignUp = () =>{
    navigation.goBack();
  }

  return (
    <>
    <View style={tw `flex flex-1 bg-white items-center justify-center`}>
      <ImageBackground source={aurora} style={tw `w-full h-full bg-cover absolute`}></ImageBackground>

      <View style={tw `flex-2 w-full h-full`}>
        <View style={tw `flex-1 w-full items-center`}>
          <View style={tw `flex-1`}></View>
          <Text style={tw `flex-1 text-2xl mt-5 text-[#222]`}>아이디 / 비밀번호</Text>

          <View style={tw `flex-2 items-center`}>
          <TextInput
              style={tw`bg-white rounded-lg w-80 h-12 px-4 mb-4`}
              placeholder="아이디 입력"
              onChangeText={(text) => setId(text)}
              value={id}
            />
            <TextInput
              style={tw`bg-white rounded-lg w-80 h-12 px-4`}
              placeholder="영문자, 숫자, 특수문자 혼용(8~15자)"
              secureTextEntry={true} // This hides the input as it's a password
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <Text style={tw `mt-4 text-[#444]`}>처음이신가요? <Text onPress={handleSignUp} style={tw `mt-4 text-[#0046FF]`}>회원가입</Text></Text>
            
            </View>
        </View>
      </View>

      <LongButton content='로그인' onPress={handleLogin}></LongButton>
  
    </View>
    </>
  )
}

export default Login