"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignupForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
        }
        if (!form.agree) {
        alert("You must agree to the terms");
        return;
        }

        // submit logic here
        console.log("Form Submitted", form);
    };

  return (
    <div className="">
        <div className="space-y-2 mb-6 mt-4">
            <h2 className="text-gray-800 text-2xl font-bold">
                Create an account with us
            </h2>
            <p className="text-sm text-gray-500">
                 Become a Part of Our Growing Community
            </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
            <input
                type="text"
                name="name"
                placeholder="Please Enter Your Name"
                className="w-full p-3 text-gray-700 placeholder:text-gray-300 border rounded-md"
                value={form.name}
                onChange={handleChange}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="e.g Example@mail.com"
                className="w-full p-3 text-gray-700 placeholder:text-gray-300 border rounded-md"
                value={form.email}
                onChange={handleChange}
                required
            />

            <input
                type="password"
                name="password"
                placeholder="At least 8 character"
                className="w-full p-3 text-gray-700 placeholder:text-gray-300 border rounded-md"
                value={form.password}
                onChange={handleChange}
                required
            />

            <input
                type="password"
                name="confirmPassword"
                placeholder="Make sure password is the same"
                className="w-full p-3 text-gray-700 placeholder:text-gray-300 border rounded-md"
                value={form.confirmPassword}
                onChange={handleChange}
                required
            />

            <div className="flex items-center space-x-2">
                <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                />
                <label htmlFor="agree" className="text-sm">Agree to terms and conditions</label>
            </div>

            <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:opacity-90 transition"
            >
                Create account →
            </button>

            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <span>or</span>
            </div>

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
                {/* <img src="/google-icon.png" alt="Google" className="size-6" /> */}
                Continue with Google
            </button>

            <p className="text-sm text-center text-gray-700">
                Already have an account?{" "}
                <Link href="/login" className="capitalize text-[#DC4407] font-semibold hover:underline">Log in</Link>
            </p>
        </form>
    </div>
  );
}

