import Image from 'next/image';
import {Button} from '@/components/ui/button';
import { Music, Play, Download } from 'lucide-react';


const hymns = [
  {
    title: 'The Life - Giving Spirit',
    author: 'Dennis Cooper',
    date: 'January 3, 2025',
    image: '/hymn-image-4.jpg',
  },
  {
    title: 'Neque Porro Quisquam Est, Qui Dolorem Ipsum',
    author: 'Emilyn Sutherland',
    date: 'January 3, 2025',
    image: '/hymn-image-5.jpg',
  },
  {
    title: 'Quis Autem Vel Eum Iur',
    author: 'Leonel Edwards',
    date: 'January 3, 2025',
    image: '/hymn-image-6.jpg',
  },
  {
    title: 'Quis Autem Vel Eum Iure Reprehenderit',
    author: 'Darlene Randall',
    date: 'January 3, 2025',
    image: '/hymn-image-7.jpg',
  },
  {
    title: 'Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation',
    author: 'Jackie Alexander',
    date: 'January 3, 2025',
    image: '/hymn-image-8.jpg',
  },
  {
    title: 'Non Proident, Sunt In Culpa Qui Officia Deserunt Mollit Anim Id Est',
    author: 'Paige Miles',
    date: 'January 3, 2025',
    image: '/hymn-image-9.jpg',
  },
  {
    title: 'Excepteur Sint Occaecat Cupidatat Non Proident, Sunt In Culpa',
    author: 'Jacoby Wu',
    date: 'January 3, 2025',
    image: '/hymn-image-10.jpg',
  },
  {
    title: 'Lorem Ipsum Dolor Sit Amet, Consectetur',
    author: 'Dylan Howard',
    date: 'January 3, 2025',
    image: '/hymn-image-11.jpg',
  },
  {
    title: 'Neque Porro Quisquam Est, Qui',
    author: 'Courtney Williams',
    date: 'January 3, 2025',
    image: '/hymn-image-12.jpg',
  },
];

export default function RecentHymns() {
  return (
    <div className="bg-white p-6 max-w-screen-xl mx-auto">
      
        <div className='flex flex-col md:flex-row md:justify-between'>
            <h2 className="text-slate-900 text-3xl font-semibold mb-6">Recent Hymns</h2>
            <div className="flex justify-between space-x-4 mb-6">
                <Button variant="outline">Efik Hymns</Button>
                <Button variant="outline">English Hymns</Button>
                <Button variant="outline">Ibibio Hymns</Button>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hymns.map((hymn, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative w-full h-48">
                <Image
                    src={hymn.image}
                    alt={hymn.title}
                    layout="fill"
                    objectFit="cover"
                />
                </div>
                <div className="p-4">
                    <p className="text-sm text-slate-500">{hymn.author}</p>
                    <h3 className="text-lg font-semibold text-slate-700 leading-tight mt-1 mb-2">
                        {hymn.title}
                    </h3>
                    <p className="text-sm text-red-500">{hymn.date}</p>
                    <div className="flex space-x-2 mt-4">
                        <Button size="icon" className="rounded-full bg-red-500 text-white">
                        <Download size={16} />
                        </Button>
                        <Button size="icon" className="rounded-full bg-red-500 text-white">
                        <Music size={16} />
                        </Button>
                        <Button size="icon" className="rounded-full bg-red-500 text-white">
                        <Play size={16} />
                        </Button>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>
  );
}

