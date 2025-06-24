'use client';

import { useState } from 'react';
import EmailSettings from '@/components/dashboard/settings/EmailSetting';
import SettingsTabs from '@/components/dashboard/settings/SettingsTab';
import SecurityPrivacy from '@/components/dashboard/settings/SecurityPrivacy';
import ProfilePage from '@/components/dashboard/settings/ProfileSetting';
import NotificationSettings from '@/components/dashboard/settings/NotificationSettings';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Security & Privacy');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Email':
        return <EmailSettings />;
      case 'Notification':
        return <NotificationSettings />;
      case 'Personal Info':
        return <ProfilePage />;
      case 'Security & Privacy':
        return <SecurityPrivacy />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
        <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderTabContent()}
      </div>
    </div>
  );
}
