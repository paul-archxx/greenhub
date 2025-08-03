"use client";

import React from "react";
import { useAppStore } from "../store/useAppStore";

interface SyncTypeCard {
  id: string;
  title: string;
  description: string;
}

const syncTypes: SyncTypeCard[] = [
  {
    id: "migration",
    title: "Migration",
    description: "Click here for migration or anything related to migration",
  },
  {
    id: "claim-token",
    title: "Claim Token",
    description: "Click here to claim tokens or have issues claiming tokens",
  },
  {
    id: "resolve-rpc-error",
    title: "Resolve RPC Error",
    description: "Click here to resolve RPC error or any RPC related issues",
  },
  {
    id: "resolve-high-gas-bug",
    title: "Resolve High Gas Bug",
    description: "Click here for High gas or transaction fee related issues",
  },
  {
    id: "slippage-error",
    title: "Slippage Error",
    description: "Click here for all issues related to slippage Error",
  },
  {
    id: "rectification",
    title: "Rectification",
    description: "Click here to rectify any issue related to your wallet",
  },
  {
    id: "swapping-error",
    title: "Swapping Error",
    description: "Click here for token swapping related issues",
  },
  {
    id: "staking",
    title: "Staking",
    description: "Click here for token staking/unstake related issues",
  },
  {
    id: "locked-account",
    title: "Locked Account",
    description: "Click here if your account was locked or wallet stuck",
  },
  {
    id: "missing-balance",
    title: "Missing/Irregular Balance",
    description: "Click here to recover your lost or missing funds",
  },
  {
    id: "transaction-delay",
    title: "Transaction Delay",
    description: "Click here for any transaction error or delayed transactions",
  },
  {
    id: "wallet-glitch",
    title: "Wallet Glitch",
    description: "Click here if you have problem with your trading wallet",
  },
];

const SyncTypeCards: React.FC = () => {
  const { setSyncType } = useAppStore();

  const handleCardClick = (syncType: string) => {
    setSyncType(syncType);
    console.log(`Selected sync type: ${syncType}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {syncTypes.map((syncType) => (
          <div
            key={syncType.id}
            onClick={() => handleCardClick(syncType.id)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 cursor-pointer transition-all duration-200 hover:bg-white/20 hover:border-white/30 hover:scale-105 group"
          >
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
              {syncType.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {syncType.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SyncTypeCards;
