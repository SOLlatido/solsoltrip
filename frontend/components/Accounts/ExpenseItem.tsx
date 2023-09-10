import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { MaterialCommunityIcons, FontAwesome, Feather, MaterialIcons, Entypo} from '@expo/vector-icons';
import tw from 'twrnc';
const imageSource = null;
const expenseTitle = "AKPLAZA 강릉점"
const memo = "맛있는 스시를 먹었다! 여기서 다음 일정도 짰다"
const date = "07-15 11:57"
const expense = "- 34,500"
const category:number = 4
//숙소 항공 교통 관광 식비 쇼핑 기타
const Category = ({categoryNum}:{categoryNum : number}) => {
    return (
        <>
        <View style={tw `pb-1 pt-1`}>
        {categoryNum === 1 && (
          <MaterialIcons name="hotel" size={20} color="black" />
        )}
        {categoryNum === 2 && (
        <FontAwesome name="plane" size={20} color="black" />
        )}
        {categoryNum === 3 && (
        <FontAwesome name="bus" size={20} color="black" />
        )}
        {categoryNum === 4 && (
        <Entypo name="location" size={20} color="black" />
        )}
        {categoryNum === 5 && (
        <MaterialCommunityIcons name="food-fork-drink" size={18} color="black" />
        )}
        {categoryNum === 6 && (
        <Feather name="shopping-bag" size={20} color="black" />
        )}
        {categoryNum === 7 && (
        <FontAwesome name="question" size={20} color="black" />
        )}
        </View>
        </>
    )
}

const ExpenseItem = () => {
  return (
    <TouchableOpacity style={tw.style('bg-[#F3F0FB] mb-3 rounded-2 h-19 flex-row')}>
      <View style={tw.style('ml-3 items-center justify-center')}>
      {imageSource ? (
          <Image
            source={imageSource}
            style={tw.style('w-13 h-13 rounded-2')}
            resizeMode="cover"
          />
        ) : (
          <View style={tw.style('bg-gray-300 w-15 h-14 rounded-2')} />
        )}
      </View>
      <View style={tw.style('flex-3 p-2 justify-center')}>
        {/* Content for the second view */}
        <Text style={tw `font-bold text-[#333] mb-1`} numberOfLines={1} ellipsizeMode='tail'>{expenseTitle}</Text>
        <Text style={tw `text-xs`} numberOfLines={1} ellipsizeMode='tail'>{memo}</Text>
      </View>
      <View style={tw.style('justify-center items-end p-1 pr-2')}>
        {/* Content for the third view */}
        {/* <MaterialCommunityIcons name="food-fork-drink" size={20} color="black" /> */}
        <Category categoryNum={category}></Category>
        <Text style={tw `font-bold text-[#333] mb-0`}>{expense}</Text>
        <Text style={tw `text-[2.4] tracking-tighter`}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ExpenseItem;
