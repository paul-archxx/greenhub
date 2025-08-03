"use client";

import React from "react";
import { useAppStore } from "../store/useAppStore";
import Button from "./Button";

interface SyncTypeCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const syncTypes: SyncTypeCard[] = [
  {
    id: "migration",
    title: "Migration",
    description: "Click here for migration or anything related to migration",
    icon: "🔄",
  },
  {
    id: "claim-token",
    title: "Claim Token",
    description: "Click here to claim tokens or have issues claiming tokens",
    icon: "🎁",
  },
  {
    id: "resolve-rpc-error",
    title: "Resolve RPC Error",
    description: "Click here to resolve RPC error or any RPC related issues",
    icon: "🔧",
  },
  {
    id: "resolve-high-gas-bug",
    title: "Resolve High Gas Bug",
    description: "Click here for High gas or transaction fee related issues",
    icon: "⛽",
  },
  {
    id: "slippage-error",
    title: "Slippage Error",
    description: "Click here for all issues related to slippage Error",
    icon: "📉",
  },
  {
    id: "rectification",
    title: "Rectification",
    description: "Click here to rectify any issue related to your wallet",
    icon: "✅",
  },
  {
    id: "swapping-error",
    title: "Swapping Error",
    description: "Click here for token swapping related issues",
    icon: "🔄",
  },
  {
    id: "staking",
    title: "Staking",
    description: "Click here for token staking/unstake related issues",
    icon: "💰",
  },
  {
    id: "locked-account",
    title: "Locked Account",
    description: "Click here if your account was locked or wallet stuck",
    icon: "🔒",
  },
  {
    id: "missing-balance",
    title: "Missing/Irregular Balance",
    description: "Click here to recover your lost or missing funds",
    icon: "💸",
  },
  {
    id: "transaction-delay",
    title: "Transaction Delay",
    description: "Click here for any transaction error or delayed transactions",
    icon: "⏱️",
  },
  {
    id: "wallet-glitch",
    title: "Wallet Glitch",
    description: "Click here if you have problem with your trading wallet",
    icon: "🐛",
  },
];

const SyncTypeCards: React.FC = () => {
  const { setSyncType, setShowWalletModal } = useAppStore();

  const handleCardClick = (syncType?: string) => {
    // setSyncType(syncType);
    setShowWalletModal(true);
    // console.log(`Selected sync type: ${syncType}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 relative">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Select Sync Type
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Choose the type of issue you're experiencing to get the right
          assistance
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {syncTypes.map((syncType) => (
          <div
            key={syncType.id}
            onClick={() => handleCardClick(syncType.id)}
            className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
          >
            {/* Card Background */}
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 h-full hover:border-purple-500/40 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-blue-500/10 transition-all duration-300">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-purple-500/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{syncType.icon}</span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {syncType.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {syncType.description}
                </p>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <Button onClick={() => handleCardClick()} className="mx-auto">
          Connect Wallet
        </Button>
      </div>
    </div>
  );
};

export default SyncTypeCards;
