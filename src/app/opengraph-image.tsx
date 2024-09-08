import { ImageResponse } from '@vercel/og'
import { ImageResponseOptions } from 'next/server'

export const size = { width: 1200, height: 600 }

// const backgroundColor = 'rgba(241, 196, 15, 0.25)'
const backgroundColor = 'transparent'

function Logo() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',

        backgroundColor,
      }}
    >
      <h1
        style={{
          fontFamily: '"Fraunces", serif',
          fontWeight: 600,
          fontSize: 72,
          color: '#00b5e6',
          margin: 0,

          backgroundColor,
        }}
      >
        esen sözlük
      </h1>
    </div>
  )
}

function SearchInput() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',

        backgroundColor,
      }}
    >
      <button
        style={{
          width: '100%',
          height: 56,

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,

          fontSize: 28,
          color: '#87888c',

          backgroundColor: 'white',
          border: '1px solid #eeeeef',
          borderRadius: 4,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
        >
          <path d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z" />
        </svg>

        <span>sözcük ara</span>
      </button>
    </div>
  )
}

function Links() {
  return (
    <div
      style={{
        width: '100%',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,

        backgroundColor,
      }}
    >
      <span style={{ fontSize: 21 }}>kayıtlı</span>

      <span style={{ fontSize: 21 }}>geçmiş</span>
    </div>
  )
}

export default async function Image() {
  const fonts: ImageResponseOptions['fonts'] = []

  const frauncesResponse = await fetch(
    `${process.env.BASE_URL}/webfonts/Fraunces_9pt-SemiBold.ttf`,
  )

  if (frauncesResponse.status !== 404) {
    fonts.push({
      name: 'Fraunces',
      data: await frauncesResponse.arrayBuffer(),
      weight: 600,
    })
  }

  const crimsonProResponse = await fetch(
    `${process.env.BASE_URL}/webfonts/CrimsonPro-Regular.ttf`,
  )

  if (crimsonProResponse.status !== 404) {
    fonts.push({
      name: 'Crimson Pro',
      data: await crimsonProResponse.arrayBuffer(),
      weight: 400,
    })
  }

  const options: ImageResponseOptions = {
    ...size,
    fonts: fonts.length > 0 ? fonts : undefined,
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          fontFamily: '"Crimson Pro", serif',

          backgroundColor: '#f6f7f7',

          borderTop: '16px solid',
          borderColor: 'rgb(0 181 230)',
        }}
      >
        <div
          style={{
            width: 768,
            padding: 75,

            display: 'flex',
            flexDirection: 'column',
            gap: 36,

            backgroundColor,
          }}
        >
          <Logo />

          <SearchInput />

          <Links />
        </div>
      </div>
    ),
    options,
  )
}
