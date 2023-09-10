import React from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const AccountItem = (props : { accountNumber:string, travelTitle:string, duration:string, numberOfPeople:number }) => {
  const navigation = useNavigation();
  const {accountNumber, travelTitle, duration, numberOfPeople} = props
  return (
    <Pressable onPress={()=>console.log("pressed!")}>
    <LinearGradient
      colors={['#7479BF', '#38B0E8']} // Define your gradient colors
      start={{ x: 0, y: 0 }} // Gradient start point
      end={{ x: 1, y: 0 }} // Gradient end point
      style={tw`rounded-2xl p-5 py-9 mb-5 shadow-2xl w-6/7 self-center`} 
    >
      <View style={tw`flex justify-between`}>
        <Text style={tw`text-[#fff]`}>{accountNumber}</Text>
        <Text style={tw`text-xl font-bold text-white`}>{travelTitle}</Text>
        <Text style={tw`text-gray-300 text-xs font-bold tracking-wider`}>{duration}</Text>
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