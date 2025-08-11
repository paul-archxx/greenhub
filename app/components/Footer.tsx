"use client";

import React from "react";
import IconSelector from "./IconSelector";

const Footer: React.FC = () => {
  return (
    <div className="relative overflow-hidden isolate">
      {/* Background Effects */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url('/background-line.png')",
        }}
      />

      {/* Gradient Effects */}
      <div
        className="absolute"
        style={{
          top: "-70%",
          left: "-60%",
          width: "2000px",
          height: "2000px",
          zIndex: -1,
          background:
            "radial-gradient(34.98% 34.98% at 50% 50%, #725bda 0, rgba(6, 19, 45, 0) 100%)",
          opacity: 0.3,
        }}
      />

      <div
        className="absolute"
        style={{
          top: "-40%",
          left: "-30%",
          width: "2000px",
          height: "2000px",
          zIndex: -1,
          background:
            "radial-gradient(34.98% 34.98% at 50% 50%, #725bda 0, rgba(6, 19, 45, 0) 100%)",
          opacity: 0.2,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Additional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Defi Farming Card */}
          <div className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105">
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 h-full hover:border-purple-500/40 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-blue-500/10 transition-all duration-300">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-purple-500/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🌾</span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  Defi Farming
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Click here for Defi farming / commercial farming issues
                </p>
              </div>
            </div>
          </div>

          {/* Validation Card */}
          <div className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105">
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 h-full hover:border-purple-500/40 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-blue-500/10 transition-all duration-300">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-purple-500/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🔐</span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  Validation
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Click here to validate your wallet using multisig
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="relative bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 rounded-2xl" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
            {/* Left side - Legal links */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mb-6 md:mb-0">
              <a
                href="#"
                className="text-gray-400 hover:text-purple-300 transition-colors font-medium"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-300 transition-colors font-medium"
              >
                Terms & Conditions
              </a>
              <div className="text-gray-500 text-sm font-medium">
                © 2024, Decentralized Dapps
              </div>
            </div>

            {/* Right side - Social media */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="group w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500/30 hover:to-blue-500/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-110"
              >
                <IconSelector
                  icon="facebook"
                  size={20}
                  className="text-white group-hover:text-purple-300 transition-colors"
                />
              </a>
              <a
                href="#"
                className="group w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500/30 hover:to-blue-500/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-110"
              >
                <IconSelector
                  icon="twitter"
                  size={20}
                  className="text-white group-hover:text-purple-300 transition-colors"
                />
              </a>
              <a
                href="#"
                className="group w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500/30 hover:to-blue-500/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-110"
              >
                <IconSelector
                  icon="linkedin"
                  size={20}
                  className="text-white group-hover:text-purple-300 transition-colors"
                />
              </a>
              <a
                href="#"
                className="group w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500/30 hover:to-blue-500/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-110"
              >
                <IconSelector
                  icon="youtube"
                  size={20}
                  className="text-white group-hover:text-purple-300 transition-colors"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
