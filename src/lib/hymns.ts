const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL!;

/**
 * Fetch all hymns
 */
export async function getAllHymns() {
  const res = await fetch(`${WP_API_URL}/hymns?acf_format=standard&_embed`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch hymns");
  }

  const hymns = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return hymns.map((hymn: any) => ({
    id: hymn.id,
    title: hymn.title.rendered,
    slug: hymn.slug,
    featuredImage:
      hymn._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,

    // ACF fields
    lyrics: hymn.acf?.lyrics || "",
    language: hymn.acf?.language || "Unknown",
    youtubeLink: hymn.acf?.youtube_link || "",
    audioFile: hymn.acf?.audio_file || "",
    description: hymn.acf?.short_description || "",
  }));
}

/**
 * Fetch hymns based on language category (Efik, English, Ibibio)
 */
const CATEGORY_MAP: Record<string, number> = {
  efik: 17,
  english: 18,
  ibibio: 19,
};

export async function getHymnsByLanguage(language: string) {
  const categoryId = CATEGORY_MAP[language.toLowerCase()];
  if (!categoryId) throw new Error(`Unknown language: ${language}`);

  const res = await fetch(
    `${WP_API_URL}/hymns?hymn_category=${categoryId}&acf_format=standard&_embed`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Failed to fetch hymns by language");
  }

  const hymns = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return hymns.map((hymn: any) => ({
    id: hymn.id,
    title: hymn.title.rendered,
    slug: hymn.slug,
    featuredImage:
      hymn._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,

    lyrics: hymn.acf?.lyrics || "",
    language: language, // override from taxonomy
    youtubeLink: hymn.acf?.youtube_link || "",
    audioFile: hymn.acf?.audio_file || "",
    description: hymn.acf?.short_description || "",
  }));
}


/**
 * Fetch single hymn by slug
 */
export async function getHymnBySlug(slug: string) {
  const res = await fetch(
    `${WP_API_URL}/hymns?slug=${slug}&acf_format=standard&_embed`,
    {
      cache: "no-store",
    }
  );

  const items = await res.json();
  if (!items.length) return null;

  const hymn = items[0];

  return {
    id: hymn.id,
    title: hymn.title.rendered,
    slug: hymn.slug,
    featuredImage:
      hymn._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,

    lyrics: hymn.acf?.lyrics || "",
    language: hymn.acf?.language || "Unknown",
    youtubeLink: hymn.acf?.youtube_link || "",
    audioFile: hymn.acf?.audio_file || "",
    description: hymn.acf?.short_description || "",
  };
}
