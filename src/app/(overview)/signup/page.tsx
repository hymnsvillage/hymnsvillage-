'use client';

import SignupForm from "@/components/Signup";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-8 m-10">
            {/* Left: Illustration */}
            <SignupForm />

            {/* Right: Illustration */}
            {/* <div className="hidden md:flex items-center justify-center">
            <img src="/signup.jpg" alt="Register Illustration" className="max-h-[400px]" />
            </div> */}

            {/* Right: Illustration */}
            <div className="hidden md:flex items-center justify-center">
                <Image
                src="/signup.jpg"
                alt="Register illustration"
                width={400}
                height={400}
                className=" max-h-[400px]"
                />
            </div>
        </div>
    </div>
  );
}

