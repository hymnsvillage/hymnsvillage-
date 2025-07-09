'use client';

import { useState } from 'react';
import {
  User2,
  Mail,
  Bell,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';

import PersonalInfo from '@/components/dashboard/settings/ProfileSetting';
import NotificationSettings from '@/components/dashboard/settings/NotificationSettings';
import SecurityPrivacy from '@/components/dashboard/settings/SecurityPrivacy';
import EmailSetting from '@/components/dashboard/settings/EmailSetting';

// ✅ Updated type — no more null
type TabKey = 'personal-info' | 'email' | 'notification' | 'security' | 'none';

// ✅ Tab titles mapping (no null)
const tabTitles: Record<TabKey, string> = {
  'personal-info': 'Personal Info',
  'email': 'Email Settings',
  'notification': 'Notification Settings',
  'security': 'Security & Privacy',
  'none': '',
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('none');

  const links = [
    { label: 'Personal Info', key: 'personal-info', icon: <User2 size={16} /> },
    { label: 'Email', key: 'email', icon: <Mail size={16} /> },
    { label: 'Notification', key: 'notification', icon: <Bell size={16} /> },
    { label: 'Security & Privacy', key: 'security', icon: <ShieldCheck size={16} /> },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'personal-info':
        return <PersonalInfo />;
      case 'email':
        return <EmailSetting />;
      case 'notification':
        return <NotificationSettings />;
      case 'security':
        return <SecurityPrivacy />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      {/* Mobile View */}
      <div className="lg:hidden">
        {activeTab === 'none' ? (
          // Sidebar
          <div className="bg-white rounded-xl shadow-sm w-full p-5 space-y-4">
            {links.map((link) => (
              <div
                key={link.key}
                onClick={() => setActiveTab(link.key as TabKey)}
                className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                  {link.icon}
                  {link.label}
                </div>
                <span className="text-gray-400">›</span>
              </div>
            ))}
          </div>
        ) : (
          // Tab content with back button
          <div className="bg-white rounded-xl shadow-sm w-full p-5 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setActiveTab('none')}
                className="text-gray-600 hover:text-black"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-lg font-semibold">{tabTitles[activeTab]}</h2>
            </div>
            {renderActiveTab()}
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-xl shadow-sm w-1/4 p-5 min-h-[400px]">
          <ul className="space-y-4 text-sm font-medium">
            {links.map((link) => (
              <li
                key={link.key}
                onClick={() => setActiveTab(link.key as TabKey)}
                className={`flex items-center gap-2 cursor-pointer transition ${
                  activeTab === link.key
                    ? 'text-black font-semibold'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm w-3/4 p-6 min-h-[400px]">
          {activeTab !== 'none' ? (
            renderActiveTab()
          ) : (
            <div>
              <h2 className="text-lg font-semibold mb-4">Welcome to Settings</h2>
              <p className="text-sm text-gray-600">
                Please select a settings section from the left panel to begin.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
