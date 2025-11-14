// app/blog/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SocialLinks from "@/components/SocialLinks";
import CommentForm from "@/components/CommentForm";

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: {
    ["wp:featuredmedia"]?: Array<{ source_url: string }>;
    author?: Array<{ name: string; avatar_urls: { 96: string } }>;
    ["wp:term"]?: Array<Array<{ name: string }>>;
  };
}

interface WPComment {
  id: number;
  author_name: string;
  date: string;
  content: { rendered: string };
  author_avatar_urls: { [key: number]: string };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const WP_DOMAIN = "https://cms.hymnsvillage.com";

  // ============================
  // 1️⃣ FETCH SINGLE POST
  // ============================
  const postRes = await fetch(
    `${WP_DOMAIN}/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { cache: "no-store" }
  );

  const postData: WPPost[] = await postRes.json();
  if (!postData.length) return notFound();

  const post = postData[0];

  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/Rectangle 1 (1).png";

  const authorName = post._embedded?.author?.[0]?.name || "Blog Author";

  const authorAvatar =
    post._embedded?.author?.[0]?.avatar_urls?.[96] || "/placeholder.png";

  const category =
    post._embedded?.["wp:term"]?.[0]?.[0]?.name || "General";

  // ============================
  // 2️⃣ FETCH RECENT POSTS
  // ============================
  const recentRes = await fetch(
    `${WP_DOMAIN}/wp-json/wp/v2/posts?_embed&per_page=5`,
    { cache: "no-store" }
  );

  const recentPosts: WPPost[] = await recentRes.json();

  const sidebarPosts = recentPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 4);

  // ============================
  // 3️⃣ FETCH COMMENTS
  // ============================
  const commentsRes = await fetch(
    `${WP_DOMAIN}/wp-json/wp/v2/comments?post=${post.id}&order=asc`,
    { cache: "no-store" }
  );

  const comments: WPComment[] = await commentsRes.json();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* -----------------------------------
         MAIN ARTICLE
      ------------------------------------ */}
      <article className="lg:col-span-2 space-y-8">
        {/* Category */}
        <span className="inline-block px-3 py-1 text-sm font-medium bg-purple-100 text-purple-700 rounded-full">
          {category}
        </span>

        {/* Title */}
        <h1
          className="text-4xl font-bold leading-snug"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <Image
            src={authorAvatar}
            alt={authorName}
            width={48}
            height={48}
            className="rounded-full"
          />

          <div>
            <p className="font-medium">{authorName}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.date).toDateString()}
            </p>
          </div>

          {/* Social icons */}
          <div className="ml-auto flex gap-3 text-gray-500">
            <Link href="#">
              <i className="ri-twitter-x-line text-xl"></i>
            </Link>
            <Link href="#">
              <i className="ri-linkedin-box-line text-xl"></i>
            </Link>
            <button>
              <i className="ri-link text-xl"></i>
            </button>
          </div>
        </div>

        {/* Feature Image */}
        <div>
          <Image
            src={featuredImage}
            alt={post.title.rendered}
            width={1200}
            height={600}
            className="w-full rounded-2xl object-cover"
          />
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-semibold prose-p:text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* ============================
            4️⃣ COMMENTS SECTION
        ============================ */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">
            Comments ({comments.length})
          </h2>

          <div className="space-y-8">
            {comments.map((c) => (
              <div key={c.id} className="border-b pb-4">
                <div className="flex gap-4 items-start">
                  <Image
                    src={c.author_avatar_urls?.["48"] || "/placeholder.png"}
                    alt={c.author_name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />

                  <div>
                    <p className="font-semibold">{c.author_name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(c.date).toLocaleString()}
                    </p>

                    <div
                      className="prose prose-sm text-gray-700 mt-2"
                      dangerouslySetInnerHTML={{ __html: c.content.rendered }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* COMMENT FORM */}
          <CommentForm postId={post.id} />
        </div>
      </article>

      {/* -----------------------------------
         SIDEBAR
      ------------------------------------ */}
      <aside className="space-y-12">
        {/* Author Card */}
        <div className="p-6 bg-gray-50 rounded-2xl text-center">
          <Image
            src={authorAvatar}
            alt="Author"
            width={80}
            height={80}
            className="rounded-full mx-auto mb-3"
          />
          <h3 className="font-semibold">{authorName}</h3>
          <p className="text-sm text-gray-500">Content Writer</p>
        </div>

        {/* Recent Posts */}
        <div className="space-y-4">
          {sidebarPosts.map((article) => {
            const img =
              article._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "/Rectangle 1 (1).png";

            const cat =
              article._embedded?.["wp:term"]?.[0]?.[0]?.name || "General";

            return (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="flex items-start gap-4 pb-4 border-b border-gray-200"
              >
                <div className="w-16 h-16 relative rounded-md overflow-hidden">
                  <Image
                    src={img}
                    alt={article.title.rendered}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full inline-block mb-1">
                    {cat}
                  </span>

                  <h4
                    className="text-sm font-semibold text-black"
                    dangerouslySetInnerHTML={{
                      __html: article.title.rendered,
                    }}
                  />

                  <p className="text-xs text-gray-500">
                    {new Date(article.date).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Social Links */}
        <div className="pt-6">
          <SocialLinks />
        </div>
      </aside>
    </div>
  );
}
