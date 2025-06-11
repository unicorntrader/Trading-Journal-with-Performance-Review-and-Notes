import React, { useState } from 'react';
import { EditIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon } from 'lucide-react';
import { Note, Trade } from '../../types';
import { formatCurrency } from '../../utils/formatters';
interface DailyNotesProps {
  notes: Note[];
  trades: Trade[];
  selectedDate: string;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}
const DailyNotes: React.FC<DailyNotesProps> = ({
  notes,
  trades,
  selectedDate,
  setNotes
}) => {
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editContent, setEditContent] = useState('');
  const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setEditContent(note.content);
  };
  const handleSaveEdit = () => {
    if (!editingNote) return;
    setNotes(prevNotes => prevNotes.map(note => note.id === editingNote.id ? {
      ...note,
      content: editContent
    } : note));
    setEditingNote(null);
  };
  const handleDeleteNote = (noteId: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
  };
  // Calculate daily performance
  const dailyProfitLoss = trades.reduce((sum, trade) => sum + trade.profitLoss, 0);
  const winningTrades = trades.filter(trade => trade.profitLoss > 0).length;
  const losingTrades = trades.filter(trade => trade.profitLoss < 0).length;
  const winRate = trades.length > 0 ? Math.round(winningTrades / trades.length * 100) : 0;
  return <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-800">{formattedDate}</h2>
        <p className="text-sm text-gray-500 mt-1">
          {notes.length} notes • {trades.length} trades
        </p>
      </div>
      {/* Daily performance summary */}
      {trades.length > 0 && <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-md font-medium text-gray-700 mb-3">
            Daily Performance
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">P&L</p>
              <p className={`text-lg font-semibold ${dailyProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(dailyProfitLoss)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Win Rate</p>
              <p className="text-lg font-semibold text-blue-600">{winRate}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Winning Trades</p>
              <p className="text-lg font-semibold text-green-600">
                {winningTrades}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Losing Trades</p>
              <p className="text-lg font-semibold text-red-600">
                {losingTrades}
              </p>
            </div>
          </div>
        </div>}
      {/* Trade summary */}
      {trades.length > 0 && <div className="mb-6">
          <h3 className="text-md font-medium text-gray-700 mb-3">
            Today's Trades
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    P&L
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trades.map(trade => <tr key={trade.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {trade.symbol}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {trade.type}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {trade.quantity}
                    </td>
                    <td className={`px-4 py-2 whitespace-nowrap text-sm font-medium text-right ${trade.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <div className="flex items-center justify-end">
                        {trade.profitLoss >= 0 ? <ChevronUpIcon size={16} className="mr-1" /> : <ChevronDownIcon size={16} className="mr-1" />}
                        {formatCurrency(trade.profitLoss)}
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>}
      {/* Notes */}
      <div>
        <h3 className="text-md font-medium text-gray-700 mb-3">Notes</h3>
        {notes.length === 0 ? <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-500">No notes for this day yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Click "New Note" to add one
            </p>
          </div> : <div className="space-y-4">
            {notes.map(note => <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                {editingNote?.id === note.id ? <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      {note.title}
                    </h3>
                    <textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows={6} />
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => setEditingNote(null)} className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
                        Cancel
                      </button>
                      <button onClick={handleSaveEdit} className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        Save
                      </button>
                    </div>
                  </div> : <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-gray-800">
                        {note.title}
                      </h3>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditNote(note)} className="p-1 text-gray-400 hover:text-gray-600">
                          <EditIcon size={16} />
                        </button>
                        <button onClick={() => handleDeleteNote(note.id)} className="p-1 text-gray-400 hover:text-red-600">
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">
                      {note.content}
                    </p>
                  </div>}
              </div>)}
          </div>}
      </div>
    </div>;
};
export default DailyNotes;