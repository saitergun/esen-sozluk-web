type Props = {
  orneklerList?: TdkMaddeAnlamOrnek[]
}

export default function DefinitionExamples({ orneklerList }: Props) {
  if (!orneklerList) {
    return null
  }

  return (
    <span className="flex flex-col gap-1.5">
      {orneklerList.map((ornek) => {
        const yazar =
          ornek?.yazar && ornek.yazar.length > 0
            ? ` (${ornek.yazar.map((y) => y.tam_adi)})`
            : ''

        return (
          <blockquote
            key={ornek.ornek_id}
            className="text-15/16 text-alternative-400 leading-none"
          >
            {`${ornek.ornek}${yazar}`}
          </blockquote>
        )
      })}
    </span>
  )
}
