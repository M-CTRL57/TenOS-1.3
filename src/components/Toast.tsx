
import { motion, AnimatePresence } from 'motion/react';

export default function Toast({ message, visible }: { message: string, visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="absolute bottom-20 left-8 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-2xl z-[60]"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
