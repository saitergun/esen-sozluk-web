import slugify from 'slugify'

export default function createGtsPathname(
  maddeId: number,
  madde: string,
): string {
  const slug = slugify(madde, {
    lower: true,
    locale: 'tr',
  })

  const pathname = `/gts/${maddeId}/${slug}`

  return pathname
}
