import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RootStackParamList } from '../navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type ReplyNavigationProp = StackNavigationProp<RootStackParamList, 'Reply'>;
type ReplyRouteProp = RouteProp<RootStackParamList, 'Reply'>;

type Props = {
  navigation: ReplyNavigationProp;
  route: ReplyRouteProp;
};

const Reply = ({ navigation, route }: Props) => {
  return <View></View>;
};

const styles = StyleSheet.create({});

export default Reply;
