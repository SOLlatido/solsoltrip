import { atom } from "recoil";

//동행통장 세부 내용을 다뤄요.
// 세부 내용 안에 자세한 설정까지 한꺼번에 줘요

const initial = {
    account : "",
    name : "",
    startDate:"",
    endDate:"",
    peopleNum:0,
    depositList:[],
    withdrawList:[],
    // accompanyDepositContents:[],
    // accompanyWithdrawalContents:[],
}


type tripAccountResponse = {
    account : string,
    name : string,
    startDate:string,
    endDate:string,
    peopleNum:number,
    depositList:depositObj[],
    withdrawList:withdrawObj[],
    accompanyDepositContents:accompanyWithdrawalContents[],
    accompanyWithdrawalContents:accompanyWithdrawalContents[],
}

type depositObj = {
    accompanyMemberDepositSeq : number, 
    name:string,
    cost:number,
    acceptedDate:string,
    category:string,
    acceptedDateTime:String
}

type withdrawObj = {
    accompanyMemberDepositSeq : number,
    store:string,
    cost:number,
    acceptedDate:string,
    category:string,
    acceptedDateTime:String,
    memo: string,
    picture: string,
    memoDateTime : string,
    individualWithdrawList : individualWithdrawObj[]
}

type individualWithdrawObj = {
    individualWithdrawSeq: number,
    individual: number,
    isIncluded: boolean
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
    default: initial, // 초깃값
});