import React from 'react';
import { View } from 'react-native';
import AnchorText from './AnchorText';

interface Props {
  element: HTMLIFrameElement;
}

const YoutubeIframe = ({ element }: Props) => {
  const src = element.src;
  const matches = src.match(/(.*\?.*v\=([^&]*).*)|(.*embed\/(.*))/);

  if (matches == null) return <View />;

  const id = matches.pop();
  const url = `https://youtube.com/watch?v=${id}`;

  return <AnchorText text={url} href={url} />;
};

export default YoutubeIframe;
