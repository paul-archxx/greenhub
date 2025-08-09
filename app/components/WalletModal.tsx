"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useAppStore } from "../store/useAppStore";
import useStopScroll from "@/hooks/useStopScroll";
import ImportWalletModal from "./ImportWalletModal";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Wallet {
  id: string;
  name: string;
  icon: string;
  imageUrl: string;
  category: "popular" | "defi" | "hardware" | "mobile";
}

const wallets: Wallet[] = [
  // Popular Wallets
  {
    id: "metamask",
    name: "MetaMask",
    icon: "🦊",
    imageUrl: "/wallet-images/obvious/metamask.png",
    category: "popular",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "🔗",
    imageUrl: "/wallet-images/numbered/47.png",
    category: "popular",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "🪙",
    imageUrl: "/wallet-images/obvious/coinbase.png",
    category: "popular",
  },
  {
    id: "trust",
    name: "Trust Wallet",
    icon: "🛡️",
    imageUrl: "/wallet-images/obvious/trust.png",
    category: "popular",
  },
  {
    id: "phantom",
    name: "Phantom",
    icon: "👻",
    imageUrl:
      "https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/wallets/branded/phantom.svg",
    category: "popular",
  },
  {
    id: "ledger",
    name: "Ledger Live",
    icon: "🔐",
    imageUrl: "/wallet-images/obvious/Ledger-live.png",
    category: "hardware",
  },
  {
    id: "trezor",
    name: "Trezor",
    icon: "💎",
    imageUrl:
      "https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/wallets/branded/trezor.svg",
    category: "hardware",
  },

  // DeFi Wallets
  {
    id: "uniswap",
    name: "Uniswap",
    icon: "🦄",
    imageUrl:
      "https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/tokens/branded/UNI.svg",
    category: "defi",
  },
  {
    id: "1inch",
    name: "1inch Wallet",
    icon: "⚡",
    imageUrl:
      "https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/tokens/branded/1INCH.svg",
    category: "defi",
  },
  {
    id: "argent",
    name: "Argent",
    icon: "🛡️",
    imageUrl: "/wallet-images/obvious/Argent.jfif",
    category: "defi",
  },
  {
    id: "gnosis",
    name: "Gnosis Safe",
    icon: "🔒",
    imageUrl: "/wallet-images/obvious/gnosis.jfif",
    category: "defi",
  },
  {
    id: "rainbow",
    name: "Rainbow",
    icon: "🌈",
    imageUrl: "/wallet-images/obvious/rainbow.png",
    category: "defi",
  },
  {
    id: "imtoken",
    name: "imToken",
    icon: "📱",
    imageUrl: "/wallet-images/obvious/imToken.png",
    category: "mobile",
  },
  {
    id: "tokenpocket",
    name: "TokenPocket",
    icon: "💼",
    imageUrl: "/wallet-images/obvious/tokenpocket.png",
    category: "mobile",
  },
  {
    id: "safepal",
    name: "SafePal",
    icon: "🛡️",
    imageUrl: "/wallet-images/obvious/safepal.png",
    category: "mobile",
  },
  {
    id: "mathwallet",
    name: "MathWallet",
    icon: "🧮",
    imageUrl: "/wallet-images/numbered/14.png",
    category: "mobile",
  },

  // Additional Popular Wallets
  {
    id: "binance",
    name: "Binance Wallet",
    icon: "🟡",
    imageUrl:
      "https://raw.githubusercontent.com/0xa3k5/web3icons/main/raw-svgs/tokens/branded/BNB.svg",
    category: "popular",
  },
  {
    id: "okx",
    name: "OKX Wallet",
    icon: "⚫",
    imageUrl: "/wallet-images/obvious/okx.jpeg",
    category: "popular",
  },
  {
    id: "bitkeep",
    name: "BitKeep",
    icon: "💜",
    imageUrl: "/wallet-images/numbered/26.png",
    category: "popular",
  },
  {
    id: "huobi",
    name: "Huobi Wallet",
    icon: "🔥",
    imageUrl:
      "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/ht.svg",
    category: "popular",
  },
  {
    id: "coinomi",
    name: "Coinomi",
    icon: "🔄",
    imageUrl: "/wallet-images/numbered/5.jpg",
    category: "popular",
  },

  // Hardware Wallets
  {
    id: "ellipal",
    name: "Ellipal",
    icon: "📱",
    imageUrl: "/wallet-images/obvious/ellipal.png",
    category: "hardware",
  },
  {
    id: "coolwallet",
    name: "CoolWallet S",
    icon: "❄️",
    imageUrl: "/wallet-images/numbered/7.png",
    category: "hardware",
  },
  {
    id: "dcent",
    name: "D'CENT Wallet",
    icon: "🔷",
    imageUrl: "/wallet-images/numbered/73.jpeg",
    category: "hardware",
  },

  // Mobile Wallets
  {
    id: "exodus",
    name: "Exodus",
    icon: "🚪",
    imageUrl: "/wallet-images/obvious/exodus.jpg",
    category: "mobile",
  },
  {
    id: "atomic",
    name: "Atomic Wallet",
    icon: "⚛️",
    imageUrl: "/wallet-images/obvious/atomic.png",
    category: "mobile",
  },
  {
    id: "guarda",
    name: "Guarda Wallet",
    icon: "🛡️",
    imageUrl: "/wallet-images/numbered/90.jpeg",
    category: "mobile",
  },
  {
    id: "jade",
    name: "Jade Wallet",
    icon: "💚",
    imageUrl: "/wallet-images/numbered/89.jpeg",
    category: "mobile",
  },
  {
    id: "authereum",
    name: "Authereum",
    icon: "🔐",
    imageUrl: "/wallet-images/obvious/authereum.png",
    category: "mobile",
  },

  // Additional Wallets
  {
    id: "mycrypto",
    name: "MyCrypto",
    icon: "🌊",
    imageUrl: "/wallet-images/obvious/crypto.png",
    category: "popular",
  },
  {
    id: "loopring",
    name: "Loopring",
    icon: "🔄",
    imageUrl:
      "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/lrc.svg",
    category: "defi",
  },
  {
    id: "kyberswap",
    name: "KyberSwap",
    icon: "🟠",
    imageUrl:
      "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/knc.svg",
    category: "defi",
  },
  {
    id: "opensea",
    name: "OpenSea",
    icon: "🌊",
    imageUrl: "/wallet-images/numbered/59.jpeg",
    category: "defi",
  },
  {
    id: "compound",
    name: "Compound",
    icon: "🏗️",
    imageUrl:
      "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/comp.svg",
    category: "defi",
  },
  {
    id: "aave",
    name: "Aave",
    icon: "👻",
    imageUrl:
      "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/aave.svg",
    category: "defi",
  },
  {
    id: "yearn",
    name: "Yearn",
    icon: "💰",
    imageUrl:
      "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/yfi.svg",
    category: "defi",
  },
  {
    id: "curve",
    name: "Curve",
    icon: "📈",
    imageUrl:
      "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/crv.svg",
    category: "defi",
  },
];

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { setWalletConnected, setSelectedWallet } = useAppStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [selectedWalletForImport, setSelectedWalletForImport] =
    useState<Wallet | null>(null);

  useStopScroll(isOpen || showImportModal);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsAnimating(true);
      setIsLoading(true);

      // Show loader for 2 seconds
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(loadingTimer);
    } else {
      setIsAnimating(false);
      setIsLoading(false);
      setShouldRender(false);

      //   const timer = setTimeout(() => {
      //     setShouldRender(false);
      //   }, 300); // Match the transition duration
      //   return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
      // Set the selected wallet for import
      setSelectedWalletForImport(wallet);
      setShowImportModal(true);

      // Don't close the wallet modal immediately - let the import modal handle it
    } catch (error) {
      console.error(`Failed to select ${wallet.name}:`, error);
    }
  };

  const handleClose = () => {
    setSearchQuery(""); // Reset search when closing
    onClose();
  };

  const handleImportModalClose = () => {
    setShowImportModal(false);
    setSelectedWalletForImport(null);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className={`fixed inset-0 h-full w-full top-0 left-0 bottom-0 right-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleClose}
        />
      )}
      {shouldRender && (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          {/* Modal */}
          <div
            className={`relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-purple-500/20 rounded-3xl shadow-2xl max-w-4xl w-full mx-4 h-[90vh] overflow-y-auto overflow-x-hidden transition-all duration-300 transform ${
              isAnimating
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            }`}
          >
            {/* Glow effect */}
            {/* <div className="absolute size-full left-0 top-0 bottom-0 right-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 rounded-3xl" /> */}

            {/* Header */}
            <div className="relative flex items-center justify-between p-6 border-b border-purple-500/20 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                <h2 className="font-heading text-2xl font-bold text-white">
                  Select a Wallet
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-purple-500/20 rounded-xl transition-colors group"
              >
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors"
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

            {/* Loading State */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full relative">
                <div className="relative">
                  {/* Spinner */}
                  <div className="w-20 h-20 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>

                  {/* Pulse effect */}
                  <div className="absolute inset-0 w-20 h-20 border-4 border-purple-500/10 rounded-full animate-ping opacity-30"></div>
                </div>

                <div className="mt-8 text-center">
                  <h3 className="font-heading text-xl font-semibold text-white mb-3">
                    Loading Wallets
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Fetching available wallet options...
                  </p>
                </div>

                {/* Loading dots */}
                <div className="flex space-x-2 mt-6">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            ) : (
              <>
                {/* Search Input */}
                <div className="relative p-6 border-b border-purple-500/20 bg-gradient-to-r from-gray-800/30 to-gray-900/30">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
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
                      className="block w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        <svg
                          className="h-5 w-5 text-gray-400 hover:text-white transition-colors"
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
                <div className="p-6">
                  {searchQuery && filteredWallets.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-500 text-6xl mb-6">🔍</div>
                      <h3 className="font-heading text-xl font-semibold text-white mb-3">
                        No wallets found
                      </h3>
                      <p className="text-gray-400">
                        Try searching for a different wallet name
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Popular Wallets */}
                      {groupedWallets.popular.length > 0 && (
                        <div className="mb-8">
                          <h3 className="font-heading text-lg font-semibold text-white mb-4">
                            Popular Wallets
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {groupedWallets.popular.map((wallet) => (
                              <button
                                key={wallet.id}
                                onClick={() => handleWalletSelect(wallet)}
                                className="group relative p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-purple-500/20 hover:border-purple-500/40 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-blue-500/10 transition-all duration-300 backdrop-blur-sm"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative flex items-center space-x-3">
                                  <div className="size-10 rounded-lg overflow-hidden flex items-center justify-center">
                                    <Image
                                      src={wallet.imageUrl}
                                      alt={`${wallet.name} logo`}
                                      width={32}
                                      height={32}
                                      className="w-full h-full object-contain"
                                      onError={(e) => {
                                        // Fallback to emoji if image fails to load
                                        e.currentTarget.style.display = "none";
                                        const nextElement = e.currentTarget
                                          .nextElementSibling as HTMLElement;
                                        if (nextElement)
                                          nextElement.style.display = "block";
                                      }}
                                    />
                                    <span className="text-2xl hidden">
                                      {wallet.icon}
                                    </span>
                                  </div>
                                  <span className="font-medium text-white group-hover:text-purple-300 transition-colors">
                                    {wallet.name}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* DeFi Wallets */}
                      {groupedWallets.defi.length > 0 && (
                        <div className="mb-8">
                          <h3 className="font-heading text-lg font-semibold text-white mb-4">
                            DeFi Wallets
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {groupedWallets.defi.map((wallet) => (
                              <button
                                key={wallet.id}
                                onClick={() => handleWalletSelect(wallet)}
                                className="group relative p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-purple-500/20 hover:border-purple-500/40 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-blue-500/10 transition-all duration-300 backdrop-blur-sm"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative flex items-center space-x-3">
                                  <div className="size-10 rounded-lg overflow-hidden flex items-center justify-center">
                                    <Image
                                      src={wallet.imageUrl}
                                      alt={`${wallet.name} logo`}
                                      width={32}
                                      height={32}
                                      className="w-full h-full object-contain"
                                      onError={(e) => {
                                        // Fallback to emoji if image fails to load
                                        e.currentTarget.style.display = "none";
                                        const nextElement = e.currentTarget
                                          .nextElementSibling as HTMLElement;
                                        if (nextElement)
                                          nextElement.style.display = "block";
                                      }}
                                    />
                                    <span className="text-2xl hidden">
                                      {wallet.icon}
                                    </span>
                                  </div>
                                  <span className="font-medium text-white group-hover:text-purple-300 transition-colors">
                                    {wallet.name}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Hardware Wallets */}
                      {groupedWallets.hardware.length > 0 && (
                        <div className="mb-8">
                          <h3 className="font-heading text-lg font-semibold text-white mb-4">
                            Hardware Wallets
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {groupedWallets.hardware.map((wallet) => (
                              <button
                                key={wallet.id}
                                onClick={() => handleWalletSelect(wallet)}
                                className="group relative p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-purple-500/20 hover:border-purple-500/40 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-blue-500/10 transition-all duration-300 backdrop-blur-sm"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative flex items-center space-x-3">
                                  <div className="size-10 rounded-lg overflow-hidden flex items-center justify-center">
                                    <Image
                                      src={wallet.imageUrl}
                                      alt={`${wallet.name} logo`}
                                      width={32}
                                      height={32}
                                      className="w-full h-full object-contain"
                                      onError={(e) => {
                                        // Fallback to emoji if image fails to load
                                        e.currentTarget.style.display = "none";
                                        const nextElement = e.currentTarget
                                          .nextElementSibling as HTMLElement;
                                        if (nextElement)
                                          nextElement.style.display = "block";
                                      }}
                                    />
                                    <span className="text-2xl hidden">
                                      {wallet.icon}
                                    </span>
                                  </div>
                                  <span className="font-medium text-white group-hover:text-purple-300 transition-colors">
                                    {wallet.name}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Mobile Wallets */}
                      {groupedWallets.mobile.length > 0 && (
                        <div className="mb-8">
                          <h3 className="font-heading text-lg font-semibold text-white mb-4">
                            Mobile Wallets
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {groupedWallets.mobile.map((wallet) => (
                              <button
                                key={wallet.id}
                                onClick={() => handleWalletSelect(wallet)}
                                className="group relative p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-purple-500/20 hover:border-purple-500/40 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-blue-500/10 transition-all duration-300 backdrop-blur-sm"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative flex items-center space-x-3">
                                  <div className="size-10 rounded-lg overflow-hidden flex items-center justify-center">
                                    <Image
                                      src={wallet.imageUrl}
                                      alt={`${wallet.name} logo`}
                                      width={32}
                                      height={32}
                                      className="w-full h-full object-contain"
                                      onError={(e) => {
                                        // Fallback to emoji if image fails to load
                                        e.currentTarget.style.display = "none";
                                        const nextElement = e.currentTarget
                                          .nextElementSibling as HTMLElement;
                                        if (nextElement)
                                          nextElement.style.display = "block";
                                      }}
                                    />
                                    <span className="text-2xl hidden">
                                      {wallet.icon}
                                    </span>
                                  </div>
                                  <span className="font-medium text-white group-hover:text-purple-300 transition-colors">
                                    {wallet.name}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Import Wallet Modal */}
      <ImportWalletModal
        isOpen={showImportModal}
        onClose={handleImportModalClose}
        selectedWallet={selectedWalletForImport}
        onWalletModalClose={onClose}
      />
    </>
  );
};

export default WalletModal;
