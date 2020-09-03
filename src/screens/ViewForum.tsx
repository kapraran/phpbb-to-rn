import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import AppHeader from '../components/AppHeader';
import SpinnerView from '../components/SpinnerView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigator';
import { getViewForumTopics } from '../api/api';
import { TopicLinkData } from '../api/scrapers/viewforum';
import { List, Colors } from 'react-native-paper';
import { firstLetterUpper } from '../utils/utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (topics.length > 0) return;

      getViewForumTopics(route.params.params).then((viewForumData) => {
        setTopics(viewForumData.topics);

        if (!viewForumData.isLogged) navigation.navigate('Login');
      });
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={topics}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
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
});

export default ViewForum;
