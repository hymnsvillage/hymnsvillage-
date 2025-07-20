
import Navbar from "@/components/Navbar";
import AdvertisementSection from "@/components/Advert";
import Footer from "@/components/footer";



export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html >
      <body >
        <Navbar />
        {children}
         <AdvertisementSection />
        <Footer />
      </body>
    </html>
  );
}
