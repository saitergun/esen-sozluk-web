import _random from 'lodash/random'

import autocompleteJson from '@/assets/autocomplete.json'

import regexify from './regexify'

export function latinize(string: string) {
  return string
    .toLowerCase()
    .replace('â', 'a')
    .replace('î', 'i')
    .replace('İ', 'i')
    .replace('ı', 'i')
    .replace('û', 'u')
    .replace('ü', 'u')
    .replace('ş', 's')
    .replace('ö', 'o')
    .replace('ç', 'c')
    .replace('ğ', 'g')
}

export function scoreMaddesByQuery(
  maddes: [number, string][],
  query: string,
): [number, string, number][] {
  const result = maddes.map<[number, string, number]>(([maddeId, madde]) => {
    const madde2 = latinize(madde)
    const query2 = latinize(query)

    const indexOf = madde2.indexOf(query2)

    const isExactMatchLength = query2.length === madde2.length

    let score = 0

    if (!isExactMatchLength && indexOf === 0) {
      const slicedLength = madde2.slice(query2.length).length

      score = 1 + Number((slicedLength / 10).toFixed(2))
    }

    if (!isExactMatchLength && indexOf !== 0) {
      const slicedLength = madde2.replace(query2, '').length

      score = 3 + Number((slicedLength / 10).toFixed(2))
    }

    if (madde === query) {
      score = -1
    }

    return [maddeId, madde, score]
  })

  return result
}

export default function searchMadde(
  query: string,
  options: { limit?: number; removeDuplicates?: boolean } = {},
) {
  const maddes = autocompleteJson as [number, string][]

  const regex = new RegExp(regexify(query), 'gi')

  // filter
  let result = maddes.filter(([, madde]) => {
    // filter by query length
    return (
      madde.length >= query.length &&
      // filter by regex
      madde.match(regex)
    )
  })

  let scoredResult = scoreMaddesByQuery(result, query)

  // sort by score
  scoredResult = scoredResult.sort(([, , a], [, , b]) => a - b)

  // remove scores
  result = scoredResult.map<[number, string]>(([maddeId, madde]) => [
    maddeId,
    madde,
  ])

  // slice by limit
  if (options?.limit !== 0) {
    result = result.slice(0, options?.limit ?? 20)
  }

  // remove same values
  if (options.removeDuplicates) {
    result = result.filter(
      (resultItem, index, self) =>
        self.findIndex(
          ([, madde]) =>
            madde.toLocaleLowerCase('tr-TR') ===
            resultItem[1].toLocaleLowerCase('tr-TR'),
        ) === index,
    )
  }

  return result
}

export function getRandomAutocompleteItem(
  initialItems: [number, string][] = [],
) {
  const autocomplete = autocompleteJson as [number, string][]

  const items = initialItems

  const randomNumber = _random(0, autocomplete.length - 1)

  const item = autocomplete[randomNumber]

  if (item && !items.some(([maddeId]) => maddeId === item[0])) {
    items.push(item)
  }

  if (items.length < 10) {
    return getRandomAutocompleteItem(items)
  }

  return items
}
