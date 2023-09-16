import { atom } from "recoil";

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
    "accompanyContentSeq": number,
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