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
    paddingTop: 96,
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 40,
  },

  todoListItemContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },

  todoListItem: {
    borderWidth: 2,
    borderColor: '#e5e5e5',
    height: 320,
    width: SCREEN_WIDTH / 2 - 30,

    paddingVertical: 32,
    paddingHorizontal: 16,

    borderRadius: 20,
  },

  todoListItemName: {
    fontFamily: 'barlow600',
    fontSize: 24,
  },

  todoListItemTodosContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  todoListTodoText: {
    fontFamily: 'barlow500',
    fontSize: 20,
    marginBottom: 8,
  },

  todoListTodoIsCompleted: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },

  todoListItemTodosPlaceholder: {
    fontFamily: 'barlow500',
    fontSize: 15,
    color: '#a5a5a5',
  },
});

export default styles;
