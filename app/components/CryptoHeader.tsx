"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { useAppStore } from "../store/useAppStore";

const CryptoHeader: React.FC = () => {
  const { cryptoPrices } = useAppStore();

  return (
    <div className="sticky top-0 z-50 bg-gray-800 text-white py-2 mb-6 shadow-lg max-w-screen overflow-x-hidden">
      <div className="flex items-center justify-between px-4">
        <div className="flex-1">
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
        <div className="text-sm text-gray-300 ml-4 flex-shrink-0">
          Cryptocurrency Prices by Coinlib
        </div>
      </div>
    </div>
  );
};

export default CryptoHeader;
