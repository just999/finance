import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import authConfig from './auth.config';
import db from './lib/db/drizzle';

// if (!process.env.AUTH_SECRET) {
//   throw new Error('AUTH_SECRET is not defined');
// }

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  // secret: process.env.AUTH_SECRET!,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
