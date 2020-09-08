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
import Pagination from '../components/Pagination';
import TopicLinkModal from '../components/TopicLinkModal';
import { PaginationData } from '../api/scrapers/pagination';
import { ForumLinkParams } from '../api/scrapers/home';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ViewForumNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ViewForum'
>;
type ViewForumRouteProp = RouteProp<RootStackParamList, 'ViewForum'>;

type Props = {
  navigation: ViewForumNavigationProp;
  route: ViewForumRouteProp;
};

const ViewForum = ({ navigation, route }: Props) => {
  const [topics, setTopics] = useState<TopicLinkData[]>([]);
  const [visible, setVisible] = React.useState(false);
  const [pagination, setPagination] = React.useState<PaginationData>({
    current: 1,
    max: 1,
  });

  let flatListRef: FlatList<TopicLinkData> | null = null;

  const fetchTopics = (params: ForumLinkParams) => {
    setTopics([]);

    getViewForumTopics(params).then(({ isLogged, topics, pagination }) => {
      setTopics(topics);
      setPagination(pagination);

      if (!isLogged) navigation.navigate('Login');
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTopics(route.params.params);
    });

    return unsubscribe;
  }, [navigation, route, setTopics]);

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
    console.log(start);
    fetchTopics({
      ...route.params.params,
      start,
    });
  };

  const renderFooter = () =>
    topics.length > 0 ? (
      <View>
        <TopicLinkModal
          visible={visible}
          onDismiss={() => setVisible(false)}></TopicLinkModal>
        <Pagination
          current={pagination.current}
          max={pagination.max}
          onPageChange={onPageChange}></Pagination>
        <View style={styles.footerNav}>
          <Button
            // style={styles.footerNavBtn}
            mode="outlined"
            color={Colors.green700}
            contentStyle={{ flex: 1 }}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Icon name="home" size={20} color={Colors.green700} />
          </Button>
          <Button
            // style={styles.footerNavBtn}
            mode="outlined"
            color={Colors.green700}
            onPress={() =>
              flatListRef?.scrollToOffset({ animated: true, offset: 0 })
            }>
            <Icon name="arrow-upward" size={20} color={Colors.green700} />
          </Button>
        </View>
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
});

export default ViewForum;
