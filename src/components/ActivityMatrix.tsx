import React from 'react';
import { SubPeriod, Player } from '../types';

interface ActivityMatrixProps {
  subPeriods: SubPeriod[];
  players: Player[];
}

const ActivityMatrix: React.FC<ActivityMatrixProps> = ({ subPeriods, players }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Player</th>
            {subPeriods.map((period, index) => (
              <th key={period.id} className="py-2 px-4 border-b">
                Period {index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td className="py-2 px-4 border-b">{player.name}</td>
              {subPeriods.map((period) => (
                <td
                  key={`${player.id}-${period.id}`}
                  className={`py-2 px-4 border-b ${
                    period.activePlayers.includes(player.id)
                      ? 'bg-green-100'
                      : 'bg-red-100'
                  }`}
                >
                  {period.activePlayers.includes(player.id) ? 'Active' : 'Benched'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityMatrix;