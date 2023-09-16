import { atom } from "recoil";

type pickAccountType = { accountSeq:number, accountNumber:string, travelTitle:string, duration:string, numberOfPeople:number }

export const pickAccountState = atom<pickAccountType>({
    key: "pickAccountState", // 전역적으로 고유한 값
    default: {
        accountSeq:0,
        accountNumber: "",
        travelTitle:"",
        duration: "",
        numberOfPeople: 0
    }, // 초깃값
  });