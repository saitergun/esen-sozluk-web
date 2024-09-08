import classNames from 'classnames'
import Link from 'next/link'
import { cloneElement } from 'react'
import { UrlObject } from 'url'

export type BottomNavbarItem = {
  title: string
  href: UrlObject
  icon: JSX.Element
}

type Props = {
  items: BottomNavbarItem[]
}

export default function BottomNavbar({ items }: Props) {
  if (items.length === 0) {
    return null
  }

  return (
    <nav className="fixed left-0 bottom-0 right-0 w-full h-13 flex justify-center z-20">
      <div className="w-full sm:max-w-lg">
        <span
          className={classNames(
            'h-full grid content-center bg-white sm:max-w-lg mx-auto border-t shadow-sm sm:border-l sm:border-r sm:rounded-t-sm px-4 overflow-hidden',
            {
              'grid-cols-1': items.length === 1,
              'grid-cols-2': items.length === 2,
              'grid-cols-3': items.length === 3,
            },
          )}
        >
          {items.map(({ title, href, icon }) => {
            return (
              <Link
                key={title}
                href={href}
                aria-label={title}
                prefetch
                className="group flex items-center justify-center focus:outline-none"
              >
                <span className="w-20 h-20 flex items-center justify-center group-hover:bg-secondary-100 group-focus:bg-secondary-200 group-active:bg-secondary-300 rounded-full transition-colors duration-200">
                  {cloneElement(icon, { className: 'text-24/16' })}
                </span>
              </Link>
            )
          })}
        </span>
      </div>
    </nav>
  )
}
