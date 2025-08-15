"use client";

import { confirmReset } from "@/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Schema for validation
const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setError("");
    if (!token) {
      setError("Reset token missing.");
      return;
    }

    try {
      await confirmReset(token, data.password);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000); // Wait 2s then redirect
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Reset failed", err);
      const message =
        err?.response?.data?.message || "Something went wrong. Try again.";
      setError(message);
    }
  };

  return (
    <Suspense>
      {" "}
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col justify-center px-8 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-2">Reset Your Password</h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter a new password to continue
          </p>

          {success ? (
            <p className="text-green-600">
              ✅ Password reset successfully. Redirecting...
            </p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="password"
                placeholder="New password"
                {...register("password")}
                className="w-full border px-4 py-2 rounded"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <input
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword")}
                className="w-full border px-4 py-2 rounded"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-2 rounded"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}
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
    </Suspense>
  );
}
