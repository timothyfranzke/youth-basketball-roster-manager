export interface Player {
  id: string;
  name: string;
  isActive: boolean;
  activeTime: number;
  benchTime: number;
}

export interface SubPeriod {
  id: string;
  activePlayers: string[];
  benchedPlayers: string[];
}

export interface GameHistory {
  date: number;
  duration: number;
  periods: SubPeriod[];
}