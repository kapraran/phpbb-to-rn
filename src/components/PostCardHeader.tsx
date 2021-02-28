import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Text, withTheme } from 'react-native-paper';
import { PostUserData } from '../api/scrapers/viewtopic';
import { DateTime } from 'luxon';
import PostAvatar from './PostAvatar';

interface Props {
  theme: ReactNativePaper.Theme;
  user: PostUserData;
  date: Date;
}

const timeAgo = (date: Date) =>
  DateTime.fromJSDate(date).setLocale('el').toRelativeCalendar();

const PostCardHeader: React.FC<Props> = ({ user, date, theme }) => (
  <View style={styles(theme.dark).header}>
    <View style={styles(theme.dark).userContainer}>
      <PostAvatar size={32} uri={user.avatarUrl} />
      <Text style={styles(theme.dark).username}>{user.username}</Text>
    </View>

    <Text style={styles(theme.dark).date}>{timeAgo(date)}</Text>
  </View>
);

const styles = (dark: boolean) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: dark ? Colors.grey800 : Colors.grey100,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    username: {
      marginLeft: 8,
      fontSize: 16,
      fontWeight: '500',
    },
    date: {
      fontSize: 12,
      color: Colors.grey600,
    },
  });

export default React.memo(withTheme(PostCardHeader));
