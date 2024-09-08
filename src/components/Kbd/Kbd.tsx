import classNames from 'classnames'
import React from 'react'

type Props = {
  symbols: string[]
  larger?: boolean
}

export default function Kbd({ symbols, larger }: Props) {
  return (
    <span className="flex-shrink-0 flex items-center gap-1 text-alternative-500 leading-none">
      {symbols.map((symbol, index, arr) => {
        const haveMoreSymbol = arr.length > index + 1

        return (
          <React.Fragment key={index}>
            <kbd
              className={classNames(
                'bg-white text-12/16 border border-alternative-100 border-b shadow-sm rounded px-1 select-none',
                {
                  'py-px': !larger,
                  'py-1': larger,
                },
              )}
            >
              {symbol}
            </kbd>

            {haveMoreSymbol && (
              <span
                className={classNames({
                  'text-12/16': !larger,
                  'text-14/16': larger,
                })}
              >
                +
              </span>
            )}
          </React.Fragment>
        )
      })}
    </span>
  )
}
