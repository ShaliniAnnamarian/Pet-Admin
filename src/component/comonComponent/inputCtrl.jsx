import { Controller } from 'react-hook-form';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useEffect, useState } from 'react';
// import EyecloseIcon from '../../assets/images/eyeCloseIcon';
// import EyeOpenIcon from '../../assets/images/eyeOpenIcon';
import { f11, f12, f14, inputStyle, primaryFontMedium } from '../../styles/appStyles';
import { placeholderColor } from '../../styles/theme';

const HEIGHT = Dimensions.get('window').height;
const isSmallDevice = HEIGHT < 820;
export default function InpCtrl(props) {
  const {
    placeholderText,
    controlName,
    control,
    errMesg,
    label,
    rules,
    type,
    defaultValue,
    isShowErr,
    disable
  } = props;

  const [showText, setShowText] = useState(
    type == 'show-password' ? false : true,
  );

  return (
    <Controller
      control={control}
      // rules={{required: errMesg, ...rules}}
      rules={{ ...rules }}
      defaultValue={defaultValue ? defaultValue : ''}
      name={controlName}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
        return (
          <>
            <View style={[styles.inpMain,error && isShowErr && {marginBottom: 0}]}>
              {label && (
                <Text style={[styles.inpText]}>
                  {label}
                  {rules?.required && <Text style={[styles.starImportant]}> *</Text>}
                </Text>
              )}
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                editable ={disable ? false : true}
                style={[
                  styles.inpCusBox,
                  {textTransform: ['email', 'website'].includes(controlName) ? 'lowercase' : 'none'},
                  error && styles.errInp,
                  disable && styles.disableInp
                ]}
                placeholderTextColor={placeholderColor}
                placeholder={placeholderText}
                keyboardType={type ? type : 'default'}
                secureTextEntry={type == 'view-password' ? showText : false}
              />
              {/* {type == 'view-password' && (
                <TouchableOpacity
                  style={[styles.toggEye]}
                  onPress={() => setShowText(!showText)}>
                  {showText ? <EyeOpenIcon /> : <EyecloseIcon />}
                </TouchableOpacity>
              )} */}
            </View>
            {error && isShowErr && (
              <Text style={{ color: 'red', fontSize: f10 }}>{isShowErr}</Text>
            )}
          </>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  inpMain: {
    marginBottom: isSmallDevice ? '2%' : '3%',
    position: 'relative',
  },
  inpCusBox: {
    ...inputStyle(),
    paddingVertical: isSmallDevice ? 4 : 10,
    fontSize: f11,
    paddingVertical:15
  },
  inpText: {
    fontSize: f12,
    fontFamily: primaryFontMedium,
    color: '#000000',
    paddingBottom: 5,
  },
  starImportant: {
    fontSize: f12,
    fontFamily: primaryFontMedium,
    color: 'red',
  },
  errInp: {
    shadowColor: 'red',
    shadowOpacity: 1,
    borderColor: 'red',
    borderWidth: 1,
  },
  disableInp:{
    backgroundColor:"rgba(0,0,0,0.1)",
    shadowColor: 'rgba(0,0,0,0.1)',
  },
  toggEye: {
    position: 'absolute',
    zIndex: 3,
    right: 0,
    top: '35%',
    paddingHorizontal: 10
  },
});
