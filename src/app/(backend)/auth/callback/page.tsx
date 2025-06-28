// app/auth/callback/page.tsx
"use client";
import { supabaseClient } from "@/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    supabaseClient.supabase.auth.getSession().then(() => {
      router.replace("/");
    });
  }, [router]);

  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <p>Processing login...</p>
    </main>
  );
}
