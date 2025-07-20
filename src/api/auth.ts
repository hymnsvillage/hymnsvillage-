import { client } from "@/lib";

export type RegisterInput = {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
};

export const registerUser = (data: RegisterInput) =>
  client.post("/auth/register", data);

export const loginUser = (data: { email: string; password: string }) =>
  client.post("/auth/login", data);

export const logout = () => client.post("/auth/logout");

export const getCurrentUser = async () =>
  await client.get("/auth/me") 

export const updateMe = (formData: FormData) =>
  client.put("/auth/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const forgotPassword = async (email: string) =>
 await client.post("/auth/forgot-password", { email });

export const changePassword = (password: string) =>
  client.post("/auth/change-password", { password });

export const confirmReset = (token: string, newPassword: string) =>
  client.post("/auth/change-password", {
    accessToken: token,
    newPassword,
  });

export const oauthLogin = (provider: string) =>
  client.get(`/auth/oauth/${provider}`); // optional redirect
