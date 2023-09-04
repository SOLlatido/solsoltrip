import React from 'react';
import { View, Text, Pressable } from 'react-native';
import tw from 'twrnc';

const AccountItem = ({ accountNumber, travelTitle, duration, numberOfPeople }) => {
  return (
    <Pressable onPress={()=>console.log("pressed!")}>
    <View style={tw`bg-white rounded-2xl p-5 py-9 mb-5 shadow-md w-6/7 self-center`}>
      <View style={tw`flex justify-between`}>
        <Text style={tw`text-gray-500`}>{accountNumber}</Text>
        <Text style={tw`text-lg font-bold`}>{travelTitle}</Text>
        <Text style={tw`text-gray-500`}>{duration}</Text>
      </View>
      <View style={tw`mt-4`}>
        <Text style={tw`text-gray-500`}>나의 동행: {numberOfPeople}명 <Pressable><Text></Text></Pressable></Text>
      </View>
    </View>
    </Pressable>
  );
};

export default AccountItem;