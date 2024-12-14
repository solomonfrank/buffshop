/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@buff/ui"],

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true, // 308 status code
      },
    ];
  },
};

export default nextConfig;
