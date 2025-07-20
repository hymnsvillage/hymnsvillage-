// context/UserContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  fullName: string;
  avatarUrl: string;
  role: "user" | "admin";
};

const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data?.data) {
        setUser({
          fullName: data.data.fullName,
          avatarUrl: data.data.avatarUrl || "/avatar.jpg",
          role: data.data.role || "user", // default to "user"
        });
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
