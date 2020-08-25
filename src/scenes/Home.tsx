import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Title} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigator';

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeNavigationProp;
};

const Home = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Title>Hello World!</Title>
      <Button onPress={() => navigation.navigate('Login')}>Go to Login</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
