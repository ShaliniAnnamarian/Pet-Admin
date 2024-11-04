import { Dimensions, PixelRatio, Platform } from "react-native";
import { defaultColor } from "./theme";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const isSmallDevice = HEIGHT < 820;


// Font size responsive;

export const f10 = normalize(10);
export const f11 = normalize(11);
export const f12 = normalize(12);
export const f13 = normalize(13);
export const f14 = normalize(14);
export const f15 = normalize(15);
export const f16 = normalize(16);
export const f17 = normalize(16);
export const f18 = normalize(18);
export const f20 = normalize(20);
export const f22 = normalize(22);
export const f24 = normalize(24);
export const f25 = normalize(25);
export const f30 = normalize(30);
export const f34 = normalize(34);
export const f38 = normalize(38);

export function normalize(size) {
  // Use iPhone6 as base size which is 375 x 667
  const baseWidth = 375;
  const baseHeight = 667;

  const scaleWidth = WIDTH / baseWidth;
  const scaleHeight = HEIGHT / baseHeight;
  const scale = Math.min(scaleWidth, scaleHeight);
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
}


export function inputStyle(data) {
    return {
      borderRadius: 4,
      fontFamily: primaryFontMedium,
      paddingHorizontal: 10,
      color: defaultColor,
      ...shadowStyle,
      ...data,
      shadowColor: 'rgba(0,0,0,1)',
      shadowOpacity: 0.2,
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.1)"
    };
  }

  export const shadowStyle = {
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
      },
      android: {
        borderRadius: 8,
        shadowOffset: { width: 0, height:1 },
        backgroundColor: '#fff',
        shadowRadius: 5,
        elevation: 1,
      },
    }),
  };

  export const flexCenter = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };

  export const btnPrimary = {
    borderRadius: isSmallDevice ? 9 : 12,
    paddingVertical: isSmallDevice ? 9 : 12,
    fontSize: f18,
    textAlign: 'center',
    marginTop: '10%',
    backgroundColor: '#07A4DE',
    color: '#F5FCFF',
    fontFamily: primaryFontSemiBold,
  };

// font Families
export const primaryFontMedium = 'Lexend-Medium';
export const primaryFontSemiBold = 'Lexend-SemiBold';
export const primaryFontBold = 'Lexend-Bold';
export const primaryFontThin = 'Lexend-Thin';
export const primaryFontLight = 'Lexend-Light';
export const primaryFontRegular = 'Lexend-Regular';