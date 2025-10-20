import { REGULAR_RACE_POINTS, SPRINT_RACE_POINTS, DRIVERS, RACES } from '../constants';
import { RaceResult, RaceType, DriverName } from '../types';

export function getPointsForPosition(position: number, raceType: RaceType): number {
  if (raceType === 'sprint') {
    return SPRINT_RACE_POINTS[position] || 0;
  }
  return REGULAR_RACE_POINTS[position] || 0;
}

export function calculateDriverTotalPoints(
  driverName: DriverName,
  raceResults: RaceResult
): number {
  const driver = DRIVERS.find(d => d.name === driverName);
  if (!driver) return 0;

  let totalPoints = driver.startingPoints;

  RACES.forEach(race => {
    const position = raceResults[race.id]?.[driverName];
    if (position) {
      totalPoints += getPointsForPosition(position, race.type);
    }
  });

  return totalPoints;
}

export function calculateAllDriverPoints(raceResults: RaceResult) {
  return DRIVERS.map(driver => ({
    name: driver.name,
    color: driver.color,
    totalPoints: calculateDriverTotalPoints(driver.name, raceResults),
  })).sort((a, b) => b.totalPoints - a.totalPoints);
}
