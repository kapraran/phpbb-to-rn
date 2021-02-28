import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showSettings?: boolean;
}

const AppHeader: React.FC<Props> = ({
  title,
  subtitle,
  showBack = false,
  showSettings = false,
}) => {
  const navigation = useNavigation();

  const goToSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <Appbar.Header>
      {/* back icon */}
      {showBack ? (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      ) : null}

      {/* content */}
      <Appbar.Content title={title} subtitle={subtitle} />

      {/* actions */}
      {showSettings ? (
        <Appbar.Action icon="cog" onPress={goToSettings} />
      ) : null}
    </Appbar.Header>
  );
};

export default AppHeader;
