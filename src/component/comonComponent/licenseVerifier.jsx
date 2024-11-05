import { Linking, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Collapse from './collapse';
import { pick, pickDirectory } from 'react-native-document-picker';
import { useDispatch } from 'react-redux';
// import { uploadFileFetch } from '../../service/asyncUpdates/uploadFile';
import { useState } from 'react';
import { defaultColor,
  f12,
  f14,
  flexCenter,
  primaryFontMedium,
  shadowStyle,} from '../../styles/appStyles';
import DocumentIcon from '../../assets/images/documentIcon';
import DocumentVerifyIcon from '../../assets/images/documentVerifyIcon';
import DocumentUploadIcon from '../../assets/images/documentUplod';
import Progress from './progress';
import CloseBtnIcon from '../../assets/images/closebtnIcon';

export default LicenseVerfier = props => {
  const { docItem, fileRes, currType, removeItem } = props;
  const dispatch = useDispatch();
  const [progressStep, setProgressStep] = useState(0);

  const docPickerClicked = async () => {
    

  try {
    const data = await pick({});
    if (data && data[0]) {
      fileUploadAPI(data[0]);
    }
    console.log("Data picked");
  } catch (err) {
    console.error("File pick error:", err);
  }
  };

  function fileUploadAPI(res) {
    setProgressStep(40)
    const file = new FormData();
    const { name, type, uri } = res;

    const payLoad = {
      name,
      type,
      uri,
    };

    file.append('file', payLoad);
    file.append('file_type', docItem.label);
    // // dispatch(uploadFileFetch(file));
    setProgressStep(100)
  }

  return (
    <Collapse
      currType={currType}
      title={
        <View style={[styleDoc.headerRow]}>
          <View style={[styleDoc.leftHead]}>
            <DocumentIcon />
            <Text style={[styleDoc.leftTextHeader]}>{docItem.label}</Text>
          </View>
          {
            docItem?.file_name ?
              <TouchableOpacity style={[styleDoc.rightHeader]}>
                <Text style={[styleDoc.rightTextheader]}>Verified</Text>
                <DocumentVerifyIcon />
              </TouchableOpacity> :
              <Text style={[styleDoc.rightTextheader, { color: "red" }]}>Not Verified</Text>
          }

        </View>
      }>
      <View style={{}}>
        {
          !docItem?.file_name &&
          <TouchableOpacity
            style={[styleDoc.importFile]}
            onPress={() => docPickerClicked()}>
            <DocumentUploadIcon />
            <Text style={[styleDoc.leftTextHeader]}>Import Files</Text>
          </TouchableOpacity>
        }
        {
          docItem?.file_name &&
          <View style={[styleDoc.fileaddedMain]}>
            <View style={[styleDoc.fileName]}>
              <Text style={[styleDoc.fileNameText]}>{docItem?.file_name}{progressStep}</Text>
              {

                <TouchableOpacity onPress={() => removeItem()}>
                  <CloseBtnIcon />
                </TouchableOpacity>
              }
            </View>
            <Progress step={100} steps={100} />
          </View>
        }
      </View>
    </Collapse>
    // <Text>test</Text>
  );
};

const styleDoc = StyleSheet.create({
  docContainer: {
    paddingVertical: 10,
  },
  mainDoc: {
    backgroundColor: 'blue',
    ...shadowStyle,
    padding: '3%',
    marginVertical: 6,
  },
  headerRow: {
    ...flexCenter,
    justifyContent: 'space-between',
  },
  leftHead: {
    ...flexCenter,
    gap: 5,
  },
  leftTextHeader: {
    fontFamily: primaryFontMedium,
    fontSize: f14,
    color: '#07A4DE',
    marginLeft:10,
  },
  rightHeader: {
    ...flexCenter,
    gap: 5,
  },
  rightTextheader: {
    color: '#00B900',
    fontFamily: primaryFontMedium,
    fontSize: f12,
  },
  importFile: {
    ...flexCenter,
    flexDirection: 'column',
    paddingVertical: '5%',
  },
  fileaddedMain: {
    margin: 'auto',
    width: '85%',
    backgroundColor: 'rgba(7, 164, 222, 0.05)',
    padding: 10,
    borderRadius: 4,
    marginVertical: 10
  },
  fileName: {
    ...flexCenter,
    justifyContent: 'space-between',
  },
  fileNameText: {
    color : defaultColor
  },
});
