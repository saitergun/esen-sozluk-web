'use client'

import { useCallback, useEffect, useState } from 'react'
import { RiBookmarkFill, RiBookmarkLine, RiTwitterXFill } from 'react-icons/ri'
import { Fraunces } from 'next/font/google'

import { ITdkMadde } from '@/lib/prismaService/types/tdkMadde'

import { createGtsPathname } from '@/lib/utils'

import {
  addToBookmarks,
  addToHistory,
  removeFromBookmarks,
} from '@/app/actions'
import { IconButton } from '@/components'

import Definition from './_Definition'

const fraunces = Fraunces({ subsets: ['latin-ext'] })

type Props = {
  tdkMadde: ITdkMadde
  bookmarked: boolean
}

export default function Definitions({ tdkMadde, bookmarked }: Props) {
  const [localBookmarked, setLocalBookmarked] = useState(bookmarked)

  const handleShareWithX = useCallback(async () => {
    const url =
      typeof window !== 'undefined'
        ? window.location.origin +
          createGtsPathname(tdkMadde.maddeId, tdkMadde.madde)
        : ''

    window.open(`https://x.com/intent/post?text=${url}`)
  }, [tdkMadde.madde, tdkMadde.maddeId])

  const handleBookmark = useCallback(() => {
    setLocalBookmarked(!bookmarked)

    if (bookmarked) {
      removeFromBookmarks(tdkMadde.maddeId)
    } else {
      addToBookmarks({
        maddeId: tdkMadde.maddeId,
        madde: tdkMadde.madde,
      })
    }
  }, [bookmarked, tdkMadde.madde, tdkMadde.maddeId])

  useEffect(() => {
    addToHistory({
      maddeId: tdkMadde.maddeId,
      madde: tdkMadde.madde,
    })
  }, [tdkMadde.madde, tdkMadde.maddeId])

  const sortedAnlamlarListe = tdkMadde.tdkData.anlamlarListe
    ? tdkMadde.tdkData.anlamlarListe.sort(
        (a, b) => Number(a.anlam_sira) - Number(b.anlam_sira),
      )
    : []

  return (
    <section className="w-full sm:rounded-md bg-white border-b-4 shadow-sm mb-4">
      <header className="flex items-start justify-between gap-4 border-b py-3 px-4">
        <h2
          style={fraunces.style}
          className="flex-1 text-36/16 font-bolder leading-none"
        >
          {tdkMadde.tdkData.madde}
        </h2>

        <span className="flex-shrink-0 flex items-center gap-2">
          <IconButton
            ariaLabel="X'de (eskiden Twitter) paylaş"
            onClick={handleShareWithX}
          >
            <RiTwitterXFill />
          </IconButton>

          <span className="block w-px h-4 bg-alternative-200" />

          <IconButton
            ariaLabel={localBookmarked ? 'kaydedilenlerden çıkar' : 'kaydet'}
            onClick={handleBookmark}
          >
            {localBookmarked ? (
              <RiBookmarkFill className="text-primary" />
            ) : (
              <RiBookmarkLine />
            )}
          </IconButton>
        </span>
      </header>

      {sortedAnlamlarListe && (
        <main>
          <ul className="flex flex-col divide-y divide-alternative-100">
            {sortedAnlamlarListe.map((anlam) => (
              <Definition
                key={anlam.anlam_id}
                anlam={anlam.anlam}
                ozelliklerListe={anlam.ozelliklerListe}
                orneklerListe={anlam.orneklerListe}
              />
            ))}
          </ul>
        </main>
      )}
    </section>
  )
}
