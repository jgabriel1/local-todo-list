import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },

  screenContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});

export default styles;
