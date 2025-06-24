'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { BsThreeDots } from 'react-icons/bs';

type Notification = {
  id: number;
  name: string;
  message: string;
  emoji: string;
  read: boolean;
  muted: boolean;
  createdAt: string;
};

type NotificationPanelProps = {
  isAdmin: boolean;
};

const getDateDaysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

const getStorageKey = (isAdmin: boolean) =>
  isAdmin ? 'admin_notifications' : 'user_notifications';

export default function NotificationPanel({ isAdmin }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('all');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const initialNotifications: Notification[] = isAdmin
    ? [
        {
          id: 101,
          name: 'User Submitted Report',
          message: 'A user has reported an issue.',
          emoji: '🛠️',
          read: false,
          muted: false,
          createdAt: getDateDaysAgo(0),
        },
        {
          id: 102,
          name: 'System Alert: Article Flagged',
          message: 'An article has been flagged.',
          emoji: '🚨',
          read: false,
          muted: false,
          createdAt: getDateDaysAgo(7),
        },
      ]
    : [
        {
          id: 1,
          name: 'Article Approved',
          message: 'Your article has been approved.',
          emoji: '🎉',
          read: false,
          muted: false,
          createdAt: getDateDaysAgo(0),
        },
        {
          id: 2,
          name: 'Payment Reminder',
          message: 'Reminder: your invoice is pending.',
          emoji: '💰',
          read: false,
          muted: false,
          createdAt: getDateDaysAgo(5),
        },
      ];

  // Load from localStorage
  useEffect(() => {
    const key = getStorageKey(isAdmin);
    const data = localStorage.getItem(key);

    setTimeout(() => {
      if (data) {
        setNotifications(JSON.parse(data));
      } else {
        setNotifications(initialNotifications);
      }
      setLoading(false);
    }, 3000); // simulate loading delay
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  // Persist to localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(getStorageKey(isAdmin), JSON.stringify(notifications));
    }
  }, [notifications, isAdmin, loading]);

  const handleAction = (id: number, action: 'read' | 'mute' | 'delete') => {
    setNotifications((prev) =>
      prev
        .map((n) => {
          if (n.id !== id) return n;
          if (action === 'read') return { ...n, read: true };
          if (action === 'mute') return { ...n, muted: true };
          return n;
        })
        .filter((n) => (action === 'delete' ? n.id !== id : true))
    );
    setOpenMenuId(null);
  };

  const setDropdownRef = useCallback(
    (id: number) => (el: HTMLDivElement | null) => {
      dropdownRefs.current[id] = el;
    },
    []
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isOutside = Object.values(dropdownRefs.current).every(
        (ref) => !ref || !ref.contains(event.target as Node)
      );
      if (isOutside) setOpenMenuId(null);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = notifications.filter((n) => {
    const now = new Date();
    const created = new Date(n.createdAt);

    if (filter === 'today') {
      return created.toDateString() === now.toDateString();
    } else if (filter === 'week') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);
      return created >= sevenDaysAgo;
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <h2 className="text-xl font-semibold">Notification</h2>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 text-sm bg-gray-100 p-1 rounded-full">
            {['today', 'week', 'all'].map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key as 'today' | 'week' | 'all')}
                className={`px-3 py-1 rounded-full capitalize ${
                  filter === key
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                {key === 'today'
                  ? 'Today'
                  : key === 'week'
                  ? 'This Week'
                  : 'All'}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
            }
            className="text-sm text-gray-600 hover:text-black"
          >
            ✓ Mark All As Read
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-20">Loading notifications...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No notifications</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((n) => (
            <div
              key={n.id}
              className={`relative flex justify-between items-start gap-4 px-4 py-4 border rounded-xl bg-white transition hover:shadow-sm ${
                n.read ? 'opacity-70' : ''
              }`}
            >
              <div className="flex gap-3 flex-1">
                <div className="text-2xl shrink-0">{n.emoji}</div>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                    {n.name}
                    {n.muted && (
                      <span className="text-xs text-red-500">(Muted)</span>
                    )}
                    {isAdmin && (
                      <span className="px-2 py-0.5 text-xs text-white bg-blue-600 rounded-full">
                        Admin
                      </span>
                    )}
                  </p>
                  <p className="text-gray-500">{n.message}</p>
                </div>
              </div>

              <div className="relative shrink-0 z-50" ref={setDropdownRef(n.id)}>
                <button
                  onClick={() =>
                    setOpenMenuId((prev) => (prev === n.id ? null : n.id))
                  }
                >
                  <BsThreeDots className="w-5 h-5 text-gray-400" />
                </button>

                {openMenuId === n.id && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border shadow-md rounded-md text-sm z-50">
                    {!n.read && (
                      <button
                        onClick={() => handleAction(n.id, 'read')}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        ✅ Mark As Read
                      </button>
                    )}
                    {!n.muted && (
                      <button
                        onClick={() => handleAction(n.id, 'mute')}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        🔕 Mute
                      </button>
                    )}
                    <button
                      onClick={() => handleAction(n.id, 'delete')}
                      className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                    >
                      🗑 {isAdmin ? 'Delete (Admin)' : 'Delete'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
