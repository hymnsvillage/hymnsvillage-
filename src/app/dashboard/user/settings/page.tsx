'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { supabase } from '@/supabase/client';
import SettingsSidebar from '@/components/dashboard/user_dashboard/SettingSidebar';

function EmailSettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<{ email: string; password: string }>();

  const [currentEmail, setCurrentEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getEmail = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setCurrentEmail(user.email ?? '');
    };

    getEmail();
  }, []);

  const onSubmit = async (data: { email: string; password: string }) => {
    setError('');
    setSuccess('');

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: currentEmail,
      password: data.password,
    });

    if (signInError) {
      setError('Incorrect password.');
      return;
    }

    const res = await fetch('/api/auth/settings/change-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newEmail: data.email }),
    });

    const result = await res.json();

    if (!res.ok) {
      setError(result.error || 'Failed to update email.');
      return;
    }

    await fetch('/api/auth/settings/send-verification', { method: 'POST' });

    setSuccess('Email change requested. Please verify from your inbox.');
    setCurrentEmail(data.email);
    reset();
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-lg font-medium mb-4">Change Email</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Current Email</label>
          <input
            type="email"
            className="w-full border px-4 py-2 rounded bg-gray-100"
            value={currentEmail}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">New Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="w-full border px-4 py-2 rounded"
            placeholder="Enter new email"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">New email is required.</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-700">Password</label>
          <input
            type="password"
            {...register('password', { required: true })}
            className="w-full border px-4 py-2 rounded"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">Password is required.</p>
          )}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900 disabled:opacity-50"
        >
          {isSubmitting ? 'Updating...' : 'Change Email'}
        </button>
      </form>
    </div>
  );
}

function NotificationSettingsForm() {
  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
      <p className="text-sm text-gray-600">
        No notification options configured yet.
      </p>
    </div>
  );
}

function SecuritySettingsForm() {
  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-lg font-medium mb-4">Change Password</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Current Password</label>
          <input
            type="password"
            className="w-full border px-4 py-2 rounded"
            placeholder="Enter current password"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full border px-4 py-2 rounded"
            placeholder="Enter new password"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Confirm New Password</label>
          <input
            type="password"
            className="w-full border px-4 py-2 rounded"
            placeholder="Confirm new password"
          />
        </div>
        <button className="bg-black text-white px-4 py-2 rounded">
          Change Password
        </button>
      </form>
    </div>
  );
}

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState('Email');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Notification':
        return <NotificationSettingsForm />;
      case 'Security & Privacy':
        return <SecuritySettingsForm />;
      case 'Email':
      default:
        return <EmailSettingsForm />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-6">
      <h1 className="text-xl font-semibold mb-6">Account settings</h1>
      <div className="flex gap-10">
        <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1">{renderActiveTab()}</div>
      </div>
    </div>
  );
}
