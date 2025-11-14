"use client";

import { useState } from "react";

export default function CommentForm({ postId }: { postId: number }) {
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function submitComment(e: any) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(
      "https://cms.hymnsvillage.com/wp-json/wp/v2/comments",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post: postId,
          author_name: author,
          author_email: email,
          content: comment,
        }),
      }
    );

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      setAuthor("");
      setEmail("");
      setComment("");
    } else {
      alert("Failed to submit comment.");
    }
  }

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>

      {success && (
        <p className="text-green-600 mb-4">
          🎉 Comment submitted and awaiting moderation.
        </p>
      )}

      <form onSubmit={submitComment} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          required
          className="w-full border px-4 py-2 rounded-md"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          type="email"
          placeholder="Your Email"
          required
          className="w-full border px-4 py-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Write your comment..."
          required
          className="w-full border px-4 py-2 rounded-md h-32"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-2 rounded-md"
        >
          {loading ? "Submitting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
}
