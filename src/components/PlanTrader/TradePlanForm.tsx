import React, { useEffect, useState } from 'react';
import { TradePlan } from '../../types';
interface TradePlanFormProps {
  onSubmit: (plan: Omit<TradePlan, 'id' | 'status' | 'date'>) => void;
  onCancel: () => void;
  initialPlan?: TradePlan;
}
const TradePlanForm: React.FC<TradePlanFormProps> = ({
  onSubmit,
  onCancel,
  initialPlan
}) => {
  const [formData, setFormData] = useState({
    symbol: '',
    entryPrice: 0,
    targetPrice: 0,
    stopLoss: 0,
    quantity: 0,
    strategy: '',
    notes: ''
  });
  useEffect(() => {
    if (initialPlan) {
      setFormData({
        symbol: initialPlan.symbol,
        entryPrice: initialPlan.entryPrice,
        targetPrice: initialPlan.targetPrice,
        stopLoss: initialPlan.stopLoss,
        quantity: initialPlan.quantity || 0,
        strategy: initialPlan.strategy,
        notes: initialPlan.notes || ''
      });
    }
  }, [initialPlan]);
  const calculateRiskReward = () => {
    const potentialGain = formData.targetPrice - formData.entryPrice;
    const potentialLoss = formData.entryPrice - formData.stopLoss;
    return potentialLoss !== 0 ? Math.abs(potentialGain / potentialLoss) : 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const riskRewardRatio = calculateRiskReward();
    onSubmit({
      ...formData,
      riskRewardRatio
    });
  };
  return <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        {initialPlan ? 'Edit Trade Plan' : 'New Trade Plan'}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            Target Price
          </label>
          <input type="number" value={formData.targetPrice} onChange={e => setFormData({
          ...formData,
          targetPrice: Number(e.target.value)
        })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required step="0.01" min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stop Loss
          </label>
          <input type="number" value={formData.stopLoss} onChange={e => setFormData({
          ...formData,
          stopLoss: Number(e.target.value)
        })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required step="0.01" min="0" />
        </div>
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
          Strategy
        </label>
        <input type="text" value={formData.strategy} onChange={e => setFormData({
        ...formData,
        strategy: e.target.value
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
      <div className="bg-blue-50 p-4 rounded-md">
        <p className="text-sm font-medium text-blue-800">
          Risk/Reward Ratio: {calculateRiskReward().toFixed(2)}
        </p>
        <p className="text-xs text-blue-600 mt-1">
          Potential Gain: $
          {((formData.targetPrice - formData.entryPrice) * formData.quantity).toFixed(2)}
        </p>
        <p className="text-xs text-blue-600">
          Potential Loss: $
          {((formData.entryPrice - formData.stopLoss) * formData.quantity).toFixed(2)}
        </p>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          {initialPlan ? 'Save Changes' : 'Create Plan'}
        </button>
      </div>
    </form>;
};
export default TradePlanForm;