import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView, View } from 'react-native';
import { withTheme } from 'react-native-paper';
import AppHeader from '../components/AppHeader';
import SpinnerView from '../components/SpinnerView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigator';
import { PostData } from '../api/scrapers/viewtopic';
import { getViewTopicPosts } from '../api/api';
import { PaginationData } from '../api/scrapers/pagination';
import { TopicLinkParams } from '../api/scrapers/viewforum';
import PostItem from '../components/PostItem';
import TopicFooter from '../components/TopicFooter';

type ViewTopicNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ViewTopic'
>;
type ViewTopicRouteProp = RouteProp<RootStackParamList, 'ViewTopic'>;

type Props = {
  theme: ReactNativePaper.Theme;
  navigation: ViewTopicNavigationProp;
  route: ViewTopicRouteProp;
};

const styles = (dark: boolean) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: dark ? '#000' : '#fff',
    },
  });

const renderHeader = ({
  title,
  forumName,
}: RootStackParamList['ViewTopic']) => (
  <AppHeader title={title} subtitle={forumName} showBack={true} />
);

const renderEmpty = () => <SpinnerView />;

const ViewTopic = ({ navigation, route, theme }: Props) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [unreadIndex, setUnreadIndex] = useState(0);
  const [pagination, setPagination] = React.useState<PaginationData>({
    current: 1,
    max: 1,
  });
  const flatListRef = React.useRef<FlatList>(null);

  const delayedScrollToIndex = (index: number, delay = 100) => {
    setTimeout(() => {
      flatListRef.current!.scrollToIndex({ animated: true, index });
    }, delay);
  };

  const fetchPosts = (params: TopicLinkParams) => {
    setPosts([]);

    getViewTopicPosts(params).then(({ posts, pagination }) => {
      setPosts(posts);
      setPagination(pagination);

      const index = posts.findIndex((post) => post.hasUnreadAnchor);
      setUnreadIndex(index < 0 ? 0 : index);

      // move to first unread post
      if (index > 0) delayedScrollToIndex(index, 50);
    });
  };

  const onRefresh = () => {
    fetchPosts(route.params.params);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPosts(route.params.params);
    });

    return unsubscribe;
  }, [navigation, route]);

  const renderItem = ({ index, item }: { index: number; item: PostData }) => (
    <PostItem index={index} item={item} pagination={pagination} />
  );

  const onPageChange = (start: number) => {
    fetchPosts({
      ...route.params.params,
      start,
    });
  };

  // TODO move to a separate file
  const renderFooter = () =>
    posts.length > 0 ? (
      <TopicFooter
        onPressReply={() => {
          navigation.navigate('Reply', {
            title: route.params.title,
            params: route.params.params,
          });
        }}
        listRef={flatListRef}
        pagination={pagination}
        onPageChange={onPageChange}
      />
    ) : null;

  const onScrollToIndexFailed = ({
    index,
    averageItemLength,
  }: {
    index: number;
    averageItemLength: number;
  }) => {
    flatListRef.current?.scrollToOffset({
      animated: false,
      offset: index * averageItemLength,
    });
    delayedScrollToIndex(index, 100);
  };

  return (
    <SafeAreaView style={styles(theme.dark).container}>
      <FlatList
        ref={flatListRef}
        data={posts}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        ListHeaderComponent={() => renderHeader(route.params)}
        ListFooterComponent={renderFooter}
        keyExtractor={(post) => post.id + ''}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles(theme.dark).container}
        refreshing={false}
        onRefresh={onRefresh}
        onScrollToIndexFailed={onScrollToIndexFailed}
      />
    </SafeAreaView>
  );
};

export default withTheme(ViewTopic);
