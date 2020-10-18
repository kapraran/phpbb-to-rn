import React from 'react';
import { PostData } from '../api/scrapers/viewtopic';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import RenderHtml from './RenderHtml';
import PostCardHeader from './PostCardHeader';

interface Props {
  post: PostData;
}

const PostCard = (props: Props) => (
  <View style={styles.container}>
    <PostCardHeader
      username={props.post.user.username}
      avatarUrl={props.post.user.avatarUrl}
    />
    <View>
      <RenderHtml html={props.post.content} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    marginHorizontal: 8,
    marginVertical: 6,
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  content: {
    padding: 16,
  },
});

export default PostCard;
