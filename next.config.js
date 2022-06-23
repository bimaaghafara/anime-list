/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/anime',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['s4.anilist.co'],
  },
}

module.exports = nextConfig;
