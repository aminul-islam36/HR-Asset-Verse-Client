import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="text-4xl font-bold">
        HR <span className="text-secondary">Varse</span>
      </Link>
    </div>
  );
};

export default Logo;
