import { useCallback, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function useNavigateSlideAnimation(listOpen: boolean) {
  const marginLeft = useSharedValue(listOpen ? -SCREEN_WIDTH : 0);

  const [animationFinished, setAnimationFinished] = useState(false);

  const screenContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      marginLeft: withTiming(
        marginLeft.value,
        {
          duration: 250,
          easing: Easing.ease,
        },
        () => setAnimationFinished(true),
      ),
    };
  });

  const toggleSlideAnimation = useCallback(() => {
    setAnimationFinished(false);
  }, []);

  useEffect(() => {
    marginLeft.value = listOpen ? -SCREEN_WIDTH : 0;
  }, [listOpen, marginLeft]);

  return {
    animationFinished,
    toggleAnimation: toggleSlideAnimation,
    style: screenContainerAnimatedStyle,
  };
}
