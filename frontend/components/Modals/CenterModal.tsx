import React,{useEffect} from 'react';
import { Text, View, Modal } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

import tw from 'twrnc'; 

import { useRecoilState} from 'recoil';
import {centerModalState} from '../../recoil/centerModal/atom';

// 컴포넌트
import EventMapAnimation from '../Animation/EventMapAnimation';

function CenterModal({ modalTitle, content}: CenterModalProps){
    
    const [modalVisible, setModalVisible] = useRecoilState<CenterModalState>(centerModalState);

    useEffect(()=>{

    },[modalVisible])

    return(
        // 전체 배경
        <View style={tw`flex-1`}>
            
            {/* 모달창 뜰 때 배경 블러처리 */}
            <Pressable>
                {modalVisible&&<View style={tw`w-full h-full bg-black opacity-30`}></View>}
            </Pressable>

            <Pressable>
                <View style={tw`flex-1`}><EventMapAnimation/></View>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible.open}
                onRequestClose={() => {
                    setModalVisible(!modalVisible.open);
                }}>
                {/* 실제 모달 위치 조정 */}
                <View style={tw`flex-1 justify-center items-center mt-22 shadow-md`}>
                    {/* 실제 모달 크기 조절*/}
                    <View style={tw`m-20 bg-white rounded-2xl shadow-[#000] w-5/6 h-2/6`}>

                            <View style={tw `flex-2`}>
                                <Text style={tw`mb-5 text-left text-3xl font-black p-5`}>{modalTitle}</Text>
                            </View>

                            <View style={tw `flex-2 pl-5`}>
                                <Text style={tw`mb-5 text-left text-xl`}>{content}</Text>
                            </View>

                            <View style={tw `flex-1 w-full`}>
                                <Pressable
                                    style={tw`rounded-2xl bg-[#7B5AF3] w-full h-full`}
                                    onPress={() => setModalVisible((prevValue)=>{
                                        const newValue={
                                            open : false,
                                            event : false,
                                        }

                                        return newValue;
                                    })}>
                                        <View style={tw`text-white bg-[#7B5AF3]`}>
                                            <Text style={tw`text-white font-bold text-center text-xl pt-2`}>이동하기</Text>
                                        </View>
                                </Pressable>
                            </View>
                     
                    </View>
                </View>
            </Modal>
        </View>
    )

}


export default CenterModal;


// CenterModal 컴포넌트의 Props 타입 정의
interface CenterModalProps {
    modalTitle: string;
    content: string;
}

interface CenterModalState{
    open:boolean;
    event:boolean;
}