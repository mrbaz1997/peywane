import React from "react";
import { twMerge } from "tailwind-merge";

const Radio = ({ name, className = "", label, ...reset }) => {
  return (
    <span>
      <label className="flex items-center gap-2 w-fit">
        <input
          type="radio"
          name={name}
          className={twMerge(`radio `, className)}
          {...reset}
        />
        <span>{label}</span>
      </label>
    </span>
  );
};

export default Radio;
