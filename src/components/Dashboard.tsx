import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, BarChart2Icon, BookOpenIcon, LineChartIcon } from 'lucide-react';
import { Trade, Note } from '../types';
import { formatCurrency } from '../utils/formatters';
interface DashboardProps {
  trades: Trade[];
  notes: Note[];
}
const Dashboard: React.FC<DashboardProps> = ({
  trades,
  notes
}) => {
  // Calculate summary metrics
  const todayTrades = trades.filter(trade => new Date(trade.date).toDateString() === new Date().toDateString());
  const totalProfitLoss = trades.reduce((sum, trade) => sum + trade.profitLoss, 0);
  const todayProfitLoss = todayTrades.reduce((sum, trade) => sum + trade.profitLoss, 0);
  const winRate = Math.round(trades.filter(trade => trade.profitLoss > 0).length / trades.length * 100);
  const recentTrades = [...trades].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  const recentNotes = [...notes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Trading Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
        </div>
      </div>
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Total P&L</p>
            <div className={`p-2 rounded-full ${totalProfitLoss >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              {totalProfitLoss >= 0 ? <ArrowUpIcon size={16} className="text-green-600" /> : <ArrowDownIcon size={16} className="text-red-600" />}
            </div>
          </div>
          <p className={`text-2xl font-bold mt-2 ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(totalProfitLoss)}
          </p>
          <p className="text-xs text-gray-500 mt-1">All time</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Today's P&L</p>
            <div className={`p-2 rounded-full ${todayProfitLoss >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              {todayProfitLoss >= 0 ? <ArrowUpIcon size={16} className="text-green-600" /> : <ArrowDownIcon size={16} className="text-red-600" />}
            </div>
          </div>
          <p className={`text-2xl font-bold mt-2 ${todayProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(todayProfitLoss)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {todayTrades.length} trades today
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Win Rate</p>
            <div className="p-2 rounded-full bg-blue-100">
              <BarChart2Icon size={16} className="text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2 text-blue-600">{winRate}%</p>
          <p className="text-xs text-gray-500 mt-1">
            {trades.length} total trades
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Journal Entries</p>
            <div className="p-2 rounded-full bg-purple-100">
              <BookOpenIcon size={16} className="text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2 text-purple-600">
            {notes.length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Trading insights</p>
        </div>
      </div>
      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent trades */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Trades
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    P&L
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentTrades.map(trade => <tr key={trade.id}>
                    <td className="px-3 py-3 text-sm font-medium text-gray-900">
                      {trade.symbol}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-500">
                      {trade.type}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-500">
                      {new Date(trade.date).toLocaleDateString()}
                    </td>
                    <td className={`px-3 py-3 text-sm text-right font-medium ${trade.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(trade.profitLoss)}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
        {/* Recent notes */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Notes
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentNotes.map(note => <div key={note.id} className="border-l-4 border-blue-500 pl-4 py-1">
                <p className="text-sm text-gray-500">
                  {new Date(note.date).toLocaleDateString()}
                </p>
                <h3 className="text-md font-medium text-gray-800 mt-1">
                  {note.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {note.content}
                </p>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
export default Dashboard;