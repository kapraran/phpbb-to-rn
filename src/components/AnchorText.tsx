import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Colors, Text } from 'react-native-paper';
import RNUrlPreview from 'react-native-url-preview';

interface Props {
  text: string;
  href: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  anchor: {
    color: Colors.green500,
    textDecorationLine: 'underline',
  },
});

const AnchorText = ({ text, href }: Props) => {
  return (
    <View>
      <Text
        onPress={() => {
          Linking.canOpenURL(href!).then((supported) =>
            supported ? Linking.openURL(href!) : null,
          );
        }}
        style={styles.anchor}>
        {text}
      </Text>
      <RNUrlPreview
        text={href}
        titleStyle={{
          fontSize: 14,
        }}
        descriptionStyle={{
          fontSize: 12,
          color: Colors.grey500,
        }}
        containerStyle={{
          backgroundColor: 'transparent',
          alignItems: 'center',
        }}
        imageStyle={{
          width: 80,
          height: 80,
        }}
        imageProps={{
          resizeMode: 'cover',
        }}
      />
    </View>
  );
};

export default AnchorText;
