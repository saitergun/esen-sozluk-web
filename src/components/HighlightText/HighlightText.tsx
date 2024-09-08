'use client'

import { createElement, Fragment } from 'react'

import useMarkedText from '@/hooks/useMarkedText'

type Props = {
  text: string
  query: string
}

export default function HighlightText({ text, query }: Props) {
  const markedText = useMarkedText(text, query)

  if (query && markedText) {
    const markedHTML = document.createElement('span')
    markedHTML.innerHTML = markedText

    const children: React.ReactNode[] = []

    // marked html to unmarked react element
    markedHTML.childNodes.forEach((node, index) => {
      // convert text node to element node
      if (node.nodeType === 3) {
        children.push(
          createElement('strong', { key: `node-${index}` }, node.nodeValue),
        )
      } else {
        children.push(
          createElement(Fragment, { key: `node-${index}` }, node.textContent),
        )
      }
    })

    return createElement(Fragment, null, children)
  }

  return <>{text}</>
}
