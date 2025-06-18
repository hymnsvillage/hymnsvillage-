"use client";

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false });

export default function CreateBlogPage() {
  return (
    < div className="bg-gray-100 min-h-screen p-2 sm:p-6 md:p-8">
      <h1 className="text-2xl font-semibold mb-4">Create a Blog</h1>
      
          <Editor />
      
    </div>
  );
}
