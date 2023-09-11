import {View, ImageBackground, TouchableOpacity, Text, ScrollView} from "react-native"
import React, { useState } from 'react'

import main_aurora from "../assets/images/main_aurora.png"
import PointSearchBar from "../components/Inputs/PointSearchBar";
import EarnPointItem from "../components/Accounts/EarnPointItem";
import tw from "twrnc";

// 컴포넌트
import PointItem from "../components/Accounts/PointItem";

const ExpenseTab = (props: { content: string; isActive: boolean; onPress: () => void }) => {
    
    return (
        <>
        <TouchableOpacity onPress = {props.onPress}>
        <View style={[
            tw `ml-3 w-20 h-9 rounded-2 bg-[#ddd] justify-center items-center`,
            props.isActive? {backgroundColor : '#F3F0FB'} : {backgroundColor : "transparent"}
            ]}>
            <Text style={[tw `text-[#555] font-bold`, props.isActive? {color:"#363062" } : {color : "#777"}]}>{props.content}</Text>
        </View>
        </TouchableOpacity>
        </>
    )
}

const MyPointList = () => {
    const accountNumber:string = "123232123"
    const point:number = 100
    const [searchText, setSearchText] = useState('');

  const handleSearch = (text:string) => {
    setSearchText(text);
  };

  return (
    <>
    <View style={tw `h-full`}> 
        <ImageBackground source={main_aurora} style={tw `w-full bg-[#ddd] h-full absolute`}></ImageBackground>
        <View style={tw `mt-25 z-10`}>
            <PointItem 
            accountNumber={accountNumber} 
            point={point}
            ></PointItem>
        </View>
            {/* 내용이 들어가는 View */}
            <View style={tw `-mt-20 flex-col w-full flex-1 bg-white rounded-7`}> 
                {/* 검색 */}
                <View style={tw `mt-19 w-7/8 self-center`}>
                    <PointSearchBar onChangeText={handleSearch} value={searchText} />
                </View>
                
                {/* expenseHistory */}
                <View style={tw `flex-7 items-center mt-5`}>
                    <ScrollView style={tw `bg-white flex-0.9 w-7/8`}>
                      <EarnPointItem></EarnPointItem>
                      <EarnPointItem></EarnPointItem>
                      <EarnPointItem></EarnPointItem>
                      <EarnPointItem></EarnPointItem>
                      <EarnPointItem></EarnPointItem>

                    </ScrollView>
                </View>
            </View>
        </View>
    </>
  )
}

export default MyPointList