import { useCallback, useLayoutEffect } from 'react'

const VALID_KEYS = [
  'a',
  'b',
  'c',
  'ç', // turkish
  'd',
  'e',
  'f',
  'g',
  // 'ğ',
  'h',
  'i',
  'ı', // turkish
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'ö', // turkish
  'p',
  // 'q',
  'r',
  's',
  'ş', // turkish
  't',
  'u',
  'ü', // turkish
  'v',
  // 'w',
  // 'x',
  'y',
  'z',
]

const isValidKey = (e: KeyboardEvent) => {
  const { metaKey, ctrlKey, altKey } = e

  if (metaKey || ctrlKey || altKey) {
    return false
  }

  if (!VALID_KEYS.includes(e.key.toLocaleLowerCase('tr-TR'))) {
    return false
  }

  return true
}

export default function useStartTyping(fn: (e: string) => void) {
  const keydown = useCallback(
    (e: KeyboardEvent) => {
      if (!isValidKey(e)) {
        return
      }

      fn(e.key)
    },
    [fn],
  )

  useLayoutEffect(() => {
    window.addEventListener('keydown', keydown)

    return () => {
      window.removeEventListener('keydown', keydown)
    }
  }, [keydown])

  return
}
