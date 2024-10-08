import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackdropImage from "./../BackdropImage";

const Hero = () => {
  const timeoutRef = useRef();
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleNavigation = () => {
    setIsExiting(true);
    timeoutRef.current = setTimeout(() => {
      navigate("/signin");
    }, 200);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ transform: "translateX(-100%)" }}
          className="hero min-h-screen relative"
        >
          <BackdropImage />
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center prose">
            <div className="">
              <h1 className="mb-5 text-4xl md:text-5xl font-bold ![animation-delay:0.5s] text-center leading-[56px]">
                بە خێر بێی هاوڕێی خۆشەویست
              </h1>
              {/* <p className="mb-5 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                distinctio, vel neque explicabo praesentium voluptate
                dignissimos tempora sit tenetur, deserunt expedita veniam
                accusamus, doloremque corporis nemo. Natus et assumenda quos.
              </p> */}
              <button
                onClick={handleNavigation}
                className="btn btn-primary hover:scale-110 no-underline text-black mt-10"
              >
                چونەژوور
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Hero;
