import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Overlay } from 'react-native-elements';

import styles from './index.styles';

export default function ModalMenu({ visible, toggleOverlay, city }) {
  return (
    <View>
      <Overlay
        overlayStyle={styles.container}
        isVisible={visible}
        onBackdropPress={() => toggleOverlay('bottom')}
      >
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
      </Overlay>
    </View>
  );
}

ModalMenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggleOverlay: PropTypes.func.isRequired,
  city: PropTypes.objectOf(PropTypes.any).isRequired,
};
