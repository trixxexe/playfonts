import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="toast-animation fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-5 py-3 text-white text-sm font-medium shadow-2xl flex items-center gap-2 pointer-events-none"
    >
      <span className="text-emerald-400">✨</span>
      <span>{message}</span>
    </div>
  );
}
