import { useCallback, useMemo } from 'react';
import Animated, { EasingNode, useValue } from 'react-native-reanimated';

export default function useModalButtonAnimation(showNewTodoInput: boolean) {
  const buttonRotationAngle = useValue(0);

  const triggerRotateAnimation = useCallback(() => {
    Animated.timing(buttonRotationAngle, {
      toValue: showNewTodoInput ? 1 : 0,
      duration: 750,
      easing: EasingNode.bounce,
    }).start();
  }, [buttonRotationAngle, showNewTodoInput]);

  const buttonAnimatedStyle = useMemo(() => {
    const rotate = buttonRotationAngle.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Math.PI * (3 / 4)],
    });

    const transform = [{ rotate }];

    return {
      transform,
    };
  }, [buttonRotationAngle]);

  return {
    buttonAnimatedStyle,
    triggerRotateAnimation,
  };
}
