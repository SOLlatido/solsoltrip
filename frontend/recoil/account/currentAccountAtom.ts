import { atom } from "recoil";

type currentAccountType = {
    accompanySeq : number | null,
    // registerAccountSeq : number | null,
    // name : string | null,
    // startDate : string | null,
    // endDate : string | null,
    // personalAmount : number | null
}

export const currentAccountState = atom<currentAccountType>({
    key: "currentAccountState", // 전역적으로 고유한 값
    default: {
        accompanySeq : 0,
        // registerAccountSeq : 0,
        // name : "",
        // startDate : "",
        // endDate : "",
        // personalAmount : 0
    }, // 초깃값
  });