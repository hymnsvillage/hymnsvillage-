"use client";

import { forgotPassword } from "@/api/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import Image from "next/image";


const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      setError("");
      await forgotPassword(data.email); // This should call: client.post("/auth/forgot", { email })
      setSent(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Forgot password error:", err);
      setError(err?.response?.data?.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col justify-center px-8 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-2">Forgot Password?</h2>
        <p className="text-sm text-gray-500 mb-6">Enter your email to receive a reset link</p>

        {sent ? (
          <div className="text-green-600">✅ Reset link sent. Check your email.</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("email")}
              placeholder="Enter your email"
              className="w-full border px-4 py-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <p className="mt-6 text-sm">
          Remembered your password?{" "}
          <a href="/login" className="text-blue-600 hover:underline">Back to login</a>
        </p>
      </div>

      <div className="hidden lg:flex items-center justify-center flex-1 bg-gray-50">
        <Image
                        src="/login.jpg"
                        alt="Register illustration"
                        width={400}
                        height={400}
                        className=" max-h-[400px]"
                        />
      </div>
    </div>
  );
}
