import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Caption, Colors } from 'react-native-paper';

interface Props {
  username: string;
}

const styles = StyleSheet.create({
  quote: {
    borderWidth: 1,
    borderColor: Colors.grey300,
    borderRadius: 4,
    backgroundColor: Colors.grey100,
  },
  quoteHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomColor: Colors.grey200,
    borderBottomWidth: 1,
  },
  quoteContent: {
    padding: 16,
  },
});

const QuoteElement: React.FC<Props> = ({ username, children }) => {
  return (
    <View style={styles.quote}>
      <Caption style={styles.quoteHeader}>{username}</Caption>
      <View style={styles.quoteContent}>{children}</View>
    </View>
  );
};

export default QuoteElement;
