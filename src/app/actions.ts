'use server'

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

export type HistoryItem = {
  maddeId: number
  madde: string
  savedAt: string
}

export type BookmarkItem = {
  maddeId: number
  madde: string
  bookmarkedAt: string
}

const cookieConfig: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: true,
  maxAge: 60 * 60 * 24 * 7 * 52, // 52 weeks
}

export async function getHistory() {
  try {
    const savedHistory = cookies().get('savedHistory')

    const savedHistoryParsed: HistoryItem[] = savedHistory
      ? JSON.parse(savedHistory.value)
      : []

    return savedHistoryParsed
  } catch (error) {
    return []
  }
}

export async function addToHistory({
  maddeId,
  madde,
}: {
  maddeId: number
  madde: string
}) {
  const newHistoryItem: HistoryItem = {
    maddeId,
    madde,
    savedAt: new Date().toISOString(),
  }

  try {
    const savedHistory = cookies().get('savedHistory')

    if (!savedHistory) {
      cookies().set(
        'savedHistory',
        JSON.stringify([newHistoryItem]),
        cookieConfig,
      )

      return
    }

    const nextSavedHistory: HistoryItem[] = JSON.parse(savedHistory.value)
      .filter(
        (h: HistoryItem) =>
          h.madde.toLocaleLowerCase() !== madde.toLocaleLowerCase(),
      )
      .slice(0, 19)

    nextSavedHistory.unshift(newHistoryItem)

    cookies().set(
      'savedHistory',
      JSON.stringify(nextSavedHistory),
      cookieConfig,
    )
  } catch (error) {
    cookies().set(
      'savedHistory',
      JSON.stringify([newHistoryItem]),
      cookieConfig,
    )
  }
}

export async function removeFromHistory(maddeId: number) {
  try {
    const savedHistory = cookies().get('savedHistory')

    if (!savedHistory) {
      cookies().set('savedHistory', JSON.stringify([]))

      return
    }

    let nextSavedHistory: HistoryItem[] = JSON.parse(savedHistory.value)

    nextSavedHistory = nextSavedHistory.filter(
      (historyItem) => historyItem.maddeId !== maddeId,
    )

    cookies().set('savedHistory', JSON.stringify(nextSavedHistory))
  } catch (error) {
    cookies().set('savedHistory', JSON.stringify([]))
  }
}

export async function getBookmarks() {
  try {
    const savedBookmarks = cookies().get('savedBookmarks')

    const savedBookmarksParsed: BookmarkItem[] = savedBookmarks
      ? JSON.parse(savedBookmarks.value)
      : []

    return savedBookmarksParsed
  } catch (error) {
    return []
  }
}

export async function isBookmarked(maddeId: number) {
  try {
    const savedBookmarks = cookies().get('savedBookmarks')

    const savedBookmarksParsed: BookmarkItem[] = savedBookmarks
      ? JSON.parse(savedBookmarks.value)
      : []

    return savedBookmarksParsed.some((bookmark) => bookmark.maddeId === maddeId)
  } catch (error) {
    return false
  }
}

export async function addToBookmarks({
  maddeId,
  madde,
}: {
  maddeId: number
  madde: string
}) {
  const newBookmarkItem: BookmarkItem = {
    maddeId,
    madde,
    bookmarkedAt: new Date().toISOString(),
  }

  try {
    const savedBookmarks = cookies().get('savedBookmarks')

    if (!savedBookmarks) {
      cookies().set(
        'savedBookmarks',
        JSON.stringify([newBookmarkItem]),
        cookieConfig,
      )

      return
    }

    const nextSavedBookmarks: BookmarkItem[] = JSON.parse(savedBookmarks.value)
      .filter(
        (h: BookmarkItem) =>
          h.madde.toLocaleLowerCase() !== madde.toLocaleLowerCase(),
      )
      .slice(0, 19)

    nextSavedBookmarks.unshift(newBookmarkItem)

    cookies().set(
      'savedBookmarks',
      JSON.stringify(nextSavedBookmarks),
      cookieConfig,
    )
  } catch (error) {
    cookies().set(
      'savedBookmarks',
      JSON.stringify([newBookmarkItem]),
      cookieConfig,
    )
  }
}

export async function removeFromBookmarks(maddeId: number) {
  try {
    const savedBookmarks = cookies().get('savedBookmarks')

    if (!savedBookmarks) {
      cookies().set('savedBookmarks', JSON.stringify([]))

      return
    }

    let nextSavedBookmarks: BookmarkItem[] = JSON.parse(savedBookmarks.value)

    nextSavedBookmarks = nextSavedBookmarks.filter(
      (bookmarkItem) => bookmarkItem.maddeId !== maddeId,
    )

    cookies().set('savedBookmarks', JSON.stringify(nextSavedBookmarks))
  } catch (error) {
    cookies().set('savedBookmarks', JSON.stringify([]))
  }
}
