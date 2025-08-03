"use client";

import React from "react";
import { useAppStore } from "../store/useAppStore";

const CryptoHeader: React.FC = () => {
  const { cryptoPrices } = useAppStore();

  return (
    <div className="bg-gray-800 text-white py-2 overflow-hidden">
      <div className="flex items-center justify-between px-4">
        <div className="flex space-x-6 animate-scroll">
          {cryptoPrices.map((crypto, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 whitespace-nowrap"
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
        </div>
        <div className="text-sm text-gray-300 ml-4">
          Cryptocurrency Prices by Coinlib
        </div>
      </div>
    </div>
  );
};

export default CryptoHeader;
