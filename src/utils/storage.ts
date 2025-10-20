import { STORAGE_KEY, RACES, DRIVERS } from '../constants';
import { ChampionshipState, RaceResult } from '../types';

export function getDefaultRaceResults(): RaceResult {
  const results: RaceResult = {};

  RACES.forEach(race => {
    results[race.id] = {
      'Oscar': 1,
      'Lando': 2,
      'Max': 3,
    };
  });

  return results;
}

export function saveToLocalStorage(state: ChampionshipState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export function loadFromLocalStorage(): ChampionshipState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
  }
  return null;
}

export function getInitialState(): ChampionshipState {
  const saved = loadFromLocalStorage();
  if (saved) {
    return saved;
  }

  return {
    raceResults: getDefaultRaceResults(),
  };
}
