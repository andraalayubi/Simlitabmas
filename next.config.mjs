export default {
  reactStrictMode: false,
  serverRuntimeConfig: {
    secondSecret: process.env.SECOND_SECRET,
  },
  publicRuntimeConfig: {
    AppName: "SIMLITABMAS",
    SchoolName: "PENS",
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
