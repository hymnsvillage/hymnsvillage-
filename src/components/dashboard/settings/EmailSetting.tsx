'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { supabase } from '@/supabase/client';
// import { supabase } from '@/lib/supabase';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof schema>;

export default function EmailSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [currentEmail, setCurrentEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        error,
      } = await supabase.auth.getUser();
      if (user) {
        setCurrentEmail(user.email ?? '');
      }
    };

    fetchUser();
  }, []);

  const onSubmit = async (data: FormData) => {
    setError('');
    setSuccess('');

    const { email, password } = data;

    // Sign in with current credentials to verify password
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      data: { session },
      error: signInErr,
    } = await supabase.auth.signInWithPassword({
      email: currentEmail,
      password,
    });

    if (signInErr) {
      setError('Incorrect password.');
      return;
    }

    // Update email in Supabase Auth
    const { error: updateError } = await supabase.auth.updateUser({ email });

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess('Email change requested successfully!');
      reset();
      setCurrentEmail(email);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm w-full p-6 space-y-8">
      {/* Current Email Card */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Email Settings</h2>
        <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <span className="text-gray-700">{currentEmail}</span>
          <span className="text-sm text-white bg-green-400 px-3 py-1 rounded-md">Verified</span>
        </div>
      </div>

      {/* Email Change Form */}
      <div>
        <h3 className="text-base font-medium mb-3">Change Email Address</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-gray-200 rounded-xl p-4 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Email</label>
            <input
              {...register('email')}
              type="email"
              placeholder="Enter new email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              {...register('password')}
              type="password"
              placeholder="At least 8 characters"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-900 disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Change Email →'}
          </button>
        </form>
      </div>
    </div>
  );
}
