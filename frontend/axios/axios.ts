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


// 여행종료
type EndTripRequest = {
    accompanySeq : number,
}
type EndTripResponse = {
    status : number,
    message : string,
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