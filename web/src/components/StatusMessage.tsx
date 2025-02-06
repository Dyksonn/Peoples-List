import { CheckCircle2, AlertCircle, XCircle, Info } from "lucide-react";
import { useEffect } from "react";

interface StatusMessageProps {
  isVisible: boolean;
  status?: number;
  message?: string;
  onClose?: () => void;
}

export function StatusMessage({ isVisible, status, message, onClose }: StatusMessageProps) {
  if (!isVisible) return null;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">
          Erro {status}
        </h2>
        <p className="text-white text-lg mb-6">
          {message}
        </p>
        <button
          onClick={onClose}
          className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition text-white"
        >
          Voltar
        </button>
      </div>
    </div>
  );
} 