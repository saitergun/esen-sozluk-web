/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
}

const withVercelToolbar = require('@vercel/toolbar/plugins/next')()

module.exports = withVercelToolbar(nextConfig)
