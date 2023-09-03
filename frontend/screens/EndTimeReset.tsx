import {View, Text} from 'react-native';
import tw from 'twrnc'; 

// 컴포넌트
import Calendar from '../components/Calendar/Calendar';
import LongButton from '../components/ButtonItems/LongButton';

function EndTimeReset(){

    return(
        <View style={tw `flex-1`}>

            <View style={tw `flex-1 justify-center items-center`}>
                <Text style={tw `pt-10 text-xl font-black`}>종료날짜를 재설정해주세요</Text>
            </View>


            <View style={tw `flex-3 bg-white`}>
                <Calendar/>
            </View>

            <View style={tw `flex-1 flex-row`}>
                <LongButton content='취소'/>
                <LongButton content='완료'/>
            </View>

        </View>
    )

}


export default EndTimeReset