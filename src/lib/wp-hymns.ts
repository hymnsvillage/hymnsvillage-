export async function getHymnBySlug(slug: string) {
  const base = process.env.NEXT_PUBLIC_WP_API_URL;

  const res = await fetch(
    `${base}/hymns?slug=${slug}&acf_format=standard&_embed`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return null;

  const data = await res.json();
  if (!data || data.length === 0) return null;

  const item = data[0];

  return {
    id: item.id,
    title: item.title?.rendered || "",
    lyrics:
      item.acf?.lyrics ||
      item.content?.rendered ||
      "No lyrics available.",
    featuredImage:
      item.acf?.featured_image ||
      item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      null,
  };
}
