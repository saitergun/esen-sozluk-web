import { RiSearch2Line } from 'react-icons/ri'

import { MessageCard } from '@/components'
import { BaseLayout } from '@/layouts'
import { Metadata } from 'next'

const title = 'Sayfa Bulunamadı'
const message = 'Aradığın şey burada yok'

export const metadata: Metadata = {
  title,
  description: message,
}

export default function NotFound() {
  return (
    <BaseLayout appTitle={title}>
      <MessageCard
        icon={<RiSearch2Line />}
        message={message}
      />
    </BaseLayout>
  )
}
