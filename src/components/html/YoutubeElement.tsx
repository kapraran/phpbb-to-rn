import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, withTheme } from 'react-native-paper';
import AnchorElement from './AnchorElement';

// @ts-ignore
import RNUrlPreview from 'react-native-url-preview';

interface Props {
  theme: ReactNativePaper.Theme;
  uri: string;
}

const styles = (dark: boolean) => StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: dark ? Colors.white : Colors.black
  },
  description: {
    fontSize: 12,
    color: Colors.grey500,
  },
  image: {
    width: 80,
    height: 80,
  },
});

const getVideoId = (uri: string) => {
  const matches = uri.match(/(.*\?.*v\=([^&]*).*)|(.*embed\/(.*))/);

  if (matches === null) return null;

  return matches.filter((x) => x !== undefined).pop();
};

const YoutubeElement = ({ uri, theme }: Props) => {
  const id = getVideoId(uri);

  // check if valid id
  if (id === null) return <View />;

  const url = `https://youtube.com/watch?v=${id}`;
  return (
    <View>
      <AnchorElement text={url} href={url} />
      <RNUrlPreview
        text={url}
        containerStyle={styles(theme.dark).container}
        titleStyle={styles(theme.dark).title}
        descriptionStyle={styles(theme.dark).description}
        imageStyle={styles(theme.dark).image}
        imageProps={{
          resizeMode: 'cover',
        }}
      />
    </View>
  );
};

export default withTheme(YoutubeElement);
