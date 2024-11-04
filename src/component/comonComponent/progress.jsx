import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
// import  * as Animated from 'react-native-reanimated';

export default function Progress({ step, steps }) {
  const [width, setWidth] = useState(0);

  useEffect(()=>{

  },[])

  return (
    <View style={[styles.mainView]}
      onLayout={(e) => {
        setWidth(e.nativeEvent.layout.width)
      }}>
      <View style={[styles.progress,{width:`${step}%`}]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    height: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    borderRadius: 10,
    marginVertical: 10
  },
  progress: {
    height: 10,
    width: "80%",
    backgroundColor: "rgba(7, 164, 222, 1)",
    position: "absolute",
    left: 0,
    borderRadius: 10,
    top: 0,
  }
})
