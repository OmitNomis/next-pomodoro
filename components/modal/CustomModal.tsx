import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode | string;
}

export const CustomModal: FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg shadow-lg w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 p-8">
            <div className="text-2xl sm:text-3xl text-gray-800">{title}</div>
            <div className="mt-4">{content}</div>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-purple-700 text-white rounded-lg text-lg sm:text-xl hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                onClick={onClose}>
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
