import { regexify } from '@/lib/utils'

export default function useMarkedText(text: string, query: string) {
  const regex = regexify(query)

  // return marked text
  return text.replace(
    new RegExp(regex, 'gi'),
    (string) => `<mark>${string}</mark>`,
  )
}
