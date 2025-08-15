import { notFound } from "next/navigation";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const article = await res.json();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-6">{article.created_at}</p>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </main>
  );
}
