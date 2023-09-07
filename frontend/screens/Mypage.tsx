import React, { useState } from 'react'
import {View, Text, ScrollView, Pressable } from 'react-native';
import tw from 'twrnc'; 
import { Ionicons } from "@expo/vector-icons";

// 컴포넌트
import UserInfo from '../components/Mypage/UserInfo';
import AccountItem from '../components/Accounts/AccountItem'

const Mypage = () => {

    // 나의 계좌 정보
    const [myAccounts, setMyAccounts] = useState([]);
    const [menuType, setMenuType] = useState("여행기록");

    const accountNumber:string = "123232123"
    const travelTitle:string = "4박 5일 강릉 여행"
    const duration:string = "2023-07-16 ~ 2023-07-20"
    const numberOfPeople:number = 4

    return(
        <ScrollView  style={tw`flex-1 bg-violet-100 mt-25`}>
            <View style={tw`flex-1`}>
                <UserInfo userName={"신산하"} point={300} coupon={4}/>
            </View>

            <View style={tw`flex-1 bg-white`}>

                {/* 여행기록 혹은 모든계좌를 누르면 들어오는 데이터에 따라 안에 내용이 달라짐  */}
                <View style={tw`flex-row pl-8 pt-10 items-center`}>
                    <Pressable onPress={()=>{console.log("pressed!"); setMenuType("여행기록");}}>
                        <Text style={menuType==="여행기록"?tw`text-xl font-black text-[#0046FF]`:tw`text-xl font-black text-stone-500`}>여행기록</Text>
                    </Pressable>

                    <Text style={tw`text-xl font-xl text-stone-500`}> | </Text>

                    <Pressable onPress={()=>{console.log("pressed!");setMenuType("모든계좌");}}>
                        <Text style={menuType==="모든계좌"?tw`text-xl font-black text-[#0046FF]`:tw`text-xl font-black text-stone-500`}>모든계좌</Text>
                    </Pressable>
                </View>

                {/* 내 모든 계좌 */}
                <ScrollView style={tw `mt-5`}>
                    <AccountItem 
                    accountNumber={accountNumber} 
                    travelTitle={travelTitle}
                    duration={duration}
                    numberOfPeople={numberOfPeople}
                    >
                    </AccountItem>
                    <AccountItem 
                    accountNumber={accountNumber} 
                    travelTitle={travelTitle}
                    duration={duration}
                    numberOfPeople={numberOfPeople}
                    >
                    </AccountItem>
                    <AccountItem 
                    accountNumber={accountNumber} 
                    travelTitle={travelTitle}
                    duration={duration}
                    numberOfPeople={numberOfPeople}
                    >
                    </AccountItem>
                </ScrollView>
            </View>
        </ScrollView >
    )
}

export default Mypage