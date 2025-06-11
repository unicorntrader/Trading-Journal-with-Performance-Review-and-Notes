import React, { useState, createElement } from 'react';
import { PlusIcon, FilterIcon, RefreshCwIcon, DownloadIcon } from 'lucide-react';
import { Trade } from '../../types';
import TradeTable from './TradeTable';
import TradeForm from './TradeForm';
interface TradeLogProps {
  trades: Trade[];
  setTrades: React.Dispatch<React.SetStateAction<Trade[]>>;
}
const TradeLog: React.FC<TradeLogProps> = ({
  trades,
  setTrades
}) => {
  const [filterSymbol, setFilterSymbol] = useState('');
  const [filterType, setFilterType] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [isAddingTrade, setIsAddingTrade] = useState(false);
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null);
  // Filter trades based on criteria
  const filteredTrades = trades.filter(trade => {
    const matchesSymbol = filterSymbol ? trade.symbol.toLowerCase().includes(filterSymbol.toLowerCase()) : true;
    const matchesType = filterType ? trade.type === filterType : true;
    let matchesDate = true;
    if (dateRange.start) {
      matchesDate = matchesDate && new Date(trade.date) >= new Date(dateRange.start);
    }
    if (dateRange.end) {
      matchesDate = matchesDate && new Date(trade.date) <= new Date(dateRange.end);
    }
    return matchesSymbol && matchesType && matchesDate;
  });
  const handleConnect = () => {
    alert('In a real app, this would connect to your broker API');
  };
  const handleAddTrade = (trade: Omit<Trade, 'id'>) => {
    const newTrade: Trade = {
      ...trade,
      id: Date.now().toString()
    };
    const updatedTrades = [...trades, newTrade];
    setTrades(updatedTrades);
    localStorage.setItem('trades', JSON.stringify(updatedTrades));
    setIsAddingTrade(false);
  };
  const handleEditTrade = (updatedTrade: Trade) => {
    const updatedTrades = trades.map(trade => trade.id === updatedTrade.id ? updatedTrade : trade);
    setTrades(updatedTrades);
    localStorage.setItem('trades', JSON.stringify(updatedTrades));
    setEditingTrade(null);
  };
  const handleDeleteTrade = (tradeId: string) => {
    const updatedTrades = trades.filter(trade => trade.id !== tradeId);
    setTrades(updatedTrades);
    localStorage.setItem('trades', JSON.stringify(updatedTrades));
  };
  const exportToCSV = () => {
    // Create CSV headers
    const headers = ['Date', 'Symbol', 'Type', 'Quantity', 'Entry Price', 'Exit Price', 'P&L', 'Notes'].join(',');
    // Convert trades to CSV rows
    const rows = trades.map(trade => [new Date(trade.date).toLocaleDateString(), trade.symbol, trade.type, trade.quantity, trade.entryPrice, trade.exitPrice, trade.profitLoss, trade.notes || ''].join(','));
    // Combine headers and rows
    const csv = [headers, ...rows].join('\n');
    // Create and download the file
    const blob = new Blob([csv], {
      type: 'text/csv'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trades-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Trade Log</h1>
        <button onClick={handleConnect} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          <RefreshCwIcon size={16} className="mr-2" />
          Sync Broker Data
        </button>
      </div>
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <FilterIcon size={18} className="text-gray-500 mr-2" />
          <h2 className="text-lg font-medium text-gray-800">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Symbol
            </label>
            <input type="text" value={filterSymbol} onChange={e => setFilterSymbol(e.target.value)} placeholder="AAPL, MSFT, etc." className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trade Type
            </label>
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Types</option>
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
              <option value="Short">Short</option>
              <option value="Cover">Cover</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input type="date" value={dateRange.start} onChange={e => setDateRange({
            ...dateRange,
            start: e.target.value
          })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input type="date" value={dateRange.end} onChange={e => setDateRange({
            ...dateRange,
            end: e.target.value
          })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>
      {/* Trade Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-800">Trades</h2>
          <div className="flex space-x-2">
            <button onClick={exportToCSV} className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition">
              <DownloadIcon size={16} className="mr-1" />
              Export
            </button>
            <button onClick={() => setIsAddingTrade(true)} className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              <PlusIcon size={16} className="mr-1" />
              Add Trade
            </button>
          </div>
        </div>
        <TradeTable trades={filteredTrades} onEdit={setEditingTrade} onDelete={handleDeleteTrade} />
      </div>
      {/* Add/Edit Trade Modal */}
      {(isAddingTrade || editingTrade) && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <TradeForm trade={editingTrade} onSubmit={editingTrade ? handleEditTrade : handleAddTrade} onCancel={() => {
          setIsAddingTrade(false);
          setEditingTrade(null);
        }} />
          </div>
        </div>}
    </div>;
};
export default TradeLog;