import { StyleSheet } from 'react-native';

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

  catalogContainer: {},

  todoListItem: {},

  todoListItemName: {},

  todoListTodoText: {},

  todoListTodoIsCompleted: {},
});

export default styles;
