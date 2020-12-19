import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  none: { height: 8, backgroundColor: Colors.orange400 },
});

const NoneElement = () => <View style={styles.none}></View>;

export default React.memo(NoneElement);
