import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton, Text, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { POSTS_PER_PAGE } from '../utils/constants';

interface Props {
  current: number;
  max: number;
  onPageChange: (start: number) => void;
}

const Pagination: React.FC<Props> = ({ current, max, onPageChange }) => {
  const onPressFirst = () => {
    if (current == 1) return;
    onPageChange(0);
  };

  const onPressLast = () => {
    if (current == max) return;
    onPageChange((max - 1) * POSTS_PER_PAGE);
  };

  const onPressPrev = () => {
    if (current <= 1) return;
    onPageChange((current - 2) * POSTS_PER_PAGE);
  };

  const onPressNext = () => {
    if (current >= max) return;
    onPageChange(current * POSTS_PER_PAGE);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <Button
          compact={true}
          mode="contained"
          onPress={onPressFirst}
          style={{ marginRight: 4 }}>
          <Icon name="arrow-collapse-left" size={20} color={Colors.white} />
        </Button>
        <Button compact={true} mode="contained" onPress={onPressPrev}>
          <Icon name="arrow-left" size={20} color={Colors.white} />
        </Button>
      </View>

      <View>
        <Text>
          {current} από {max}
        </Text>
      </View>

      <View style={styles.buttonGroup}>
        <Button
          compact={true}
          mode="contained"
          onPress={onPressNext}
          style={{ marginRight: 4 }}>
          <Icon name="arrow-right" size={20} color={Colors.white} />
        </Button>
        <Button compact={true} mode="contained" onPress={onPressLast}>
          <Icon name="arrow-collapse-right" size={20} color={Colors.white} />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
});

export default Pagination;
