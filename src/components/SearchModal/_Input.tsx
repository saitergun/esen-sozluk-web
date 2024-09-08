import { ChangeEvent, forwardRef, useCallback } from 'react'
import { RiArrowLeftLine, RiDeleteBack2Line } from 'react-icons/ri'

import IconButton from '../IconButton'
import Kbd from '../Kbd'

type Props = {
  query: string
  onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void
  onClose: () => void
  onClear: () => void
}

export default forwardRef<HTMLInputElement, Props>(function Input(
  { query, onChange, onClose, onClear },
  ref,
) {
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget

    if (value.slice(-2) === '  ') {
      return
    }

    if (value && value.split('').every((l) => l === ' ')) {
      return
    }

    onChange(value, e)
  }, [])
  return (
    <div className="relative">
      <span className="absolute left-1 top-1 sm:left-2 sm:top-2 text-alternative-600">
        <IconButton
          ariaLabel="kapat"
          onClick={onClose}
        >
          <RiArrowLeftLine />
        </IconButton>
      </span>

      <input
        type="text"
        className="w-full h-12 sm:h-14 bg-transparent text-center text-18/16 placeholder-alternative-300 px-12 focus:outline-none sm:rounded-t-md"
        placeholder="yazmaya başla"
        value={query}
        onChange={handleChange}
        ref={ref}
      />

      <span className="absolute right-2 top-0 bottom-0 flex items-center text-alternative-400">
        {query === '' && (
          <span className="only-no-touch px-2">
            <Kbd
              symbols={['esc']}
              larger
            />
          </span>
        )}

        {query !== '' && (
          <IconButton
            ariaLabel="temizle"
            onClick={onClear}
          >
            <RiDeleteBack2Line />
          </IconButton>
        )}
      </span>
    </div>
  )
})
