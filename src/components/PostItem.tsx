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

class PostItem extends React.PureComponent<Props> {
  render() {
    const { index, item, pagination } = this.props;

    return (
      <View>
        {index == 0 ? (
          <List.Subheader>Σελίδα {pagination.current}</List.Subheader>
        ) : null}
        <PostCard post={item} />
      </View>
    );
  }
}

export default PostItem;
