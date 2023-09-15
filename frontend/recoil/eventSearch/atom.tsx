import { atom } from 'recoil';


const initialState = {
    searchList:[],
}

export const eventSearchState = atom<EventSearchType>({
    key:'eventSearchState',
    default:initialState,
});


export interface EventSearchType {
    searchList:PointVO[]|null,
}

type PointVO = {
    name : string,
    point : number,
    acceptedDate : string
}