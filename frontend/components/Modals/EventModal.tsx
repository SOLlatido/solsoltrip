import React,{useEffect} from 'react';
import { Text, View, Modal, Image } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

import tw from 'twrnc'; 

import { useRecoilState} from 'recoil';
import {centerModalState} from '../../recoil/centerModal/atom';

// 캐릭터 이미지
import sol_charater2 from '../../assets/character/sol_character2.png';

// 컴포넌트
import EventMapAnimation from '../Animation/EventMapAnimation';

interface EventModalProps {
    modalTitle: string;
    content: string;
  }

const EventModal:React.FC<EventModalProps> = ({ modalTitle, content, point }: CenterModalProps) => {
    
    const [modalVisible, setModalVisible] = useRecoilState<CenterModalState>(centerModalState);

    useEffect(()=>{

    },[modalVisible])

    return(
        // 전체 배경
        <View style={tw`flex-1`}>

            <Pressable onPress={()=>{
                setModalVisible({
                    open:false,
                    event:false,
                })
            }}>
                <View style={modalVisible.open?tw`w-[1000px] h-[1000px] mt-100`:null}><EventMapAnimation/></View>
            </Pressable>

            <Pressable onPress={()=>{
                setModalVisible({
                    open:false,
                    event:false,
                })
            }}>
                <View style={modalVisible.open?[tw`w-[10000px] h-[10000px] mt--50`, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]:null}><EventMapAnimation/></View>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible.open}
                onRequestClose={() => {
                    setModalVisible(!modalVisible.open);
                }}>
                <View style={tw`flex-1 justify-center items-center mt-2 shadow-md`}>                    
                    
                    {/* 실제 모달 크기 조절*/}
                    <Image
                    source={sol_charater2} // 이미지를 직접 지정합니다.
                    style={{ width: 120, height: 120 }} // 이미지 크기를 조정하세요.
                    />
                    <View style={tw`m--7 bg-white rounded-2xl shadow-[#000] w-5/6 h-3/6`}>

                            <View style={tw `flex-2`}>
                                <Text style={tw`mb-5 text-center text-3xl font-black pt-10`}>신한 지역상생 포인트</Text>
                            </View>

                            <View style={tw `flex-3`}>
                                <Text style={tw`mb-5 text-center text-6xl font-black pt-10 text-[#0046FF]`}>{point}P</Text>
                            </View>

                            <View style={tw `flex-2`}>
                                <Text style={tw`text-xl text-center`}>{content}</Text>
                            </View>

                            <View style={tw `flex-1 w-full`}>
                                <Pressable
                                    style={tw`rounded-2xl bg-[#7B5AF3] w-full h-full`}
                                    onPress={() => setModalVisible(()=>{
                                        const newValue={
                                            open : false,
                                            event : false,
                                        }

                                        return newValue;
                                    })}>
                                        <View style={tw`text-white bg-[#7B5AF3]`}>
                                            <Text style={tw`text-white font-bold text-center text-xl pt-2`}>확인</Text>
                                        </View>
                                </Pressable>
                            </View>
                     
                    </View>
                </View>
            </Modal>
        </View>
    )

}


export default EventModal;


// CenterModal 컴포넌트의 Props 타입 정의
interface CenterModalProps {
    modalTitle: string;
    content: string;
    point:number;
}

interface CenterModalState{
    open:boolean;
    event:boolean;
}