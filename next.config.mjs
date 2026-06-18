/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // এটি যেকোনো https ডোমেইন থেকে ইমেজ লোড করার অনুমতি দিবে
      },
    ],
  },
};

export default nextConfig;