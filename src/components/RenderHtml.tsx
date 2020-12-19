import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { parseHTML } from '../utils/utils';

import AnchorElement from './html/AnchorElement';
import CodeElement from './html/CodeElement';
import ImageElement from './html/ImageElement';
import NoneElement from './html/NoneElement';
import QuoteElement from './html/QuoteElement';
import StrongElement from './html/StrongElement';
import YoutubeElement from './html/YoutubeElement';

interface Props {
  html: string;
}

const renderQuote = (
  quote: HTMLElement,
  index: number,
  prefixKey: string,
  widthModifier: number,
) => {
  const key = prefixKey + index;
  const username = quote.children[0].innerHTML
    .split(' ')
    .slice(0, -1)
    .join(' ')
    .trim();

  return (
    <QuoteElement key={key} username={username}>
      {renderNodeList(
        Array.from(quote.children[1].childNodes),
        `${key}:q`,
        widthModifier,
      )}
    </QuoteElement>
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
        const content = element
          .querySelector('.codecontent')!
          .textContent!.trim();
        return <CodeElement key={key} content={content} />;
      }

      return <NoneElement key={key} />;
    case 'BR':
      return <View key={key} style={{ height: 8 }} />;

    case 'IFRAME':
      const iframe = element as HTMLIFrameElement;
      const src = iframe.src;
      if (src.includes('youtube.com'))
        return (
          <YoutubeElement key={key} uri={(iframe as HTMLIFrameElement).src} />
        );

    case 'A':
      return (
        <AnchorElement
          key={key}
          text={element.textContent}
          href={(element as HTMLAnchorElement).getAttribute('href')}
        />
      );
    case 'STRONG':
    case 'SPAN':
      return <StrongElement key={key} text={element.textContent?.trim()!} />;
    case 'IMG':
      return (
        <ImageElement
          key={key}
          uri={(element as HTMLImageElement).src}
          maxWidth={maxWidth}
        />
      );
    default:
      return <NoneElement key={key} />;
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

const renderNodeList = (
  nodes: ChildNode[],
  prefixKey: string,
  maxWidth: number,
) => {
  return nodes.map((node, index) =>
    renderSingleNode(node, index, prefixKey, maxWidth),
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

const RenderHtml = (props: Props) => {
  const [nodes, setNodes] = useState<ChildNode[]>([]);
  const maxWidth = Dimensions.get('window').width - 76;

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
      <View>{renderNodeList(nodes, 'root:', maxWidth)}</View>
    </View>
  );
};

export default RenderHtml;
