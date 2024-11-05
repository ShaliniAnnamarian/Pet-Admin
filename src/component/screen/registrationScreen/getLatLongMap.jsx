import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS } from 'react-native-permissions';
import { Image } from 'react-native-animatable';
import { btnPrimary, f14, flexCenter } from '../../../styles/appStyles';
import MapContainer from '../../comonComponent/mapContainer';
import RemoveIconBg from '../../../assets/images/removeIconBg';

export default function GetCoordsMapView(props) {
  const { toShowMaps, toSendCoords, hideMaps } = props
  const mapRef = useRef();
  const [locationPermission, setLocationPermission] = useState(false);

  const [showMarker, setShowMarker] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({});


  function permissionCheck(state) {
    const checkPermission = async () => {
      if (locationPermission) {
        return true;
      }
      const permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (permissionStatus === 'granted') {
        return true;
      }
      if (permissionStatus === 'blocked') {
        Linking.openSettings();
        return false;
      }
      const requestStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      return requestStatus === 'granted';
    };
    if (checkPermission()) {
      currentLocation(state);
    }

    // check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(res => {
    //   console.log();

    //   if (res == 'granted') {
    //     currentLocation(state);
    //   }
    //   else {
    //     setTimeout(() => {
    //       return request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(res => {
    //         console.log("PERMISSIONS",res);

    //         if (res == 'granted') {
    //           currentLocation(state);
    //         } else if (res == 'blocked') {
    //           Linking.openSettings();
    //         }
    //       });
    //     }, 0);
    //   }
    // });
  }

  function currentLocation(state) {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const defLatDelta = 50;
        const resLatDel = 3 / defLatDelta;
        animateToLocation(latitude, longitude, resLatDel, resLatDel);
        setCurrentPosition({ lat: latitude, lng: longitude });
      },

      error => {
        currentLocation(0);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }

  function animateToLocation(lat, long, longDel, latDel) {
    console.log("test", lat, long, longDel, latDel);

    mapRef.current?.animateToRegion({
      latitude: lat,
      longitude: long,
      latitudeDelta: longDel, //zoom level adjust 10 to 50
      longitudeDelta: latDel, //zoom level adjust
    });
    setShowMarker(true);
  }

  useEffect(() => {
    permissionCheck('initial');
  }, [])

  return (
    toShowMaps &&
    <>
      <View>
        <TouchableOpacity
          style={[styles.getMyLocation]}
          onPress={() => {
            permissionCheck('first_render');
          }}
          onLongPress={() => permissionCheck('initial')}>
          <Image
            style={{ height: 70, width: 70 }}
            source={require('../../../assets/images/getMyLocation.png')}
          />
        </TouchableOpacity>
      </View>
      <MapContainer
        ref={mapRef}
        toShowDraggableMarker={showMarker}
        draggableCoords={currentPosition}
        setDraggableCoords={e =>
          setCurrentPosition({ lat: e.latitude, lng: e.longitude })
        }
        styleCss={{
          height: '110%',
          width: '110%',
          left: '-5%',
          right: '-5%',
          top: '-5%',
        }}
      />

      <View style={[styles.getCoords, { width: "95%", marginHorizontal: "auto" }]}>
        <View style={styles.coordsMain}>
          <TouchableOpacity onPress={() => hideMaps()} style={[styles.closeBtn]}>
            <RemoveIconBg />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { toSendCoords(currentPosition); hideMaps() }}>
            <Text style={[styles.btns]}>Get Values</Text>
          </TouchableOpacity>

        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  getMyLocation: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    zIndex: 99,
  },
  getCoords: {
    position: 'absolute',
    top: 10,
    left: 15,
    ...flexCenter,
    width: "100%"

  },
  coordsMain: {
    position: "relative",
    ...flexCenter,
    width: "100%",
  },
  btns: {
    ...btnPrimary,
    paddingHorizontal: 20,
    fontSize: f14,
    marginTop: '0%',
    color: "#fff",
    // ...flexCenter
  },
  closeBtn: {
    position: "absolute",
    right: 10,
    top: "25%"
  }
});
