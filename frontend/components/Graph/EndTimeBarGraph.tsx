import React, { useState } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import tw from 'twrnc';


const EndTimeBarGraph = (props:{data:number[], labels:string[]}) => {

  const initialData = {
    labels: ["교통", "관광", "식비", "숙소", "기타"],
    datasets: [
      {
        data: [10.3, 126, 283.8, 452, 100],
      },
    ],
  };
  
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#0B49FF",
    backgroundGradientTo: "#9E5FEE",
    backgroundGradientFromOpacity: 0.2,
    backgroundGradientToOpacity: 0.2,
    color: (opacity = 1) => `rgba(255, 255, 255, 1)`,
    decimalPlaces: 0,
  };

  return (
    <View style={tw`flex-1 mt-3`}>

        <View style={tw `pl-2`}>
            <Text style={tw `text-white font-bold ml-1`}>단위 : 천 원</Text>
        </View>


        <BarChart
          data={initialData}
          width={screenWidth}
          height={220}
          yAxisLabel="₩"
          yAxisSuffix=""
          chartConfig={chartConfig}
          fromZero
          yLabelsOffset={12}
          showValuesOnTopOfBars={true}
          withInnerLines={false}
          style={{
            marginVertical: 9,
            borderRadius: 16,
        }}
        />
    </View>
  );
};

export default EndTimeBarGraph;
