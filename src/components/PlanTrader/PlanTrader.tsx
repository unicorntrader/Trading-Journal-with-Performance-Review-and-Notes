import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { TradePlan } from '../../types';
import TradePlanForm from './TradePlanForm';
import TradingViewChart from './TradingViewChart';
interface PlanTraderProps {
  tradePlans: TradePlan[];
  setTradePlans: React.Dispatch<React.SetStateAction<TradePlan[]>>;
}
const PlanTrader: React.FC<PlanTraderProps> = ({
  tradePlans,
  setTradePlans
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [editingPlan, setEditingPlan] = useState<TradePlan | null>(null);
  const handleAddPlan = (plan: Omit<TradePlan, 'id' | 'status' | 'date'>) => {
    const newPlan: TradePlan = {
      ...plan,
      id: Date.now().toString(),
      status: 'Planned',
      date: new Date().toISOString()
    };
    const updatedPlans = [...tradePlans, newPlan];
    setTradePlans(updatedPlans);
    localStorage.setItem('tradePlans', JSON.stringify(updatedPlans));
    setIsAddingPlan(false);
    setSelectedSymbol(plan.symbol);
  };
  const handleStatusChange = (planId: string, newStatus: TradePlan['status']) => {
    const updatedPlans = tradePlans.map(plan => plan.id === planId ? {
      ...plan,
      status: newStatus
    } : plan);
    setTradePlans(updatedPlans);
    localStorage.setItem('tradePlans', JSON.stringify(updatedPlans));
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Plan Trader</h1>
        <button onClick={() => setIsAddingPlan(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          <PlusIcon size={16} className="mr-2" />
          New Trade Plan
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Chart</h2>
          <TradingViewChart symbol={selectedSymbol || 'AAPL'} />
        </div>
        {/* Trade Plans Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Trade Plans
          </h2>
          <div className="space-y-4">
            {tradePlans.map(plan => <div key={plan.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition cursor-pointer" onClick={() => setSelectedSymbol(plan.symbol)}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      {plan.symbol}
                    </h3>
                    <p className="text-sm text-gray-500">{plan.strategy}</p>
                  </div>
                  <select value={plan.status} onChange={e => handleStatusChange(plan.id, e.target.value as TradePlan['status'])} className={`text-sm font-medium rounded-full px-3 py-1 ${plan.status === 'Planned' ? 'bg-blue-100 text-blue-800' : plan.status === 'Executed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <option value="Planned">Planned</option>
                    <option value="Executed">Executed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-2">
                  <div>
                    <p className="text-xs text-gray-500">Entry</p>
                    <p className="text-sm font-medium">${plan.entryPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Target</p>
                    <p className="text-sm font-medium text-green-600">
                      ${plan.targetPrice}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Stop</p>
                    <p className="text-sm font-medium text-red-600">
                      ${plan.stopLoss}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <p className="text-blue-600 font-medium">
                    R/R: {plan.riskRewardRatio.toFixed(2)}
                  </p>
                  <p className="text-gray-500">
                    {new Date(plan.date).toLocaleDateString()}
                  </p>
                </div>
              </div>)}
            {tradePlans.length === 0 && <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                <p className="text-gray-500">No trade plans yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Click "New Trade Plan" to create one
                </p>
              </div>}
          </div>
        </div>
      </div>
      {/* Add/Edit Plan Modal */}
      {(isAddingPlan || editingPlan) && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <TradePlanForm onSubmit={handleAddPlan} onCancel={() => {
          setIsAddingPlan(false);
          setEditingPlan(null);
        }} initialPlan={editingPlan} />
          </div>
        </div>}
    </div>;
};
export default PlanTrader;