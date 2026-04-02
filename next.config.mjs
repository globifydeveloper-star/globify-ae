/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true } // Standard hosting cannot run Next.js server-side image optimization
};

export default nextConfig;
