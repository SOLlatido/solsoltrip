import {View, Text, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc'; 
import { Ionicons } from "@expo/vector-icons";

// 이미지
import starrynight from '../assets/images/starrynight_bg.jpg';

// 컴포넌트
import EndTimeGraph from '../components/Graph/EndTimeGraph';
import LongButton from '../components/ButtonItems/LongButton';


function EndTimeHistory(){

    return(
        <View style={tw `flex-1 bg-white w-full`}>
            <ImageBackground source={starrynight} style={tw `w-full h-full bg-cover absolute`}></ImageBackground>

            {/* 동행통장 지출 금액 */}
            <View style={tw `flex-3 justify-center items-center`}>
                <View style={tw `flex-1 justify-center items-center`}>
                    <Text style={tw `text-xl text-white`}>동행통장 지출 금액</Text>
                    <Text style={tw `text-5xl font-bold text-white`}>980,000원</Text>
                </View>
            </View>

            {/* 스크롤 영역 */}
            <View style={tw `flex-5`}>
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
            </View>

            <View style={tw `flex-0.7 flex-row items-end justify-center`}>
                <LongButton content='다음'/>
            </View>

        </View>
    )

}


export default EndTimeHistory