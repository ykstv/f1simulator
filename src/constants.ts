import { Driver, Race } from './types';

export const DRIVERS: Driver[] = [
  { name: 'Max', color: '#A78BFA', startingPoints: 306 },
  { name: 'Lando', color: '#FDBA74', startingPoints: 332 },
  { name: 'Oscar', color: '#FACC15', startingPoints: 346 },
];

export const RACES: Race[] = [
  { id: 'mexico', name: 'MEXICO', type: 'regular' },
  { id: 'brazil-sprint', name: 'BRAZIL (SPRINT)', type: 'sprint' },
  { id: 'brazil', name: 'BRAZIL', type: 'regular' },
  { id: 'las-vegas', name: 'LAS VEGAS', type: 'regular' },
  { id: 'qatar-sprint', name: 'QATAR (SPRINT)', type: 'sprint' },
  { id: 'qatar', name: 'QATAR', type: 'regular' },
  { id: 'abu-dhabi', name: 'ABU DHABI', type: 'regular' },
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
