import React from "react";

const Title = ({ title }) => {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
    </div>
  );
};

export default Title;
