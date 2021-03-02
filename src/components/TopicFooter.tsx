import React from 'react';
import { FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { PaginationData } from '../api/scrapers/pagination';
import NavigationFooter from './NavigationFooter';

type Props = {
  onPressReply: () => void;
  onPageChange: (start: number) => void;
  pagination: PaginationData;
  listRef: React.RefObject<FlatList<any>>;
};

const TopicFooter: React.FC<Props> = ({
  onPressReply,
  listRef,
  pagination,
  onPageChange,
}) => (
  <>
    <Button
      mode="contained"
      icon="plus"
      style={{ margin: 8, marginBottom: 0 }}
      onPress={onPressReply}>
      Απαντηση
    </Button>
    <NavigationFooter
      listRef={listRef.current}
      pagination={pagination}
      onPageChange={onPageChange}
    />
  </>
);

export default TopicFooter;
