import { atom } from 'recoil';


const initialState = {
    
}

export const endTripState = atom<endTripType>({
    key:'endTripState',
    default:initialState,
});


export interface endTripType {
    
}