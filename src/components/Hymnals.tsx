import Image from 'next/image';

export default function HymnalPage() {
  return (
    <section className="relative overflow-hidden">
        <main className="bg-black min-h-screen text-white">
            
            {/* Background image */}
            <Image
                src="/hymnal.jpg"
                alt="Hymnal Background"
                layout="fill"
                objectFit="cover"
                quality={100}
                className=" z-10 w-full h-full"
                // style={{ filter: "blur(1px)" }} // Optional: Add a blur effect to the background image
            />
            
            <div className="relative grid grid-cols-1 px-8 py-12 text-white">
                <div className="w-full z-20 mt-10 flex flex-col justify-center gap-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">
                        Discover Sacred Songs: Explore Our Collection of Hymns
                    </h1>
                    <p className="text-[14px] md:text-lg mb-10 text-center">
                        Explore a curated digital sanctuary of English and Efik hymns, alongside insightful articles that resonate with the heart of faith. Join a vibrant community where shared devotion finds harmonious expression.
                    </p>

                    <h2 className="text-xl md:text-2xl font-semibold mb-6">
                        New Listing
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { src: '/hymn-image-1.jpg', author: 'Dennis Cooper', title: 'The Life - Giving Spirit', date: 'January 3, 2025' },
                        { src: '/hymn-image-2.jpg', author: 'Emilyn Sutherland', title: 'The Life - Giving Spirit', date: 'January 3, 2025' },
                        { src: '/hymn-image-3.jpg', author: 'Leonel Edwards', title: 'The Life - Giving Spirit', date: 'January 3, 2025' },
                    ].map((item, idx) => (
                        <div key={idx} className="relative group overflow-hidden rounded-xl shadow-lg">
                            <Image
                                src={item.src}
                                alt={item.title}
                                width={400}
                                height={400}
                                objectFit='cover'
                                quality={100}
                                className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="w-16 h-16 bg-white text-black rounded-full text-2xl font-bold flex items-center justify-center shadow-lg cursor-pointer">
                                    ▶
                                </button>
                            </div>
                            <p className="absolute bottom-12 left-2 text-sm text-white">{item.author}</p>
                            <h3 className="absolute bottom-4 left-2 text-lg font-semibold leading-tight mt-1 mb-2">
                                {item.title}
                            </h3>
                            <p className="absolute bottom-2 left-2 text-sm text-white">{item.date}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </main>
    </section>
  );
}

