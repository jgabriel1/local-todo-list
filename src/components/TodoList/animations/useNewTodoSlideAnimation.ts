import { useCallback } from 'react';
import { Dimensions } from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const DEVICE_SCREEN_WIDTH = Dimensions.get('window').width;

export default function useNewTodoSlideAnimation() {
  const translation = useSharedValue(DEVICE_SCREEN_WIDTH);

  const style = useAnimatedStyle(() => {
    const marginRight = withTiming(translation.value, {
      duration: 500,
      easing: Easing.ease,
    });

    return {
      marginRight,
    };
  });

  const startAnimation = useCallback(() => {
    translation.value = 0;
  }, [translation.value]);

  return {
    style,
    startAnimation,
  };
}
