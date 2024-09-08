'use client'

import { RiCloseLine } from 'react-icons/ri'

import { createGtsPathname } from '@/lib/utils'

import { removeFromBookmarks } from '../actions'

import { ESLink, IconButton } from '@/components'

type Props = {
  maddeId: number
  madde: string
  bookmarkedAt: string
}

export default function BookmarkItem({ maddeId, madde }: Props) {
  return (
    <li
      key={maddeId}
      className="flex items-center justify-between gap-3 px-4 py-1.5"
    >
      <ESLink
        href={createGtsPathname(maddeId, madde)}
        text={madde}
      />

      <IconButton
        small
        onClick={() => removeFromBookmarks(maddeId)}
      >
        <RiCloseLine className="text-alternative-500" />
      </IconButton>
    </li>
  )
}
