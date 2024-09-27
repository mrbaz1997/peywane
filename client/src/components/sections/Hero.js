import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import BackdropImage from "./../BackdropImage";

const Hero = () => {
    console.log("Start client/app.js")
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ transform: "translateX(-100%)" }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 50,
          // delay: 1,
        }}
        className="hero min-h-screen relative"
      >
        <BackdropImage />
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center prose">
          <div className="">
            <h1 className="mb-5 text-5xl font-bold ![animation-delay:0.5s] text-nowrap text-center">
              بە خێر بێی هاوڕێی خۆشەویست
            </h1>
            <p className="mb-5 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              distinctio, vel neque explicabo praesentium voluptate dignissimos
              tempora sit tenetur, deserunt expedita veniam accusamus,
              doloremque corporis nemo. Natus et assumenda quos.
            </p>
            <Link
              to={"/login"}
              className="btn btn-primary hover:scale-110 no-underline text-black"
            >
              بڕۆ بۆ بەشی پرسیارەکان
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Hero;
