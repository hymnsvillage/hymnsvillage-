// app/login/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from "react";

export default function LoginForm() {

      const [form, setForm] = useState({
            email: "",
            password: "",
        });
    
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value, type, checked } = e.target;
            setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
        };
    
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (!form.email || !form.password) {
                alert("Please fill in all fields");
                return;
            }    
            // submit logic here
            console.log("Form Submitted", form);
        };

  return (
    <div className="">
        <div className="space-y-2 mb-6 mt-4">
            <h2 className="text-gray-800 text-2xl font-bold">
                Enter the Village
            </h2>
            <p className="text-sm text-gray-500">
                Access Your Account and Exclusive Features
            </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">

            <div>
                <label htmlFor="email" className="text-sm font-medium block text-gray-700">
                    Email:
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="e.g Example@mail.com"
                    className="w-full p-3 text-gray-700 placeholder:text-gray-300 border rounded-md"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="password" className="text-sm font-medium block text-gray-700">
                    Password:
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder="At least 8 character"
                    className="w-full p-3 text-gray-700 placeholder:text-gray-300 border rounded-md"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="flex justify-end">
                <Link href="#" className="text-sm text-gray-700 hover:underline">
                    Forgotten password
                </Link>
            </div>

            <button
                type="submit"
                className="w-full capitalize bg-black text-white py-3 rounded-md hover:opacity-90 transition"
            >
                Log in →
            </button>

            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <span>or</span>
            </div>

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
                {/* <img src="/google-icon.png" alt="Google" className="size-6" /> */}
                Continue with Google
            </button>

            <p className="text-sm text-center text-gray-700">
                Don’t have an account?{" "}
                <Link 
                    href="/signup" 
                    className="capitalize text-[#DC4407] font-semibold hover:underline"
                >
                    Sign up
                </Link>
            </p>
        </form>
    </div>

  );
}

