/** @type {import('next').NextConfig} */

const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  devIndicators: {
    buildActivity: false //nexjs 기본 로딩 UI
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles/scss/pages')],
  },
}

module.exports = nextConfig