import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// Styles and constants

import {ValidateNumber} from './validation';
import {  btnPrimary,
  f14,
  f16,
  f30,
  flexCenter,
  inputStyle,
  primaryFontMedium,
  primaryFontSemiBold,} from '../../styles/appStyles';
import { secondaryColor } from '../../styles/theme';

const ChooseTimeModal = props => {
  const {isActive, closeModal, defaultTime} = props;

  // State for modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // State for time input values
  const [timeData, setTimeData] = useState({
    hours: '07',
    minutes: '00',
    isAM: true, // Default to AM
    isPM: false,
  });

  // Effect to handle modal visibility based on isActive prop
  useEffect(() => {
    setModalVisible(isActive);

    if (defaultTime ) {
      // example 09:11 AM
      const hrs = defaultTime?.split(':'); 
      const minSplit = hrs[1]?.split(' '); //mins and AM/PM

      const tt = {
        hours: hrs[0],
        minutes: minSplit[0],
        isAM: minSplit[1] == 'AM',
        isPM: minSplit[1] == 'PM',
      };
      setTimeData(tt);
    }
  }, [isActive, defaultTime]);

  // Function to handle input changes (hours and minutes)
  // const inputChange = (value, type) => {
  //   if (ValidateNumber(value) || value === '') {
  //     let updatedTimeData = {...timeData};
  //     if (type === 'hrs') {
  //       // Limit hours input between 1 and 12
  //       if (value <= 12 && value >= 0) {
  //         updatedTimeData = {...timeData, hours: value};
  //       }
  //     } else if (type === 'mins') {
  //       // Limit minutes input between 0 and 59
  //       if (value <= 59 && value >= 0) {
  //         updatedTimeData = {...timeData, minutes: value};
  //       }
  //     }
  //     setTimeData(updatedTimeData);
  //   }
  // };


  const validateNumber = (value) => {
    return !isNaN(value) && value.trim() !== '';
  };


  const inputChange = (value, type) => {
    if (validateNumber(value)) {
      const numValue = Number(value);
      let updatedTimeData = { ...timeData };

      if (type === 'hrs') {
        // Limit hours input between 1 and 12
        if (numValue >= 0 && numValue <= 12) {
          updatedTimeData.hours = numValue < 10 ? `0${numValue}` : `${numValue}`;
        }
      } else if (type === 'mins') {
        // Limit minutes input between 0 and 59
        if (numValue >= 0 && numValue <= 59) {
          updatedTimeData.minutes = numValue < 10 ? `0${numValue}` : `${numValue}`;
        }
      }
      setTimeData(updatedTimeData);
    }
  };

  // Function to format single digit numbers with leading zero
  const formatNumber = input => {
    return input.replace(/^0+(\d+)/, '$1');
  };

  // Function to toggle between AM and PM
  const toggleAMPM = () => {
    setTimeData({
      ...timeData,
      isAM: !timeData.isAM,
      isPM: !timeData.isPM,
    });
  };

  // Function to handle OK button press
  const close = () => {
    setModalVisible(false); // Close modal
    closeModal(timeData); // Execute closeModal function passed as prop
  };

  return (
    timeData.hours && (
      <GestureHandlerRootView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            close(); // Close modal on Android back button press
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.labelText}>Select Time</Text>

              <View style={styles.timeMain}>
                <TextInput
                  inputMode="numeric"
                  onChangeText={text => inputChange(text, 'hrs')}
                  style={styles.inps}
                  value={timeData.hours}
                />
                <Text style={styles.colon}>:</Text>
                <TextInput
                  inputMode="numeric"
                  onChangeText={text => inputChange(text, 'mins')}
                  style={styles.inps}
                  value={timeData.minutes}
                />

                <View style={styles.formatMain}>
                  <TouchableOpacity
                    onPress={toggleAMPM}
                    style={[
                      styles.formatBorder,
                      styles.borderTop,
                      timeData.isAM ? styles.activeMains : null,
                    ]}>
                    <Text
                      style={[
                        styles.formatText,
                        timeData.isAM ? styles.activeFormat : null,
                      ]}>
                      AM
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={toggleAMPM}
                    style={[
                      styles.formatBorder,
                      styles.borderBottom,
                      timeData.isPM ? styles.activeMains : null,
                    ]}>
                    <Text
                      style={[
                        styles.formatText,
                        timeData.isPM ? styles.activeFormat : null,
                      ]}>
                      PM
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.bottomContainer}>
                <TouchableOpacity onPress={() => close()}>
                  <Text style={styles.cancelText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => close()}>
                  <Text style={styles.okText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </GestureHandlerRootView>
    )
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    paddingHorizontal: 25,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  labelText: {
    fontSize: f16,
  },
  timeMain: {
    ...flexCenter,
    gap: 15,
    height: 'auto',
  },
  inps: {
    ...inputStyle(),
    borderRadius: 4,
    width: 'auto',
    fontSize: f30,
    padding: 5,
    fontFamily: primaryFontMedium,
    backgroundColor: 'rgba(33, 33, 33, 0.08)',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(33, 33, 33, 0.01)',
      },
      android: {
        shadowColor: 'rgba(33, 33, 33, 0.01)',
      },
    }),
  },
  colon: {
    fontSize: f30,
    fontFamily: primaryFontMedium,
  },
  labelText: {
    fontSize: f14,
    fontFamily: primaryFontMedium,
    color: '#222222',
    paddingBottom: 15,
  },
  formatMain: {
    borderRadius: 4,
    height: '100%',
  },
  formatText: {
    ...flexCenter,
    fontSize: f16,
    fontFamily: primaryFontMedium,
    color: 'rgba(0, 0, 0, 0.6)',
    width: 'auto',
    padding: 3,
  },
  activeFormat: {
    color: secondaryColor,
  },
  activeMains: {
    backgroundColor: 'rgba(231, 246, 252, 1)',
  },
  formatBorder: {
    paddingHorizontal: 7,
    width: 'auto',
    ...flexCenter,
    backgroundColor: 'rgba(33, 33, 33, 0.08)',
    flex: 1,
  },
  borderTop: {
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  borderBottom: {
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(218, 220, 224, 1)',
  },
  bottomContainer: {
    ...flexCenter,
    justifyContent: 'flex-end',
    gap: 20,
    marginVertical: 20,
  },
  cancelText: {
    color: secondaryColor,
    fontFamily: primaryFontSemiBold,
    fontSize: f14,
  },
  okText: {
    ...btnPrimary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 0,
  },
});

export default ChooseTimeModal;
