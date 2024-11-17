import React, { useState } from 'react';
import { X, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLoginModal({ isOpen, onClose, onSuccess }: AdminLoginModalProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === 'mohan' && credentials.password === 'mohan') {
      toast.success('Welcome back, Admin!');
      onSuccess();
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <LogIn className="h-6 w-6 text-rose-500" />
            <h2 className="text-2xl font-semibold">Admin Login</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={e => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={e => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}