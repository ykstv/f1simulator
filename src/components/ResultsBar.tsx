import React, { useState } from 'react';
import { Share2 } from 'lucide-react';

interface ResultsBarProps {
  drivers: Array<{
    name: string;
    color: string;
    totalPoints: number;
  }>;
  isMobile?: boolean;
  onShare?: () => void;
}

export function ResultsBar({ drivers, isMobile = false, onShare }: ResultsBarProps) {
  const firstPlacePoints = drivers[0]?.totalPoints || 0;
  const [showToast, setShowToast] = useState(false);

  const handleShare = () => {
    onShare?.();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (isMobile) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-md mb-2 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold whitespace-nowrap">RESULTS:</h1>
          <div className="flex gap-1 flex-1">
            {drivers.map((driver, index) => {
              const delta = index > 0 ? driver.totalPoints - firstPlacePoints : null;

              return (
                <div
                  key={driver.name}
                  className={`flex items-center justify-between px-2 py-1 rounded-md flex-1 transition-all duration-300 ${
                    index === 0 ? 'ring-1 ring-offset-1 ring-gray-400' : ''
                  }`}
                  style={{ backgroundColor: driver.color }}
                >
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-gray-900">{index + 1}</span>
                    <span className="text-xs font-semibold text-gray-900">{driver.name.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-gray-900">{driver.totalPoints}</span>
                    {delta !== null && (
                      <span className="text-[10px] font-semibold text-gray-700">({delta})</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-150 whitespace-nowrap"
            title="Share scenario"
          >
            <Share2 size={12} />
            Share
          </button>
        </div>
        {showToast && (
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-xs z-50 animate-fade-in">
            Link copied! Send it to a friend to view this scenario.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <div className="flex items-center gap-6">
        <h1 className="text-3xl font-bold">RESULTS:</h1>
        <div className="flex gap-4 flex-1">
          {drivers.map((driver, index) => {
            const delta = index > 0 ? driver.totalPoints - firstPlacePoints : null;

            return (
              <div
                key={driver.name}
                className={`flex items-center justify-between px-6 py-3 rounded-md flex-1 transition-all duration-300 ${
                  index === 0 ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                }`}
                style={{ backgroundColor: driver.color }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-900">{index + 1}</span>
                  <span className="text-lg font-semibold text-gray-900">{driver.name.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">{driver.totalPoints}</span>
                  {delta !== null && (
                    <span className="text-sm font-semibold text-gray-700">({delta})</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-3 text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-150 whitespace-nowrap"
          title="Share scenario"
        >
          <Share2 size={18} />
          Share
        </button>
      </div>
      {showToast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg text-base z-50 animate-fade-in">
          Link copied! Send it to a friend to view this scenario.
        </div>
      )}
    </div>
  );
}
