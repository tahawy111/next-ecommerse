/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: "http://localhost:3000",
    MONGODB_URL:
      "mongodb+srv://admin:amer123456@cluster0.fz2cxpc.mongodb.net/Next-Ecommerce?retryWrites=true&w=majority",
    SENDER_EMAIL: "amer.vib582@gmail.com",
    ACTIVE_TOKEN_SECRET: "4651__565dd7%^ghjjhfg",
    ACCESS_TOKEN_SECRET: "465aaa1_ghjjhfg_5657%^",
    REFRESH_TOKEN_SECRET: "ghjjcchfg_4651_5657%^",
    TOAST_POSITION: "bottom-right",
  },
};

module.exports = nextConfig;
