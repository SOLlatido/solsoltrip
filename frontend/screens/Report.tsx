import React from 'react'
import { View, Text, ImageBackground, ScrollView} from 'react-native'
import main_aurora from "../assets/images/main_aurora.png"
import tw from "twrnc"
import GoalGraph from '../components/Graph/GoalGraph'
import { PieChart } from 'react-native-chart-kit'
const totalExpense = "980000"
const myExpense = "300000"
const colorList = ["#ac9be8", "#907ae1", "#7459d9", "#5d47ae", "#513e98", "#3a2d6d", "#2e2457"]
const donutColorList = ["#ac9be8", "#907ae1", "#7459d9", "#5d47ae", "#513e98", "#3a2d6d", "#2e2457"]
const expensesByPerson = [
  { name: '석다영', expense: 180000 },
  { name: '신산하', expense: 300000},
  { name: '이승현', expense: 200000},
  { name: '김민식', expense: 300000},
];
const category = ["숙소", "항공", "교통", "관광", "식비", "쇼핑", "기타"];
const expensesByCategory = [10000, 30000, 50000, 65000, 25000, 0, 0];
interface PieContent {
  name : string,
  population : number,
  color : string
}
const pieData = category.map((name, index) => ({
  name,
  population: expensesByCategory[index],
  color: colorList[index],
}));
const goal = "50,0000"
const goalData = [
  {value : 60, color : "#5d47ae", text : '60%'},
  {value : 40, color : "white", text : null},
]

function Report() {
  const calculateProportion = (expense:number) => (expense / totalExpense) * 100;
  return (
    <>
    <View style={tw `bg-[#ECEBDD] w-full h-full`}>
    <ImageBackground source={main_aurora} style={tw `w-full h-full absolute`}></ImageBackground>
    <View style={tw `mt-30`}>
      <Text style={tw `self-center font-bold text-lg text-[#333]`}>지출 리포트</Text>
    </View>
    <ScrollView style={tw `p-5`}>
      <View style={tw `w-full bg-[#fff]/40 rounded-2 mb-5`}>
        <View style={tw `p-5`}>
        <View style={tw `flex-row mb-2`}>
          <Text style={tw ``} >총 지출</Text>
          <View style={tw `w-10`}></View>
          <Text style={tw `font-bold text-[#443]`} >{totalExpense}원</Text>
        </View>

        <View style={tw `flex-row`}>
          <Text style={tw ``} >나의 지출</Text>
          <View style={tw `w-6.5`}></View>
          <Text style={tw `font-bold text-[#7459d9]`} >{myExpense}원</Text>
        </View>
        </View>
      </View>
      <Text style={tw `mb-2 font-bold text-[#444] ml-2`}>동행별 지출</Text>
      <View style={tw `w-full bg-[#fff]/40 rounded-2 p-5`}>
             {/* Horizontal bar chart */}
             {expensesByPerson.map((person, index) => (
            <View key={index} style={tw `h-7 flex-row items-center`}>
              <View
                style={{
                  backgroundColor: colorList[index],
                  width: `${calculateProportion(person.expense)}%`, // Set the width based on the proportion
                  height: 7,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              ></View>

              <View style={tw `ml-2 flex-row items-center`}>
                <Text style={tw `ml-0 text-xs text-[#444]`}>{person.name}</Text>
                <Text style={tw `ml-2 text-xs text-[${colorList[index]}]`}>{person.expense}원</Text>
              </View>
            </View>
          ))}
      </View>
      <Text style={tw `mb-2 font-bold text-[#444] ml-2 mt-5`}>나의 카테고리별 지출</Text>
      <View style={tw `w-full bg-[#fff]/40 rounded-2 p-5`}>
      <PieChart
            data={pieData}
            width={300}
            height={200}
            chartConfig={{
              color : (opacity = 0.5) => `rgba(0,0,0,${opacity}`,
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"10"}
            center={[10, 5]}
            style={{
              opacity: 0.9, // Make the pie chart 60% transparent
            }}
            hasLegend = {true}
            
            legendConfig={{
              labelFontSize: 14,
              labelColor: 'black', // Customize the legend label color
              iconColor: 'black', // Customize the legend icon color
              iconSize: 14,
              legendOffsetX: -10, // Push the legends a little to the right
            }}
                />
          {/* <PieChart
            focusOnPress
            shadow={true}
            donut
            innerCircleColor="#DBE4E1"
            innerRadius={70}
            showText={true}
            showValuesAsLabels={true}
            labelsPosition='onBorder'
            textColor="#444"
            radius={100}
            textSize={15}
            // showTextBackground
            textBackgroundRadius={26}
            data={pieData}
            centerLabelComponent={()=>{<Text>hi</Text>}}
            /> */}
      </View>
      <Text style={tw `mb-2 font-bold text-[#444] ml-2 mt-5`}>동행 통장 지출 목표 비교</Text>
      <View style={tw `w-full bg-[#fff]/40 rounded-2 p-5 pt-10 h-45 flex-row`}>
          <GoalGraph data={goalData}></GoalGraph>
          <View style={tw `items-center`}>
            <Text style={tw `text-xs font-bold text-[#333]`}>총 지출 목표</Text>
            <Text style={tw `text-sm font-bold mb-3`}>{goal}</Text>
            <Text style={tw `text-xs font-bold text-[#5d47ae]`}>누적 지출액</Text>
            <Text style={tw `text-sm font-bold text-[#5d47ae]`}>{myExpense}</Text>
          </View>
      </View>
    </ScrollView>
    </View>
    </>
  )
}

export default Report