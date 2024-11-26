import NextAuth, {CredentialsSignin} from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import Google from "next-auth/providers/google"
import {compare} from 'bcrypt-ts'
import { User } from "@/models/User"
import connectMongoDb from "@/lib/mongo"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({}),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email'
        },
        password: {
          label: 'Password',
          type: 'string'
        },
      },
      authorize: async (credentials) => {

        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email & password");
        }

        await connectMongoDb();

        const user = await User.findOne({ email }).select("+password"); // Removed +role

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isMatched = await compare(password, user.password);

        if (!isMatched) {
          throw new Error("Password did not match");
        }
      }

    })
  ],
 
})