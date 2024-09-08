import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'

type Props =
  | {
      children?: React.ReactNode
      text: string
      href: Url
    }
  | {
      children: React.ReactNode
      text?: string
      href: Url
    }

export default function ESLink({ href, children, text }: Props) {
  return (
    <Link
      prefetch
      className="block leading-none text-17/16 hover:underline hover:bg-secondary-200 active:bg-secondary-300 focus:outline-none focus:bg-secondary-100 rounded-sm"
      href={href}
    >
      {text ?? children}
    </Link>
  )
}
