'use client';

import { useState } from 'react';
import { Pencil } from 'lucide-react';

export default function EmailSettingsForm() {
  const [currentEmail, setCurrentEmail] = useState('hudesign@hudeen.info');
  const [newEmail, setNewEmail] = useState(currentEmail);
  const [password, setPassword] = useState('');
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    setCurrentEmail(newEmail);
    setEditMode(false);
    setPassword('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 w-full max-w-lg">
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">Current Email</label>
        <div className="relative">
          <input
            type="text"
            disabled
            value={currentEmail}
            className="w-full bg-gray-100 border text-sm border-gray-200 rounded-md px-4 py-2 pr-16"
          />
          <button
            type="button"
            onClick={() => setEditMode(true)}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-green-100 text-green-600 text-xs px-3 py-1 rounded-md flex items-center gap-1"
          >
            <Pencil className="w-3 h-3" />
            Edit
          </button>
        </div>
      </div>

      {editMode && (
        <>
          <h3 className="text-sm font-medium mb-4">Change Email Address</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-600 mb-1">New Email</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                type="password"
                placeholder="At least 8 character"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800 transition"
            >
              Change Email →
            </button>
          </form>
        </>
      )}
    </div>
  );
}
