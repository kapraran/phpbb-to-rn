import React from 'react';
import { Text } from 'react-native-paper';

interface Props {
  text: string;
  fontSize?: number;
}

const StrongElement = ({ text, fontSize = 18 }: Props) => (
  <Text style={{ fontWeight: '700', fontSize }}>{text}</Text>
);

export default React.memo(StrongElement);
