import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { parseHTML } from '../utils/utils'

interface Props {
  html: string
}

const renderNode = (node: ChildNode) => {
  switch(node.nodeType) {
    case node.TEXT_NODE:
      return <Text key={node.textContent}>{node.textContent}</Text>
    default:
      return null 
  }
}

const RenderHtml = (props: Props) => {
  const [nodes, setNodes] = useState<ChildNode[]>([])

  useEffect(() => {
    if (nodes.length > 0) return

    parseHTML(props.html).then(window => {
      setNodes(Array.from(window.document.body.childNodes))
    })
  })

  return <View style={styles.container}>
    <View>
      {
        nodes.map(node => renderNode(node))
      }
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
});

export default RenderHtml
