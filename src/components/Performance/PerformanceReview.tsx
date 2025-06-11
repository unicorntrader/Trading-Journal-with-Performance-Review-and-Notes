import React, { useState } from 'react';
import { CalendarIcon, TrendingUpIcon, BarChart2Icon, PieChartIcon } from 'lucide-react';
import { Trade } from '../../types';
import PerformanceCharts from './PerformanceCharts';
import { formatCurrency } from '../../utils/formatters';
interface PerformanceReviewProps {
  trades: Trade[];
}
const PerformanceReview: React.FC<PerformanceReviewProps> = ({
  trades
}) => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  // Calculate performance metrics
  const totalProfitLoss = trades.reduce((sum, trade) => sum + trade.profitLoss, 0);
  const winningTrades = trades.filter(trade => trade.profitLoss > 0);
  const losingTrades = trades.filter(trade => trade.profitLoss < 0);
  const winRate = trades.length > 0 ? Math.round(winningTrades.length / trades.length * 100) : 0;
  const avgWinning = winningTrades.length > 0 ? winningTrades.reduce((sum, trade) => sum + trade.profitLoss, 0) / winningTrades.length : 0;
  const avgLosing = losingTrades.length > 0 ? losingTrades.reduce((sum, trade) => sum + trade.profitLoss, 0) / losingTrades.length : 0;
  const profitFactor = Math.abs(avgLosing) > 0 ? Math.abs(avgWinning / avgLosing).toFixed(2) : 'N/A';
  // Get top symbols by profit
  const symbolPerformance = trades.reduce((acc, trade) => {
    if (!acc[trade.symbol]) {
      acc[trade.symbol] = {
        profitLoss: 0,
        count: 0
      };
    }
    acc[trade.symbol].profitLoss += trade.profitLoss;
    acc[trade.symbol].count += 1;
    return acc;
  }, {} as Record<string, {
    profitLoss: number;
    count: number;
  }>);
  const topSymbols = Object.entries(symbolPerformance).sort(([, a], [, b]) => b.profitLoss - a.profitLoss).slice(0, 5);
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Performance Review</h1>
        <div className="flex bg-gray-100 rounded-md p-1">
          <button onClick={() => setTimeframe('daily')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${timeframe === 'daily' ? 'bg-white shadow' : 'text-gray-600'}`}>
            Daily
          </button>
          <button onClick={() => setTimeframe('weekly')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${timeframe === 'weekly' ? 'bg-white shadow' : 'text-gray-600'}`}>
            Weekly
          </button>
          <button onClick={() => setTimeframe('monthly')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${timeframe === 'monthly' ? 'bg-white shadow' : 'text-gray-600'}`}>
            Monthly
          </button>
        </div>
      </div>
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Total P&L</p>
            <div className={`p-2 rounded-full ${totalProfitLoss >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              <TrendingUpIcon size={16} className={totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'} />
            </div>
          </div>
          <p className={`text-2xl font-bold mt-2 ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(totalProfitLoss)}
          </p>
          <p className="text-xs text-gray-500 mt-1">{trades.length} trades</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Win Rate</p>
            <div className="p-2 rounded-full bg-blue-100">
              <PieChartIcon size={16} className="text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2 text-blue-600">{winRate}%</p>
          <p className="text-xs text-gray-500 mt-1">
            {winningTrades.length} wins, {losingTrades.length} losses
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Avg. Winner</p>
            <div className="p-2 rounded-full bg-green-100">
              <BarChart2Icon size={16} className="text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2 text-green-600">
            {formatCurrency(avgWinning)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Per winning trade</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Profit Factor</p>
            <div className="p-2 rounded-full bg-purple-100">
              <CalendarIcon size={16} className="text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2 text-purple-600">
            {profitFactor}
          </p>
          <p className="text-xs text-gray-500 mt-1">Win/loss ratio</p>
        </div>
      </div>
      {/* Charts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Performance Over Time
        </h2>
        <PerformanceCharts trades={trades} timeframe={timeframe} />
      </div>
      {/* Top performing symbols */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Top Performing Symbols
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trades
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    P&L
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topSymbols.map(([symbol, data]) => <tr key={symbol}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {symbol}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {data.count}
                    </td>
                    <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium text-right ${data.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(data.profitLoss)}
                    </td>
                  </tr>)}
                {topSymbols.length === 0 && <tr>
                    <td colSpan={3} className="px-4 py-4 text-sm text-gray-500 text-center">
                      No trade data available
                    </td>
                  </tr>}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Trading Insights
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-md font-medium text-blue-800 mb-2">
                Win Rate Analysis
              </h3>
              <p className="text-sm text-blue-700">
                {winRate > 60 ? `Your ${winRate}% win rate is above average. Keep up the good work!` : `Your ${winRate}% win rate has room for improvement. Consider reviewing your entry criteria.`}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h3 className="text-md font-medium text-green-800 mb-2">
                Risk Management
              </h3>
              <p className="text-sm text-green-700">
                {Math.abs(avgLosing) < avgWinning * 0.7 ? 'Your risk management is effective with losses smaller than wins.' : 'Consider tightening stop losses as your average loss is relatively large compared to wins.'}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <h3 className="text-md font-medium text-purple-800 mb-2">
                Trading Consistency
              </h3>
              <p className="text-sm text-purple-700">
                Based on your trading pattern,
                {timeframe === 'daily' ? ' daily ' : timeframe === 'weekly' ? ' weekly ' : ' monthly '}
                reviews are recommended to maintain consistency in your trading
                approach.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default PerformanceReview;