import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
}

const AppHeader = ({ title }: Props) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
      <Appbar.Action icon="cog" onPress={() => navigation.navigate('Login')} />
    </Appbar.Header>
  );
};

export default AppHeader;
