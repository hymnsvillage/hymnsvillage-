// components/ui/SocialLinks.tsx

import { FaFacebookF, FaXTwitter, FaYoutube,  FaInstagram, FaTiktok } from 'react-icons/fa6';

const socialMedia = [
  {
    name: 'Facebook',
    icon: <FaFacebookF />,
    href:'https://www.facebook.com/Hymnsvillage',
    bg: 'bg-[#1877f2]',
  },
   {
    name: 'Tiktok',
    icon: <FaTiktok />,
    href: 'https://www.tiktok.com/@hymns_village',
    bg: 'bg-[#1111]', 
  },
  {
    name: 'Instagram',
    icon: <FaInstagram />,
    href: 'https://www.instagram.com/hymns_village/',
    bg: 'bg-[#ff0024]'
  },
  {
    name: 'Twitter (X)',
    icon: <FaXTwitter />,
    href: 'https://twitter.com/HymnsVillage ',
    bg: 'bg-[#333]',
  },
  {
    name: 'YouTube',
    icon: <FaYoutube />,
    href: 'https://www.youtube.com/@HYMNSVILLAGE?sub_confirmation=1',
    bg: 'bg-[#ff0000]',
  },
  
];

const SocialLinks = () => {
  return (
    <div className="flex gap-4 text-white text-xl">
      {socialMedia.map((platform, index) => (
        <a
          key={index}
          href={platform.href}
          target="_blank"
          rel="noopener noreferrer"
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
