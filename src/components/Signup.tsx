"use client";

import { registerUser } from "@/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"; // icons
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Validation schema
const signupSchema = z
  .object({
    firstName: z.string().min(1, "Name is required"),
    lastName: z.string().min(1, "last name required"),
    username: z.string().min(1, "user name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    agree: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the terms" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async ({
    email,
    password,
    username,
    firstName,
    lastName,
  }: SignupFormValues) => {
    const result = await registerUser({
      email,
      name: `${firstName} ${lastName}`,
      username,
      password,
    });

    if (result.data.success) {
      reset();
      setSuccessMessage(
        result.data.message || "Registration was successful. Please login"
      );
      router.push("/login");
    }
    toast.error(
      result.data.error ||
        "An error occurred during registration. Please try again"
    );
  };

  return (
    <div>
      <div className="space-y-2 mb-6 mt-4">
        <h2 className="text-gray-800 text-2xl font-bold">
          Create an account with us
        </h2>
        <p className="text-sm text-gray-500">
          Become a Part of Our Growing Community
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        {/* Name */}
        <div className="relative">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Please Enter Your First Name"
            className="w-full pl-10 p-3 text-gray-700 placeholder:text-gray-300 border rounded-md"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div className="relative">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder=" Enter Your Last Name"
            className="w-full pl-10 p-3 text-gray-700 placeholder:text-gray-300 border rounded-md"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        <div className="relative">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder=" Enter Your User Name"
            className="w-full pl-10 p-3 text-gray-700 placeholder:text-gray-300 border rounded-md"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="email"
            placeholder="e.g Example@mail.com"
            className="w-full pl-10 p-3 text-gray-700 placeholder:text-gray-300 border rounded-md"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            className="w-full pl-10 pr-10 p-3 text-gray-700 placeholder:text-gray-300 border rounded-md"
            {...register("password")}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Make sure password is the same"
            className="w-full pl-10 pr-10 p-3 text-gray-700 placeholder:text-gray-300 border rounded-md"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowConfirm((prev) => !prev)}
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" {...register("agree")} />
          <label htmlFor="agree" className="text-sm">
            Agree to terms and conditions
          </label>
        </div>
        {errors.agree && (
          <p className="text-sm text-red-500">{errors.agree.message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md hover:opacity-90 transition"
        >
          Create account →
        </button>

        {successMessage && (
          <p className="text-center text-green-600 font-medium">
            {successMessage}
          </p>
        )}

        {/* Divider */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <span>or</span>
        </div>

        {/* Google Auth */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border py-2 text-gray-700 rounded-md hover:bg-gray-100"
        >
          <Image
            src="/google-icon.png"
            alt="Google icon"
            width={24}
            height={24}
          />
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-700">
          Already have an account?{" "}
          <Link
            href="/login"
            className="capitalize text-[#DC4407] font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
