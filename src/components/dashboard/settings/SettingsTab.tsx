'use client';

import { ShieldCheck, Bell, Mail, User } from 'lucide-react';

type SettingsTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabs = [
  { name: 'Personal Info', icon: <User className="w-4 h-4" /> },
  { name: 'Email', icon: <Mail className="w-4 h-4" /> },
  { name: 'Notification', icon: <Bell className="w-4 h-4" /> },
  { name: 'Security & Privacy', icon: <ShieldCheck className="w-4 h-4" /> },
];

export default function SettingsTabs({ activeTab, setActiveTab }: SettingsTabsProps) {
  return (
    <div className="space-y-2">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === tab.name
              ? 'bg-gray-200 text-gray-900'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {tab.icon}
          <span className="ml-2">{tab.name}</span>
        </button>
      ))}
    </div>
  );
}
