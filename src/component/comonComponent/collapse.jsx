import React, { useRef, useState } from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { toggleAnimation } from '../../utils/layoutAnimation';
import { shadowStyle } from '../../styles/appStyles';

const Collapse = ({ title, bodyContent, children, currType }) => {
  const [showContent, setShowContent] = useState(false);
  const animationControler = useRef(new Animated.Value(0)).current;

  const toggleClick = () => {
    // disable expanded behaviour
    if (currType !== 'view') {
      const config = {
        duration: 300,
        toValue: showContent ? 0 : 1,
        useNativeDriver: true,
      };
      Animated.timing(animationControler, config).start();
      LayoutAnimation.configureNext(toggleAnimation);
      setShowContent(prev => !prev);
    }
  };

  const arrowToggle = animationControler.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });
  return (
    <View style={styles.titleWrap}>
      <TouchableOpacity
        onPress={() => {
          toggleClick();
        }}>
        {title}
      </TouchableOpacity>
      {showContent && (
        <View style={styles.bodyContent}>
          {children}
        </View>
      )}
    </View>
  );
};

export default Collapse;

const styles = StyleSheet.create({
  collapseContainer: { overflow: 'hidden', marginVertical: 20 },
  title: { padding: 20, borderWidth: 1 },
  titleWrap: {
    backgroundColor: 'blue',
    ...shadowStyle,
    padding: '3%',
    marginVertical: 6,
    overflow: 'hidden',
  },
});
