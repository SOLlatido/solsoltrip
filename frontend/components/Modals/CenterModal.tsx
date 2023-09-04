import React, {useState} from 'react';
import { Text, View, Modal } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

import tw from 'twrnc'; 

function CenterModal(){
    
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return(
        // 전체 배경
        <View style={tw`flex-1 justify-center items-center bg-white opacity-90`}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                {/* 실제 모달 위치 조정 */}
                <View style={tw`flex-1 justify-center items-center mt-22 shadow-md`}>

                    {/* 실제 모달 크기 조절*/}
                    <View style={tw`m-20 bg-white rounded-2xl shadow-[#000] w-5/6 h-2/6`}>

                        <View style={tw `flex-2`}>
                            <Text style={tw`mb-5 text-left text-3xl font-black p-5`}>여행 종료</Text>
                        </View>

                        <View style={tw `flex-2 pl-5`}>
                            <Text style={tw`mb-5 text-left text-xl`}>산하님, 즐거운 여행 되셨나요?</Text>
                            <Text style={tw`mb-5 text-left text-xl mt--5`}>정산 내역을 안내해드리겠습니다.</Text>
                        </View>

                        <View style={tw `flex-1 w-full`}>
                            <Pressable
                                style={tw`rounded-2xl bg-[#7B5AF3] w-full h-full`}
                                onPress={() => setModalVisible(!modalVisible)}>
                                    <View style={tw`text-white bg-[#7B5AF3]`}>
                                        <Text style={tw`text-white font-bold text-center text-xl pt-2`}>이동하기</Text>
                                    </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={tw`rounded-2xl p-5 bg-[#2196F3]`}
                onPress={() => setModalVisible(true)}>
                <Text style={tw`text-white font-bold text-center`}>Show Modal</Text>
            </Pressable>
        </View>
    )

}


export default CenterModal;