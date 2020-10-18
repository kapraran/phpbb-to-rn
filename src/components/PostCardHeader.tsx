import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Text } from 'react-native-paper';
import PostAvatar from './PostAvatar';

interface Props {
  username: string;
  avatarUrl: string | null;
}

const PostCardHeader = ({ username, avatarUrl }: Props) => (
  <View style={styles.header}>
    <PostAvatar size={32} uri={avatarUrl} />
    <Text style={styles.username}>{username}</Text>
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
});

export default React.memo(PostCardHeader);
