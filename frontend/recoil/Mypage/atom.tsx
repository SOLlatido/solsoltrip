import { atom } from 'recoil';


const initialState = {
    userName: "",
    point : 0,
    coupon: 0,
}

export const MypageState = atom<CenterModalType>({
    key:'mypageState',
    default:initialState,
});


export interface CenterModalType {
    userName: string;
    point: number,
    coupon: number,
}