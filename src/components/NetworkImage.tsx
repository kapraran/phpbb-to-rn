import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

interface Props {
  uri: string;
}

const NetworkImage = (props: Props) => {
  const { uri } = props;

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // if (width + height > 1) return;
    // Image.getSize(uri, (width, height) => {
    //   setWidth(width);
    //   setHeight(height);
    // });
  });

  return (
    <Image
      resizeMethod="resize"
      resizeMode="contain"
      source={{ uri }}
      style={
        {
          // alignSelf: 'stretch',
          // width: undefined,
          // height,
          // resizeMode: 'contain'
        }
      }></Image>
  );
};

export default NetworkImage;
