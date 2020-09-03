import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton, Title } from 'react-native-paper';

interface Props {
  current: number;
  max: number;
}

const Pagination = (props: Props) => (
  <View style={styles.container}>
    <IconButton
      icon="chevron-left"
      onPress={() => console.log('Pressed left')}></IconButton>

    <View>
      <Title>
        {props.current} / {props.max}
      </Title>
    </View>

    <IconButton
      icon="chevron-right"
      onPress={() => console.log('Pressed right')}></IconButton>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Pagination;
