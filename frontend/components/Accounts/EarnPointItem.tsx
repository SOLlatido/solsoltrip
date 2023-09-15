import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

// const expenseTitle = "AKPLAZA 강릉점"
// const date = "07-15 11:57"
// const expense = "100"

const EarnPointItem = ({expenseTitle, date, expense}:props) => {

  return (
    
    <View style={tw.style('bg-[#DFEEF3]/40 mb-3 rounded-2 h-19 flex-row p-3')}>  
      <View style={tw.style('flex-3 p-2 justify-center')}>
        <Text style={tw `font-bold text-[#333] mb-1`} numberOfLines={1} ellipsizeMode='tail'>{expenseTitle}</Text>
        <Text style={tw `text-xs`} numberOfLines={1} ellipsizeMode='tail'>{date.split("T")[0]} {date.split("T")[1]}</Text>
      </View>
      <View style={tw.style('justify-center items-end p-1 pr-2')}>
      
        <Text style={tw `font-bold text-[#333] mb-0`}>{expense}원</Text>
      </View>
    </View>

  );
};

export default EarnPointItem;

type props = {
  expenseTitle:String,
  date:string,
  expense:number
}