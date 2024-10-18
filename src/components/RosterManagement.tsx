import React, { useState } from 'react';
import { Player, GameHistory } from '../types';
import { Plus, Trash2, Save } from 'lucide-react';

interface RosterManagementProps {
  players: Player[];
  gameHistories: GameHistory[];
  onUpdatePlayers: (players: Player[]) => void;
}

const RosterManagement: React.FC<RosterManagementProps> = ({ players, gameHistories, onUpdatePlayers }) => {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: newPlayerName.trim(),
        isActive: false,
        activeTime: 0,
        benchTime: 0,
      };
      onUpdatePlayers([...players, newPlayer]);
      setNewPlayerName('');
    }
  };

  const handleRemovePlayer = (id: string) => {
    onUpdatePlayers(players.filter(player => player.id !== id));
  };

  const handleEditPlayer = (player: Player) => {
    setEditingPlayer(player);
  };

  const handleSaveEdit = () => {
    if (editingPlayer) {
      onUpdatePlayers(players.map(p => p.id === editingPlayer.id ? editingPlayer : p));
      setEditingPlayer(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Roster Management</h2>
      <div className="mb-4 flex">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="New player name"
          className="flex-grow p-2 border rounded-l"
        />
        <button
          onClick={handleAddPlayer}
          className="bg-green-500 text-white p-2 rounded-r hover:bg-green-600"
        >
          <Plus size={24} />
        </button>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Current Roster</h3>
        <div className="space-y-2">
          {players.map(player => (
            <div key={player.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
              {editingPlayer && editingPlayer.id === player.id ? (
                <>
                  <input
                    type="text"
                    value={editingPlayer.name}
                    onChange={(e) => setEditingPlayer({ ...editingPlayer, name: e.target.value })}
                    className="flex-grow p-1 mr-2 border rounded"
                  />
                  <button onClick={handleSaveEdit} className="text-green-500 hover:text-green-700 mr-2">
                    <Save size={20} />
                  </button>
                </>
              ) : (
                <>
                  <span>{player.name}</span>
                  <div>
                    <button onClick={() => handleEditPlayer(player)} className="text-blue-500 hover:text-blue-700 mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleRemovePlayer(player.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Game Histories</h3>
        {gameHistories.length === 0 ? (
          <p>No game histories available.</p>
        ) : (
          <div className="space-y-4">
            {gameHistories.map((game, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded">
                <h4 className="font-semibold">Game {index + 1}</h4>
                <p>Date: {new Date(game.date).toLocaleDateString()}</p>
                <p>Duration: {game.duration} seconds</p>
                <p>Number of Periods: {game.periods.length}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RosterManagement;