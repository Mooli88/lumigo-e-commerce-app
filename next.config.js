/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fakestoreapi.com'],
  },
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    localStorageStateKey: 'lumigo-state',
  },
}

module.exports = nextConfig
