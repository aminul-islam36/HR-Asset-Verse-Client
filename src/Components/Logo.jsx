import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="text-2xl lg:text-4xl font-bold">
        Asset<span className="text-secondary">Link</span>
      </Link>
    </div>
  );
};

export default Logo;
