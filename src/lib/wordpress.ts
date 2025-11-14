const WP_API_URL = "https://cms.hymnsvillage.com/wp-json/wp/v2";

/**
 * Fetch all WordPress posts
 */
export async function getAllPosts() {
  const res = await fetch(`${WP_API_URL}/posts?_embed`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch WordPress posts");
  }

  const posts = await res.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return posts.map((post: any) => ({
    id: post.id,
    title: post.title.rendered,
    slug: post.slug,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    date: post.date,
    featuredImage:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
    author: post._embedded?.["author"]?.[0]?.name || "Unknown Author",
    category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Uncategorized",
  }));
}

/**
 * Fetch a single WordPress post by slug
 */
export async function getPostBySlug(slug: string) {
  const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const posts = await res.json();
  if (!posts.length) return null;

  const post = posts[0];
  return {
    id: post.id,
    title: post.title.rendered,
    slug: post.slug,
    content: post.content.rendered,
    date: post.date,
    featuredImage:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
    author: post._embedded?.["author"]?.[0]?.name || "Unknown Author",
    category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Uncategorized",
  };
}
