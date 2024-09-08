// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
/** @type {import('tailwindcss').Config} */

import type { Config, PluginUtils } from 'tailwindcss/types/config'

const colors = {
  transparent: 'transparent',
  current: 'currentColor',

  black: '#000000',
  white: '#ffffff',

  primary: {
    DEFAULT: '#00b5e6',
    50: '#f2fbfe',
    100: '#e6f8fd',
    200: '#bfedf9',
    300: '#99e1f5',
    400: '#4dcbee',
    500: '#00b5e6',
    600: '#00a3cf',
    700: '#0088ad',
    800: '#006d8a',
    900: '#005971',
  },

  secondary: {
    DEFAULT: '#ffd900',
    50: '#fffdf2',
    100: '#fffbe6',
    200: '#fff6bf',
    300: '#fff099',
    400: '#ffe44d',
    500: '#ffd900',
    600: '#e6c300',
    700: '#bfa300',
    800: '#998200',
    900: '#7d6a00',
  },

  alternative: {
    DEFAULT: '#54555A',
    50: '#f6f7f7',
    100: '#eeeeef',
    200: '#d4d5d6',
    300: '#bbbbbd',
    400: '#87888c',
    500: '#54555a',
    600: '#4c4d51',
    700: '#3f4044',
    800: '#323336',
    900: '#292a2c',
  },
}

const fontSize = {
  '128/16': '8rem', // 9xl
  '96/16': '6rem', // 8xl
  '72/16': '4.5rem', // 7xl
  '60/16': '3.75rem', // 6xl
  '48/16': '3rem', // 5xl
  '36/16': '2.25rem', // 4xl

  '32/16': '2rem',
  '31/16': '1.938rem',
  '30/16': '1.875rem', // 3xl
  '29/16': '1.813rem',
  '28/16': '1.75rem',
  '27/16': '1.688rem',
  '26/16': '1.625rem',
  '25/16': '1.563rem',
  '24/16': '1.5rem', // 2xl
  '23/16': '1.438rem',
  '22/16': '1.375rem',
  '21/16': '1.313rem',
  '20/16': '1.25rem', // xl
  '19/16': '1.188rem',
  '18/16': '1.125rem', // lg
  '17/16': '1.063rem',

  '16/16': '1rem', // base
  '15/16': '.938rem',
  '14/16': '.875rem', // sm
  '13/16': '.813rem',
  '12/16': '.75rem', // xs
  '11/16': '.688rem',
  '10/16': '.625rem',
  '9/16': '.563rem',
  '8/16': '.5rem',
  '7/16': '.438rem',
  '6/16': '.375rem',
  '5/16': '.313rem',
  '4/16': '.25rem',
  '3/16': '.188rem',
  '2/16': '.125rem',
  '1/16': '.063rem',
}

const fontWeight = {
  100: '100',
  200: '200',
  300: '300',
  400: '400',
  500: '500',
  600: '600',
  700: '700',
  800: '800',
  900: '900',
}

const extend = {
  borderColor: {
    DEFAULT: colors.alternative[100],
  },

  spacing: {
    13: '3.25rem',
    15: '3.75rem',
    17: '4.25rem',
    120: '30rem',
  },

  minHeight: ({ theme }: PluginUtils) => ({
    ...theme('spacing'),
    ...theme('height'),
  }),

  minWidth: ({ theme }: PluginUtils) => ({
    ...theme('spacing'),
    ...theme('width'),
  }),

  maxHeight: ({ theme }: PluginUtils) => ({
    ...theme('spacing'),
    ...theme('height'),
  }),

  maxWidth: ({ theme }: PluginUtils) => ({
    ...theme('spacing'),
    ...theme('width'),
  }),
}

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    colors,
    fontSize,
    fontWeight,
    extend,
  },
}

export default config
