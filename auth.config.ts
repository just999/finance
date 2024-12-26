import { compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import { authenticator } from 'otplib';
import db from './lib/db/drizzle';
import { users } from './lib/db/users-schema';

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    GitHub,
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
            throw new Error('Incorrect Credentials');
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
} satisfies NextAuthConfig;
