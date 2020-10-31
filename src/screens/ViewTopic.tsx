import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView, View } from 'react-native';
import { Button } from 'react-native-paper';
import AppHeader from '../components/AppHeader';
import SpinnerView from '../components/SpinnerView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigator';
import Pagination from '../components/Pagination';
import { PostData } from '../api/scrapers/viewtopic';
import { getViewTopicPosts } from '../api/api';
import { PaginationData } from '../api/scrapers/pagination';
import { TopicLinkParams } from '../api/scrapers/viewforum';
import PostItem from '../components/PostItem';
import NavigationFooter from '../components/NavigationFooter';

type ViewTopicNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ViewTopic'
>;
type ViewTopicRouteProp = RouteProp<RootStackParamList, 'ViewTopic'>;

type Props = {
  navigation: ViewTopicNavigationProp;
  route: ViewTopicRouteProp;
};

const renderHeader = ({
  title,
  forumName,
}: RootStackParamList['ViewTopic']) => (
  <AppHeader title={title} subtitle={forumName} showBack={true} />
);

const renderEmpty = () => <SpinnerView />;

let flatListRef: FlatList<PostData> | null = null;

const ViewTopic = ({ navigation, route }: Props) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [unreadIndex, setUnreadIndex] = useState(0);
  const [pagination, setPagination] = React.useState<PaginationData>({
    current: 1,
    max: 1,
  });

  const fetchPosts = (params: TopicLinkParams) => {
    setPosts([]);

    getViewTopicPosts(params).then(({ posts, pagination }) => {
      setPosts(posts);
      setPagination(pagination);

      const index = posts.findIndex((post) => post.hasUnreadAnchor);
      setUnreadIndex(index < 0 ? 0 : index);
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
      <View>
        <Button
          mode="contained"
          icon="plus"
          style={{ margin: 8 }}
          onPress={() => {
            navigation.navigate('Reply', {
              title: route.params.title,
              params: route.params.params,
            });
          }}>
          Απαντηση
        </Button>
        <NavigationFooter
          listRef={flatListRef}
          pagination={pagination}
          onPageChange={onPageChange}
        />
      </View>
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
        ref={(ref) => (flatListRef = ref)}
        data={posts}
        renderItem={renderItem}
        ListHeaderComponent={() => renderHeader(route.params)}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        keyExtractor={({ user, content }, index) =>
          createKey(user.username, content, index)
        }
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        refreshing={false}
        onRefresh={onRefresh}
        initialNumToRender={4}
        maxToRenderPerBatch={2}
        updateCellsBatchingPeriod={50}
        windowSize={7}
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
