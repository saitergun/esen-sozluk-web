'use client'

import { RiCloseLine } from 'react-icons/ri'

import { createGtsPathname } from '@/lib/utils'

import { removeFromHistory } from '../actions'

import { ESLink, IconButton } from '@/components'

type Props = {
  maddeId: number
  madde: string
  savedAt: string
}

export default function HistoryItem({ maddeId, madde }: Props) {
  return (
    <li
      key={maddeId}
      className="flex items-center justify-between gap-3 px-4 py-1.5"
    >
      <span className="flex flex-col gap-1">
        <ESLink
          href={createGtsPathname(maddeId, madde)}
          text={madde}
        />
      </span>

      <IconButton
        small
        onClick={() => removeFromHistory(maddeId)}
      >
        <RiCloseLine />
      </IconButton>
    </li>
  )
}
