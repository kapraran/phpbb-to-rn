import React from 'react';
import { PostData } from '../api/scrapers/viewtopic';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import RenderHtml from './RenderHtml';
import PostCardHeader from './PostCardHeader';

interface Props {
  post: PostData;
}

const styles = (isUnread: boolean) =>
  StyleSheet.create({
    container: {
      elevation: 2,
      marginHorizontal: 8,
      marginVertical: 6,
      borderRadius: 4,
      backgroundColor: isUnread ? Colors.yellow100 : Colors.white,
    },
    content: {
      padding: 16,
    },
  });

const PostCard = ({ post }: Props) => {
  const { user, date, content } = post;

  return (
    <View style={styles(post.hasUnreadAnchor).container}>
      <PostCardHeader user={user} date={date} />
      <View>
        <RenderHtml html={content} />
      </View>
    </View>
  );
};

export default React.memo(PostCard);
