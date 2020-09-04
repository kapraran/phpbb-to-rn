import React from 'react';
import { PostData } from '../api/scrapers/viewtopic';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text, Colors } from 'react-native-paper';
import RenderHtml from './RenderHtml';

interface Props {
  post: PostData;
}

const PostCard = (props: Props) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <IconButton
        icon={
          props.post.user.avatarUrl !== null
            ? { uri: props.post.user.avatarUrl }
            : {}
        }
        size={32}
      />
      <Text>{props.post.user.username}</Text>
    </View>
    <View>
      <RenderHtml html={props.post.content} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey300,
  },
  content: {
    padding: 16,
  },
});

export default PostCard;
