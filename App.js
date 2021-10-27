import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Screens
import Home from './src/screens/home/index';

// Assets
import AppStyles from './App.styles';

export default function App() {
  return (
    <View style={AppStyles.container}>
      <StatusBar />
      <Home />
    </View>
  );
}
