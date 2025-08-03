"use client";

import React from "react";
import Marquee from "react-fast-marquee";

const CryptoHeader: React.FC = () => {
  const cryptoPrices = [
    {
      name: "Quant",
      symbol: "QNT",
      price: "$107.95",
      changePercent: "-68.51%",
    },
    {
      name: "OKB Token",
      symbol: "OKB",
      price: "$47.57",
      changePercent: "-6.54%",
    },
    {
      name: "Dash",
      symbol: "DASH",
      price: "$20.43",
      changePercent: "-53.34%",
    },
    {
      name: "Dogecoin",
      symbol: "DOGE",
      price: "$0.196",
      changePercent: "-49.08%",
    },
    {
      name: "Polkadot",
      symbol: "DOT",
      price: "$3.574",
      changePercent: "-56.95%",
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-purple-500/20">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left side - Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span className="font-heading text-sm font-semibold text-white">
            Live
          </span>
        </div>

        {/* Center - Marquee */}
        <div className="flex-1 mx-8">
          <Marquee
            speed={20}
            gradient={false}
            pauseOnHover={false}
            // autoFill={true}
            loop={0}
          >
            {cryptoPrices.map((crypto, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 whitespace-nowrap mx-6"
              >
                {/* Crypto Icon */}
                <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                  <span className="text-xs">₿</span>
                </div>

                {/* Crypto Info */}
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-white">
                    {crypto.symbol}
                  </span>
                  <span className="text-gray-400 text-xs">{crypto.name}</span>
                </div>

                {/* Price */}
                <span className="font-bold text-white">{crypto.price}</span>

                {/* Change */}
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    crypto.changePercent.startsWith("+") ||
                    crypto.changePercent === "0%"
                      ? "text-green-400 bg-green-500/10 border border-green-500/20"
                      : "text-red-400 bg-red-500/10 border border-red-500/20"
                  }`}
                >
                  {crypto.changePercent}
                </span>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Right side - Status */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-400 font-medium">Live Data</span>
        </div>
      </div>
    </div>
  );
};

export default CryptoHeader;
