/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Old misspelled route, kept so existing links and search results still work.
      { source: '/testinomials', destination: '/testimonials', permanent: true },
      // Programme renamed from "RemDi 2" to "RemDia".
      { source: '/programs/remdi2', destination: '/programs/remdia', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com", 
      },
    ],
  },
};

module.exports = nextConfig;
