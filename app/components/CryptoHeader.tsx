"use client";

import React from "react";
import Marquee from "react-fast-marquee";

const CryptoHeader: React.FC = () => {
  const cryptoPrices = [
    {
      name: "Quant",
      symbol: "QNT",
      price: "$107.95",
      change: "-68.51%",
      changePercent: "-68.51%",
    },
    {
      name: "Nexo",
      symbol: "NEXO",
      price: "$0",
      change: "-100.00%",
      changePercent: "-100.00%",
    },
    {
      name: "OKB Token",
      symbol: "OKB",
      price: "$47.57",
      change: "-6.54%",
      changePercent: "-6.54%",
    },
    {
      name: "Digix DAO",
      symbol: "DGD",
      price: "$0",
      change: "0%",
      changePercent: "0%",
    },
    {
      name: "Enjin Coin",
      symbol: "ENJ",
      price: "$0",
      change: "-100.00%",
      changePercent: "-100.00%",
    },
    {
      name: "Dash",
      symbol: "DASH",
      price: "$20.43",
      change: "-53.34%",
      changePercent: "-53.34%",
    },
    {
      name: "Basic Attention Token",
      symbol: "BAT",
      price: "$0.15",
      change: "-12.45%",
      changePercent: "-12.45%",
    },
    {
      name: "Dogecoin",
      symbol: "DOGE",
      price: "$0.196",
      change: "-49.08%",
      changePercent: "-49.08%",
    },
    {
      name: "Polkadot",
      symbol: "DOT",
      price: "$3.574",
      change: "-56.95%",
      changePercent: "-56.95%",
    },
    {
      name: "Crypto.com Chain",
      symbol: "CRO",
      price: "$0.129",
      change: "-19.26%",
      changePercent: "-19.26%",
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white py-2 mb-6 shadow-lg max-w-screen overflow-x-hidden">
      <div className="flex items-center justify-between px-4">
        <Marquee
          speed={40}
          gradient={false}
          pauseOnHover={true}
          autoFill={true}
          loop={0}
          // className="flex"
        >
          {cryptoPrices.map((crypto, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 whitespace-nowrap mx-4"
            >
              <span className="font-medium">
                {crypto.name} [{crypto.symbol}]:
              </span>
              <span className="font-bold">{crypto.price}</span>
              <span
                className={`text-sm ${
                  crypto.changePercent.startsWith("+")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {crypto.changePercent}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
      {/* <div className="text-sm text-gray-300 ml-4 flex-shrink-0">
        Cryptocurrency Prices by Coinlib
      </div> */}
    </div>
  );
};

export default CryptoHeader;
