import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Linking, Dimensions } from 'react-native';
import {
  Text,
  Colors,
  Caption,
  Paragraph,
  IconButton,
} from 'react-native-paper';
import { parseHTML } from '../utils/utils';
import Image from 'react-native-scalable-image';
import StrongText from './StrongText';
import AnchorText from './AnchorText';
import YoutubeIframe from './YoutubeIframe';

interface Props {
  html: string;
}

const renderNone = (key: string) => <View key={key} style={styles.none}></View>;

const renderQuote = (
  quote: HTMLElement,
  index: number,
  prefixKey: string,
  widthModifier: number,
) => {
  const username = quote.children[0].innerHTML.split(' ')[0].trim();

  return (
    <View style={styles.quote} key={prefixKey + index}>
      <Caption style={styles.quoteHeader}>{username}</Caption>
      <View style={styles.quoteContent}>
        {renderManyNodes(
          Array.from(quote.children[1].childNodes),
          prefixKey + index + 'q',
          widthModifier,
        )}
      </View>
    </View>
  );
};

const renderImage = (img: HTMLImageElement, key: string, maxWidth: number) => {
  const uri = img.src;

  if (uri.startsWith('/images/smilies/')) {
    return <Text key={key}>☘️</Text>;
  }

  return (
    <View
      key={key}
      style={{
        alignItems: 'flex-start',
      }}>
      <Image width={maxWidth} source={{ uri }}></Image>
      <IconButton
        icon="open-in-new"
        style={{
          marginTop: -28,
        }}
        onPress={() =>
          Linking.canOpenURL(uri).then((supported) =>
            supported ? Linking.openURL(uri) : null,
          )
        }
        color={Colors.white}
        size={16}></IconButton>
    </View>
  );
};

const renderCode = (element: HTMLDivElement, key: string) => {
  const content = element.querySelector('.codecontent')!.textContent!.trim();

  return (
    <Paragraph
      key={key}
      style={{
        fontFamily: 'monospace',
        backgroundColor: Colors.green50,
        padding: 16,
        borderRadius: 4,
      }}>
      {content}
    </Paragraph>
  );
};

const renderElement = (
  node: ChildNode,
  index: number,
  prefixKey: string,
  maxWidth: number,
) => {
  const element = node as HTMLElement;
  const key = prefixKey + index;

  switch (element.tagName) {
    case 'DIV':
      if (element.className == 'quotewrapper') {
        const newMaxWidth = Math.max(50, maxWidth - 24);
        return renderQuote(element, index, prefixKey, newMaxWidth);
      }

      if (element.className == 'codewrapper') {
        return renderCode(element as HTMLDivElement, key);
      }

      return renderNone(key);
    case 'BR':
      return <View key={key} style={{ height: 8 }} />;

    case 'IFRAME':
      const iframe = element as HTMLIFrameElement;
      const src = iframe.src;
      if (src.includes('youtube.com'))
        return <YoutubeIframe key={key} element={iframe} />;

    case 'A':
      const text = element.textContent!;
      const href = (element as HTMLAnchorElement).getAttribute('href')!;
      return <AnchorText key={key} text={text} href={`https:${href}`} />;

    case 'STRONG':
    case 'SPAN':
      return <StrongText key={key} text={element.textContent?.trim()!} />;
    case 'IMG':
      return renderImage(element as HTMLImageElement, key, maxWidth);

    default:
      return renderNone(key);
  }
};

const renderSingleNode = (
  node: ChildNode,
  index: number,
  prefixKey: string,
  maxWidth: number,
) => {
  switch (node.nodeType) {
    case node.TEXT_NODE:
      return <Paragraph key={prefixKey + index}>{node.textContent}</Paragraph>;
    case node.ELEMENT_NODE:
      return renderElement(node, index, prefixKey, maxWidth);
    default:
      return null;
  }
};

const renderManyNodes = (
  nodes: ChildNode[],
  prefixKey: string,
  maxWidth: number,
) => {
  return nodes.map((node, index) =>
    renderSingleNode(node, index, prefixKey, maxWidth),
  );
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

  const maxWidth = Dimensions.get('window').width - 76;

  return (
    <View style={styles.container}>
      <View>{renderManyNodes(nodes, ':', maxWidth)}</View>
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
  none: { height: 8, backgroundColor: Colors.orange400 },
});

export default RenderHtml;
