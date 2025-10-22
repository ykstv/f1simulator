import { useState, useEffect } from 'react';
import { ResultsBar } from './components/ResultsBar';
import { RaceColumn } from './components/RaceColumn';
import { Footer } from './components/Footer';
import { ShareModal } from './components/ShareModal';
import { RACES } from './constants';
import { ChampionshipState, DriverName, RaceResult } from './types';
import { calculateAllDriverPoints } from './utils/points';
import { getInitialState, saveToLocalStorage } from './utils/storage';
import { generateShareUrl } from './utils/shareUrl';

function App() {
  const [state, setState] = useState<ChampionshipState>(getInitialState());
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

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

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  const shareUrl = generateShareUrl(state.raceResults);

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
        <ResultsBar
          drivers={driverStandings}
          isMobile={isMobile}
          onShareClick={handleShareClick}
        />

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
      {showShareModal && (
        <ShareModal url={shareUrl} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
}

export default App;
