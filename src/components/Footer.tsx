import React from 'react';

interface FooterProps {
  isMobile?: boolean;
}

export function Footer({ isMobile = false }: FooterProps) {
  const handleTipClick = () => {
    window.open('https://revolut.me/ykostiv', '_blank', 'noopener,noreferrer');
  };

  const handleContactClick = () => {
    window.location.href = 'mailto:kostiv.yuriy@gmail.com';
  };

  if (isMobile) {
    return (
      <footer className="bg-white border-t border-gray-200 shadow-lg mt-4">
        <div className="px-2 py-3">
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="font-bold text-xs mb-1">F1 Championship Scenarios</h3>
              <p className="text-[10px] text-gray-600 leading-tight">
                Over 951 trillion ways this championship could end.
                Skip the math — tap, select, and see who takes the crown. 👑
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleTipClick}
                className="flex-1 px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded text-xs"
              >
                ☕ Tip
              </button>

              <button
                onClick={handleContactClick}
                className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded text-xs"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-[1800px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between gap-8">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">F1 Championship Scenarios</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Over 951 trillion ways this championship could end.<br />
              Skip the math — drag, drop, and see who takes the crown. 👑
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleTipClick}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              ☕ Leave a Tip
            </button>

            <button
              onClick={handleContactClick}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Contact / Feedback
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
