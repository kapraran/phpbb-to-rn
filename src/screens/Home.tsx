import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator';
import { getIndexForums } from '../api/api';
import { GroupItem } from '../api/scrapers/home';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import ForumGroup from '../components/ForumGroup';
import SpinnerView from '../components/SpinnerView';

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeNavigationProp;
};

const Home = ({ navigation }: Props) => {
  const [forums, setForums] = useState<GroupItem[]>([]);

  useEffect(() => {
    if (forums.length > 0) return;

    getIndexForums().then((groups) => {
      setForums(groups);
    });
  });

  const renderItem = ({ item }: { item: GroupItem }) => (
    <ForumGroup item={item} />
  );

  const renderHeader = () => <AppHeader title="Panatha Forum" />;

  const renderFooter = () => (forums.length === 0 ? <SpinnerView /> : null);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={forums}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListFooterComponentStyle={{ flex: 1 }}
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
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 99,
  },
});

export default Home;
