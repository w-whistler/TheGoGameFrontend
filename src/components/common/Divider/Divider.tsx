import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Divider = () => {
  return <View style={[styles.dotDivider]} />;
};

const styles = StyleSheet.create({
  dotDivider: {
    height: 1,
    width: '100%',
    backgroundColor: '#DDDDDD',
  },
});
