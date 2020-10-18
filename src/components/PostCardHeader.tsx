import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Text } from 'react-native-paper';
import { PostUserData } from '../api/scrapers/viewtopic';
import { DateTime } from 'luxon';
import PostAvatar from './PostAvatar';

interface Props {
  user: PostUserData;
  date: Date;
}

const timeAgo = (date: Date) =>
  DateTime.fromJSDate(date).setLocale('el').toRelativeCalendar();

const PostCardHeader = ({ user, date }: Props) => (
  <View style={styles.header}>
    <PostAvatar size={32} uri={user.avatarUrl} />
    <Text style={styles.username}>{user.username}</Text>
    <Text>{timeAgo(date)}</Text>
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
