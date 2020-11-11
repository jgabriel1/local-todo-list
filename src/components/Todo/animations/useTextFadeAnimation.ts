import { useEffect } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function useTextFadeAnimation(isChecked: boolean) {
  const opacity = useSharedValue(isChecked ? 1 : 0.3);

  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration: 200,
        easing: Easing.ease,
      }),
    };
  });

  useEffect(() => {
    if (isChecked) {
      opacity.value = 0.3;
    } else {
      opacity.value = 1;
    }
  }, [isChecked, opacity.value]);

  return {
    style,
  };
}
