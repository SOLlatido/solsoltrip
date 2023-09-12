import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, TextInput} from 'react-native'
import tw from "twrnc";
import LongButton from '../components/ButtonItems/LongButton';
import { StackNavigationProp } from '@react-navigation/stack';
import aurora from '../assets/images/aurora_background.png';
import LoadingAnimation from "../components/Animation/LoadingAnimation";

type NavigationProps = {
    navigation: StackNavigationProp<any>;
  };
const Login:React.FC<NavigationProps> = ({navigation}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const handleMain = () =>{
    navigation.goBack();
  }
  const handleLogin = () =>{
    navigation.navigate("MyAccounts");
  }
  const handleSignUp = () =>{
    navigation.navigate("SignUp");
  }

  useEffect(()=>{
    // setLoading(false);
  },[])

  return (
    <>
    {loading?<LoadingAnimation/>:
    <View style={tw `flex flex-1 items-center justify-center`}>
      <ImageBackground source={aurora} style={tw `w-full h-full absolute`}></ImageBackground>

      <View style={tw `flex-2 w-full h-full`}>
        <View style={tw `flex-1 w-full items-center`}>
          <View style={tw `flex-1`}></View>
          <View style={tw `flex-1 items-center`}>
          <Text style={tw `text-2xl font-bold mt-5 text-[#222]`}>로그인</Text>
          <Text style={tw `mt-2`}>아이디 / 비밀번호를 입력해주세요</Text>
          
          </View>

          <View style={tw `flex-2`}>
          <Text style={tw `pl-2 mb-2 text-[#555]`}>아이디</Text>
          <TextInput
              style={tw`bg-white rounded-lg w-80 h-12 px-4 mb-4`}
              placeholder="아이디 입력"
              placeholderTextColor={"#999"}
              onChangeText={(text) => setId(text)}
              value={id}
            />
            <Text style={tw `pl-2 mb-2 text-[#555]`}>비밀번호</Text>
            <TextInput
              style={tw`bg-white rounded-lg w-80 h-12 px-4`}
              placeholder="영문자, 숫자, 특수문자 혼용(8~15자)"
              placeholderTextColor={"#999"}
              secureTextEntry={true} // This hides the input as it's a password
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <Text style={tw `mt-4 text-[#444] self-center`}>처음이신가요? <Text onPress={handleSignUp} style={tw `mt-4 text-[#0046FF]`}>회원가입</Text></Text>
            
            </View>
        </View>
      </View>

      {/* <LongButton content='메인으로' onPress={handleMain}></LongButton> */}
      <LongButton content='로그인' onPress={handleLogin}></LongButton>
  
    </View>}
    </>
  )
}

export default Login