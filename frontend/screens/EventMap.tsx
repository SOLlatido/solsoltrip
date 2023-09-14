import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE,Marker, Polyline } from 'react-native-maps';
import tw from 'twrnc';
import haversine from 'haversine';
import {StackNavigationProp} from '@react-navigation/stack';


//DATA
import NationalTouristInformation from '../Data/NationalTouristInformation.json';

// axios
import {authHttp, nonAuthHttp} from '../axios/axios';
import { AxiosResponse, AxiosError } from "axios"

// recoil
import { useRecoilState } from 'recoil';
import { eventMapState } from '../recoil/eventMap/atom';
import { centerModalState } from '../recoil/centerModal/atom';

// 캐릭터 이미지
import sol_charater1 from '../assets/character/sol_character1.png';

// 컴포넌트
import EventModal from '../components/Modals/EventModal';

//2000m는 근처에 관광지가 있다고 알림
//100m는 포인트를 받을 수 있음
const EventMap:React.FC<EventMap> = ({navigation}) => {

  //axios 결과
  const [eventMap, setEventMap] = useState<EventAreaData[]>([]); //전체 캐릭터 위치
  const [point, setPoint] = useState<number>(0); //유저가 누른 캐릭터의 포인트
  

  //delta 고정값
  const latitudeDelta = 0.0922;
  const longitudeDelta = 0.0421;

  const [location, setLocation] = useState<any>(null); // 내 위치 저장
  const [locationSetting, setLocationSetting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null); //위치 제공에 동의했는지 안했다면 에러

  const [prevLatLng, setPrevLatLng] = useState<any>({ //이전 거리를 왜 계산하는지 모르겠음 일단 skip
    latitude: 36.3557439,
    longitude: 127.3468684
  });

  const [routeCoordinates, setRouteCoordinates] = useState([]); //유저가 움직인 이동경로


  const [isMapLocked, setIsMapLocked] = useState(false); // 모달 열릴 때 지도 잠금 상태

  const [showImage,setShowImage] = useState<boolean>(true);

  // 모달
  const [modalVisible, setModalVisible] = useRecoilState<CenterModalState>(centerModalState);
  const [modalContent, setModalContent] = useState('');


  // axios
  //1. 이벤트 장소 주변 알림/도착 알림/포인트 (지도 켜면 1회 내 위치가 정해졌을 때 부르고, 어떤 캐릭터를 눌렀을 때 요청 보내면 될 것 같음)
  async function getArrival(data:EventArrivalRequest): Promise<void> {
    try {

      
      if(data.x===undefined || data.y===undefined) return;
      console.log(data);
      
        const response: AxiosResponse<EventArrivalResponse> = await authHttp.post<EventArrivalResponse>(`api/event/inform`, data);
        const result = response.data;

        if(result.status===200){

          //지도상 캐릭터 위치들을 저장 (업데이트)
          setEventMap(result.totalResponseVOList);

          //캐릭터를 눌렀을 때 포인트 가져오기
          setPoint(result.point);
        }
        
    } catch (error) {
        Alert.alert("시스템 에러입니다.\n빠른 시일 내 조치를 취하겠습니다.");
        const err = error as AxiosError
        console.log(err);
        throw err; // 에러 핸들링을 위해 예외를 던집니다.
    }
  }

  // 거리를 계산하는 함수 (현재 나의 위치와 마커 위치)
  const calcDistance = (markerLocation:any, userLocation: any) => {
    if(userLocation===undefined || userLocation.latitude===undefined || 
      userLocation.longitude===undefined || markerLocation===undefined || 
      markerLocation.latitude===undefined || markerLocation.longitude===undefined) return;


    return haversine(markerLocation, userLocation) || 0;
  };

  // 유저의 위치와 마커 간의 거리를 확인하는 함수 2000m 알람범위
  const isWithin2000m = (markerLocation: any, userLocation: any) => {
    const distance = calcDistance(markerLocation, userLocation);
    return distance <= 2; // 2000m = 2 km
  };

  // 유저의 위치와 마커 간의 거리를 확인하는 함수 100m 알람범위
  const isWithin100m = (markerLocation: any, userLocation: any) => {
    const distance = calcDistance(markerLocation, userLocation);
    return distance <= 0.1; // 100m = 0.1 km
  };

  // EventModal을 열거나 alert를 띄우는 함수를 작성
  const openEventModalOrAlert = (place: any) => {
    if (isWithin100m(location, place)) {
      const arrivalData = {
        "memberSeq": 1,
        "x": location?.latitude,
        "y": location?.longitude
      }
      getArrival(arrivalData);

      // 거리가 100 이내인 경우 EventModal 열기
      getPoint(place?.title);
    } else {
      // 거리가 100m 이내가 아닌 경우 alert 띄우기
      Alert.alert("100m 이내가 아닙니다");
    }
  };

  const toggleModalAndShowImage = (showImage: boolean) => {
    // Modal이 열릴 때 지도 잠금 상태로 변경
    setIsMapLocked(!showImage);
    // Image 표시 여부를 상태로 관리
    setShowImage(showImage);
  };


  // 내 위치를 찾는 함수
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let locationChange = await Location.getCurrentPositionAsync({accuracy:5});

      if(locationChange.coords){

        setLocation({
          latitude: locationChange.coords?.latitude,
          longitude: locationChange.coords?.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        });
  
        setPrevLatLng({
          latitude: locationChange.coords?.latitude,
          longitude: locationChange.coords?.longitude,
        })

        setLocationSetting(true);
      }

    })();
  }, []);

  useEffect(()=>{
    const arrivalData = {
      "memberSeq": 1,
      "x": location?.latitude,
      "y": location?.longitude
    }
    getArrival(arrivalData);

  },[locationSetting])


  // 이동 위치 추적
  useEffect(() => {
    const watchLocation = async () => {
      const locationOptions = {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 10000,
        distanceInterval: 10,
      };

      //실시간으로 위치 변화 감지
      const locationSubscription = await Location.watchPositionAsync(
        locationOptions,
        (position) => {
          const { latitude, longitude } = position.coords;
          
          //현재 위치로 변경
          setPrevLatLng(position.coords);

          //새로운 위치 셋팅
          const newCoordinate = {
            latitude,
            longitude,
          };


          setLocation({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          });

          // 바뀐 위치를 새로운 루트로 추가
          setRouteCoordinates((prevCoordinates) => [...prevCoordinates, newCoordinate]);

          // 2000m 안에 들어왔는지 확인 -> alert
          let oneCharacter:EventAreaData|null = null;
          let isWithin2000mFlag:boolean = false;

          for (let i = 0; i < eventMap.length; i++) {
            oneCharacter = eventMap[i]; //markerLocation은 지금 내가 보고있는 캐릭터
            const markerLocation = {
              latitude : oneCharacter.y,
              longitude : oneCharacter.x
            }
          
          
            isWithin2000mFlag = isWithin2000m(markerLocation,newCoordinate);
          
            if (isWithin2000mFlag) {
              if (oneCharacter.name != null) {
                Alert.alert(`2000m 이내에 ${oneCharacter.name} 관광지가 보입니다!`);
              }

      

          
              // setEventMap((prevEventMap) => {
          
              //   const updatedEventMap = prevEventMap.map(
              //     (characterLocation, index) => {
              //       if (!characterLocation || !characterLocation.y || !characterLocation.x) {
              //         // 유효하지 않은 위치 데이터를 가지고 있는 경우 이 요소를 건너뛰기
              //         return null;
              //       }
              //       if (index === i) {
              //         // 유저가 2000m 이내에 마커에 접근했을 때 알림 표시 / 한개라도 보이면 표시
              //         if (characterLocation.name != null) {
              //           Alert.alert(`2000m 이내에 ${characterLocation.name} 관광지가 보입니다!`);
              //         }
              //         // 현재 반복 중인 요소가 변경 대상이라면 display를 false로 변경
              //         return { ...characterLocation};
              //       }
              //       // 변경 대상이 아니면 그대로 반환
              //       return characterLocation;
              //     }
              //   );
          
              //   // 업데이트된 characterLocations를 포함한 새로운 상태를 반환
              //   return {
              //     ...prevEventMap,
              //     characterLocations: updatedEventMap,
              //   };
              // });
            }
          }
        }
      );

      return () => {
        // 컴포넌트가 언마운트될 때 위치 감지 구독 해제
        locationSubscription.remove();
      };
    };

    watchLocation();
  }, []);


  //포인트 얻게 도와주는 모달창 띄우기
  const getPoint = (title:string) => {
    const newValue = {
      open:true,
      event:true,
    }
    setModalVisible(newValue);
    setModalContent(`${title} 방문 감사합니다.\n${point}포인트를 획득하셨습니다!`);
  }

  useEffect(()=>{
    console.log(location);
  },[modalVisible.open])


  return (
    <View style={{flex:1}}>
      <MapView
        initialRegion={{
          latitude: 36.3538693,
          longitude: 127.3468555,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        loadingEnabled={true}
        region={location}
        scrollEnabled={!isMapLocked}
        provider={PROVIDER_GOOGLE}
      >
        <Polyline coordinates={routeCoordinates} strokeWidth={3} strokeColor="#0046FF" />

        {/* {eventMap?.map((place, index) => {
          if (!place || !place.y || !place.x) {
            // 유효하지 않은 위치 데이터를 가지고 있는 경우 이 요소를 건너뛰기
            return null;
          }

          const markerLocation = {
            latitude : place.y,
            longitude : place.x
          }

          return (
            <Marker key={index}
              coordinate={{
                latitude: place?.y,
                longitude: place?.x,
              }}
              title={place?.name}
              description={place?.description}
              onPress={() => openEventModalOrAlert(markerLocation)}
            >
              
              
              <Image
                source={sol_charater1} // 이미지를 직접 지정합니다.
                style={tw`w-[40px] h-[40px]`} // 이미지 크기를 조정하세요.
              />

            </Marker>
          );
        })} */}
        

          <View>
            <EventModal
              modalTitle="감사합니다"
              content={modalContent}
              onClose={() => toggleModalAndShowImage(true)}
            />
          </View>
      </MapView>
    </View>
  );
};

export default EventMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

// 모달 타입
type CenterModalState = {
  open:boolean;
  event:boolean;
}

// 이벤트

//1. 이벤트 장소 설정 -> 관리자용
type EventAreaData = {
  name : string,
  description : string,
  x : number,
  y : number,
}

type EventResponse = {
  status : number,
  message : string,
}

//2. 이벤트 장소 주변 알림/도착 알림/포인트
type EventArrivalRequest = {
  memberSeq : number,
  x : number,
  y : number,
}

type EventArrivalResponse = {
  // display가 true인 전체 장소 다
status : number,
  message : string,
  Arrived : boolean,
  point : number,
  totalResponseVOList : EventAreaData[], //전체 이벤트 지역 리스트
  responseVOList : ResponseVOList[] //모달용 이름
}


type ResponseVOList = {
  name : number,
}

//기타
type EventMap = {
  navigation: StackNavigationProp<any>;
}