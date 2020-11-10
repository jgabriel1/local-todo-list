import { useCallback } from 'react';
import { Platform } from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const NEW_TODO_INPUT_HEIGHT = Platform.OS === 'ios' ? 74 : 77.5;

export default function useInputDropAnimation(showNewTodoInput: boolean) {
  const hiddenMargin = useSharedValue(-NEW_TODO_INPUT_HEIGHT);

  const style = useAnimatedStyle(() => {
    const marginTop = withTiming(hiddenMargin.value, {
      duration: 750,
      easing: Easing.bounce,
    });

    return {
      marginTop,
    };
  });

  const startAnimation = useCallback(() => {
    hiddenMargin.value = showNewTodoInput ? 0 : -NEW_TODO_INPUT_HEIGHT;
  }, [hiddenMargin.value, showNewTodoInput]);

  return {
    style,
    startAnimation,
  };
}
