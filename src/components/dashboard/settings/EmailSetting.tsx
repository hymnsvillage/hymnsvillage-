'use client';

import { useState } from 'react';

export default function EmailSettings() {
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentEmail] = useState('hudesign@hudeen.info');

  const handleChangeEmail = () => {
    if (!newEmail || !password) return alert('Fill all fields');
    alert(`Request to change email to ${newEmail} submitted.`);
    // Hook to Supabase later
  };

  return (
    <div className="bg-white rounded-lg border p-6 space-y-6 shadow-sm">
      <section>
        <h2 className="text-sm font-semibold text-gray-800 mb-2">Email Settings</h2>
        <div className="flex items-center justify-between border rounded p-4 bg-gray-50">
          <span className="text-sm">{currentEmail}</span>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md">Verified</span>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Change Email Address</h3>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="New Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="password"
            placeholder="At least 8 character"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
          />
          <button
            onClick={handleChangeEmail}
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition text-sm"
          >
            Change Email →
          </button>
        </div>
      </section>
    </div>
  );
}
