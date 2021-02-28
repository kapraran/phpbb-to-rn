import React from 'react';
import { PostData } from '../api/scrapers/viewtopic';
import { View, StyleSheet } from 'react-native';
import { Colors, withTheme } from 'react-native-paper';
import RenderHtml from './RenderHtml';
import PostCardHeader from './PostCardHeader';

interface Props {
  theme: ReactNativePaper.Theme;
  post: PostData;
}

const styles = (dark: boolean, isUnread: boolean) =>
  StyleSheet.create({
    container: {
      elevation: 2,
      marginHorizontal: 8,
      marginVertical: 6,
      borderRadius: 4,
      backgroundColor: dark ? '#212121': '#fff' // isUnread ? Colors.yellow100 : Colors.white,
    },
    content: {
      padding: 16,
    },
  });

const PostCard = ({ post, theme }: Props) => {
  const { user, date, content } = post;

  return (
    <View style={styles(theme.dark, post.hasUnreadAnchor).container}>
      <PostCardHeader user={user} date={date} />
      <View>
        <RenderHtml html={content} />
      </View>
    </View>
  );
};

export default React.memo(withTheme(PostCard));
