import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc'; 
import { useNavigation } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const NextButton = (props: { router: string}) => {
  const {router} = props;
  const navigate = useNavigation();
  //router값에 따라 다음 페이지 표시
  const handleNextPage = () =>{
    navigate.navigate(router as never);
  }
  return (
    <View style={tw `flex absolute bottom-10 w-3/4 p-4 self-center items-center justify-center`}>
      <TouchableOpacity
        onPress={handleNextPage}
        activeOpacity={0.8}
        style={tw`w-6/7 bg-[#7B5AF3] h-12 rounded-[4] justify-center items-center shadow-md`}
      >
        <Text style={tw `text-white text-lg font-semibold`}><Ionicons name="arrow-forward-sharp" size={24} color="white" /></Text>
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;
