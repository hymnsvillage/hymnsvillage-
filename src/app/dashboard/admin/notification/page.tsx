'use client';
import { useState } from 'react';
import { MoreVertical } from 'lucide-react';

const notifications = [
  {
    id: 1,
    emoji: '🎉',
    title: 'Congratulations Your Article Has Been Approved',
    description: 'Yo Reddit! What’s a small thing that anyone can do at nearly anytime to improve their mood and make',
  },
  {
    id: 2,
    emoji: '😔',
    title: 'Orders - Payment Reminder',
    description: 'We’re exclusively sorry for rejecting your article we believe you can do more',
  },
  {
    id: 3,
    emoji: '🎉',
    title: 'Dispute Status Updated',
    description: 'Yo Reddit! What’s a small thing that anyone can do at nearly anytime to improve their mood and make',
  },
  {
    id: 4,
    emoji: '🎉',
    title: 'New Listings',
    description: 'Yo Reddit! What’s a small thing that anyone can do at nearly anytime to improve their mood and make',
  },
  {
    id: 5,
    emoji: '🎉',
    title: 'Search Subscription Digest',
    description: 'Yo Reddit! What’s a small thing that anyone can do at nearly anytime to improve their mood and make',
  },
];

export default function NotificationPage() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
         <h2 className="text-xl font-semibold mb-4 text-gray-900">Notification</h2>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
       

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6 sm:hidden">
             <button 
                 className="px-4 py-1.5 text-sm rounded-full bg-black text-white">
                Today
                </button>
             <button 
                className="px-4 py-1.5 text-sm rounded-full border border-gray-300 text-gray-800">
                Last Week
                </button>
             <button
              className="ml-auto px-4 py-1.5 text-sm rounded-full border border-gray-300 text-gray-800">
                ✓ Mark All As Read
             </button>
        </div>

        {/* Notification list */}
        <div className="divide-y">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between py-4"
            >
              <div className="flex items-start space-x-4">
                {/* Emoji box */}
                <div className="w-15 h-15 flex items-center justify-center bg-gray-100 rounded-full text-xl">
                  {item.emoji}
                </div>
                {/* Title + description */}
                <div>
                  <p className="text-sm md:text-base font-medium text-gray-900">
                    {item.title}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Mobile popup menu */}
              <div className="relative sm:hidden">
                <button
                  onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                  className="p-2"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
                {activeMenu === item.id && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow z-10">
                    <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">✕ Dismiss</button>
                    <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">✓ Mark as Read</button>
                  </div>
                )}
              </div>

              {/* Desktop 3-dot icon */}
              <div className="hidden sm:block">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
