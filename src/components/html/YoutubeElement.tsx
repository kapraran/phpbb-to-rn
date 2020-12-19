import React from 'react';
import { View } from 'react-native';
import AnchorText from '../AnchorText';

interface Props {
  uri: string
}

const getVideoId = (uri: string) => {
  const matches = uri.match(/(.*\?.*v\=([^&]*).*)|(.*embed\/(.*))/);
  return matches !== null ? matches.pop() as string: null
}

const YoutubeElement = ({ uri }: Props) => {
  const id = getVideoId(uri)

  // check if valid id
  if (id === null) return <View />

  const url = `https://youtube.com/watch?v=${id}`;
  return <AnchorText text={url} href={url} />;
};

export default YoutubeElement;
