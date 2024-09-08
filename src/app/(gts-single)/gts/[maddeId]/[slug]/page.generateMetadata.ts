import { Metadata } from 'next/types'

import prismaService from '@/lib/prismaService'
import { cleanDefinition, createGtsPathname } from '@/lib/utils'

type Props = {
  params: {
    maddeId: string
    slug: string
  }
}

const metadata: Metadata = {
  openGraph: {
    type: 'article',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tdkMadde = await prismaService.tdkMadde.getSingle(
    Number(params.maddeId),
  )

  if (!tdkMadde) {
    return metadata
  }

  const [firstDefinition] = tdkMadde.tdkData.anlamlarListe
    ? tdkMadde.tdkData.anlamlarListe.sort(
        (a, b) => Number(a.anlam_sira) - Number(b.anlam_sira),
      )
    : []

  const a = cleanDefinition(firstDefinition.anlam)

  const description = a.length > 150 ? `${a.slice(0, 150)}...` : a

  const title = tdkMadde.madde

  return {
    ...metadata,

    title,
    description,

    openGraph: {
      title,
      siteName: title,
      url:
        process.env.BASE_URL +
        createGtsPathname(tdkMadde.maddeId, tdkMadde.madde),
    },

    twitter: {
      card: 'summary_large_image',
      title,
    },
  }
}
