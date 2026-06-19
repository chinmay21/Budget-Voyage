import { useEffect, useState } from "react";
import { Plane } from "lucide-react";
import { motion } from "framer-motion";

const MESSAGES = [
  "Calculating flight costs...",
  "Estimating hotel expenses...",
  "Preparing budget insights...",
  "Building your trip plan..."
];

export function LoadingScreen() {
  const [messageIdx, setMessageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIdx((prev) => (prev + 1) % MESSAGES.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center max-w-lg mx-auto px-4">
      <div className="w-full relative h-20 mb-8">
        {/* Progress Bar Path */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 rounded-full transform -translate-y-1/2 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-indigo-500 to-teal-400"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </div>
        
        {/* Flying Airplane */}
        <motion.div 
          className="absolute top-1/2 -mt-4 text-indigo-400 filter drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]"
          initial={{ left: "0%" }}
          animate={{ left: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          <Plane className="w-8 h-8 transform rotate-45" />
        </motion.div>
      </div>
      
      <motion.p
        key={messageIdx}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        className="text-lg font-medium text-white/80 h-8"
      >
        {MESSAGES[messageIdx]}
      </motion.p>
    </div>
  );
}
