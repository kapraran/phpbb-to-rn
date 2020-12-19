import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView, View } from 'react-native';
import AppHeader from '../components/AppHeader';
import SpinnerView from '../components/SpinnerView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigator';
import { getViewForumTopics } from '../api/api';
import { TopicLinkData } from '../api/scrapers/viewforum';
import { List, Colors, Button } from 'react-native-paper';
import { firstLetterUpper } from '../utils/utils';
import TopicLinkModal from '../components/TopicLinkModal';
import { PaginationData } from '../api/scrapers/pagination';
import { ForumLinkParams } from '../api/scrapers/home';
import NavigationFooter from '../components/NavigationFooter';

type ViewForumNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ViewForum'
>;
type ViewForumRouteProp = RouteProp<RootStackParamList, 'ViewForum'>;

type Props = {
  navigation: ViewForumNavigationProp;
  route: ViewForumRouteProp;
};

const renderSeparator = () => <View style={styles.separator} />;

const ViewForum = ({ navigation, route }: Props) => {
  const [topics, setTopics] = useState<TopicLinkData[]>([]);
  const [visible, setVisible] = useState(false);
  const [pressedLinkData, setPressedLinkData] = useState<TopicLinkData>();
  const [pagination, setPagination] = useState<PaginationData>({
    current: 1,
    max: 1,
  });

  const params = route.params.params;

  let flatListRef: FlatList<TopicLinkData> | null = null;

  const fetchTopics = (params: ForumLinkParams) => {
    setTopics([]);

    getViewForumTopics(params).then(({ isLogged, topics, pagination }) => {
      setTopics(topics);
      setPagination(pagination);

      if (!isLogged) navigation.navigate('Login');
    });
  };

  const onRefresh = () => fetchTopics(params);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTopics(params);
    });

    return unsubscribe;
  }, [params]);

  const renderItem = ({ item }: { item: TopicLinkData }) => (
    <List.Item
      title={firstLetterUpper(item.title)}
      titleNumberOfLines={2}
      description={`${item.author} - ${item.replies} replies`}
      left={(props) => (
        <List.Icon
          {...props}
          icon={item.unread ? 'comment-multiple' : 'comment-multiple-outline'}
          color={item.unread ? Colors.green800 : Colors.grey700}
        />
      )}
      onPress={() => {
        navigation.navigate('ViewTopic', {
          title: item.title,
          forumName: route.params.title,
          params: item.params,
        });
      }}
      onLongPress={() => {
        setPressedLinkData(item);
        setVisible(true);
      }}
    />
  );

  const renderHeader = () => (
    <AppHeader
      title={route.params.title}
      subtitle={route.params.groupName}
      showBack={true}
    />
  );

  const renderEmpty = () => <SpinnerView />;

  const onPageChange = (start: number) => {
    fetchTopics({
      ...route.params.params,
      start,
    });
  };

  const renderFooter = () =>
    topics.length > 0 ? (
      <View>
        <NavigationFooter
          listRef={flatListRef}
          pagination={pagination}
          onPageChange={onPageChange}
        />
        <TopicLinkModal
          visible={visible}
          forumName={route.params.title}
          topicLinkData={pressedLinkData!}
          onDismiss={() => setVisible(false)}></TopicLinkModal>
      </View>
    ) : null;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={(ref) => (flatListRef = ref)}
        data={topics}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        keyExtractor={({ title }) => title}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ flexGrow: 1 }}
        ItemSeparatorComponent={renderSeparator}
        refreshing={false}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  footerNav: {
    flexDirection: 'row',
    marginBottom: 8,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
});

export default ViewForum;
