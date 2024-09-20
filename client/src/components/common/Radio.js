import React from "react";
import { twMerge } from "tailwind-merge";

const Radio = ({ name, className = "", label }) => {
  return (
    <label className="flex items-center gap-2">
      <input
        type="radio"
        name={name}
        className={twMerge(`radio `, className)}
      />
      <span>{label}</span>
    </label>
  );
};

export default Radio;
