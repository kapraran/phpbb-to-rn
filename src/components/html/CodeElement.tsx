import React from 'react';
import { StyleSheet } from 'react-native';
import { Paragraph, Colors, withTheme } from 'react-native-paper';
import { actuatedNormalize } from '../../utils/scaling';

interface Props {
  theme: ReactNativePaper.Theme;
  content: string;
}

const styles = (dark: boolean) =>
  StyleSheet.create({
    code: {
      fontFamily: 'monospace',
      backgroundColor: dark ? Colors.grey700 : Colors.green50,
      padding: 16,
      borderRadius: 4,
      fontSize: actuatedNormalize(14),
    },
  });

const CodeElement = ({ content, theme }: Props) => (
  <Paragraph style={styles(theme.dark).code}>{content}</Paragraph>
);

export default React.memo(withTheme(CodeElement));
