import React, { useState, useEffect } from 'react';
import { Player, SubPeriod, GameHistory } from './types';
import PlayerList from './components/PlayerList';
import ActivityMatrix from './components/ActivityMatrix';
import NextPeriodQueue from './components/NextPeriodQueue';
import RosterManagement from './components/RosterManagement';
import { Users, Play, Pause, ClipboardList } from 'lucide-react';

const initialPlayers: Player[] = [
  { id: '1', name: 'John Doe', isActive: true, activeTime: 0, benchTime: 0 },
  { id: '2', name: 'Jane Smith', isActive: true, activeTime: 0, benchTime: 0 },
  { id: '3', name: 'Mike Johnson', isActive: true, activeTime: 0, benchTime: 0 },
  { id: '4', name: 'Emily Brown', isActive: true, activeTime: 0, benchTime: 0 },
  { id: '5', name: 'Chris Lee', isActive: true, activeTime: 0, benchTime: 0 },
  { id: '6', name: 'Sarah Davis', isActive: false, activeTime: 0, benchTime: 0 },
  { id: '7', name: 'Tom Wilson', isActive: false, activeTime: 0, benchTime: 0 },
  { id: '8', name: 'Lisa Taylor', isActive: false, activeTime: 0, benchTime: 0 },
];

function App() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [subPeriods, setSubPeriods] = useState<SubPeriod[]>([]);
  const [currentPeriod, setCurrentPeriod] = useState(1);
  const [nextPeriodQueue, setNextPeriodQueue] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [gamePaused, setGamePaused] = useState(false);
  const [gameHistories, setGameHistories] = useState<GameHistory[]>([]);
  const [showRosterManagement, setShowRosterManagement] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !gamePaused) {
      timer = setInterval(() => {
        setGameTime((prevTime) => prevTime + 1);
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) => ({
            ...player,
            activeTime: player.isActive ? player.activeTime + 1 : player.activeTime,
            benchTime: player.isActive ? player.benchTime : player.benchTime + 1,
          }))
        );
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gamePaused]);

  const handleStartGame = () => {
    setGameStarted(true);
    setGameTime(0);
    setSubPeriods([]);
    setCurrentPeriod(1);
  };

  const handleEndGame = () => {
    setGameStarted(false);
    setGamePaused(false);
    const newGameHistory: GameHistory = {
      date: Date.now(),
      duration: gameTime,
      periods: subPeriods,
    };
    setGameHistories([...gameHistories, newGameHistory]);
    // Reset player times
    setPlayers(players.map(player => ({ ...player, activeTime: 0, benchTime: 0 })));
  };

  const handlePauseResumeGame = () => {
    setGamePaused(!gamePaused);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAddToQueue = (player: Player) => {
    if (!nextPeriodQueue.some(p => p.id === player.id)) {
      setNextPeriodQueue([...nextPeriodQueue, player]);
    }
  };

  const handleRemoveFromQueue = (playerId: string) => {
    setNextPeriodQueue(nextPeriodQueue.filter(p => p.id !== playerId));
  };

  const handleSubstitute = () => {
    if (nextPeriodQueue.length > 0) {
      const newActivePlayers = nextPeriodQueue.map(p => p.id);
      const newSubPeriod: SubPeriod = {
        id: `period-${currentPeriod}`,
        activePlayers: newActivePlayers,
        benchedPlayers: players.filter(p => !newActivePlayers.includes(p.id)).map(p => p.id),
      };

      setSubPeriods([...subPeriods, newSubPeriod]);
      setCurrentPeriod(currentPeriod + 1);

      setPlayers(players.map(player => ({
        ...player,
        isActive: newActivePlayers.includes(player.id),
      })));

      setNextPeriodQueue([]);
    }
  };

  const handleUpdatePlayers = (updatedPlayers: Player[]) => {
    setPlayers(updatedPlayers);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 flex items-center justify-center mb-4">
          <Users className="w-10 h-10 mr-2" />
          Youth Basketball Roster Manager
        </h1>
        <div className="flex justify-center space-x-4">
          {!gameStarted ? (
            <>
              <button
                onClick={handleStartGame}
                className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Start Game
              </button>
              <button
                onClick={() => setShowRosterManagement(!showRosterManagement)}
                className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <ClipboardList className="w-6 h-6 inline-block mr-2" />
                {showRosterManagement ? 'Game View' : 'Manage Roster'}
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center space-x-4">
                <div className="text-3xl font-bold">{formatTime(gameTime)}</div>
                <button
                  onClick={handlePauseResumeGame}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  {gamePaused ? <Play size={24} /> : <Pause size={24} />}
                </button>
              </div>
              <button
                onClick={handleEndGame}
                className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                End Game
              </button>
            </>
          )}
        </div>
      </header>
      <main className="max-w-6xl mx-auto space-y-8">
        {showRosterManagement ? (
          <RosterManagement
            players={players}
            gameHistories={gameHistories}
            onUpdatePlayers={handleUpdatePlayers}
          />
        ) : (
          <>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Player Roster</h2>
              <PlayerList players={players} onDragPlayer={handleAddToQueue} />
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Next Period Queue</h2>
              <NextPeriodQueue
                queuedPlayers={nextPeriodQueue}
                onRemovePlayer={handleRemoveFromQueue}
                onAddPlayer={handleAddToQueue}
                onSubstitute={handleSubstitute}
              />
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Activity Matrix</h2>
              <ActivityMatrix subPeriods={subPeriods} players={players} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;