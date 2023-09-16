import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import Storage from 'expo-storage'

type createAccountType = {
    memberSeq : number | null,
    registedAccountSeq : number | null,
    name : string | null,
    startDate : string | null,
    endDate : string | null,
    individual : number | null
}

export const createAccountState = atom<createAccountType>({
    key: "createAccountState", // 전역적으로 고유한 값
    default: {
        memberSeq : 0,
        registedAccountSeq : 0,
        name : "",
        startDate : "",
        endDate : "",
        individual : 0
    }, // 초깃값
  });