import React, { useState } from 'react'
import { View, ImageBackground, Text, ScrollView, Dimensions, TouchableOpacity} from 'react-native'
import AccountItem from '../components/Accounts/AccountItem'
import main_aurora from "../assets/images/main_aurora.png"
import aurora from "../assets/images/aurora_background.png";
import SearchBar from '../components/Inputs/SearchBar';
import ExpenseItem from '../components/Accounts/ExpenseItem';
import tw from "twrnc";


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


function MainPage() {
  const [activeTab, setActiveTab] = useState("전체");
  const accountNumber:string = "123232123"
  const travelTitle:string = "4박 5일 강릉 여행"
  const duration:string = "2023-07-16 ~ 2023-07-20"
  const numberOfPeople:number = 4
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text:string) => {
    setSearchText(text);
  };
  const handleTabSelect = (tabContent: string) => {
    setActiveTab(tabContent);
  };
  return (
    <>
    <View style={tw `h-full`}> 
      <ImageBackground source={main_aurora} style={tw `w-full bg-[#ddd] h-full absolute`}></ImageBackground>
        <View style={tw `mt-25 z-10`}>
            <AccountItem 
            accountNumber={accountNumber} 
            travelTitle={travelTitle}
            duration={duration}
            numberOfPeople={numberOfPeople}
            ></AccountItem>
        </View>
            {/* 내용이 들어가는 View */}
            <View style={tw `-mt-20 flex-col w-full flex-1 bg-white rounded-7`}> 
                {/* 검색 */}
                <View style={tw `mt-19 w-7/8 self-center`}>
                    <SearchBar onChangeText={handleSearch} value={searchText} />
                </View>
                {/* expenseTab */}
                <View style={tw `flex-1 flex-row items-center justify-center`}>
                    <ExpenseTab
                        content={"전체"}
                        isActive={activeTab === "전체"}
                        onPress={() => handleTabSelect("전체")}
                        />
                    <ExpenseTab
                        content={"지출"}
                        isActive={activeTab === "지출"}
                        onPress={() => handleTabSelect("지출")}
                        />
                        <ExpenseTab
                        content={"수입"}
                        isActive={activeTab === "수입"}
                        onPress={() => handleTabSelect("수입")}
                        />
                </View>
                {/* expenseHistory */}
                <View style={tw `bg-[#888] flex-7 items-center`}>
                    <ScrollView style={tw `bg-white flex-0.9 w-7/8`}>
                      <ExpenseItem></ExpenseItem>
                      <ExpenseItem></ExpenseItem>
                      <ExpenseItem></ExpenseItem>
                      <ExpenseItem></ExpenseItem>
                      <ExpenseItem></ExpenseItem>

                    </ScrollView>
                </View>
            </View>
        </View>
    </>
  )
}

export default MainPage