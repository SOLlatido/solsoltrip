import React,{useEffect} from 'react';
import { Text, View, Modal } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

import tw from 'twrnc'; 

import { useRecoilState} from 'recoil';
import {centerModalState} from '../../recoil/centerModal/atom';
import { useNavigation } from '@react-navigation/native';

function TwoBtnModal({ modalTitle, content}: CenterModalProps){
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useRecoilState<CenterModalState>(centerModalState);

    useEffect(()=>{

    },[modalVisible])

    return(
        // 전체 배경
        <View style={tw`z-50 flex-1`}>

            <Modal
                // animationType="slide"
                transparent={true}
                visible={modalVisible.open}
                onRequestClose={() => {
                    setModalVisible(!modalVisible.open);
                }}
            >
                {/* 실제 모달 위치 조정 */}
                <View style={tw`bg-black/50 w-full h-full flex-1 justify-center items-center shadow-md`}>

                    {/* 실제 모달 크기 조절*/}
                    <View style={tw`m-20 bg-white shadow-[#000] w-5/6 h-2/6 rounded-lg`}>

                            <View style={tw `flex-2`}>
                                <Text style={tw`mb-5 text-left text-3xl font-black p-5`}>{modalTitle}</Text>
                            </View>

                            <View style={tw `flex-2 pl-5`}>
                                <Text style={tw`mb-5 text-left text-xl`}>{content}</Text>
                            </View>

                            <View style={tw `flex-1 flex-row w-full`}>
                                <Pressable
                                    style={tw`flex-1 rounded-bl-lg bg-[#7B5AF3] h-full`}
                                    onPress={() => setModalVisible(()=>{
                                        const newValue={
                                            open : false,
                                            event : false,
                                        }

                                        return newValue;
                                    })}>
                                        <View style={tw`text-white bg-[#7B5AF3]`}>
                                            <Text style={tw`text-white font-bold text-center text-xl mt-3`}>취소</Text>
                                        </View>
                                </Pressable>

                                <Pressable
                                    style={tw`flex-1 rounded-br-lg xl bg-[#7B5AF3] h-full`}
                                    onPress={() => {setModalVisible(()=>{
                                        const newValue={
                                            open : false,
                                            event : false,
                                        }

                                        return newValue;
                                    })
                                    navigation.navigate("EndTimeHistory" as never);
                                }}>
                                        <View style={tw`text-white bg-[#7B5AF3] rounded-br-lg`}>
                                            <Text style={tw`text-white font-bold text-center text-xl pt-3`}>정산</Text>
                                        </View>
                                </Pressable>
                            </View>
                     
                    </View>
                </View>
            </Modal>
        </View>
    )

}


export default TwoBtnModal;


// CenterModal 컴포넌트의 Props 타입 정의
interface CenterModalProps {
    modalTitle: string;
    content: string;
}

interface CenterModalState{
    open:boolean;
    event:boolean;
}