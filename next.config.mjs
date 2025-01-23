/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true
  },
  env: {
    BUILD_ID: process.env.BUILD_ID || 'default-build-id',
  },  
}

export default nextConfig;