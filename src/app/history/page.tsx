import { Metadata } from 'next'
import { RiHistoryLine } from 'react-icons/ri'

import { BaseLayout } from '@/layouts'

import { getHistory } from '../actions'
import HistoryItem from './_HistoryItem'

export const metadata: Metadata = {
  title: 'geçmiş',
}

export default async function Page() {
  const history = await getHistory()

  if (history.length === 0) {
    return (
      <BaseLayout appTitle="geçmiş">
        <div className="w-full sm:rounded-md bg-white shadow-sm">
          <div className="flex flex-col items-center justify-center gap-6 text-center p-8">
            <RiHistoryLine className="text-48/16" />

            <p className="text-20/16 leading-none">
              görüntülediğin son içerikler burada listenecek
            </p>
          </div>
        </div>
      </BaseLayout>
    )
  }

  return (
    <BaseLayout appTitle="geçmiş">
      <div className="w-full sm:rounded-md bg-white shadow-sm">
        <ul className="w-full flex flex-col divide-y divide-alternative-100">
          {history.map(({ maddeId, madde, savedAt }) => (
            <HistoryItem
              key={maddeId}
              maddeId={maddeId}
              madde={madde}
              savedAt={savedAt}
            />
          ))}
        </ul>
      </div>
    </BaseLayout>
  )
}
