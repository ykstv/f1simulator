import { useState, useEffect } from 'react';
import { ResultsBar } from './components/ResultsBar';
import { RaceColumn } from './components/RaceColumn';
import { Footer } from './components/Footer';
import { RACES } from './constants';
import { ChampionshipState, DriverName, RaceResult, Race } from './types';
import { calculateAllDriverPoints } from './utils/points';
import { getInitialState, saveToLocalStorage } from './utils/storage';
import { decodeScenario, encodeScenario, copyToClipboard } from './utils/shareUrl';

function App() {
  const [state, setState] = useState<ChampionshipState>(() => {
    const decodedRaces = decodeScenario(RACES);
    if (decodedRaces) {
      const raceResults: RaceResult = {};
      decodedRaces.forEach(race => {
        raceResults[race.id] = {
          'Max Verstappen': race.positions[0],
          'Lando Norris': race.positions[1],
          'Oscar Piastri': race.positions[2],
        };
      });
      return { raceResults };
    }
    return getInitialState();
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      setIsMobile(isTouchDevice && isSmallScreen);
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

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

  const handleShare = async () => {
    const races = RACES.map(race => ({
      ...race,
      positions: [
        state.raceResults[race.id]?.['Max Verstappen'] ?? race.positions[0],
        state.raceResults[race.id]?.['Lando Norris'] ?? race.positions[1],
        state.raceResults[race.id]?.['Oscar Piastri'] ?? race.positions[2],
      ]
    }));
    const url = encodeScenario(races);
    await copyToClipboard(url);
  };

  if (isMobile && isPortrait) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">📱</div>
          <h1 className="text-2xl font-bold mb-2">Please rotate your phone</h1>
          <p className="text-lg text-gray-600">for the best experience 📱↔️</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 ${isMobile ? 'p-2 pb-4' : 'p-8 pb-32'}`}>
      <div className="max-w-[1800px] mx-auto">
        <ResultsBar drivers={driverStandings} isMobile={isMobile} onShare={handleShare} />

        <div className={`bg-white rounded-lg shadow-md ${isMobile ? 'p-2' : 'p-6'}`}>
          <div className={isMobile ? '' : 'overflow-x-auto'}>
            <div className={`flex ${isMobile ? 'gap-1' : 'gap-4 pb-4'}`}>
              {RACES.map(race => (
                <RaceColumn
                  key={race.id}
                  race={race}
                  raceResults={state.raceResults}
                  onPositionChange={handlePositionChange}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer isMobile={isMobile} />
    </div>
  );
}

export default App;
