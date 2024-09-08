'use client'

import Link from 'next/link'
import { useState } from 'react'
import classNames from 'classnames'
import { RiFileTextLine } from 'react-icons/ri'
import { Fraunces } from 'next/font/google'

import { createGtsPathname } from '@/lib/utils'

type Props = {
  proverbs?: Array<TdkMaddeAtasozu>
}

const fraunces = Fraunces({ subsets: ['latin-ext'] })

const LIMIT = 3

export default function Proverbs({ proverbs }: Props) {
  const [showAll, setShowAll] = useState(false)

  if (!proverbs) {
    return null
  }

  const showFooter = proverbs.length > LIMIT && !showAll

  return (
    <section className="w-full sm:rounded-md bg-white border-b-4 shadow-sm">
      <header className="border-b py-2.5 px-4">
        <h3 style={fraunces.style} className="text-24/16 leading-none">
          atasözleri ve deyimler
        </h3>
      </header>

      <main className="w-full">
        <ul className="flex flex-col divide-y divide-alternative-100">
          {proverbs
            .slice(0, !showAll ? LIMIT : undefined)
            .map(({ madde, madde_id, on_taki }) => {
              const label = on_taki ? `${on_taki} ${madde}` : madde

              return (
                <li
                  className="group"
                  key={madde_id}
                >
                  <Link
                    prefetch
                    className={classNames(
                      [
                        'py-3 px-4 cursor-pointer',
                        'flex items-center justify-start gap-3',
                        'hover:bg-primary-50 active:bg-primary-100 focus:bg-primary-50',
                        'focus:outline-none focus:ring-1 ring-inset ring-primary-400 ring-offset-0 ring-offset-white',
                      ],
                      {
                        'sm:group-last:rounded-b-md': !showFooter,
                      },
                    )}
                    href={{
                      pathname: createGtsPathname(madde_id, madde),
                    }}
                  >
                    <figure>
                      <RiFileTextLine />
                    </figure>

                    <p className="text-17/16 leading-none">{label}</p>
                  </Link>
                </li>
              )
            })}
        </ul>
      </main>

      {showFooter && (
        <footer className="grid border-t border-alternative-100">
          <button
            className="hover:bg-alternative-50 focus:outline-none focus:bg-primary-50 focus:ring-1 ring-inset ring-primary-400 font-600 leading-none py-2.5"
            onClick={() => setShowAll(true)}
          >{`tümünü göster (${proverbs.length - LIMIT} daha)`}</button>
        </footer>
      )}
    </section>
  )
}
