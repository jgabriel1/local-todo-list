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
  const [animationFinished, setAnimationFinished] = useState(true);
  const marginLeft = useSharedValue(listOpen ? SCREEN_WIDTH : 0);

  const screenContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      marginLeft: withTiming(
        marginLeft.value,
        {
          duration: 200,
          easing: Easing.linear,
        },
        () => setAnimationFinished(true),
      ),
    };
  });

  const toggleSlideAnimation = useCallback(() => {
    marginLeft.value = listOpen ? -SCREEN_WIDTH : 0;
  }, [listOpen, marginLeft]);

  useEffect(() => {
    if (!animationFinished) {
      setAnimationFinished(false);
    }
  }, [animationFinished, listOpen]);

  useEffect(() => {
    if (!animationFinished) {
      toggleSlideAnimation();
    }
  }, [animationFinished, toggleSlideAnimation]);

  return {
    animationFinished,
    style: screenContainerAnimatedStyle,
  };
}
