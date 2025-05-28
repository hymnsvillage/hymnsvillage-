import Image from 'next/image';

const AdvertisementSection = () => {
  return (
    <section className="w-full mx-auto h-auto bg-white px-8 py-12 overflow-hidden">
      <h2 className="text-black text-2xl font-semibold mb-6">Advertisements</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Large ad on the left */}
        <div className="md:col-span-2 rounded-xl overflow-hidden border border-gray-200 h-[300px] md:h-[400px]">
          <Image
            src="/advert-logs.jpg"
            alt="Ads-Logs"
            width={500}
            height={300}
            className="w-full h-fit object-cover"
          />
        </div>

        {/* Right-side column: two stacked ads */}
        <div className="flex md:flex-col gap-4 h-fit">
          <div className="rounded-xl overflow-hidden border border-gray-200 h-[190px]">
            <Image
              src="/advert-elections.jpg"
              alt="Stay Safe Ad"
              width={500}
              height={180}
              className="h-fit object-cover"
            />
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-200 h-[190px]">
            <Image
              src="/advert-clothings.jpg"
              alt="Chynas Collection Ad"
              width={500}
              height={180}
              className="h-fit object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdvertisementSection;

