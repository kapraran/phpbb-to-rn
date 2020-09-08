import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { parseHTML } from '../utils/utils';
import NetworkImage from './NetworkImage';

interface Props {
  html: string;
}

const renderElement = (node: ChildNode, index: number) => {
  switch (node.nodeName) {
    case 'BR':
      return <View key={index} style={{ height: 8 }} />;
    case 'IMG':
      return (
        <NetworkImage
          key={index}
          uri={(node as HTMLImageElement).src}></NetworkImage>
      );
    default:
      return null;
  }
};

const renderNode = (node: ChildNode, index: number) => {
  switch (node.nodeType) {
    case node.TEXT_NODE:
      return <Text key={index}>{node.textContent}</Text>;
    case node.ELEMENT_NODE:
      return renderElement(node, index);
    default:
      return null;
  }
};

const RenderHtml = (props: Props) => {
  const [nodes, setNodes] = useState<ChildNode[]>([]);

  useEffect(() => {
    let mounted = true;
    if (nodes.length > 0) return;

    parseHTML(props.html).then((window) => {
      if (mounted) setNodes(Array.from(window.document.body.childNodes));
    });

    return () => {
      mounted = false;
    };
  });

  return (
    <View style={styles.container}>
      <View>{nodes.map((node, index) => renderNode(node, index))}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default RenderHtml;
