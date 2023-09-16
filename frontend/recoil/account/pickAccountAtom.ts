import { atom } from "recoil";

type pickAccountType = { accountSeq:number, accountNumber:string, travelTitle:string, duration:string, numberOfPeople:number }

//accountItem 네모 카드 계좌정보를 위한 영역
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