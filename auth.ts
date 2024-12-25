import { compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authenticator } from 'otplib';
import db from './lib/db/drizzle';
import { users } from './lib/db/users-schema';

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
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        token: {},
      },
      async authorize(credentials) {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string));

        if (!user) {
          throw new Error('Incorrect credentials');
        } else {
          const validPassword = await compare(
            credentials.password as string,
            user.password as string
          );
          if (!validPassword) {
            throw new Error('Incorrect credentials');
          }

          if (user.twoFactorActivated) {
            const validToken = authenticator.check(
              credentials.token as string,
              user.twoFactorSecret ?? ''
            );

            if (!validToken) {
              throw new Error('Incorrect OTP');
            }
          }
        }

        return {
          id: user.id.toString(),
          email: user.email,
        };
      },
    }),
  ],
  session: { strategy: 'jwt' },
});
