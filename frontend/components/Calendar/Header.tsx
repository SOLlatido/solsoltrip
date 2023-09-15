import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

import tw from 'twrnc'; 

/**
 * 이전 달 년도 다음 버튼으로 구성
 * 
 */
function Header(props){

    const [yearModalVisible, setYearModalVisible] = useState(false);
    const [monthModalVisible, setMonthModalVisible] = useState(false);

    return(
        <>
            <View style={tw `mt-10 flex-row justify-between items-center`}>

                <Pressable
                    onPress={props.moveToPreviousMonth.bind(this, props.month)}
                    style={({pressed})=> pressed && tw `opacity-30`}
                 
                >
                    <Ionicons name="chevron-back" size={24} color="black" style={tw `pl-5`} />
                </Pressable>

                <View style={{ flexDirection: "row" }}>
                    <Pressable>
                        <Text style={tw `text-xl pr-1`}>{props.month}월</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={tw `text-xl`}>{props.year}</Text>
                    </Pressable>
                </View>
                
                <Pressable 
                    onPress={props.moveToNextMonth.bind(this, props.month)}
                    style={({pressed})=> pressed && tw `opacity-30`}
                >
                    <Ionicons name="chevron-forward" size={24} color="black" style={tw `pr-5`} />
                </Pressable>

            </View>
        </>
    )
}

export default Header;