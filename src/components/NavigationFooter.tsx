import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, Colors } from 'react-native-paper';
import { PaginationData } from '../api/scrapers/pagination';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Pagination from './Pagination';

interface NFButtonProps {
  iconName: string;
  onPress: () => void;
}

interface Props {
  ref: FlatList;
  pagination: PaginationData;
  onPageChange: (start: number) => void;
}

const NFButton = ({ iconName, onPress }: NFButtonProps) => {
  return (
    <Button
      mode="outlined"
      color={Colors.green700}
      contentStyle={{ flex: 1 }}
      onPress={onPress}>
      <Icon name={iconName} size={20} color={Colors.green700} />
    </Button>
  );
};

const NavigationFooter = ({ ref, pagination, onPageChange }: Props) => {
  const { current, max } = pagination;
  const navigation = useNavigation();

  const navigateToHome = useCallback(() => navigation.navigate('Home'), [
    navigation,
  ]);
  const moveToTop = useCallback(
    () => ref.scrollToOffset({ animated: true, offset: 0 }),
    [ref],
  );

  return (
    <View>
      {/* display pagination */}
      <Pagination current={current} max={max} onPageChange={onPageChange} />

      {/* display home & go to top shortcuts */}
      <View style={styles.footerNav}>
        <NFButton iconName="home" onPress={navigateToHome} />
        <NFButton iconName="arrow-upward" onPress={moveToTop} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerNav: {
    flexDirection: 'row',
    marginBottom: 8,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NavigationFooter;
