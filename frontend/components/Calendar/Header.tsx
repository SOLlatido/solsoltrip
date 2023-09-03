import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

/**
 * 이전 달 년도 다음 버튼으로 구성
 * 
 */
function Header(props){

    const [yearModalVisible, setYearModalVisible] = useState(false);
    const [monthModalVisible, setMonthModalVisible] = useState(false);

    return(
        <>
            <View style={styles.header}>

                <Pressable
                    onPress={props.moveToPreviousMonth.bind(this, props.month)}
                    style={({pressed})=> pressed && styles.pressed}
                >
                    <Ionicons name="chevron-back" size={24} color="black" />
                </Pressable>

                <View style={{ flexDirection: "row" }}>
                    <Pressable>
                        <Text>{props.month}월</Text>
                    </Pressable>
                    <Pressable>
                        <Text>{props.year}</Text>
                    </Pressable>
                </View>
                
                <Pressable onPress={props.moveToNextMonth.bind(this, props.month)}>
                    <Ionicons name="chevron-forward" size={24} color="black" />
                </Pressable>

            </View>
        </>
    )
}

export default Header;

const styles = StyleSheet.create({
    header:{
        marginTop: 60,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },

    pressed:{
        opacity:0.3,
    }
})