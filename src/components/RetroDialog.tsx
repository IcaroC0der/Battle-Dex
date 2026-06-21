"use client";

import { useEffect } from "react";

interface RetroDialogProps {
  isOpen: boolean;
  message: string;
  type?: "alert" | "confirm";
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function RetroDialog({
  isOpen,
  message,
  type = "alert",
  onConfirm,
  onCancel,
}: RetroDialogProps) {
  
  // Disable body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="gb-box w-full max-w-lg p-6 sm:p-8 animate-bounce-down">
        <div className="text-xl sm:text-2xl font-bold uppercase text-slate-900 leading-relaxed min-h-[4rem]">
          {message}
        </div>
        
        <div className="mt-8 flex justify-end gap-4">
          {type === "confirm" && onCancel && (
            <button
              onClick={onCancel}
              className="px-6 py-2 border-4 border-slate-800 bg-white hover:bg-slate-200 text-slate-800 font-bold uppercase text-xl shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
            >
              NÃO
            </button>
          )}
          
          <button
            onClick={onConfirm}
            className="px-6 py-2 border-4 border-slate-800 bg-red-600 hover:bg-red-500 text-white font-bold uppercase text-xl shadow-[4px_4px_0px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-4 focus:ring-red-300"
            autoFocus
          >
            {type === "confirm" ? "SIM" : "OK"}
          </button>
        </div>
      </div>
    </div>
  );
}
