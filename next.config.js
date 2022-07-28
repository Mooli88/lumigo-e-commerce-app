/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['.'],
  },
  images: {
    domains: ['fakestoreapi.com'],
  },
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    localStorageStateKey: 'lumigo-state',
  },
}

module.exports = nextConfig
