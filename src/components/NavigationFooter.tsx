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
  listRef: FlatList | null;
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

const styles = StyleSheet.create({
  footerNav: {
    flexDirection: 'row',
    marginBottom: 8,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const NavigationFooter = ({ listRef, pagination, onPageChange }: Props) => {
  const { current, max } = pagination;
  const navigation = useNavigation();

  const navigateToHome = useCallback(() => navigation.navigate('Home'), [
    navigation,
  ]);
  const moveToTop = useCallback(
    () =>
      listRef !== null
        ? listRef.scrollToOffset({ animated: true, offset: 0 })
        : null,
    [listRef],
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

export default NavigationFooter;
