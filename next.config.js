/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['.'],
  },
  assetPrefix: './',
  images: {
    domains: ['fakestoreapi.com'],
    loader: 'custom',
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public/images',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: 75,
    nextImageExportOptimizer_storePicturesInWEBP: false,
    nextImageExportOptimizer_generateAndUseBlurImages: true,
  },
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    localStorageStateKey: 'lumigo-state',
  },
}

module.exports = nextConfig
