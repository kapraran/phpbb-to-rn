import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView, View } from 'react-native';
import AppHeader from '../components/AppHeader';
import SpinnerView from '../components/SpinnerView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigator';
import Pagination from '../components/Pagination';
import { PostData } from '../api/scrapers/viewtopic';
import { getViewTopicPosts } from '../api/api';
import PostCard from '../components/PostCard';

type ViewTopicNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ViewTopic'
>;
type ViewTopicRouteProp = RouteProp<RootStackParamList, 'ViewTopic'>;

type Props = {
  navigation: ViewTopicNavigationProp;
  route: ViewTopicRouteProp;
};

const ViewTopic = ({ navigation, route }: Props) => {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (posts.length > 0) return;

      getViewTopicPosts(route.params.params, true).then(({ posts }) => {
        setPosts(posts);
      });
    });

    return unsubscribe;
  }, [navigation, route]);

  const renderItem = ({ item }: { item: PostData }) => <PostCard post={item} />;

  const renderHeader = () => (
    <AppHeader
      title={route.params.title}
      subtitle={route.params.forumName}
      showBack={true}
    />
  );

  const renderEmpty = () => <SpinnerView />;

  const renderFooter = () =>
    posts.length > 0 ? <Pagination current={1} max={2}></Pagination> : null;

  // TODO user post id or url params + index
  const createKey = (username: string, content: string, index: number) => {
    return `${username}:${index}:${content.substr(
      0,
      Math.min(8, content.length),
    )}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        keyExtractor={({ user, content }, index) =>
          createKey(user.username, content, index)
        }
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default ViewTopic;
