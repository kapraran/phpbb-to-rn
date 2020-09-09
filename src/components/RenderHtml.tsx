import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Linking } from 'react-native';
import { Text, Colors, Caption, Paragraph } from 'react-native-paper';
import { parseHTML } from '../utils/utils';
import NetworkImage from './NetworkImage';

interface Props {
  html: string;
}

const renderQuote = (quote: HTMLElement, index: number, prefixKey: string) => {
  const username = quote.children[0].innerHTML.split(' ')[0];

  return (
    <View style={styles.quote} key={prefixKey + index}>
      <Caption style={styles.quoteHeader}>{username}</Caption>
      <View style={styles.quoteContent}>
        {renderNodes(
          Array.from(quote.children[1].childNodes),
          prefixKey + index + 'q',
        )}
      </View>
    </View>
  );
};

const renderImage = (img: HTMLImageElement, key: string) => {
  const url = img.src

  if (url.startsWith('/images/smilies/')) {
    return <Text key={key}>☘️</Text>
  }

  return null;
};

const renderElement = (node: ChildNode, index: number, prefixKey: string) => {
  const element = node as HTMLElement;
  const key = prefixKey + index;

  switch (element.tagName) {
    case 'DIV':
      if (element.className == 'quotewrapper') {
        return renderQuote(element, index, prefixKey);
      }
    case 'BR':
      return <View key={key} style={{ height: 8 }} />;
    case 'A':
      const text = element.textContent;
      const href = (element as HTMLAnchorElement).href;
      return (
        <Text
          key={key}
          onPress={() => {
            console.log('open');
            Linking.canOpenURL(href).then((supported) =>
              supported ? Linking.openURL(href) : null,
            );
          }}
          style={styles.anchor}>
          {text}
        </Text>
      );
    case 'STRONG':
    case 'SPAN':
      return (
        <Text key={key} style={{ fontWeight: '700', fontSize: 18 }}>
          {element.textContent?.trim()}
        </Text>
      );
    case 'IMG':
      return renderImage(element as HTMLImageElement, key);
    // return (
    //   <NetworkImage
    //     key={index}
    //     uri={(node as HTMLImageElement).src}></NetworkImage>
    // );
    default:
      // return null;
      return (
        <View
          key={key}
          style={{ height: 8, backgroundColor: Colors.red200 }}></View>
      );
  }
};

const renderNode = (node: ChildNode, index: number, prefixKey: string) => {
  switch (node.nodeType) {
    case node.TEXT_NODE:
      return <Paragraph key={prefixKey + index}>{node.textContent}</Paragraph>;
    case node.ELEMENT_NODE:
      return renderElement(node, index, prefixKey);
    default:
      return null;
  }
};

const renderNodes = (nodes: ChildNode[], prefixKey: string) => {
  return nodes.map((node, index) => renderNode(node, index, prefixKey));
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
      <View>{renderNodes(nodes, ':')}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
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
  anchor: {
    color: Colors.green500,
    textDecorationLine: 'underline',
  },
});

export default RenderHtml;
