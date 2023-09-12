import { atom } from 'recoil';


const initialState = {
    open:false,
    event: false,
}

export const centerModalState = atom<CenterModalType>({
    key:'centerModalState',
    default:initialState,
});


export interface CenterModalType {
    open: boolean;
    event: boolean; //이벤트 맵 페이지 여부 -> 이 여부에 따라 팡파레 효과가 진행됨
}