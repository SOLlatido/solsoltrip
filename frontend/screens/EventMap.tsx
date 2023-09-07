import React, { useState, useEffect,useLayoutEffect } from 'react';
import { Platform, Text, View, StyleSheet,Dimensions,Image } from 'react-native';
import * as Location from 'expo-location';
import MapView,{Marker} from 'react-native-maps';
import tw from 'twrnc';

// 캐릭터 이미지
import sol_charater1 from '../assets/character/sol_character1.png';

const EventMap = () => {
    const [location, setLocation] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<string|null>(null);

    // 내 위치를 찾는 함수
    useLayoutEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
    
          setLocation({latitude:location.coords.latitude,longitude:location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,})
        console.log(location);
        })();
    
      }, []);


    return(
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
                loadingEnabled
                region={location}>

                    <Marker
                        coordinate={{
                            latitude: 36.3688253,
                            longitude: 127.3468684,
                            // latitudeDelta: 0.0922,
                            // longitudeDelta: 0.0421,
                        }}
                        title={'충남대학교'}
                        description={'대전의 큰 학교이자 유명한 관광지'}
                    >
                        <Image
                            source={sol_charater1} // 이미지를 직접 지정합니다.
                            style={{ width: 40, height: 40 }} // 이미지 크기를 조정하세요.
                        />
                    </Marker>
        
            </MapView>
        
        </View>
    )
}

export default EventMap


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