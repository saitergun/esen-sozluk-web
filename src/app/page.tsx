import { Fraunces } from 'next/font/google'
import prismaService from '@/lib/prismaService'

import { ESLink } from '@/components'

import SearchButton from './page.SearchButton'

const fraunces = Fraunces({ subsets: ['latin-ext'] })

export default async function Page() {
  prismaService.tdkMadde.knock()

  return (
    <div className="w-full min-h-full border-t-4 border-primary">
      <main className="max-w-lg mx-auto flex flex-col gap-6 pt-32 px-4">
        <h1
          style={fraunces.style}
          className="text-center leading-none font-600 text-48/16 sm:text-60/16 text-primary select-none"
        >
          esen sözlük
        </h1>

        <SearchButton />

        <nav className="flex items-center justify-center px-4">
          <ul className="flex items-center gap-4">
            <li>
              <ESLink
                href="/bookmarks"
                text="kayıtlı"
              />
            </li>

            <li>
              <ESLink
                href="/history"
                text="geçmiş"
              />
            </li>
          </ul>
        </nav>
      </main>
    </div>
  )
}
