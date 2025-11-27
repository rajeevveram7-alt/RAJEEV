export enum Color {
  RED = 'RED',
  GREEN = 'GREEN',
  VIOLET = 'VIOLET'
}

export enum BigSmall {
  BIG = 'BIG',
  SMALL = 'SMALL'
}

export interface GameRecord {
  id: string;
  period: string;
  number: number;
  color: Color;
  timestamp: number;
}

export interface PredictionResult {
  predictedColor: Color;
  predictedBigSmall: BigSmall;
  confidence: number;
  reasoning: string;
  suggestedNumbers: number[];
  mainNumber: number;
}

export enum GameType {
  PARITY = 'Parity',
  SAPRE = 'Sapre',
  BCONE = 'Bcone',
  EMERD = 'Emerd'
}