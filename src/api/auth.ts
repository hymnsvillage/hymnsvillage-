import { client } from "@/lib";

export type RegisterInput = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export const registerUser = (data: RegisterInput) =>
  client.post("/auth/register", data);

export const loginUser = (data: { email: string; password: string }) =>
  client.post("/auth/login", data);

export const logout = () => client.post("/auth/logout");

export const getCurrentUser = () =>
  client.get("/auth/me").then((res) => res.data.user);

export const updateMe = (data: { name?: string; avatarFile?: string }) =>
  client.put("/auth/me", data);

export const forgotPassword = (email: string) =>
  client.post("/auth/forgot", { email });

export const changePassword = (password: string) =>
  client.post("/auth/change-password", { password });

export const confirmReset = (token: string, newPassword: string) =>
  client.post("/auth/change-password", {
    accessToken: token,
    newPassword,
  });

export const oauthLogin = (provider: string) =>
  client.get(`/auth/oauth/${provider}`); // optional redirect
