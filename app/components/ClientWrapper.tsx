"use client";

import React from "react";
import HeroSection from "./HeroSection";
import SyncTypeCards from "./SyncTypeCards";
import ServiceDetails from "./ServiceDetails";
import Footer from "./Footer";
import Image from "next/image";
import ParticlesComponent from "./Particles";

const ClientWrapper: React.FC = () => {
  return (
    <div
      className="min-h-screen relative isolate overflow-hidden"
      style={{ backgroundColor: "#080a29" }}
    >
      <ParticlesComponent />
      {/* Left Light Effect */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "-60%",
          width: "100%",
          height: "100%",
          zIndex: -1,
          background:
            "radial-gradient(34.98% 34.98% at 50% 50%, #725bda 0, rgba(6, 19, 45, 0) 100%)",
          opacity: 0.5,
        }}
      />

      {/* Right Light Effect */}
      <Image
        src="/background-line.png"
        alt="Background"
        width={1000}
        height={1000}
        quality={100}
        priority={true}
        className="absolute pointer-events-none size-full z-10"
      />
      <div
        className="absolute"
        style={{
          top: "0%",
          left: "-30%",
          width: "100%",
          height: "100%",
          zIndex: -1,
          background:
            "radial-gradient(34.98% 34.98% at 50% 50%, #725bda 0, rgba(6, 19, 45, 0) 100%)",
          opacity: 0.3,
        }}
      />
      {/* Background image */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background-line.png')",
        }}
      /> */}
      {/* <CryptoHeader /> */}
      <HeroSection />
      <div className="py-16">
        <SyncTypeCards />
      </div>
      <ServiceDetails />
      <Footer />
    </div>
  );
};

export default ClientWrapper;
