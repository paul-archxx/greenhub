"use client";

import React from "react";
import { motion } from "framer-motion";
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
    <>
      <div className="min-h-screen max-sm:pt-8 relative overflow-hidden isolate">
        <motion.div
          className="relative z-10 font-heading flex flex-col items-center justify-center min-h-screen px-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Protocol Badge */}
          <motion.div
            className="bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-white text-sm font-medium">
              Decentralized Protocol
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-[5vw] font-bold text-white mb-6 max-w-[91%] sm:max-w-[75%] leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Decentralized protocol for syncing various Wallets issues on Secure
            Server.
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            This is not an app but a protocol that establishes a remote
            resolution between all noncustodial wallet.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button onClick={handleConnectWallet} className="uppercase">
              Connect Wallet
            </Button>

            {/* <Button onClick={handleSelectChain}>Select Chain</Button> */}
          </motion.div>
        </motion.div>
      </div>

      {/* Wallet Modal */}
      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
      />
    </>
  );
};

export default HeroSection;
