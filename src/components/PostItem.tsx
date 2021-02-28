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

const PostItem: React.FC<Props> = ({ index, item, pagination }) => (
  <View>
    {/* Display page number if first post */}
    {index == 0 ? (
      <List.Subheader>Σελίδα {pagination.current}</List.Subheader>
    ) : null}

    {/* Display post content */}
    <PostCard post={item} />
  </View>
);

export default React.memo(PostItem);
