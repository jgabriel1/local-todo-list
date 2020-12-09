import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  returnButton: {
    position: 'absolute',
    top: 44,
    left: 16,
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

  todosContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },

  newTodoContainer: {
    flexDirection: 'row',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 2,

    zIndex: -5,
    elevation: -5,
  },

  newTodoInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
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
