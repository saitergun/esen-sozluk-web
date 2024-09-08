import { RiBookmarkLine, RiHomeLine, RiTimeLine } from 'react-icons/ri'

import BottomNavbar from './_BottomNavbar'
import TopNavbar from './_TopNavbar'

type Props = {
  appTitle?: string
  children: React.ReactNode
}

const BOTTOM_NAVBAR_ITEMS = [
  {
    title: 'anasayfa',
    href: {
      pathname: '/',
    },
    icon: <RiHomeLine />,
  },
  {
    title: 'kayıtlı',
    href: {
      pathname: '/bookmarks',
    },
    icon: <RiBookmarkLine />,
  },
  {
    title: 'geçmiş',
    href: {
      pathname: '/history',
    },
    icon: <RiTimeLine />,
  },
]

export default function BaseLayout({ children, appTitle }: Props) {
  return (
    <>
      <TopNavbar title={appTitle ?? 'yükleniyor'} />

      <div className="w-full sm:max-w-lg mx-auto pt-4 pb-17">{children}</div>

      <BottomNavbar items={BOTTOM_NAVBAR_ITEMS} />
    </>
  )
}
