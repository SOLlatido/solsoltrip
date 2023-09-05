import React, { useState } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import tw from 'twrnc';

const initialData = {
  labels: ["교통", "관광", "식비", "숙소", "기타"],
  datasets: [
    {
      data: [10.3, 126, 283.8, 452],
    },
  ],
};

const screenWidth = Dimensions.get("window").width;

const EndTimeBarGraph = () => {
  const chartConfig = {
    backgroundGradientFrom: "#0B49FF",
    backgroundGradientTo: "#9E5FEE",
    backgroundGradientFromOpacity: 0.2,
    backgroundGradientToOpacity: 0.2,
    color: (opacity = 1) => `rgba(255, 255, 255, 1)`,
    decimalPlaces: 0,
  };

  const [tooltipIndex, setTooltipIndex] = useState(null);

  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-3`}>
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
        />
        {tooltipIndex !== null && (
          <View
            style={tw`absolute bg-white p-2 rounded-lg shadow-lg`}>
            <Text style={tw`text-black`}>
              {initialData.datasets[0].data[tooltipIndex]}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default EndTimeBarGraph;
