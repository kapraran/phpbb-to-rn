import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton, Title } from 'react-native-paper';

interface Props {
  current: number;
  max: number;
  onPageChange: (start: number) => void;
}

const Pagination = ({ current, max, onPageChange }: Props) => {
  const onPressPrev = () => {
    if (current <= 1) return;
    onPageChange((current - 2) * 25);
  };

  const onPressNext = () => {
    if (current >= max) return;
    onPageChange(current * 25);
  };

  return (
    <View style={styles.container}>
      <IconButton icon="chevron-left" onPress={onPressPrev}></IconButton>

      <View>
        <Title>
          {current} / {max}
        </Title>
      </View>

      <IconButton icon="chevron-right" onPress={onPressNext}></IconButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 16,
  },
});

export default Pagination;
