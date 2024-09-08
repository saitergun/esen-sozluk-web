'use client'

import { RiSearch2Line } from 'react-icons/ri'

import { MessageCard } from '@/components'
import { BaseLayout } from '@/layouts'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  return (
    <BaseLayout appTitle="Hata Oluştu">
      <MessageCard
        icon={<RiSearch2Line />}
        message={error.message}
        onClickButton={() => reset()}
      />
    </BaseLayout>
  )
}
