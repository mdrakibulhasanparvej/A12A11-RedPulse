import React from "react";
import { motion } from "framer-motion";
import BloodDrop from "./BloodDrop";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div
      className="fixed w-full inset-0 z-50 flex flex-col items-center justify-center
       dark:bg-gray-900/95 backdrop-blur-sm"
    >
      {/*  Animated Drops */}
      <div className="flex items-end gap-4 md:gap-6">
        {[0, 0.2, 0.4].map((delay, index) => (
          <BloodDrop key={index} delay={delay} />
        ))}
      </div>

      {/*  Text */}
      <motion.p
        className="mt-8 text-lg sm:text-xl md:text-2xl font-semibold
          text-red-600 dark:text-red-400 tracking-wide"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
