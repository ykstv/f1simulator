import { useState, useEffect } from 'react';
import { ResultsBar } from './components/ResultsBar';
import { RaceColumn } from './components/RaceColumn';
import { Footer } from './components/Footer';
import { RACES } from './constants';
import { ChampionshipState, DriverName, RaceResult } from './types';
import { calculateAllDriverPoints } from './utils/points';
import { getInitialState, saveToLocalStorage } from './utils/storage';

function App() {
  const [state, setState] = useState<ChampionshipState>(getInitialState());

  useEffect(() => {
    saveToLocalStorage(state);
  }, [state]);

  const handlePositionChange = (
    raceId: string,
    driverName: DriverName,
    newPosition: number | null
  ) => {
    setState(prevState => {
      const newRaceResults: RaceResult = {
        ...prevState.raceResults,
        [raceId]: {
          ...prevState.raceResults[raceId],
          [driverName]: newPosition,
        },
      };

      return {
        ...prevState,
        raceResults: newRaceResults,
      };
    });
  };

  const driverStandings = calculateAllDriverPoints(state.raceResults);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 pb-32">
      <div className="max-w-[1800px] mx-auto">
        <ResultsBar drivers={driverStandings} />

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-4">
              {RACES.map(race => (
                <RaceColumn
                  key={race.id}
                  race={race}
                  raceResults={state.raceResults}
                  onPositionChange={handlePositionChange}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
