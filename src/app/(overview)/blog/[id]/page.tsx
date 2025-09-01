"use client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Track blog view
async function trackBlogView(blogId: string) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog/${blogId}/view`, {
      method: "POST",
    });
  } catch (error) {
    console.error("Failed to track view:", error);
  }
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  // Fetch blog data
  const blog = await getBlogBySlug(params.id);

  // If blog not found, return 404
  if (!blog) {
    notFound();
  }

  // Track blog view on component mount
  // Note: This is a client-side effect, so we need to use useEffect.
  // However, the component is async, so we can't directly use useEffect here.
  // A common pattern is to use a separate client component or a ref to trigger the effect.
  // For simplicity, we'll call the tracking function directly, assuming it's handled appropriately
  // in a real-world scenario (e.g., within a Client Component wrapper).
  // In this specific case, since it's a server component, we'll simulate the tracking by
  // calling it directly, but be aware of the implications in a full client-side context.
  if (typeof window !== "undefined") {
    trackBlogView(blog.id);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          &larr; Back to Blog
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {blog.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          By {blog.author.name} |{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </header>

      <article className="prose lg:prose-xl max-w-none dark:prose-invert">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          width={1200}
          height={600}
          className="mb-8 rounded-lg shadow-md w-full"
          priority
        />
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>

      {blog.tags && blog.tags.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog/tag/${tag.slug}`}
                className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 hover:bg-blue-200 dark:hover:bg-blue-300"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* You might want to add a comment section or related posts here */}
    </div>
  );
}

// Dummy data fetching functions (replace with your actual data fetching logic)
async function getBlogBySlug(slug: string) {
  // Simulate fetching blog data from an API or database
  // Replace this with your actual data fetching logic
  // Example:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?slug=${slug}`);
  // const blogs = await res.json();
  // return blogs.find((blog: any) => blog.slug === slug);

  // Dummy data for demonstration:
  const dummyBlogs = [
    {
      id: "1",
      slug: "how-to-learn-nextjs",
      title: "How to Learn Next.js",
      content:
        "<p>Next.js is a great framework for building React applications...</p>",
      imageUrl: "/images/blog-post-1.jpg",
      createdAt: "2023-10-26T10:00:00Z",
      author: { name: "John Doe" },
      tags: [{ id: "1", name: "Next.js", slug: "nextjs" }],
    },
    {
      id: "2",
      slug: "understanding-react-hooks",
      title: "Understanding React Hooks",
      content:
        "<p>React Hooks are functions that let you hook into React state and lifecycle features...</p>",
      imageUrl: "/images/blog-post-2.jpg",
      createdAt: "2023-10-25T10:00:00Z",
      author: { name: "Jane Smith" },
      tags: [{ id: "2", name: "React", slug: "react" }],
    },
    {
      id: "3",
      slug: "the-future-of-web-development",
      title: "The Future of Web Development",
      content: "<p>Web development is constantly evolving...</p>",
      imageUrl: "/images/blog-post-3.jpg",
      createdAt: "2023-10-24T10:00:00Z",
      author: { name: "Alex Johnson" },
      tags: [{ id: "3", name: "Web Development", slug: "web-development" }],
    },
  ];

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return dummyBlogs.find((blog) => blog.slug === slug) || null;
}
