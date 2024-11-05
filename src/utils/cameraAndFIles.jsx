
import {
    Dimensions,
    Linking,
    PermissionsAndroid,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import AlbumIcon from '../assets/images/albumIcon';
  import { useMemo, useState } from 'react';
  import { check, PERMISSIONS, request } from 'react-native-permissions';
  import ImagePicker from 'react-native-image-crop-picker';
import CameraIcon from '../assets/images/cameraIcon';
import { f15, flexCenter, primaryFontMedium } from '../styles/appStyles';
  
  const HEIGHT = Dimensions.get('window').height;
  const WIDTH = Dimensions.get('window').width;
  
  const androidVersion = Platform.Version;
  
  export default function CameraAndFile(props) {
    const { toShow, outsideClick, permissionClick, dataResult } = props;
  
    const [showMe, setShowMe] = useState(false);
  
    useMemo(() => {
      setShowMe(toShow);
    }, [toShow]);
  
    function defOpenOrClose(state) {
      if (state == 'outside') {
        outsideClick();
      } else {
        const permissionName = state == 'camera' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        
        return checkCameraPermission(state, permissionName)
      }
    }
  
    async function checkCameraPermission(type, permissionType) {
      // accessCameraOrFile(type);
      if (androidVersion >= 29 && type !== 'camera') {
        accessCameraOrFile(type);
      } else if (androidVersion >= 21) {
        if (type == 'camera') {
          PermissionsAndroid.check('android.permission.CAMERA').then((res) => {
            if (!res) {
              PermissionsAndroid.request('android.permission.CAMERA').then((res) => {
                if (res == 'granted') {
                  accessCameraOrFile(type);
                } else {
                  Linking.openSettings();
                }
              })
            } else {
              accessCameraOrFile(type);
            }
          })
        } else {
          PermissionsAndroid.check('android.permission.READ_MEDIA_IMAGES').then((res) => {
            if (!res) {
              PermissionsAndroid.request('android.permission.READ_MEDIA_IMAGES').then((res) => {
                if (res == 'granted') {
                  accessCameraOrFile(type);
                } else {
                  Linking.openSettings();
                }
              })
            } else {
              accessCameraOrFile(type);
            }
          })
        }
      }
    }
  
  
    function accessCameraOrFile(type) {
      if (type == 'camera') {
        ImagePicker.openCamera({
          width: 300,
          height: 300,
          cropping: true,
        }).then(image => {
          const { mime, path } = image
          const name = path.substring(image.path.lastIndexOf('/') + 1);
          const res = [{
            fileName: name, type: mime, uri: path
          }]
          if (mime) {
            dataResult(res)
          }
        });
      } else if (type == 'album') {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true
        }).then(image => {
          const { mime, path } = image
          const name = path.substring(image.path.lastIndexOf('/') + 1);
          const res = [{
            fileName: name, type: mime, uri: path
          }]
          if (mime) {
            dataResult(res)
          }
        });
      }
      // if (type == 'camera') {
      //   launchCamera({includeBase64: true, cropping: true}, e => {
      //     e?.assets && dataResult(e?.assets);
      //   });
      // }
      // if (type == 'album') {
      //   launchImageLibrary({selectionLimit: 4}, e => {
      //     e?.assets && dataResult(e?.assets);
      //   });
      // }
  
      outsideClick()
    }
  
    return (
      showMe && (
        <Pressable
          onPress={() => defOpenOrClose('outside')}
          style={[styles.mainContainer]}>
          <View style={[styles.contentContainer]}>
            <TouchableOpacity
              onPress={() => defOpenOrClose('camera')}
              style={[styles.contentsMain]}>
              <CameraIcon />
              <Text style={[styles.textPermission]}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => defOpenOrClose('album')}
              style={[styles.contentsMain]}>
              <AlbumIcon />
              <Text style={[styles.textPermission]}>Album</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      )
    );
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      position: 'absolute',
      top: "-5%",
      left: 0,
      right: 0,
      bottom: '0%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      height: HEIGHT,
      width: WIDTH,
    },
    contentContainer: {
      position: 'absolute',
      // top: '85%',
      ...flexCenter,
      justifyContent: 'space-between',
      // gap:20,
      width: '90%',
      left: '5%',
      bottom: '8%',
    },
    contentsMain: {
      backgroundColor: '#fff',
      width: '46%',
      ...flexCenter,
      flexDirection: 'column',
      borderRadius: 12,
      padding: '5%',
    },
    textPermission: {
      color: 'rgb(51,51,51)',
      fontFamily: primaryFontMedium,
      fontSize: f15,
    },
  });
  