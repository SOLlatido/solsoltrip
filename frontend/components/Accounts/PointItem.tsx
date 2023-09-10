import React from 'react';
import { View, Text} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const PointItem = (props : { accountNumber:string, point:number }) => {
  const navigation = useNavigation();
  const {accountNumber, point} = props
  return (
    <LinearGradient
      colors={['#7479BF', '#38B0E8']} // Define your gradient colors
      start={{ x: 0, y: 0 }} // Gradient start point
      end={{ x: 1, y: 0 }} // Gradient end point
      style={tw`rounded-2xl p-5 py-9 mb-5 shadow-2xl w-6/7 self-center`} 
    >

        <View style={tw`flex justify-between pb-3`}>
            <Text style={tw`text-[#fff]`}>{accountNumber}</Text>
            <Text style={tw`text-[#fff] text-lg font-bold`}>마이신한포인트</Text>
        </View>

        <View style={tw`flex justify-between`}>
            <Text style={tw`text-4xl font-bold text-white`}>{point}P</Text>
        </View>
    </LinearGradient>
  );
};

export default PointItem;