import React, { useCallback, useState } from 'react';
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
    style: containerAnimatedStyle,
  } = useNavigateSlideAnimation(!!selectedList);

  const navigateToList = useCallback((id: number, name: string) => {
    setSelectedList({ id, name });
  }, []);

  const returnToCatalog = useCallback(() => {
    setSelectedList(null);
  }, []);

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      {selectedList && animationFinished && (
        <TodoList
          listId={selectedList.id}
          listName={selectedList.name}
          returnToCatalog={returnToCatalog}
        />
      )}
      {!selectedList && animationFinished && (
        <TodoListsCatalog navigateToList={navigateToList} />
      )}
    </Animated.View>
  );
};

export default Routes;
