/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};



module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: 'http://127.0.0.1:7860/:path*'
  //     }
  //   ]
  // }
}