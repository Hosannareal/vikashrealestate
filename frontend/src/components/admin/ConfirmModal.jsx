import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', confirmColor = 'bg-[#e53935]', isLoading = false }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isLoading ? onClose : undefined}
            className="fixed inset-0 bg-black/50 z-[9999] backdrop-blur-[4px]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-[12px] shadow-[0_20px_40px_rgba(0,0,0,0.2)] z-[10000] overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-serif text-[#111111] mb-2">{title || 'Are you sure?'}</h3>
              <p className="text-[#6B6B6B] text-sm mb-6">{message}</p>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-5 py-2.5 rounded-[10px] text-sm font-semibold text-[#111111] hover:bg-[#f8f6f2] transition border border-[#e5e0d8] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white transition disabled:opacity-50 flex items-center justify-center min-w-[100px] ${confirmColor} hover:brightness-90`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    confirmText
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;