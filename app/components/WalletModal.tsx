"use client";

import React, { useState, useMemo } from "react";
import { useAppStore } from "../store/useAppStore";
import useStopScroll from "@/hooks/useStopScroll";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Wallet {
  id: string;
  name: string;
  icon: string;
  category: "popular" | "defi" | "hardware" | "mobile";
}

const wallets: Wallet[] = [
  // Popular Wallets
  { id: "metamask", name: "MetaMask", icon: "🦊", category: "popular" },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "🔗",
    category: "popular",
  },
  { id: "coinbase", name: "Coinbase Wallet", icon: "🪙", category: "popular" },
  { id: "trust", name: "Trust Wallet", icon: "🛡️", category: "popular" },
  { id: "phantom", name: "Phantom", icon: "👻", category: "popular" },
  { id: "ledger", name: "Ledger Live", icon: "🔐", category: "hardware" },
  { id: "trezor", name: "Trezor", icon: "💎", category: "hardware" },

  // DeFi Wallets
  { id: "uniswap", name: "Uniswap", icon: "🦄", category: "defi" },
  { id: "1inch", name: "1inch Wallet", icon: "⚡", category: "defi" },
  { id: "argent", name: "Argent", icon: "🛡️", category: "defi" },
  { id: "gnosis", name: "Gnosis Safe", icon: "🔒", category: "defi" },
  { id: "rainbow", name: "Rainbow", icon: "🌈", category: "defi" },
  { id: "imtoken", name: "imToken", icon: "📱", category: "mobile" },
  { id: "tokenpocket", name: "TokenPocket", icon: "💼", category: "mobile" },
  { id: "safepal", name: "SafePal", icon: "🛡️", category: "mobile" },
  { id: "mathwallet", name: "MathWallet", icon: "🧮", category: "mobile" },

  // Additional Popular Wallets
  { id: "binance", name: "Binance Wallet", icon: "🟡", category: "popular" },
  { id: "okx", name: "OKX Wallet", icon: "⚫", category: "popular" },
  { id: "bitkeep", name: "BitKeep", icon: "💜", category: "popular" },
  { id: "huobi", name: "Huobi Wallet", icon: "🔥", category: "popular" },
  { id: "coinomi", name: "Coinomi", icon: "🔄", category: "popular" },

  // Hardware Wallets
  { id: "ellipal", name: "Ellipal", icon: "📱", category: "hardware" },
  { id: "coolwallet", name: "CoolWallet S", icon: "❄️", category: "hardware" },
  { id: "dcent", name: "D'CENT Wallet", icon: "🔷", category: "hardware" },

  // Mobile Wallets
  { id: "exodus", name: "Exodus", icon: "🚪", category: "mobile" },
  { id: "atomic", name: "Atomic Wallet", icon: "⚛️", category: "mobile" },
  { id: "guarda", name: "Guarda Wallet", icon: "🛡️", category: "mobile" },
  { id: "jade", name: "Jade Wallet", icon: "💚", category: "mobile" },
  { id: "authereum", name: "Authereum", icon: "🔐", category: "mobile" },

  // Additional Wallets
  { id: "mycrypto", name: "MyCrypto", icon: "🌊", category: "popular" },
  { id: "loopring", name: "Loopring", icon: "🔄", category: "defi" },
  { id: "kyberswap", name: "KyberSwap", icon: "🟠", category: "defi" },
  { id: "opensea", name: "OpenSea", icon: "🌊", category: "defi" },
  { id: "compound", name: "Compound", icon: "🏗️", category: "defi" },
  { id: "aave", name: "Aave", icon: "👻", category: "defi" },
  { id: "yearn", name: "Yearn", icon: "💰", category: "defi" },
  { id: "curve", name: "Curve", icon: "📈", category: "defi" },
];

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { setWalletConnected, setSelectedWallet } = useAppStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  useStopScroll(isOpen);
  // Filter wallets based on search query
  const filteredWallets = useMemo(() => {
    if (!searchQuery.trim()) {
      return wallets;
    }

    const query = searchQuery.toLowerCase().trim();
    return wallets.filter(
      (wallet) =>
        wallet.name.toLowerCase().includes(query) ||
        wallet.id.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Group filtered wallets by category
  const groupedWallets = useMemo(() => {
    const groups: Record<string, Wallet[]> = {
      popular: [],
      defi: [],
      hardware: [],
      mobile: [],
    };

    filteredWallets.forEach((wallet) => {
      if (groups[wallet.category]) {
        groups[wallet.category].push(wallet);
      }
    });

    return groups;
  }, [filteredWallets]);

  const handleWalletSelect = async (wallet: Wallet) => {
    try {
      // Simulate wallet connection
      console.log(`Connecting to ${wallet.name}...`);

      // Update store
      setSelectedWallet(wallet);
      setWalletConnected(true);

      // Close modal
      onClose();

      // Show success message (you can add a toast notification here)
      console.log(`Successfully connected to ${wallet.name}`);
    } catch (error) {
      console.error(`Failed to connect to ${wallet.name}:`, error);
    }
  };

  const handleClose = () => {
    setSearchQuery(""); // Reset search when closing
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h2 className="font-heading text-2xl font-bold text-gray-900">
              Select a Wallet
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search wallets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black focus:border-purple-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-5 w-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {searchQuery && filteredWallets.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">
                No wallets found
              </h3>
              <p className="text-gray-600">
                Try searching for a different wallet name
              </p>
            </div>
          ) : (
            <>
              {/* Popular Wallets */}
              {groupedWallets.popular.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4">
                    Popular Wallets
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {groupedWallets.popular.map((wallet) => (
                      <button
                        key={wallet.id}
                        onClick={() => handleWalletSelect(wallet)}
                        className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                      >
                        <span className="text-2xl">{wallet.icon}</span>
                        <span className="font-medium text-gray-900 group-hover:text-purple-700">
                          {wallet.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* DeFi Wallets */}
              {groupedWallets.defi.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4">
                    DeFi Wallets
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {groupedWallets.defi.map((wallet) => (
                      <button
                        key={wallet.id}
                        onClick={() => handleWalletSelect(wallet)}
                        className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                      >
                        <span className="text-2xl">{wallet.icon}</span>
                        <span className="font-medium text-gray-900 group-hover:text-purple-700">
                          {wallet.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Hardware Wallets */}
              {groupedWallets.hardware.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4">
                    Hardware Wallets
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {groupedWallets.hardware.map((wallet) => (
                      <button
                        key={wallet.id}
                        onClick={() => handleWalletSelect(wallet)}
                        className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                      >
                        <span className="text-2xl">{wallet.icon}</span>
                        <span className="font-medium text-gray-900 group-hover:text-purple-700">
                          {wallet.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile Wallets */}
              {groupedWallets.mobile.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4">
                    Mobile Wallets
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {groupedWallets.mobile.map((wallet) => (
                      <button
                        key={wallet.id}
                        onClick={() => handleWalletSelect(wallet)}
                        className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                      >
                        <span className="text-2xl">{wallet.icon}</span>
                        <span className="font-medium text-gray-900 group-hover:text-purple-700">
                          {wallet.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600 text-center">
            Don't have a wallet?{" "}
            <a
              href="#"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Learn how to get one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
