import React from "react";
import { motion } from "framer-motion";

const BloodDrop = ({ delay }) => {
  return (
    <motion.svg
      viewBox="0 0 100 160"
      xmlns="http://www.w3.org/2000/svg"
      className="
        w-12 h-20 sm:w-14 sm:h-24 md:w-16 md:h-28 lg:w-20 lg:h-32
        drop-shadow-xl
        text-red-600 dark:text-rose-400
      "
      initial={{ y: 0, scale: 1 }}
      animate={{
        y: [0, -15, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {/* Gradient */}
      <defs>
        <linearGradient
          id={`bloodGradient-${delay}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Main Drop */}
      <path
        d="M50 10
           Q20 55, 30 100
           Q40 135, 50 145
           Q60 135, 70 100
           Q80 55, 50 10"
        fill={`url(#bloodGradient-${delay})`}
      />

      {/* Drip */}
      <motion.circle
        cx="50"
        cy="150"
        r="4"
        fill="currentColor"
        animate={{ opacity: [0, 1, 0], y: [0, 8] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay,
        }}
      />
    </motion.svg>
  );
};

export default BloodDrop;
