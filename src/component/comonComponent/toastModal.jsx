import {useEffect, useMemo, useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { f14, flexCenter, primaryFontMedium } from '../../styles/appStyles';

export default function ToastModal(props) {
  const {visible, text,positionStyles,isDanger} = props;

  const [modalVisible, setModalVisible] = useState(true);
  useMemo(() => {
    setModalVisible(visible);
  }, [visible]);

  const close = () => {
    setModalVisible(false);
  };

  return (
    modalVisible && text &&
    <View style={[styles.centeredView,{...positionStyles}]}>
      <View style={[styles.modalView,{ backgroundColor: isDanger ? 'red':'#000',padding:isDanger ? 8 : 15}]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  centeredView: {
    height: 'auto',
    top: '15%',
    ...flexCenter,
    position:"absolute",
    width:"100%",
  zIndex:999999
    // backgroundColor:"red",
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    paddingHorizontal: 25,
   
  },
  text: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    color: '#fff',
    fontFamily: primaryFontMedium,
    fontSize: f14,
  },
});
