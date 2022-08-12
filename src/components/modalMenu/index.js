import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Alert, Linking,
} from 'react-native';
import { Avatar, Overlay } from 'react-native-elements';

import styles from './index.styles';

export default function ModalMenu({ visible, toggleOverlay, city }) {
  const URL = 'https://github.com/brayamcoy';

  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(URL);

    if (supported) {
      await Linking.openURL(URL);
    } else {
      Alert.alert(`Don't know how to open this URL: ${URL}`);
    }
  }, [URL]);

  return (
    <View>
      <Overlay
        overlayStyle={styles.container}
        isVisible={visible}
        onBackdropPress={() => toggleOverlay('bottom')}
      >
        <View>
          <Text style={styles.text}>
            {city.current.feelslike_c}
            {' '}
            °C
          </Text>
          <Text style={styles.text}>
            {city.current.feelslike_f}
            {' '}
            Farenheit
          </Text>
          <Text style={styles.text}>
            {city.current.vis_km}
            {' '}
            Vis Km
          </Text>
          <Text style={styles.text}>
            {city.current.vis_miles}
            {' '}
            Vis Miles
          </Text>
          <Text style={styles.text}>
            {city.current.uv}
            {' '}
            UV
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Avatar
            size={64}
            onPress={handlePress}
            on
            rounded
            icon={{ name: 'logo-github', type: 'ionicon' }}
            containerStyle={{ backgroundColor: '#444' }}
          />
          <Text style={{ fontSize: 16, marginTop: 20 }}>Created by:</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Brayan Coy</Text>
        </View>
      </Overlay>
    </View>
  );
}

ModalMenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggleOverlay: PropTypes.func.isRequired,
  city: PropTypes.objectOf(PropTypes.any).isRequired,
};
