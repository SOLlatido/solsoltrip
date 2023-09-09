import React from 'react'
import { View, ImageBackground, Text, ScrollView} from 'react-native'
import AccountItem from '../components/Accounts/AccountItem'
import main_aurora from "../assets/images/main_aurora.png"
import aurora from "../assets/images/aurora_background.png";
import tw from "twrnc";

const ExpenseTab = (props: {content:string}) => {
    // F3F0FB
    return (
        <>
        <View style={tw `ml-3 w-20 h-8 rounded-2 bg-[#ddd] justify-center items-center`}>
            <Text style={tw `text-[#555]`}>{props.content}</Text>
        </View>
        </>
    )
}

function MainPage() {
  const accountNumber:string = "123232123"
  const travelTitle:string = "4박 5일 강릉 여행"
  const duration:string = "2023-07-16 ~ 2023-07-20"
  const numberOfPeople:number = 4
  return (
    <>
      <ImageBackground source={main_aurora} style={tw `w-full bg-[#ddd] h-full absolute`}></ImageBackground>
        <View style={tw `mt-25 z-10`}>
            <AccountItem 
            accountNumber={accountNumber} 
            travelTitle={travelTitle}
            duration={duration}
            numberOfPeople={numberOfPeople}
            ></AccountItem>
        </View>
        {/* <View style={tw `flex -mt-20`}> */}
            {/* 내용이 들어가는 View */}
            <View style={tw `-mt-20 flex-col w-full h-full bg-white rounded-7`}> 
                <View style={tw `bg-[#222] flex-2`}>

                </View>
                {/* expenseTab */}
                <View style={tw `border-2 border-gray-400 flex-1 flex-row items-center justify-center`}>
                    <ExpenseTab content={"전체"}></ExpenseTab>
                    <ExpenseTab content={"지출"}></ExpenseTab>
                    <ExpenseTab content={"수입"}></ExpenseTab>
                </View>
                {/* expenseHistory */}
                <View style={tw `bg-[#888] flex-9`}>
                    <ScrollView></ScrollView>
                </View>
            </View>
        {/* </View> */}
    </>
  )
}

export default MainPage