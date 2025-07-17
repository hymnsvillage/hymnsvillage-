'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// import { supabase } from '@/lib/supabase';
import { Pencil, Save, Upload } from 'lucide-react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/supabase/client';

const schema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export default function PersonalInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>('/avatar-placeholder.png');
  const [fullName, setFullName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);

        const { data } = await supabase
          .from('users')
          .select('first_name, last_name, email, address, avatar_url')
          .eq('id', user.id)
          .single();

        if (data) {
          reset(data);
          setAvatarUrl(data.avatar_url || '/avatar-placeholder.png');
          setFullName(`${data.first_name} ${data.last_name}`);
        }
      }

      setLoading(false);
    };

    fetchUser();
  }, [reset]);

  const onSubmit = async (values: FormData) => {
    if (!userId) return;

    const { error } = await supabase
      .from('users')
      .update({ ...values, avatar_url: avatarUrl })
      .eq('id', userId);

    if (!error) {
      setIsEditing(false);
      setFullName(`${values.first_name} ${values.last_name}`);
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${uuidv4()}.${fileExt}`;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error('Upload failed:', uploadError.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    const newUrl = publicUrlData?.publicUrl;

    if (newUrl) {
      setAvatarUrl(newUrl);
      await supabase
        .from('users')
        .update({ avatar_url: newUrl })
        .eq('id', userId);
    }
  };

  if (loading) return <p className="text-sm text-gray-500">Loading...</p>;

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-[#f9f9f9] p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Image
               src={avatarUrl}
                alt="Profile"
                width={50}
               height={50}
                className="rounded-full object-cover ring-2 ring-black"
              />

            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer">
                <Upload size={14} className="text-gray-500" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div>
            <h2 className="font-semibold">{fullName}</h2>
            <p className="text-sm text-gray-500">11,253 followers</p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="bg-green-100 text-green-600 text-sm px-4 py-1 rounded-md flex items-center gap-1 hover:bg-green-200"
        >
          <Pencil size={14} />
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {/* Personal Info Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="border border-gray-200 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Personal Information</h3>
            {isEditing && (
              <button
                type="submit"
                className="bg-black text-white px-4 py-1 rounded-md text-sm flex items-center gap-1"
              >
                <Save size={14} />
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div>
              <p className="text-gray-500 mb-1">First Name</p>
              {isEditing ? (
                <>
                  <input
                    {...register('first_name')}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>
                  )}
                </>
              ) : (
                <p className="text-gray-700">{watch('first_name')}</p>
              )}
            </div>

            <div>
              <p className="text-gray-500 mb-1">Last Name</p>
              {isEditing ? (
                <>
                  <input
                    {...register('last_name')}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>
                  )}
                </>
              ) : (
                <p className="text-gray-700">{watch('last_name')}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <p className="text-gray-500 mb-1">Email Address</p>
              {isEditing ? (
                <>
                  <input
                    {...register('email')}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </>
              ) : (
                <p className="text-gray-700">{watch('email')}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="border border-gray-200 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Address</h3>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Location</p>
            {isEditing ? (
              <>
                <input
                  {...register('address')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                )}
              </>
            ) : (
              <p className="text-gray-700">{watch('address')}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
