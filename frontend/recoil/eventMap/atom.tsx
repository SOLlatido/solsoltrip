import { atom } from 'recoil';


const initialState = {
    mode: "wait",
    latitude: 0,
    longitude: 0,
    distanceTravelled: 0, // 이동한 거리 
    prevLatLng: {},
    characterLocations: [{ // 캐릭터 위치 리스트
        latitude: 36.3688253,
        longitude: 127.3468684,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        title: "충남대학교",
        description: "대전의 큰 학교이자 유명한 관광지",
        display: true,
        getPoint:false,
    },{
        latitude: 36.3557439,
        longitude: 127.3471908,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        title: "계룡스파텔",
        description: "스파",
        display: true,
        getPoint:false,
    }],
}

export const eventMapState = atom<eventMapType>({
    key:'eventMapState',
    default:initialState,
});


export interface eventMapType {
    mode: string,
    latitude: number,
    longitude: number,
    distanceTravelled: number,
    prevLatLng: object,
    characterLocations: any[],
}