import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import Storage from 'expo-storage'

type userType = {
    memberSeq : number | null,
    uuid : string | null,
    name : string | null,
    point : string | null,
    accessToken : string | null,
    kakaoAccessToken? : string | null,
}

export const userState = atom<userType>({
    key: "userState", // 전역적으로 고유한 값
    default: {
        memberSeq : 0,
        uuid : "",
        name : "",
        point : "",
        accessToken : null,
        kakaoAccessToken : null,
    }, // 초깃값
    // effects_UNSTABLE: [persistAtom],
  });