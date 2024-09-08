'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { RiArrowLeftLine, RiSearch2Line } from 'react-icons/ri'

import { IconButton, SearchModal } from '@/components'
import { useStartTyping } from '@/hooks'
import { Fraunces } from 'next/font/google'

const fraunces = Fraunces({ subsets: ['latin-ext'] })

type Props = {
  title: string
}

export default function TopNavbar({ title }: Props) {
  const router = useRouter()

  const [openSearchModal, setOpenSearchModal] = useState(false)

  const handleBack = useCallback(() => {
    router.back()
    router.push('/')
  }, [router])

  useStartTyping(() => setOpenSearchModal(true))

  return (
    <nav className="w-full h-12 bg-primary text-white shadow z-10" aria-hidden="false">
      <span className="h-full flex items-center sm:max-w-lg mx-auto px-1">
        <span className="flex w-[40px]">
          <IconButton
            ariaLabel="geri git"
            onClick={handleBack}
          >
            <RiArrowLeftLine />
          </IconButton>
        </span>

        <span className="flex-1 flex items-center justify-center overflow-hidden px-4">
          <h1
            className="text-18/16 font-bolder truncate"
            style={fraunces.style}
          >
            {title}
          </h1>
        </span>

        <span className="flex w-[40px]">
          <IconButton
            ariaLabel="söz ara"
            onClick={() => setOpenSearchModal(true)}
          >
            <RiSearch2Line />
          </IconButton>
        </span>
      </span>

      <SearchModal
        open={openSearchModal}
        onClose={() => setOpenSearchModal(false)}
      />
    </nav>
  )
}
