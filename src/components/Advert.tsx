import Image from 'next/image';

const AdvertisementSection = () => {
  return (
    <section className="w-full bg-white px-4 md:px-12 py-8">
      <h2 className="text-xl font-semibold mb-6">Advertisements</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Large ad on the left */}
        <div className="md:col-span-2 rounded-xl overflow-hidden border border-gray-200">
          <Image
            src="/ads/logs.jpg"
            alt="Logs Advertisement"
            width={1000}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right-side column: two stacked ads */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <Image
              src="/ads/stay-safe.jpg"
              alt="Stay Safe Ad"
              width={500}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-200">
            <Image
              src="/ads/chynas.jpg"
              alt="Chynas Collection Ad"
              width={500}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvertisementSection;
