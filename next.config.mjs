export default {
  reactStrictMode: false,
  serverRuntimeConfig: {
    secondSecret: process.env.SECOND_SECRET,
  },
  publicRuntimeConfig: {
    AppName: "SIMLITABMAS",
    SchoolName: "PENS",
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  distDir: 'build',
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
};
