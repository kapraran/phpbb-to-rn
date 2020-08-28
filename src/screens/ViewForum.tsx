import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import SpinnerView from '../components/SpinnerView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigator';

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
  const [topics, setTopics] = useState([]);

  const renderItem = () => <View />;

  const renderHeader = () => (
    <AppHeader title={route.params.title} subtitle={route.params.groupName} showBack={true} />
  );

  const renderEmpty = () => <SpinnerView />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={topics}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        keyExtractor={({ name }) => name}
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
