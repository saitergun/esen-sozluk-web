'use client'

import { BaseLayout } from '@/layouts'

import { ITdkMadde } from '@/lib/prismaService/types/tdkMadde'

import Definitions from './_Definitions'
import Highlights from './_Highlights'
import MeaningsTab from './_MeaningsTab'
import Proverbs from './_Proverbs'

type Props = {
  tdkMadde: ITdkMadde
  bookmarked: boolean
  anotherMeanings: Array<{ maddeId: number }>
}

export default function PageGtsSingle({
  tdkMadde,
  bookmarked,
  anotherMeanings,
}: Props) {
  return (
    <BaseLayout appTitle={tdkMadde.madde}>
      <MeaningsTab
        anotherMeanings={anotherMeanings}
        madde={tdkMadde.madde}
        maddeId={tdkMadde.maddeId}
      />

      <Highlights
        lisan={tdkMadde.tdkData.lisan}
        telaffuz={tdkMadde.tdkData.telaffuz}
      />

      <Definitions
        tdkMadde={tdkMadde}
        bookmarked={bookmarked}
      />

      <Proverbs proverbs={tdkMadde.tdkData.atasozu} />
    </BaseLayout>
  )
}
