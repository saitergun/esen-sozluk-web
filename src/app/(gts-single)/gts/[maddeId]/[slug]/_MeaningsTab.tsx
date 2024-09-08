'use client'

import { useRouter } from 'next/navigation'

import { createGtsPathname } from '@/lib/utils'

import { Button } from '@/components'
import Link from 'next/link'

type Props = {
  madde: string
  maddeId: number
  anotherMeanings: Array<{ maddeId: number }>
}

export default function MeaningsTab({
  madde,
  maddeId,
  anotherMeanings,
}: Props) {
  const router = useRouter()

  const allMeanings = anotherMeanings
    .concat([{ maddeId: maddeId }])
    .sort((a, b) => a.maddeId - b.maddeId)

  if (allMeanings.length < 2) {
    return null
  }

  return (
    <nav className="grid grid-flow-col gap-1 rounded-sm bg-white py-1.5 px-1.5 mb-4">
      {allMeanings.map((meaning, index) => {
        const pathname = createGtsPathname(meaning.maddeId, madde)

        return (
          <Link
            key={meaning.maddeId}
            className="grid"
            href={{
              pathname,
            }}
          >
            <Button
              secondary={meaning.maddeId === maddeId}
              // onClick={() => {
              //   router.replace(pathname)
              // }}
            >{`${index + 1}. anlam`}</Button>
          </Link>
        )
      })}
    </nav>
  )
}
