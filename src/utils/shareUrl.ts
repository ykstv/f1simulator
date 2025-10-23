import { RaceResult, DriverName } from '../types';
import { RACES, LOCKED_RACE_RESULTS } from '../constants';

const DRIVER_ORDER: DriverName[] = ['Max', 'Lando', 'Oscar'];
const BASE_URL = 'https://ykstv.com/';

export function encodeRaceResults(raceResults: RaceResult): string {
  const raceGroups = RACES.map(race => {
    const positions = DRIVER_ORDER.map(driver => {
      const position = raceResults[race.id]?.[driver];
      return position ?? 1;
    });
    return positions.join('-');
  });

  return raceGroups.join(',');
}

export function generateShareUrl(raceResults: RaceResult): string {
  const encodedData = encodeRaceResults(raceResults);
  return `${BASE_URL}?r=${encodedData}`;
}

export function decodeUrlParameter(urlParam: string): RaceResult | null {
  try {
    const raceGroups = urlParam.split(',');

    if (raceGroups.length !== RACES.length) {
      return null;
    }

    const results: RaceResult = {};

    RACES.forEach((race, raceIndex) => {
      const positions = raceGroups[raceIndex].split('-').map(p => parseInt(p, 10));

      if (positions.length !== DRIVER_ORDER.length || positions.some(isNaN)) {
        throw new Error('Invalid positions');
      }

      if (race.locked && LOCKED_RACE_RESULTS[race.id]) {
        results[race.id] = { ...LOCKED_RACE_RESULTS[race.id] };
      } else {
        results[race.id] = {};
        DRIVER_ORDER.forEach((driver, driverIndex) => {
          results[race.id][driver] = positions[driverIndex];
        });
      }
    });

    return results;
  } catch (error) {
    console.error('Failed to decode URL parameter:', error);
    return null;
  }
}

export function loadFromUrl(): RaceResult | null {
  const urlParams = new URLSearchParams(window.location.search);
  const rParam = urlParams.get('r');

  if (!rParam) {
    return null;
  }

  return decodeUrlParameter(rParam);
}
