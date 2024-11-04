import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { flexCenter, primaryFontSemiBold } from '../styles/appStyles';
import { defBgColor } from '../styles/theme';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

export default function LoaderCircle(props) {
  const { visible, color, size, textContent, dogAnimate, bgColor, textColor } = props;

  const [isLoaderActive, setLoaderActive] = useState(false);
  const [cusTextColor, setCustomTextColor] = useState('');
  const [cusBg, setCusbg] = useState('')

  useEffect(() => {
    if (bgColor) {
      setCusbg(bgColor)
    }
    if (textColor) {
      setCustomTextColor(textColor)
    }

  }, [bgColor, textColor]);

  useEffect(() => {
    setLoaderActive(visible)
    if (!visible) {
      setTimeout(() => {
        setLoaderActive(visible)
      }, 300);
    }
  }, [visible])


  return (
    isLoaderActive && (
      <>
        <View style={[styles.loaderContainer, { backgroundColor: dogAnimate ? "rgba(0,0,0,0.6)" : cusBg ? cusBg : defBgColor, }]}>
          {dogAnimate ?
            <Image style={{ height: 50, width: "auto", aspectRatio: 2, transform: [{ scaleX: -1 }] }} source={require('../assets/gif/loader-animation.gif')} /> :
            <ActivityIndicator size={size ? size : "small"} color={color ? color : '#07A4DE'} />
          }
          {textContent && <Text style={[styles.text, { color: cusTextColor ? cusTextColor : '#fff' }]}>{textContent}</Text>}
        </View>
        <View>
        </View>
      </>
    )
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    position: "absolute",
    height: HEIGHT,
    width: WIDTH,
    ...flexCenter,
    flexDirection: "column",

    left: "0%",
    right: 0,
    zIndex: 99999999,
  },
  text: {
    fontFamily: primaryFontSemiBold,
    paddingVertical: 10
  }
})