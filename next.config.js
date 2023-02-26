/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: "http://localhost:3000",
    MONGODB_URL:
      "mongodb+srv://admin:amer123456@cluster0.fz2cxpc.mongodb.net/Next-Ecommerce?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
