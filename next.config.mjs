/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  // Exclude nested projects from compilation
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/alina-lawyer/**', '**/node_modules/**'],
    }
    return config
  },
}

export default nextConfig
