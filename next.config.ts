import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // The page used to live at the misspelled /protfolio. A permanent
        // redirect keeps old links, bookmarks and any indexed copies working,
        // and passes their search value to the new address.
        source: "/protfolio",
        destination: "/case-studies",
        permanent: true,
      },
      {
        source: "/protfolio/:slug",
        destination: "/case-studies",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
