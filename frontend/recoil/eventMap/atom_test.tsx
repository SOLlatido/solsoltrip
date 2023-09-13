import { atom } from 'recoil';


const initialState = {
    distanceTravelled: 0, // 이동한 거리 
    prevLatLng: {}, //이전 거리 리스트

    latitudeDelta: 0.0922, //고정값
    longitudeDelta: 0.0421, //고정값

    characterLocations: [{ // 캐릭터 위치 리스트
        //totalResponseVOList+EventArrivalResponse(Arrived, point)
        name: "충남대학교", //title->name
        discription: "대전의 큰 학교이자 유명한 관광지",
        y: 36.3688253,
        x: 127.3468684,
        Arrived : false, //display + getPoint = status
        point:10,
    },]
}

export const eventMapState = atom<eventMapType>({
    key:'eventMapState',
    default:initialState,
});


export interface eventMapType {
    distanceTravelled: number, // 이동한 거리 
    prevLatLng: any, //이전 거리 리스트

    latitudeDelta: number, //고정값
    longitudeDelta: number, //고정값

    characterLocations: oneCharacter[]
}

type oneCharacter = {
    //totalResponseVOList+EventArrivalResponse(Arrived, point)
    name: string, //title->name
    discription: string,
    y: number,
    x: number,
    Arrived : boolean, //display + getPoint = status
    point:number,
}