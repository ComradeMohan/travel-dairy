import React, { useState } from 'react';
import { X, Trash2, Edit2, Save } from 'lucide-react';
import toast from 'react-hot-toast';

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

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  entries: TravelEntry[];
  onDelete: (id: string) => void;
  onEdit: (id: string, entry: Partial<TravelEntry>) => void;
}

export default function AdminPanel({ isOpen, onClose, entries, onDelete, onEdit }: AdminPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<TravelEntry>>({});

  if (!isOpen) return null;

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      onDelete(id);
      toast.success('Entry deleted successfully');
    }
  };

  const handleEdit = (entry: TravelEntry) => {
    setEditingId(entry.id);
    setEditForm(entry);
  };

  const handleSave = (id: string) => {
    onEdit(id, editForm);
    setEditingId(null);
    setEditForm({});
    toast.success('Entry updated successfully');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-4xl mx-4 relative max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Admin Panel</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            {entries.map(entry => (
              <div key={entry.id} className="border rounded-lg p-4">
                {editingId === entry.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={editForm.location || ''}
                        onChange={e => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={editForm.description || ''}
                        onChange={e => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full p-2 border rounded-lg h-24"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tags (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={editForm.tags?.join(', ') || ''}
                        onChange={e => setEditForm(prev => ({ 
                          ...prev, 
                          tags: e.target.value.split(',').map(tag => tag.trim()) 
                        }))}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSave(entry.id)}
                        className="flex items-center space-x-2 bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium">{entry.location}</h3>
                        <p className="text-sm text-gray-500">{entry.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(entry)}
                          className="text-gray-600 hover:text-rose-500"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-gray-600 hover:text-rose-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{entry.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}