/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
/* eslint-disable quote-props */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import * as Location from 'expo-location';
import {
  View, Text, ImageBackground, Image,
} from 'react-native';
import {
  Button, Icon, Divider, LinearProgress,
} from 'react-native-elements';

// Assets
import styles from './index.styles';
import nightBg from '../../../assets/images/night.jpg';
import ModalSearch from '../../components/modalSearch';
import appConfig from '../../config';

function Home() {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [city, setCity] = useState(appConfig.defaultCity);
  const [backgrounds, setBackgrounds] = useState([]);
  const [search, setSearch] = useState([]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleRenderBackground = () => {
    const random = Math.floor(Math.random() * backgrounds.length);
    return backgrounds[random].src.portrait;
  };

  const geBackgroundsFromPexels = async () => {
    const options = {
      headers: {
        Authorization: appConfig.apiKeyPexels,
      },
    };
    await fetch('https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20', options)
      .then(resp => resp.status === 200 && resp.json())
      .then(myJson => myJson && setBackgrounds(myJson.photos))
      .catch(err => console.log(err));
  };

  const handleSearchCity = async (data, setFn, isSearch) => {
    const url = `https://api.weatherapi.com/v1/${!isSearch ? 'current.json' : 'search.json'}?key=${appConfig.apiKeyWeather}&q=${data}&aqi=no`;
    await fetch(url)
      .then(resp => resp.status === 200 && resp.json())
      .then(myJson => (!myJson ? setSearch([]) : setFn(myJson)))
      .catch(err => console.log(err));
  };

  const handleSetCity = nameOfCity => {
    handleSearchCity(nameOfCity, setCity, false);
    toggleOverlay();
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setError(true);
      return;
    }
    const locationFn = await Location.getCurrentPositionAsync({});
    const { coords: { latitude, longitude } } = locationFn;
    handleSearchCity(`${latitude},${longitude}`, setCity);
    setError(false);
  };

  useEffect(() => {
    geBackgroundsFromPexels();
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={!backgrounds.length ? nightBg : { uri: handleRenderBackground() }}
        style={styles.imageBackground}
      >
        <View style={styles.header}>
          <View style={styles.buttonsContainer}>
            <Button
              buttonStyle={styles.button}
              icon={
                <Icon name="search" size={30} color="white" type="ionicon" />
              }
              onPress={toggleOverlay}
            />
            <Button
              buttonStyle={styles.button}
              icon={<Icon name="menu" size={30} color="white" type="ionicon" />}
            />
          </View>
          <ModalSearch
            visible={visible}
            toggleOverlay={toggleOverlay}
            handleSearchCity={handleSearchCity}
            search={search}
            setSearch={setSearch}
            handleSetCity={handleSetCity}
          />
          <View>
            <Text style={styles.cityTitle}>
              {city.location.name}
              {' '}
              -
              {' '}
              {city.location.region}
            </Text>
            <Text style={styles.cityDate}>
              {moment(city.location.localtime).format('LLLL')}
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.detailContainer}>
            <Text style={styles.detailWeather}>
              {city.current.temp_c}
              °C
            </Text>
            <View style={styles.detailDay}>
              <Image
                source={{ uri: `https:${city.current.condition.icon}` }}
                style={{ width: 40 }}
              />
              <Text style={styles.textDay}>{city.current.condition.text}</Text>
            </View>
          </View>
          <Divider
            style={{
              backgroundColor: 'white',
              marginBottom: 15,
              marginTop: 15,
            }}
          />
          <View style={styles.infoContainer}>
            <View style={styles.detailFooter}>
              <Text style={styles.cityDate}>Wind</Text>
              <Text style={styles.cityTitle}>{city.current.wind_kph}</Text>
              <Text style={styles.cityDate}>km/h</Text>
              <LinearProgress color="primary" value={0.2} />
            </View>
            <View style={styles.detailFooter}>
              <Text style={styles.cityDate}>Rain</Text>
              <Text style={styles.cityTitle}>{city.current.precip_mm}</Text>
              <Text style={styles.cityDate}>%</Text>
              <LinearProgress color="primary" value={0.5} />
            </View>
            <View style={styles.detailFooter}>
              <Text style={styles.cityDate}>Humidity</Text>
              <Text style={styles.cityTitle}>{city.current.humidity}</Text>
              <Text style={styles.cityDate}>%</Text>
              <LinearProgress color="primary" value={1} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Home;
