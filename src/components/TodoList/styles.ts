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
    borderBottomColor: '#efefef',
    borderBottomWidth: 2,
  },

  title: {
    fontSize: 32,
  },

  todosContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },

  newTodoContainer: {
    borderBottomColor: '#efefef',
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
    fontSize: 18,
  },

  newTodoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default styles;
