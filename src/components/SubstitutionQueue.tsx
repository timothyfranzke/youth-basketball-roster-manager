import React from 'react';
import { Player } from '../types';
import { ArrowRightLeft } from 'lucide-react';

interface SubstitutionQueueProps {
  activePlayers: Player[];
  benchedPlayers: Player[];
  onSubstitute: (activePlayerId: string, benchedPlayerId: string) => void;
}

const SubstitutionQueue: React.FC<SubstitutionQueueProps> = ({
  activePlayers,
  benchedPlayers,
  onSubstitute,
}) => {
  const [selectedActive, setSelectedActive] = React.useState<string | null>(null);
  const [selectedBenched, setSelectedBenched] = React.useState<string | null>(null);

  const handleSubstitute = () => {
    if (selectedActive && selectedBenched) {
      onSubstitute(selectedActive, selectedBenched);
      setSelectedActive(null);
      setSelectedBenched(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
      <div className="w-full md:w-2/5">
        <h3 className="text-lg font-semibold mb-2">Active Players</h3>
        <select
          className="w-full p-2 border rounded"
          value={selectedActive || ''}
          onChange={(e) => setSelectedActive(e.target.value)}
        >
          <option value="">Select an active player</option>
          {activePlayers.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-center">
        <ArrowRightLeft className="w-6 h-6" />
      </div>
      <div className="w-full md:w-2/5">
        <h3 className="text-lg font-semibold mb-2">Benched Players</h3>
        <select
          className="w-full p-2 border rounded"
          value={selectedBenched || ''}
          onChange={(e) => setSelectedBenched(e.target.value)}
        >
          <option value="">Select a benched player</option>
          {benchedPlayers.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleSubstitute}
        disabled={!selectedActive || !selectedBenched}
        className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Substitute
      </button>
    </div>
  );
};

export default SubstitutionQueue;