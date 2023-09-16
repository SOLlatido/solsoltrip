import React, { useEffect } from 'react';
import { View, Text, Pressable, TouchableOpacity, Alert } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import { Feather, AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

// recoil
import { useRecoilState } from 'recoil';
import {pickAccountState} from "../../recoil/account/pickAccountAtom";
import {pickSpecificAccountInfoState} from "../../recoil/account/pickSpecificAccountInfo";

import { nonAuthHttp, authHttp } from '../../axios/axios';

const AccountItem = (props : { accompanySeq:number, accountNumber:string, travelTitle:string, duration:string, numberOfPeople:number }) => {
  const navigation = useNavigation();
  const {accompanySeq,accountNumber, travelTitle, duration, numberOfPeople} = props

  const [currAccount, setCurrAccount] = useRecoilState(pickAccountState);
  const [currAccountInfo, setCurrAccountInfo] = useRecoilState(pickSpecificAccountInfoState); //동행통장 상세 내역 정보를 담음

  const exitAccount = () => {
    console.log("동행통장 나가기");
  }

  async function getOneAccountInfo(data:tripAccountRequest): Promise<void> {
    try {

        const response = await nonAuthHttp.post(`api/trip/detail`, data);
        const result = response.data;
        
        if(response.status===200){
            setCurrAccountInfo(result);
            navigation.navigate("MainTabNavigator" as never);
        }else{
            return;
        }

    } catch (error) {
        Alert.alert("시스템 에러입니다.\n빠른 시일 내 조치를 취하겠습니다.");
        console.log(error);
    }
  }

  useEffect(()=>{
    setCurrAccount({ accountSeq:accompanySeq, accountNumber:accountNumber, travelTitle:travelTitle, duration:duration, numberOfPeople:numberOfPeople });
  },[currAccount.duration])


  return (
    <Pressable onPress={()=>{getOneAccountInfo({accompanySeq: props.accompanySeq})}}>
      <LinearGradient
        colors={['#7479BF', '#38B0E8']} // Define your gradient colors
        start={{ x: 0, y: 0 }} // Gradient start point
        end={{ x: 1, y: 0 }} // Gradient end point
        style={tw`rounded-2xl p-5 py-9 mb-5 shadow-2xl w-6/7 self-center`} 
      >
      <TouchableOpacity onPress={()=>{exitAccount()}} style={tw`items-end mt--5`}>
        <AntDesign name="close" size={18} color="white" />
      </TouchableOpacity>

      <View style={tw`flex justify-between`}>
        <Text style={tw`text-[#fff]`}>{accountNumber}</Text>
        <Text style={tw`text-xl font-bold text-white`}>{travelTitle}</Text>

        <View style={tw`flex-row`}>
          <Text style={tw`text-gray-300 text-xs font-bold tracking-wider pr-2`}>{duration}</Text>
          
          <TouchableOpacity onPress={()=>{navigation.navigate("EndTimeReset" as never)}} style={tw``}>
            <FontAwesome5 name="pen" size={15} color="#FFF" />
          </TouchableOpacity>
        
        </View>
      
      </View>
      <View style={tw`mt-4 flex-row`}>
        <Text style={tw`text-gray-200 items-center mr-2`}>{numberOfPeople}명의 동행</Text>  
        <TouchableOpacity onPress={()=>{navigation.navigate("MyTravelMates" as never)}} style={tw``}><FontAwesome5 name="user-friends" size={18} color="#FFF" /></TouchableOpacity>
      </View>
    </LinearGradient>
    </Pressable>
  );
};

export default AccountItem;

type tripAccountResponse = {
  account : string,
  name : string,
  startDate:string,
  endDate:string,
  peopleNum:number,
  accompanyDepositContents:accompanyWithdrawalContents[],
  accompanyWithdrawalContents:accompanyWithdrawalContents[],
}

type accompanyWithdrawalContents = {
  "accompanyContentSeq": number,
	"store": string,
	"cost": number,
	"acceptedDate": string,
	"category": string,
	"memeo": string,
	"acceptedDatetime": string
}

type tripAccountRequest = {
  accompanySeq:number,
}