'use client';

import { supabase } from '@/supabase/client';
import { useState } from 'react';

export default function SecurityPrivacy() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deactivating, setDeactivating] = useState(false);

  const handleOtpChange = (value: string, index: number) => {
    const updated = [...otp];
    updated[index] = value.slice(-1); // one character max
    setOtp(updated);
  };

  const updatePassword = async () => {
    setError('');
    setSuccess('');

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const fullOtp = otp.join('');
    if (fullOtp.length !== 4) {
      setError('OTP must be 4 digits.');
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess('Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
      setOtp(['', '', '', '']);
    }
  };

  const deactivateAccount = async () => {
    setDeactivating(true);
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm w-full px-4 py-6 md:px-6 space-y-6">
      {/* Password display */}
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

      {/* Update Password */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-medium">Update Password</h3>

        <input
          type="password"
          placeholder="At least 6 characters"
          className="w-full p-2 border rounded text-sm"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Must match the above password"
          className="w-full p-2 border rounded text-sm"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* OTP Inputs */}
        <div className="flex gap-2 justify-between sm:justify-start">
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

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <button
          onClick={updatePassword}
          className="w-full bg-black text-white py-2 rounded text-sm hover:bg-gray-800"
        >
          Update Password →
        </button>
      </div>

      {/* Deactivate Account */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-red-600">Deactivate Account</h3>
        <p className="text-sm mb-2 text-gray-600">
          This will shut down your account. You can reactivate it by signing in again.
        </p>
        <button
          onClick={deactivateAccount}
          disabled={deactivating}
          className="w-full px-4 py-2 bg-red-100 text-red-600 rounded border border-red-300 hover:bg-red-200 text-sm"
        >
          ⛔ {deactivating ? 'Deactivating...' : 'Deactivate Account'}
        </button>
      </div>
    </div>
  );
}
