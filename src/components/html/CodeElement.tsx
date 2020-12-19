import React from 'react';
import { StyleSheet } from 'react-native';
import { Paragraph, Colors } from 'react-native-paper';

interface Props {
  content: string;
}

const styles = StyleSheet.create({
  code: {
    fontFamily: 'monospace',
    backgroundColor: Colors.green50,
    padding: 16,
    borderRadius: 4,
  },
});

const CodeElement = ({ content }: Props) => (
  <Paragraph style={styles.code}>{content}</Paragraph>
);

export default React.memo(CodeElement);
