import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import Image from 'react-native-scalable-image';
import { prependBaseUrlIfNeeded } from '../utils/utils';

interface Props {
  size: number;
  uri: string | null;
}

const styles = (size: number) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: 'hidden',
      backgroundColor: '#eee',
    },
  });

const PostAvatar = ({ size, uri }: Props) => (
  <View style={styles(size).container}>
    {uri === null ? (
      <Avatar.Icon size={size} icon="account" />
    ) : (
      <Image
        height={size}
        width={size}
        source={{ uri: prependBaseUrlIfNeeded(uri) }}></Image>
    )}
  </View>
);

export default React.memo(PostAvatar);
