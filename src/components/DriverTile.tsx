import React from 'react';
import { DriverName } from '../types';

interface DriverTileProps {
  driverName: DriverName;
  color: string;
  points: number;
  position: number;
  raceId: string;
  onDragStart: (driverName: DriverName, position: number) => void;
  onDragEnd: () => void;
  locked?: boolean;
}

export function DriverTile({
  driverName,
  color,
  points,
  position,
  raceId,
  onDragStart,
  onDragEnd,
  locked = false,
}: DriverTileProps) {
  const handleDragStart = (e: React.DragEvent) => {
    if (locked) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify({ driverName, fromPosition: position, raceId }));
    onDragStart(driverName, position);
  };

  return (
    <div
      draggable={!locked}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      className={`flex items-center justify-between px-4 py-2 rounded transition-opacity ${
        locked ? 'cursor-not-allowed' : 'cursor-move hover:opacity-80'
      }`}
      style={{ backgroundColor: color }}
    >
      <span className="font-semibold text-gray-900">{driverName.toUpperCase()}</span>
      <span className="font-bold text-gray-900">+{points}</span>
    </div>
  );
}
