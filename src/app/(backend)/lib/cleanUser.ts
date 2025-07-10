export interface RawUser {
  id: string;
  email: string;
  role: string;
  last_sign_in_at?: string;
  confirmed_at?: string;
  app_metadata?: {
    provider?: string;
  };
  user_metadata?: {
    name?: string;
    avatarUrl?: string;
    username?: string;
    userRole?: string;
    email_verified?: boolean;
    phone_verified?: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface CleanUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  username?: string;
  provider?: string;
  role: string;
  userRole?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  lastLoginAt?: string;
  isNewUser?: boolean;
}

export function cleanUser(user: RawUser): CleanUser | null {
  if (!user) return null;

  const createdAt = new Date(user.created_at);
  const now = new Date();
  const isNewUser =
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24) <= 7;
  const userRole = user.user_metadata?.userRole ?? "user";

  const base: CleanUser = {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.name,
    avatarUrl:user.user_metadata?.avatarUrl||"",
    username: user.user_metadata?.username,
    role: user.role,
    userRole,
    provider: user.app_metadata?.provider,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    lastLoginAt: user.last_sign_in_at,
    isNewUser,
    emailVerified: user.user_metadata?.email_verified ?? false,
    phoneVerified: user.user_metadata?.phone_verified ?? false,
    confirmedAt: user.confirmed_at,
  };

  return base;
}
