import { ImageResponse } from '@vercel/og'
import { ImageResponseOptions } from 'next/server'

import prismaService from '@/lib/prismaService'

import OpengraphImage from './_OpengraphImage'

type Params = {
  maddeId: string
  slug: string
}

type Props = {
  params: Params
}

export const size = { width: 1200, height: 600 }

export default async function Image({ params }: Props) {
  const tdkMadde = await prismaService.tdkMadde.getSingle(
    Number(params.maddeId),
  )

  if (!tdkMadde) {
    throw Error('Aradığın söz burada yok')
  }

  const fonts: ImageResponseOptions['fonts'] = []

  const frauncesResponse = await fetch(
    `${process.env.BASE_URL}/webfonts/Fraunces_9pt-SemiBold.ttf`,
  )

  if (frauncesResponse.status !== 404) {
    fonts.push({
      name: 'Fraunces',
      data: await frauncesResponse.arrayBuffer(),
      weight: 600,
    })
  }

  const crimsonProResponse = await fetch(
    `${process.env.BASE_URL}/webfonts/CrimsonPro-Regular.ttf`,
  )

  if (crimsonProResponse.status !== 404) {
    fonts.push({
      name: 'Crimson Pro',
      data: await crimsonProResponse.arrayBuffer(),
      weight: 400,
    })
  }

  const options: ImageResponseOptions = {
    ...size,
    fonts: fonts.length > 0 ? fonts : undefined,
  }

  return new ImageResponse(<OpengraphImage tdkMadde={tdkMadde} />, options)
}
