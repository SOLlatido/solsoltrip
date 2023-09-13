import {Alert} from 'react-native';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios"
import {useRecoilState} from 'recoil';
import {eventMapState} from '../recoil/eventMap/atom';
import {endTripState} from '../recoil/endTrip/atom';


const http : AxiosInstance = axios.create({
    // baseURL : import.meta.env.VITE_APP_SERVER as string,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials : true,
})

export {http};

// 사용 예시 :
// 다른 파일에서 http 임포트 후
// function getCalendar(){
//     async function requestCalendar(): Promise<void> {
//         try {
//             const response: AxiosResponse<CalendarData> = await http.get<CalendarData>(`/calendar/study?user=${pk}`);
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

    const [eventMap, setEventMap] = useRecoilState(eventMapState);

    //1. 이벤트 장소 설정
    async function setEventArea(data:EventAreaData): Promise<void> {
        try {

            const response: AxiosResponse<EventResponse> = await http.post<EventResponse>(`/api/event/regist`, data);
            const result: EventResponse = response.data; //{status, message}
            
            if(result){
              console.log(result.message);
            }

        } catch (error) {
            const err = error as AxiosError
            console.log(err);
        }
    }

    //2. 이벤트 장소 주변 알림/도착 알림/포인트
    async function getArrival(data:EventArrivalRequest): Promise<void> {
        try {
            const response: AxiosResponse<EventArrivalResponse|EventResponse> = await http.post<EventArrivalResponse>(`api/event/nearbyOrArrivalInform`, data);
            const result: EventResponse = response.data;

            if(Number(result.status)===200){
                // setEventMap()
                
            }else{
                Alert.alert(result?.message);
            }
            
        } catch (error) {
            Alert.alert("죄송합니다. 빠른 시일 내 조치를 취하겠습니다.");
            const err = error as AxiosError
            console.log(err);
        }
    }


    //3. 이벤트 포인트 확인  (요청 url / 형식 모름)


}


// 여행 종료
function endTrip(){

    const [endTrip, setEndTrip] = useRecoilState(endTripState);

    //1. 이벤트 장소 설정
    async function setEventArea(data:EventAreaData): Promise<void> {
        try {

            const response: AxiosResponse<EventResponse> = await http.post<EventResponse>(`/api/event/regist`, data);
            const result: EventResponse = response.data; //{status, message}
            
            if(result){
              console.log(result.message);
            }

        } catch (error) {
            const err = error as AxiosError
            console.log(err);
        }
    }


}



// 이벤트

//1. 이벤트 장소 설정
type EventAreaData = {
    name : string,
    discription : string,
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
    isArrived : boolean,
    point : number,
    totalResponseVOList : EventAreaData[], //이벤트 1번 참고
    responseVOList : ResponseVOList[]
}


type ResponseVOList = {
    name : number,
}
