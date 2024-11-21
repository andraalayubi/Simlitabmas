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
