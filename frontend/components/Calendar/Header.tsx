import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
// import SelectMonthModal from "../Modal/SelectMonthModal";
// import SelectYearModal from "../Modal/SelectYearModal";

/**
 * 이전 달 년도 다음 버튼으로 구성
 * 
 */
function Header(){

    return(
        <>
            <View style={styles.header}>

                <Pressable
                    style={({pressed})=> pressed && styles.pressed}
                >
                    <Ionicons name="chevron-back" size={24} color="black" />
                </Pressable>

                <View style={{ flexDirection: "row" }}>
                    <Pressable>
                        <Text>9월 </Text>
                    </Pressable>
                    <Pressable>
                        <Text>2023</Text>
                    </Pressable>
                </View>
                
                <Pressable>
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