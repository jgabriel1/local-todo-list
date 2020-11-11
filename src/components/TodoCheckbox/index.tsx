import React from 'react';
import { Animated, Easing } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import Lottie from 'lottie-react-native';

import styles from './styles';

import checkAnimation from '../../assets/check.json';

interface TodoCheckboxProps {
  value: boolean;
  onToggle: () => void | Promise<void>;
}

interface TodoCheckboxState {
  animationProgress: Animated.Value;
}

class TodoCheckbox extends React.Component<
  TodoCheckboxProps,
  TodoCheckboxState
> {
  constructor(props: TodoCheckboxProps) {
    super(props);

    const { value } = this.props;

    this.state = {
      animationProgress: new Animated.Value(value ? 0.75 : 0.35),
    };
  }

  playAnimation = () => {
    const { animationProgress } = this.state;
    const { value } = this.props;

    const toValue = value ? 0.35 : 0.75;

    Animated.timing(animationProgress, {
      toValue,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  toggleCheckbox = () => {
    const { onToggle } = this.props;

    this.playAnimation();
    onToggle();
  };

  render() {
    const { animationProgress } = this.state;

    return (
      <BorderlessButton onPress={this.toggleCheckbox}>
        <Lottie
          source={checkAnimation}
          style={styles.icon}
          resizeMode="contain"
          autoSize
          progress={animationProgress}
        />
      </BorderlessButton>
    );
  }
}

export default TodoCheckbox;
