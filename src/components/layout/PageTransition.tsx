"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

export default function PageTransition({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full min-h-screen bg-[#0c0c0c]"
    >
      {children}
    </motion.div>
  );
}
