import { atom } from 'recoil';


const initialState = {
    open:false,
}

export const centerModalState = atom<CenterModalType>({
    key:'centerModalState',
    default:initialState,
});


export interface CenterModalType {
    open: boolean;
}