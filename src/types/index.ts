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