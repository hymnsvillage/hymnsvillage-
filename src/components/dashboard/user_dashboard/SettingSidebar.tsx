'use client';

type SettingsSidebarProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export default function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {
  const tabs = ['Email', 'Notification', 'Security & Privacy'];

  return (
    <div className="w-48 space-y-4 text-sm text-gray-600">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`block w-full text-left px-3 py-2 rounded-md transition ${
            activeTab === tab
              ? 'bg-black text-white font-medium'
              : 'hover:bg-gray-100'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
