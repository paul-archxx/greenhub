import { create } from "zustand";

interface CryptoPrice {
  name: string;
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
}

interface Wallet {
  id: string;
  name: string;
  icon: string;
  imageUrl: string;
  category: "popular" | "defi" | "hardware" | "mobile";
}

interface AppState {
  cryptoPrices: CryptoPrice[];
  isWalletConnected: boolean;
  selectedChain: string;
  syncType: string | null;
  selectedWallet: Wallet | null;
  showWalletModal: boolean;
  setCryptoPrices: (prices: CryptoPrice[]) => void;
  setWalletConnected: (connected: boolean) => void;
  setSelectedChain: (chain: string) => void;
  setSyncType: (type: string | null) => void;
  setSelectedWallet: (wallet: Wallet | null) => void;
  setShowWalletModal: (show: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  cryptoPrices: [
    {
      name: "Quant",
      symbol: "QNT",
      price: "$107.95",
      change: "-68.51%",
      changePercent: "-68.51%",
    },
    {
      name: "Nexo",
      symbol: "NEXO",
      price: "$0",
      change: "-100.00%",
      changePercent: "-100.00%",
    },
    {
      name: "OKB Token",
      symbol: "OKB",
      price: "$47.57",
      change: "-6.54%",
      changePercent: "-6.54%",
    },
    {
      name: "Digix DAO",
      symbol: "DGD",
      price: "$0",
      change: "0%",
      changePercent: "0%",
    },
    {
      name: "Enjin Coin",
      symbol: "ENJ",
      price: "$0",
      change: "-100.00%",
      changePercent: "-100.00%",
    },
    {
      name: "Dash",
      symbol: "DASH",
      price: "$20.43",
      change: "-53.34%",
      changePercent: "-53.34%",
    },
    {
      name: "Basic Attention Token",
      symbol: "BAT",
      price: "$0.15",
      change: "-12.45%",
      changePercent: "-12.45%",
    },
    {
      name: "Dogecoin",
      symbol: "DOGE",
      price: "$0.196",
      change: "-49.08%",
      changePercent: "-49.08%",
    },
    {
      name: "Polkadot",
      symbol: "DOT",
      price: "$3.574",
      change: "-56.95%",
      changePercent: "-56.95%",
    },
    {
      name: "Crypto.com Chain",
      symbol: "CRO",
      price: "$0.129",
      change: "-19.26%",
      changePercent: "-19.26%",
    },
  ],
  isWalletConnected: false,
  selectedChain: "Select Chain",
  syncType: null,
  selectedWallet: null,
  showWalletModal: false,
  setCryptoPrices: (prices) => set({ cryptoPrices: prices }),
  setWalletConnected: (connected) => set({ isWalletConnected: connected }),
  setSelectedChain: (chain) => set({ selectedChain: chain }),
  setSyncType: (type) => set({ syncType: type }),
  setSelectedWallet: (wallet) => set({ selectedWallet: wallet }),
  setShowWalletModal: (show) => set({ showWalletModal: show }),
}));
