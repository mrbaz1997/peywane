import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

const BackdropImage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="fixed -z-10 size-full">
      <picture>
        <source
          srcSet="./../../images/palngan-mobile.jpg"
          media="(max-width: 640px)"
        />
        <source
          srcSet="./../../images/palngan-tablet.jpg"
          media="(max-width: 1024px)"
        />
        <source
          srcSet="./../../images/wallpaper.png"
          media="(min-width: 1024px)"
        />
        <img
          src="./../../images/wallpaper.png"
          alt="backdrop img"
          onLoad={() => setIsLoaded(true)}
          className={twMerge(
            `object-cover transition-all duration-500 h-dvh w-screen`,
            `${!isLoaded ? "blur-md opacity-0" : "opacity-100"}`
          )}
        />
      </picture>
    </div>
  );
};

export default BackdropImage;
