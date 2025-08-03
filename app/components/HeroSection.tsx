"use client";

import React from "react";
import { useAppStore } from "../store/useAppStore";
import IconSelector from "./IconSelector";

const HeroSection: React.FC = () => {
  const { isWalletConnected, selectedChain, setWalletConnected } =
    useAppStore();

  const handleConnectWallet = () => {
    setWalletConnected(!isWalletConnected);
  };

  const handleSelectChain = () => {
    // This would typically open a dropdown or modal
    console.log("Select chain clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400/5 rounded-full blur-lg"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Protocol Badge */}
        <div className="bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-lg px-4 py-2 mb-8">
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
          <button
            onClick={handleConnectWallet}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <IconSelector icon="wallet" size={20} />
            <span>
              {isWalletConnected ? "Wallet Connected" : "Connect Wallet"}
            </span>
          </button>

          <button
            onClick={handleSelectChain}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>{selectedChain}</span>
            <IconSelector icon="chevronDown" size={20} />
          </button>
        </div>

        {/* Sync Type Section */}
        <div className="w-full max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Select Sync Type
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
