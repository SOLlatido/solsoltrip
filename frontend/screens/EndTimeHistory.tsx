import {View, Text, ImageBackground, SafeAreaView, ScrollView } from 'react-native';
import tw from 'twrnc'; 
import { Ionicons } from "@expo/vector-icons";

import {LineChart} from "react-native-chart-kit";

// 이미지
import starrynight from '../assets/images/starrynight_bg.jpg';

// 컴포넌트
import EndTimeGraph from '../components/Graph/EndTimeGraph';


function EndTimeHistory(){

    return(
        <View style={tw `flex-1 bg-white`}>
            <ImageBackground source={starrynight} style={tw `w-full h-full bg-cover absolute`}></ImageBackground>

            {/* 동행통장 지출 금액 */}
            <View style={tw `flex-1 justify-center items-center`}>
                <View style={tw `flex-1 justify-center items-center`}>
                    <Text style={tw `text-xl text-white`}>동행통장 지출 금액</Text>
                    <Text style={tw `text-5xl font-bold text-white`}>980,000원</Text>
                </View>
            </View>

            {/* 스크롤 영역 */}
            <SafeAreaView>
                <ScrollView>
                    {/* 그래프 */}
                    <View style={tw `flex-1`}>
                        <EndTimeGraph/>
                    </View>

                    <View style={tw `flex-1`}>
                        
                    </View>
                </ScrollView>
            </SafeAreaView>

            <View style={tw `flex-1 flex-row`}>
                
            </View>

        </View>
    )

}


export default EndTimeHistory