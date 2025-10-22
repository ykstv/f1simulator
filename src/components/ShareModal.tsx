import { X, Copy } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface ShareModalProps {
  url: string;
  onClose: () => void;
  onCopySuccess: () => void;
  onCopyError: () => void;
}

export function ShareModal({ url, onClose, onCopySuccess, onCopyError }: ShareModalProps) {
  const handleCopy = async () => {
    const success = await copyToClipboard(url);

    if (success) {
      onCopySuccess();
      setTimeout(() => {
        onClose();
      }, 300);
    } else {
      onCopyError();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Share Scenario</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Copy this URL to share the current race scenario:
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <input
            type="text"
            value={url}
            readOnly
            className="w-full bg-transparent text-sm text-gray-900 outline-none select-all"
            onClick={(e) => e.currentTarget.select()}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <Copy size={18} />
            Copy URL
          </button>
        </div>
      </div>
    </div>
  );
}
