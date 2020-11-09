import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: 84,

    borderBottomColor: '#efefef',
    borderBottomWidth: 2,

    margin: 0,
  },

  todoText: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },

  checkboxContainer: {
    margin: 0,
    width: 76,
    height: '100%',
    minHeight: 84,
    borderRightColor: '#efefef',
    borderRightWidth: 2,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
