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
  },

  title: {
    fontSize: 32,
    fontFamily: 'barlow600',
  },

  todosContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },

  newTodoContainer: {
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 2,
    paddingBottom: 16,
  },

  newTodoInput: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 32,
    fontSize: 20,
    fontFamily: 'barlow500',
  },

  newTodoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default styles;
