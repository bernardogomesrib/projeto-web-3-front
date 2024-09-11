/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "**",
      },
      {
        protocol:"http",
        hostname:"23.96.123.184",
        port:"3000",
        pathname:"**"
      }
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Forwarded-Host",
            value: "3hnmzbqg-3001.brs.devtunnels.ms",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
