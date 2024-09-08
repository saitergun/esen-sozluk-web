import { Metadata } from 'next'
import { RiBookmarkLine } from 'react-icons/ri'

import { BaseLayout } from '@/layouts'

import { getBookmarks } from '../actions'
import BookmarkItem from './_BookmarkItem'

export const metadata: Metadata = {
  title: 'kayıtlı',
}

export default async function Page() {
  const bookmarks = await getBookmarks()

  if (bookmarks.length === 0) {
    return (
      <BaseLayout appTitle="kayıtlı">
        <div className="w-full sm:rounded-md bg-white shadow-sm">
          <div className="flex flex-col items-center justify-center gap-6 text-center p-8">
            <RiBookmarkLine className="text-48/16" />

            <p className="text-20/16 leading-none">kaydettiğin içerikler burada listenecek</p>
          </div>
        </div>
      </BaseLayout>
    )
  }

  return (
    <BaseLayout appTitle="kayıtlı">
      <div className="w-full sm:rounded-md bg-white shadow-sm">
        <ul className="w-full flex flex-col divide-y divide-alternative-100">
          {bookmarks.map(({ maddeId, madde, bookmarkedAt }) => (
            <BookmarkItem
              key={maddeId}
              maddeId={maddeId}
              madde={madde}
              bookmarkedAt={bookmarkedAt}
            />
          ))}
        </ul>
      </div>
    </BaseLayout>
  )
}
