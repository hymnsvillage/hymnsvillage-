import { FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const platforms = [
  {
    name: "Facebook",
    icon: <FaFacebookF className="text-white" />,
    bg: "bg-blue-700",
    bar: "bg-blue-500",
    count: 150,
  },
  {
    name: "Twitter",
    icon: <FaXTwitter className="text-white" />,
    bg: "bg-black",
    bar: "bg-neutral-700",
    count: 100,
  },
  {
    name: "Instagram",
    icon: <FaInstagram className="text-red-500" />,
    bg: "bg-white border-4 border-red-500",
    bar: "bg-red-500",
    count: 120,
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn className="text-white" />,
    bg: "bg-blue-500",
    bar: "bg-blue-300",
    count: 95,
  },
];

const SocialMediaShared = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full">
      <h2 className="text-md font-semibold text-gray-800 mb-4">Top Social Media Shared</h2>
      <div className="space-y-5">
        {platforms.map((platform, index) => (
          <div key={index} className="relative flex items-center">
            <div
              className={`absolute z-10 w-8 h-8 rounded-full flex items-center justify-center ${platform.bg}`}
              style={{ left: 0 }}
            >
              {platform.icon}
            </div>

            <div className="ml-4 flex-1">
              <div className="relative h-4 rounded-md overflow-hidden bg-gray-200">
                <div
                  className={`absolute top-0 left-0 h-full rounded-md ${platform.bar}`}
                  style={{ width: `${(platform.count / 150) * 100}%` }}
                />
              </div>
            </div>

            <span className="ml-3 text-base font-semibold text-gray-900 w-10 text-right">
              {platform.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaShared;
