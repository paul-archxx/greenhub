"use client";

import React from "react";
import Button from "./Button";

const HeroSection: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden isolate">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Protocol Badge */}
        <div className="bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 mb-8">
          <span className="text-white text-sm font-medium">
            Decentralized Protocol
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight">
          Decentralized protocol for syncing various Wallets issues on Secure
          Server.
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl">
          This is not an app but a protocol that establishes a remote resolution
          between all noncustodial wallet.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button>Connect Wallet</Button>

          <Button>Select Chain</Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
