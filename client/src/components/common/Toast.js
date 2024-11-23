import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { twMerge } from "tailwind-merge";
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "./../icons";

const Toast = ({ isShow, type, content }) => {
  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          style={{
            position: "fixed",
            left: "50%",
            top: "20px",
            translateX: "-50%",
            zIndex: 999999,
          }}
          initial={{
            scaleY: 0.4,
            scaleX: 0.6,
            opacity: 0,
          }}
          animate={{
            scaleY: 1,
            scaleX: 1,
            opacity: 1,
          }}
          exit={{
            scaleY: 0.2,
            scaleX: 0.6,
            opacity: 0,
          }}
          transition={{
            type: "spring",
          }}
        >
          <div
            role="alert"
            className={twMerge(
              "alert font-harmattan",
              type === "info"
                ? "alert-info"
                : type === "error"
                ? "alert-error"
                : type === "warning"
                ? "alert-warning"
                : type === "success"
                ? "alert-success"
                : ""
            )}
          >
            {type === "info" ? (
              <InfoIcon />
            ) : type === "error" ? (
              <ErrorIcon />
            ) : type === "warning" ? (
              <WarningIcon />
            ) : type === "success" ? (
              <SuccessIcon />
            ) : null}
            {content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
