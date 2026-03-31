/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Forces Next.js to build a standard static HTML/CSS folder
  images: { unoptimized: true } // Standard hosting cannot run Next.js server-side image optimization
};

export default nextConfig;
