import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Text, Colors } from 'react-native-paper';

interface Props {
  text: string | null;
  href: string | null;
}

const styles = StyleSheet.create({
  anchor: {
    color: Colors.green500,
    textDecorationLine: 'underline',
  },
});

const AnchorElement: React.FC<Props> = ({ text, href }) => {
  text = text === null ? href : text;

  return (
    <Text
      onPress={() => {
        Linking.canOpenURL(href!).then((supported) =>
          supported ? Linking.openURL(href!) : null,
        );
      }}
      style={styles.anchor}>
      {text}
    </Text>
  );
};

export default React.memo(AnchorElement);
