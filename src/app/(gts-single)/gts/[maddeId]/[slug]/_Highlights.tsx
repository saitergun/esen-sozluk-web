import Image from 'next/image'
import React from 'react'
import { RiVolumeDownLine } from 'react-icons/ri'

import { ITdkMadde } from '@/lib/prismaService/types/tdkMadde'
import { origins } from '@/lib/utils'

type Props = {
  lisan: ITdkMadde['tdkData']['lisan']
  telaffuz: ITdkMadde['tdkData']['telaffuz']
}

export default function Highlights({ lisan, telaffuz }: Props) {
  const showHighlights = Boolean(lisan) || Boolean(telaffuz)

  if (!showHighlights) {
    return null
  }

  const originsReversed = origins
    .filter((origin) => lisan.search(origin.nameLocale) > -1)
    .reverse()

  return (
    <div className="w-full sm:rounded-md bg-white border-b-4 shadow-sm mb-4">
      <div className="w-full flex flex-col divide-y divide-alternative-100">
        {lisan && (
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="flex items-center justify-start gap-4">
              <span className="inline-flex items-center justify-start -space-x-2">
                {originsReversed.map((origin) => (
                  <Image
                    className="rounded-full ring-[3px] ring-white"
                    key={origin.code}
                    src={origin.flag}
                    alt={origin.nameLocale}
                    width={24}
                    height={24}
                  />
                ))}
              </span>

              <span className="leading-none text-17/16">{lisan}</span>
            </span>

            <span className="leading-none text-17/16">köken</span>
          </div>
        )}

        {telaffuz && (
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="flex items-center justify-start gap-4">
              <RiVolumeDownLine className="text-24/16" />

              <span
                className="leading-none text-17/16"
                dangerouslySetInnerHTML={{ __html: telaffuz }}
              />
            </span>

            <span className="leading-none text-17/16">söyleyiş</span>
          </div>
        )}
      </div>
    </div>
  )
}
