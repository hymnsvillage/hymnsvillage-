'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Hymn {
  title: string;
  image: string;
  description: string;
  link: string;
}

const hymns: Hymn[] = [
  {
    title: 'Efik Hymns',
    image: '/efik-hymns.jpg',
    description:
      'JEHOVAH - UBọn ESIE Bedford (C.M.) R. C. H. 242M. H. B. 155 Abasi Nnyin Òfọn Eti "Jehovah Enyene Esit Ufọn Ye Mbọm..." Psalm 145:8 - 14. Abasi',
    link: '/hymns/efik',
  },
  {
    title: 'English Hymns',
    image: '/english-hymns.jpg',
    description:
      'THE CHURCH CONGREGATIONAL HYMNS 1 THE LORD - HIS GLORY (C. M.) C. H. 242 The Lord Is Very Gracious. The Lord Is Gracious And Full Of Compassion.',
    link: '/hymns/english',
  },
  {
    title: 'Ibibio Hymns',
    image: '/ibibio-hymns.jpg',
    description:
      'JEHOVAH - UBÔÑ ESIE 1 JEHOVAH - UBÔÑ ESIE Bedford (C.M.) R. C. H. 242M. H. B. 155 Abasi Nnyin Òfọn Eti "Jehovah Enyene Esit Ufọn Ye Mbọm.',
    link: '/hymns/ibibio',
  },
];

export default function FeaturedHymns() {
  return (
    <section className="py-12 px-6 md:px-12 bg-white">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h2 className="text-black text-xl md:text-2xl font-semibold">
          Explore Featured Hymns
        </h2>
        <Link href="/hymnals">
          <button className="border border-black rounded-full px-5 py-2 text-black text-sm hover:bg-black hover:text-white transition-colors duration-300">
            Discover Our Hymns
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {hymns.map((hymn, index) => (
          <Link href={hymn.link} key={index} className="group">
            <div className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="relative w-full h-60">
                <Image
                  src={hymn.image}
                  alt={hymn.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              <div className="p-4">
                <h3 className="text-black text-lg font-semibold mb-2">{hymn.title}</h3>
                <p className="text-sm text-gray-700 line-clamp-4">{hymn.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
