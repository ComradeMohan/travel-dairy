import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import TravelCard from './components/TravelCard';
import NewEntryModal from './components/NewEntryModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminPanel from './components/AdminPanel';

interface TravelEntry {
  id: string;
  image: string;
  location: string;
  date: string;
  description: string;
  likes: number;
  comments: number;
  tags: string[];
  isLiked: boolean;
}

const initialEntries = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800',
    location: 'Yosemite National Park',
    date: 'March 15, 2024',
    description: 'Breathtaking views of Half Dome during sunset. The colors were absolutely magical!',
    likes: 234,
    comments: 42,
    tags: ['nature', 'hiking', 'sunset', 'california'],
    isLiked: false
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800',
    location: 'Paris, France',
    date: 'March 12, 2024',
    description: 'Morning coffee at a charming café near the Eiffel Tower. Paris never disappoints!',
    likes: 156,
    comments: 28,
    tags: ['paris', 'travel', 'coffee', 'cityscape'],
    isLiked: false
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800',
    location: 'Santorini, Greece',
    date: 'March 10, 2024',
    description: 'White-washed buildings against the deep blue Aegean Sea. A perfect Mediterranean afternoon.',
    likes: 312,
    comments: 45,
    tags: ['greece', 'island', 'architecture', 'sea'],
    isLiked: false
  }
];

function App() {
  const [entries, setEntries] = useState<TravelEntry[]>(initialEntries);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleNewEntry = (entry: any) => {
    const newEntry: TravelEntry = {
      id: Date.now().toString(),
      image: URL.createObjectURL(entry.media),
      location: entry.location,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      description: entry.description,
      likes: 0,
      comments: 0,
      tags: entry.tags,
      isLiked: false
    };
    setEntries([newEntry, ...entries]);
    setIsModalOpen(false);
  };

  const handleLike = (id: string) => {
    setEntries(entries.map(entry => {
      if (entry.id === id) {
        return {
          ...entry,
          likes: entry.isLiked ? entry.likes - 1 : entry.likes + 1,
          isLiked: !entry.isLiked
        };
      }
      return entry;
    }));
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleEdit = (id: string, updatedEntry: Partial<TravelEntry>) => {
    setEntries(entries.map(entry => {
      if (entry.id === id) {
        return { ...entry, ...updatedEntry };
      }
      return entry;
    }));
  };

  const filteredEntries = entries.filter(entry => {
    const searchString = searchQuery.toLowerCase();
    return (
      entry.location.toLowerCase().includes(searchString) ||
      entry.description.toLowerCase().includes(searchString) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchString))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Header 
        onSearch={handleSearch}
        onNewEntry={() => setIsModalOpen(true)}
        onAdminLogin={() => setIsAdminModalOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map((entry) => (
            <TravelCard 
              key={entry.id} 
              {...entry} 
              onLike={() => handleLike(entry.id)}
            />
          ))}
        </div>
      </main>

      <NewEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewEntry}
      />

      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={() => {
          setIsAdminModalOpen(false);
          setIsAdminPanelOpen(true);
        }}
      />

      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        entries={entries}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;