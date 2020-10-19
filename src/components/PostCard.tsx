import React from 'react';
import { PostData } from '../api/scrapers/viewtopic';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import RenderHtml from './RenderHtml';
import PostCardHeader from './PostCardHeader';

interface Props {
  post: PostData;
}

const PostCard = ({ post }: Props) => {
  const { user, date, content } = post;

  return (
    <View style={styles.container}>
      <PostCardHeader user={user} date={date} />
      <View>
        <RenderHtml html={content} />
      </View>
    </View>
  );
};

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
