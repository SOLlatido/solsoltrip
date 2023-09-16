import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { MaterialCommunityIcons, FontAwesome, Feather, MaterialIcons, Entypo} from '@expo/vector-icons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import PlaceholderImage from "../../assets/images/sol_expense_large.png";
import ImageViewerSmall from './ImageViewerSmall';
const imageSource = null;


//숙소 항공 교통 관광 식비 쇼핑 기타
const Category = ({categoryNum}:{categoryNum : number}) => {
    return (
        <>
        <View style={tw `pb-1 pt-1`}>
        {categoryNum === 0 && (
          <MaterialIcons name="hotel" size={20} color="black" />
        )}
        {categoryNum === 1 && (
        <FontAwesome name="plane" size={20} color="black" />
        )}
        {categoryNum === 2 && (
        <FontAwesome name="bus" size={20} color="black" />
        )}
        {categoryNum === 3 && (
        <Entypo name="location" size={20} color="black" />
        )}
        {categoryNum === 4 && (
        <MaterialCommunityIcons name="food-fork-drink" size={18} color="black" />
        )}
        {categoryNum === 5 && (
        <Feather name="shopping-bag" size={20} color="black" />
        )}
        {categoryNum === 6 && (
        <FontAwesome name="question" size={20} color="black" />
        )}
        {categoryNum === 7 && (
          <></>
        )}
        </View>
        </>
    )
}

const ExpenseItem = (props:{expenseTitle:string, memo:string,expense:string, date:string, category:string}) => {
    const navigation = useNavigation()
    const {expenseTitle, memo, expense, date, category} = props;

    const handleExpensePress = () => {
    navigation.navigate("ExpenseDetail" as never, {
      imageSource,
      expenseTitle,
      memo,
      date,
      expense,
      category,
    } as never)
  }
  return (
    <TouchableOpacity onPress={handleExpensePress} style={tw.style('bg-[#DFEEF3]/40 mb-3 rounded-2 h-19 flex-row p-3')}>
      <View style={tw.style('ml-3 items-center justify-center')}>
        <ImageViewerSmall
          placeholderImageSource={imageSource? imageSource : PlaceholderImage}
        >
        </ImageViewerSmall>
      </View>
      <View style={tw.style('flex-3 p-2 justify-center')}>
        <Text style={tw `font-bold text-[#333] mb-1`} numberOfLines={1} ellipsizeMode='tail'>{props.expenseTitle}</Text>
        <Text style={tw `text-xs`} numberOfLines={1} ellipsizeMode='tail'>{props.memo===null?"메모가 없습니다":props.memo}</Text>
      </View>
      <View style={tw.style('justify-center items-end p-1 pr-2')}>
        <Category categoryNum={Number(props.category)}></Category>
        <Text style={tw `font-bold text-[#333] mb-0`}>{props.expense}</Text>
        <Text style={tw `text-[2.4] tracking-tighter`}>{props.date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ExpenseItem;
