import {
    Button,
    Dimensions,
    KeyboardAvoidingView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import { useNavigation, useRoute } from '@react-navigation/native';
  import { useEffect, useState } from 'react';
  import { SafeAreaView } from 'react-native-safe-area-context';
  
  import RegisterForm from './registerForm';
import { defaultColor, defBgColor, statusBarbg } from '../../../styles/theme';
import { btnPrimary, f12, f14, f20, primaryFontMedium, primaryFontSemiBold } from '../../../styles/appStyles';
import BackIcon from '../../../assets/images/backIcon';
  // import LoaderCircle from '../../../../utils/loaderCircle';
  
  const WIDTH = Dimensions.get('screen').width;
  
  export default function RegisterLayout() {
    const navigation = useNavigation();
    const [currentForm, setCurrentForm] = useState(1);
    const [isEdit, setIsEdit] = useState(false);
    const currentRoute = useRoute();
    const [loaderActive, setIsLoaderActive] = useState(false);
    const [loaderText, setLoaderText] = useState('');
    const [currentFormType, setCurrentFormType] = useState('');
  
    useEffect(() => {
      if (currentRoute.name) {
        if (currentRoute.name == 'shop-edit') {
          setIsEdit(true);
          setCurrentFormType('EDIT');
        } else {
          setIsEdit(false);
          setCurrentFormType('NEW');
        }
      }
    }, [currentRoute]);
  
    const multiStepData = [
      { formNo: 1, label1: 'Basic', label2: 'Information' },
      { formNo: 2, label1: 'Business', label2: 'Details' },
      { formNo: 3, label1: 'Documents', label2: 'Verification' },
    ];
  
    function backbtnClicked() {
      if (currentForm == 1) {
        navigation.goBack();
      } else {
        setCurrentForm(prev => prev - 1);
      }
    }
  
    return (
  
      <>
        <StatusBar
          backgroundColor={statusBarbg}
          barStyle={'default'}
        // translucent={false}
        />
        {(!currentRoute || !currentFormType) ?
        //  <LoaderCircle
        //   size="large"
        //   visible={loaderActive}
        //   textContent={loaderText}
        // /> 
        <></>
        :
          <>
            <SafeAreaView style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: defBgColor,
                  paddingTop:
                    currentRoute.name !== 'shop-edit' ? 10 : 10,
                }}>
                <View style={[styles.mainContainer, {}]}>
                  <View style={{ flex: 1 }}>
                    <View style={[styles.headerMains]}>
                      <View style={[styles.navBackBtnMain]}>
                        <TouchableOpacity
                          style={[styles.backBtn]}
                          onPress={() => backbtnClicked()}>
                          <BackIcon />
                        </TouchableOpacity>
                        <Text style={[styles.registerHeaderText]}>
                          {isEdit ? 'Edit Details' : 'Registration'}
                        </Text>
                      </View>
  
                      {!isEdit && currentRoute.name !== 'shop-edit' && (
                        <View style={[styles.multiStepContainer]}>
                          <View style={[styles.multiStepMain]}>
                            {multiStepData.map((item, i) => {
                              const { label1, label2 } = item;
                              return (
                                <View style={[styles.multiStep]} key={i + label1}>
                                  {i !== 2 && (
                                    <View
                                      style={[
                                        styles.progress,
                                        {
                                          backgroundColor:
                                            i + 2 <= currentForm
                                              ? '#07A4DE'
                                              : 'rgba(217, 217, 217, 1)',
                                        },
                                      ]}></View>
                                  )}
                                  <View
                                    style={{
                                      backgroundColor: defBgColor,
                                      paddingHorizontal: 20,
                                    }}>
                                    <Text
                                      style={[
                                        styles.multiStepNum,
                                        {
                                          backgroundColor:
                                            i + 1 <= currentForm
                                              ? '#07A4DE'
                                              : 'rgba(0, 0, 0, 0.5)',
                                        },
                                      ]}>
                                      {i + 1}
                                    </Text>
                                  </View>
                                  <Text style={[styles.multiStepText,{color: i+1 <=currentForm ? '#07A4DE' : "rgba(0,0,0,0.5)"}]}>{label1}</Text>
                                  <Text style={[styles.multiStepText,{color: i+1 <=currentForm ? '#07A4DE' : "rgba(0,0,0,0.5)"}]}>{label2}</Text>
                                </View>
                              );
                            })}
                          </View>
                        </View>
                      )}
                    </View>
                    <RegisterForm
                      updateCurrForm={() => {
                        setCurrentForm(currentForm + 1);
                      }}
                      toGiveCurrentForm={currentForm}
                      currentType={currentFormType}
                      setIsLoaderActiveProps={val => setIsLoaderActive(val)}
                      loaderTextProps={val => setLoaderText(val)}
                    />
                  </View>
                </View>
              </View>
  
            </SafeAreaView>
          </>
        }
      </>
  
    );
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      width: '100%',
      margin: 'auto',
      backgroundColor: defBgColor,
    },
    headerMains: { marginBottom: 40, width: '85%', marginHorizontal: 'auto' },
    navBackBtnMain: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    backBtn: { position: 'absolute', left: 0 },
    registerHeaderText: {
      textAlign: 'center',
      fontSize: f20,
      fontFamily: primaryFontSemiBold,
      color: defaultColor,
    },
    multiStepContainer: {
      position: 'relative',
      paddingTop: '5%',
    },
    progress: {
      height: 2,
      width: WIDTH / 3,
      top: '20%',
      position: 'absolute',
      left: '50%',
    },
    leftProgress: { left: 0, backgroundColor: 'red' },
    rightProgress: { right: 0, left: '50%', backgroundColor: 'blue' },
    multiStepMain: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    multiStep: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    multiStepNum: {
      borderRadius: 1000,
      height: 40,
      width: 40,
      backgroundColor: '#07A4DE',
      textAlign: 'center',
      fontSize: f14,
      fontFamily: primaryFontMedium,
      color: '#fff',
    },
    multiStepText: {
      fontFamily: primaryFontMedium,
      
      fontSize: f12,
    },
    submitBtn: {
      ...btnPrimary,
      marginTop: '0%',
    },
  });
  