import axios, { AxiosInstance, InternalAxiosRequestConfig , AxiosResponse, AxiosError } from "axios"
import Storage from "expo-storage";
import {Alert} from 'react-native';
import {useRecoilState} from 'recoil';
import {endTripState} from '../recoil/endTrip/atom';

import NationalTouristInformation from '../Data/NationalTouristInformation.json';

const nonAuthHttp : AxiosInstance = axios.create({
    // baseURL : import.meta.env.VITE_APP_SERVER as string,
    baseURL : "http://j9b103.p.ssafy.io:8080/",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials : true,
})

const accessToken = Storage.getItem('accessToken' as any);
const authHttp = axios.create({
    baseURL : "http://j9b103.p.ssafy.io:8080/",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken,
    },
    withCredentials : true,
});

export {authHttp, nonAuthHttp}

// 사용 예시 :
// 다른 파일에서 http 임포트 후
// function getCalendar(){
//     async function requestCalendar(): Promise<void> {
//         try {
//             const response: AxiosResponse<CalendarData> = await authHttp.get<CalendarData>(`/calendar/study?user=${pk}`);
//             const {calendar} = response.data;
//             if(calendar){
//               setData(calendar)
//             }
//         } catch (error) {
//             const err = error as AxiosError
//             console.log(err);
//         }
//     }
//     requestCalendar()
// }



// 이벤트
function event(){

    // const [eventMap, setEventMap] = useRecoilState(eventMapState);

    //1. 이벤트 장소 설정
    async function setEventArea(data:EventAreaData): Promise<EventResponse> {
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

            const response: AxiosResponse<EventResponse> = await authHttp.post<EventResponse>(`/api/event/regist`, data);
            const result: EventResponse = response.data; //{status, message}
            
            if(result){
              console.log(result.message);
            }
            return result;

        } catch (error) {
            Alert.alert("시스템 에러입니다.\n빠른 시일 내 조치를 취하겠습니다.");
            const err = error as AxiosError
            console.log(err);
            throw err; // 에러 핸들링을 위해 예외를 던집니다.
        }
    }

    //2. 이벤트 장소 주변 알림/도착 알림/포인트
    async function getArrival(data:EventArrivalRequest): Promise<EventArrivalResponse> {
        try {
            const response: AxiosResponse<EventArrivalResponse> = await authHttp.post<EventArrivalResponse>(`api/event/nearbyOrArrivalInform`, data);
            const result = response.data;

            return result;
            
        } catch (error) {
            Alert.alert("시스템 에러입니다.\n빠른 시일 내 조치를 취하겠습니다.");
            const err = error as AxiosError
            console.log(err);
            throw err; // 에러 핸들링을 위해 예외를 던집니다.
        }
    }

}

export {event};


// 여행 종료
function endTrip(){

    const [endTrip, setEndTrip] = useRecoilState(endTripState);

    //1. 종료시간 재설정
    async function setEventArea(data:EndTripEndTimeResetRequest): Promise<void> {
        try {

            const response: AxiosResponse<EndTripResponse> = await authHttp.patch<EndTripResponse>(`/api/settlement/reset`, data);
            const result: EndTripResponse = response.data; //{status, message}
            
            if(result){
              console.log(result.message);
            }

        } catch (error) {
            Alert.alert("시스템 에러입니다.\n빠른 시일 내 조치를 취하겠습니다.");
            const err = error as AxiosError
            console.log(err);
        }
    }

    //2. 수동 종료
    async function manualEndTrip(data:EndTripRequest): Promise<void> {
        try {

            const response: AxiosResponse<EndTripResponse> = await authHttp.patch<EndTripResponse>(`/api/settlement/manual`, data);
            const result: EndTripResponse = response.data; //{status, message}
            
            if(result){
              console.log(result.message);
            }

        } catch (error) {
            Alert.alert("시스템 에러입니다.\n빠른 시일 내 조치를 취하겠습니다.");
            const err = error as AxiosError
            console.log(err);
        }
    }

    //3. 최종 여행 기록 안내 페이지 -> 아직 백엔드에 적용 안됨
    async function getEndTripHistory(data:EndTripRequest): Promise<void> {
        // try {

        //     const response: AxiosResponse<EndTripHistoryResponse|EndTripResponse> = await authHttp.post<EndTripHistoryResponse|EndTripResponse>(`/api/settlement/resultl`, data);
        //     const result: EndTripHistoryResponse|EndTripResponse = response.data; //{status, message}
            
        //     if(result){
        //       console.log(result.message);
        //     }

        // } catch (error) {
        //     Alert.alert("시스템 에러입니다.\n빠른 시일 내 조치를 취하겠습니다.");
        //     const err = error as AxiosError
        //     console.log(err);
        // }
    }

    //4. 최종 여행 기록 안내 페이지 1회 확인
    async function EndTripHistoryCheck(data:EndTripRequest): Promise<void> {
        try {

            const response: AxiosResponse<EndTripResponse> = await authHttp.patch<EndTripResponse>(`/api/settlement/checked`, data);
            const result: EndTripResponse = response.data; //{status, message}
            
            if(result){
              console.log(result.message);
            }

        } catch (error) {
            Alert.alert("시스템 에러입니다.\n빠른 시일 내 조치를 취하겠습니다.");
            const err = error as AxiosError
            console.log(err);
        }
    }

    //5. 최종 여행 타임라인 페이지
    async function EndTripTimeLine(data:EndTripRequest): Promise<void> {
        try {

            const response: AxiosResponse<EndTripTimeLineResponse|EndTripResponse> = await authHttp.patch<EndTripTimeLineResponse|EndTripResponse>(`/api/settlement/timeline`, data);
            const result: EndTripTimeLineResponse|EndTripResponse = response.data; //{status, message}
            
            if(result){
              console.log(result.message);
            }

        } catch (error) {
            Alert.alert("시스템 에러입니다.\n빠른 시일 내 조치를 취하겠습니다.");
            const err = error as AxiosError
            console.log(err);
        }
    }

    //6. 남은 금액 정산
    async function EndTripSettle(data:EndTripSettleRequest): Promise<void> {
        try {

            const response: AxiosResponse<EndTripSettleResponse|EndTripResponse> = await authHttp.patch<EndTripSettleResponse|EndTripResponse>(`/api/settlement/settle`, data);
            const result: EndTripSettleResponse|EndTripResponse = response.data; //{status, message}
            
            if(result){
              console.log(result.message);
            }

        } catch (error) {
            Alert.alert("시스템 에러입니다.\n빠른 시일 내 조치를 취하겠습니다.");
            const err = error as AxiosError
            console.log(err);
        }
    }



}



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

//한 캐릭터의 정보
type oneCharacter = {
    name: string, //title->name
    description: string,
    x: number,
    y: number,
    Arrived : boolean, //display + getPoint = status
    point:number,
}

// 여행종료
type EndTripRequest = {
    accompanySeq : number,
}
type EndTripResponse = {
    status : number,
    message : string,
}

//1. 종료시간 재설정
type EndTripEndTimeResetRequest = EndTripRequest& {
	endDate : string,
}


//3. 최종 여행 기록 안내 페이지
// type EndTripHistoryResponse = EndTripResponse& {
// 	userId: number,
// 	name : string,
// }

//5. 최종 여행 타임라인 페이지
type EndTripTimeLineResponse = EndTripResponse & {
    list : SettlementTimelineResponseDto[]
}
type SettlementTimelineResponseDto = {
    picture: string,
    memo : string,
    createdDate : string, 
}

//6. 남은 금액 정산
type EndTripSettleRequest = EndTripRequest & {
    memberSeq : number,
}

type EndTripSettleResponse = EndTripResponse & {
    left : number,//전체 남은 금액 숫자
    formattedLeft : string, //전체 남은 금액 규격 표시 (,)
    settlementList:SettlementList[]
}

type SettlementList = { //각 참여자의 정산 금액
    name : string,
    isManager : boolean,
    isPositive : boolean,
    settlement : number,
    formattedSettlement : string
}