import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc'; 

const LongButton = (props: { content: string, onPress?:()=>void }) => {
  const {content, onPress} = props;
  return (
    <View style={tw `flex-1 p-4 w-full items-center justify-center`}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={tw`w-6/7 bg-[#7B5AF3] h-12 rounded-[4] justify-center items-center `}
        onPress={onPress}
      >
        <Text style={tw `text-white text-lg font-semibold`}>{content}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LongButton;
