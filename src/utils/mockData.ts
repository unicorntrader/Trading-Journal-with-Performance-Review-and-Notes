import { Trade, Note } from '../types';
// Generate dates for the past 30 days
const getPastDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};
export const mockTrades: Trade[] = [{
  id: '1',
  symbol: 'AAPL',
  type: 'Buy',
  quantity: 10,
  entryPrice: 175.25,
  exitPrice: 178.85,
  date: getPastDate(0),
  // Today
  profitLoss: 36.0
}, {
  id: '2',
  symbol: 'MSFT',
  type: 'Buy',
  quantity: 5,
  entryPrice: 320.5,
  exitPrice: 325.2,
  date: getPastDate(0),
  // Today
  profitLoss: 23.5
}, {
  id: '3',
  symbol: 'TSLA',
  type: 'Short',
  quantity: 3,
  entryPrice: 245.75,
  exitPrice: 239.3,
  date: getPastDate(0),
  // Today
  profitLoss: 19.35
}, {
  id: '4',
  symbol: 'NVDA',
  type: 'Buy',
  quantity: 8,
  entryPrice: 425.6,
  exitPrice: 418.25,
  date: getPastDate(1),
  profitLoss: -58.8
}, {
  id: '5',
  symbol: 'AMZN',
  type: 'Buy',
  quantity: 4,
  entryPrice: 142.35,
  exitPrice: 145.8,
  date: getPastDate(1),
  profitLoss: 13.8
}, {
  id: '6',
  symbol: 'META',
  type: 'Short',
  quantity: 6,
  entryPrice: 315.2,
  exitPrice: 320.45,
  date: getPastDate(2),
  profitLoss: -31.5
}, {
  id: '7',
  symbol: 'GOOGL',
  type: 'Buy',
  quantity: 7,
  entryPrice: 135.75,
  exitPrice: 138.2,
  date: getPastDate(3),
  profitLoss: 17.15
}, {
  id: '8',
  symbol: 'AAPL',
  type: 'Sell',
  quantity: 15,
  entryPrice: 170.3,
  exitPrice: 168.45,
  date: getPastDate(4),
  profitLoss: -27.75
}, {
  id: '9',
  symbol: 'MSFT',
  type: 'Buy',
  quantity: 3,
  entryPrice: 318.9,
  exitPrice: 322.75,
  date: getPastDate(5),
  profitLoss: 11.55
}, {
  id: '10',
  symbol: 'TSLA',
  type: 'Buy',
  quantity: 6,
  entryPrice: 240.15,
  exitPrice: 252.8,
  date: getPastDate(6),
  profitLoss: 75.9
}, {
  id: '11',
  symbol: 'NVDA',
  type: 'Short',
  quantity: 4,
  entryPrice: 430.5,
  exitPrice: 422.3,
  date: getPastDate(7),
  profitLoss: 32.8
}, {
  id: '12',
  symbol: 'AMZN',
  type: 'Sell',
  quantity: 8,
  entryPrice: 145.6,
  exitPrice: 143.25,
  date: getPastDate(8),
  profitLoss: 18.8
}, {
  id: '13',
  symbol: 'META',
  type: 'Buy',
  quantity: 5,
  entryPrice: 310.75,
  exitPrice: 305.2,
  date: getPastDate(9),
  profitLoss: -27.75
}, {
  id: '14',
  symbol: 'GOOGL',
  type: 'Short',
  quantity: 10,
  entryPrice: 137.8,
  exitPrice: 139.45,
  date: getPastDate(10),
  profitLoss: -16.5
}, {
  id: '15',
  symbol: 'AAPL',
  type: 'Buy',
  quantity: 12,
  entryPrice: 172.4,
  exitPrice: 177.65,
  date: getPastDate(12),
  profitLoss: 63.0
}, {
  id: '16',
  symbol: 'MSFT',
  type: 'Short',
  quantity: 7,
  entryPrice: 325.1,
  exitPrice: 328.75,
  date: getPastDate(14),
  profitLoss: -25.55
}, {
  id: '17',
  symbol: 'TSLA',
  type: 'Buy',
  quantity: 4,
  entryPrice: 248.3,
  exitPrice: 255.6,
  date: getPastDate(16),
  profitLoss: 29.2
}, {
  id: '18',
  symbol: 'NVDA',
  type: 'Buy',
  quantity: 9,
  entryPrice: 418.9,
  exitPrice: 427.35,
  date: getPastDate(18),
  profitLoss: 76.05
}, {
  id: '19',
  symbol: 'AMZN',
  type: 'Short',
  quantity: 5,
  entryPrice: 146.7,
  exitPrice: 144.25,
  date: getPastDate(20),
  profitLoss: 12.25
}, {
  id: '20',
  symbol: 'META',
  type: 'Buy',
  quantity: 8,
  entryPrice: 308.45,
  exitPrice: 312.8,
  date: getPastDate(22),
  profitLoss: 34.8
}];
export const mockNotes: Note[] = [{
  id: '1',
  title: 'Strong day for tech stocks',
  content: 'Markets responded positively to Fed comments. AAPL and MSFT performed well. Need to watch for continuation pattern tomorrow.',
  date: getPastDate(0),
  tradeIds: ['1', '2', '3']
}, {
  id: '2',
  title: 'NVDA earnings reaction',
  content: 'NVDA dropped despite beating estimates. Market seems to be pricing in a slowdown in AI spending. Need to be cautious with semiconductor stocks.',
  date: getPastDate(1),
  tradeIds: ['4', '5']
}, {
  id: '3',
  title: "META short didn't work out",
  content: 'My thesis on META was incorrect. Social media stocks are showing strength despite ad spending concerns. Need to re-evaluate my analysis.',
  date: getPastDate(2),
  tradeIds: ['6']
}, {
  id: '4',
  title: 'Weekly review',
  content: 'Overall a positive week with 65% win rate. My morning trades are performing better than afternoon trades. Need to focus on trading in the first 2 hours of the session.',
  date: getPastDate(7)
}, {
  id: '5',
  title: 'Monthly strategy assessment',
  content: 'Tech stocks have been my best performers this month. Energy sector trades have underperformed. Will adjust sector allocation for next month to focus more on tech and less on energy.',
  date: getPastDate(14)
}];