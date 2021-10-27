/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import {
  Icon, Input, Overlay,
} from 'react-native-elements';

// Styles
import styles from './index.styles';

const ModalSearch = ({
  visible, toggleOverlay, handleSearchCity, handleSetCity, search, setSearch,
}) => (
  <View>
    <Overlay overlayStyle={styles.container} isVisible={visible} onBackdropPress={() => toggleOverlay('top')}>
      <Input
        placeholder="Write any city"
        onChangeText={val => handleSearchCity(val, setSearch, true)}
        leftIcon={(
          <Icon
            name="search"
            size={24}
            color="#666"
          />
        )}
      />
      {search.length > 0 && search.map((city, index) => (
        <Text
          key={index}
          style={styles.results}
          onPress={() => {
            handleSetCity(city.name);
            toggleOverlay('top');
          }}
        >
          {city.name}
        </Text>
      ))}
    </Overlay>
  </View>
);

ModalSearch.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggleOverlay: PropTypes.func.isRequired,
  handleSetCity: PropTypes.func.isRequired,
  search: PropTypes.arrayOf(PropTypes.any).isRequired,
  setSearch: PropTypes.func.isRequired,
  handleSearchCity: PropTypes.func.isRequired,
};

export default ModalSearch;
