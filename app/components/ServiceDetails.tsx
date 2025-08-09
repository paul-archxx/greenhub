"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import { useAppStore } from "../store/useAppStore";

interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
  benefits: string[];
}

const ServiceDetails: React.FC = () => {
  const { setShowWalletModal } = useAppStore();

  const handleConnectWallet = () => {
    setShowWalletModal(true);
  };

  const features: ServiceFeature[] = [
    {
      icon: "🛡️",
      title: "Security First",
      description:
        "Your wallet security is our top priority. We use industry-standard encryption and secure protocols to protect your assets.",
      benefits: [
        "End-to-end encryption",
        "Multi-signature support",
        "Secure key management",
        "24/7 security monitoring",
      ],
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description:
        "Experience blazing-fast transaction processing and real-time updates across all supported networks.",
      benefits: [
        "Instant transaction confirmation",
        "Real-time balance updates",
        "Cross-chain compatibility",
        "Optimized gas fees",
      ],
    },
    {
      icon: "🌐",
      title: "Multi-Chain Support",
      description:
        "Connect and manage wallets across multiple blockchain networks from a single, unified interface.",
      benefits: [
        "Ethereum & EVM chains",
        "Bitcoin & Lightning Network",
        "Solana ecosystem",
        "Cosmos & Polkadot",
      ],
    },
    {
      icon: "🔧",
      title: "Advanced Tools",
      description:
        "Access powerful tools for DeFi operations, token management, and portfolio tracking.",
      benefits: [
        "DeFi protocol integration",
        "Token swapping & staking",
        "Portfolio analytics",
        "Yield farming tools",
      ],
    },
  ];

  const statistics = [
    { number: "50K+", label: "Active Users" },
    { number: "100+", label: "Supported Tokens" },
    { number: "15+", label: "Blockchain Networks" },
    { number: "99.9%", label: "Uptime" },
  ];

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto px-6 py-20 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-3xl" />

      <div className="relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Why Choose GreenHub?
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Experience the next generation of decentralized finance with our
            comprehensive suite of tools designed for security, speed, and
            simplicity.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden cursor-pointer hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 h-full hover:border-purple-500/40 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-blue-500/10 transition-all duration-300">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-purple-500/30 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          className="relative bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 rounded-2xl" />

          <div className="relative z-10">
            <motion.h3
              className="font-heading text-3xl font-bold text-white text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Trusted by Thousands
            </motion.h3>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {statistics.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3
            className="font-heading text-3xl md:text-4xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            How It Works
          </motion.h3>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              {
                icon: "🔗",
                title: "Connect Wallet",
                description:
                  "Securely connect your existing wallet or create a new one with our advanced security features.",
              },
              {
                icon: "⚙️",
                title: "Select Service",
                description:
                  "Choose from our comprehensive range of DeFi services tailored to your specific needs.",
              },
              {
                icon: "🚀",
                title: "Execute & Monitor",
                description:
                  "Execute transactions with confidence and monitor your portfolio in real-time.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.6 + index * 0.2,
                  ease: "easeOut",
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-purple-500/30 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <h4 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {step.title}
                </h4>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 rounded-2xl" />

            <div className="relative z-10">
              <motion.h3
                className="font-heading text-3xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Ready to Get Started?
              </motion.h3>
              <motion.p
                className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Join thousands of users who trust GreenHub for their DeFi
                operations. Start your journey today with our secure and
                user-friendly platform.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Button
                  onClick={handleConnectWallet}
                  className="mx-auto uppercase"
                >
                  Connect Wallet
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceDetails;
