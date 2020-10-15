import React from 'react';
import { PostData } from '../api/scrapers/viewtopic';
import { View, StyleSheet } from 'react-native';
import { Text, Colors, Avatar } from 'react-native-paper';
import RenderHtml from './RenderHtml';
import PostAvatar from './PostAvatar';

interface Props {
  post: PostData;
}

const containerStyles = (unread: boolean) =>
  StyleSheet.create({
    container: {
      elevation: 2,
      marginHorizontal: 8,
      marginVertical: 6,
      borderRadius: 4,
      backgroundColor: unread ? Colors.yellow100 : Colors.white,
    },
  }).container;

const PostCard = ({ post }: Props) => (
  <View style={containerStyles(post.hasUnreadAnchor)}>
    <View style={styles.header}>
      <PostAvatar size={32} uri={post.user.avatarUrl} />
      <Text style={styles.username}>{post.user.username}</Text>
    </View>
    <View>
      <RenderHtml html={post.content} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey100,
  },
  username: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 16,
  },
});

export default PostCard;
