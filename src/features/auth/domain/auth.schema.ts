import { z } from 'zod';

export const AdminCredentialsSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type AdminCredentialsInput = z.infer<typeof AdminCredentialsSchema>;

export interface IAdminUser {
  _id?: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'superadmin';
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
