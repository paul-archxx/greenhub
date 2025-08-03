import React from "react";
import IconSelector from "./IconSelector";

const Footer: React.FC = () => {
  return (
    <div
      className="relative overflow-hidden isolate"
      // style={{ backgroundColor: "#080a29" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/background-line.png')",
        }}
      />

      {/* Left Light Effect */}
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
          opacity: 0.5,
        }}
      />

      {/* Right Light Effect */}
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
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        {/* Additional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Defi Farming</h3>
            <p className="text-gray-300">
              Click here for Defi farming / commercial farming issues
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Validation</h3>
            <p className="text-gray-300">
              Click here to validate your wallet using multisig
            </p>
          </div>
        </div>

        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/20">
          {/* Left side - Legal links */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mb-6 md:mb-0">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Term & Conditions
            </a>
            <div className="text-gray-400 text-sm">
              © 2024, Decentralized Dapps
            </div>
          </div>

          {/* Right side - Social media */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <IconSelector icon="facebook" size={20} className="text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <IconSelector icon="twitter" size={20} className="text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <IconSelector icon="linkedin" size={20} className="text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <IconSelector icon="youtube" size={20} className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
