"use client";

import { loginUser } from "@/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// ✅ Zod validation schema
const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginUser(data);

      if (result?.data?.success) {
        toast.success(result.data.message || "Login successful");
        reset();

        const user = result.data.user;

        if (user?.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard/user"); // or "/"
        }
      } else {
        toast.error(result.data?.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Unexpected error. Please try again later.");
    }
  };

  return (
    <div>
      <div className="space-y-2 mb-6 mt-4">
        <h2 className="text-gray-800 text-2xl font-bold">Enter the Village</h2>
        <p className="text-sm text-gray-500">
          Access Your Account and Exclusive Features
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="text-sm font-medium block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            placeholder="e.g Example@mail.com"
            className="w-full p-3 text-gray-700 placeholder:text-gray-300 border rounded-md"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="text-sm font-medium block text-gray-700">
            Password:
          </label>
          <input
            type="password"
            placeholder="At least 8 characters"
            className="w-full p-3 text-gray-700 placeholder:text-gray-300 border rounded-md"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot password */}
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm text-gray-700 hover:underline">
            Forgotten password?
          </Link>
        </div>

        {/* Submit */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full capitalize bg-black text-white py-3 rounded-md hover:opacity-90 transition"
        >
          {isSubmitting ? "Logging in..." : "Log in →"}
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <span>or</span>
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border py-2 text-gray-700 rounded-md hover:bg-gray-100 transition"
        >
          <Image
            src="/google-icon.png"
            alt="Google icon"
            width={24}
            height={24}
          />
          Continue with Google
        </button>

        {/* Signup Link */}
        <p className="text-sm text-center text-gray-700">
          Don’t have an account?{" "}
          <Link href="/signup" className="capitalize text-[#DC4407] font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
