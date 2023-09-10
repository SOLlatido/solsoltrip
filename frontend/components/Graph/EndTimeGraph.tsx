import {View, Text, Dimensions} from 'react-native';
import tw from 'twrnc'; 
import {LineChart} from "react-native-chart-kit";




const data = {
    datasets: [
      {
        data: [300, 100, 200, 80,300],
      },
    ],
};
  
const labels = ["08/29", "08/30", "08/31", "09/01","09/02"];
  
const chartConfig = {
    backgroundGradientFrom: '#0B49FF',
    backgroundGradientTo: '#9E5FEE',
    backgroundGradientFromOpacity: 0.2,
    backgroundGradientToOpacity: 0.2,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, 1)`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, 1)`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#9E5FEE',
    },
    
};


function EndTimeGraph(){

    return(
        <View>

            <View style={tw `pl-2`}>
                <Text style={tw `text-white font-bold ml-1`}>단위 : 천 원</Text>
            </View>

            <View style={tw ``}>
                <LineChart
                    data={{
                            labels,
                            datasets: data.datasets,
                        }}
                        width={Dimensions.get('window').width}
                        height={250}
                        chartConfig={chartConfig}
                        yAxisLabel="₩"
                        bezier
                        withInnerLines={false}
                        style={{
                            marginVertical: 9,
                            borderRadius: 16,
                        }}
                />
            </View>

        </View>
    )

}


export default EndTimeGraph