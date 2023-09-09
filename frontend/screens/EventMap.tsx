import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, AnimatedRegion, Animated, Polyline } from 'react-native-maps';
import tw from 'twrnc';
import haversine from 'haversine';

// recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { eventMapState } from '../recoil/eventMap/atom';

// 캐릭터 이미지
import sol_charater1 from '../assets/character/sol_character1.png';

const EventMap = () => {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [distanceTravelled, setDistanceTravelled] = useState(0);
  const [prevLatLng, setPrevLatLng] = useState<any>({
    latitude: 36.3557439,
    longitude: 127.3468684
  });
  const [routeCoordinates, setRouteCoordinates] = useState([]); //유저가 움직인 이동경로

  const [eventMap, setEventMap] = useRecoilState(eventMapState);
  const { characterLocations } = eventMap;

  // 거리를 계산하는 함수
  const calcDistance = (newLatLng: any) => {
    return haversine(prevLatLng, newLatLng) || 0;
  };

  // 유저의 위치와 마커 간의 거리를 확인하는 함수 500m 알람범위
  const isWithin500m = (userLocation: any, markerLocation: any) => {
    const distance = calcDistance(userLocation);
    console.log(`distance = ${distance}`);
    return distance <= 0.5; // 500m = 0.5 km
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
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
  
        setPrevLatLng({
          latitude: locationChange.coords?.latitude,
          longitude: locationChange.coords?.longitude,
        })

      }

    })();
  }, []);

  // 이동 위치 추적
  useEffect(() => {
    const watchLocation = async () => {
      const locationOptions = {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 10,
      };

      //실시간으로 위치 변화 감지
      const locationSubscription = await Location.watchPositionAsync(
        locationOptions,
        (position) => {
          const { latitude, longitude } = position.coords;

          const newCoordinate = {
            latitude,
            longitude,
          };

          //현재 위치로 변경
          setPrevLatLng(newCoordinate)

          setLocation({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });

          setRouteCoordinates((prevCoordinates) => [...prevCoordinates, newCoordinate]);

          // distanceTravelled를 업데이트하지 않고, 이동 거리만 계산하여 사용
          const newDistance = calcDistance(newCoordinate);
          setDistanceTravelled((prevDistance) => prevDistance + newDistance);

          setPrevLatLng(newCoordinate);

          // 500m 안에 들어왔는지 확인 -> alert
          let markerLocation = null;
          let isWithin500mFlag = false;

          for (let i = 0; i < characterLocations.length; i++) {
            markerLocation = characterLocations[i];
          
            // 이미 본 캐릭터는 처리하지 않음
            if (!markerLocation.display) continue;
          
            isWithin500mFlag = isWithin500m(newCoordinate, markerLocation);
          
            if (isWithin500mFlag && markerLocation.display) {
          
              // Recoil 상태를 업데이트하여 display 속성 변경
              setEventMap((prevEventMapState) => {
          
                const updatedCharacterLocations = prevEventMapState.characterLocations.map(
                  (characterLocation, index) => {
                    if (index === i && characterLocation.display) {
                      // 유저가 500m 이내에 마커에 접근했을 때 알림 표시 / 한개라도 보이면 표시
                      if (characterLocation.title != null) {
                        alert(`500m 이내에 ${characterLocation.title} 관광지가 보입니다!`);
                      }
                      // 현재 반복 중인 요소가 변경 대상이라면 display를 false로 변경
                      return { ...characterLocation, display: false };
                    }
                    // 변경 대상이 아니면 그대로 반환
                    return characterLocation;
                  }
                );
          
                // 업데이트된 characterLocations를 포함한 새로운 상태를 반환
                return {
                  ...prevEventMapState,
                  characterLocations: updatedCharacterLocations,
                };
              });
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


  return (
    <View>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        showsUserLocation
        followsUserLocation
        loadingEnabled={true}
        region={location}
      >
        <Polyline coordinates={routeCoordinates} strokeWidth={3} />

        {characterLocations.map((place, index) => {
          return (
            <Marker
              coordinate={{
                latitude: place?.latitude,
                longitude: place?.longitude,
                latitudeDelta: place?.latitudeDelta,
                longitudeDelta: place?.longitudeDelta,
              }}
              title={place?.title}
              description={place?.description}
            >
              <Image
                source={sol_charater1} // 이미지를 직접 지정합니다.
                style={{ width: 40, height: 40 }} // 이미지 크기를 조정하세요.
              />
            </Marker>
          );
        })}
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
