import React from 'react';
import { View, Text, Pressable } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import tw from 'twrnc';

const SelectAccountItem = (props:{ accountNumber:string, accountTitle:string, balance:string}) => {
    const {accountNumber, accountTitle, balance} = props;
    return (
    // <Pressable onPress={()=>{}}>
    <LinearGradient
    // 7479BF
    //38B0E8
      colors={['#ddd', '#999']} // Define your gradient colors
      start={{ x: 0, y: 0 }} // Gradient start point
      end={{ x: 1, y: 0 }} // Gradient end point
      style={tw`w-full rounded-xl p-5 pt-8 shadow-xl self-center`} 
    >
      <View style={tw`flex justify-between`}>
        <Text style={tw`text-[#fff]`}>{accountNumber}</Text>
        <Text style={tw`text-xl font-bold text-white`}>{accountTitle}</Text>
      </View>
      <View style={tw`mt-4`}>
        <Text style={tw`font-bold text-lg text-gray-200 self-end`}>{balance}&nbsp;원</Text>
      </View>
    </LinearGradient>
    // </Pressable>
  );
};

export default SelectAccountItem;