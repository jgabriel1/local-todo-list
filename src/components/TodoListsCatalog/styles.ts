import { Dimensions, StyleSheet } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  header: {
    paddingHorizontal: 32,
    paddingBottom: 32,
    paddingTop: 128,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 2,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 32,
    fontFamily: 'barlow600',
  },

  createListContainer: {
    flexDirection: 'row',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 2,

    zIndex: -5,
    elevation: -5,
  },

  createListInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 32,
    paddingRight: 0,
    fontSize: 20,
    fontFamily: 'barlow500',
  },

  createListButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  catalogContainer: {
    width: '100%',
  },

  todoListItemContainer: {
    backgroundColor: '#fff',
    minHeight: 96,
    paddingHorizontal: 24,
    paddingLeft: 32,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#e5e5e5',

    justifyContent: 'center',
  },

  todoListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  todoListItemName: {
    fontFamily: 'barlow600',
    fontSize: 24,
    margin: 0,
    padding: 0,
    alignItems: 'center',
  },

  completedContainer: {
    marginRight: 16,
    alignItems: 'center',
  },

  completedLabelText: {},

  completedValueText: {
    fontFamily: 'barlow500',
    fontSize: 20,
  },
});

export default styles;
