import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Text, TouchableRipple, withTheme } from 'react-native-paper';
import { PostUserData } from '../api/scrapers/viewtopic';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DateTime } from 'luxon';
import PostAvatar from './PostAvatar';

interface Props {
  theme: ReactNativePaper.Theme;
  user: PostUserData;
  date: Date;
}

const timeAgo = (date: Date) =>
  DateTime.fromJSDate(date).setLocale('el').toRelativeCalendar();

const PostCardHeader: React.FC<Props> = ({ user, date, theme }) => {
  const styled = useMemo(() => styles(theme.dark), [theme]);

  return (
    <View style={styled.header}>
      <View style={styled.row}>
        <PostAvatar size={32} uri={user.avatarUrl} />

        <View style={styled.col}>
          <Text style={styled.username}>{user.username}</Text>
          <Text style={styled.date}>{timeAgo(date)}</Text>
        </View>
      </View>

      <TouchableRipple onPress={() => {}}>
        <Icon
          name="format-quote-close"
          size={32}
          color={theme.colors.primary}
        />
      </TouchableRipple>
    </View>
  );
};

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
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    username: {
      fontSize: 16,
      fontWeight: '500',
    },
    date: {
      fontSize: 12,
      color: Colors.grey600,
    },
    col: {
      flexDirection: 'column',
      marginLeft: 8,
    },
  });

export default React.memo(withTheme(PostCardHeader));
