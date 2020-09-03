import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

const AppHeader = ({ title, subtitle, showBack = false }: Props) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header>
      {showBack ? (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      ) : null}
      <Appbar.Content title={title} subtitle={subtitle} />
    </Appbar.Header>
  );
};

export default AppHeader;
