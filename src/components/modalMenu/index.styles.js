import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 160,
    padding: 20,
    position: 'absolute',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#f9f7f7',
  },
  text: {
    fontSize: 18,
  },
});

export default styles;
