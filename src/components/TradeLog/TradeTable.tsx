import React from 'react';
import { ChevronUpIcon, ChevronDownIcon, MoreHorizontalIcon } from 'lucide-react';
import { Trade } from '../../types';
import { formatCurrency } from '../../utils/formatters';
interface TradeTableProps {
  trades: Trade[];
}
const TradeTable: React.FC<TradeTableProps> = ({
  trades
}) => {
  return <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Symbol
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Entry Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Exit Price
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              P&L
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {trades.map(trade => <tr key={trade.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(trade.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-gray-900">
                    {trade.symbol}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${trade.type === 'Buy' || trade.type === 'Cover' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {trade.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {trade.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(trade.entryPrice)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(trade.exitPrice)}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${trade.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <div className="flex items-center justify-end">
                  {trade.profitLoss >= 0 ? <ChevronUpIcon size={16} className="mr-1" /> : <ChevronDownIcon size={16} className="mr-1" />}
                  {formatCurrency(trade.profitLoss)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreHorizontalIcon size={18} />
                </button>
              </td>
            </tr>)}
        </tbody>
      </table>
    </div>;
};
export default TradeTable;