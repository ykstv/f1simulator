import { Driver, Race } from './types';

export const DRIVERS: Driver[] = [
  { name: 'Max', color: '#A78BFA', startingPoints: 306 },
  { name: 'Lando', color: '#FDBA74', startingPoints: 332 },
  { name: 'Oscar', color: '#FACC15', startingPoints: 346 },
];

export const RACES: Race[] = [
  { id: 'mexico', name: 'MEXICO', type: 'regular', locked: true },
  { id: 'brazil-sprint', name: 'BRAZIL (SPRINT)', type: 'sprint', locked: true },
  { id: 'brazil', name: 'BRAZIL', type: 'regular', locked: true },
  { id: 'las-vegas', name: 'LAS VEGAS', type: 'regular', locked: true },
  { id: 'qatar-sprint', name: 'QATAR (SPRINT)', type: 'sprint', locked: true },
  { id: 'qatar', name: 'QATAR', type: 'regular', locked: true },
  { id: 'abu-dhabi', name: 'ABU DHABI', type: 'regular', locked: true },
];

export const REGULAR_RACE_POINTS: { [position: number]: number } = {
  1: 25,
  2: 18,
  3: 15,
  4: 12,
  5: 10,
  6: 8,
  7: 6,
  8: 4,
  9: 2,
  10: 1,
};

export const SPRINT_RACE_POINTS: { [position: number]: number } = {
  1: 8,
  2: 7,
  3: 6,
  4: 5,
  5: 4,
  6: 3,
  7: 2,
  8: 1,
};

export const GRID_POSITIONS = 13;

export const STORAGE_KEY = 'f1-championship-simulator';

export const LOCKED_RACE_RESULTS: { [raceId: string]: { [driverName: string]: number } } = {
  mexico: {
    Lando: 1,
    Max: 3,
    Oscar: 5,
  },
  'brazil-sprint': {
    Lando: 1,
    Max: 4,
    Oscar: 13,
  },
  brazil: {
    Lando: 1,
    Max: 3,
    Oscar: 5,
  },
  'las-vegas': {
    Max: 1,
    Lando: 12,
    Oscar: 13,
  },
  'qatar-sprint': {
    Oscar: 1,
    Lando: 3,
    Max: 4,
  },
  qatar: {
    Max: 1,
    Oscar: 2,
    Lando: 4,
  },
  'abu-dhabi': {
    Max: 1,
    Oscar: 2,
    Lando: 3,
  },
};
