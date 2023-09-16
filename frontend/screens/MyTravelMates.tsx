import React, {useEffect} from 'react'
import { View, Text, ScrollView,TouchableOpacity,Alert } from 'react-native'
import AccountItem from '../components/Accounts/AccountItem'
import { AntDesign } from '@expo/vector-icons';
import tw from "twrnc"
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// recoil
import { useRecoilState } from 'recoil';
import {pickAccountState} from "../recoil/account/pickAccountAtom"

function MyTravelMates() {

  const [currAccount, setCurrAccount] = useRecoilState(pickAccountState);
  
  return (
    <>
      <View style={tw `h-full`}> 
        <View style={tw `mt-25 z-10`}>
            <AccountItem 
              accountNumber={currAccount.accountNumber} 
              travelTitle={currAccount.travelTitle}
              duration={currAccount.duration}
              numberOfPeople={currAccount.numberOfPeople}
            ></AccountItem>
        </View>
        <ScrollView style={tw `flex-1`}>
          <View style={tw `ml-6 justify-center items-center w-7/8`}>
            <TravelMatesItem name={"다영"} status={"나"} balance={"101,500"}/>
            <TravelMatesItem name={"다영"} status={"나"} balance={"101,500"}/>
            <TravelMatesItem name={"다영"} status={"나"} balance={"101,500"}/>
          </View>
        </ScrollView>

        {/* 동행 추가 버튼 */}
        <View style={tw `flex absolute bottom-10 w-3/4 p-4 self-center items-center justify-center`}>
      <TouchableOpacity
        onPress={()=>{navigation.navigate("InviteFriends" as never)}}
        activeOpacity={0.8}
        style={tw`w-6/7 bg-[#7B5AF3] h-12 rounded-[4] justify-center items-center shadow-md`}
      >
        <Text style={tw `text-white text-lg font-semibold`}><AntDesign name="pluscircleo" size={17} color="white" />&nbsp;동행 추가하기</Text>
      </TouchableOpacity>
    </View>
      </View>
    </>
  )
}
const TravelMatesItem = (props: { name: string, status: string, balance: string }) => {
  const firstLetter = props.name.charAt(0);
  const circleColor = props.status === "나" ? "#7B5AF3" : "#3CADE5";
  return (
    <>
      <View style={tw`flex-1 flex-row mb-2 h-18 justify-center`}>
        <View style={tw`flex-1 justify-center items-center`}>
          <View style={[tw`w-12 h-12 rounded-full justify-center items-center`, { backgroundColor: circleColor }]}>
            <Text style={tw`text-white text-xl`}>{firstLetter}</Text>
          </View>
        </View>
        <View style={tw`flex-2 flex-col justify-center`}>
          <Text style={tw`text-lg`}>{props.name}</Text>
          <Text style={tw`text-sm`}>{props.status}</Text>
        </View>
        <View style={tw`flex-2 justify-end items-end p-2 pr-3`}>
          <Text style={tw`text-lg`}>{props.balance}원</Text>
        </View>
      </View>
      <View style={tw`bg-gray-300 h-px w-full`} />
    
    </>
  )
}


export default MyTravelMates

type getAccountsResponse = {
  accompanyList : accompanyList[]|null,
}

type accompanyList = {
  accompanySeq : number,
  account : string,
  name : string,
  startDate:string,
  endDate:string,
  personNum:number
}

type getAccountsRequest = {
  memberSeq:number,
}