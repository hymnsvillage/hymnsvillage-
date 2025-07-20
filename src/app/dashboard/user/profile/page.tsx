'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Pencil, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateMe } from '@/api/auth';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileFormData | null>(null);
  const [avatar, setAvatar] = useState('/avatar.jpg');
  const [followers, setFollowers] = useState(0);
  const [editSection, setEditSection] = useState<keyof ProfileFormData | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const json = await res.json();
        const user = json?.data;

        if (user) {
          const profileData: ProfileFormData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address || '',
          };

          setAvatar(user.avatarUrl || '/avatar.jpg');
          setFollowers(user.followers || 0);
          setProfile(profileData);
          reset(profileData);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!editSection) return;

    const formData = new FormData();
    formData.append(editSection, data[editSection]);

    try {
      await updateMe(formData);
      setProfile((prev) => (prev ? { ...prev, [editSection]: data[editSection] } : prev));
      setEditSection(null);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      await updateMe(formData);
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    } catch (err) {
      console.error('Avatar upload failed:', err);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading profile...</div>;
  if (!profile) return <div className="p-6 text-center text-red-500">Profile not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h2 className="text-xl font-semibold">Personal Profile</h2>

      {/* Avatar Card */}
      <section className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 relative">
          <div className="relative group">
            <Image
              src={avatar}
              alt="Avatar"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity">
              <Upload className="w-4 h-4 text-gray-600" />
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </label>
          </div>
          <div>
            <h3 className="font-medium text-base">{profile.firstName} {profile.lastName}</h3>
            <p className="text-sm text-gray-500">{followers.toLocaleString()} followers</p>
          </div>
        </div>
      </section>

      {/* Section: Name */}
      <section className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Name</h3>
          {editSection !== 'firstName' && editSection !== 'lastName' && (
            <button
              className="text-green-600 font-medium flex items-center gap-1"
              onClick={() => setEditSection('firstName')}
            >
              <Pencil className="w-4 h-4" /> Edit
            </button>
          )}
        </div>
        {editSection === 'firstName' || editSection === 'lastName' ? (
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">First Name</p>
              <Input {...register('firstName')} />
              {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <p className="text-xs text-gray-500">Last Name</p>
              <Input {...register('lastName')} />
              {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
            </div>
            <div className="col-span-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setEditSection(null)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>{profile.firstName}</p>
            <p>{profile.lastName}</p>
          </div>
        )}
      </section>

      {/* Section: Email */}
      <section className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Email</h3>
          {editSection !== 'email' && (
            <button
              className="text-green-600 font-medium flex items-center gap-1"
              onClick={() => setEditSection('email')}
            >
              <Pencil className="w-4 h-4" /> Edit
            </button>
          )}
        </div>
        {editSection === 'email' ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Email Address</p>
              <Input {...register('email')} />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setEditSection(null)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        ) : (
          <p className="text-sm">{profile.email}</p>
        )}
      </section>

      {/* Section: Address */}
      <section className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Address</h3>
          {editSection !== 'address' && (
            <button
              className="text-green-600 font-medium flex items-center gap-1"
              onClick={() => setEditSection('address')}
            >
              <Pencil className="w-4 h-4" /> Edit
            </button>
          )}
        </div>
        {editSection === 'address' ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Your Address</p>
              <Input {...register('address')} />
              {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setEditSection(null)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        ) : (
          <p className="text-sm">{profile.address}</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage
