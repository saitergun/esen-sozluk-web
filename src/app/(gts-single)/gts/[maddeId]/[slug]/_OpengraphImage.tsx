/* eslint-disable @next/next/no-img-element */
import { ITdkMadde } from '@/lib/prismaService/types/tdkMadde'

import { cleanDefinition, origins } from '@/lib/utils'

// const backgroundColor = 'rgba(241, 196, 15, .25)'
const backgroundColor = 'transparent'

function Container({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        width: '100%',
        height: '100%',

        display: 'flex',
        alignItems: 'center',

        fontFamily: '"Noto Sans", "Crimson Pro", serif',
        color: '#323336',

        backgroundColor: 'white',

        borderTop: '16px solid',
        borderBottom: '16px solid',
        borderColor: 'rgb(0 181 230)',
      }}
    >
      <span
        style={{
          width: '100%',

          padding: 75,

          backgroundColor,
        }}
      >
        <span
          style={{
            width: '100%',

            display: 'flex',
            flexDirection: 'column',
            gap: 24,

            border: '1px solid',
            borderColor: backgroundColor,
          }}
        >
          {children}
        </span>
      </span>
    </span>
  )
}

function OriginFlagGroup({ lisan }: { lisan: string }) {
  const originsReversed = () =>
    origins
      .filter((origin) => lisan.search(origin.nameLocale) > -1)
      .reverse()
      .map((origin) => ({
        ...origin,
        flag: {
          ...origin.flag,
          src: process.env.BASE_URL + origin.flag.src,
        },
      }))

  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {originsReversed().map((origin, index) => (
        <img
          key={origin.code}
          src={origin.flag.src}
          alt={origin.nameLocale}
          width={48}
          height={48}
          style={{
            borderRadius: 16,
            marginLeft: index > 0 ? -16 : 0,
            border: '3px solid white',
          }}
        />
      ))}
    </span>
  )
}

function Highlights({
  lisan,
  telaffuz,
}: {
  lisan: ITdkMadde['tdkData']['lisan']
  telaffuz: ITdkMadde['tdkData']['telaffuz']
}) {
  const showHighlights = Boolean(lisan) || Boolean(telaffuz)

  if (!showHighlights) {
    return null
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 36,
        backgroundColor,
      }}
    >
      {Boolean(lisan) && (
        <div
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            backgroundColor,
          }}
        >
          <OriginFlagGroup lisan={lisan} />

          <div
            style={{
              fontSize: 36,
            }}
          >
            {lisan}
          </div>
        </div>
      )}

      {Boolean(telaffuz) && (
        <div
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            backgroundColor,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            style={{
              width: 48,
              height: 48,
            }}
          >
            <path d="M13 7.22056L9.60282 10.0001H6V14.0001H9.60282L13 16.7796V7.22056ZM8.88889 16.0001H5C4.44772 16.0001 4 15.5524 4 15.0001V9.00007C4 8.44778 4.44772 8.00007 5 8.00007H8.88889L14.1834 3.66821C14.3971 3.49335 14.7121 3.52485 14.887 3.73857C14.9601 3.8279 15 3.93977 15 4.05519V19.9449C15 20.2211 14.7761 20.4449 14.5 20.4449C14.3846 20.4449 14.2727 20.405 14.1834 20.3319L8.88889 16.0001ZM18.8631 16.5911L17.4411 15.1691C18.3892 14.4376 19 13.2902 19 12.0001C19 10.5697 18.2493 9.31476 17.1203 8.60766L18.5589 7.16906C20.0396 8.26166 21 10.0187 21 12.0001C21 13.8422 20.1698 15.4905 18.8631 16.5911Z" />
          </svg>

          <div
            style={{
              fontSize: 36,
            }}
          >
            {telaffuz}
          </div>
        </div>
      )}
    </div>
  )
}

function Title({ title }: { title: string }) {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor,
      }}
    >
      <div
        style={{
          fontFamily: '"Fraunces", serif',
          fontSize: title.length > 50 ? 55 : title.length > 20 ? 65 : 75,
          lineHeight: 1,
          backgroundColor,
        }}
      >
        {title}
      </div>
    </div>
  )
}

function DefinitionAttributes({
  attributes,
}: {
  attributes?: TdkMaddeAnlamOzellik[]
}) {
  if (!attributes) {
    return null
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,

        backgroundColor,
      }}
    >
      {attributes.map((attribute) => {
        return (
          <span
            key={attribute.ozellik_id}
            style={{
              position: 'relative',

              fontSize: 40,
              lineHeight: 1,
              color: '#576574',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                bottom: 2,

                width: '100%',
                height: 8,

                transform: 'rotate(-3deg)',

                backgroundColor: '#ffd900',
              }}
            />

            <div style={{ display: 'flex' }}>{attribute.tam_adi}</div>
          </span>
        )
      })}
    </div>
  )
}

function Definition({ definition }: { definition: string }) {
  const cleanText = cleanDefinition(definition)

  return (
    <div
      style={{
        height: 125,
        display: 'flex',
        overflow: 'hidden',

        backgroundColor,
      }}
    >
      <div
        style={{
          fontSize: 52,
          color: '#576574',
        }}
      >
        {cleanText}
      </div>
    </div>
  )
}

export default function OpengraphImage({ tdkMadde }: { tdkMadde: ITdkMadde }) {
  const [firstDefinition] = tdkMadde.tdkData.anlamlarListe
    ? tdkMadde.tdkData.anlamlarListe.sort(
        (a, b) => Number(a.anlam_sira) - Number(b.anlam_sira),
      )
    : []

  return (
    <Container>
      <Highlights
        lisan={tdkMadde.tdkData.lisan}
        telaffuz={tdkMadde.tdkData.telaffuz}
      />

      <Title title={tdkMadde.madde} />

      <DefinitionAttributes attributes={firstDefinition.ozelliklerListe} />

      <Definition definition={firstDefinition.anlam} />
    </Container>
  )
}
