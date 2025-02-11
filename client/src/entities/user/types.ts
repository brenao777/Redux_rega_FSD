import { z } from 'zod';
import type { PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: number;
  name: string;
};

export type UserState = {
  status: 'loading' | 'logged' | 'guest';
  data: User | null;
  error: string | null;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
};

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

export type UseUserReturnType = {
  user: UserState;
  error: string | null;
  loginHandler: (loginData: LoginCredentials) => Promise<PayloadAction<unknown>>;
  logoutHandler: () => Promise<PayloadAction<unknown>>;
  submitHandler: (registerData: RegisterFormData) => Promise<PayloadAction<unknown>>;
};
