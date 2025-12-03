"use client";

import SocialIcons from "@/components/SocialLinks";

interface ContactFormProps {
  category: string;
}

export default function ContactForm({ category }: ContactFormProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-300 px-4 py-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 px-4 py-2 rounded"
        />
        <textarea
          placeholder="Your message here..."
          className="w-full border border-gray-300 px-4 py-2 rounded min-h-[100px]"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Send
        </button>
      </form>

      {/* Social Icons */}
      <div className="mt-6">
        <p className="text-sm text-gray-700 font-medium mb-2">Our socials</p>
        <SocialIcons />
      </div>
    </div>
  );
}
