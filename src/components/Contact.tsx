import Image from "next/image";
import SocialLinks from "./SocialLinks";

export default function Contact() {
  return (
    <div className="min-h-screen w-full bg-white p-10 mt-16">
      <div className=" grid grid-cols-1 md:grid-cols-2 bg-white overflow-hidden">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start justify-center p-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Connect With Us</h2>
          <p className="text-[12px] text-gray-500 mb-6">
            Share your thoughts and inquiries
          </p>
          <div className="w-40 mb-6">
            <Image
              src="/contact.png"
              alt="Support Illustration"
              width={160}
              height={160}
              layout="responsive"
            />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Send us a message</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Please Enter Your Name"
                className="mt-1 block w-full text-gray-950 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-950 placeholder:text-[12px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="e.g Example@mail.com"
                className="mt-1 block w-full text-gray-950 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-950 placeholder:text-[12px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                // rows="4"
                placeholder="Your message here..."
                className="mt-1 block w-full text-gray-950 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-950 placeholder:text-[12px]"
              />
            </div>
            <button
              type="submit"
              className="bg-slate-900 text-white px-6 py-2 rounded-md hover:bg-black"
            >
              Send Message
            </button>
          </form>
        </div>
        {/* Social Icons */}
        <div className="flex items-center justify-center md:items-start md:justify-start my-4">
            <SocialLinks />
        </div>
      </div>
    </div>
  );
}

