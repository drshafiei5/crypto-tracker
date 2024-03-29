/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // coinmarketcap
        COINMARKETCAP_PRO_API_KEY: "56a3af1c-6a0d-4dc2-93cb-920ec00420d2",
        COINMARKETCAP_PRO_API_URL: "https://pro-api.coinmarketcap.com",
        COINMARKETCAP_API_URL: "https://api.coinmarketcap.com",

        // google
        GOOGLE_API_CONTEXT_KEY: "c2dd91295fa064187",
        GOOGLE_API_KEY: "AIzaSyD7ozW1tYrgIai1-ddBKqRIZ4Rmk94scvg",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
    },
};

export default nextConfig;
