import { atom } from "recoil";

type currentDetailType = {
    "accompanyMemberWithdrawSeq" : number
}


export const currentDetailState = atom<currentDetailType>({
    key: "currentDetailState", // 전역적으로 고유한 값
    default: {
        accompanyMemberWithdrawSeq : 0
    }, // 초깃값
  });