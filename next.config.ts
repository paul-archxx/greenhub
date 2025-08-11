import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/spothq/cryptocurrency-icons/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/0xa3k5/web3icons/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "trustwallet.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "phantom.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.ledger.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "trezor.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.argent.xyz",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "token.im",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.tokenpocket.pro",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.safepal.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mathwallet.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.okx.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bitkeep.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "coinomi.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.ellipal.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.coolwallet.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dcentwallet.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.exodus.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "atomicwallet.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "guarda.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "blockstream.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "authereum.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mycrypto.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "opensea.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
