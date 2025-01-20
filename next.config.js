/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // For static site generation
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true // Required for static export
  },
  async rewrites() {
    return [
      {
        source: '/:path*/index.html',
        destination: '/:path*'
      }
    ];
  }
}

module.exports = nextConfig