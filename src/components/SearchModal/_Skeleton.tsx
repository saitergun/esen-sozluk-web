import _random from 'lodash/random'

type Props = {
  queryLength: number
}

export default function Skeleton({ queryLength }: Props) {
  const randomItemsCount = _random(3, 8)

  return (
    <ul className="flex flex-col">
      {Array(randomItemsCount)
        .fill(0)
        .map((_, index) => {
          const width = `${_random(queryLength, queryLength + 20)}%`

          return (
            <li
              className="flex items-center justify-start gap-3 py-3 px-4"
              key={index}
            >
              <span className="block w-4 h-4 bg-alternative-200 animate-pulse rounded-full" />

              <span
                className="block h-3 bg-alternative-200 animate-pulse rounded-sm my-0.5"
                style={{ width }}
              />
            </li>
          )
        })}
    </ul>
  )
}
