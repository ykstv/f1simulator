import React, { useState } from 'react';
import { Race, DriverName, RaceResult } from '../types';
import { DRIVERS, GRID_POSITIONS } from '../constants';
import { DriverTile } from './DriverTile';
import { getPointsForPosition } from '../utils/points';

interface RaceColumnProps {
  race: Race;
  raceResults: RaceResult;
  onPositionChange: (raceId: string, driverName: DriverName, newPosition: number | null) => void;
}

export function RaceColumn({ race, raceResults, onPositionChange }: RaceColumnProps) {
  const [draggedDriver, setDraggedDriver] = useState<{
    name: DriverName;
    fromPosition: number;
  } | null>(null);
  const [dragOverPosition, setDragOverPosition] = useState<number | null>(null);

  const currentResults = raceResults[race.id] || {};

  const getDriverAtPosition = (position: number): DriverName | null => {
    for (const driverName of Object.keys(currentResults)) {
      if (currentResults[driverName] === position) {
        return driverName as DriverName;
      }
    }
    return null;
  };

  const handleDragStart = (driverName: DriverName, fromPosition: number) => {
    setDraggedDriver({ name: driverName, fromPosition });
  };

  const handleDragEnd = () => {
    setDraggedDriver(null);
    setDragOverPosition(null);
  };

  const handleDragOver = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverPosition(position);
  };

  const handleDragLeave = () => {
    setDragOverPosition(null);
  };

  const handleDrop = (e: React.DragEvent, toPosition: number) => {
    e.preventDefault();
    setDragOverPosition(null);

    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));

      if (data.raceId !== race.id) {
        return;
      }

      const { driverName, fromPosition } = data;

      const driverAtTarget = getDriverAtPosition(toPosition);

      if (driverAtTarget && driverAtTarget !== driverName) {
        onPositionChange(race.id, driverAtTarget, fromPosition);
      }

      onPositionChange(race.id, driverName, toPosition);
    } catch (error) {
      console.error('Drop failed:', error);
    }
  };

  const positions = Array.from({ length: GRID_POSITIONS }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-w-[180px]">
      <h2 className="text-center font-bold text-sm mb-4 pb-2 border-b-2 border-gray-200">
        {race.name}
      </h2>
      <div className="space-y-1">
        {positions.map(position => {
          const driver = getDriverAtPosition(position);
          const driverData = driver ? DRIVERS.find(d => d.name === driver) : null;
          const points = driver ? getPointsForPosition(position, race.type) : 0;
          const isDraggedOver = dragOverPosition === position;
          const isBeingDragged = draggedDriver?.name === driver;

          return (
            <div
              key={position}
              onDragOver={(e) => handleDragOver(e, position)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, position)}
              className={`flex items-center gap-2 min-h-[40px] rounded transition-all ${
                isDraggedOver ? 'bg-blue-100 ring-2 ring-blue-400' : ''
              } ${isBeingDragged ? 'opacity-50' : ''}`}
            >
              <div className="w-6 text-center text-sm font-medium text-gray-600">
                {position}
              </div>
              <div className="flex-1">
                {driver && driverData ? (
                  <DriverTile
                    driverName={driver}
                    color={driverData.color}
                    points={points}
                    position={position}
                    raceId={race.id}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ) : (
                  <div className="h-[36px] bg-gray-100 rounded"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
