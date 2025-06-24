// app/profile/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Pencil, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  followers: number;
  fullName: string;
  avatar: string;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile>({
    firstName: "Danesi umar",
    lastName: "Salahudeen",
    email: "Hudesign@hudeen.info",
    address: "Edo State Ekpoma, Nigeria",
    followers: 11253,
    fullName: "Salahudeen Umar",
    avatar: "/avatar.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState<keyof Profile | null>(null);
  const [tempValue, setTempValue] = useState("");
  const [] = useState(false);

  const handleEditClick = (field: keyof Profile) => {
    setEditField(field);
    setTempValue(profile[field].toString());
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editField) {
      setProfile((prev) => ({ ...prev, [editField]: tempValue }));
      setIsEditing(false);
      setEditField(null);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h2 className="text-xl font-semibold">Personal profile</h2>

      {/* Profile Card */}
      <section className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 relative">
          <div className="relative group">
            <Image
              src={profile.avatar}
              alt="Avatar"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity">
              <Upload className="w-4 h-4 text-gray-600" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <h3 className="font-medium text-base">{profile.fullName}</h3>
            <p className="text-sm text-gray-500">
              {profile.followers.toLocaleString()} followers
            </p>
          </div>
        </div>
        <button
          className="text-green-600 font-medium flex items-center gap-1"
          onClick={() => handleEditClick("fullName")}
        >
          <Pencil className="w-4 h-4" /> Edit
        </button>
      </section>

      {/* Personal Info */}
      <section className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Personal Information</h3>
          <button
            className="text-green-600 font-medium flex items-center gap-1"
            onClick={() => handleEditClick("firstName")}
          >
            <Pencil className="w-4 h-4" /> Edit
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-gray-500">First Name</p>
              <p className="text-sm">{profile.firstName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Last Name</p>
              <p className="text-sm">{profile.lastName}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500">Email Address</p>
            <p className="text-sm">{profile.email}</p>
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Address</h3>
          <button
            className="text-green-600 font-medium flex items-center gap-1"
            onClick={() => handleEditClick("address")}
          >
            <Pencil className="w-4 h-4" /> Edit
          </button>
        </div>
        <p className="text-sm">{profile.address}</p>
      </section>

      {/* Edit Dialog */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h4 className="text-lg font-medium mb-4">Edit {editField}</h4>
            <Input
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
