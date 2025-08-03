import React from "react";
import Image from "next/image";

interface IconSelectorProps {
  icon: string;
  className?: string;
  size?: number;
}

const IconSelector: React.FC<IconSelectorProps> = ({
  icon,
  className = "",
  size = 24,
}) => {
  const iconMap: Record<string, string> = {
    wallet: "/icons/wallet.svg",
    chain: "/icons/chain.svg",
    chevronDown: "/icons/chevron-down.svg",
    facebook: "/icons/facebook.svg",
    twitter: "/icons/twitter.svg",
    linkedin: "/icons/linkedin.svg",
    youtube: "/icons/youtube.svg",
  };

  const iconPath = iconMap[icon];

  if (!iconPath) {
    console.warn(`Icon "${icon}" not found in IconSelector`);
    return null;
  }

  return (
    <Image
      src={iconPath}
      alt={`${icon} icon`}
      className={className}
      width={size}
      height={size}
    />
  );
};

export default IconSelector;
