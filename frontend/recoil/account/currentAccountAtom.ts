import { atom } from "recoil";

type currentAccountType = {
    "accompanySeq": number,
    "account": string,
    "name": string,
    "startDate": string,
    "endDate": string,
    "personNum": number
}

type list = currentAccountType[];

const initialState:list = [];

export const currentAccountState = atom<list>({
    key: "currentAccountState", // 전역적으로 고유한 값
    default: initialState, // 초깃값
  });