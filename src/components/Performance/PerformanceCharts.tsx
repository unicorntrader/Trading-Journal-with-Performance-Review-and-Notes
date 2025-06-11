import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Trade } from '../../types';
interface PerformanceChartsProps {
  trades: Trade[];
  timeframe: 'daily' | 'weekly' | 'monthly';
}
const PerformanceCharts: React.FC<PerformanceChartsProps> = ({
  trades,
  timeframe
}) => {
  // Group trades by date based on timeframe
  const groupedData = trades.reduce((acc, trade) => {
    let dateKey;
    const date = new Date(trade.date);
    if (timeframe === 'daily') {
      dateKey = date.toISOString().split('T')[0];
    } else if (timeframe === 'weekly') {
      // Get the Monday of the week
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(date.setDate(diff));
      dateKey = monday.toISOString().split('T')[0];
    } else if (timeframe === 'monthly') {
      dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    }
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: dateKey,
        profitLoss: 0,
        trades: 0,
        winningTrades: 0,
        losingTrades: 0
      };
    }
    acc[dateKey].profitLoss += trade.profitLoss;
    acc[dateKey].trades += 1;
    if (trade.profitLoss > 0) {
      acc[dateKey].winningTrades += 1;
    } else if (trade.profitLoss < 0) {
      acc[dateKey].losingTrades += 1;
    }
    return acc;
  }, {} as Record<string, any>);
  // Convert to array and sort by date
  const chartData = Object.values(groupedData).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
  // Calculate cumulative P&L
  let cumulativePL = 0;
  const cumulativeData = chartData.map((item: any) => {
    cumulativePL += item.profitLoss;
    return {
      ...item,
      cumulativePL
    };
  });
  // Format date labels based on timeframe
  const formatDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    if (timeframe === 'daily') {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } else if (timeframe === 'weekly') {
      return `Week of ${date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })}`;
    } else if (timeframe === 'monthly') {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
    }
    return dateStr;
  };
  return <div className="space-y-8">
      {/* Profit/Loss Chart */}
      <div>
        <h3 className="text-md font-medium text-gray-700 mb-3">
          Profit/Loss Over Time
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cumulativeData} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatDateLabel} tick={{
              fontSize: 12
            }} />
              <YAxis tickFormatter={value => `$${value}`} tick={{
              fontSize: 12
            }} />
              <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'P&L']} labelFormatter={formatDateLabel} />
              <Legend />
              <Line type="monotone" dataKey="cumulativePL" name="Cumulative P&L" stroke="#3b82f6" activeDot={{
              r: 8
            }} strokeWidth={2} />
              <Line type="monotone" dataKey="profitLoss" name="Period P&L" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Win/Loss Chart */}
      <div>
        <h3 className="text-md font-medium text-gray-700 mb-3">
          Win/Loss Distribution
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatDateLabel} tick={{
              fontSize: 12
            }} />
              <YAxis tick={{
              fontSize: 12
            }} />
              <Tooltip formatter={(value: number) => [value, '']} labelFormatter={formatDateLabel} />
              <Legend />
              <Bar dataKey="winningTrades" name="Winning Trades" fill="#10b981" />
              <Bar dataKey="losingTrades" name="Losing Trades" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>;
};
export default PerformanceCharts;