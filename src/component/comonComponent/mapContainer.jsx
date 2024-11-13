import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Circle, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
// import { updateCurrentItem } from '../../service/reducers/homeBottomSheetReducer';
// import { fetchSingleShop } from '../../service/asyncUpdates/getSingleShop';
// import { updateBottomToggle } from '../../service/reducers/bottomTabToggle';
import MapMarkerIcon from '../../assets/images/mapMarker';

const doggyImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTI3NPoaXWT715J6gDzFHNw5F9F_BLhwGY2ZHCE5FhlfxxiyeD7MZ1xRN-X3eo7u-930U&usqp=CAU';
const catImage =
  'https://pngfre.com/wp-content/uploads/transparent-cat-by-pngfre-62-1.png';

const googleMapsAPIKey = 'AIzaSyCSfXSi-DfugAciZ91E0bqRmNhtwud1ePE';

export default MapContainer = React.memo(
  forwardRef((props, ref) => {
    const {
      shops,
      locationAllow,
      getDestinationShop,
      spreadRadiusCoords,
      spreadRadiusCircle,
      markerClick,
      myCurrentInfo,
      searchedLocation,
      styleCss,
      toShowDraggableMarker,
      draggableCoords,
      setDraggableCoords,
    } = props;
    const initialRegion = {
      latitude: 13.06961,
      longitude: 80.21797,
      latitudeDelta: 1.06961, //zoom level adjust
      longitudeDelta: 1.05961, //zoom level adjust
    };
    // const [region, setRegion] = useState(initialRegion);
    const [trackView, setTrackView] = useState(false);
    const dispatch = useDispatch();
    const [markerUpdate, setMarkerUpdate] = useState([]);
    const [loaderActive, setLoaderActive] = useState(false);
    const [loaderText, setLoaderText] = useState('');
    const [isClicked, setisClicked] = useState(false)
    const [carouselItem, setCarouseItem] = useState(null)

    // const SINGLE_SHOP_REDUCER = useSelector(state => state?.singlePetShopReducer)
    // const CAROUSEL_REDUCER = useSelector(state => state.carouselReducer);

    // useEffect(() => {
    //   if (CAROUSEL_REDUCER?.currentItem) {
    //     setCarouseItem(CAROUSEL_REDUCER?.currentItem)
    //   }

    // }, [CAROUSEL_REDUCER])
    
    useMemo(() => {
      setMarkerUpdate(shops);
      setLoaderActive(true);
      setLoaderText('Loading Shops')
    }, [shops]);

    function getClickedData(uuid) {
      if (searchedLocation) {
        const { lat, lng } = searchedLocation;
        const url = `${uuid}?latitude=${lat}&longitude=${lng}`
        // dispatch(fetchSingleShop(url));
      } else {
        const { latitude, longitude } = myCurrentInfo;
        const url = `${uuid}?latitude=${latitude}&longitude=${longitude}`
        // dispatch(fetchSingleShop(url));
      }
      setisClicked(true)
    }

    // useEffect(() => {
    //   if (SINGLE_SHOP_REDUCER?.data?.data && isClicked) {
    //     dispatch(updateCurrentItem(SINGLE_SHOP_REDUCER?.data?.data));
    //     dispatch(updateBottomToggle(false))
    //     markerClick(SINGLE_SHOP_REDUCER?.data?.data);
    //   }
    // }, [SINGLE_SHOP_REDUCER])

    const MarkerRender = React.memo(
      props => {
        const { direction, index } = props;
        const { latitude, longitude, location, uuid } = direction;
        return (
          <Marker
            ref={marker => {
              marker = marker;
            }}
            identifier={uuid}
            onPress={() => {
              getClickedData(uuid)

            }}
            pinColor="blue"
            // image={require("../../assets/images/dog_location.png")}
            tracksViewChanges={trackView}
            coordinate={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            }}>
            {carouselItem?.uuid == uuid ? <MapMarkerIcon height={100} width={100} imgUrl={index % 2 == 0 ? doggyImage : catImage} />
              : <MapMarkerIcon imgUrl={index % 2 == 0 ? doggyImage : catImage} />
            }
            {/* <MapMarkerIcon imgUrl={index % 2 == 0 ? doggyImage : catImage} /> */}
          </Marker>
        );
      },
      [shops],
    );

    const MarkerRenderMain = React.memo(
      props => {
        const { data } = props;
        return data?.map((direction, i) => {
          const { uuid } = direction;
          return (
            <React.Fragment key={uuid + i}>
              <MarkerRender direction={direction} index={i} />
            </React.Fragment>
          );
        });

      },

      [shops, carouselItem],
    );
    
    function mapLoadComplete() {
      setLoaderActive(false);
      setLoaderText('')
    }
    return (
      <>
      {/* <LoaderCircle
        size="large"
        color="#FF2D2D"
        visible={loaderActive}
        textContent={loaderText}
      /> */}
      <MapView
        ref={ref}
        // style={styles.map}
        style={[styles.map, { height: '110%', ...styleCss }]}
        customMapStyle={mapStyle}
        region={initialRegion}
        key={`MAP_KEY_${googleMapsAPIKey}`}
        showsUserLocation={toShowDraggableMarker ? false : true} //current location false - register form
        showsMyLocationButton={false}
        fillColor="rgba(255,255,255,1)"
        showsCompass={false}
        // compassStyle={{
        //   bottom: 110,
        //   left: 10,
        // }}
        onRegionChangeComplete={onRegionChangeComplete => {
          mapLoadComplete();
        }}>
        {/* <MarkerRenderMain data={markerUpdate} /> */}
{/* 
        {getDestinationShop?.showDirection == true && (
          <MapViewDirections
            optimizeWaypoints={true}
            origin={{
              latitude: myCurrentInfo.latitude,
              longitude: myCurrentInfo.longitude,
            }}
            destination={{
              latitude: getDestinationShop.coords.latitude,
              longitude: getDestinationShop.coords.longitude,
            }}
            apikey={googleMapsAPIKey}
            strokeWidth={3}
            strokeColor="rgba(255, 45, 45, 1)"
          />
        )}
        {spreadRadiusCoords?.longitude && (
          <Circle
            center={spreadRadiusCoords}
            radius={1000 * spreadRadiusCircle}
            strokeWidth={2}
            strokeColor="#0000"
            fillColor="rgba(0,0,0,0.15)"
          />
        )} */}
        {/* {myCurrentInfo?.latitude && (
          <Marker
            coordinate={{
              latitude: myCurrentInfo?.latitude,
              longitude: myCurrentInfo?.longitude,
            }}></Marker>
        )} */}

        {/* {searchedLocation && (
          <Marker
            ref={marker => {
              marker = marker;
            }}
            pinColor="#0000"
            coordinate={{
              latitude: searchedLocation.lat,
              longitude: searchedLocation.lng,
            }}></Marker>
        )} */}

        {toShowDraggableMarker && draggableCoords.latitude && (
          <Marker
            
            coordinate={{
              latitude: draggableCoords.latitude,
              longitude: draggableCoords.longitude,
            }}
           ></Marker>
        )}
      </MapView>
    </>
    );
  }),
);

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
  },
});
const mapStyle = [
  {
    featureType: 'poi.business',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.business',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  { elementType: 'geometry', stylers: [{ color: '#000', opacity: 0.2 }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '' }] },
  {
    featureType: 'natural.landcover',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

// const mapStyle = [
//   {
//       "elementType": "geometry",
//       "stylers": [
//           {
//               "color": "#242f3e"
//           }
//       ]
//   },
//   {
//       "elementType": "labels.text.fill",
//       "stylers": [
//           {
//               "color": "#746855"
//           }
//       ]
//   },
//   {
//       "elementType": "labels.text.stroke",
//       "stylers": [
//           {
//               "color": "#242f3e"
//           }
//       ]
//   },
//   {
//       "featureType": "administrative.locality",
//       "elementType": "labels.text.fill",
//       "stylers": [
//           {
//               "color": "#d59563"
//           }
//       ]
//   },
//   {
//       "featureType": "poi",
//       "elementType": "labels.text.fill",
//       "stylers": [
//           {
//               "color": "#d59563"
//           }
//       ]
//   },
//   {
//       "featureType": "poi.park",
//       "elementType": "geometry",
//       "stylers": [
//           {
//               "color": "#263c3f"
//           }
//       ]
//   },
//   {
//       "featureType": "poi.park",
//       "elementType": "labels.text.fill",
//       "stylers": [
//           {
//               "color": "#6b9a76"
//           }
//       ]
//   },
//   {
//       "featureType": "road",
//       "elementType": "geometry",
//       "stylers": [
//           {
//               "color": "#38414e"
//           }
//       ]
//   },
//   {
//       "featureType": "road",
//       "elementType": "geometry.stroke",
//       "stylers": [
//           {
//               "color": "#212a37"
//           }
//       ]
//   },
//   {
//       "featureType": "road",
//       "elementType": "labels.text.fill",
//       "stylers": [
//           {
//               "color": "#9ca5b3"
//           }
//       ]
//   },
//   {
//       "featureType": "road.highway",
//       "elementType": "geometry",
//       "stylers": [
//           {
//               "color": "#746855"
//           }
//       ]
//   },
//   {
//       "featureType": "road.highway",
//       "elementType": "geometry.stroke",
//       "stylers": [
//           {
//               "color": "#1f2835"
//           }
//       ]
//   },
//   {
//       "featureType": "road.highway",
//       "elementType": "labels.text.fill",
//       "stylers": [
//           {
//               "color": "#f3d19c"
//           }
//       ]
//   },
//   {
//       "featureType": "transit",
//       "elementType": "geometry",
//       "stylers": [
//           {
//               "color": "#2f3948"
//           }
//       ]
//   },
//   {
//       "featureType": "transit.station",
//       "elementType": "labels.text.fill",
//       "stylers": [
//           {
//               "color": "#d59563"
//           }
//       ]
//   },
//   {
//       "featureType": "water",
//       "elementType": "geometry",
//       "stylers": [
//           {
//               "color": "#17263c"
//           }
//       ]
//   },
//   {
//       "featureType": "water",
//       "elementType": "labels.text.fill",
//       "stylers": [
//           {
//               "color": "#515c6d"
//           }
//       ]
//   },
//   {
//       "featureType": "water",
//       "elementType": "labels.text.stroke",
//       "stylers": [
//           {
//               "color": "#17263c"
//           }
//       ]
//   }
// ]

