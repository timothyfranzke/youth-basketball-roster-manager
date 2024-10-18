import React from 'react';
import { Player } from '../types';
import { UserCircle2 } from 'lucide-react';

interface PlayerListProps {
  players: Player[];
  onDragPlayer: (player: Player) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, onDragPlayer }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, player: Player) => {
    e.dataTransfer.setData('application/json', JSON.stringify(player));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {players.map((player) => (
        <div
          key={player.id}
          className={`p-4 rounded-lg shadow-md ${
            player.isActive ? 'bg-green-100' : 'bg-red-100'
          } cursor-move`}
          draggable
          onDragStart={(e) => handleDragStart(e, player)}
        >
          <div className="flex items-center mb-2">
            <UserCircle2 className="w-6 h-6 mr-2" />
            <h3 className="text-lg font-semibold">{player.name}</h3>
          </div>
          <p>Active Time: {player.activeTime}s</p>
          <p>Bench Time: {player.benchTime}s</p>
          <p className="mt-2 font-semibold">
            {player.isActive ? 'Active' : 'Benched'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;