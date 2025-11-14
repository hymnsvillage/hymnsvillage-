/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cms.hymnsvillage.com",       // your WP domain
      "secure.gravatar.com",        // author avatars
      "i0.wp.com",                  // Jetpack image CDN (needed later)
      "i1.wp.com",
      "i2.wp.com",
    ],
  },
};

export default nextConfig;
