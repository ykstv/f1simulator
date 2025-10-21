import React, { useState } from 'react';
import { Race, DriverName, RaceResult } from '../types';
import { DRIVERS, GRID_POSITIONS } from '../constants';
import { DriverTile } from './DriverTile';
import { getPointsForPosition } from '../utils/points';

interface RaceColumnProps {
  race: Race;
  raceResults: RaceResult;
  onPositionChange: (raceId: string, driverName: DriverName, newPosition: number | null) => void;
  isMobile?: boolean;
}

export function RaceColumn({ race, raceResults, onPositionChange, isMobile = false }: RaceColumnProps) {
  const [draggedDriver, setDraggedDriver] = useState<{
    name: DriverName;
    fromPosition: number;
  } | null>(null);
  const [dragOverPosition, setDragOverPosition] = useState<number | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<{
    name: DriverName;
    fromPosition: number;
  } | null>(null);

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

  const handleMobileTap = (position: number) => {
    if (!isMobile) return;

    const driverAtPosition = getDriverAtPosition(position);

    if (selectedDriver) {
      if (selectedDriver.fromPosition === position) {
        setSelectedDriver(null);
        return;
      }

      const driverAtTarget = getDriverAtPosition(position);

      if (driverAtTarget && driverAtTarget !== selectedDriver.name) {
        onPositionChange(race.id, driverAtTarget, selectedDriver.fromPosition);
      }

      onPositionChange(race.id, selectedDriver.name, position);
      setSelectedDriver(null);
    } else if (driverAtPosition) {
      setSelectedDriver({ name: driverAtPosition, fromPosition: position });
    }
  };

  const positions = Array.from({ length: GRID_POSITIONS }, (_, i) => i + 1);

  const getAbbreviatedName = (name: string) => {
    if (!isMobile) return name;

    const abbrevMap: { [key: string]: string } = {
      'MEXICO': 'MEX',
      'BRAZIL (SPRINT)': 'BRA (SP)',
      'BRAZIL': 'BRA',
      'LAS VEGAS': 'LV',
      'QATAR (SPRINT)': 'QAT (SP)',
      'QATAR': 'QAT',
      'ABU DHABI': 'ABU',
    };

    return abbrevMap[name] || name;
  };

  if (isMobile) {
    return (
      <div className="bg-white rounded shadow-sm flex-1 min-w-0">
        <h2 className="text-center font-bold text-[10px] py-1 border-b border-gray-200">
          {getAbbreviatedName(race.name)}
        </h2>
        <div className="space-y-[2px] p-1">
          {positions.slice(0, 10).map(position => {
            const driver = getDriverAtPosition(position);
            const driverData = driver ? DRIVERS.find(d => d.name === driver) : null;
            const points = driver ? getPointsForPosition(position, race.type) : 0;
            const isSelected = selectedDriver?.name === driver && selectedDriver?.fromPosition === position;

            return (
              <div
                key={position}
                onClick={() => handleMobileTap(position)}
                className={`flex items-center gap-[2px] min-h-[24px] rounded transition-all cursor-pointer ${
                  isSelected ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="w-4 text-center text-[10px] font-medium text-gray-600">
                  {position}
                </div>
                <div className="flex-1 min-w-0">
                  {driver && driverData ? (
                    <div
                      className="px-1 py-[2px] rounded text-[10px] font-semibold text-gray-900 flex items-center justify-between"
                      style={{ backgroundColor: driverData.color }}
                    >
                      <span className="truncate">{driver.toUpperCase()}</span>
                      <span className="text-[9px] ml-1">{points}</span>
                    </div>
                  ) : (
                    <div className="h-[20px] bg-gray-100 rounded"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

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
