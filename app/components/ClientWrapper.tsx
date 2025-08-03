"use client";

import React from "react";
import CryptoHeader from "./CryptoHeader";
import HeroSection from "./HeroSection";
import SyncTypeCards from "./SyncTypeCards";
import Footer from "./Footer";

const ClientWrapper: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">
      <CryptoHeader />
      <HeroSection />
      <div className="py-16">
        <SyncTypeCards />
      </div>
      <Footer />
    </div>
  );
};

export default ClientWrapper;
