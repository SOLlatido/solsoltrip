import {View, Text} from 'react-native';
import tw from 'twrnc'; 
import { Ionicons } from "@expo/vector-icons";

// 컴포넌트
import Calendar from '../components/Calendar/Calendar';
import LongButton from '../components/ButtonItems/LongButton';

function EndTimeReset(){

    return(
        <View style={tw `flex-1 bg-white`}>

            <View style={tw `flex-1 justify-center items-center`}>
                <View style={tw `flex-1 flex-row justify-center items-center mt-20`}>
                    <Ionicons style={tw `flex-1 text-4xl pl-3`} name="close-outline" size={24} color="black" />
                    <Text style={tw `flex-2 text-xl font-black`}>종료날짜 선택</Text>
                </View>
                <View style={tw `flex-1 justify-center items-center mt-2`}>
                    <Text style={tw `text-sm text-neutral-500`}>종료 날짜는 오늘 날짜부터 선택하실 수 있어요</Text>
                </View>
            </View>



            <View style={tw `flex-3 bg-white`}>
                <Calendar/>
            </View>

            <View style={tw `flex-1 flex-row`}>
                <LongButton content='수정'/>
            </View>

        </View>
    )

}


export default EndTimeReset