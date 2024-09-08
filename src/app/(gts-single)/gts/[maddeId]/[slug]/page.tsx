import prismaService from '@/lib/prismaService'

import { isBookmarked } from '@/app/actions'

import PageClient from './page.client'

type Props = {
  params: {
    maddeId: string
    slug: string
  }
}

export default async function Page({ params }: Props) {
  const tdkMadde = await prismaService.tdkMadde.getSingle(
    Number(params.maddeId),
  )

  if (!tdkMadde) {
    throw Error('Aradığın söz burada yok')
  }

  const anotherMeanings = await prismaService.tdkMadde.getAnotherMeanings(
    tdkMadde.madde,
    tdkMadde.maddeId,
  )

  const bookmarked = await isBookmarked(tdkMadde.maddeId)

  // return (
  //   <div>
  //     <pre>{JSON.stringify(tdkMadde, null, 2)}</pre>
  //   </div>
  // )

  return (
    <PageClient
      tdkMadde={tdkMadde}
      bookmarked={bookmarked}
      anotherMeanings={anotherMeanings}
    />
  )
}

export { generateMetadata } from './page.generateMetadata'
