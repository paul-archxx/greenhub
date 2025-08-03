import { create } from "zustand";

interface CryptoPrice {
  name: string;
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
}

interface AppState {
  cryptoPrices: CryptoPrice[];
  isWalletConnected: boolean;
  selectedChain: string;
  syncType: string | null;
  setCryptoPrices: (prices: CryptoPrice[]) => void;
  setWalletConnected: (connected: boolean) => void;
  setSelectedChain: (chain: string) => void;
  setSyncType: (type: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  cryptoPrices: [
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
    {
      name: "Matic Network",
      symbol: "MATIC",
      price: "$0",
      change: "0%",
      changePercent: "0%",
    },
    {
      name: "Litecoin",
      symbol: "LTC",
      price: "$109.17",
      change: "-2.90%",
      changePercent: "-2.90%",
    },
    {
      name: "Dai",
      symbol: "DAI",
      price: "$1.026",
      change: "+1.84%",
      changePercent: "+1.84%",
    },
    {
      name: "ChainLink",
      symbol: "LINK",
      price: "$16.06",
      change: "-31.74%",
      changePercent: "-31.74%",
    },
    {
      name: "Bitcoin Cash",
      symbol: "BCH",
      price: "$26.27",
      change: "-95.23%",
      changePercent: "-95.23%",
    },
  ],
  isWalletConnected: false,
  selectedChain: "Select Chain",
  syncType: null,
  setCryptoPrices: (prices) => set({ cryptoPrices: prices }),
  setWalletConnected: (connected) => set({ isWalletConnected: connected }),
  setSelectedChain: (chain) => set({ selectedChain: chain }),
  setSyncType: (type) => set({ syncType: type }),
}));
