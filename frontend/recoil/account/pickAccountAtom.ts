import { atom } from "recoil";

type pickAccountType = { accountNumber:string, travelTitle:string, duration:string, numberOfPeople:number }

export const pickAccountState = atom<pickAccountType>({
    key: "pickAccountState", // 전역적으로 고유한 값
    default: {
        accountNumber: "",
        travelTitle:"",
        duration: "",
        numberOfPeople: 0
    }, // 초깃값
  });