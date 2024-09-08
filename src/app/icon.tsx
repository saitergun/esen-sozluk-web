import { ImageResponse } from 'next/og'
import { ImageResponseOptions } from 'next/server'

export const size = { width: 512, height: 512 }

export default async function Icon() {
  let fonts: ImageResponseOptions['fonts'] = undefined

  const url = `${process.env.BASE_URL}/webfonts/Fraunces_72pt-Black.ttf`

  const res = await fetch(url)

  if (res.status !== 404) {
    fonts = [
      {
        name: 'Fraunces',
        data: await res.arrayBuffer(),
        weight: 900,
      },
    ]
  }

  const options: ImageResponseOptions = { ...size, fonts }

  return new ImageResponse(
    (
      <div
        style={{
          ...size,

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          backgroundColor: '#00b5e6',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: '"Fraunces", serif',
              fontSize: (size.width * 85) / 100,
              lineHeight: 1,
              color: 'white',
            }}
          >
            S
          </span>
        </div>
      </div>
    ),
    options,
  )
}
