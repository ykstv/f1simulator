import React from 'react';
import { Share2 } from 'lucide-react';

interface ResultsBarProps {
  drivers: Array<{
    name: string;
    color: string;
    totalPoints: number;
  }>;
  isMobile?: boolean;
  onShareClick?: () => void;
}

export function ResultsBar({ drivers, isMobile = false, onShareClick }: ResultsBarProps) {
  const firstPlacePoints = drivers[0]?.totalPoints || 0;

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
        </div>
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
          {onShareClick && (
            <button
              onClick={onShareClick}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
            >
              <Share2 size={20} />
              <span>Share</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
