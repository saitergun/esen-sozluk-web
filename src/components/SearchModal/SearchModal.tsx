'use client'

import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useClickAway, useDebounce, useStartTyping } from 'react-use'
import { RiHistoryLine, RiLightbulbLine, RiSearch2Line } from 'react-icons/ri'
import classNames from 'classnames'

import { getHistory, HistoryItem } from '@/app/actions'

import { createGtsPathname, searchMadde } from '@/lib/utils'

import Backdrop from './_Backdrop'
import Input from './_Input'
import Result from './_Result'
import Skeleton from './_Skeleton'
import { getRandomAutocompleteItem } from '@/lib/utils/searchMadde'

type Params = {
  maddeId: string
  slug: string
}

type Props = {
  open: boolean
  onClose: () => void
}

export default function SearchModal({ open, onClose }: Props) {
  const params = useParams<Params>()
  const router = useRouter()

  const [history, setHistory] = useState<HistoryItem[]>([])

  const [isClient, setIsClient] = useState(false)

  const [query, setQuery] = useState('')

  const [searchResult, setSearchResult] = useState<
    Array<{ maddeId: number; madde: string }>
  >([])

  const [randomItems, setRandomItems] = useState<
    Array<{ maddeId: number; madde: string }>
  >([])

  const [showSkeleton, setShowSkeleton] = useState(false)
  const [showListHistory, setShowListHistory] = useState(true)
  const [showListResult, setShowListResult] = useState(false)

  const [selectedIndex, setSelectedIndex] = useState(-1)

  const searchBoxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultListRef = useRef<HTMLUListElement>(null)

  const showRandomMaddes = useMemo(() => {
    return !(
      showSkeleton ||
      showListResult ||
      (showListHistory && history.length > 0)
    )
  }, [history.length, showListHistory, showListResult, showSkeleton])

  const handleClearInput = useCallback(() => {
    setSelectedIndex(-1)
    setShowSkeleton(false)
    setShowListResult(false)
    setShowListHistory(true)
    setQuery('')
  }, [])

  const handleChangeValue = useCallback((value: string) => {
    setSelectedIndex(-1)
    setShowSkeleton(value !== '')
    setShowListResult(false)

    if (value === '') {
      setSearchResult([])
      setShowListHistory(true)
    } else {
      setShowListHistory(false)
    }

    setQuery(value)
  }, [])

  const handleClose = useCallback(() => {
    setQuery('')
    setSearchResult([])
    setShowListResult(false)

    inputRef.current?.focus()

    onClose()
  }, [onClose])

  const handleSearch = useCallback(() => {
    if (query === '') {
      setSearchResult([])
      setShowSkeleton(false)
      setShowListHistory(true)
      setSelectedIndex(-1)

      return
    }

    const result = searchMadde(query, { removeDuplicates: true })

    const resultMapped = result.map(([maddeId, madde]) => ({
      maddeId,
      madde,
    }))

    setSearchResult(resultMapped)

    setShowListResult(true)
    setShowSkeleton(false)
    setShowListHistory(false)
  }, [query])

  const handleKeydownArrow = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        e.preventDefault()
      }

      if (e.code === 'ArrowUp') {
        if (e.metaKey) {
          setSelectedIndex(0)
        } else {
          if (selectedIndex >= 0) {
            setSelectedIndex(selectedIndex - 1)
          }

          if (selectedIndex < 1) {
            inputRef.current?.focus()
          }
        }
      }

      if (e.code === 'ArrowDown') {
        const allowForSearchResult =
          searchResult.length > 0 && searchResult.length - 1 > selectedIndex

        const allowForHistory =
          showListHistory &&
          history.length > 0 &&
          history.length - 1 > selectedIndex

        const lastIndex = showListHistory
          ? history.length - 1
          : searchResult.length - 1

        if (e.metaKey) {
          setSelectedIndex(lastIndex)
        } else if (allowForSearchResult || allowForHistory) {
          setSelectedIndex(selectedIndex + 1)
        }
      }
    },
    [history.length, searchResult.length, selectedIndex, showListHistory],
  )

  const handleKeydownEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        handleClose()
      }
    },
    [handleClose],
  )

  const handleKeydownEnter = useCallback(
    (e: KeyboardEvent) => {
      // press enter when walking on result
      if (e.code === 'Enter' && selectedIndex >= 0) {
        if (showListHistory) {
          const { maddeId, madde } = history[selectedIndex]

          router.push(createGtsPathname(maddeId, madde))

          return
        }

        const { maddeId, madde } = searchResult[selectedIndex]

        router.push(createGtsPathname(maddeId, madde))
      }

      // press enter + cmd or ctrl
      if (
        e.code === 'Enter' &&
        (e.metaKey || e.ctrlKey) &&
        !showSkeleton &&
        searchResult.length > 0
      ) {
        if (searchResult.length > 0) {
          const { maddeId, madde } = searchResult[0]

          if (maddeId === Number(params.maddeId)) {
            setQuery('')
            onClose()

            return
          }

          router.push(createGtsPathname(maddeId, madde))
        }
      }
    },
    [
      history,
      router,
      searchResult,
      selectedIndex,
      showListHistory,
      showSkeleton,
      params,
    ],
  )

  const handleBlurWindow = useCallback(() => {
    setSelectedIndex(-1)
  }, [])

  const handleSetHistory = useCallback(async () => {
    const history = await getHistory()

    setHistory(history.slice(1))
  }, [])

  useClickAway(searchBoxRef, handleClose)

  useDebounce(handleSearch, 200, [query])

  useStartTyping(() => {
    inputRef.current?.focus()
  })

  // focus to input when mount
  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  // listen keydown Arrow
  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleKeydownArrow)
    }

    return () => {
      window.removeEventListener('keydown', handleKeydownArrow)
    }
  }, [open, handleKeydownArrow])

  // listen keydown Escape
  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleKeydownEscape)
    }

    return () => {
      window.removeEventListener('keydown', handleKeydownEscape)
    }
  }, [open, handleKeydownEscape])

  // listen keydown Enter
  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleKeydownEnter)
    }

    return () => {
      window.removeEventListener('keydown', handleKeydownEnter)
    }
  }, [open, handleKeydownEnter])

  useEffect(() => {
    if (open) {
      window.addEventListener('blur', handleBlurWindow)
    }

    return () => {
      window.removeEventListener('blur', handleBlurWindow)
    }
  }, [open, handleBlurWindow])

  // set is client status
  useEffect(() => {
    if (window.document.body) {
      setIsClient(true)
    }
  }, [])

  // set history
  useEffect(() => {
    handleSetHistory()
  }, [handleSetHistory, open])

  // focus link by selected index
  useEffect(() => {
    if (resultListRef.current) {
      const links = resultListRef.current.querySelectorAll('a')

      const selectedLink = links[selectedIndex]

      if (selectedLink) {
        selectedLink.focus()
      }
    }
  }, [selectedIndex])

  // set random items
  useEffect(() => {
    const items = getRandomAutocompleteItem()

    const itemsMapped = items.map(([maddeId, madde]) => ({
      maddeId,
      madde,
    }))

    setRandomItems(itemsMapped)
  }, [])

  if (!isClient) {
    return
  }

  return createPortal(
    <>
      {open && (
        <div
          className={classNames(
            'fixed inset-0 w-full h-full overflow-hidden sm:py-16 z-50',
            { hidden: !open },
          )}
        >
          <Backdrop />

          <div className="w-full h-full sm:max-w-lg mx-auto">
            <div
              className="relative flex flex-col w-full h-full sm:h-auto max-h-full bg-white sm:rounded-t-md sm:rounded-b-md"
              ref={searchBoxRef}
            >
              <header className="flex-shrink-0 relative z-10 border-b shadow-sm">
                <Input
                  query={query}
                  ref={inputRef}
                  onChange={handleChangeValue}
                  onClear={handleClearInput}
                  onClose={handleClose}
                />
              </header>

              <main className="w-full h-full overflow-y-auto p-2">
                {showRandomMaddes && (
                  <Result
                    maddes={randomItems}
                    query={query}
                    selectedIndex={selectedIndex}
                    icon={<RiLightbulbLine />}
                    ref={resultListRef}
                    onFocus={setSelectedIndex}
                  />
                )}

                {showSkeleton && <Skeleton queryLength={query.length} />}

                {showListResult && searchResult.length === 0 && (
                  <div className="flex flex-col items-center gap-4 text-center p-4">
                    <p className="text-18/16 text-alternative-400 leading-none">
                      sonuç yok
                    </p>
                  </div>
                )}

                {showListResult && searchResult.length > 0 && (
                  <Result
                    maddes={searchResult}
                    query={query}
                    selectedIndex={selectedIndex}
                    icon={<RiSearch2Line />}
                    ref={resultListRef}
                    onFocus={setSelectedIndex}
                  />
                )}

                {showListHistory && (
                  <Result
                    maddes={history}
                    selectedIndex={selectedIndex}
                    icon={<RiHistoryLine />}
                    ref={resultListRef}
                    onFocus={setSelectedIndex}
                  />
                )}
              </main>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body,
  )
}
