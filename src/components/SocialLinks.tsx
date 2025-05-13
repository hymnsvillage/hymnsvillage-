// components/ui/SocialLinks.tsx

import { FaFacebookF, FaXTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa6';

const socialMedia = [
  {
    name: 'Facebook',
    icon: <FaFacebookF />,
    href: '#',
    bg: 'bg-[#1877f2]',
  },
  {
    name: 'Twitter (X)',
    icon: <FaXTwitter />,
    href: '#',
    bg: 'bg-[#333]',
  },
  {
    name: 'YouTube',
    icon: <FaYoutube />,
    href: '#',
    bg: 'bg-[#ff0000]',
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedinIn />,
    href: '#',
    bg: 'bg-[#0a66c2]',
  },
];

const SocialLinks = () => {
  return (
    <div className="flex gap-4 text-white text-xl">
      {socialMedia.map((platform, index) => (
        <a
          key={index}
          href={platform.href}
          aria-label={platform.name}
          className={`w-9 h-9 flex items-center justify-center rounded-full ${platform.bg} transition-transform transform hover:scale-110 hover:brightness-110 shadow-md`}
        >
          {platform.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
