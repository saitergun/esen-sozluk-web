'use client'

import { cloneElement } from 'react'

import { Button } from '@/components'

type Props = {
  icon: JSX.Element
  message: string
  /**
   * @default 'Yeniden dene'
   */
  buttonLabel?: string
  onClickButton?: () => void
}

export default function MessageCard({
  icon,
  message,
  buttonLabel,
  onClickButton,
}: Props) {
  return (
    <div className="w-full sm:rounded-md bg-white border-b-4 shadow-sm">
      <div className="flex flex-col items-center justify-center gap-4 text-center p-8">
        {icon &&
          cloneElement(icon, {
            className: 'text-60/16',
          })}

        {message && <p className="text-20/16 leading-none">{message}</p>}

        {onClickButton && (
          <Button
            onClick={onClickButton}
            primary
          >
            {buttonLabel ?? 'Yeniden dene'}
          </Button>
        )}
      </div>
    </div>
  )
}
