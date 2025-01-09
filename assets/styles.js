import { StyleSheet } from 'react-native';

import theme from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    height: '100%'
  },
  appbar: {
    alignSelf: 'flex-start'
  },
  logoText: {
    alignSelf: 'center',
    marginBottom: 20,
    color: theme.colors.primary
  },
  textInput: {
    width: '90%',
    maxWidth: 450, 
    alignSelf: 'center',
    marginBottom: 10
  },
  button: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  dialog: {
    maxWidth: 450,
    width: '80%',
    alignSelf: 'center',
  },
  searchView:{
    backgroundColor: theme.colors.background,
  },
  searchbar:{
    margin: 10,
  },
  cardView:{
    backgroundColor: theme.colors.background,
  },
  chipView:{
    backgroundColor: theme.colors.background,
  },
  chip: {
    marginVertical: 10,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  background: {
    backgroundColor: theme.colors.background,
  },
  reminderCard: {
    margin: 10,
  }
});

export default styles;