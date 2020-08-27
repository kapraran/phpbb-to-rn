import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Title, Appbar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator';
import { ActivityIndicator, List, Colors } from 'react-native-paper';
import { getIndexForums } from '../api/api';
import { GroupItem } from '../api/scrapers/home';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const firstLetterUpper = (str: string) => {
  return str
    .split(' ')
    .map(
      (part) => part.charAt(0).toUpperCase() + part.substring(1).toLowerCase(),
    )
    .join(' ');
};

type Props = {
  navigation: HomeNavigationProp;
};

const Home = ({ navigation }: Props) => {
  const [forums, setForums] = useState<GroupItem[]>([]);

  useEffect(() => {
    getIndexForums().then((groups) => {
      setForums(groups);
    });
  });

  const renderItem = ({ item }: { item: GroupItem }) => (
    <List.Section>
      <List.Subheader>{firstLetterUpper(item.name)}</List.Subheader>

      <List.Item
        title="Hello Mister World"
        onPress={() => {
          console.log('clicked!');
        }}
      />
      <List.Item
        title="Hello Mister World"
        onPress={() => {
          console.log('clicked!');
        }}
      />
      <List.Item
        title="Hello Mister World"
        onPress={() => {
          console.log('clicked!');
        }}
      />
    </List.Section>
  );

  const renderHeader = () => {
    return (
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={() => {console.log('back')}} /> */}
        <Appbar.Content title="Panatha Forum" />
        <Appbar.Action
          icon="magnify"
          onPress={() => navigation.navigate('Login')}
        />
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => navigation.navigate('Login')}
        />
      </Appbar.Header>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={forums}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        keyExtractor={({ name }) => name}
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
