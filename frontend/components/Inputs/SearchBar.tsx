import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

const SearchBar = (props : { onChangeText: any, value:string }) => {
  return (
    <View style={tw`border-[0.3] border-[#ddd] flex-row items-center bg-white rounded-2 h-13 px-4`}>
      <TextInput
        placeholder="입/출금 내역 검색"
        placeholderTextColor={"#777"}
        style={tw`flex-1 text-[#555] text-sm`}
        // onChangeText={onChangeText}
        // value={value}
      />
      <Ionicons name="search" size={22} color="#888" style={tw`mr-2`} />
    </View>
  );
};

export default SearchBar;
