export type DriverName = 'Max' | 'Lando' | 'Oscar';

export type RaceType = 'regular' | 'sprint';

export interface Driver {
  name: DriverName;
  color: string;
  startingPoints: number;
}

export interface Race {
  id: string;
  name: string;
  type: RaceType;
  locked?: boolean;
}

export interface RaceResult {
  [raceId: string]: {
    [driverName: string]: number | null;
  };
}

export interface ChampionshipState {
  raceResults: RaceResult;
}
