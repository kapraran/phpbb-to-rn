import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Caption, Colors, withTheme } from 'react-native-paper';

interface Props {
  theme: ReactNativePaper.Theme;
  username: string;
}

const styles = (dark: boolean) => StyleSheet.create({
  quote: {
    borderWidth: 1,
    borderColor: dark ? Colors.grey700 : Colors.grey300,
    borderRadius: 4,
    backgroundColor: dark ? Colors.grey800 : Colors.grey100,
  },
  quoteHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomColor: dark ? Colors.grey700 : Colors.grey300,
    borderBottomWidth: 1,
  },
  quoteContent: {
    padding: 16,
  },
});

const QuoteElement: React.FC<Props> = ({ username, children, theme }) => {
  return (
    <View style={styles(theme.dark).quote}>
      <Caption style={styles(theme.dark).quoteHeader}>{username}</Caption>
      <View style={styles(theme.dark).quoteContent}>{children}</View>
    </View>
  );
};

export default React.memo(withTheme(QuoteElement)) ;
