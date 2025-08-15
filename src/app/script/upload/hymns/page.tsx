"use client";

import efik from "@/data/efikHymns.json";
import english from "@/data/englishHymns.json";
import ibibio from "@/data/ibibioHymns.json";
import { supabase } from "@/supabase/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatHymns = (data: any[], category: string) =>
  data.map((hymn) => ({
    title: hymn.title,
    author: hymn.author,
    lyrics: hymn.lyrics,
    category,
    date: "2025-07-03", // or use new Date().toISOString()
  }));

export default function UploadHymns() {
  const handleUpload = async () => {
    const hymns = [
      ...formatHymns(english, "English"),
      ...formatHymns(efik, "Efik"),
      ...formatHymns(ibibio, "Ibibio"),
    ];

    const { error } = await supabase.from("hymns").insert(hymns);

    if (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload hymns.");
    } else {
      alert("Hymns uploaded successfully!");
    }
  };

  return (
    <div className="p-6">
      <button
        className="px-4 py-2 bg-green-600 text-white rounded"
        onClick={handleUpload}
      >
        Upload Hymns
      </button>
    </div>
  );
}
