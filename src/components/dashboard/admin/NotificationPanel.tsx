import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";

const notifications = [
  {
    id: 1,
    name: "New Listings",
    message: "we're exclusively sorry for rejecting your article we belie...",
    avatar: "/avatar-4.jpg",
  },
  {
    id: 2,
    name: "Dispute Status Updated",
    message: "we're exclusively sorry for rejecting your article we belie...",
    avatar: "/avatar-3.jpg",
  },
  {
    id: 3,
    name: "Orders - Payment Reminder",
    message: "we're exclusively sorry for rejecting your article we belie...",
    avatar: "/avatar-1.jpg",
  },
  {
    id: 4,
    name: "Search Subscription Digest",
    message: "we're exclusively sorry for rejecting your article we belie...",
    avatar: "/avatar-2.jpg",
  },
];

const NotificationPanel = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-md font-semibold text-gray-800">Notification</h2>
        <BsThreeDots className="text-lg text-gray-700 cursor-pointer" />
      </div>
      <div className="divide-y divide-gray-200">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start gap-3 py-3">
            <div className="w-10 h-10 relative">
              <Image
                src={notification.avatar}
                alt={notification.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {notification.name}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {notification.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
