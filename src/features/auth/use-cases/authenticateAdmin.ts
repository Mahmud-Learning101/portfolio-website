import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/shared/lib/db';
import { AdminUserModel } from '../data/admin-user.model';
import { AdminCredentialsInput } from '../domain/auth.schema';
import { signToken } from '@/shared/lib/auth';

export async function authenticateAdmin(credentials: AdminCredentialsInput) {
  await connectToDatabase();

  const user = await AdminUserModel.findOne({ email: credentials.email.toLowerCase() });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValidPassword = await bcrypt.compare(credentials.password, user.passwordHash);
  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  user.lastLogin = new Date();
  await user.save();

  const token = signToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    token,
  };
}
