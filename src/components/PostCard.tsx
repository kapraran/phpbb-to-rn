import React from 'react';
import { PostData } from '../api/scrapers/viewtopic';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text, Colors } from 'react-native-paper';

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
      <Text>{props.post.content}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    elevation: 1,
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
