import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import TodoList from '../TodoList';
import TodoListsCatalog from '../TodoListsCatalog';

import useNavigateSlideAnimation from './animations/useNavigateSlideAnimation';

import styles from './styles';

interface SelectedList {
  id: number;
  name: string;
}

const Routes: React.FC = () => {
  const [selectedList, setSelectedList] = useState<SelectedList | null>(null);

  const {
    animationFinished,
    toggleAnimation: toggleSlideAnimation,
    style: containerAnimatedStyle,
  } = useNavigateSlideAnimation(!!selectedList);

  const navigateToList = useCallback((id: number, name: string) => {
    setSelectedList({ id, name });
  }, []);

  const returnToCatalog = useCallback(async () => {
    toggleSlideAnimation();

    setSelectedList(null);
  }, [toggleSlideAnimation]);

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <View style={styles.screenContainer}>
        <TodoListsCatalog navigateToList={navigateToList} />
      </View>
      {selectedList && animationFinished ? (
        <View style={styles.screenContainer}>
          <TodoList
            listId={selectedList.id}
            listName={selectedList.name}
            returnToCatalog={returnToCatalog}
          />
        </View>
      ) : (
        <View style={styles.screenContainer} />
      )}
    </Animated.View>
  );
};

export default Routes;
