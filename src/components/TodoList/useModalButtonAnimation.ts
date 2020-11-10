import { useCallback } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export default function useModalButtonAnimation() {
  const buttonRotationAngle = useSharedValue(0);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const rotate = withTiming(buttonRotationAngle.value, {
      duration: 800,
      easing: Easing.bounce,
    });

    const transform = [{ rotate }];

    return {
      transform,
    };
  });

  const triggerRotateAnimation = useCallback(() => {
    buttonRotationAngle.value =
      buttonRotationAngle.value === 0 ? Math.PI * (3 / 4) : 0;
  }, [buttonRotationAngle.value]);

  return {
    buttonAnimatedStyle,
    triggerRotateAnimation,
  };
}
