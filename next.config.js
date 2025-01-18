/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // For static site generation
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true // Required for static export
  }
}

module.exports = nextConfig