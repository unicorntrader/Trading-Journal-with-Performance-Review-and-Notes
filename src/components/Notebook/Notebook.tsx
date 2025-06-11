import React, { useEffect, useState } from 'react';
import { PlusIcon, CalendarIcon, SearchIcon } from 'lucide-react';
import { Note, Trade } from '../../types';
import DailyNotes from './DailyNotes';
interface NotebookProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  trades: Trade[];
}
const Notebook: React.FC<NotebookProps> = ({
  notes,
  setNotes,
  trades
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: ''
  });
  // Get unique dates from notes
  const uniqueDates = [...new Set(notes.map(note => new Date(note.date).toISOString().split('T')[0]))].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  // Filter notes by selected date
  const filteredNotes = notes.filter(note => {
    const noteDate = new Date(note.date).toISOString().split('T')[0];
    return noteDate === selectedDate;
  });
  // Get trades for the selected date
  const tradesForSelectedDate = trades.filter(trade => {
    const tradeDate = new Date(trade.date).toISOString().split('T')[0];
    return tradeDate === selectedDate;
  });
  const handleAddNote = () => {
    if (newNote.title.trim() === '') return;
    const newNoteObj: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      date: new Date(selectedDate).toISOString()
    };
    setNotes([...notes, newNoteObj]);
    setNewNote({
      title: '',
      content: ''
    });
    setIsAddingNote(false);
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Trading Notebook</h1>
        <button onClick={() => setIsAddingNote(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          <PlusIcon size={16} className="mr-2" />
          New Note
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="mb-4">
            <div className="relative">
              <SearchIcon size={18} className="text-gray-400 absolute top-2.5 left-3" />
              <input type="text" placeholder="Search notes..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <CalendarIcon size={18} className="text-gray-500 mr-2" />
            <h2 className="text-md font-medium text-gray-800">Journal Dates</h2>
          </div>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {uniqueDates.map(date => {
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
            const isSelected = date === selectedDate;
            const notesCount = notes.filter(note => new Date(note.date).toISOString().split('T')[0] === date).length;
            return <button key={date} onClick={() => setSelectedDate(date)} className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md ${isSelected ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <span>{formattedDate}</span>
                  <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    {notesCount}
                  </span>
                </button>;
          })}
            {uniqueDates.length === 0 && <p className="text-sm text-gray-500 py-2">
                No journal entries yet
              </p>}
          </div>
        </div>
        {/* Main content */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-100">
          {isAddingNote ? <div className="p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                New Note
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input type="text" value={newNote.title} onChange={e => setNewNote({
                ...newNote,
                title: e.target.value
              })} placeholder="Note title..." className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea value={newNote.content} onChange={e => setNewNote({
                ...newNote,
                content: e.target.value
              })} placeholder="Write your notes here..." rows={8} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex justify-end space-x-2">
                  <button onClick={() => setIsAddingNote(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
                    Cancel
                  </button>
                  <button onClick={handleAddNote} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Save Note
                  </button>
                </div>
              </div>
            </div> : <DailyNotes notes={filteredNotes} trades={tradesForSelectedDate} selectedDate={selectedDate} setNotes={setNotes} />}
        </div>
      </div>
    </div>;
};
export default Notebook;