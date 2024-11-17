import React from 'react';
import { MapPin, Camera, Search, PlusCircle, Settings } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onNewEntry: () => void;
  onAdminLogin: () => void;
}

export default function Header({ onSearch, onNewEntry, onAdminLogin }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-semibold">TravelDiary</span>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations, tags, or users..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onNewEntry}
              className="flex items-center space-x-2 bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition"
            >
              <PlusCircle className="h-5 w-5" />
              <span>New Entry</span>
            </button>
            <button
              onClick={onAdminLogin}
              className="text-gray-400 hover:text-gray-600 transition"
              title="Admin"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}