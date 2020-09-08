import React from 'react';
import { PostData } from '../api/scrapers/viewtopic';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text, Colors, Avatar } from 'react-native-paper';
import RenderHtml from './RenderHtml';

interface Props {
  post: PostData;
}

const PostCard = (props: Props) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Avatar.Icon size={32} icon="account" />
      <Text style={styles.username}>{props.post.user.username}</Text>
    </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey300,
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
