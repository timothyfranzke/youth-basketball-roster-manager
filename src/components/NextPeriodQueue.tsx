import React from 'react';
import { Player } from '../types';
import { X } from 'lucide-react';

interface NextPeriodQueueProps {
  queuedPlayers: Player[];
  onRemovePlayer: (playerId: string) => void;
  onAddPlayer: (player: Player) => void;
  onSubstitute: () => void;
}

const NextPeriodQueue: React.FC<NextPeriodQueueProps> = ({
  queuedPlayers,
  onRemovePlayer,
  onAddPlayer,
  onSubstitute,
}) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const playerData = e.dataTransfer.getData('application/json');
    const player = JSON.parse(playerData) as Player;
    if (!queuedPlayers.some(p => p.id === player.id)) {
      onAddPlayer(player);
    }
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md min-h-[100px]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {queuedPlayers.map((player) => (
          <div key={player.id} className="flex items-center justify-between bg-blue-100 p-2 rounded">
            <span>{player.name}</span>
            <button
              onClick={() => onRemovePlayer(player.id)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={onSubstitute}
        disabled={queuedPlayers.length === 0}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Sub
      </button>
    </div>
  );
};

export default NextPeriodQueue;