import React from 'react';
import { View, Linking } from 'react-native';
import { Text, Colors, IconButton } from 'react-native-paper';
import Image from 'react-native-scalable-image';

interface Props {
  uri: string;
  maxWidth: number;
}

/**
 * Check if the image uri is a smilie
 *
 * @param uri
 */
const isSmilie = (uri: string) => uri.startsWith('/images/smilies/');

const ImageElement: React.FC<Props> = ({ uri, maxWidth }) => {
  // placeholder for smilies
  if (isSmilie(uri)) return <Text>☘️</Text>;

  return (
    <View
      style={{
        alignItems: 'flex-start',
      }}>
      <Image width={maxWidth} source={{ uri }}></Image>
      <IconButton
        icon="open-in-new"
        style={{
          marginTop: -28,
        }}
        onPress={() =>
          Linking.canOpenURL(uri).then((supported) =>
            supported ? Linking.openURL(uri) : null,
          )
        }
        color={Colors.white}
        size={16}></IconButton>
    </View>
  );
};

export default React.memo(ImageElement);
