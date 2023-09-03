import {View, Text, StyleSheet} from 'react-native';
import tw from 'twrnc'; 

// 컴포넌트
import Calendar from '../components/Calendar/Calendar';
import LongButton from '../components/ButtonItems/LongButton';

function EndTimeReset(){

    return(
        <View style={styles.containerView}>

            <View style={styles.introView}>
                <Text style={styles.statementText}>종료날짜를 재설정해주세요</Text>
            </View>


            <View style={styles.calendarView}>
                <Calendar/>
            </View>

            <View style={tw `flex-1 flex-row`}>
                <LongButton content='취소'/>
                <LongButton content='완료'/>
            </View>

            <View style={styles.bottomNavView}></View>

        </View>
    )

}


const styles = StyleSheet.create({

    containerView: {
        flex: 1,
    },


    // 상단 안내 문구 영역
    introView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
    },
    
    statementText:{
        paddingTop:30,
        fontSize:20,
        fontWeight:"900",
    },


    // 달력 영역
    calendarView:{
        flex: 3,
        backgroundColor:"yellow",
    },

    // 취소 완료 버튼 영역
    buttonsView:{
        flex: 1,
        backgroundColor:"green",
    },

    // 하단 nav 영역
    bottomNavView:{

    }

})


export default EndTimeReset