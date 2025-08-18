/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // CI 환경에서는 타입 체킹 활성화, 로컬에서는 개발 편의를 위해 무시
    ignoreDuringBuilds:
      process.env.NODE_ENV === "development" && !process.env.CI,
  },
  typescript: {
    // CI 환경에서는 타입 에러 체킹 활성화, 로컬에서는 개발 편의를 위해 무시
    ignoreBuildErrors:
      process.env.NODE_ENV === "development" && !process.env.CI,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
