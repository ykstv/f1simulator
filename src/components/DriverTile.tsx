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
}

export function DriverTile({
  driverName,
  color,
  points,
  position,
  raceId,
  onDragStart,
  onDragEnd,
}: DriverTileProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify({ driverName, fromPosition: position, raceId }));
    onDragStart(driverName, position);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      className="flex items-center justify-between px-4 py-2 rounded cursor-move hover:opacity-80 transition-opacity"
      style={{ backgroundColor: color }}
    >
      <span className="font-semibold text-gray-900">{driverName.toUpperCase()}</span>
      <span className="font-bold text-gray-900">+{points}</span>
    </div>
  );
}
