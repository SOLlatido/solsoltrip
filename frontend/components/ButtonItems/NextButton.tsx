import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc'; 
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const NextButton = (props: { router: string, action:()=>void}) => {
  const {router, action} = props;
  console.log(router)
  const navigate = useNavigation();
  //router값에 따라 다음 페이지 표시
  const handleNextPage = () =>{
    action();
    navigate.navigate(router as never);
  
  }
  return (
    <View style={tw `flex absolute bottom-15 w-6/7 p-4 self-center items-end justify-center shadow-md`}>
      <TouchableOpacity
        onPress={()=>{
          handleNextPage();
          
        }}
        activeOpacity={0.8}
        style={tw`w-15 h-15 bg-[#51C0C7] rounded-full justify-center items-center shadow-lg shadow-black`}
      >
        <Text style={tw `text-white text-lg font-semibold`}><Ionicons name="arrow-forward-sharp" size={24} color="white" /></Text>
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;
