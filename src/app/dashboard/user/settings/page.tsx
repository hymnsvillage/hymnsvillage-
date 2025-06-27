// app/account/settings/page.tsx
'use client';

import { useState } from 'react';
import SettingsSidebar from '@/components/dashboard/user_dashboard/SettingSidebar';

function EmailSettingsForm() {
  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-lg font-medium mb-4">Change Email</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Current Email</label>
          <input type="email" className="w-full border px-4 py-2 rounded" value="hudesign@hudeen.info" disabled />
        </div>
        <div>
          <label className="block text-sm text-gray-700">New Email</label>
          <input type="email" className="w-full border px-4 py-2 rounded" placeholder="Enter new email" />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Password</label>
          <input type="password" className="w-full border px-4 py-2 rounded" placeholder="Enter password" />
        </div>
        <button className="bg-black text-white px-4 py-2 rounded">Change Email</button>
      </form>
    </div>
  );
}

function NotificationSettingsForm() {
  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
      <p className="text-sm text-gray-600">No notification options configured yet.</p>
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
          <input type="password" className="w-full border px-4 py-2 rounded" placeholder="Enter current password" />
        </div>
        <div>
          <label className="block text-sm text-gray-700">New Password</label>
          <input type="password" className="w-full border px-4 py-2 rounded" placeholder="Enter new password" />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Confirm New Password</label>
          <input type="password" className="w-full border px-4 py-2 rounded" placeholder="Confirm new password" />
        </div>
        <button className="bg-black text-white px-4 py-2 rounded">Change Password</button>
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
