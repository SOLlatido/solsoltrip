import { atom } from "recoil";

//동행통장 세부 내용을 다뤄요

type tripAccountResponse = {
    account : string,
    name : string,
    startDate:string,
    endDate:string,
    peopleNum:number,
    accompanyDepositContents:accompanyWithdrawalContents[],
    accompanyWithdrawalContents:accompanyWithdrawalContents[],
}
  
type accompanyWithdrawalContents = {
    "store": string,
    "cost": number,
    "acceptedDate": string,
    "category": string,
    "memeo": string,
    "acceptedDatetime": string
}


export const pickSpecificAccountInfoState = atom<tripAccountResponse>({
    key: "pickSpecificAccountInfoState", // 전역적으로 고유한 값
    default: {
        account : "",
        name : "",
        startDate:"",
        endDate:"",
        peopleNum:0,
        accompanyDepositContents:[],
        accompanyWithdrawalContents:[],

    }, // 초깃값
});