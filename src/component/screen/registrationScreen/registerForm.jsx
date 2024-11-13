import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { btnPrimary, defaultColor, f12, f14, f16, flexCenter, inputStyle, primaryFontLight, primaryFontMedium, primaryFontSemiBold, } from '../../../styles/appStyles';
import { MultiSelect } from 'react-native-element-dropdown';
import { useForm } from 'react-hook-form';
// import { fetchSingleShop, resetSingleShop } from '../../../../service/asyncUpdates/getSingleShop';
import GetCoordsMapView from './getLatLongMap';
// import { resetCreateShop ,createStore} from '../../../../service/asyncUpdates/createShop';
// import { CREATE_PET_SHOP, EDIT_PET_SHOP } from '../../../../service/apiList/API';
// import {
//   resetFileUpload,
//   uploadFileFetch,
// } from '../../../../service/asyncUpdates/uploadFile';
import InpCtrl from '../../comonComponent/inputCtrl';
import DeleteIconGray from '../../../assets/images/deleteGrayIcon';
import AddIconPlus from '../../../assets/images/addIconPlus';
import CheckboxIcon from '../../../assets/images/checkBox';
import ChooseTimeModal from '../../comonComponent/chooseTime';
import AddImagesIcon from '../../../assets/images/addImageIcon';
import CameraAndFile from '../../../utils/cameraAndFIles';
import RemoveIconBg from '../../../assets/images/removeIconBg';
import { TimeClock } from '../../../assets/images/timeClock';
import hoursConvertor from '../../../utils/hoursConvertor';
import ToastModal from '../../comonComponent/toastModal';
import LicenseVerifier from '../../comonComponent/licenseVerifier';
// import { PanoramaView } from '@thomas_hunt/react-native-panorama-view';
// import LoaderCircle from '../../../utils/loaderActive';
// import LicenseVerifier from '../../comonComponent/licenseVerifier';

const openingDaysInitial = {
  daysList: [
    { label: 'Mon', day: 'monday', active: false },
    { label: 'Tue', day: 'tuesday', active: false },
    { label: 'Wed', day: 'wednesday', active: false },
    { label: 'Thur', day: 'thursday', active: false },
    { label: 'Fri', day: 'friday', active: false },
    { label: 'Sat', day: 'saturday', active: false },
    { label: 'Sun', day: 'sunday', active: false },
  ],
  selectAllDaysActive: false,
  open: '09:00 AM',
  close: '06:00 PM',
};

const availablePets = [
  { uuid: '1', name: 'Dog', image_url: 'https://example.com/dog.png' },
  { uuid: '2', name: 'Cat', image_url: 'https://example.com/cat.png' },
];

const serviceOffer = [
  { uuid: '1', name: 'Grooming', image_url: 'https://example.com/grooming.png' },
  { uuid: '2', name: 'Training', image_url: 'https://example.com/training.png' },
]

const documentData = [
  { label: 'Pet shop Licence', uuid: "", file_name: '' },
  { label: 'Trade Licence', uuid: "", file_name: '' },
  { label: 'FSSAI Licence', uuid: "", file_name: '' },
  { label: 'GST Registration', uuid: "", file_name: '' },
];
const WIDTH = Dimensions.get('screen').width;
export default function RegisterForm(props) {
  const {
    updateCurrForm,
    toGiveCurrentForm,
    currentType,
    setIsLoaderActiveProps,
    loaderTextProps,
  } = props;

  const { inpMain, inpText, inp } = styles;
  const [currentForm, setCurrentForm] = useState(1);
  const [docData, setDocData] = useState(documentData);
  const [petListData, setPetListData] = useState(availablePets);
  const [productListData, setProductListData] = useState(serviceOffer);
  const [availablePetsArr, setAvailablePetsArr] = useState([]);
  const [availableProductsArr, setAvailableProductsArr] = useState([]);
  const [openTimeModal, setOpenTimeModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [openingDay, setOpeningDay] = useState([openingDaysInitial]);
  const [descText, setDescText] = useState('');
  const [currenttimeSet, setCurrentTimeset] = useState('');
  const [currentFormMode, setcurrentFormMode] = useState('');
  const [petImagesArr, setPetImagesArr] = useState([]);
  const [payLoadPetImages, setPayLoadPetImages] = useState([]);
  const [showMaps, setShowMaps] = useState(false);
  const [isShowToast, setIsShowToast] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [toastText, setToastText] = useState('');
  const [currentTimeRes, setCurrentTimeRes] = useState(null);
  const [loaderActive, setLoaderActive] = useState(false);
  const [validationErrorPets, setValidationErrorPets] = useState('');
  const [validationErrorProducts, setValidationErrorProducts] = useState('');

  const navigation = useNavigation();
  const { handleSubmit, control, clearErrors, setValue } = useForm();
  const currentRoute = useRoute();
  const dispatch = useDispatch();

  // const PET_LIST_REDUCER = useSelector(state => state.petlistReducer);
  // const PET_PRODUCT_LIST = useSelector(state => state.productListReducer);
  // const CREATE_STORE_REDUCER = useSelector(state => state.createStoreReducer);
  // const GET_SINGLE_SHOP_REDUCER = useSelector(state => state.singlePetShopReducer);
  // const FILE_UPLOAD_REDUCER = useSelector(state => state.uploadFileReducer);


  useFocusEffect(
    useCallback(() => {
      return () => {
        // dispatch(resetSingleShop());
      };
    }, [])
  );


  useEffect(() => {
    setcurrentFormMode(currentType);
  }, [currentType]);

  useEffect(() => {
    if (currentType !== 'NEW') {
      if (currentRoute?.params?.shopId) {
        dispatch(fetchSingleShop(currentRoute?.params?.shopId));
      }
    }
  }, [currentType, currentRoute]);

  // useMemo(() => {
  //   if (PET_LIST_REDUCER?.data?.data) {
  //     setPetListData(PET_LIST_REDUCER.data.data);
  //   }
  //   if (PET_PRODUCT_LIST?.data?.data) {
  //     setProductListData(PET_PRODUCT_LIST.data.data);
  //   }
  // }, [PET_LIST_REDUCER, PET_PRODUCT_LIST]);

  // Edit shop 
  // useMemo(() => {
  //   if (GET_SINGLE_SHOP_REDUCER?.data?.data && currentFormMode == 'EDIT') {
  //     setLoaderActive(true)
  //     const currShop = GET_SINGLE_SHOP_REDUCER?.data?.data;
  //     const {
  //       name,
  //       owner_name,
  //       street,
  //       town,
  //       city,
  //       pincode,
  //       location,
  //       latitude,
  //       longitude,
  //       mobile,
  //       landline,
  //       email,
  //       website,
  //       description,
  //       landmark,
  //     } = currShop;

  //     const patchValues = {
  //       name,
  //       owner_name,
  //       street,
  //       town,
  //       city,
  //       pincode,
  //       location,
  //       latitude,
  //       longitude,
  //       mobile,
  //       landline,
  //       email,
  //       website,
  //       landmark,
  //     };
  //     const editD = {
  //       ...patchValues,
  //       description,
  //     };
  //     setEditData(editD);
  //     setDescText(description);

  //     Object.entries(patchValues).forEach(item => {
  //       setValue(item[0], item[1]?.toString());
  //     });
  //     if (currShop?.pets) {
  //       const resPets = currShop?.pets?.map(item => item.name);
  //       setAvailablePetsArr(resPets);
  //     }
  //     if (currShop?.products) {
  //       const resProducts = currShop?.products?.map(item => item.name);
  //       setAvailableProductsArr(resProducts);
  //     }
  //     // updateOpeningdays
  //     editDataForOpeningDays(currShop?.timings);

  //     // images 
  //     const petImageres = currShop?.files?.filter(item => item?.file_type == 'image');
  //     setPayLoadPetImages(petImageres)

  //     // Patching files
  //     const fileDocs = currShop?.files.filter(item => item.file_type !== 'image' && item);

  //     if (fileDocs?.length !== 0) {
  //       const res = docData.map(item => {
  //         const findMatched = fileDocs?.find(val => val?.file_type == item.label)
  //         if (findMatched) {
  //           const { file_type, file_name, uuid, file_url } = findMatched
  //           return { ...item, uuid, file_name }
  //         } else return item
  //       })


  //       setDocData(res)

  //     }
  //     setLoaderActive(false)
  //   }
  // }, [GET_SINGLE_SHOP_REDUCER, currentFormMode]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetFileUpload());
  //   };
  // }, []);

  // form 2
  // Opening Days weeks days
  function addOpeningDaysArr() {
    const stringy = JSON.stringify(openingDaysInitial);
    const parsy = JSON.parse(stringy);
    const res = [...openingDay, parsy];
    setOpeningDay([...res]);
  }
  function removeOpeningArr(i) {
    const res = openingDay.filter((item, index) => index !== i)
    setOpeningDay(res);
  }
  function selectAllDays(i) {
    let res = openingDay[i];
    if (res.daysList.some(item => item.active == false)) {
      const update = res.daysList.map(item => {
        return { ...item, active: true };
      });
      res = { ...res, daysList: update, selectAllDaysActive: true };
    } else {
      const update = res.daysList.map(item => {
        return { ...item, active: false };
      });
      res = { ...res, daysList: update, selectAllDaysActive: false };
    }
    const result = openingDay.map((item, index) =>
      i == index ? { ...res } : { ...item },
    );
    setOpeningDay(result);
  }
  function updateSingleDay(mainIndex, index) {
    let res = openingDay[mainIndex];

    res.daysList[index].active = !res.daysList[index].active;

    const result = openingDay.map((item, i) =>
      mainIndex == i ? { ...res } : { ...item },
    );
    if (result[mainIndex].daysList.some(item => item.active == false)) {
      result[mainIndex].selectAllDaysActive = false;
    } else {
      result[mainIndex].selectAllDaysActive = true;
    }

    setOpeningDay(result);
  }
  function editDataForOpeningDays(res) {
    const data = [];

    const days = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];
    res.forEach(item => {
      data.push({
        ...openingDaysInitial,
        open: hoursConvertor(item.open),
        close: hoursConvertor(item.close),
        daysList: [
          { label: 'Mon', day: 'monday', active: item['monday'] == 1 },
          { label: 'Tue', day: 'tuesday', active: item['tuesday'] == 1 },
          { label: 'Wed', day: 'wednesday', active: item['wednesday'] == 1 },
          { label: 'Thur', day: 'thursday', active: item['thursday'] == 1 },
          { label: 'Fri', day: 'friday', active: item['friday'] == 1 },
          { label: 'Sat', day: 'saturday', active: item['saturday'] == 1 },
          { label: 'Sun', day: 'sunday', active: item['sunday'] == 1 },
        ],
        selectAllDaysActive: days.every(val => item[val] == 1),
      });
    });

    setOpeningDay(data);
  }
  // Opening and closing time
  function updateTimeFuc(data) {
    const { isAM, hours, minutes } = data;

    const res = openingDay.map((item, i) => {
      if (i == currenttimeSet.currentIndex) {
        return {
          ...item,
          [currenttimeSet.type]: `${hours ? hours : '00'}:${minutes ? minutes : '00'} ${isAM ? 'AM' : 'PM'}`,
        };
      } else {
        return item;
      }
    });

    setOpeningDay(res);
  }
  // Submit
  useEffect(() => {
    if (toGiveCurrentForm !== currentForm) {
      setCurrentForm(toGiveCurrentForm);
    }
  }, [toGiveCurrentForm]);
  function nextBtnClick(data, e) {
    if (currentForm == 2 && payLoadPetImages?.length == 0) {
      setToastText('Please choose Pet Images to upload');
      setIsShowToast(true);
      setTimeout(() => {
        setIsShowToast(false);
      }, 2000);
      // return;
    }
    setCurrentForm(currentForm + 1);
    updateCurrForm(data);
  }
  function nextBtn() {
    if (currentForm === 2) {
      let valid = true;

      if (availablePetsArr.length === 0) {
        setValidationErrorPets('Please select at least one pet');
        valid = false;
      }
      if (availableProductsArr.length === 0) {
        setValidationErrorProducts('Please select at least one service');
        valid = false;
      }

      if (valid) {
        // Continue with submission logic
        handleSubmit(nextBtnClick)();
      }
    } else {
      handleSubmit(nextBtnClick)();
    }

  }
  function handleFormSubmit() {
    handleSubmit(onFormSubmit)();
  }
  function onFormSubmit(data, e) {
    formSubmitApi(data);
  }
  function formSubmitApi(data) {
    const formData = data;

    const ofcTiming = [];
    const availablePets = get_uuidList(
      petListData,
      availablePetsArr,
      'name',
      'uuid',
    );
    const availableProduct = get_uuidList(
      productListData,
      availableProductsArr,
      'name',
      'uuid',
    );
    const file = payLoadPetImages.map(item => item?.uuid);

    const docFiles = docData.map(item => item?.uuid).filter(item => item)

    const file_Images = [...file, ...docFiles]
    openingDay?.forEach(item => {
      const { daysList, open, close } = item;
      let obj = { open, close };
      daysList.forEach(day => {
        obj[day['day']] = day?.active;
      });
      ofcTiming.push(obj);
    }); //opening days

    if (payLoadPetImages?.length == 0) {
      setToastText('Please choose Pet Images to upload');
      setIsShowToast(true);
      setTimeout(() => {
        setIsShowToast(false);
      }, 2000);
    }
    if (formData) {
      const payload = {
        ...formData,
        description: descText,
        available_pets: availablePets ? availablePets?.join(',') : '',
        service_offered: availableProduct ? availableProduct?.join(',') : '',
        office_timings: ofcTiming,
        files: file_Images ? file_Images?.join(',') : '',
        opened_year: 2020,
        status: 1,
      };
      setIsLoaderActiveProps(true);
      if (currentFormMode == 'EDIT') {
        loaderTextProps('Updating Shop Details');
        const data = {
          url: EDIT_PET_SHOP + currentRoute?.params?.shopId,
          payload: payload,
        };

        dispatch(createStore(data));
      } else {
        loaderTextProps('Creating Shop ');
        const data = {
          url: CREATE_PET_SHOP,
          payload: payload,
        };
        dispatch(createStore(data));
      }
    }
  }
  // Store create API
  // useEffect(() => {
  //   if (
  //     CREATE_STORE_REDUCER.isError == false &&
  //     CREATE_STORE_REDUCER.isLoading == false
  //   ) {
  //     setIsLoaderActiveProps(true);
  //     if (CREATE_STORE_REDUCER.data?.status == 'success') {
  //       // setIsShowToast(true);
  //       // setToastText(CREATE_STORE_REDUCER.data?.message);
  //       loaderTextProps(CREATE_STORE_REDUCER.data?.message);

  //       setTimeout(() => {
  //         // setIsShowToast(false);
  //         dispatch(resetCreateShop());
  //         setIsLoaderActiveProps(false);
  //         loaderTextProps('');
  //         navigation.navigate('store', { name: 'store' });
  //       }, 2000);
  //     } else {
  //       setIsLoaderActiveProps(false)

  //     }
  //   }
  // }, [CREATE_STORE_REDUCER]);

  function get_uuidList(data, selectedArr, checkKey, returnKey) {
    let resultArr = [];
    data.forEach(item => {
      const isFind = selectedArr.find(val => val == item[checkKey]);
      isFind && resultArr.push(item[returnKey]);
    });
    return resultArr;
  }

  // set multi drop values

  function getCoordsFromMap(data) {

    if (data?.latitude) {
      // setEditData(res);
      setValue('latitude', data.latitude.toString());
      setValue('longitude', data.longitude.toString());
      clearErrors('latitude');
      clearErrors('longitude')
    }
  }
  // Files ==================================
  // File upload API
  // useEffect(() => {
  //   if (FILE_UPLOAD_REDUCER?.data) {
  //     if (FILE_UPLOAD_REDUCER?.data?.status == 'success') {
  //       if (FILE_UPLOAD_REDUCER?.data?.data.file_type == 'image') {
  //         setPayLoadPetImages([
  //           ...payLoadPetImages,
  //           FILE_UPLOAD_REDUCER?.data?.data,
  //         ]);
  //       } else {

  //         // file_type ==> label name
  //         const { file_type, file_name, uuid, file_url } = FILE_UPLOAD_REDUCER?.data?.data;

  //         const updatedDoc = docData.map((item) => {
  //           if (item.label == file_type) {
  //             return {
  //               ...item,
  //               uuid,
  //               file_name
  //             }
  //           } else {
  //             return item
  //           }
  //         });
  //         setDocData(updatedDoc)
  //         // FILE_UPLOAD_REDUCER?.data?.data
  //       }
  //     }
  //     setIsLoaderActiveProps(false);
  //     loaderTextProps('');
  //   } else {
  //     setIsLoaderActiveProps(false);
  //   }
  // }, [FILE_UPLOAD_REDUCER]);




  function setImages(data) {
    setPayLoadPetImages(data);

    setIsLoaderActiveProps(true);
    loaderTextProps('Uploading...');
    setPetImagesArr([...petImagesArr, ...data]);
    const { fileName, type, uri } = data[0];

    const res = { name: fileName, type, uri };

    const file = new FormData();
    file.append('file', res);
    file.append('file_type', 'image');

    // dispatch(uploadFileFetch(file));
  }

  function removeImg(i) {
    // const res = petImagesArr.slice(0, i);
    const res = petImagesArr.filter((item, index) => index !== i)
    setPetImagesArr(res);
    const resPayload = payLoadPetImages.filter((item, index) => index !== i)
    // setPayLoadPetImages(resPayload);
  }

  function removeDocument(i) {
    const resData = docData.map((item, index) => {
      if (index == i) {
        return {
          ...item,
          uuid: "", file_name: ''
        }
      } else {
        return item
      }
    });
    setDocData(resData)
  }

  const handlePetsChange = (item) => {
    setAvailablePetsArr(item);
    if (item.length > 0) setValidationErrorPets(''); // Clear error if selection is made
  };

  const handleProductsChange = (item) => {
    setAvailableProductsArr(item);
    if (item.length > 0) setValidationErrorProducts(''); // Clear error if selection is made
  };

  const [imageUrl, setimageUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const handle3DImage = (url) => {

    setShowPopup(!showPopup);
    setimageUrl(url);
  }

  // const handleClick = () => {
  // };


  // ========================================
  return (currentFormMode &&
    <>
      {/* {currentFormMode == 'EDIT' &&
          <LoaderCircle
            size="large"
            visible={loaderActive}
            textContent={''}
          />} */}
      <ToastModal
        visible={isShowToast}
        text={toastText}
        positionStyles={{ top: '0%' }}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1, width: '85%', marginHorizontal: 'auto' }}>
          {(currentForm == 1 || currentFormMode == 'EDIT') && (
            <React.Fragment>
              <InpCtrl
                label="Shop Name"
                placeholderText="Enter Shop Name"
                controlName="name"
                control={control}
                errMesg="This field is required"
                defaultValue={editData?.name ? editData?.name : ''}
                rules={{ required: false }}
              />
              <InpCtrl
                label="Owner Name"
                placeholderText="Enter owner name"
                controlName="owner_name"
                control={control}
                errMesg="This field is required"
                defaultValue={editData?.owner_name ? editData?.owner_name : ''}
                rules={{ required: false }}
              />
              <Text style={[styles.seperatorText]}>Address</Text>

              <InpCtrl
                label="Street Name"
                placeholderText="Enter Street Name"
                controlName="street"
                control={control}
                errMesg="This field is required"
                defaultValue={editData?.street ? editData?.street : ''}
                rules={{ required: false }}
              />
              <InpCtrl
                label="Town"
                placeholderText="Enter Town"
                controlName="town"
                control={control}
                errMesg="This field is required"
                defaultValue={editData?.town ? editData?.town : ''}
                rules={{ required: false }}
              />

              <View style={styles.singleRowInps}>
                <View style={{ flex: 1 }}>
                  <InpCtrl
                    label="City"
                    placeholderText="Enter city"
                    controlName="city"
                    control={control}
                    errMesg="This field is required"
                    defaultValue={editData?.city ? editData?.city : ''}
                    rules={{ required: false }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <InpCtrl
                    label="Pincode"
                    placeholderText="Enter pincode"
                    controlName="pincode"
                    control={control}
                    errMesg="This field is required"
                    rules={{ required: false, minLength: 6, maxLength: 6 }}
                    type="numeric"
                    defaultValue={editData?.pincode ? editData?.pincode : ''}
                  />
                </View>
              </View>

              <InpCtrl
                label="Landmark"
                placeholderText="Enter landmark"
                controlName="landmark"
                control={control}
                errMesg="This field is required"
                defaultValue={editData?.landmark ? editData?.landmark : ''}
                rules={{ required: false }}
              />
              <InpCtrl
                label="Location in Google Map"
                placeholderText="Enter landmark"
                controlName="location"
                control={control}
                errMesg="This field is required"
                defaultValue={editData?.location ? editData?.location : ''}
              />

              <View
                style={[
                  { ...flexCenter, justifyContent: 'flex-start', gap: 20 },
                ]}>
                <Text style={[styles.seperatorText]}>GPS Coordinates</Text>
                <TouchableOpacity
                  style={[styles.seperatorText]}
                  onPress={() => setShowMaps(true)}>
                  <Text
                    style={[
                      styles.addMoreBtn,
                      { fontFamily: primaryFontSemiBold },
                    ]}>
                    Current Location
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.singleRowInps}>
                <View style={[{ flex: 1 }]}>
                  <InpCtrl
                    label="Latitude"
                    placeholderText="0.000000"
                    controlName="latitude"
                    control={control}
                    errMesg="This field is required"
                    type="numberic"
                    defaultValue={editData?.latitude ? editData?.latitude : ''}
                    rules={{ required: false }}
                  />
                </View>
                <View style={[{ flex: 1 }]}>
                  <InpCtrl
                    label="Longitude"
                    placeholderText="0.000000"
                    controlName="longitude"
                    control={control}
                    errMesg="This field is required"
                    type="numeric"
                    defaultValue={
                      editData?.longitude ? editData?.longitude : ''
                    }
                    cusValue={editData?.longitude ? editData?.longitude : ''}
                    rules={{ required: false }}
                  />
                </View>
              </View>

              <Text style={[styles.seperatorText]}>Contact Information</Text>

              <InpCtrl
                label="Mobile Number"
                placeholderText="Enter mobile number"
                controlName="mobile"
                control={control}
                errMesg="This field is required"
                type="numeric"
                defaultValue={editData?.mobile ? editData?.mobile : ''}
                rules={{ pattern: /^\d{10}$/, required: false }}
              />
              <InpCtrl
                label="Landline Number"
                placeholderText="Enter landline number"
                controlName="landline"
                control={control}
                errMesg="This field is required"
                type="numeric"
                defaultValue={editData?.landline ? editData?.landline : ''}
              />
              <InpCtrl
                label="Email"
                placeholderText="Enter email"
                rules={{ pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, required: false }}
                controlName="email"
                control={control}
                errMesg="This field is required"
                type="email-address"
                defaultValue={editData?.email ? editData?.email : ''}
              />
              <InpCtrl
                label="Website"
                placeholderText="Enter website"
                controlName="website"
                control={control}
                errMesg="This field is required"
                type="url"
                defaultValue={editData?.website ? editData?.website : ''}
              />
            </React.Fragment>
          )}
          {(currentForm == 2 || currentFormMode == 'EDIT') && (
            <React.Fragment>
              <View style={[inpMain]}>
                <Text style={inpText}>Available Pets</Text>
                <View style={{}}>
                  <MultiSelect
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    containerStyle={{ borderRadius: 7 }}
                    // inputSearchStyle={styles.inputSearchStyle}
                    // iconStyle={styles.iconStyle}
                    search
                    data={petListData}
                    labelField="name"
                    valueField="name"
                    placeholder={
                      availablePetsArr.length !== 0
                        ? availablePetsArr.join(', ')
                        : 'Select'
                    }
                    searchPlaceholder="Search..."
                    value={availablePetsArr}
                    onChange={(item, i) => {
                      handlePetsChange(item);
                    }}
                    renderItem={(item, selected) => {
                      return (
                        <View
                          key={item.uuid}
                          style={[styles.selectAvailableMain]}>
                          <CheckboxIcon active={selected} />
                          {item?.image_url && (
                            <Image
                              style={{ height: 20, width: 20 }}
                              source={{ uri: item?.image_url }}
                            />
                          )}
                          <Text style={[styles.availableText]}>
                            {item.name}
                          </Text>
                        </View>
                      );
                    }}
                    selectedStyle={styles.selectedStyle}
                    showSelectedItems={false}
                  />
                  {validationErrorPets ? (
                    <Text style={styles.errorText}>{validationErrorPets}</Text>
                  ) : null}
                </View>
              </View>

              <View style={[inpMain]}>
                <Text style={inpText}>Service Offered</Text>
                <View style={{}}>
                  <MultiSelect
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    containerStyle={{ borderRadius: 7 }}
                    search
                    data={productListData}
                    labelField="name"
                    valueField="name"
                    placeholder={
                      availableProductsArr.length !== 0
                        ? availableProductsArr.join(', ')
                        : 'Select'
                    }
                    searchPlaceholder="Search..."
                    value={availableProductsArr}
                    onChange={(item, i) => {
                      handleProductsChange(item);
                    }}
                    renderItem={(item, selected) => {
                      return (
                        <View
                          key={item.uuid}
                          style={[styles.selectAvailableMain]}>
                          <CheckboxIcon active={selected} />
                          {item?.image_url && (
                            <Image
                              style={{ height: 20, width: 20 }}
                              source={{ uri: item?.image_url }}
                            />
                          )}
                          <Text style={[styles.availableText]}>
                            {item.name}
                          </Text>
                        </View>
                      );
                    }}

                    selectedStyle={styles.selectedStyle}
                  />
                  {validationErrorProducts ? (
                    <Text style={styles.errorText}>{validationErrorProducts}</Text>
                  ) : null}
                </View>
              </View>
              {/* Opening Days  */}
              <View style={[inpMain]}>
                <Text style={inpText}>Opening Days</Text>
                <React.Fragment>
                  {openingDay.map((itemMain, index) => {
                    return (
                      <React.Fragment key={index + itemMain.open}>
                        <View
                          style={[
                            index >= 1 && {
                              borderTopColor: 'rgba(0, 0, 0, 0.1)',
                              borderTopWidth: 1,
                              paddingTop: 10,
                            },
                            {
                              ...flexCenter,
                              marginBottom: 3,
                              justifyContent: 'space-between',
                            },
                          ]}>
                          <Text
                            style={[
                              inpText,
                              { color: 'rgba(0, 0, 0, 0.5)', fontSize: f12 },
                            ]}>
                            Select Opening days
                          </Text>
                          <TouchableOpacity
                            onPress={() => removeOpeningArr(index)}>
                            <DeleteIconGray />
                          </TouchableOpacity>
                        </View>
                        <View style={[styles.daysView]}>
                          {itemMain?.daysList.map((item, i) => {
                            const { active, label } = item;
                            return (
                              <TouchableOpacity
                                key={i + index + item.label + 'days' + itemMain.open}
                                onPress={() => updateSingleDay(index, i)}>
                                <Text
                                  key={i + label}
                                  style={[
                                    styles.days,
                                    {
                                      backgroundColor: active
                                        ? 'rgba(7, 164, 222, 1)'
                                        : 'rgba(236, 242, 245, 1)',
                                      color: active
                                        ? '#FFFFFF'
                                        : 'rgba(0, 0, 0, 0.5)',
                                    },
                                  ]}>
                                  {item.label}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                        <TouchableOpacity
                          onPress={() => selectAllDays(index)}
                          style={[styles.allDays]}>
                          <CheckboxIcon active={itemMain.selectAllDaysActive} />
                          <Text
                            style={[
                              inpText,
                              { color: 'rgba(0, 0, 0, 0.5)', fontSize: f12 },
                            ]}>
                            Select all days
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.singleRowInps}>
                          <View style={[inpMain, { flex: 1 }]}>
                            <Text style={[inpText]}>Opening at</Text>
                            <Pressable
                              style={{ position: 'relative' }}
                              onPress={() => {
                                setOpenTimeModal(true);
                                setCurrentTimeRes(itemMain.open);
                                setCurrentTimeset({
                                  currentIndex: index,
                                  type: 'open',
                                });
                              }}>
                              <Text style={[inp, { paddingVertical: 10 }]}>
                                {itemMain.open}
                              </Text>

                              <View
                                style={{
                                  position: 'absolute',
                                  right: 10,
                                  top: '35%',
                                }}>
                                <TimeClock />
                              </View>
                            </Pressable>
                            {/* <TextInput  editable = {false} style={[inp]} placeholder="00.00" onTouchEndCapture={()=>setOpenTimeModal(true)}/> */}
                          </View>
                          <View style={[inpMain, { flex: 1 }]}>
                            <Text style={[inpText]}>Closing at</Text>
                            <Pressable
                              onPress={() => {
                                setOpenTimeModal(true);
                                setCurrentTimeRes(itemMain.close);
                                setCurrentTimeset({
                                  currentIndex: index,
                                  type: 'close',
                                });
                              }}>
                              <Text style={[inp, { paddingVertical: 10 }]}>
                                {itemMain.close}
                              </Text>
                              <View
                                style={{
                                  position: 'absolute',
                                  right: 10,
                                  top: '35%',
                                }}>
                                <TimeClock />
                              </View>
                            </Pressable>
                            {/* <TextInput style={[inp]} placeholder="00.00" /> */}
                          </View>
                        </View>
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>

                <TouchableOpacity
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    flexDirection: 'row',
                  }}
                  onPress={() => addOpeningDaysArr()}>
                  <AddIconPlus />
                  <Text style={[styles.addMoreBtn]}>Add More</Text>
                </TouchableOpacity>
              </View>

              <View style={[inpMain]}>
                <Text style={[inpText]}>Shop Description</Text>
                <TextInput
                  onChangeText={e => setDescText(e)}
                  style={[
                    inp,
                    {
                      flex: 1,
                      textAlignVertical: 'top',
                      justifyContent: 'flex-start',
                      backgroundColor: 'white',
                    },
                  ]}
                  placeholder="Enter description"
                  multiline={true}
                  numberOfLines={4}
                  value={descText}
                />
              </View>

              <React.Fragment>
                <Text style={[styles.inpText]}>Add Photos</Text>

                <View style={[styles.addImagesContainer]}>
                  <TouchableOpacity
                    style={[styles.addImagesMain]}
                    onPress={() => setCameraPermission(!cameraPermission)}>
                    <AddImagesIcon />
                  </TouchableOpacity>

                  {payLoadPetImages?.map((item, i) => {
                    return (
                      <TouchableOpacity onPress={() => handle3DImage(item?.uri)} key={i} style={[styles.addImagesMain]}>
                        <Image
                          height={'100%'}
                          width={'100%'}
                          source={{ uri: item?.uri }}
                        />
                        <TouchableOpacity
                          onPress={() => removeImg(i)}
                          style={styles.removeImg}>
                          <RemoveIconBg fillColor={'#C5C1C1'} color={'red'} />
                        </TouchableOpacity>
                      </TouchableOpacity>

                    );
                  })}
                </View>
              </React.Fragment>


            </React.Fragment>

          )}
          {/* Modal Popup */}

          <Modal
            animationType="slide" // Options: 'slide', 'fade', 'none'
            transparent={true} // Makes the background transparent
            visible={showPopup}
            onRequestClose={() => setShowPopup(!showPopup)} // Android-specific close event
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.modalText} onPress={() => setShowPopup(!showPopup)}><Text>Close!</Text></TouchableOpacity>
                {/* <Image
                  height={'80%'}
                  width={'100%'}
                  source={{ uri:imageUrl }}
                /> */}
                
                {/* <PanoramaView
      style={styles.viewer}
      dimensions={{ height: 230, width: Dimensions.get("window").width }}
      inputType="mono"
      imageUrl="https://raw.githubusercontent.com/googlevr/gvr-android-sdk/master/assets/panoramas/testRoom1_2kMono.jpg"
    /> */}

              </View>
            </View>
          </Modal>
          {(currentForm == 3 || currentFormMode == 'EDIT') && (
            <React.Fragment>
              <View style={{ paddingVertical: 10 }}>
                {docData.map((docItem, i) => {
                  return (
                    <React.Fragment key={i + docItem.label}>
                      <LicenseVerifier docItem={docItem} removeItem={() => removeDocument(i)} />
                    </React.Fragment>
                  );
                })}
              </View>
            </React.Fragment>
          )}

          <ChooseTimeModal
            isActive={openTimeModal}
            defaultTime={currentTimeRes}
            closeModal={data => {
              setOpenTimeModal(false);
              updateTimeFuc(data);
            }}
          />
        </View>
      </ScrollView>
      {currentFormMode == 'EDIT' ? (
        <>
          <TouchableOpacity style={{ width: '85%', marginHorizontal: 'auto', marginBottom: 10 }} onPress={() => handleFormSubmit()}>
            <Text style={[styles.submitBtn]}>Save Changes</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={{ width: '85%', marginHorizontal: 'auto', marginBottom: 10 }}>
          {currentForm !== 3 ? (
            <TouchableOpacity onPress={() => nextBtn()}>
              <Text style={[styles.submitBtn]}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleFormSubmit()}>
              <Text style={[styles.submitBtn]}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <CameraAndFile
        toShow={cameraPermission}
        outsideClick={() => setCameraPermission(false)}
        dataResult={e => setImages(e)}
      />
      {showMaps && <GetCoordsMapView
        toShowMaps={showMaps}
        hideMaps={() => setShowMaps(false)}
        toSendCoords={e => getCoordsFromMap(e)}
      />}
    </>
  );
}

const styles = StyleSheet.create({
  inpMain: {
    marginBottom: 20,
  },
  inpText: {
    fontSize: f12,
    fontFamily: primaryFontMedium,
    color: '#000000',
    paddingBottom: 5,
  },
  inp: {
    ...inputStyle(),
  },
  seperatorText: {
    fontFamily: primaryFontSemiBold,
    color: '#222222',
    fontSize: f16,
    marginBottom: 20,
    marginTop: 5,
  },
  singleRowInps: { display: 'flex', flexDirection: 'row', gap: 20 },
  dropdown: {
    margin: 0,
    height: 'auto',
    width: '100%',
    borderWidth: 1,
    borderColor: 'transparent',
    fontFamily: primaryFontMedium,
    borderRadius: 20,
    fontFamily: primaryFontMedium,
    paddingHorizontal: 10,
    color: defaultColor,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        backgroundColor: 'white',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
      },
    }),
  },
  selectedTextStyle: {
    color: '#000',
  },
  errorText: {
    color: 'red'
  },
  daysView: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        borderRadius: 8,
        shadowColor: 'rgba',
        shadowOffset: { width: 0, height: 3 },
        backgroundColor: 'white',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
      },
    }),
  },
  days: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    // color: 'rgba(0, 0, 0, 0.5)',
    // backgroundColor:"rgba(236, 242, 245, 1)",
    borderRadius: 7,
  },
  allDays: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexDirection: 'row',
    marginVertical: 10,
  },
  addMoreBtn: {
    fontFamily: primaryFontLight,
    color: 'rgba(7, 164, 222, 1)',
    fontSize: f12,
  },
  selectAvailableMain: {
    ...flexCenter,
    gap: 10,
    justifyContent: 'flex-start',
    marginHorizontal: 10,
    padding: 4,
  },
  availableText: {
    fontSize: f14,
    fontFamily: primaryFontMedium,
    color: '#222222',
  },
  placeholderStyle: {
    fontSize: f14,
    fontFamily: primaryFontMedium,
    color: '#222222',
  },
  submitBtn: {
    ...btnPrimary,
    marginTop: '0%',
  },
  addImagesContainer: {
    ...flexCenter,
    justifyContent: 'flex-start',
    gap: 10,
    // height:"auto"
    flexWrap: 'wrap',
  },
  addImagesMain: {
    height: WIDTH / (WIDTH < 380 ? 4 : 5),
    width: WIDTH / (WIDTH < 380 ? 4 : 5),
    backgroundColor: 'transparent',
    ...flexCenter,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(7, 164, 222, 1)',
    borderStyle: 'dashed',
    position: 'relative',
  },
  removeImg: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  viewer: {
    height: 230
  }
});


