import { STORAGE_KEY, RACES, LOCKED_RACE_RESULTS } from '../constants';
import { ChampionshipState, RaceResult } from '../types';
import { loadFromUrl } from './shareUrl';

export function getDefaultRaceResults(): RaceResult {
  const results: RaceResult = {};

  RACES.forEach(race => {
    if (LOCKED_RACE_RESULTS[race.id]) {
      results[race.id] = { ...LOCKED_RACE_RESULTS[race.id] };
    } else {
      results[race.id] = {
        'Max': 1,
        'Lando': 2,
        'Oscar': 3,
      };
    }
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
  const urlResults = loadFromUrl();
  if (urlResults) {
    return {
      raceResults: urlResults,
    };
  }

  const saved = loadFromLocalStorage();
  if (saved) {
    return {
      raceResults: saved.raceResults,
    };
  }

  return {
    raceResults: getDefaultRaceResults(),
  };
}
