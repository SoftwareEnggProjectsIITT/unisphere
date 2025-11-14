import React from "react";
import { X } from "lucide-react";

interface ConfessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  confession: {
    id: string;
    header: string;
    message: string;
    theme: string;
    createdAt: string;
  } | null;
}

const ConfessionModal: React.FC<ConfessionModalProps> = ({
  isOpen,
  onClose,
  confession,
}) => {
  if (!isOpen || !confession) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-background text-foreground w-[90%] max-w-md rounded-2xl shadow-lg p-6 transition-transform">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-3">{confession.header}</h2>
        <p className="whitespace-pre-wrap text-sm leading-relaxed">
          {confession.message}
        </p>

        <div className="text-xs text-muted-foreground mt-4">
          {new Date(confession.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default ConfessionModal;
