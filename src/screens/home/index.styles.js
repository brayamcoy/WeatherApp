import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
  },
  buttonsContainer: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'transparent',
  },
  cityTitle: {
    color: 'white',
    fontSize: 32,
  },
  cityDate: {
    color: 'white',
    fontSize: 16,
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
  },
  detailWeather: {
    color: 'white',
    fontSize: 64,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  detailDay: {
    display: 'flex',
    flexDirection: 'row',
  },
  textDay: {
    marginLeft: 5,
    fontSize: 22,
    color: 'white',
  },
  detailFooter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default styles;
