import {View, Text} from 'react-native';
import tw from 'twrnc'; 
import { Ionicons } from "@expo/vector-icons";

// 컴포넌트
import Calendar from '../components/Calendar/Calendar';
import LongButton from '../components/ButtonItems/LongButton';

function EndTimeReset(){

    return(
        <View style={tw `flex-1 bg-white`}>

            <View style={tw `flex-1 flex-row justify-center items-center`}>
                <Ionicons style={tw `flex-1 text-4xl pt-10 pl-3`} name="close-outline" size={24} color="black" />
                <Text style={tw `flex-2 pt-10 text-xl font-black`}>종료날짜 선택</Text>
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