import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import Storage from 'expo-storage'

type createAccountType = {
    memberSeq : number | null,
    registerAccountSeq : number | null,
    name : string | null,
    startDate : string | null,
    endDate : string | null,
    personalAmount : number | null
}

export const createAccountState = atom<createAccountType>({
    key: "createAccountState", // 전역적으로 고유한 값
    default: {
        memberSeq : 0,
        registerAccountSeq : 0,
        name : "",
        startDate : "",
        endDate : "",
        personalAmount : 0
    }, // 초깃값
  });