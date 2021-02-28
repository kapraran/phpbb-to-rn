import React from 'react';
import { Text } from 'react-native-paper';

interface Props {
  text: string;
  fontSize?: number;
}

const StrongElement: React.FC<Props> = ({ text, fontSize = 18 }) => (
  <Text style={{ fontWeight: '700', fontSize }}>{text}</Text>
);

export default React.memo(StrongElement);
