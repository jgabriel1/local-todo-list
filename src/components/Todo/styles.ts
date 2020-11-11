import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: 84,

    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 2,

    margin: 0,
  },

  swipeableContainer: {
    width: '100%',
  },

  deleteSwipeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#ff4242',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 2,
  },

  todoText: {
    flex: 1,
    fontSize: 20,
    paddingHorizontal: 24,
    paddingVertical: 16,
    fontFamily: 'barlow500',
  },

  checkboxContainer: {
    margin: 0,
    width: 76,
    height: '100%',
    minHeight: 84,
    borderRightColor: '#e5e5e5',
    borderRightWidth: 2,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
