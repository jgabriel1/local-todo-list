import { useMemo, useCallback, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, { EasingNode, useValue } from 'react-native-reanimated';

const DEVICE_SCREEN_WIDTH = Dimensions.get('window').width;

export default function useNewTodoSlideAnimation(
  afterAnimationCallback: () => void,
) {
  const translation = useValue(DEVICE_SCREEN_WIDTH);
  const [isAnimationFinished, setIsAnimationFinished] = useState(true);

  const style = useMemo(() => {
    return { marginRight: translation };
  }, [translation]);

  const startAnimation = useCallback(() => {
    setIsAnimationFinished(false);
  }, []);

  useEffect(() => {
    if (isAnimationFinished) {
      afterAnimationCallback();
    } else {
      Animated.timing(translation, {
        toValue: 0,
        duration: 500,
        easing: EasingNode.quad,
      }).start(() => {
        setIsAnimationFinished(true);
      });
    }
  }, [afterAnimationCallback, isAnimationFinished, translation]);

  return {
    style,
    startAnimation,
  };
}
