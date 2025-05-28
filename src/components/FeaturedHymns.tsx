'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from './ui/Button';

const hymns = [
  {
    title: 'Efik Hymns',
    image: '/efik-hymns.jpg',
    description:
      'JEHOVAH – UBọn ESIE Bedford (C.M.) R. C. H. 242M. H. B. 155 Abasi Nnyin Òfọn Eti "Jehovah Enyene Esit Ufọn Ye Mbọm..." Psalm 145:8 – 14. Abasi',
    link: '/hymns/efik',
  },
  {
    title: 'English Hymns',
    image: '/english-hymns.jpg',
    description:
      'THE CHURCH CONGREGATIONAL HYMNS 1 THE LORD – HIS GLORY (C. M.) C. H. 242 The Lord Is Very Gracious. The Lord Is Gracious And Full Of Compassion.',
    link: '/hymns/english',
  },
  {
    title: 'Ibibio Hymns',
    image: '/ibibio-hymns.jpg',
    description:
      'JEHOVAH – UBÔÑ ESIE 1 JEHOVAH – UBÔÑ ESIE Bedford (C.M.) R. C. H. 242M. H. B. 155 Abasi Nnyin Òfọn Eti "Jehovah Enyene Esit Ufọn Ye Mbọm.',
    link: '/hymns/ibibio',
  }
];

export default function FeaturedHymns() {
  return (
    <section className="py-12 px-8 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-black text-xl md:text-2xl font-semibold">Explore Featured Hymns</h2>
        <Link href="/hymnals">
          <Button className="border border-black rounded-full px-5 py-2 text-black text-sm hover:bg-black hover:text-white transition">
            Discover Our Hymns
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4">
        {hymns.map((hymn, index) => (
          <Link href={hymn.link} key={index}>
            <div className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer">
              <div className="relative w-full h-60 rounded-t-2xl overflow-hidden">
                <Image
                  src={hymn.image}
                  alt={hymn.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className=" text-black text-lg font-semibold mb-1">{hymn.title}</h3>
                <p className="text-sm text-gray-800">{hymn.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

