import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative"
        >
          <div className="absolute top-4 right-4 z-10">
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6 md:p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            
            <h3 className="text-xl font-serif text-[#111] mb-2">Delete Property</h3>
            <p className="text-gray-500 text-[15px] mb-8">
              Are you sure you want to delete this plot? This action cannot be undone.
            </p>
            
            <div className="flex w-full gap-4">
              <button 
                onClick={onClose}
                className="flex-1 px-5 py-3 bg-gray-50 text-gray-700 text-[13px] uppercase font-semibold tracking-wider rounded border border-gray-200 hover:bg-gray-100 hover:text-black transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => { onConfirm(); onClose(); }}
                className="flex-1 px-5 py-3 bg-red-500 text-white text-[13px] uppercase font-semibold tracking-wider rounded border border-red-500 hover:bg-red-600 hover:border-red-600 transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmDeleteModal;
