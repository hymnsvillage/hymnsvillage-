'use client';

import { useState } from 'react';

export default function SecurityPrivacy() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (value: string, index: number) => {
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          disabled
          value="***************"
          className="w-full p-2 border rounded bg-gray-100"
        />
        <p className="text-green-500 text-sm mt-1">Secured</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Update Password</h3>
        <input
          type="password"
          placeholder="atleast 6 characters"
          className="w-full p-2 border rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password must be the same"
          className="w-full p-2 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="flex gap-2">
          {otp.map((digit, i) => (
            <input
              key={i}
              maxLength={1}
              className="w-12 h-12 border rounded text-center text-lg"
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, i)}
            />
          ))}
        </div>
        <button className="px-4 py-2 bg-black text-white rounded">
          Update password →
        </button>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-medium text-red-600">Deactivate Account</h3>
        <p className="text-sm mb-2">
          This will shutdown your account and reactivate with signing in
        </p>
        <button className="px-4 py-2 bg-red-100 text-red-600 rounded border border-red-300">
          ⛔ Deactivate account
        </button>
      </div>
    </div>
  );
}
