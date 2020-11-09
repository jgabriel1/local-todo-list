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
    flexDirection: 'row',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 2,
  },

  newTodoInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 32,
    fontSize: 20,
    fontFamily: 'barlow500',
  },

  newTodoButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default styles;
