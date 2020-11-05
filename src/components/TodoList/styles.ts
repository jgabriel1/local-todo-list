import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 30,
    justifyContent: 'center',
  },

  header: {
    height: 128,
    justifyContent: 'flex-end',
    marginBottom: 32,
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
    marginBottom: 32,
  },

  newTodoInput: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
});

export default styles;
