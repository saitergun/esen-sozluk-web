import { cleanDefinition } from '@/lib/utils'

import DefinitionAttributes from './_Definition.Attributes'
import DefinitionExamples from './_Definition.Examples'

type Props = {
  anlam: string
  ozelliklerListe?: TdkMaddeAnlamOzellik[]
  orneklerListe?: TdkMaddeAnlamOrnek[]
}

export default function Definition({
  anlam,
  ozelliklerListe,
  orneklerListe,
}: Props) {
  return (
    <li
      className="py-3 px-4"
      key={anlam}
    >
      <p className="text-19/16 leading-[1.2]">
        <DefinitionAttributes ozelliklerListe={ozelliklerListe} />

        {cleanDefinition(anlam)}
      </p>

      {orneklerListe && <div className="h-1.5" />}

      <DefinitionExamples orneklerList={orneklerListe} />
    </li>
  )
}
