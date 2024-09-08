'use client'

import Link from 'next/link'
import { forwardRef, useMemo } from 'react'
import classNames from 'classnames'

import { createGtsPathname } from '@/lib/utils'

import HighlightText from '../HighlightText'
import Kbd from '../Kbd'

type Props = {
  maddes: Array<{
    maddeId: number
    madde: string
  }>
  query?: string
  selectedIndex: number
  icon: React.ReactNode
  onFocus: (index: number) => void
}

export default forwardRef<HTMLUListElement, Props>(function Result(
  { maddes, query, selectedIndex, icon, onFocus },
  listRef,
) {
  const cmdEnterSymbols = useMemo(() => {
    if (
      typeof window === 'undefined' ||
      !navigator.userAgent.toLowerCase().includes('mac')
    ) {
      return ['ctrl', '⏎']
    }

    return ['⌘', '⏎']
  }, [])

  return (
    <ul
      className="flex flex-col"
      ref={listRef}
    >
      {maddes.map(({ maddeId, madde }, index) => {
        const pathname = createGtsPathname(maddeId, madde)

        return (
          <li key={index}>
            <Link
              prefetch
              href={{ pathname }}
              className={classNames(
                'flex items-center justify-start gap-4 py-3 px-4 rounded cursor-pointer',
                'hover:bg-alternative-50 active:bg-primary-100',
                'focus:outline-none focus:bg-primary-50 focus:ring-1 ring-inset ring-primary-300 ring-offset-0 ring-offset-white',
              )}
              onFocus={() => onFocus(index)}
            >
              <span className="flex-shrink-0">{icon}</span>

              <p className="w-full leading-none">
                {query ? (
                  <HighlightText
                    text={madde}
                    query={query}
                  />
                ) : (
                  madde
                )}
              </p>

              <span className="only-no-touch">
                {selectedIndex === -1 && index === 0 && (
                  <Kbd symbols={cmdEnterSymbols} />
                )}

                {selectedIndex > -1 && selectedIndex === index && (
                  <Kbd symbols={['⏎']} />
                )}
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
})
