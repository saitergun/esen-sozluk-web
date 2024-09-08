'use client'

import { useEffect } from 'react'

export default function Modernizr() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const { documentElement } = document

    const touch = 'ontouchstart' in documentElement

    if (touch) {
      documentElement.classList.remove('no-touch')
      documentElement.classList.add('touch')
    } else {
      documentElement.classList.remove('touch')
      documentElement.classList.add('no-touch')
    }
  }, [])

  return null
}
