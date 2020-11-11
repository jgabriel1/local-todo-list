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
  progress: Animated.Value;
}

class TodoCheckbox extends React.Component<
  TodoCheckboxProps,
  TodoCheckboxState
> {
  constructor(props: TodoCheckboxProps) {
    super(props);

    const { value } = this.props;

    this.state = {
      progress: new Animated.Value(value ? 0.75 : 0.35),
    };
  }

  playAnimation = () => {
    const { progress } = this.state;
    const { value } = this.props;

    Animated.timing(progress, {
      toValue: value ? 0.35 : 0.75,
      duration: 500,
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
    const { progress } = this.state;

    return (
      <BorderlessButton
        onPress={this.toggleCheckbox}
        style={[styles.container, { padding: 0 }]}
      >
        <Lottie
          source={checkAnimation}
          style={{ height: 75, width: 75 }}
          resizeMode="contain"
          autoSize
          duration={2000}
          progress={progress}
        />
      </BorderlessButton>
    );
  }
}

export default TodoCheckbox;
