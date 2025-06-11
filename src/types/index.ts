export interface Trade {
  id: string;
  symbol: string;
  type: 'Buy' | 'Sell' | 'Short' | 'Cover';
  quantity: number;
  entryPrice: number;
  exitPrice: number;
  date: string;
  profitLoss: number;
  fees?: number;
  notes?: string;
}
export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  tradeIds?: string[];
}
export type TradePlanStatus = 'Planned' | 'Executed' | 'Cancelled';
export interface TradePlan {
  id: string;
  symbol: string;
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  riskRewardRatio: number;
  strategy: string;
  notes?: string;
  status: TradePlanStatus;
  date: string;
  quantity?: number;
}