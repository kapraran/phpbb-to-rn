import React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import { PaginationData } from '../api/scrapers/pagination';
import { PostData } from '../api/scrapers/viewtopic';
import PostCard from './PostCard';

interface Props {
  index: number;
  item: PostData;
  pagination: PaginationData;
}

const PostItem = ({ index, item, pagination }: Props) => (
  <View>
    {/* Display the number of page before the first post */}
    {index == 0 ? (
      <List.Subheader>Σελίδα {pagination.current}</List.Subheader>
    ) : null}
    <PostCard post={item} />
  </View>
);

export default React.memo(PostItem);
