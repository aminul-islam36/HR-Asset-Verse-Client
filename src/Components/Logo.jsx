import React from "react";
import { Link } from "react-router";
import AssetLogo from "/logo.png";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200 group"
    >
      {/* Logo Image */}
      <div className="relative">
        <img
          src={AssetLogo}
          alt="AssetVerse Logo"
          className="w-10 h-10 lg:w-12 lg:h-12 object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Logo Text */}
      <div className="hidden sm:flex flex-col">
        <span className="text-xl lg:text-2xl font-bold text-neutral leading-tight">
          Asset<span className="text-primary">Verse</span>
        </span>
        <span className="text-xs lg:text-sm text-secondary font-medium -mt-1">
          HR Management
        </span>
      </div>
    </Link>
  );
};

export default Logo;
