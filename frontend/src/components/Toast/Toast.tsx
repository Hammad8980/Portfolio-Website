import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  durationMs?: number;
  className?: string;
}

const Toast = ({
  message,
  type,
  onClose,
  durationMs = 3500,
  className = 'bottom-6 right-6',
}: ToastProps) => {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const timer = setTimeout(() => onCloseRef.current(), durationMs);
    return () => clearTimeout(timer);
  }, [durationMs, message, type]);

  const isSuccess = type === 'success';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.96 }}
        transition={{ duration: 0.22 }}
        className={`fixed z-[100] max-w-sm ${className}`}
        role="status"
        aria-live="polite"
      >
        <div
          className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm ${
            isSuccess
              ? 'border-green-200 bg-white/95 text-green-800'
              : 'border-red-200 bg-white/95 text-red-800'
          }`}
        >
          <div
            className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
              isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {isSuccess ? (
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>

          <p className="flex-1 text-sm font-medium leading-5 pt-0.5">{message}</p>

          <button
            type="button"
            onClick={onClose}
            className="ml-1 text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Dismiss notification"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
