import React, { useEffect, useState } from 'react';
import { Trade } from '../../types';
interface TradeFormProps {
  trade?: Trade | null;
  onSubmit: (trade: Trade | Omit<Trade, 'id'>) => void;
  onCancel: () => void;
}
const TradeForm: React.FC<TradeFormProps> = ({
  trade,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    symbol: '',
    type: 'Buy',
    quantity: 0,
    entryPrice: 0,
    exitPrice: 0,
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  useEffect(() => {
    if (trade) {
      setFormData({
        symbol: trade.symbol,
        type: trade.type,
        quantity: trade.quantity,
        entryPrice: trade.entryPrice,
        exitPrice: trade.exitPrice,
        date: new Date(trade.date).toISOString().split('T')[0],
        notes: trade.notes || ''
      });
    }
  }, [trade]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profitLoss = (formData.type === 'Buy' || formData.type === 'Cover' ? formData.exitPrice - formData.entryPrice : formData.entryPrice - formData.exitPrice) * formData.quantity;
    const tradeData = {
      ...formData,
      profitLoss,
      date: new Date(formData.date).toISOString(),
      ...(trade && {
        id: trade.id
      })
    };
    onSubmit(tradeData as Trade);
  };
  return <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        {trade ? 'Edit Trade' : 'Add New Trade'}
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Symbol
        </label>
        <input type="text" value={formData.symbol} onChange={e => setFormData({
        ...formData,
        symbol: e.target.value.toUpperCase()
      })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type
        </label>
        <select value={formData.type} onChange={e => setFormData({
        ...formData,
        type: e.target.value as Trade['type']
      })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
          <option value="Short">Short</option>
          <option value="Cover">Cover</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantity
        </label>
        <input type="number" value={formData.quantity} onChange={e => setFormData({
        ...formData,
        quantity: Number(e.target.value)
      })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required min="1" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Entry Price
        </label>
        <input type="number" value={formData.entryPrice} onChange={e => setFormData({
        ...formData,
        entryPrice: Number(e.target.value)
      })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required step="0.01" min="0" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Exit Price
        </label>
        <input type="number" value={formData.exitPrice} onChange={e => setFormData({
        ...formData,
        exitPrice: Number(e.target.value)
      })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required step="0.01" min="0" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <input type="date" value={formData.date} onChange={e => setFormData({
        ...formData,
        date: e.target.value
      })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea value={formData.notes} onChange={e => setFormData({
        ...formData,
        notes: e.target.value
      })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          {trade ? 'Save Changes' : 'Add Trade'}
        </button>
      </div>
    </form>;
};
export default TradeForm;