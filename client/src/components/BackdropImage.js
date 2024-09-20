import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

const BackdropImage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <img
      src="https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp"
      alt="backdrop"
      className={twMerge(
        `fixed -z-10 size-full object-cover transition-all duration-500`,
        `${!isLoaded ? "blur-md" : ""}`
      )}
      onLoad={() => setIsLoaded(true)}
    />
  );
};

export default BackdropImage;
