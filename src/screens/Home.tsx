import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator';
import { getIndexForums } from '../api/api';
import { GroupItem } from '../api/scrapers/home';
import { FlatList } from 'react-native-gesture-handler';
import AppHeader from '../components/AppHeader';
import ForumGroup from '../components/ForumGroup';
import SpinnerView from '../components/SpinnerView';
import { withTheme } from 'react-native-paper';

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  theme: ReactNativePaper.Theme;
  navigation: HomeNavigationProp;
};

const renderItem = ({ item }: { item: GroupItem }) => (
  <ForumGroup item={item} />
);

const renderHeader = () => <AppHeader title="Panatha Forum" />;

const renderEmpty = () => <SpinnerView />;

const Home = ({ navigation, theme }: Props) => {
  const [forums, setForums] = useState<GroupItem[]>([]);

  useEffect(() => {
    getIndexForums().then((indexData) => {
      setForums(indexData.groupItems);
      if (!indexData.isLogged) return navigation.navigate('Login');
    });
  }, []);

  return (
    <SafeAreaView style={styles(theme.dark).container}>
      <FlatList
        data={forums}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        ListHeaderComponent={renderHeader}
        keyExtractor={({ name }) => name}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
};

const styles = (dark: boolean) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: dark ? '#000' : '#fff',
    },
  });

export default withTheme(Home);
