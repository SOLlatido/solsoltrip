import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import Storage from "expo-storage"

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

const shinhanHttp : AxiosInstance = axios.create({
    // baseURL : import.meta.env.VITE_APP_SERVER as string,
    baseURL : "https://shbhack.shinhan.com/",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials : true,
})

export {authHttp, nonAuthHttp, shinhanHttp}

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
