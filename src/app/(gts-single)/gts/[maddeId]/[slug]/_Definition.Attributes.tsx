type Props = {
  ozelliklerListe?: TdkMaddeAnlamOzellik[]
}

export default function DefinitionAttributes({ ozelliklerListe }: Props) {
  if (!ozelliklerListe) {
    return null
  }

  return ozelliklerListe.map((ozellik) => (
    <span
      key={ozellik.ozellik_id}
      className="mr-2"
    >
      <span className="text-center text-16/16 rounded-sm bg-secondary-100 text-secondary-900 select-none">
        {ozellik.tam_adi}
      </span>
    </span>
  ))
}
