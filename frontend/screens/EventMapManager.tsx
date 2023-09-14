// axios
import {authHttp, nonAuthHttp} from '../axios/axios';
import { AxiosResponse, AxiosError } from "axios"

import {useEffect} from 'react';
import {View} from 'react-native';

import NationalTouristInformation from '../Data/NationalTouristInformation.json';

// 장소 등록
    //1. 이벤트 장소 설정
    async function setEventArea(data:EventAreaData): Promise<void> {
        // data form ()
        // {"경도": "128.9024348", "공공편익시설정보": "음식점+화장실+주차장+의무실", "관광지구분": "관광지", "관광지명": 
        // "가야랜드", "관광지소개": "가야테마파크 건너편에 자리한 어드벤처 놀이동산", "관리기관명": "경상남도 김해시청", "관리기관전화번호": "055-330-3241", "데이터기준일자": "2023-06-29", "면적": "1352.91", "소재지도로명주소": "경상남도 김해시 인제로 368(삼방동)", "소재지 
        // 지번주소": "경상남도 김해시 삼방동 1391-2", "수용인원수": "1000", "숙박시설정보": "카라반+글램핑+오토캠핑장", "운동및오락시설정보": 
        // "14종의 유기기구", "위도": "35.25817158", "접객시설정보": "", "제공기관명": "경상남도 김해시", "제공기관코드": "5350000", "주차가능 
        // 수": "398", "지원시설정보": "", "지정일자": "1991-10-05", "휴양및문화시설정보": ""}

        // {
        //     "name" : "한밭수목원", //관광지명
        //     "description" : "가야테마파크 건너편에 자리한 어드벤처 놀이동산",
        //     "x" : "128.9024348", //경도
        //     "y" : "35.25817158", //위도
        // }

        //pick List
        // 경상북도(집중호우 피해) 울진군(산불피해 - 관광객 받는중) 군위군 의성군 청송군
        // 전라남도(집중호우 피해) 고흥, 강진군, 구례군
        // 강원도 춘천 원주 속초 제외 전 지역
        // 경상남도 
        // 충청남도(집중호우 피해) 서천 청양 부여
        // 충청북도(집중호우 피해) 괴산 보은
        // 경기도 가평 양평 연천 여주 포천
        try {

            const response: AxiosResponse<EventResponse> = await nonAuthHttp.post<EventResponse>(`/api/event/regist`, data);
            const result: EventResponse = response.data; //{status, message}
            
            if(result){
                console.log(result.message);
            }

        } catch (error) {
            const err = error as AxiosError
            console.log(err);
            throw err; // 에러 핸들링을 위해 예외를 던집니다.
        }
    }

const EventMapManager = () => {
    const newMap = {
        name: "충남대학교",
        description: "대전 대표 대학교",
        x: 127.345064,
        y: 36.364994,
    }
    

    useEffect(()=>{
        setEventArea(newMap);
    },[])
    

    return(
        <View>

        </View>
    )

}



export default EventMapManager


  // 이벤트
  
  //1. 이벤트 장소 설정 -> 관리자용
type EventAreaData = {
    name : string,
    description : string,
    x : number,
    y : number,
}
  
type EventResponse = {
    status : number,
    message : string,
}
  
//2. 이벤트 장소 주변 알림/도착 알림/포인트
type EventArrivalRequest = {
    memberSeq : number,
    x : number,
    y : number,
}
  
type EventArrivalResponse = {
    // display가 true인 전체 장소 다
    status : number,
    message : string,
    Arrived : boolean,
    point : number,
    totalResponseVOList : EventAreaData[], //전체 이벤트 지역 리스트
    responseVOList : ResponseVOList[] //모달용 이름
}
  
  
type ResponseVOList = {
    name : number,
}
  