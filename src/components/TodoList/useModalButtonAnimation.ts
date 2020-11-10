import { useCallback, useMemo } from 'react';
import Animated, { EasingNode, useValue } from 'react-native-reanimated';

export default function useModalButtonAnimation(showNewTodoInput: boolean) {
  const rotationAngle = useValue(0);

  const startAnimation = useCallback(() => {
    Animated.timing(rotationAngle, {
      toValue: showNewTodoInput ? Math.PI * (3 / 4) : 0,
      duration: 750,
      easing: EasingNode.bounce,
    }).start();
  }, [rotationAngle, showNewTodoInput]);

  const style = useMemo(() => {
    const transform = [{ rotate: rotationAngle }];

    return {
      transform,
    };
  }, [rotationAngle]);

  return {
    style,
    startAnimation,
  };
}
