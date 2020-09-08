import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Colors } from 'react-native-paper';
import AppHeader from '../components/AppHeader';
import SpinnerView from '../components/SpinnerView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigator';
import Pagination from '../components/Pagination';
import { PostData } from '../api/scrapers/viewtopic';
import { getViewTopicPosts } from '../api/api';
import PostCard from '../components/PostCard';
import { PaginationData } from '../api/scrapers/pagination';
import { TopicLinkParams } from '../api/scrapers/viewforum';

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
  const [pagination, setPagination] = React.useState<PaginationData>({
    current: 1,
    max: 1,
  });

  const fetchPosts = (params: TopicLinkParams) => {
    setPosts([]);

    getViewTopicPosts(params).then(({ posts, pagination }) => {
      setPosts(posts);
      setPagination(pagination);
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPosts(route.params.params);
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

  const onPageChange = (start: number) => {
    fetchPosts({
      ...route.params.params,
      start,
    });
  };

  const renderFooter = () =>
    posts.length > 0 ? (
      <Pagination
        current={pagination.current}
        max={pagination.max}
        onPageChange={onPageChange}></Pagination>
    ) : null;

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
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.green100,
        }}
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
