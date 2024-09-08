'use client'

import { useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { useStartTyping } from 'react-use'

import { SearchModal } from '@/components'

export default function SearchButton() {
  const [openSearchModal, setOpenSearchModal] = useState(false)

  useStartTyping(() => setOpenSearchModal(true))

  return (
    <>
      <button
        type="button"
        className="w-full h-12 flex items-center justify-center gap-3 text-20/16 text-alternative-400 cursor-text bg-white border rounded z-10 focus:outline-none focus:ring-2 ring-primary ring-inset"
        onClick={() => {
          setOpenSearchModal(true)
        }}
      >
        <RiSearch2Line />

        <span>sözcük ara</span>
      </button>

      <SearchModal
        open={openSearchModal}
        onClose={() => setOpenSearchModal(false)}
      />
    </>
  )
}
