import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import AnchorElement from './AnchorElement';
import RNUrlPreview from 'react-native-url-preview';

interface Props {
  uri: string;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
  },
  description: {
    fontSize: 12,
    color: Colors.grey500,
  },
  image: {
    width: 80,
    height: 80,
  }
});

const getVideoId = (uri: string) => {
  const matches = uri.match(/(.*\?.*v\=([^&]*).*)|(.*embed\/(.*))/);
  return matches !== null ? (matches.pop() as string) : null;
};

const YoutubeElement = ({ uri }: Props) => {
  const id = getVideoId(uri);

  // check if valid id
  if (id === null) return <View />;

  const url = `https://youtube.com/watch?v=${id}`;
  return (
    <View>
      <AnchorElement text={url} href={url} />
      <RNUrlPreview
        text={url}
        containerStyle={styles.container}
        titleStyle={styles.title}
        descriptionStyle={styles.description}
        imageStyle={styles.image}
        imageProps={{
          resizeMode: 'cover',
        }}
      />
    </View>
  );
};

export default YoutubeElement;
